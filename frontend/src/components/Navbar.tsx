import React from 'react';
import { motion } from 'framer-motion';
import { UtensilsCrossed, HeartHandshake, Wheat, Activity, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  currentView: 'landing' | 'kitchen' | 'ngo';
  setCurrentView: (view: 'landing' | 'kitchen' | 'ngo') => void;
  onOpenKitchenReg: () => void;
  onOpenNgoReg: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  onOpenKitchenReg,
  onOpenNgoReg,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
        <div className="relative flex items-center justify-between h-16 px-4 md:px-6 rounded-2xl bg-white border border-[#E5E5E5] shadow-sm">
          
          {/* Logo & Platform Tag */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('landing')}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-[#0F5132]/10 border border-[#0F5132]/25 text-[#0F5132]">
              <Wheat className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0F5132] opacity-60"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0F5132]"></span>
              </span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-[#1C1917] font-display flex items-center gap-1.5">
                AnnaData
              </span>
              <span className="text-[10px] text-[#52525B] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0F5132]"></span>
                Bhubaneswar Live Network
              </span>
            </div>
          </div>

          {/* Center: View Switcher (Landing vs Kitchen vs NGO) with Terracotta underline highlight */}
          <nav className="hidden md:flex items-center p-1 rounded-xl bg-[#F4F4F5] border border-[#E5E5E5]">
            <button
              onClick={() => setCurrentView('landing')}
              className={`relative px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                currentView === 'landing'
                  ? 'text-[#1C1917]'
                  : 'text-[#52525B] hover:text-[#1C1917]'
              }`}
            >
              {currentView === 'landing' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white rounded-lg border border-[#E5E5E5] shadow-sm"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                >
                  {/* Subtle Terracotta Accent Line Underneath */}
                  <div className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#D9534F] rounded-full" />
                </motion.div>
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-[#0F5132]" />
                Landing Page
              </span>
            </button>

            <button
              onClick={() => setCurrentView('kitchen')}
              className={`relative px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                currentView === 'kitchen'
                  ? 'text-[#1C1917]'
                  : 'text-[#52525B] hover:text-[#1C1917]'
              }`}
            >
              {currentView === 'kitchen' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white rounded-lg border border-[#E5E5E5] shadow-sm"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                >
                  <div className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#D9534F] rounded-full" />
                </motion.div>
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <UtensilsCrossed className="w-3.5 h-3.5 text-[#0F5132]" />
                Kitchen Dashboard
              </span>
            </button>

            <button
              onClick={() => setCurrentView('ngo')}
              className={`relative px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                currentView === 'ngo'
                  ? 'text-[#1C1917]'
                  : 'text-[#52525B] hover:text-[#1C1917]'
              }`}
            >
              {currentView === 'ngo' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white rounded-lg border border-[#E5E5E5] shadow-sm"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                >
                  <div className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#D9534F] rounded-full" />
                </motion.div>
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <HeartHandshake className="w-3.5 h-3.5 text-[#D9534F]" />
                NGO Live Radar
              </span>
            </button>
          </nav>

          {/* Right Action CTAs */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenNgoReg}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#1C1917] bg-white border border-[#E5E5E5] hover:border-[#0F5132] hover:text-[#0F5132] transition-all shadow-sm"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#D9534F]" />
              Join as NGO
            </button>

            <button
              onClick={onOpenKitchenReg}
              className="relative group inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#0F5132] hover:bg-[#0B3A24] hover:-translate-y-0.5 transition-all duration-200 shadow-sm active:translate-y-0"
            >
              <span>Register Kitchen</span>
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </button>
          </div>

        </div>

        {/* Mobile secondary tab bar */}
        <div className="flex md:hidden mt-2 justify-center">
          <div className="inline-flex p-1 rounded-xl bg-white border border-[#E5E5E5] w-full justify-between shadow-sm">
            <button
              onClick={() => setCurrentView('landing')}
              className={`flex-1 py-1.5 text-center text-xs font-medium rounded-lg ${
                currentView === 'landing' ? 'bg-[#F4F4F5] text-[#1C1917] font-bold border border-[#E5E5E5]' : 'text-[#52525B]'
              }`}
            >
              Landing
            </button>
            <button
              onClick={() => setCurrentView('kitchen')}
              className={`flex-1 py-1.5 text-center text-xs font-medium rounded-lg ${
                currentView === 'kitchen' ? 'bg-[#0F5132]/10 text-[#0F5132] font-bold border border-[#0F5132]/20' : 'text-[#52525B]'
              }`}
            >
              Kitchen
            </button>
            <button
              onClick={() => setCurrentView('ngo')}
              className={`flex-1 py-1.5 text-center text-xs font-medium rounded-lg ${
                currentView === 'ngo' ? 'bg-[#D9534F]/10 text-[#D9534F] font-bold border border-[#D9534F]/20' : 'text-[#52525B]'
              }`}
            >
              NGO Radar
            </button>
          </div>
        </div>

      </div>
    </header>
  );
};
