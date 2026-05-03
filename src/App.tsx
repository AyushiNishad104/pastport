import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Header } from "./components/Header";
import { HomeScreen } from "./components/HomeScreen";
import { ScanModal } from "./components/ScanModal";
import { ArView } from "./components/ArView";
import { QuizScreen } from "./components/QuizScreen";
import { ProfileScreen } from "./components/ProfileScreen";
import { MapView } from "./components/MapView";
import { AdminScreen } from "./components/AdminScreen";   // ← NEW
import { monuments } from "./data/monuments";
import { loadUserProgress, saveUserProgress, UserProgress } from "./utils/storage";

type Screen = "home" | "scan" | "ar" | "quiz" | "profile" | "map";

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  enter:   { opacity: 1, x: 0  },
  exit:    { opacity: 0, x: -20 }
};

function App() {
  const [currentScreen, setCurrentScreen]     = useState<Screen>("home");
  const [userProgress, setUserProgress]       = useState<UserProgress>(loadUserProgress());
  const [selectedMonument, setSelectedMonument] = useState<typeof monuments[0] | null>(null);
  const [isDarkMode, setIsDarkMode]           = useState(false);
  const [showScanModal, setShowScanModal]     = useState(false);
  const [showAdmin, setShowAdmin]             = useState(false); // ← NEW

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const updateUserProgress = (updates: Partial<UserProgress>) => {
    const updated = { ...userProgress, ...updates };
    setUserProgress(updated);
    saveUserProgress(updated);
  };

  const handleScanComplete = (monumentId: string) => {
    const monument = monuments.find(m => m.id === monumentId);
    if (monument) {
      setSelectedMonument(monument);
      setShowScanModal(false);
      setCurrentScreen("ar");
    }
  };

  const handleQuizComplete = (score: number) => {
    if (selectedMonument) {
      const pointsEarned = Math.round((score / selectedMonument.quiz.length) * selectedMonument.points);
      const newVisited = userProgress.visited.includes(selectedMonument.id)
        ? userProgress.visited
        : [...userProgress.visited, selectedMonument.id];

      updateUserProgress({
        points: userProgress.points + pointsEarned,
        visited: newVisited,
        quizzesCompleted: userProgress.quizzesCompleted + 1
      });

      const newBadges = [...userProgress.badges];
      if (newVisited.length >= 3  && !newBadges.includes("Explorer"))       newBadges.push("Explorer");
      if (newVisited.length >= 10 && !newBadges.includes("History Master")) newBadges.push("History Master");
      if (score === selectedMonument.quiz.length && !newBadges.includes("Quiz Champion")) newBadges.push("Quiz Champion");

      if (newBadges.length !== userProgress.badges.length) updateUserProgress({ badges: newBadges });
    }
    setCurrentScreen("home");
  };

  return (
    <div className={`min-h-screen font-sans antialiased transition-colors duration-500 ${isDarkMode ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"}`}>
      <Header
        points={userProgress.points}
        badges={userProgress.badges}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        onNavigate={setCurrentScreen}
        currentScreen={currentScreen}
      />

      <main className="max-w-md mx-auto px-4 pb-24 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            variants={pageVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            {currentScreen === "home" && (
              <HomeScreen onScan={() => setShowScanModal(true)} onNavigate={setCurrentScreen} visited={userProgress.visited} />
            )}

            {currentScreen === "profile" && (
              <ProfileScreen
                userProgress={userProgress}
                onNavigate={setCurrentScreen}
                onOpenAdmin={() => setShowAdmin(true)}  // ← NEW
              />
            )}

            {currentScreen === "map" && (
              <MapView
                onMonumentSelect={(monument) => { setSelectedMonument(monument); setCurrentScreen("ar"); }}
                visited={userProgress.visited}
              />
            )}

            {currentScreen === "ar" && selectedMonument && (
              <ArView monument={selectedMonument} onStartQuiz={() => setCurrentScreen("quiz")} onBack={() => setCurrentScreen("home")} />
            )}

            {currentScreen === "quiz" && selectedMonument && (
              <QuizScreen monument={selectedMonument} onComplete={handleQuizComplete} onBack={() => setCurrentScreen("ar")} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {showScanModal && (
          <ScanModal onClose={() => setShowScanModal(false)} onScanComplete={handleScanComplete} />
        )}
      </AnimatePresence>

      {/* ── Admin overlay ── */}
      <AnimatePresence>
        {showAdmin && (
          <AdminScreen onBack={() => setShowAdmin(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;