import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Camera, Scan, RefreshCw } from 'lucide-react';

interface VisionScanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmSurplus: (item: string, kg: number) => void;
}

export const VisionScanModal: React.FC<VisionScanModalProps> = ({
  isOpen,
  onClose,
  onConfirmSurplus,
}) => {
  const [step, setStep] = useState<'preview' | 'scanning' | 'result'>('preview');
  const [selectedSample, setSelectedSample] = useState<'rice' | 'dal' | 'roti'>('rice');

  const sampleData = {
    rice: {
      title: "Steamed Basmati Rice Container",
      estimatedKg: 12,
      confidence: 97.4,
      volumeLiters: 18.5,
      temp: "64°C",
      safetyHours: 4,
      safeStatus: "SAFE",
      boxCoords: "top-[25%] left-[20%] w-[60%] h-[50%]",
    },
    dal: {
      title: "Yellow Dal Tadka Vat",
      estimatedKg: 8.5,
      confidence: 96.1,
      volumeLiters: 10.2,
      temp: "68°C",
      safetyHours: 3.5,
      safeStatus: "SAFE",
      boxCoords: "top-[30%] left-[25%] w-[50%] h-[45%]",
    },
    roti: {
      title: "Wheat Rotis / Chapatis Stack",
      estimatedKg: 6,
      confidence: 98.2,
      volumeLiters: 9.0,
      temp: "52°C",
      safetyHours: 2.5,
      safeStatus: "URGENT",
      boxCoords: "top-[28%] left-[22%] w-[56%] h-[48%]",
    }
  };

  const current = sampleData[selectedSample];

  const handleStartScan = () => {
    setStep('scanning');
    setTimeout(() => {
      setStep('result');
    }, 1400);
  };

  const handleConfirmAndPush = () => {
    onConfirmSurplus(current.title, current.estimatedKg);
    onClose();
    setStep('preview');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-2xl bg-white border border-[#E5E5E5] rounded-3xl overflow-hidden shadow-2xl text-[#1C1917]"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#E5E5E5]">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-[#0F5132]/10 text-[#0F5132] border border-[#0F5132]/20">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-display text-[#1C1917]">AnnaData Vision API 4.2</h3>
              <p className="text-xs text-[#52525B] font-medium">Volumetric Food Recognition & Weight Estimator</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#F4F4F5] hover:bg-[#E5E5E5] text-[#52525B] hover:text-[#1C1917] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Viewfinder simulation */}
        <div className="p-6">
          <div className="relative aspect-[16/10] bg-stone-950 rounded-2xl border border-stone-800 overflow-hidden flex flex-col justify-between p-4 shadow-inner">
            
            {/* Viewfinder Target Framing */}
            <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[#0F5132]" />
            <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-[#0F5132]" />
            <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-[#0F5132]" />
            <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-[#0F5132]" />

            {/* Top Bar HUD */}
            <div className="flex items-center justify-between text-xs font-mono text-emerald-400 z-10">
              <span className="flex items-center gap-1.5 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                OPTICAL SENSOR 01
              </span>
              <span className="text-stone-400">4K • 60FPS • ISO 200</span>
            </div>

            {/* Step: Preview or Result */}
            {step === 'preview' && (
              <div className="my-auto mx-auto text-center space-y-3 z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center mx-auto backdrop-blur-sm">
                  <Scan className="w-8 h-8 text-[#0F5132] animate-pulse" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Center Food Vessel in Viewfinder</p>
                  <p className="text-xs text-stone-300 mt-0.5">Select a sample container below to test detection</p>
                </div>

                {/* Sample selector */}
                <div className="flex justify-center gap-2 pt-2">
                  <button
                    onClick={() => setSelectedSample('rice')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-colors ${
                      selectedSample === 'rice' ? 'bg-[#0F5132] text-white shadow-sm' : 'bg-white/10 text-stone-300 hover:bg-white/20'
                    }`}
                  >
                    Rice Container
                  </button>
                  <button
                    onClick={() => setSelectedSample('dal')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-colors ${
                      selectedSample === 'dal' ? 'bg-[#0F5132] text-white shadow-sm' : 'bg-white/10 text-stone-300 hover:bg-white/20'
                    }`}
                  >
                    Dal Vat
                  </button>
                  <button
                    onClick={() => setSelectedSample('roti')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-colors ${
                      selectedSample === 'roti' ? 'bg-[#D9534F] text-white shadow-sm' : 'bg-white/10 text-stone-300 hover:bg-white/20'
                    }`}
                  >
                    Roti Stack
                  </button>
                </div>
              </div>
            )}

            {step === 'scanning' && (
              <div className="my-auto mx-auto text-center space-y-3 z-10">
                <motion.div
                  animate={{ y: [-40, 40, -40] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-full h-1 bg-[#0F5132] shadow-sm"
                />
                <RefreshCw className="w-10 h-10 text-[#0F5132] animate-spin mx-auto" />
                <p className="text-sm font-mono text-emerald-300 font-semibold">Neural Network Inferencing Volume & Mass...</p>
              </div>
            )}

            {step === 'result' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="my-auto mx-auto w-11/12 p-4 rounded-2xl bg-black/80 border-2 border-[#0F5132] backdrop-blur-md z-10"
              >
                <div className="flex items-center justify-between text-xs font-mono text-emerald-300 mb-1 font-semibold">
                  <span>[MATCH: {current.title.toUpperCase()}]</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40">
                    {current.confidence}% Confidence
                  </span>
                </div>

                <div className="text-3xl font-black font-display text-white mt-1">
                  Estimated: {current.estimatedKg}kg {selectedSample === 'rice' ? 'Rice' : selectedSample === 'dal' ? 'Dal' : 'Roti'}
                </div>

                <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-white/10 text-[11px] font-mono text-stone-300">
                  <div>
                    <span className="text-stone-400">VOLUME</span>
                    <div className="text-white font-bold">{current.volumeLiters} L</div>
                  </div>
                  <div>
                    <span className="text-stone-400">TEMP</span>
                    <div className="text-emerald-400 font-bold">{current.temp}</div>
                  </div>
                  <div>
                    <span className="text-stone-400">SAFE TIME</span>
                    <div className="text-emerald-300 font-bold">{current.safetyHours} Hours</div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Bottom Camera Trigger */}
            <div className="flex items-center justify-between z-10 pt-2">
              <span className="text-[10px] font-mono text-stone-400">Model: YOLO-Food-v8</span>
              
              {step === 'preview' && (
                <button
                  onClick={handleStartScan}
                  className="px-5 py-2.5 rounded-xl bg-[#0F5132] hover:bg-[#0B3A24] hover:-translate-y-0.5 text-white font-semibold text-xs tracking-tight transition-all duration-200 shadow-sm flex items-center gap-1.5"
                >
                  <Camera className="w-3.5 h-3.5" />
                  Capture & Analyze
                </button>
              )}

              {step === 'result' && (
                <div className="flex gap-2">
                  <button
                    onClick={() => setStep('preview')}
                    className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
                  >
                    Rescan
                  </button>
                  <button
                    onClick={handleConfirmAndPush}
                    className="px-4 py-2 rounded-xl bg-[#0F5132] hover:bg-[#0B3A24] text-white font-semibold text-xs shadow-sm transition-colors"
                  >
                    Confirm & Publish to Radar
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>

      </motion.div>
    </div>
  );
};
