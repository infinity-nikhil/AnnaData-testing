import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CloudRain, 
  GraduationCap, 
  Clock, 
  CheckCircle2, 
  TrendingDown, 
  Navigation, 
  Layers, 
  ThermometerSnowflake, 
  RefreshCcw, 
  TrendingUp
} from 'lucide-react';

interface HowItWorksProps {
  onOpenScanModal?: () => void;
  onTryKitchenForecast: () => void;
  onViewLiveRadar: () => void;
}

type FoodBatchKey = 'paneer' | 'dal' | 'rice' | 'curry';

const preservationProtocols: Record<FoodBatchKey, {
  name: string;
  perishability: string;
  badgeClass: string;
  storageRule: string;
  segregationAlert: string;
  safeWindow: string;
  tempGuide: string;
}> = {
  paneer: {
    name: 'Paneer Masala (Dairy Base)',
    perishability: 'High Perishability',
    badgeClass: 'bg-rose-50 text-[#D9534F] border-rose-200 font-bold',
    storageRule: 'Cool to room temp within 30 mins. Rapid chill to ≤ 3°C in airtight stainless steel.',
    segregationAlert: '⚠️ Critical: Keep segregated from citrus, acidic curries, and unwashed raw salad items.',
    safeWindow: '+14 Hours',
    tempGuide: 'Chill ≤ 3°C | Airtight Container',
  },
  dal: {
    name: 'Dal Tadka (Legume Base)',
    perishability: 'Moderate Perishability',
    badgeClass: 'bg-amber-50 text-amber-800 border-amber-200 font-bold',
    storageRule: 'Cool to room temp within 45 mins. Refrigerate at 4°C with vented lid.',
    segregationAlert: '⚠️ Do not store adjacent to raw vegetables, fermented batters, or open curd.',
    safeWindow: '+16 Hours',
    tempGuide: 'Chill ≤ 4°C | Vented Gastronorm',
  },
  rice: {
    name: 'Steamed Rice (Grain Base)',
    perishability: 'Rapid Spore Risk',
    badgeClass: 'bg-orange-50 text-orange-800 border-orange-200 font-bold',
    storageRule: 'Shallow pan spread. Rapid chill to ≤ 4°C within 60 mins. Reheat only once.',
    segregationAlert: '⚠️ Isolate from high-moisture leafy gravies; store on upper dry refrigeration rack.',
    safeWindow: '+18 Hours',
    tempGuide: 'Shallow Spread ≤ 4°C | Single Reheat',
  },
  curry: {
    name: 'Mixed Veg Curry (Vegetable Base)',
    perishability: 'Moderate Perishability',
    badgeClass: 'bg-emerald-50 text-[#0F5132] border-emerald-200 font-bold',
    storageRule: 'Cover with food-grade foil. Maintain holding temp 60°C or chill to 4°C.',
    segregationAlert: '⚠️ Store strictly separated from raw onions and uncooked root vegetables.',
    safeWindow: '+20 Hours',
    tempGuide: 'Store ≤ 4°C | Food-Grade Foil Seal',
  },
};

