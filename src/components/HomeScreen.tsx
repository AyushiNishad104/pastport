import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Camera, MapPin, Flame, Sparkles, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { monuments } from "../data/monuments";

interface HomeScreenProps {
  onScan: () => void;
  onNavigate: (screen: string) => void;
  visited: string[];
}

export function HomeScreen({ onScan, onNavigate, visited }: HomeScreenProps) {
  const nearbyMonuments = monuments.slice(0, 5);
  const dailyProgress = Math.min(visited.length, 3);

  return (
    <div className="space-y-8 pt-6">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-3xl overflow-hidden shadow-2xl shadow-indigo-500/20 h-64"
      >
        <img 
          src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1000&auto=format&fit=crop" 
          alt="India Heritage" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/90 via-indigo-900/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-semibold border border-amber-400/30 mb-3">
              <Sparkles className="w-3 h-3" />
              PREMIUM EXPERIENCE
            </span>
            <h1 className="text-3xl font-bold text-white tracking-tight mb-1">
              Discover India's <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">Timeless Heritage</span>
            </h1>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Dashboard */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-3 gap-3"
      >
        <Card className="bg-gradient-to-br from-indigo-600 to-purple-700 border-0 text-white shadow-lg shadow-indigo-500/30">
          <CardContent className="p-4 text-center">
            <Trophy className="w-6 h-6 mx-auto mb-2 text-amber-300" />
            <p className="text-2xl font-bold">{visited.length * 50}</p>
            <p className="text-xs text-indigo-200">Points</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 dark:from-slate-800 dark:to-slate-900 border-0 text-white shadow-lg">
          <CardContent className="p-4 text-center">
            <MapPin className="w-6 h-6 mx-auto mb-2 text-indigo-400" />
            <p className="text-2xl font-bold">{visited.length}</p>
            <p className="text-xs text-slate-400">Visited</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-amber-500 to-orange-600 border-0 text-white shadow-lg shadow-amber-500/30">
          <CardContent className="p-4 text-center">
            <Flame className="w-6 h-6 mx-auto mb-2 text-white" />
            <p className="text-2xl font-bold">{dailyProgress}/3</p>
            <p className="text-xs text-amber-100">Daily</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Scan Button - Central & Glowing */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur-xl opacity-50 animate-pulse" />
        <Button
          onClick={onScan}
          className="relative w-full h-20 text-xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-700 hover:via-purple-700 hover:to-indigo-800 border-0 rounded-2xl shadow-2xl flex items-center justify-center gap-3 group"
        >
          <Camera className="w-7 h-7 group-hover:scale-110 transition-transform" />
          Scan Monument
        </Button>
      </motion.div>

      {/* Horizontal Scroll - Nearby */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Explore Nearby</h3>
          <button onClick={() => onNavigate("map")} className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">View All</button>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory -mx-4 px-4 scrollbar-hide">
          {nearbyMonuments.map((monument, index) => {
            const isVisited = visited.includes(monument.id);
            return (
              <motion.div
                key={monument.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="snap-center shrink-0 w-64"
                onClick={() => onNavigate("map")}
              >
                <Card className={`overflow-hidden rounded-2xl border-0 cursor-pointer transition-all hover:scale-105 hover:shadow-xl ${isVisited ? 'ring-2 ring-green-500' : ''}`}>
                  <div className="relative h-40">
                    <img 
                      src={monument.imageUrl} 
                      alt={monument.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    {isVisited && (
                      <div className="absolute top-3 right-3 bg-green-500 text-white p-1.5 rounded-full">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      </div>
                    )}
                    <div className="absolute bottom-3 left-3 right-3">
                      <h4 className="text-white font-bold text-lg leading-tight">{monument.name}</h4>
                      <p className="text-slate-300 text-xs flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {monument.city}
                      </p>
                    </div>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-900 flex items-center justify-between">
                    <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">+{monument.points} PTS</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{monument.quiz.length} Questions</span>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}