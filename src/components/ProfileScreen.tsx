import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Trophy, MapPin, BookOpen, Award, Shield } from "lucide-react";
import { monuments } from "../data/monuments";

interface ProfileScreenProps {
  userProgress: {
    points: number;
    badges: string[];
    visited: string[];
    quizzesCompleted: number;
  };
  onNavigate: (screen: "home" | "scan" | "ar" | "quiz" | "profile" | "map") => void;
  onOpenAdmin: () => void;
}

export function ProfileScreen({ userProgress, onNavigate, onOpenAdmin }: ProfileScreenProps) {
  const visitedMonuments = monuments.filter(m => userProgress.visited.includes(m.id));
  const progress = (userProgress.visited.length / monuments.length) * 100;

  return (
    <div className="space-y-6 pt-6">
      {/* Profile Header */}
      <Card className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20 bg-white/20 border-4 border-white/30">
              <AvatarFallback className="text-3xl font-bold">P</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">Explorer</h2>
              <p className="text-indigo-200">Heritage Enthusiast</p>
              <div className="flex items-center gap-2 mt-2">
                <Trophy className="w-4 h-4 text-amber-300" />
                <span className="font-semibold">{userProgress.points} points</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card>
          <CardContent className="p-4 text-center">
            <MapPin className="w-6 h-6 mx-auto mb-2 text-indigo-500" />
            <p className="text-2xl font-bold">{userProgress.visited.length}</p>
            <p className="text-xs text-slate-500">Visited</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <BookOpen className="w-6 h-6 mx-auto mb-2 text-green-500" />
            <p className="text-2xl font-bold">{userProgress.quizzesCompleted}</p>
            <p className="text-xs text-slate-500">Quizzes</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Award className="w-6 h-6 mx-auto mb-2 text-amber-500" />
            <p className="text-2xl font-bold">{userProgress.badges.length}</p>
            <p className="text-xs text-slate-500">Badges</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Exploration Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>Monuments Discovered</span>
            <span className="font-medium">{userProgress.visited.length} / {monuments.length}</span>
          </div>
          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Badges */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            Badges Earned
          </CardTitle>
        </CardHeader>
        <CardContent>
          {userProgress.badges.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {userProgress.badges.map((badge) => (
                <span
                  key={badge}
                  className="px-3 py-1.5 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 text-amber-700 dark:text-amber-300 rounded-full text-sm font-medium border border-amber-200 dark:border-amber-800"
                >
                  🏆 {badge}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500 text-center py-4">
              Complete challenges to earn badges!
            </p>
          )}
        </CardContent>
      </Card>

      {/* Visited Monuments */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Visited Monuments</CardTitle>
        </CardHeader>
        <CardContent>
          {visitedMonuments.length > 0 ? (
            <div className="space-y-3">
              {visitedMonuments.map((monument) => (
                <div
                  key={monument.id}
                  className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 rounded-lg flex items-center justify-center text-xl">
                    {monument.emoji}
                  </div>
                  <div>
                    <p className="font-medium">{monument.name}</p>
                    <p className="text-sm text-slate-500">{monument.city}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500 text-center py-4">
              No monuments visited yet. Start exploring!
            </p>
          )}
        </CardContent>
      </Card>

      {/* Admin Panel Button */}
      <button
        onClick={onOpenAdmin}
        className="w-full flex items-center justify-center gap-2 border border-slate-300 dark:border-slate-700 hover:border-amber-500/40 text-slate-400 hover:text-amber-400 rounded-xl py-3 text-sm transition-colors"
      >
        <Shield size={15} />
        Admin Panel
      </button>

    </div>
  );
}