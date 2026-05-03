import { motion } from "framer-motion";
import { MapPin, Star, Lock } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";

interface MonumentCardProps {
  monument: {
    id: string;
    name: string;
    city: string;
    imageUrl: string;
    points: number;
    badge: string;
  };
  onClick: () => void;
  compact?: boolean;
}

export function MonumentCard({ monument, onClick, compact = false }: MonumentCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="cursor-pointer"
    >
      <Card className={`overflow-hidden rounded-2xl border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white dark:bg-slate-900 ${compact ? 'h-64' : 'h-80'}`}>
        <div className="relative h-3/5 overflow-hidden">
          <img 
            src={monument.imageUrl} 
            alt={monument.name}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Rating Badge */}
          <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 shadow-md">
            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
            <span className="text-xs font-bold text-slate-900 dark:text-white">4.9</span>
          </div>

          {/* Points Badge */}
          <div className="absolute bottom-3 left-3 bg-indigo-600 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-lg shadow-indigo-500/30">
            +{monument.points} PTS
          </div>
        </div>
        
        <CardContent className="p-3 h-2/5 flex flex-col justify-between">
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm leading-tight mb-1 line-clamp-1">
              {monument.name}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {monument.city}
            </p>
          </div>
          
          <div className="flex items-center justify-between mt-2">
            <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 rounded-full">
              {monument.badge}
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}