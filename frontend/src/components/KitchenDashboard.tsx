import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Utensils, 
  CloudRain, 
  GraduationCap, 
  CheckCircle2, 
  Send, 
  RefreshCw, 
  Sparkles, 
  ArrowLeft, 
  ThermometerSnowflake, 
  AlertTriangle,
  Clock,
} from 'lucide-react';
import { KitchenDashboardData, KitchenLogEntry } from '../types/data';
import { useFoodStore, type CreateFoodProtocolPayload } from '../store/useFoodStore'; //

interface KitchenDashboardProps {
  data: KitchenDashboardData;
  onUpdateKitchenData: (updated: Partial<KitchenDashboardData>) => void;
  onBroadcastSurplusToNgo: (surplusKg: number, details: string) => void;
  onOpenScanModal?: () => void;
  onBackToLanding: () => void;
}

// Same shape as the store's create payload — aliased instead of hand-duplicated
// so the two can never drift apart again.
type StorageProtocol = CreateFoodProtocolPayload;

export const KitchenDashboard: React.FC<KitchenDashboardProps> = ({
  data,
  onUpdateKitchenData,
  onBroadcastSurplusToNgo,
  onBackToLanding,
}) => {
  const [totalPrepared, setTotalPrepared] = useState<string>('1180');
  const [totalConsumed, setTotalConsumed] = useState<string>('1130');
  const [isSubmittingLog, setIsSubmittingLog] = useState<boolean>(false);
  const [logSuccessMsg, setLogSuccessMsg] = useState<string | null>(null);

  const { createFoodProtocol, isCreating, listings, isLoadingListings, getFoodProtocols } = useFoodStore();
  const [saveError, setSaveError] = useState<string | null>(null);

  // Log & Preserve Engine State
  const [foodType, setFoodType] = useState<string>('Paneer Butter Masala');
  const [foodQuantity, setFoodQuantity] = useState<string>('14.5');
  const [vesselType, setVesselType] = useState<string>('Airtight Stainless Steel Gastronorm');
  const [isGeneratingProtocol, setIsGeneratingProtocol] = useState<boolean>(false);
  const [generatedProtocol, setGeneratedProtocol] = useState<StorageProtocol | null>({
    dish: 'Paneer Butter Masala',
    quantity: '14.5 kg (~50 portions)',
    perishability: 'High Perishability (Dairy Active)',
    badgeClass: 'bg-rose-50 text-[#D9534F] border-rose-200',
    coolingRule: 'Cool to room temp within 30 mins. Rapid chill to ≤ 3°C in airtight stainless steel container.',
    segregationAlert: '⚠️ Critical: Keep segregated from citrus, acidic curries, and unwashed raw salad items.',
    safeWindow: '+14 Hours (Cold Chain Active)',
    targetTemp: 'Refrigerate ≤ 3°C',
    vessel: 'Airtight Stainless Steel Gastronorm',
  });
  const [isBroadcasting, setIsBroadcasting] = useState<boolean>(false);
  const [broadcastDone, setBroadcastDone] = useState<boolean>(false);

  // Pull the live feed once on mount so the surplus-listings table has data
  // even before this kitchen generates anything new this session.
  useEffect(() => {
    getFoodProtocols();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Newest 3 DB rows for the feed below — defensively sorted by createdAt in
  // case anything upstream ever returns them out of order.
  const recentListings = [...listings]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  const handleSubmitActuals = (e: React.FormEvent) => {
    e.preventDefault();
    const preparedNum = parseInt(totalPrepared) || 0;
    const consumedNum = parseInt(totalConsumed) || 0;
    const surplusNum = Math.max(0, preparedNum - consumedNum);

    setIsSubmittingLog(true);
    setTimeout(() => {
      setIsSubmittingLog(false);
      setLogSuccessMsg(`Successfully logged! Surplus detected: ${surplusNum} portions.`);

      const newLog: KitchenLogEntry = {
        id: `LOG-${Date.now().toString().slice(-4)}`,
        mealType: 'Dinner',
        prepared: preparedNum,
        consumed: consumedNum,
        surplus: surplusNum,
        timestamp: 'Just now',
        status: surplusNum > 20 ? 'Pending Safe Dispatch' : 'Distributed'
      };

      onUpdateKitchenData({
        logs: [newLog, ...data.logs]
      });

      setTimeout(() => setLogSuccessMsg(null), 4000);
    }, 600);
  };

  const handleGenerateProtocol = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGeneratingProtocol(true);
    setGeneratedProtocol(null);
    setSaveError(null);

    setTimeout(() => {
      setIsGeneratingProtocol(false);
      const lower = foodType.toLowerCase();
      let protocol: StorageProtocol;

      if (lower.includes('paneer') || lower.includes('dairy') || lower.includes('milk') || lower.includes('kheer') || lower.includes('curd')) {
        protocol = {
          dish: foodType,
          quantity: `${foodQuantity} kg (~${Math.round(parseFloat(foodQuantity || '10') * 3.5)} portions)`,
          perishability: 'High Perishability (Dairy Active)',
          badgeClass: 'bg-rose-50 text-[#D9534F] border-rose-200',
          coolingRule: 'Cool to room temp within 30 mins. Rapid chill to ≤ 3°C in airtight stainless steel container.',
          segregationAlert: '⚠️ Critical: Keep segregated from citrus, acidic curries, and unwashed raw salad items.',
          safeWindow: '+14 Hours (Cold Chain Active)',
          targetTemp: 'Refrigerate ≤ 3°C',
          vessel: vesselType,
        };
      } else if (lower.includes('rice') || lower.includes('biryani') || lower.includes('pulao') || lower.includes('khichdi')) {
        protocol = {
          dish: foodType,
          quantity: `${foodQuantity} kg (~${Math.round(parseFloat(foodQuantity || '10') * 3.5)} portions)`,
          perishability: 'Rapid Spore Risk (B. cereus Risk)',
          badgeClass: 'bg-orange-50 text-orange-800 border-orange-200',
          coolingRule: 'Shallow pan spread. Rapid chill to ≤ 4°C within 60 mins. Reheat only once.',
          segregationAlert: '⚠️ Isolate from high-moisture leafy gravies; store on upper dry refrigeration rack.',
          safeWindow: '+18 Hours (Protected Window)',
          targetTemp: 'Shallow Spread ≤ 4°C',
          vessel: vesselType,
        };
      } else if (lower.includes('dal') || lower.includes('sambhar') || lower.includes('rajma') || lower.includes('chana')) {
        protocol = {
          dish: foodType,
          quantity: `${foodQuantity} kg (~${Math.round(parseFloat(foodQuantity || '10') * 3.5)} portions)`,
          perishability: 'Moderate Perishability (Legume Base)',
          badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
          coolingRule: 'Cool to room temp within 45 mins. Refrigerate at 4°C with vented lid.',
          segregationAlert: '⚠️ Do not store adjacent to raw vegetables, fermented batters, or open curd.',
          safeWindow: '+16 Hours (Safe Holding)',
          targetTemp: 'Refrigerate ≤ 4°C',
          vessel: vesselType,
        };
      } else {
        protocol = {
          dish: foodType,
          quantity: `${foodQuantity} kg (~${Math.round(parseFloat(foodQuantity || '10') * 3.5)} portions)`,
          perishability: 'Moderate Perishability (Vegetable Base)',
          badgeClass: 'bg-emerald-50 text-[#0F5132] border-emerald-200',
          coolingRule: 'Seal with food-grade foil. Maintain holding temp 60°C or chill to 4°C.',
          segregationAlert: '⚠️ Store strictly separated from raw onions and uncooked root vegetables.',
          safeWindow: '+20 Hours (Safe Holding)',
          targetTemp: 'Hold >60°C or Chill ≤4°C',
          vessel: vesselType,
        };
      }

      setGeneratedProtocol(protocol);

      // Persist what was just generated so it shows up in the NGO feed
      createFoodProtocol(protocol).then((result) => {
        if (!result.success) {
          setSaveError(result.error);
        }
      });
    }, 1000);
  };

  const handlePublishProtocolToNgo = () => {
    if (!generatedProtocol) return;
    setIsBroadcasting(true);
    setTimeout(() => {
      setIsBroadcasting(false);
      setBroadcastDone(true);
      // refresh so the surplus-listings feed reflects the latest DB state
      getFoodProtocols();
      const kg = parseFloat(foodQuantity) || 12;
      onBroadcastSurplusToNgo(kg, `${generatedProtocol.dish} (${kg}kg) • ${generatedProtocol.safeWindow}`);
      setTimeout(() => setBroadcastDone(false), 4000);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1C1917] font-sans pt-24 pb-16 selection:bg-[#0F5132] selection:text-white">
      
      {/* Top Bar */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E5E5]">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToLanding}
              className="p-2 rounded-xl bg-white border border-[#E5E5E5] hover:bg-[#F4F4F5] text-[#1C1917] transition-colors shadow-sm cursor-pointer"
              title="Back to Landing Page"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-[#1C1917] tracking-tight">Kitchen Staff Portal</h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#0F5132]/10 text-[#0F5132] border border-[#0F5132]/20">
                  Role: KITCHEN_ADMIN
                </span>
              </div>
              <p className="text-xs text-[#52525B] mt-0.5">
                {data.kitchenName} • {data.location}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-[#E5E5E5] shadow-sm text-xs font-medium text-[#1C1917]">
              <span className="w-2 h-2 rounded-full bg-[#0F5132] animate-pulse" />
              <span>Preservation Engine: Active (v2.0)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* HERO CARD (AI FORECAST) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E5E5] shadow-sm overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0F5132] to-[#198754]" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0F5132]">
                <Sparkles className="w-4 h-4 text-[#0F5132]" />
                <span>AI PREDICTIVE KITCHEN DEMAND MODEL</span>
              </div>

              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1C1917] font-display tracking-tight">
                  Today's Prediction: <span className="text-[#0F5132] font-extrabold">{data.forecast.todayPrediction.toLocaleString()}</span> Meals
                </h2>
                <p className="text-sm text-[#52525B] mt-1.5">
                  Optimized for Lunch & Dinner based on real-time monsoon sensors and campus activity.
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#0F5132]/10 text-[#0F5132] border border-[#0F5132]/20">
                  <CloudRain className="w-3.5 h-3.5 text-[#0F5132]" />
                  Heavy Rain
                </span>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#D9534F]/10 text-[#D9534F] border border-[#D9534F]/20">
                  <GraduationCap className="w-3.5 h-3.5 text-[#D9534F]" />
                  Exams Week
                </span>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#F4F4F5] text-[#52525B] border border-[#E5E5E5]">
                  Confidence: {data.forecast.confidenceScore}%
                </span>
              </div>
            </div>

            {/* Quick Prep Recommendation Pill */}
            <div className="p-4 rounded-2xl bg-[#F4F4F5] border border-[#E5E5E5] md:w-64 shrink-0 flex flex-col justify-between shadow-sm">
              <div className="flex items-center justify-between text-xs font-semibold text-[#1C1917] mb-2">
                <span>BATCH TARGET</span>
                <span className="text-[#0F5132]">Recommended</span>
              </div>
              <div className="text-2xl font-bold text-[#0F5132] font-display">
                ~185 kg Grains
              </div>
              <p className="text-[11px] text-[#52525B] mt-1">
                Estimated consumption peak between 13:00 - 14:15.
              </p>
            </div>

          </div>
        </motion.div>

        {/* QUICK ACTIONS (2 SIDE-BY-SIDE CARDS) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* CARD 1: LOG ACTUALS */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-6 rounded-3xl bg-white border border-[#E5E5E5] shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E5] mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-[#0F5132]/10 text-[#0F5132]">
                    <Utensils className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#1C1917]">Log Actuals</h3>
                    <p className="text-xs text-[#52525B]">Record prepared vs consumed counts</p>
                  </div>
                </div>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-[#F4F4F5] text-[#52525B]">
                  Meal Shift
                </span>
              </div>

              <form onSubmit={handleSubmitActuals} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                      Total Prepared (Portions)
                    </label>
                    <input
                      type="number"
                      required
                      value={totalPrepared}
                      onChange={(e) => setTotalPrepared(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F4F5] border border-[#E5E5E5] text-[#1C1917] focus:bg-white focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] text-sm font-semibold outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                      Total Consumed (Portions)
                    </label>
                    <input
                      type="number"
                      required
                      value={totalConsumed}
                      onChange={(e) => setTotalConsumed(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F4F5] border border-[#E5E5E5] text-[#1C1917] focus:bg-white focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] text-sm font-semibold outline-none"
                    />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#F4F4F5] border border-[#E5E5E5] text-xs flex items-center justify-between">
                  <span className="text-[#52525B]">Detected Meal Leftover:</span>
                  <span className="font-bold text-[#D9534F]">
                    {Math.max(0, (parseInt(totalPrepared) || 0) - (parseInt(totalConsumed) || 0))} Portions
                  </span>
                </div>

                {logSuccessMsg && (
                  <div className="p-3 rounded-xl bg-[#0F5132]/10 border border-[#0F5132]/20 text-[#0F5132] text-xs font-medium flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{logSuccessMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmittingLog}
                  className="w-full py-3 rounded-xl bg-[#0F5132] hover:bg-[#0B3A24] hover:-translate-y-0.5 text-white font-semibold text-xs tracking-tight transition-all duration-200 shadow-sm active:translate-y-0 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmittingLog ? "Submitting Audit..." : "Submit Actuals to Model"}</span>
                </button>
              </form>
            </div>
          </motion.div>

          {/* CARD 2: LOG & PRESERVE ENGINE */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-6 rounded-3xl bg-white border border-[#E5E5E5] shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E5] mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200">
                    <ThermometerSnowflake className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#1C1917]">Log & Preserve</h3>
                    <p className="text-xs text-[#52525B]">Smart Segregation & Temperature SOPs</p>
                  </div>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-300 font-semibold">
                  AI Hygiene
                </span>
              </div>

              {/* Form to Log & Generate Protocol */}
              <form onSubmit={handleGenerateProtocol} className="space-y-3.5">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#1C1917] mb-1 font-mono">
                      Food / Batch Type:
                    </label>
                    <select
                      value={foodType}
                      onChange={(e) => setFoodType(e.target.value)}
                      aria-label="Food or Batch Type"
                      className="w-full px-3 py-2 rounded-xl bg-[#F4F4F5] border border-[#E5E5E5] text-[#1C1917] text-xs font-semibold focus:bg-white focus:border-emerald-700 outline-none"
                    >
                      <option value="Paneer Butter Masala">Paneer Butter Masala</option>
                      <option value="Dal Tadka">Dal Tadka</option>
                      <option value="Steamed Basmati Rice">Steamed Basmati Rice</option>
                      <option value="Mixed Vegetable Curry">Mixed Vegetable Curry</option>
                      <option value="Sambhar">Sambhar</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1C1917] mb-1 font-mono">
                      Quantity (Kg):
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      required
                      value={foodQuantity}
                      onChange={(e) => setFoodQuantity(e.target.value)}
                      aria-label="Quantity in kg"
                      className="w-full px-3 py-2 rounded-xl bg-[#F4F4F5] border border-[#E5E5E5] text-[#1C1917] text-xs font-semibold focus:bg-white focus:border-emerald-700 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C1917] mb-1 font-mono">
                    Storage Container:
                  </label>
                  <select
                    value={vesselType}
                    onChange={(e) => setVesselType(e.target.value)}
                    aria-label="Storage Container Vessel"
                    className="w-full px-3 py-2 rounded-xl bg-[#F4F4F5] border border-[#E5E5E5] text-[#1C1917] text-xs font-medium focus:bg-white focus:border-emerald-700 outline-none"
                  >
                    <option value="Airtight Stainless Steel Gastronorm">Airtight Stainless Steel Gastronorm (GN 1/1)</option>
                    <option value="Insulated Camcarrier Container">Insulated Camcarrier Container</option>
                    <option value="Shallow Stainless Pan (65mm)">Shallow Stainless Pan (65mm - Fast Chill)</option>
                    <option value="Thermal Food-Grade Drum">Thermal Food-Grade Drum</option>
                  </select>
                </div>

                {/* Primary Button: Generate Storage Protocol */}
                <button
                  type="submit"
                  disabled={isGeneratingProtocol}
                  className="w-full py-2.5 rounded-xl bg-[#064E3B] hover:bg-[#022C22] hover:-translate-y-0.5 text-white font-semibold text-xs tracking-tight transition-all duration-200 shadow-[0_4px_14px_rgba(6,78,59,0.3)] active:translate-y-0 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isGeneratingProtocol ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-white" />
                      <span>Synthesizing Preservation SOPs...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>Generate Storage Protocol</span>
                    </>
                  )}
                </button>
              </form>

              {/* Protocol Skeleton Loader (1s simulated processing) */}
              {isGeneratingProtocol && (
                <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 animate-pulse space-y-2.5">
                  <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                  <div className="h-10 bg-slate-200 rounded"></div>
                  <div className="h-12 bg-amber-100 rounded"></div>
                  <div className="h-4 bg-emerald-100 rounded w-2/3"></div>
                </div>
              )}

              {/* Generated Protocol Output Box */}
              {!isGeneratingProtocol && generatedProtocol && (
                <div className="mt-4 p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2.5 text-xs shadow-inner">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-slate-700">
                      {generatedProtocol.dish} ({generatedProtocol.quantity})
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${generatedProtocol.badgeClass}`}>
                      {generatedProtocol.perishability}
                    </span>
                  </div>

                  <div className="text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200/80 leading-relaxed font-medium">
                    <span className="font-bold text-slate-900 block mb-0.5">Protocol:</span>
                    {generatedProtocol.coolingRule}
                  </div>

                  <div className="text-amber-900 bg-amber-50/90 border border-amber-200/90 p-2.5 rounded-lg flex items-start gap-2 leading-relaxed text-[11px]">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span>{generatedProtocol.segregationAlert}</span>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-200">
                    <div className="font-bold text-emerald-800 font-display">
                      Safe Window: <span className="font-extrabold text-emerald-900">{generatedProtocol.safeWindow}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">
                      {generatedProtocol.targetTemp}
                    </span>
                  </div>

                  {saveError && (
                    <div className="text-[#D9534F] bg-rose-50 border border-rose-200 p-2 rounded-lg text-[11px] font-medium">
                      Couldn't list this: {saveError}
                    </div>
                  )}
                  {isCreating && (
                    <div className="text-slate-500 text-[11px]">Saving to database…</div>
                  )}
                </div>
              )}

            </div>

            {/* Broadcast action button */}
            <div className="mt-4">
              {broadcastDone ? (
                <div className="p-3 rounded-xl bg-[#0F5132]/10 border border-[#0F5132]/20 text-[#0F5132] text-xs font-semibold text-center flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Preservation broadcasted! Verified NGOs alerted with safe window.</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handlePublishProtocolToNgo}
                  disabled={isBroadcasting || isGeneratingProtocol || !generatedProtocol}
                  className="w-full py-3 rounded-xl bg-[#0F5132] hover:bg-[#0B3A24] hover:-translate-y-0.5 text-white font-semibold text-xs tracking-tight transition-all duration-200 shadow-sm active:translate-y-0 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{isBroadcasting ? "Transmitting to NGO Radar..." : "Broadcast Surplus to Verified NGOs (1-Click)"}</span>
                </button>
              )}
            </div>
          </motion.div>

        </div>

        {/* SURPLUS LISTINGS TABLE (PURE WHITE SAAS CARD) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="p-6 rounded-3xl bg-white border border-[#E5E5E5] shadow-sm"
        >
          <div className="flex items-center justify-between pb-4 border-b border-[#E5E5E5] mb-4">
            <div>
              <h3 className="text-base font-bold text-[#1C1917]">Recent Surplus Listings</h3>
              <p className="text-xs text-[#52525B]">Live feed broadcast to the Bhubaneswar NGO mesh</p>
            </div>
            <span className="text-xs font-mono text-[#52525B]">
              Total Records: {listings.length}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E5E5E5] text-[#52525B] font-mono">
                  <th className="pb-3 font-semibold">LISTING ID</th>
                  <th className="pb-3 font-semibold">DISH</th>
                  <th className="pb-3 font-semibold">QUANTITY</th>
                  <th className="pb-3 font-semibold">SAFE WINDOW</th>
                  <th className="pb-3 font-semibold">PERISHABILITY</th>
                  <th className="pb-3 font-semibold">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E5E5]">
                {isLoadingListings && recentListings.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-[#52525B]">
                      Loading listings…
                    </td>
                  </tr>
                )}
                {!isLoadingListings && recentListings.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-[#52525B]">
                      No surplus listed yet — generate a protocol above to get started.
                    </td>
                  </tr>
                )}
                {recentListings.map((listing) => (
                  <tr key={listing.id} className="hover:bg-[#F4F4F5] transition-colors">
                    <td className="py-3 font-mono font-semibold text-[#1C1917]">
                      FP-{listing.id.slice(-4).toUpperCase()}
                    </td>
                    <td className="py-3 font-semibold text-[#1C1917]">{listing.dish}</td>
                    <td className="py-3 text-[#52525B]">{listing.quantity}</td>
                    <td className="py-3 text-[#52525B]">{listing.safeWindow}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${listing.badgeClass}`}>
                        {listing.perishability}
                      </span>
                    </td>
                    <td className="py-3">
                      {listing.status === 'claimed' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#0F5132]/10 text-[#0F5132] border border-[#0F5132]/20">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Claimed by NGO</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                          <Clock className="w-3 h-3" />
                          <span>Awaiting Pickup</span>
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

      </div>
    </div>
  );
};