export const HowItWorks: React.FC<HowItWorksProps> = ({
  onTryKitchenForecast,
  onViewLiveRadar,
}) => {
  const [simBatchType, setSimBatchType] = useState<FoodBatchKey>('paneer');
  const [simQuantity, setSimQuantity] = useState<number>(20);
  const [weatherCondition, setWeatherCondition] = useState<'rain' | 'clear'>('rain');
  const [examStatus, setExamStatus] = useState<boolean>(true);
  const [learningCycle, setLearningCycle] = useState<'day1' | 'week2' | 'month1'>('month1');

  const baseMeals = 1400;
  const weatherDeduction = weatherCondition === 'rain' ? 160 : 0;
  const examDeduction = examStatus ? 100 : 0;
  const simulatedTarget = baseMeals - weatherDeduction - examDeduction;

  const cycleMetrics = {
    day1: {
      accuracy: '81.5%',
      variance: '±180 meals',
      errorRate: '18.5%',
      feedbackSamples: '12 Logs Audited',
      weatherCalibration: '65%',
      attendanceCalibration: '70%',
      statusBadge: 'Raw Baseline'
    },
    week2: {
      accuracy: '93.8%',
      variance: '±38 meals',
      errorRate: '6.2%',
      feedbackSamples: '168 Logs Audited',
      weatherCalibration: '88%',
      attendanceCalibration: '91%',
      statusBadge: 'Feedback Tuned'
    },
    month1: {
      accuracy: '98.4%',
      variance: '±8 meals',
      errorRate: '1.6%',
      feedbackSamples: '740+ Logs Audited',
      weatherCalibration: '98%',
      attendanceCalibration: '99%',
      statusBadge: 'Self-Optimized'
    }
  };

  return (
    <section id="how-it-works" className="relative py-28 md:py-36 bg-[#FAFAFA] overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5E5E5] text-[#0F5132] text-xs font-mono mb-4 shadow-sm font-semibold"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>CIRCULAR REDISTRIBUTION PIPELINE</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1C1917] font-display"
          >
            How It Works.
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-[#52525B] max-w-2xl mx-auto"
          >
            A continuous closed-loop architecture connecting artificial intelligence with grassroots food rescue.
          </motion.p>
        </div>

        {/* =========================================================================
            FEATURE 1: PREDICT DEMAND (Z-Pattern)
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-28 md:mb-36">
          
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#0F5132]/10 border border-[#0F5132]/20 text-[#0F5132] text-xs font-mono font-semibold">
              <span>01 / FORECASTING ENGINE</span>
            </div>

            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1C1917] font-display">
              Predict Demand.
            </h3>

            <p className="text-lg text-[#52525B] leading-relaxed">
              Our AI models local weather, attendance, and history so you cook exactly what's needed.
            </p>

            <div className="space-y-3 pt-2 text-sm text-[#52525B]">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#0F5132] shrink-0 mt-0.5" />
                <span>Monsoon & temperature correlation prevents batch over-preparation by up to 24%.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#0F5132] shrink-0 mt-0.5" />
                <span>Syncs directly with university semester calendars and holiday leaves.</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onTryKitchenForecast}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#0F5132] hover:text-[#0B3A24] transition-colors group"
              >
                <span>Explore Kitchen Forecast View</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </motion.div>

          {/* Right: Graphic / Interactive Simulation */}
          <motion.div
            initial={{ opacity: 0, x: 60, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <div className="relative p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E5E5] shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
              
              <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-4 mb-6">
                <div>
                  <span className="text-xs font-mono text-[#52525B]">AI PREDICTION SIMULATOR</span>
                  <h4 className="text-base font-bold text-[#1C1917]">Demand Optimization Model</h4>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#0F5132]/10 text-[#0F5132] border border-[#0F5132]/20 text-xs font-mono font-semibold">
                  98.2% Accuracy
                </span>
              </div>

              {/* Interactive Simulation Controls */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between text-xs text-[#1C1917]">
                  <span className="font-mono font-medium">Weather Parameter:</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setWeatherCondition('rain')}
                      className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all text-xs font-semibold ${
                        weatherCondition === 'rain'
                          ? 'bg-[#0F5132] text-white shadow-sm'
                          : 'bg-[#F4F4F5] text-[#52525B] hover:bg-[#E5E5E5] border border-[#E5E5E5]'
                      }`}
                    >
                      <CloudRain className="w-3.5 h-3.5" />
                      Heavy Rain (-160)
                    </button>
                    <button
                      onClick={() => setWeatherCondition('clear')}
                      className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all text-xs font-semibold ${
                        weatherCondition === 'clear'
                          ? 'bg-[#0F5132] text-white shadow-sm'
                          : 'bg-[#F4F4F5] text-[#52525B] hover:bg-[#E5E5E5] border border-[#E5E5E5]'
                      }`}
                    >
                      Sunny / Normal
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-[#1C1917]">
                  <span className="font-mono font-medium">Campus Calendar:</span>
                  <button
                    onClick={() => setExamStatus(!examStatus)}
                    className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all text-xs font-semibold ${
                      examStatus
                        ? 'bg-[#D9534F]/10 border border-[#D9534F]/30 text-[#D9534F]'
                        : 'bg-[#F4F4F5] text-[#52525B] hover:bg-[#E5E5E5] border border-[#E5E5E5]'
                    }`}
                  >
                    <GraduationCap className="w-3.5 h-3.5" />
                    {examStatus ? "Exams Week Active (-100)" : "Regular Classes"}
                  </button>
                </div>
              </div>

              {/* AI Output Target Card */}
              <div className="p-5 rounded-2xl bg-[#F4F4F5] border border-[#E5E5E5] flex items-center justify-between shadow-sm">
                <div>
                  <span className="text-xs text-[#52525B] font-mono font-semibold">CALCULATED TARGET</span>
                  <div className="text-3xl font-bold font-display text-[#1C1917] mt-0.5">
                    {simulatedTarget.toLocaleString()} <span className="text-base font-normal text-[#52525B]">Meals</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="inline-flex items-center gap-1 text-[#0F5132] text-xs font-bold">
                    <TrendingDown className="w-3.5 h-3.5" />
                    <span>-{baseMeals - simulatedTarget} portions saved</span>
                  </div>
                  <div className="text-[11px] text-[#52525B] mt-1 font-mono">Zero Surplus Target</div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* =========================================================================
            FEATURE 2: DETECT LEFTOVERS (PRESERVATION & HYGIENE ENGINE)
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-28 md:mb-36">
          
          {/* Left: Interactive Preservation Simulator Card */}
          <motion.div
            initial={{ opacity: 0, x: -60, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 order-2 lg:order-1"
          >
            <div className="bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 rounded-2xl p-6 sm:p-7">
              
              {/* Card Top: Header & Badge */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200">
                    <ThermometerSnowflake className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono font-semibold text-emerald-800 uppercase tracking-wider">AI PRESERVATION SIMULATOR</span>
                    <h4 className="text-base font-bold text-slate-900">Dynamic Storage & Segregation</h4>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-[11px] font-mono font-bold">
                  SOP Engine
                </span>
              </div>

              {/* Top Section: Inputs */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 font-mono">
                    Select Batch Type:
                  </label>
                  <select
                    value={simBatchType}
                    onChange={(e) => setSimBatchType(e.target.value as FoodBatchKey)}
                    aria-label="Select Batch Type"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-semibold focus:bg-white focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 outline-none transition-all cursor-pointer"
                  >
                    <option value="paneer">Paneer Masala (Dairy Base)</option>
                    <option value="dal">Dal Tadka (Legume Base)</option>
                    <option value="rice">Steamed Rice (Grain Base)</option>
                    <option value="curry">Mixed Veg Curry (Vegetable Base)</option>
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5 font-mono">
                    <span>Quantity (Liters / Kg):</span>
                    <span className="text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {simQuantity} kg / ~{Math.round(simQuantity * 3.5)} portions
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="60"
                    step="5"
                    value={simQuantity}
                    onChange={(e) => setSimQuantity(Number(e.target.value))}
                    aria-label="Quantity in kg"
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-800"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                    <span>5 kg (Micro)</span>
                    <span>30 kg (Standard)</span>
                    <span>60 kg (Mega Vat)</span>
                  </div>
                </div>
              </div>

              {/* Bottom Section: AI Output Panel */}
              <div className="bg-slate-50 border border-slate-100 p-4 sm:p-5 rounded-xl mt-5 space-y-3">
                {/* Header with Perishability Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wide">
                    AI PROTOCOL RESPONSE
                  </span>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-mono border ${preservationProtocols[simBatchType].badgeClass}`}>
                    {preservationProtocols[simBatchType].perishability}
                  </span>
                </div>

                {/* Storage Rule Text */}
                <div className="text-xs text-slate-700 leading-relaxed font-medium bg-white p-3 rounded-lg border border-slate-200/80">
                  <span className="font-semibold text-slate-900 block mb-0.5">Storage Protocol:</span>
                  {preservationProtocols[simBatchType].storageRule}
                </div>

                {/* Segregation Alert */}
                <div className="text-xs text-amber-900 bg-amber-50/90 border border-amber-200/90 p-3 rounded-lg flex items-start gap-2 leading-relaxed">
                  <span className="text-amber-600 shrink-0 mt-0.5">⚠️</span>
                  <span>{preservationProtocols[simBatchType].segregationAlert}</span>
                </div>

                {/* Lifespan Metric */}
                <div className="pt-1 flex items-center justify-between border-t border-slate-200/60">
                  <div className="text-sm font-bold text-emerald-800 font-display">
                    Estimated Safe Window: <span className="underline decoration-emerald-500 font-black">{preservationProtocols[simBatchType].safeWindow}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">
                    {preservationProtocols[simBatchType].tempGuide}
                  </span>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Right: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6 order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#0F5132]/10 border border-[#0F5132]/20 text-[#0F5132] text-xs font-mono font-semibold">
              <span>02 / PRESERVATION & HYGIENE ENGINE</span>
            </div>

            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1C1917] font-display">
              Detect Leftovers.
            </h3>

            <p className="text-lg text-[#52525B] leading-relaxed">
              Log your batches. Our AI instantly generates segregation rules and temperature protocols to maximize shelf life.
            </p>

            <div className="space-y-3 pt-2 text-sm text-[#52525B]">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#0F5132] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[#1C1917] font-semibold">Smart Segregation:</strong> Prevent cross-contamination. The engine alerts you which items (e.g., dairy and citrus) must never share storage environments.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#0F5132] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[#1C1917] font-semibold">Lifespan Extension:</strong> Input quantity and food type to receive exact temperature controls and cooling timelines, effectively doubling the food's safe window.
                </span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onTryKitchenForecast}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#0F5132] hover:text-[#0B3A24] transition-colors group cursor-pointer"
              >
                <span>Open Kitchen Preservation Console</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </motion.div>

        </div>

        {/* =========================================================================
            FEATURE 3: REDISTRIBUTE SAFELY (Z-Pattern)
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-28 md:mb-36">
          
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#D9534F]/10 border border-[#D9534F]/20 text-[#D9534F] text-xs font-mono font-semibold">
              <span>03 / AUTONOMOUS DISPATCH</span>
            </div>

            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1C1917] font-display">
              Redistribute Safely.
            </h3>

            <p className="text-lg text-[#52525B] leading-relaxed">
              Automated matchmaking with local NGOs based on food type and safety windows.
            </p>

            <div className="space-y-3 pt-2 text-sm text-[#52525B]">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#D9534F] shrink-0 mt-0.5" />
                <span>Hyperlocal routing guarantees meals arrive at shelter homes within safe thermal windows.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#D9534F] shrink-0 mt-0.5" />
                <span>1-Click volunteer claiming with turn-by-turn dispatch navigation in Bhubaneswar.</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onViewLiveRadar}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#D9534F] hover:text-[#b43834] transition-colors group"
              >
                <span>Switch to NGO Live Radar View</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </motion.div>

          {/* Right: Graphic */}
          <motion.div
            initial={{ opacity: 0, x: 60, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <div className="relative p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E5E5] shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
              
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-3">
                  <div className="flex items-center gap-2">
                    <Navigation className="w-4 h-4 text-[#0F5132]" />
                    <span className="text-xs font-mono text-[#1C1917] font-bold">BHUBANESWAR REDISTRIBUTION MESH</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0F5132]/10 text-[#0F5132] border border-[#0F5132]/20 font-semibold">
                    Live Dispatch
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#F4F4F5] border border-[#E5E5E5] relative overflow-hidden shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#0F5132] animate-ping" />
                      <span className="text-xs font-bold text-[#1C1917]">Hostel 4 Kitchen</span>
                    </div>
                    <span className="text-xs font-mono text-[#0F5132] font-semibold">→ 2.5 km (8 mins)</span>
                    <span className="text-xs font-bold text-[#D9534F]">Asha Kiran Shelter</span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#E5E5E5] text-xs">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0F5132]/10 text-[#0F5132] font-mono font-bold">
                      <Clock className="w-3.5 h-3.5" />
                      SAFE - 4 Hours Left
                    </span>
                    <span className="text-[#52525B] font-mono text-[11px] flex items-center gap-1">
                      <ThermometerSnowflake className="w-3 h-3 text-[#0F5132]" />
                      Insulated Container
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-[#F4F4F5] border border-[#E5E5E5] shadow-sm">
                    <span className="text-[10px] font-mono text-[#52525B] font-semibold">MATCH LATENCY</span>
                    <div className="text-lg font-bold text-[#1C1917] font-display">1.4 Seconds</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#F4F4F5] border border-[#E5E5E5] shadow-sm">
                    <span className="text-[10px] font-mono text-[#52525B] font-semibold">SHELF RESCUE EFFICIENCY</span>
                    <div className="text-lg font-bold text-[#0F5132] font-display">99.1%</div>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

        </div>

        {/* =========================================================================
            FEATURE 4: LEARN & IMPROVE (Z-Pattern)
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Graphic */}
          <motion.div
            initial={{ opacity: 0, x: -60, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 order-2 lg:order-1"
          >
            <div className="relative p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E5E5] shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
              
              <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-4 mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-[#0F5132]/10 text-[#0F5132] border border-[#0F5132]/20">
                    <RefreshCcw className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-[#1C1917] font-bold block">REINFORCEMENT LEARNING ENGINE</span>
                    <span className="text-[10px] text-[#52525B] font-mono">Continuous Feedback & Calibration Loop</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#0F5132]/10 text-[#0F5132] border border-[#0F5132]/20 font-bold">
                  {cycleMetrics[learningCycle].statusBadge}
                </span>
              </div>

              {/* Interactive Cycle Selector Tabs */}
              <div className="p-1 rounded-2xl bg-[#F4F4F5] border border-[#E5E5E5] flex gap-1 mb-5">
                <button
                  type="button"
                  onClick={() => setLearningCycle('day1')}
                  className={`flex-1 py-2 px-2 text-center rounded-xl text-xs font-mono font-semibold transition-all ${
                    learningCycle === 'day1'
                      ? 'bg-white text-[#1C1917] border border-[#E5E5E5] shadow-sm'
                      : 'text-[#52525B] hover:text-[#1C1917]'
                  }`}
                >
                  Shift #01 (Baseline)
                </button>
                <button
                  type="button"
                  onClick={() => setLearningCycle('week2')}
                  className={`flex-1 py-2 px-2 text-center rounded-xl text-xs font-mono font-semibold transition-all ${
                    learningCycle === 'week2'
                      ? 'bg-[#0F5132]/15 text-[#0F5132] border border-[#0F5132]/30'
                      : 'text-[#52525B] hover:text-[#1C1917]'
                  }`}
                >
                  Shift #14 (Tuned)
                </button>
                <button
                  type="button"
                  onClick={() => setLearningCycle('month1')}
                  className={`flex-1 py-2 px-2 text-center rounded-xl text-xs font-mono font-semibold transition-all ${
                    learningCycle === 'month1'
                      ? 'bg-[#0F5132] text-white shadow-sm'
                      : 'text-[#52525B] hover:text-[#1C1917]'
                  }`}
                >
                  Shift #60 (Autonomous)
                </button>
              </div>

              {/* Main Accuracy Metric Display */}
              <div className="mb-5 p-4 sm:p-5 rounded-2xl bg-[#F4F4F5] border border-[#E5E5E5] relative overflow-hidden shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-[#52525B] uppercase tracking-wider font-semibold">Forecast Model Accuracy</span>
                  <span className="text-xs font-mono text-[#0F5132] flex items-center gap-1 font-bold">
                    <TrendingUp className="w-3.5 h-3.5" />
                    Error: {cycleMetrics[learningCycle].errorRate}
                  </span>
                </div>

                <div className="flex items-baseline gap-3">
                  <div className="text-4xl sm:text-5xl font-black font-display text-[#1C1917]">
                    {cycleMetrics[learningCycle].accuracy}
                  </div>
                  <span className="text-xs font-mono text-[#52525B]">
                    Surplus Variance: <strong className="text-[#0F5132]">{cycleMetrics[learningCycle].variance}</strong>
                  </span>
                </div>

                <div className="w-full h-2 rounded-full bg-[#E5E5E5] mt-3 overflow-hidden">
                  <motion.div
                    key={learningCycle}
                    initial={{ width: 0 }}
                    animate={{ width: cycleMetrics[learningCycle].accuracy }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-[#0F5132] to-[#198754] rounded-full shadow-sm"
                  />
                </div>
              </div>

              {/* Neural Weights */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 rounded-xl bg-[#F4F4F5] border border-[#E5E5E5] space-y-1.5 shadow-sm">
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#52525B]">
                    <span>Weather Tuning</span>
                    <span className="text-[#0F5132] font-bold">{cycleMetrics[learningCycle].weatherCalibration}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[#E5E5E5] overflow-hidden">
                    <div 
                      className="h-full bg-[#0F5132] rounded-full transition-all duration-500"
                      style={{ width: cycleMetrics[learningCycle].weatherCalibration }}
                    />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#F4F4F5] border border-[#E5E5E5] space-y-1.5 shadow-sm">
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#52525B]">
                    <span>Attendance Curve</span>
                    <span className="text-[#0F5132] font-bold">{cycleMetrics[learningCycle].attendanceCalibration}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[#E5E5E5] overflow-hidden">
                    <div 
                      className="h-full bg-[#0F5132] rounded-full transition-all duration-500"
                      style={{ width: cycleMetrics[learningCycle].attendanceCalibration }}
                    />
                  </div>
                </div>
              </div>

              {/* Real-time Feedback Log */}
              <div className="p-3.5 rounded-2xl bg-[#0F5132]/10 border border-[#0F5132]/20 text-xs flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#0F5132] shrink-0 mt-0.5" />
                <div className="font-mono text-[11px] text-[#1C1917]">
                  <span className="text-[#0F5132] font-bold">Feedback Ingestion: </span>
                  {cycleMetrics[learningCycle].feedbackSamples} • Post-distribution telemetry synced • Model converged for next shift.
                </div>
              </div>

            </div>
          </motion.div>

          {/* Right: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6 order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#0F5132]/10 border border-[#0F5132]/20 text-[#0F5132] text-xs font-mono font-semibold">
              <span>04 / CONTINUOUS FEEDBACK LOOP</span>
            </div>

            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1C1917] font-display">
              Learn & Improve.
            </h3>

            <p className="text-lg text-[#52525B] leading-relaxed">
              Every completed meal rescue feeds audit data back into the neural pipeline, continuously self-optimizing prep forecasts for future days.
            </p>

            <div className="space-y-3 pt-2 text-sm text-[#52525B]">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#0F5132] shrink-0 mt-0.5" />
                <span><strong>Closed-Loop Auditing:</strong> Compares actual mess consumption logs against predicted batch sizes to automatically tune neural weights.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#0F5132] shrink-0 mt-0.5" />
                <span><strong>NGO & Temperature Quality Verification:</strong> Delivery turnaround times and thermal safe windows reinforce route latency estimators.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#0F5132] shrink-0 mt-0.5" />
                <span><strong>Compound Precision:</strong> Prevents kitchen overproduction before food ever touches a stove, driving waste variance down to near zero.</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={onTryKitchenForecast}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#0F5132] hover:text-[#0B3A24] transition-colors group"
              >
                <span>View Kitchen Intelligence Forecast</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
