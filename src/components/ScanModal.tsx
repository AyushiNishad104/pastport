import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { X, Camera, Loader2, ScanLine, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { monuments } from "../data/monuments";
import { simulateRecognition } from "../utils/aiSimulator";

interface ScanModalProps {
  onClose: () => void;
  onScanComplete: (monumentId: string) => void;
}

export function ScanModal({ onClose, onScanComplete }: ScanModalProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<typeof monuments[0] | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsScanning(true);
    await new Promise(resolve => setTimeout(resolve, 2500));
    const result = simulateRecognition(file.name);
    setScanResult(result);
    setIsScanning(false);
  };

  const handleConfirm = () => {
    if (scanResult) {
      onScanComplete(scanResult.id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-sm"
      >
        <Card className="bg-slate-900 border-slate-800 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-800">
            <h2 className="text-white font-semibold flex items-center gap-2">
              <Camera className="w-5 h-5 text-indigo-400" />
              AI Scanner
            </h2>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </Button>
          </div>

          <CardContent className="p-6">
            <AnimatePresence mode="wait">
              {!isScanning && !scanResult && (
                <motion.div
                  key="upload"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  {/* Futuristic Scanner Frame */}
                  <div className="relative aspect-square bg-slate-950 rounded-2xl overflow-hidden border-2 border-dashed border-slate-700 flex flex-col items-center justify-center">
                    {/* Corner Brackets */}
                    <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-indigo-500 rounded-tl-lg" />
                    <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-indigo-500 rounded-tr-lg" />
                    <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-indigo-500 rounded-bl-lg" />
                    <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-indigo-500 rounded-br-lg" />
                    
                    <Camera className="w-16 h-16 text-slate-600 mb-4" />
                    <p className="text-slate-400 text-sm text-center px-8">
                      Point camera at a monument to identify it
                    </p>
                  </div>

                  <label className="block">
                    <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                    <Button className="w-full h-14 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25">
                      <Camera className="w-5 h-5 mr-2" />
                      Capture Photo
                    </Button>
                  </label>
                </motion.div>
              )}

              {isScanning && (
                <motion.div
                  key="scanning"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-12 text-center space-y-6"
                >
                  <div className="relative w-32 h-32 mx-auto">
                    <motion.div
                      className="absolute inset-0 rounded-full border-4 border-indigo-500/30"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <Loader2 className="w-32 h-32 text-indigo-500 animate-spin" />
                  </div>
                  <div className="space-y-2">
                    <motion.p 
                      className="text-xl font-bold text-white"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      Analyzing...
                    </motion.p>
                    <p className="text-slate-400 text-sm">AI is identifying the monument</p>
                  </div>
                </motion.div>
              )}

              {scanResult && !isScanning && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                      className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/30"
                    >
                      <Sparkles className="w-10 h-10 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-1">Identified!</h3>
                    <p className="text-slate-400">Monument recognized successfully</p>
                  </div>

                  <Card className="bg-slate-800 border-slate-700 overflow-hidden">
                    <div className="relative h-32">
                      <img src={scanResult.imageUrl} alt={scanResult.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                    </div>
                    <div className="p-4">
                      <h4 className="text-xl font-bold text-white mb-1">{scanResult.name}</h4>
                      <p className="text-slate-400 text-sm mb-3">{scanResult.city}</p>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-xs font-semibold border border-amber-500/30">
                          +{scanResult.points} PTS
                        </span>
                      </div>
                    </div>
                  </Card>

                  <Button 
                    onClick={handleConfirm}
                    className="w-full h-14 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-green-500/25"
                  >
                    Explore Monument
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}