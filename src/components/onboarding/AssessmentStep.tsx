import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Language, UserLevel } from '@/types';
import { quizQuestions } from '@/data/content';
import { CheckCircle2, XCircle, ChevronRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface AssessmentStepProps {
  language: Language;
  onComplete: (level: UserLevel) => void;
  onBack: () => void;
}

export function AssessmentStep({ language, onComplete, onBack }: AssessmentStepProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  // Get 5 questions for assessment
  const assessmentQuestions = quizQuestions.slice(0, 5);
  const currentQuestion = assessmentQuestions[currentIndex];
  const progress = ((currentIndex + 1) / assessmentQuestions.length) * 100;

  const t = {
    title: {
      en: 'Quick Knowledge Check',
      de: 'Kurzer Wissenstest',
    },
    subtitle: {
      en: 'Let\'s find your starting level',
      de: 'Lass uns dein Startniveau finden',
    },
    question: {
      en: 'Question',
      de: 'Frage',
    },
    of: {
      en: 'of',
      de: 'von',
    },
  };

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);

    if (index === currentQuestion.correctIndex) {
      setCorrectCount(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < assessmentQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Calculate level based on score
      const score = correctCount / assessmentQuestions.length;
      let level: UserLevel;
      if (score >= 0.8) level = 'advanced';
      else if (score >= 0.6) level = 'intermediate';
      else level = 'beginner';
      
      onComplete(level);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="flex flex-col items-center justify-center min-h-[80vh] px-6"
    >
      <div className="w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            {t.title[language]}
          </h2>
          <p className="text-muted-foreground">
            {t.subtitle[language]}
          </p>
        </motion.div>

        <div className="mb-6">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>
              {t.question[language]} {currentIndex + 1} {t.of[language]} {assessmentQuestions.length}
            </span>
            <span>{correctCount} correct</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-card rounded-2xl p-6 shadow-lg border border-border"
          >
            <h3 className="text-xl font-semibold mb-6">
              {currentQuestion.question[language]}
            </h3>

            <div className="space-y-3">
              {currentQuestion.options[language].map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === currentQuestion.correctIndex;
                
                let optionClass = 'border-border bg-background hover:border-primary/50';
                if (showResult) {
                  if (isCorrect) {
                    optionClass = 'border-success bg-success/10';
                  } else if (isSelected && !isCorrect) {
                    optionClass = 'border-destructive bg-destructive/10';
                  }
                } else if (isSelected) {
                  optionClass = 'border-primary bg-primary/5';
                }

                return (
                  <motion.button
                    key={index}
                    whileHover={!showResult ? { scale: 1.01 } : undefined}
                    whileTap={!showResult ? { scale: 0.99 } : undefined}
                    onClick={() => handleAnswer(index)}
                    disabled={showResult}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 flex items-center gap-3 ${optionClass}`}
                  >
                    <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-semibold text-sm">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="flex-1">{option}</span>
                    {showResult && isCorrect && (
                      <CheckCircle2 className="w-6 h-6 text-success" />
                    )}
                    {showResult && isSelected && !isCorrect && (
                      <XCircle className="w-6 h-6 text-destructive" />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 rounded-xl bg-muted"
              >
                <p className="text-sm">
                  {currentQuestion.explanation[language]}
                </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-between mt-8"
        >
          <Button variant="outline" size="lg" onClick={onBack}>
            {language === 'de' ? 'Zurück' : 'Back'}
          </Button>
          {showResult && (
            <Button variant="gradient" size="lg" onClick={handleNext}>
              {currentIndex < assessmentQuestions.length - 1 ? (
                <>
                  {language === 'de' ? 'Nächste' : 'Next'}
                  <ChevronRight className="w-5 h-5" />
                </>
              ) : (
                language === 'de' ? 'Abschließen' : 'Complete'
              )}
            </Button>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
