import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Search, MapPin, SlidersHorizontal, Star, ChevronRight, Navigation } from "lucide-react";
import { MonumentCard } from "./MonumentCard";
import { MiniMap } from "./MiniMap";
import { monuments } from "../data/monuments";

interface ExploreScreenProps {
  onMonumentSelect: (monument: typeof monuments[0]) => void;
  onNavigateToMap: () => void;
  visited: string[];
}

export function ExploreScreen({ onMonumentSelect, onNavigateToMap, visited }: ExploreScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading for skeleton effect
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const filters = ["All", "Mughal", "Ancient", "Colonial", "Religious", "Modern"];

  const popularMonuments = monuments.slice(0, 5);
  const nearbyMonuments = monuments.slice(2, 7);
  const recommendedMonuments = monuments.filter(m => !visited.includes(m.id)).slice(0, 4);

  return (
    <div className="min-h-screen pb-24 pt-4 space-y-6">
      {/* Sticky Search Header */}
      <div className="sticky top-0 z-40 bg-slate-50/90 dark:bg-slate-950/90 backdrop-blur-md px-4 py-2 -mx-4">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              type="text"
              placeholder="Search monuments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 rounded-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm"
            />
          </div>
          <Button variant="outline" size="icon" className="h-12 w-12 rounded-full border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <SlidersHorizontal className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </Button>
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2 mt-3 overflow-x-auto pb-2 scrollbar-hide">
          {filters.map((filter) => (
            <motion.button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedFilter === filter
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/30"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800"
              }`}
            >
              {filter}
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-8 px-4"
          >
            {/* Hero Banner */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="relative h-64 rounded-3xl overflow-hidden shadow-2xl shadow-indigo-500/20 group cursor-pointer"
              onClick={() => onMonumentSelect(monuments[0])}
            >
              <img
                src="https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1000&auto=format&fit=crop"
                alt="Taj Mahal"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="inline-block px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full mb-2 shadow-lg shadow-amber-500/30">
                  FEATURED
                </span>
                <h2 className="text-3xl font-bold text-white mb-1">Taj Mahal</h2>
                <p className="text-slate-300 flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Agra, Uttar Pradesh
                </p>
              </div>
            </motion.div>

            {/* Mini Map Preview */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Explore Map</h3>
                <button onClick={onNavigateToMap} className="text-sm text-indigo-600 dark:text-indigo-400 font-medium flex items-center gap-1">
                  Full Map <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <Card className="overflow-hidden border-0 shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50">
                <MiniMap onClick={onNavigateToMap} />
              </Card>
            </motion.div>

            {/* Popular Monuments (Horizontal) */}
            <motion.section
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Popular Monuments</h3>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory -mx-4 px-4 scrollbar-hide">
                {popularMonuments.map((monument, index) => (
                  <motion.div
                    key={monument.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="snap-center shrink-0 w-56"
                  >
                    <MonumentCard monument={monument} onClick={() => onMonumentSelect(monument)} />
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Nearby You (Vertical List) */}
            <motion.section
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Nearby You</h3>
                <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">
                  <Navigation className="w-3 h-3" /> GPS Active
                </span>
              </div>
              <div className="space-y-3">
                {nearbyMonuments.map((monument, index) => (
                  <motion.div
                    key={monument.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <Card 
                      className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all cursor-pointer group"
                      onClick={() => onMonumentSelect(monument)}
                    >
                      <div className="flex h-28">
                        <div className="w-28 relative overflow-hidden">
                          <img 
                            src={monument.imageUrl} 
                            alt={monument.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                            <span className="text-white text-xs font-bold">4.8</span>
                          </div>
                        </div>
                        <div className="flex-1 p-3 flex flex-col justify-center">
                          <h4 className="font-bold text-slate-900 dark:text-white mb-1">{monument.name}</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> {monument.city} • 2.5 km
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 rounded">
                              {monument.badge}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center pr-4">
                          <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Recommended for You */}
            <motion.section
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="pb-8"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recommended for You</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {recommendedMonuments.map((monument, index) => (
                  <motion.div
                    key={monument.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <MonumentCard monument={monument} onClick={() => onMonumentSelect(monument)} compact />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-8 px-4">
      {/* Hero Skeleton */}
      <div className="h-64 rounded-3xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
      
      {/* Map Skeleton */}
      <div>
        <div className="h-6 w-32 bg-slate-200 dark:bg-slate-800 rounded mb-3 animate-pulse" />
        <div className="h-40 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
      </div>

      {/* Horizontal Skeleton */}
      <div>
        <div className="h-6 w-40 bg-slate-200 dark:bg-slate-800 rounded mb-4 animate-pulse" />
        <div className="flex gap-4 overflow-hidden">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-56 h-72 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse shrink-0" />
          ))}
        </div>
      </div>
    </div>
  );
}