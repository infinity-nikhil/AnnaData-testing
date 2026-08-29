import React from 'react';
import { motion, Variants } from 'framer-motion';
import { 
  ChevronDown, 
  ArrowRight, 
  ShieldCheck, 
  UtensilsCrossed, 
  Cpu,
  ThermometerSnowflake
} from 'lucide-react';

interface HeroSectionProps {
  onRegisterKitchen: () => void;
  onJoinNgo: () => void;
  onScrollToImpact: () => void;
}

const heroTitleVariants: Variants = {
  hidden: { opacity: 0, y: 35, filter: 'blur(12px)', scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    scale: 1,
    transition: {
      duration: 1.1,
      delay: 0.2,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const heroContentFadeUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: (customDelay: number = 0.4) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.9,
      delay: customDelay,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export const HeroSection: React.FC<HeroSectionProps> = ({
  onRegisterKitchen,
  onJoinNgo,
  onScrollToImpact,
}) => {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#FAFAFA] pt-28 pb-16 selection:bg-[#064E3B] selection:text-white">
      
      {/* =========================================================================
          LAYER 1: DUAL-ROTATING BACKGROUND ORBIT SYSTEM (MANDALA + CIRCUIT NETWORK)
          ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        
        {/* Outer Clockwise Rotating Circular Network (60s rotation) */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="w-[880px] h-[880px] md:w-[1150px] md:h-[1150px] absolute flex items-center justify-center shrink-0"
        >
          <svg viewBox="0 0 800 800" fill="none" className="w-full h-full">
            {/* Outer Mandala & Radar Circles with boosted stroke opacity */}
            <circle cx="400" cy="400" r="380" className="stroke-slate-400/35" strokeWidth="1.5" strokeDasharray="6 8" />
            <circle cx="400" cy="400" r="330" className="stroke-emerald-600/30" strokeWidth="1.5" />
            <circle cx="400" cy="400" r="275" className="stroke-slate-400/35" strokeWidth="1.2" strokeDasharray="8 6" />
            <circle cx="400" cy="400" r="215" className="stroke-emerald-600/30" strokeWidth="1.5" />

            {/* Radial Heritage Mandala Petals */}
            {[...Array(16)].map((_, i) => (
              <g key={`outer-petal-${i}`} transform={`rotate(${i * 22.5} 400 400)`}>
                <path
                  d="M400 120 C430 220, 450 310, 400 400 C350 310, 370 220, 400 120 Z"
                  className="stroke-emerald-600/30 fill-emerald-600/[0.04]"
                  strokeWidth="1.2"
                />
                <circle cx="400" cy="120" r="3.5" className="fill-emerald-600/50" />
                <path d="M400 40 L400 110" className="stroke-slate-400/35" strokeWidth="1.2" strokeDasharray="3 4" />
                <circle cx="400" cy="40" r="2.5" className="fill-slate-400/50" />
              </g>
            ))}

            {/* Circuit Traces & Telemetry Branches */}
            {[...Array(8)].map((_, i) => (
              <g key={`circuit-${i}`} transform={`rotate(${i * 45 + 15} 400 400)`}>
                <path
                  d="M400 400 L490 310 L620 310 L680 250 L750 250"
                  className="stroke-emerald-600/30"
                  strokeWidth="1.5"
                />
                <circle cx="620" cy="310" r="4.5" className="fill-emerald-600/70" />
                <circle cx="750" cy="250" r="5.5" className="stroke-emerald-600/50 fill-white" strokeWidth="1.5" />
                <path
                  d="M400 400 L310 310 L220 310 L160 250 L90 250"
                  className="stroke-slate-400/35"
                  strokeWidth="1.5"
                />
                <circle cx="220" cy="310" r="4.5" className="fill-slate-400/70" />
                <circle cx="90" cy="250" r="5.5" className="stroke-slate-400/50 fill-white" strokeWidth="1.5" />
              </g>
            ))}
          </svg>

          {/* Glowing Node Dots on Outer Intersections */}
          <div className="absolute top-[20px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
          <div className="absolute bottom-[20px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
          <div className="absolute left-[20px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse shadow-[0_0_8px_#f59e0b]" />
          <div className="absolute right-[20px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
        </motion.div>

        {/* Inner Counter-Rotating Dashed Orbital Ring (40s counter-clockwise) */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="w-[520px] h-[520px] md:w-[680px] md:h-[680px] absolute flex items-center justify-center shrink-0"
        >
          <svg viewBox="0 0 500 500" fill="none" className="w-full h-full">
            <circle cx="250" cy="250" r="235" className="stroke-emerald-600/30" strokeWidth="1.8" strokeDasharray="8 8" />
            <circle cx="250" cy="250" r="175" className="stroke-slate-400/35" strokeWidth="1.5" strokeDasharray="4 6" />
            <circle cx="250" cy="250" r="115" className="stroke-emerald-600/30" strokeWidth="1.5" strokeDasharray="10 6" />
            <circle cx="250" cy="250" r="60" className="stroke-amber-600/30" strokeWidth="1.2" strokeDasharray="3 3" />
            
            {/* 12 Orbital Telemetry Tick Markers */}
            {[...Array(12)].map((_, i) => (
              <line
                key={`tick-${i}`}
                x1="250"
                y1="10"
                x2="250"
                y2="24"
                className="stroke-emerald-600/40"
                strokeWidth="2"
                transform={`rotate(${i * 30} 250 250)`}
              />
            ))}
          </svg>

          {/* Glowing Node Dots on Inner Orbital Intersections */}
          <div className="absolute top-[80px] right-[85px] w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
          <div className="absolute bottom-[80px] left-[85px] w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse shadow-[0_0_8px_#f59e0b]" />
        </motion.div>

        {/* Ambient Subtle Radial Glow Blooms */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[850px] md:h-[850px] bg-emerald-600/[0.07] rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-amber-500/[0.05] rounded-full blur-[100px] pointer-events-none" />
      </div>

      {/* =========================================================================
          LAYER 2: MAIN CENTER CONTENT
          ========================================================================= */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center flex flex-col items-center justify-center my-auto">
        
        {/* Top Status Pill: Highlighting Food Intelligence & Zero Hunger Odisha */}
        <motion.div
          variants={heroContentFadeUp}
          initial="hidden"
          animate="visible"
          custom={0.1}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/90 text-xs font-mono text-slate-800 mb-6 sm:mb-8 shadow-sm hover:border-emerald-600/40 transition-colors"
        >
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_6px_#10b981]"></span>
          </span>
          <span className="text-slate-600 font-medium">Food Intelligence Infrastructure</span>
          <span className="text-[#D9534F] font-semibold">• Zero Hunger Odisha</span>
        </motion.div>

        {/* The Hero Title (High-Contrast Masking + Ambient Halo Glow) */}
        <motion.div
          variants={heroTitleVariants}
          initial="hidden"
          animate="visible"
          className="relative flex items-center justify-center font-display font-black tracking-tighter select-none my-1"
        >
          {/* Soft Radial Gradient Glow behind the AnnaData Title */}
          <div className="bg-gradient-to-r from-amber-100/60 via-emerald-100/40 to-emerald-200/50 blur-2xl rounded-full w-3/4 h-24 absolute -z-10 pointer-events-none" />

          <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[11.5rem] leading-none flex items-center justify-center drop-shadow-[0_12px_24px_rgba(0,0,0,0.18)]">
            <span 
              className="text-mask-anna hover:brightness-105 transition-all duration-300 font-black"
              style={{ WebkitTextStroke: '1px rgba(15,23,42,0.12)' }}
            >
              Anna
            </span>
            <span 
              className="text-mask-data hover:brightness-110 transition-all duration-300 font-black"
              style={{ WebkitTextStroke: '1px rgba(15,23,42,0.12)' }}
            >
              Data
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={heroContentFadeUp}
          initial="hidden"
          animate="visible"
          custom={0.35}
          className="mt-6 md:mt-8 max-w-2xl text-lg sm:text-2xl md:text-3xl font-bold text-[#1C1917] tracking-tight leading-relaxed"
        >
          AI-Driven Circular Economy for Food Security.
        </motion.p>

        {/* Mini-Features Text */}
        <motion.p
          variants={heroContentFadeUp}
          initial="hidden"
          animate="visible"
          custom={0.5}
          className="mt-3 text-xs sm:text-sm text-[#52525B] font-mono max-w-lg leading-relaxed"
        >
          Predict campus kitchen demand. Generate AI preservation SOPs. Redistribute to verified shelters before expiry.
        </motion.p>

        {/* Interactive CTAs */}
        <motion.div
          variants={heroContentFadeUp}
          initial="hidden"
          animate="visible"
          custom={0.65}
          className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-md sm:max-w-none"
        >
          {/* Primary CTA: Register as Kitchen (Deep Emerald #064E3B with Elevated Glow) */}
          <button
            onClick={onRegisterKitchen}
            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-[#064E3B] hover:bg-[#022C22] text-white font-semibold text-base tracking-tight transition-all duration-200 shadow-[0_10px_25px_-5px_rgba(6,78,59,0.4)] hover:scale-105 active:scale-100 overflow-hidden cursor-pointer"
          >
            <UtensilsCrossed className="w-5 h-5 transition-transform group-hover:rotate-12 text-white" />
            <span>Register as Kitchen</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          {/* Secondary CTA: Join as NGO (Crisp White with Border and Hover Effects) */}
          <button
            onClick={onJoinNgo}
            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-white text-slate-800 border-2 border-slate-200 hover:border-emerald-600 font-semibold text-base tracking-tight transition-all duration-200 shadow-sm hover:scale-105 active:scale-100 cursor-pointer"
          >
            <ShieldCheck className="w-5 h-5 text-[#D9534F] transition-transform group-hover:scale-110" />
            <span>Join as NGO</span>
          </button>
        </motion.div>

        {/* Floating Bottom Pills (Glassmorphism + Subtle Micro-Interactions) */}
        <motion.div
          variants={heroContentFadeUp}
          initial="hidden"
          animate="visible"
          custom={0.8}
          className="mt-12 hidden md:flex items-center gap-4 text-xs text-slate-700 font-mono"
        >
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-md hover:-translate-y-1 transition-transform">
            <Cpu className="w-4 h-4 text-emerald-700" />
            <span className="font-medium">Weather & Attendance ML</span>
          </div>
          <span className="text-slate-300 font-bold">•</span>
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-md hover:-translate-y-1 transition-transform">
            <ThermometerSnowflake className="w-4 h-4 text-emerald-600" />
            <span className="font-medium">AI Preservation SOPs</span>
          </div>
          <span className="text-slate-300 font-bold">•</span>
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-md hover:-translate-y-1 transition-transform">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_6px_#f59e0b]"></span>
            <span className="font-medium">Automated NGO Routing</span>
          </div>
        </motion.div>

      </div>

      {/* Bottom Scroll Prompt */}
      <motion.div
        variants={heroContentFadeUp}
        initial="hidden"
        animate="visible"
        custom={0.95}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer group z-20"
        onClick={onScrollToImpact}
      >
        <span className="text-[11px] font-mono uppercase tracking-widest text-[#52525B] group-hover:text-[#064E3B] transition-colors mb-1.5 font-semibold">
          Explore Impact
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="p-1.5 rounded-full border border-[#E5E5E5] group-hover:border-emerald-600/50 transition-colors bg-white shadow-sm"
        >
          <ChevronDown className="w-4 h-4 text-[#52525B] group-hover:text-[#064E3B] transition-colors" />
        </motion.div>
      </motion.div>

    </section>
  );
};
