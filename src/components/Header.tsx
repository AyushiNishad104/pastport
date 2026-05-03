import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Sun, Moon, Home, Map, User, Trophy } from "lucide-react";

interface HeaderProps {
  points: number;
  badges: string[];
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onNavigate: (screen: string) => void;
  currentScreen: string;
}

export function Header({ points, badges, isDarkMode, onToggleDarkMode, onNavigate, currentScreen }: HeaderProps) {
  const navItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "map", icon: Map, label: "Explore" },
    { id: "profile", icon: User, label: "Profile" },
  ];

  return (
    <header className={`sticky top-0 z-40 backdrop-blur-lg border-b ${isDarkMode ? "bg-slate-950/80 border-slate-800" : "bg-amber-50/80 border-amber-200"}`}>
      <div className="max-w-md mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600">
              <AvatarFallback className="text-white font-bold text-lg">P</AvatarFallback>
            </Avatar>
            <div>
              <h1 className={`font-bold text-lg ${isDarkMode ? "text-white" : "text-slate-900"}`}>PASTPORT</h1>
              <div className="flex items-center gap-1 text-sm">
                <Trophy className="w-3 h-3 text-amber-500" />
                <span className={isDarkMode ? "text-amber-400" : "text-amber-600"}>{points} pts</span>
                {badges.length > 0 && (
                  <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${isDarkMode ? "bg-indigo-900 text-indigo-300" : "bg-indigo-100 text-indigo-700"}`}>
                    {badges.length} badges
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleDarkMode}
            className={isDarkMode ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-slate-900"}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
        </div>

        <nav className="flex justify-around mt-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
                  isActive
                    ? isDarkMode
                      ? "bg-indigo-900/50 text-indigo-300"
                      : "bg-indigo-100 text-indigo-700"
                    : isDarkMode
                    ? "text-slate-400 hover:text-slate-200"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}