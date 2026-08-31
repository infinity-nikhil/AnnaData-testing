import React, { useState, useEffect } from 'react';
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
  Utensils,
  Loader2,
} from 'lucide-react';
import { NgoDonationCard } from '../types/data';
import { useFoodStore, type FoodProtocolListing } from '../store/useFoodStore';
import { useAuthStore } from '../store/useAuthStore'; // adjust path if yours differs

interface NgoDashboardProps {
  feed: NgoDonationCard[];
  onClaimFood: (id: string) => void;
  onBackToLanding: () => void;
}

// perishability is a free-text label from the kitchen ("High Perishability
// (Dairy Active)", "Rapid Spore Risk...", etc.) — this is a simple heuristic
// until the backend exposes a real urgency field.
const isHighRisk = (perishability: string) => /high|rapid/i.test(perishability);

export const NgoDashboard: React.FC<NgoDashboardProps> = ({
  onClaimFood,
  onBackToLanding,
}) => {
  const [filterType, setFilterType] = useState<'ALL' | 'HIGH_RISK' | 'SAFE'>('ALL');
  const [selectedClaimCard, setSelectedClaimCard] = useState<FoodProtocolListing | null>(null);
  const [claimSuccessModal, setClaimSuccessModal] = useState<boolean>(false);

  const {
    listings,
    isLoadingListings,
    getFoodProtocols,
    claimFoodProtocol,
    claimingId,
  } = useFoodStore();
  const { authInstitution } = useAuthStore();
  const [claimError, setClaimError] = useState<string | null>(null);

  useEffect(() => {
    getFoodProtocols();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Newest 4 rows straight from the DB — this is the live radar feed.
  const recentListings = [...listings]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 4);

  const filteredFeed = recentListings.filter((item) => {
    if (filterType === 'HIGH_RISK') return isHighRisk(item.perishability);
    if (filterType === 'SAFE') return !isHighRisk(item.perishability);
    return true;
  });

  const handleInitiateClaim = async (listing: FoodProtocolListing) => {
    setClaimError(null);
    const result = await claimFoodProtocol(listing.id);

    if (result.success) {
      // the claim response is the raw updated row — it doesn't carry
      // kitchenName/kitchenLocation (those only come from the joined GET),
      // so merge onto the card we already have rather than using it alone
      setSelectedClaimCard({ ...listing, ...result.data });
      setClaimSuccessModal(true);
      onClaimFood(listing.id);
    } else {
      // most likely a 409 — another NGO won the race. The store already
      // refetches the list on 409, so the card will flip to "claimed" on
      // its own; we just need to surface why the click didn't go through.
      setClaimError(result.error);
      setTimeout(() => setClaimError(null), 5000);
    }
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
                  Showing the {recentListings.length} most recent surplus listings
                </p>
              </div>
            </div>

            <span className="px-2.5 py-1 rounded-full bg-[#0F5132]/10 text-[#0F5132] text-xs font-mono font-bold border border-[#0F5132]/20">
              {recentListings.filter(i => i.status === 'available').length} Active
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
              All ({recentListings.length})
            </button>
            <button
              onClick={() => setFilterType('HIGH_RISK')}
              className={`px-3.5 py-1.5 rounded-xl font-semibold transition-colors shrink-0 flex items-center gap-1.5 ${
                filterType === 'HIGH_RISK'
                  ? 'bg-[#D9534F] text-white shadow-sm'
                  : 'bg-[#F4F4F5] text-[#52525B] hover:bg-[#E5E5E5] border border-[#E5E5E5]'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              High Perishability
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
          </div>
        </div>

        {/* DONATION FEED */}
        <div className="space-y-4">
          {claimError && (
            <div className="p-3 rounded-2xl bg-[#D9534F]/10 border border-[#D9534F]/20 text-[#D9534F] text-xs font-semibold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{claimError}</span>
            </div>
          )}

          {isLoadingListings && recentListings.length === 0 && (
            <div className="p-6 rounded-3xl bg-white border border-[#E5E5E5] text-center text-sm text-[#52525B]">
              Loading nearby listings…
            </div>
          )}

          {!isLoadingListings && filteredFeed.length === 0 && (
            <div className="p-6 rounded-3xl bg-white border border-[#E5E5E5] text-center text-sm text-[#52525B]">
              No surplus listed yet — check back soon.
            </div>
          )}

          <AnimatePresence>
            {filteredFeed.map((listing, index) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`relative p-5 rounded-3xl border transition-all ${
                  listing.status === 'claimed'
                    ? 'bg-[#FAFAFA] border-[#E5E5E5] opacity-70'
                    : 'bg-white border-[#E5E5E5] shadow-sm hover:border-[#0F5132]/40 hover:shadow-md'
                }`}
              >
                {/* Top Row: Source & Location */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="min-w-0">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#52525B] block font-semibold">
                      SURPLUS ORIGIN
                    </span>
                    <h3 className="text-lg font-bold text-[#1C1917] font-display truncate">
                      {listing.kitchenName}
                    </h3>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#F4F4F5] border border-[#E5E5E5] text-xs font-semibold text-[#1C1917] max-w-[45%] shrink-0">
                    <MapPin className="w-3.5 h-3.5 text-[#0F5132] shrink-0" />
                    <span className="truncate">{listing.kitchenLocation}</span>
                  </div>
                </div>

                {/* Details Row */}
                <div className="p-3.5 rounded-2xl bg-[#F4F4F5] border border-[#E5E5E5] mb-3 shadow-sm">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2 min-w-0">
                      <Utensils className="w-4 h-4 text-[#0F5132] shrink-0" />
                      <span className="text-base font-bold text-[#1C1917] tracking-tight truncate">
                        {listing.dish}
                      </span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border shrink-0 ${listing.badgeClass}`}>
                      {listing.perishability}
                    </span>
                  </div>
                  <p className="text-xs text-[#52525B] font-medium">
                    {listing.quantity} • Stored in {listing.vessel}
                  </p>
                </div>

                {/* Segregation Alert */}
                <div className="flex items-start gap-2 mb-4 p-2.5 rounded-xl bg-amber-50/90 border border-amber-200/90 text-[11px] text-amber-900 leading-relaxed">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <span>{listing.segregationAlert}</span>
                </div>

                {/* Safety Window Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-[#52525B] font-mono font-semibold">
                    SAFE WINDOW:
                  </span>

                  {isHighRisk(listing.perishability) ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D9534F]/10 text-[#D9534F] font-bold text-xs border border-[#D9534F]/20">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>{listing.safeWindow}</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F5132]/10 text-[#0F5132] font-bold text-xs border border-[#0F5132]/20">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{listing.safeWindow}</span>
                    </span>
                  )}
                </div>

                {/* Primary Action Button */}
                {listing.status === 'available' ? (
                  <button
                    onClick={() => handleInitiateClaim(listing)}
                    disabled={claimingId === listing.id}
                    className="w-full py-3.5 px-4 rounded-2xl bg-[#0F5132] hover:bg-[#0B3A24] hover:-translate-y-0.5 text-white font-semibold text-sm tracking-tight transition-all duration-200 flex items-center justify-center gap-2 shadow-sm active:translate-y-0 disabled:opacity-60 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
                  >
                    {claimingId === listing.id ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Claiming…</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Claim Food Rescue</span>
                      </>
                    )}
                  </button>
                ) : listing.claimedByInstitutionId === authInstitution?.id ? (
                  <div className="w-full py-3 px-4 rounded-2xl bg-[#0F5132]/10 border border-[#0F5132]/20 text-[#0F5132] font-semibold text-xs text-center flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Claimed by your team • En route</span>
                  </div>
                ) : (
                  <div className="w-full py-3 px-4 rounded-2xl bg-[#F4F4F5] border border-[#E5E5E5] text-[#52525B] font-medium text-xs text-center flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0F5132]" />
                    <span>Already claimed by another team</span>
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
              <h3 className="text-2xl font-bold font-display text-[#1C1917]">Thank you For Connecting With AnnaData!</h3>
              <p className="text-xs text-[#52525B]">
                You can contact the kitchen that your volunteer is arriving for pickup.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F4F4F5] border border-[#E5E5E5] text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-[#52525B]">Pickup Location:</span>
                <span className="font-bold text-[#1C1917]">{selectedClaimCard.kitchenName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#52525B]">Food Items:</span>
                <span className="font-bold text-[#0F5132]">
                  {selectedClaimCard.dish} ({selectedClaimCard.quantity})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#52525B]">Safety Expiration:</span>
                <span className="font-mono font-bold text-[#D9534F]">{selectedClaimCard.safeWindow}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#F4F4F5] border border-[#E5E5E5] text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-[#1C1917]">The details has been sent to you via mail.</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#1C1917]">You can check and confirm the kitchen about your arrival</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              {/* contactPhone isn't returned by GET /food-protocols yet — using the
                  placeholder number until the backend includes it on the institution join */}
              {/* <a
                href="tel:+919437012345"
                className="w-full py-3 rounded-2xl bg-[#0F5132] hover:bg-[#0B3A24] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Call Kitchen Staff Desk</span>
              </a>  */}

              <button
                onClick={() => setClaimSuccessModal(false)}
                className="w-full py-3 rounded-2xl bg-[#0F5132] hover:bg-[#0B3A24] text-white font-semibold text-xs transition-colors border border-[#E5E5E5]"
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