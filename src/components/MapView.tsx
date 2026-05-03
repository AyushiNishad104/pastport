import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { MapPin } from "lucide-react";
import { monuments } from "../data/monuments";

interface MapViewProps {
  onMonumentSelect: (monument: typeof monuments[0]) => void;
  visited: string[];
}

export function MapView({ onMonumentSelect, visited }: MapViewProps) {
  const cities = ["All", "Agra", "Delhi", "Mumbai", "Jaipur", "Kolkata", "Hyderabad", "Amritsar", "Mysore", "Konark"];
  const [selectedCity, setSelectedCity] = useState("All");

  const filteredMonuments = selectedCity === "All"
    ? monuments
    : monuments.filter(m => m.city === selectedCity);

  return (
    <div className="space-y-4 pt-6">
      <h2 className="text-2xl font-bold">Explore Monuments</h2>

      {/* City Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {cities.map((city) => (
          <button
            key={city}
            onClick={() => setSelectedCity(city)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              selectedCity === city
                ? "bg-indigo-600 text-white"
                : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700"
            }`}
          >
            {city}
          </button>
        ))}
      </div>

      {/* Simplified Map Visualization */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="relative aspect-[4/3] bg-gradient-to-br from-blue-100 via-green-50 to-amber-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800">
            {/* Stylized India outline approximation */}
            <svg viewBox="0 0 400 350" className="w-full h-full">
              <path
                d="M200,30 L280,60 L320,120 L300,180 L260,220 L200,240 L140,220 L100,180 L80,120 L120,60 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-slate-300 dark:text-slate-600"
              />
              
              {/* Monument pins */}
              {filteredMonuments.map((monument) => {
                const positions: Record<string, { x: number; y: number }> = {
                  "Taj Mahal": { x: 200, y: 120 },
                  "Qutub Minar": { x: 180, y: 100 },
                  "Red Fort": { x: 185, y: 105 },
                  "Gateway of India": { x: 120, y: 200 },
                  "Hawa Mahal": { x: 160, y: 140 },
                  "Victoria Memorial": { x: 280, y: 200 },
                  "Charminar": { x: 220, y: 180 },
                  "Golden Temple": { x: 160, y: 80 },
                  "Mysore Palace": { x: 180, y: 240 },
                  "Sun Temple Konark": { x: 300, y: 180 }
                };
                
                const pos = positions[monument.name];
                if (!pos) return null;
                
                const isVisited = visited.includes(monument.id);
                
                return (
                  <g key={monument.id} className="cursor-pointer" onClick={() => onMonumentSelect(monument)}>
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={isVisited ? 12 : 8}
                      className={`transition-all ${
                        isVisited
                          ? "fill-green-500 stroke-green-600"
                          : "fill-indigo-500 stroke-indigo-600"
                      }`}
                      strokeWidth="2"
                    />
                    <text
                      x={pos.x}
                      y={pos.y + 4}
                      textAnchor="middle"
                      className="text-xs font-bold fill-white pointer-events-none"
                    >
                      {monument.emoji}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </CardContent>
      </Card>

      {/* Monument List */}
      <div className="space-y-3">
        <h3 className="font-semibold flex items-center gap-2">
          <MapPin className="w-5 h-5 text-indigo-500" />
          {selectedCity === "All" ? "All Monuments" : `Monuments in ${selectedCity}`}
          <span className="text-sm text-slate-500">({filteredMonuments.length})</span>
        </h3>
        
        {filteredMonuments.map((monument) => {
          const isVisited = visited.includes(monument.id);
          return (
            <Card
              key={monument.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                isVisited
                  ? "border-green-300 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20"
                  : "border-slate-200 dark:border-slate-800"
              }`}
              onClick={() => onMonumentSelect(monument)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 rounded-xl flex items-center justify-center text-2xl">
                    {monument.emoji}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{monument.name}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{monument.city}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">+{monument.points} pts</p>
                    {isVisited && <p className="text-xs text-green-600 dark:text-green-400">Visited ✓</p>}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}