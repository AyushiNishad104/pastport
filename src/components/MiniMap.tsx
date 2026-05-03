import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";

interface MiniMapProps {
  onClick: () => void;
}

export function MiniMap({ onClick }: MiniMapProps) {
  return (
    <div 
      onClick={onClick}
      className="relative h-40 bg-gradient-to-br from-blue-50 via-green-50 to-amber-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 cursor-pointer overflow-hidden group"
    >
      {/* Stylized India Map SVG */}
      <svg viewBox="0 0 400 350" className="w-full h-full opacity-30 dark:opacity-20">
        <path
          d="M200,30 L280,60 L320,120 L300,180 L260,220 L200,240 L140,220 L100,180 L80,120 L120,60 Z"
          fill="currentColor"
          className="text-slate-400 dark:text-slate-600"
        />
      </svg>

      {/* Pulsing Location Pin */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-indigo-500 rounded-full blur-md opacity-50" />
          <div className="relative bg-indigo-600 text-white p-2 rounded-full shadow-lg">
            <MapPin className="w-5 h-5" />
          </div>
        </div>
      </motion.div>

      {/* Overlay Text */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md">
          <p className="text-xs font-semibold text-slate-900 dark:text-white flex items-center gap-1">
            <Navigation className="w-3 h-3 text-indigo-500" />
            12 Monuments Nearby
          </p>
        </div>
        <div className="bg-indigo-600 text-white p-2 rounded-full shadow-lg group-hover:scale-110 transition-transform">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}