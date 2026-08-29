import React from 'react';
import { Wheat, Shield, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#0F5132] text-white py-14 md:py-20 border-t border-[#0B3A24] overflow-hidden">
      
      {/* Subtle Background Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 0)`,
          backgroundSize: '28px 28px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-white/15">
          
          {/* Logo & Platform Tagline */}
          <div className="flex items-center gap-3.5">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 text-white border border-white/20 shadow-sm">
              <Wheat className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white font-display tracking-tight">AnnaData</span>
              <span className="text-xs text-emerald-100/70 font-mono">Autonomous Food Security Grid • Bhubaneswar</span>
            </div>
          </div>

          {/* Minimalist Navigation & Legal Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-sm">
            <a href="#contact-section" className="text-[#D9534F] hover:text-white font-bold transition-colors">
              Contact Us
            </a>
            <a href="#how-it-works" className="text-emerald-100 hover:text-white transition-colors">
              How It Works
            </a>
            <a href="#impact-section" className="text-emerald-100 hover:text-white transition-colors">
              Measured Impact
            </a>
            <a href="#security" className="text-emerald-100 hover:text-white transition-colors flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-[#D9534F]" />
              <span>Safety Protocol</span>
            </a>
            <span className="font-mono text-xs text-emerald-200/60 bg-black/20 px-2.5 py-1 rounded-md border border-white/10">
              API v2.0
            </span>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-100/60 font-mono">
          <p>© 2026 AnnaData — Bhubaneswar, Odisha. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Engineered with care for zero food waste</span>
            <Heart className="w-3.5 h-3.5 text-[#D9534F] fill-[#D9534F]" />
          </div>
        </div>

      </div>
    </footer>
  );
};
