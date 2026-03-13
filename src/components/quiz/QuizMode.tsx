import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@/context/UserContext';
import { quizQuestions } from '@/data/content';
import { QuizQuestion } from '@/types';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, XCircle, ChevronRight, Trophy, Share2, X, BookOpen, ChevronDown } from 'lucide-react';

interface QuizModeProps {
  onClose: () => void;
}

export function QuizMode({ onClose }: QuizModeProps) {
  const { user, addXP, completeQuiz, unlockAchievement } = useUser();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [earnedXP, setEarnedXP] = useState(0);
  const [showLearnMore, setShowLearnMore] = useState(false);

  const [questions] = useState<QuizQuestion[]>(() => {
    const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 5);
  });

  if (!user) return null;

  const language = user.language;
  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const t = {
    question: { en: 'Question', de: 'Frage' },
    of: { en: 'of', de: 'von' },
    correct: { en: 'Correct!', de: 'Richtig!' },
    incorrect: { en: 'Incorrect', de: 'Falsch' },
    next: { en: 'Next', de: 'Nächste' },
    finish: { en: 'See Results', de: 'Ergebnisse' },
    learnMore: { en: 'Learn More', de: 'Mehr erfahren' },
    quizComplete: { en: 'Quiz Complete!', de: 'Quiz abgeschlossen!' },
    youScored: { en: 'You scored', de: 'Du hast erreicht' },
    outOf: { en: 'out of', de: 'von' },
    xpEarned: { en: 'XP earned', de: 'XP verdient' },
    shareResults: { en: 'Share Results', de: 'Ergebnisse teilen' },
    backToHome: { en: 'Back to Home', de: 'Zurück zur Startseite' },
    perfectScore: { en: 'Perfect Score! 🎉', de: 'Perfekte Punktzahl! 🎉' },
    greatJob: { en: 'Great job!', de: 'Großartig!' },
    keepLearning: { en: 'Keep learning!', de: 'Weiter lernen!' },
  };

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);

    const isCorrect = index === currentQuestion.correctIndex;
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
      const xp = currentQuestion.difficulty === 'easy' ? 10 : currentQuestion.difficulty === 'medium' ? 15 : 20;
      setEarnedXP(prev => prev + xp);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setShowLearnMore(false);
    } else {
      addXP(earnedXP);
      completeQuiz();

      if (correctCount === questions.length) {
        unlockAchievement('perfect-score');
      }

      setIsComplete(true);
    }
  };

  const handleShare = () => {
    const text = language === 'en'
      ? `I just scored ${correctCount}/${questions.length} on GridWise and earned ${earnedXP} XP! Can you beat my score?`
      : `Ich habe gerade ${correctCount}/${questions.length} bei GridWise erreicht und ${earnedXP} XP verdient! Kannst du meinen Score schlagen?`;

    navigator.clipboard.writeText(text);
    alert(language === 'en' ? 'Copied to clipboard!' : 'In die Zwischenablage kopiert!');
  };

  if (isComplete) {
    const scorePercent = (correctCount / questions.length) * 100;
    let message = t.keepLearning[language];
    if (scorePercent === 100) message = t.perfectScore[language];
    else if (scorePercent >= 60) message = t.greatJob[language];

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-background z-50 flex items-center justify-center p-6"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: 'spring' }}
          className="text-center max-w-md w-full"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-24 h-24 rounded-full gradient-gold flex items-center justify-center mx-auto mb-6"
          >
            <Trophy className="w-12 h-12 text-gold-foreground" />
          </motion.div>

          <h2 className="text-3xl font-bold mb-2">{t.quizComplete[language]}</h2>
          <p className="text-xl text-muted-foreground mb-6">{message}</p>

          <div className="bg-card rounded-2xl p-6 border border-border mb-6">
            <div className="text-5xl font-bold text-primary mb-2">
              {correctCount}/{questions.length}
            </div>
            <p className="text-muted-foreground mb-4">
              {t.youScored[language]} {correctCount} {t.outOf[language]} {questions.length}
            </p>
            <div className="flex items-center justify-center gap-2 text-gold">
              <span className="text-2xl font-bold">+{earnedXP}</span>
              <span className="text-lg">{t.xpEarned[language]}</span>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              variant="outline"
              size="lg"
              onClick={handleShare}
              className="w-full"
            >
              <Share2 className="w-5 h-5 mr-2" />
              {t.shareResults[language]}
            </Button>
            <Button
              variant="gradient"
              size="lg"
              onClick={onClose}
              className="w-full"
            >
              {t.backToHome[language]}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-background z-50 flex flex-col"
    >
      <div className="p-4 border-b border-border">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg">
            <X className="w-6 h-6" />
          </button>
          <div className="flex-1 mx-4">
            <Progress value={progress} className="h-2" />
          </div>
          <span className="text-sm font-medium">
            {currentIndex + 1}/{questions.length}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-2xl font-bold mb-6">
                {currentQuestion.question[language]}
              </h2>

              <div className="space-y-3">
                {currentQuestion.options[language].map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrect = index === currentQuestion.correctIndex;

                  let optionClass = 'border-border bg-card hover:border-primary/50';
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
                      <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-semibold text-sm shrink-0">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="flex-1">{option}</span>
                      {showResult && isCorrect && (
                        <CheckCircle2 className="w-6 h-6 text-success shrink-0" />
                      )}
                      {showResult && isSelected && !isCorrect && (
                        <XCircle className="w-6 h-6 text-destructive shrink-0" />
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
                  <div className="flex items-center gap-2 mb-2">
                    {selectedAnswer === currentQuestion.correctIndex ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-success" />
                        <span className="font-semibold text-success">{t.correct[language]}</span>
                        <span className="text-sm text-gold ml-auto">
                          +{currentQuestion.difficulty === 'easy' ? 10 : currentQuestion.difficulty === 'medium' ? 15 : 20} XP
                        </span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-destructive" />
                        <span className="font-semibold text-destructive">{t.incorrect[language]}</span>
                      </>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {currentQuestion.explanation[language]}
                  </p>

                  {selectedAnswer !== currentQuestion.correctIndex && currentQuestion.learnMore && (
                    <div className="mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowLearnMore(!showLearnMore)}
                        className="w-full justify-between"
                      >
                        <span className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4" />
                          {t.learnMore[language]}
                        </span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${showLearnMore ? 'rotate-180' : ''}`} />
                      </Button>

                      <AnimatePresence>
                        {showLearnMore && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
                              <p className="text-sm text-foreground leading-relaxed">
                                {currentQuestion.learnMore[language]}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {showResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 border-t border-border"
        >
          <div className="max-w-2xl mx-auto">
            <Button
              variant="gradient"
              size="lg"
              onClick={handleNext}
              className="w-full"
            >
              {currentIndex < questions.length - 1 ? (
                <>
                  {t.next[language]}
                  <ChevronRight className="w-5 h-5 ml-1" />
                </>
              ) : (
                t.finish[language]
              )}
            </Button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
