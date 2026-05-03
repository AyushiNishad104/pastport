import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { ArrowLeft, Play, Pause, Volume2, RotateCw, Headphones, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ArViewProps {
  monument: {
    id: string;
    name: string;
    city: string;
    description: string;
    emoji: string;
    gallery: string[]; // Changed from imageUrl to gallery array
    audioUrl: string;
    quiz: any[];
    points: number;
  };
  onStartQuiz: () => void;
  onBack: () => void;
}

export function ArView({ monument, onStartQuiz, onBack }: ArViewProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const toggleAudio = () => setIsPlaying(!isPlaying);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % monument.gallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + monument.gallery.length) % monument.gallery.length);
  };

  // Auto-rotate gallery every 5 seconds if not interacting (simulating 360 feel)
  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentImageIndex]);

  // Simulated waveform bars
  const bars = Array.from({ length: 30 }, (_, i) => i);

  return (
    <div className="relative min-h-screen pb-24">
      {/* Blurred Background Image */}
      <div className="fixed inset-0 z-0">
        <img 
          src={monument.gallery[currentImageIndex]} 
          alt={monument.name}
          className="w-full h-full object-cover blur-2xl scale-110 opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/90 to-slate-950" />
      </div>

      <div className="relative z-10 space-y-6 pt-4">
        {/* Header */}
        <div className="flex items-center justify-between px-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div className="bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full">
            <span className="text-white text-sm font-medium">360° View</span>
          </div>
          <Button variant="ghost" size="icon" className="bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white">
            <RotateCw className="w-6 h-6" />
          </Button>
        </div>

        {/* 360 Image Carousel */}
        <div className="relative aspect-[4/5] mx-4 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={monument.gallery[currentImageIndex]}
              alt={`${monument.name} view ${currentImageIndex + 1}`}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>

          {/* Gradient Overlay for text readability at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          {/* Navigation Arrows */}
          <button 
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 backdrop-blur-sm p-2 rounded-full text-white transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 backdrop-blur-sm p-2 rounded-full text-white transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {monument.gallery.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentImageIndex === idx ? "bg-amber-400 w-6" : "bg-white/50"
                }`}
              />
            ))}
          </div>

          {/* Monument Info Overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <h2 className="text-3xl font-bold text-white mb-1">{monument.name}</h2>
            <p className="text-slate-300 text-sm flex items-center gap-1">
              {monument.emoji} {monument.city}
            </p>
          </div>
        </div>

        {/* Audio Player Section */}
        <Card className="mx-4 bg-white/10 backdrop-blur-xl border-0 shadow-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-white font-semibold flex items-center gap-2">
                  <Headphones className="w-5 h-5 text-indigo-400" />
                  Audio Story
                </h3>
                <p className="text-slate-400 text-xs mt-1">Listen to the history</p>
              </div>
              <Button
                onClick={toggleAudio}
                size="icon"
                className="h-14 w-14 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-500/30"
              >
                {isPlaying ? <Pause className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white ml-1" />}
              </Button>
            </div>

            {/* Waveform Animation */}
            <div className="flex items-center justify-center gap-1 h-12 mb-4">
              {bars.map((i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-indigo-400 rounded-full"
                  animate={{
                    height: isPlaying ? [10, 30, 10] : 4,
                    opacity: isPlaying ? 1 : 0.3
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.05
                  }}
                />
              ))}
            </div>

            {/* Subtitles Toggle */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowSubtitles(!showSubtitles)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  showSubtitles 
                    ? "bg-indigo-600 text-white" 
                    : "bg-white/10 text-slate-300 hover:bg-white/20"
                }`}
              >
                <Volume2 className="w-3 h-3" />
                Subtitles
              </button>
              <span className="text-slate-400 text-xs">02:45 / 05:30</span>
            </div>

            {/* Subtitles Text */}
            {showSubtitles && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-black/20 rounded-xl border border-white/5"
              >
                <p className="text-slate-200 text-sm leading-relaxed">
                  "The construction of this magnificent structure began in the year 1632 and employed over 20,000 artisans..."
                </p>
              </motion.div>
            )}
          </CardContent>
        </Card>

        {/* Description Card */}
        <Card className="mx-4 bg-white/5 backdrop-blur-md border border-white/10">
          <CardContent className="p-5">
            <h3 className="text-white font-semibold mb-2">About</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              {monument.description}
            </p>
          </CardContent>
        </Card>

        {/* Start Quiz Button */}
        <div className="px-4 pb-4">
          <Button
            onClick={onStartQuiz}
            className="w-full h-14 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold text-lg rounded-2xl shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2"
          >
            <span>Start Quiz</span>
            <span className="px-2 py-0.5 bg-white/20 rounded text-xs">+{monument.points} PTS</span>
          </Button>
        </div>
      </div>
    </div>
  );
}