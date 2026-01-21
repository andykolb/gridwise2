import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@/context/UserContext';
import { quizQuestions } from '@/data/content';
import { QuizQuestion } from '@/types';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle2, XCircle, ChevronRight, Trophy, Share2, X, 
  Swords, Timer, User, Bot, Crown, Frown
} from 'lucide-react';

interface QuizDuelProps {
  onClose: () => void;
}

// Bot opponent data
const BOT_OPPONENT = {
  name: 'GridBot',
  avatar: '🤖',
  difficulty: 0.7, // 70% chance to answer correctly
};

export function QuizDuel({ onClose }: QuizDuelProps) {
  const { user, addXP, completeQuiz, unlockAchievement } = useUser();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [botAnswer, setBotAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [userScore, setUserScore] = useState(0);
  const [botScore, setBotScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [earnedXP, setEarnedXP] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [timerActive, setTimerActive] = useState(true);
  const [botAnswering, setBotAnswering] = useState(false);

  // Get 5 random questions
  const [questions] = useState<QuizQuestion[]>(() => {
    const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 5);
  });

  const currentQuestion = questions[currentIndex];
  const language = user?.language || 'en';

  const t = {
    duel: { en: 'Quiz Duel', de: 'Quiz-Duell' },
    vs: { en: 'VS', de: 'VS' },
    you: { en: 'You', de: 'Du' },
    timeUp: { en: "Time's up!", de: 'Zeit abgelaufen!' },
    correct: { en: 'Correct!', de: 'Richtig!' },
    incorrect: { en: 'Wrong', de: 'Falsch' },
    next: { en: 'Next Round', de: 'Nächste Runde' },
    finish: { en: 'See Results', de: 'Ergebnisse' },
    victory: { en: 'Victory! 🏆', de: 'Sieg! 🏆' },
    defeat: { en: 'Defeat', de: 'Niederlage' },
    draw: { en: "It's a Draw!", de: 'Unentschieden!' },
    youWon: { en: 'You beat the bot!', de: 'Du hast den Bot besiegt!' },
    youLost: { en: 'Better luck next time!', de: 'Nächstes Mal mehr Glück!' },
    tied: { en: 'Evenly matched!', de: 'Gleichauf!' },
    xpEarned: { en: 'XP earned', de: 'XP verdient' },
    bonusXP: { en: 'Victory Bonus', de: 'Siegbonus' },
    shareResults: { en: 'Share Results', de: 'Ergebnisse teilen' },
    backToHome: { en: 'Back to Home', de: 'Zurück' },
    playAgain: { en: 'Play Again', de: 'Nochmal spielen' },
    waitingBot: { en: 'Bot is thinking...', de: 'Bot denkt nach...' },
  };

  // Timer countdown
  useEffect(() => {
    if (!timerActive || showResult || isComplete) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timerActive, showResult, isComplete, currentIndex]);

  // Simulate bot answering
  const simulateBotAnswer = useCallback(() => {
    setBotAnswering(true);
    const thinkTime = 1000 + Math.random() * 2000; // 1-3 seconds
    
    setTimeout(() => {
      const isCorrect = Math.random() < BOT_OPPONENT.difficulty;
      let answer: number;
      
      if (isCorrect) {
        answer = currentQuestion.correctIndex;
      } else {
        // Pick a random wrong answer
        const wrongOptions = [0, 1, 2, 3].filter(i => i !== currentQuestion.correctIndex);
        answer = wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
      }
      
      setBotAnswer(answer);
      setBotAnswering(false);
      
      if (isCorrect) {
        setBotScore(prev => prev + 1);
      }
    }, thinkTime);
  }, [currentQuestion]);

  // Start bot thinking when question loads
  useEffect(() => {
    if (!showResult && !isComplete) {
      simulateBotAnswer();
    }
  }, [currentIndex, simulateBotAnswer, showResult, isComplete]);

  const handleTimeUp = () => {
    if (selectedAnswer === null) {
      setSelectedAnswer(-1); // Indicates timeout
    }
    setShowResult(true);
    setTimerActive(false);
  };

  const handleAnswer = (index: number) => {
    if (showResult || selectedAnswer !== null) return;
    
    setSelectedAnswer(index);
    setTimerActive(false);
    
    const isCorrect = index === currentQuestion.correctIndex;
    if (isCorrect) {
      setUserScore(prev => prev + 1);
      const xp = currentQuestion.difficulty === 'easy' ? 15 : currentQuestion.difficulty === 'medium' ? 20 : 25;
      setEarnedXP(prev => prev + xp);
    }
    
    // Wait for bot to finish answering before showing result
    setTimeout(() => {
      setShowResult(true);
    }, botAnswering ? 500 : 100);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setBotAnswer(null);
      setShowResult(false);
      setTimeLeft(15);
      setTimerActive(true);
    } else {
      // Duel complete - add victory bonus
      let totalXP = earnedXP;
      if (userScore > botScore) {
        totalXP += 50; // Victory bonus
        setEarnedXP(totalXP);
      }
      addXP(totalXP);
      completeQuiz();
      
      if (userScore === questions.length) {
        unlockAchievement('perfect-score');
      }
      
      setIsComplete(true);
    }
  };

  const handleShare = () => {
    const result = userScore > botScore ? '🏆' : userScore < botScore ? '😢' : '🤝';
    const text = language === 'en'
      ? `${result} Quiz Duel: I scored ${userScore}-${botScore} against GridBot on GridWise! Can you beat me?`
      : `${result} Quiz-Duell: Ich habe ${userScore}-${botScore} gegen GridBot bei GridWise erreicht! Kannst du mich schlagen?`;
    
    navigator.clipboard.writeText(text);
    alert(language === 'en' ? 'Copied to clipboard!' : 'In die Zwischenablage kopiert!');
  };

  const handlePlayAgain = () => {
    window.location.reload();
  };

  if (!user) return null;

  const progress = ((currentIndex + 1) / questions.length) * 100;

  // Results screen
  if (isComplete) {
    const isVictory = userScore > botScore;
    const isDraw = userScore === botScore;

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
            className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
              isVictory ? 'gradient-gold' : isDraw ? 'bg-muted' : 'bg-destructive/20'
            }`}
          >
            {isVictory ? (
              <Crown className="w-12 h-12 text-gold-foreground" />
            ) : isDraw ? (
              <Swords className="w-12 h-12 text-muted-foreground" />
            ) : (
              <Frown className="w-12 h-12 text-destructive" />
            )}
          </motion.div>

          <h2 className="text-3xl font-bold mb-2">
            {isVictory ? t.victory[language] : isDraw ? t.draw[language] : t.defeat[language]}
          </h2>
          <p className="text-xl text-muted-foreground mb-6">
            {isVictory ? t.youWon[language] : isDraw ? t.tied[language] : t.youLost[language]}
          </p>

          {/* Score comparison */}
          <div className="bg-card rounded-2xl p-6 border border-border mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-center flex-1">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2 text-2xl">
                  {user.avatar || '👤'}
                </div>
                <p className="font-medium text-sm">{t.you[language]}</p>
                <p className="text-3xl font-bold text-primary">{userScore}</p>
              </div>
              <div className="text-2xl font-bold text-muted-foreground px-4">
                {t.vs[language]}
              </div>
              <div className="text-center flex-1">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-2 text-2xl">
                  {BOT_OPPONENT.avatar}
                </div>
                <p className="font-medium text-sm">{BOT_OPPONENT.name}</p>
                <p className="text-3xl font-bold text-muted-foreground">{botScore}</p>
              </div>
            </div>
            
            <div className="border-t border-border pt-4">
              <div className="flex items-center justify-center gap-2 text-gold">
                <span className="text-2xl font-bold">+{earnedXP}</span>
                <span className="text-lg">{t.xpEarned[language]}</span>
              </div>
              {isVictory && (
                <p className="text-sm text-success mt-1">
                  +50 {t.bonusXP[language]}
                </p>
              )}
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
      {/* Header with scores */}
      <div className="p-4 border-b border-border bg-card">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg">
              <X className="w-6 h-6" />
            </button>
            
            {/* Score display */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm">
                  {user.avatar || '👤'}
                </div>
                <span className="text-xl font-bold text-primary">{userScore}</span>
              </div>
              <span className="text-sm font-bold text-muted-foreground">{t.vs[language]}</span>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-muted-foreground">{botScore}</span>
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm">
                  {BOT_OPPONENT.avatar}
                </div>
              </div>
            </div>
            
            {/* Timer */}
            <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${
              timeLeft <= 5 ? 'bg-destructive/10 text-destructive' : 'bg-muted'
            }`}>
              <Timer className="w-4 h-4" />
              <span className="font-bold">{timeLeft}s</span>
            </div>
          </div>
          
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {/* Round indicator */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <Swords className="w-5 h-5 text-primary" />
                <span className="font-semibold text-primary">
                  {language === 'en' ? 'Round' : 'Runde'} {currentIndex + 1}/{questions.length}
                </span>
              </div>

              <h2 className="text-2xl font-bold mb-6 text-center">
                {currentQuestion.question[language]}
              </h2>

              <div className="space-y-3">
                {currentQuestion.options[language].map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isBotSelected = botAnswer === index;
                  const isCorrect = index === currentQuestion.correctIndex;
                  
                  let optionClass = 'border-border bg-card hover:border-primary/50';
                  if (showResult) {
                    if (isCorrect) {
                      optionClass = 'border-success bg-success/10';
                    } else if ((isSelected || isBotSelected) && !isCorrect) {
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
                      disabled={showResult || selectedAnswer !== null}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 flex items-center gap-3 ${optionClass}`}
                    >
                      <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-semibold text-sm shrink-0">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="flex-1">{option}</span>
                      
                      {/* Show who selected what */}
                      <div className="flex items-center gap-1 shrink-0">
                        {showResult && isSelected && (
                          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs">
                            <User className="w-3 h-3" />
                          </div>
                        )}
                        {showResult && isBotSelected && (
                          <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs">
                            <Bot className="w-3 h-3" />
                          </div>
                        )}
                        {showResult && isCorrect && (
                          <CheckCircle2 className="w-6 h-6 text-success" />
                        )}
                        {showResult && isSelected && !isCorrect && (
                          <XCircle className="w-6 h-6 text-destructive" />
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Bot thinking indicator */}
              {botAnswering && !showResult && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 flex items-center justify-center gap-2 text-muted-foreground"
                >
                  <Bot className="w-4 h-4 animate-pulse" />
                  <span className="text-sm">{t.waitingBot[language]}</span>
                </motion.div>
              )}

              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-xl bg-muted"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {selectedAnswer === currentQuestion.correctIndex ? (
                          <span className="text-success font-medium">{t.correct[language]}</span>
                        ) : (
                          <span className="text-destructive font-medium">{t.incorrect[language]}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Bot className="w-4 h-4" />
                        {botAnswer === currentQuestion.correctIndex ? (
                          <span className="text-success font-medium">{t.correct[language]}</span>
                        ) : (
                          <span className="text-destructive font-medium">{t.incorrect[language]}</span>
                        )}
                      </div>
                    </div>
                    {selectedAnswer === currentQuestion.correctIndex && (
                      <span className="text-sm text-gold font-medium">
                        +{currentQuestion.difficulty === 'easy' ? 15 : currentQuestion.difficulty === 'medium' ? 20 : 25} XP
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {currentQuestion.explanation[language]}
                  </p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer */}
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