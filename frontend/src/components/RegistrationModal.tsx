import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, UtensilsCrossed, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

interface RegistrationModalProps {
  isOpen: boolean;
  type: 'kitchen' | 'ngo';
  onClose: () => void;
  onSuccess: (role: 'kitchen' | 'ngo') => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  type,
  onClose,
  onSuccess,
}) => {
  const registerInstitution = useAuthStore((state) => state.registerInstitution);
  const isRegistering = useAuthStore((state) => state.isRegistering);

  const [formData, setFormData] = useState({
    organizationName: type === 'kitchen' ? 'SOA Bhubaneswar Hostel 5' : 'Asha Food Rescue',
    location: 'Bhubaneswar, Odisha',
    capacityValue: type === 'kitchen' ? 1200 : 80,
    contactPhone: '+91 94370 00000',
    contactEmail: '',
  });
  const [isDone, setIsDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const result = await registerInstitution({ type, ...formData });

    if (result.success) {
      setIsDone(true);
      setTimeout(() => {
        onSuccess(type);
        onClose();
        setIsDone(false);
      }, 1200);
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-md bg-white border border-[#E5E5E5] rounded-3xl overflow-hidden shadow-2xl text-[#1C1917] p-6 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-[#F4F4F5] hover:bg-[#E5E5E5] text-[#52525B] hover:text-[#1C1917] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isDone ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-[#0F5132]/10 text-[#0F5132] border border-[#0F5132]/30 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-xl font-bold font-display text-[#1C1917]">Onboarding Verified!</h3>
            <p className="text-xs text-[#52525B]">
              Welcome to the AnnaData Network. Redirecting to your dedicated {type === 'kitchen' ? 'Kitchen Staff Portal' : 'NGO Live Radar'}...
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="p-3 rounded-2xl bg-[#0F5132]/10 text-[#0F5132] border border-[#0F5132]/20">
                {type === 'kitchen' ? <UtensilsCrossed className="w-6 h-6" /> : <ShieldCheck className="w-6 h-6 text-[#D9534F]" />}
              </div>
              <div>
                <h3 className="text-lg font-bold font-display text-[#1C1917]">
                  {type === 'kitchen' ? 'Register as Institutional Kitchen' : 'Join as Verified NGO'}
                </h3>
                <p className="text-xs text-[#52525B]">
                  {type === 'kitchen' ? 'Predict demand and automate surplus redirection' : 'Receive real-time surplus alerts across Bhubaneswar'}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[#1C1917] font-semibold mb-1">
                  {type === 'kitchen' ? 'Kitchen / Mess Name' : 'NGO Organization Name'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.organizationName}
                  onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F4F5] border border-[#E5E5E5] text-[#1C1917] focus:bg-white focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[#1C1917] font-semibold mb-1">Campus / City</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F4F5] border border-[#E5E5E5] text-[#1C1917] focus:bg-white focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[#1C1917] font-semibold mb-1">
                    {type === 'kitchen' ? 'Daily Capacity' : 'Volunteers'}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min={1}
                      required
                      value={formData.capacityValue}
                      onChange={(e) => setFormData({ ...formData, capacityValue: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 pr-16 rounded-xl bg-[#F4F4F5] border border-[#E5E5E5] text-[#1C1917] focus:bg-white focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] transition-colors"
                    />
                    <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] text-[#A1A1AA]">
                      {type === 'kitchen' ? 'meals/day' : 'people'}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[#1C1917] font-semibold mb-1">Contact Phone</label>
                <input
                  type="tel"
                  required
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F4F5] border border-[#E5E5E5] text-[#1C1917] focus:bg-white focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[#1C1917] font-semibold mb-1">Contact Email</label>
                <input
                  type="text"
                  required
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F4F5] border border-[#E5E5E5] text-[#1C1917] focus:bg-white focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] transition-colors"
                  placeholder='johndoe@gmail.com'
                />
              </div>

              {error && (
                <div className="rounded-xl bg-[#D9534F]/10 border border-[#D9534F]/30 text-[#D9534F] px-3.5 py-2.5 text-[11px]">
                  {error}
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isRegistering}
                  className="w-full py-3 rounded-2xl bg-[#0F5132] hover:bg-[#0B3A24] hover:-translate-y-0.5 text-white font-semibold text-sm tracking-tight transition-all duration-200 shadow-sm active:translate-y-0 flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0"
                >
                  {isRegistering ? (
                    <span>Registering Institution...</span>
                  ) : (
                    <>
                      <span>Complete Registration & Open Portal</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  );
};