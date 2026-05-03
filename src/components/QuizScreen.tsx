import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { ArrowLeft, CheckCircle2, XCircle, Trophy } from "lucide-react";

interface QuizScreenProps {
  monument: {
    id: string;
    name: string;
    quiz: Array<{
      question: string;
      options: string[];
      correct: number;
    }>;
  };
  onComplete: (score: number) => void;
  onBack: () => void;
}

export function QuizScreen({ monument, onComplete, onBack }: QuizScreenProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);

  const question = monument.quiz[currentQuestion];

  const handleAnswer = (index: number) => {
    if (answered) return;
    setSelectedAnswer(index);
    setAnswered(true);
    setShowResult(true);
    
    if (index === question.correct) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < monument.quiz.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setAnswered(false);
    } else {
      onComplete(score);
    }
  };

  return (
    <div className="space-y-4 pt-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="text-center">
          <p className="text-sm text-slate-500">Question {currentQuestion + 1} of {monument.quiz.length}</p>
          <div className="flex gap-1 justify-center mt-1">
            {monument.quiz.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i < currentQuestion
                    ? "bg-green-500"
                    : i === currentQuestion
                    ? "bg-indigo-500"
                    : "bg-slate-300 dark:bg-slate-700"
                }`}
              />
            ))}
          </div>
        </div>
        <div className="w-10" />
      </div>

      {/* Question Card */}
      <Card className="border-indigo-200 dark:border-indigo-800">
        <CardHeader>
          <CardTitle className="text-lg">{question.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {question.options.map((option, index) => {
            const isCorrect = index === question.correct;
            const isSelected = selectedAnswer === index;
            
            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={answered}
                className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                  !showResult
                    ? "border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-600"
                    : isCorrect
                    ? "border-green-500 bg-green-50 dark:bg-green-950/30"
                    : isSelected && !isCorrect
                    ? "border-red-500 bg-red-50 dark:bg-red-950/30"
                    : "border-slate-200 dark:border-slate-700 opacity-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{option}</span>
                  {showResult && isCorrect && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                  {showResult && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-500" />}
                </div>
              </button>
            );
          })}
        </CardContent>
      </Card>

      {/* Next Button */}
      {answered && (
        <Button
          onClick={handleNext}
          className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
        >
          {currentQuestion < monument.quiz.length - 1 ? "Next Question" : "See Results"}
        </Button>
      )}

      {/* Results Summary */}
      {currentQuestion === monument.quiz.length - 1 && answered && (
        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-900 dark:to-slate-800 border-amber-200 dark:border-amber-900">
          <CardContent className="p-6 text-center">
            <Trophy className="w-16 h-16 mx-auto mb-4 text-amber-500" />
            <h3 className="text-2xl font-bold mb-2">Quiz Complete!</h3>
            <p className="text-slate-600 dark:text-slate-400">
              You scored {score} out of {monument.quiz.length}
            </p>
            <p className="text-sm text-indigo-600 dark:text-indigo-400 mt-2">
              {score === monument.quiz.length ? "Perfect score! 🎉" : score >= monument.quiz.length / 2 ? "Great job!" : "Keep learning!"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}