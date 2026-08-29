import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Clock, 
  Radio, 
  CheckCircle2, 
  Phone, 
  ShieldCheck, 
  AlertTriangle, 
  ArrowLeft,
  Utensils
} from 'lucide-react';
import { NgoDonationCard } from '../types/data';

interface NgoDashboardProps {
  feed: NgoDonationCard[];
  onClaimFood: (id: string) => void;
  onBackToLanding: () => void;
}

export const NgoDashboard: React.FC<NgoDashboardProps> = ({
  feed,
  onClaimFood,
  onBackToLanding,
}) => {
  const [filterType, setFilterType] = useState<'ALL' | 'URGENT' | 'SAFE' | 'NEARBY'>('ALL');
  const [selectedClaimCard, setSelectedClaimCard] = useState<NgoDonationCard | null>(null);
  const [claimSuccessModal, setClaimSuccessModal] = useState<boolean>(false);

  const filteredFeed = feed.filter((item) => {
    if (filterType === 'URGENT') return item.safetyStatus === 'URGENT';
    if (filterType === 'SAFE') return item.safetyStatus === 'SAFE';
    if (filterType === 'NEARBY') return item.distanceKm <= 3.0;
    return true;
  });

  const handleInitiateClaim = (card: NgoDonationCard) => {
    setSelectedClaimCard(card);
    setClaimSuccessModal(true);
    onClaimFood(card.id);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1C1917] font-sans pt-24 pb-20 selection:bg-[#0F5132] selection:text-white">
      
      {/* Mobile-Optimized Top App Bar */}
      <div className="max-w-xl mx-auto px-4 mb-4">
        <div className="flex items-center justify-between py-3 border-b border-[#E5E5E5]">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToLanding}
              className="p-2 rounded-xl bg-white border border-[#E5E5E5] hover:bg-[#F4F4F5] text-[#1C1917] transition-colors shadow-sm"
              title="Back to Landing Page"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs uppercase font-mono px-2 py-0.5 rounded-full bg-[#0F5132]/10 text-[#0F5132] font-bold border border-[#0F5132]/20">
                  Role: NGO_VOLUNTEER
                </span>
              </div>
              <span className="text-xs text-[#52525B] block mt-0.5 font-medium">
                Asha Kiran Rescue Team • Bhubaneswar Grid
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0F5132]/10 border border-[#0F5132]/20 text-[11px] font-mono text-[#0F5132] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#0F5132] animate-ping" />
              <span>GPS Live</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-xl mx-auto px-4 space-y-5">
        
        {/* HEADER: "Live Food Radar" */}
        <div className="relative p-5 rounded-3xl bg-white border border-[#E5E5E5] overflow-hidden shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-[#0F5132]/10 text-[#0F5132] border border-[#0F5132]/20">
                <Radio className="w-4 h-4 animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#1C1917] tracking-tight font-display">
                  Live Food Radar
                </h1>
                <p className="text-xs text-[#52525B] font-medium">
                  Showing active donations within 5 km radius
                </p>
              </div>
            </div>

            <span className="px-2.5 py-1 rounded-full bg-[#0F5132]/10 text-[#0F5132] text-xs font-mono font-bold border border-[#0F5132]/20">
              {feed.filter(i => i.status === 'AVAILABLE').length} Active
            </span>
          </div>

          {/* Quick Filter Tabs */}
          <div className="flex items-center gap-2 pt-2 overflow-x-auto pb-1 text-xs no-scrollbar">
            <button
              onClick={() => setFilterType('ALL')}
              className={`px-3.5 py-1.5 rounded-xl font-semibold transition-colors shrink-0 ${
                filterType === 'ALL'
                  ? 'bg-[#0F5132] text-white shadow-sm'
                  : 'bg-[#F4F4F5] text-[#52525B] hover:bg-[#E5E5E5] border border-[#E5E5E5]'
              }`}
            >
              All ({feed.length})
            </button>
            <button
              onClick={() => setFilterType('URGENT')}
              className={`px-3.5 py-1.5 rounded-xl font-semibold transition-colors shrink-0 flex items-center gap-1.5 ${
                filterType === 'URGENT'
                  ? 'bg-[#D9534F] text-white shadow-sm'
                  : 'bg-[#F4F4F5] text-[#52525B] hover:bg-[#E5E5E5] border border-[#E5E5E5]'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              Urgent First
            </button>
            <button
              onClick={() => setFilterType('SAFE')}
              className={`px-3.5 py-1.5 rounded-xl font-semibold transition-colors shrink-0 ${
                filterType === 'SAFE'
                  ? 'bg-[#0F5132] text-white shadow-sm'
                  : 'bg-[#F4F4F5] text-[#52525B] hover:bg-[#E5E5E5] border border-[#E5E5E5]'
              }`}
            >
              Safe Window
            </button>
            <button
              onClick={() => setFilterType('NEARBY')}
              className={`px-3.5 py-1.5 rounded-xl font-semibold transition-colors shrink-0 ${
                filterType === 'NEARBY'
                  ? 'bg-[#1C1917] text-white shadow-sm'
                  : 'bg-[#F4F4F5] text-[#52525B] hover:bg-[#E5E5E5] border border-[#E5E5E5]'
              }`}
            >
              &lt; 3.0 km
            </button>
          </div>
        </div>

        {/* DONATION FEED */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredFeed.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`relative p-5 rounded-3xl border transition-all ${
                  card.status === 'CLAIMED'
                    ? 'bg-[#FAFAFA] border-[#E5E5E5] opacity-70'
                    : 'bg-white border-[#E5E5E5] shadow-sm hover:border-[#0F5132]/40 hover:shadow-md'
                }`}
              >
                {/* Top Row: Source & Distance */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#52525B] block font-semibold">
                      SURPLUS ORIGIN
                    </span>
                    <h3 className="text-lg font-bold text-[#1C1917] font-display">
                      {card.source}
                    </h3>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#F4F4F5] border border-[#E5E5E5] text-xs font-semibold text-[#1C1917]">
                    <MapPin className="w-3.5 h-3.5 text-[#0F5132] shrink-0" />
                    <span>{card.distance}</span>
                  </div>
                </div>

                {/* Details Row */}
                <div className="p-3.5 rounded-2xl bg-[#F4F4F5] border border-[#E5E5E5] mb-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <Utensils className="w-4 h-4 text-[#0F5132]" />
                    <span className="text-base font-bold text-[#1C1917] tracking-tight">
                      {card.details}
                    </span>
                  </div>
                  <p className="text-xs text-[#52525B] font-medium">
                    {card.foodType} • {card.packagingType}
                  </p>
                </div>

                {/* Safety Status Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-[#52525B] font-mono font-semibold">
                    SAFETY WINDOW:
                  </span>

                  {card.safetyStatus === 'SAFE' ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F5132]/10 text-[#0F5132] font-bold text-xs border border-[#0F5132]/20">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{card.timeRemainingText}</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D9534F]/10 text-[#D9534F] font-bold text-xs border border-[#D9534F]/20">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>{card.timeRemainingText}</span>
                    </span>
                  )}
                </div>

                {/* Primary Action Button */}
                {card.status === 'AVAILABLE' ? (
                  <button
                    onClick={() => handleInitiateClaim(card)}
                    className="w-full py-3.5 px-4 rounded-2xl bg-[#0F5132] hover:bg-[#0B3A24] hover:-translate-y-0.5 text-white font-semibold text-sm tracking-tight transition-all duration-200 flex items-center justify-center gap-2 shadow-sm active:translate-y-0"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Claim Food Rescue ({card.portions} Portions)</span>
                  </button>
                ) : (
                  <div className="w-full py-3 px-4 rounded-2xl bg-[#F4F4F5] border border-[#E5E5E5] text-[#52525B] font-medium text-xs text-center flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0F5132]" />
                    <span>Claimed by your team • En route</span>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>

      {/* Claim Confirmation Modal */}
      {claimSuccessModal && selectedClaimCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-white text-[#1C1917] border border-[#E5E5E5] shadow-2xl space-y-5"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#0F5132]/10 text-[#0F5132] border border-[#0F5132]/30 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-2xl font-bold font-display text-[#1C1917]">Dispatch Confirmed!</h3>
              <p className="text-xs text-[#52525B]">
                Kitchen has been notified that your volunteer is arriving for pickup.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F4F4F5] border border-[#E5E5E5] text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-[#52525B]">Pickup Location:</span>
                <span className="font-bold text-[#1C1917]">{selectedClaimCard.source}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#52525B]">Food Items:</span>
                <span className="font-bold text-[#0F5132]">{selectedClaimCard.details}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#52525B]">Safety Expiration:</span>
                <span className="font-mono font-bold text-[#D9534F]">{selectedClaimCard.timeRemainingText}</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <a
                href={`tel:${selectedClaimCard.contactPhone || '+919437012345'}`}
                className="w-full py-3 rounded-2xl bg-[#0F5132] hover:bg-[#0B3A24] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Call Kitchen Staff Desk</span>
              </a>

              <button
                onClick={() => setClaimSuccessModal(false)}
                className="w-full py-3 rounded-2xl bg-[#F4F4F5] hover:bg-[#E5E5E5] text-[#1C1917] font-semibold text-xs transition-colors border border-[#E5E5E5]"
              >
                Close & View Radar
              </button>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#52525B]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0F5132]" />
              <span>Verified Food Redistribution Protocol</span>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
};
