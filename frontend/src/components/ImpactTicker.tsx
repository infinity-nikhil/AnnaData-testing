import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Utensils, HeartHandshake, CloudRain, ShieldCheck, Clock, TrendingUp } from 'lucide-react';
import { mockTelemetry } from '../data/mockData';
import { PlatformTelemetry } from '../types/data';

interface ImpactTickerProps {
  telemetry?: PlatformTelemetry;
}

interface CounterProps {
  from?: number;
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

const Counter: React.FC<CounterProps> = ({ from = 0, to, duration = 2.2, prefix = "", suffix = "" }) => {
  const [count, setCount] = useState(from);
  const [inView, setInView] = useState(false);
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (nodeRef.current) {
      observer.observe(nodeRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    let start = from;
    const end = to;
    const totalFrames = Math.round(duration * 60);
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const current = Math.round(start + (end - start) * (1 - Math.pow(1 - progress, 3)));
      setCount(current);

      if (frame === totalFrames) {
        clearInterval(counter);
        setCount(end);
      }
    }, 1000 / 60);

    return () => clearInterval(counter);
  }, [inView, from, to, duration]);

  return (
    <span ref={nodeRef} className="font-mono">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

export const ImpactTicker: React.FC<ImpactTickerProps> = ({ telemetry: parentTelemetry }) => {
  const [telemetry, setTelemetry] = useState<PlatformTelemetry>(parentTelemetry || mockTelemetry);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (parentTelemetry) {
      setTelemetry(parentTelemetry);
    }
  }, [parentTelemetry]);

  useEffect(() => {
    const fetchTelemetry = async () => {
      try {
        const res = await fetch('/api/telemetry');
        if (res.ok) {
          const data = await res.json();
          setTelemetry(data);
        }
      } catch (err) {
        console.warn("Using local telemetry store", err);
      }
    };

    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, 6000);
    return () => clearInterval(interval);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.7, 0.3]);
  const foregroundY = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);

  return (
    <section 
      id="impact-section"
      ref={containerRef} 
      className="relative py-24 md:py-32 overflow-hidden bg-white border-y border-[#E5E5E5]"
    >
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 pointer-events-none"
      >
        <motion.div 
          style={{ opacity: glowOpacity }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#0F5132]/5 rounded-full blur-[130px]" 
        />
        <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-[#D9534F]/4 rounded-full blur-[120px]" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Tag */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5E5E5] text-[#0F5132] text-xs font-mono mb-4 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#0F5132] animate-ping" />
            <span className="font-semibold">REAL-TIME AUDITED TELEMETRY</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1C1917] font-display"
          >
            Measured Community Impact.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-[#52525B] max-w-2xl mx-auto"
          >
            Connecting campus surplus with verified food banks across Bhubaneswar before safety windows expire.
          </motion.p>
        </div>

        {/* The 3 Core Required Impact Counters */}
        <motion.div 
          style={{ y: foregroundY }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          
          {/* Metric 1: Meals Saved */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative group p-8 rounded-3xl bg-white border border-[#E5E5E5] shadow-sm hover:border-[#0F5132]/40 hover:shadow-md transition-all duration-200 overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <Utensils className="w-24 h-24 text-[#0F5132]" />
            </div>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-[#0F5132]/10 text-[#0F5132] border border-[#0F5132]/20">
                <Utensils className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono text-[#52525B] uppercase tracking-wider font-semibold">Nutritional Security</span>
            </div>

            <div className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter text-[#1C1917] font-display my-2">
              <Counter to={telemetry.mealsSaved} />
            </div>
            
            <h3 className="text-xl font-bold text-[#0F5132] tracking-tight">Meals Saved</h3>
            <p className="mt-2 text-sm text-[#52525B] leading-relaxed">
              Wholesome cooked meals redirected from institutional disposal to high-need community kitchens.
            </p>

            <div className="mt-6 pt-4 border-t border-[#E5E5E5] flex items-center justify-between text-xs text-[#52525B] font-mono">
              <span>Verified Portions</span>
              <span className="text-[#0F5132] font-semibold">+180 Today</span>
            </div>
          </motion.div>

          {/* Metric 2: Active NGOs */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative group p-8 rounded-3xl bg-white border border-[#E5E5E5] shadow-sm hover:border-[#D9534F]/40 hover:shadow-md transition-all duration-200 overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <HeartHandshake className="w-24 h-24 text-[#D9534F]" />
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-[#D9534F]/10 text-[#D9534F] border border-[#D9534F]/20">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono text-[#52525B] uppercase tracking-wider font-semibold">Redistribution Network</span>
            </div>

            <div className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter text-[#1C1917] font-display my-2">
              <Counter to={telemetry.activeNgos} />
            </div>

            <h3 className="text-xl font-bold text-[#D9534F] tracking-tight">Active NGOs</h3>
            <p className="mt-2 text-sm text-[#52525B] leading-relaxed">
              FSSAI-compliant verified rescue partners responding on-demand via the volunteer mobile radar.
            </p>

            <div className="mt-6 pt-4 border-t border-[#E5E5E5] flex items-center justify-between text-xs text-[#52525B] font-mono">
              <span>Avg Response Window</span>
              <span className="text-[#0F5132] font-semibold">&lt; 15 Mins</span>
            </div>
          </motion.div>

          {/* Metric 3: CO2 Prevented */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative group p-8 rounded-3xl bg-white border border-[#E5E5E5] shadow-sm hover:border-[#0F5132]/40 hover:shadow-md transition-all duration-200 overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <CloudRain className="w-24 h-24 text-[#0F5132]" />
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-[#0F5132]/10 text-[#0F5132] border border-[#0F5132]/20">
                <CloudRain className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono text-[#52525B] uppercase tracking-wider font-semibold">Environmental Offset</span>
            </div>

            <div className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter text-[#1C1917] font-display my-2">
              <Counter to={telemetry.co2PreventedKg} suffix=" kg" />
            </div>

            <h3 className="text-xl font-bold text-[#0F5132] tracking-tight">CO2 Prevented</h3>
            <p className="mt-2 text-sm text-[#52525B] leading-relaxed">
              Methane and greenhouse gas emissions averted by diverting organic biomass away from landfills.
            </p>

            <div className="mt-6 pt-4 border-t border-[#E5E5E5] flex items-center justify-between text-xs text-[#52525B] font-mono">
              <span>Landfill Diversion</span>
              <span className="text-[#0F5132] font-semibold">98.4% Clean</span>
            </div>
          </motion.div>

        </motion.div>

        {/* Secondary Real-time Telemetry Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 p-4 rounded-2xl bg-[#FAFAFA] border border-[#E5E5E5] shadow-sm flex flex-wrap items-center justify-around gap-4 text-center text-xs font-mono text-[#52525B]"
        >
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#0F5132]" />
            <span>Match Accuracy: <strong className="text-[#1C1917] font-bold">{telemetry.matchAccuracyPct}%</strong></span>
          </div>
          <div className="hidden sm:block text-[#D4D4D8]">|</div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#D9534F]" />
            <span>Avg Dispatch ETA: <strong className="text-[#1C1917] font-bold">{telemetry.avgDispatchMins} Minutes</strong></span>
          </div>
          <div className="hidden sm:block text-[#D4D4D8]">|</div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#0F5132]" />
            <span>Economic Value Rescued: <strong className="text-[#0F5132] font-bold">₹{(telemetry.resourceValueSavedInr / 100000).toFixed(1)} Lakhs</strong></span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
