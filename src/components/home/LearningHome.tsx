import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@/context/UserContext';
import { dailyNuggets } from '@/data/content';
import { DailyNugget } from '@/types';
import { 
  Flame, Zap, BookOpen, MessageCircle, Trophy, 
  ChevronRight, Sparkles, Target, Swords, ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { InviteCard } from '@/components/invite/InviteCard';

interface LearningHomeProps {
  onStartQuiz: () => void;
  onStartDuel: () => void;
  onOpenChat: () => void;
  onOpenLeaderboard: () => void;
  onOpenAchievements: () => void;
}

export function LearningHome({ 
  onStartQuiz,
  onStartDuel,
  onOpenChat, 
  onOpenLeaderboard, 
  onOpenAchievements 
}: LearningHomeProps) {
  const { user, incrementStreak } = useUser();
  const [dailyNugget, setDailyNugget] = useState<DailyNugget | null>(null);
  const [showLearnMore, setShowLearnMore] = useState(false);

  useEffect(() => {
    incrementStreak();
    // Get random daily nugget
    const randomIndex = Math.floor(Math.random() * dailyNuggets.length);
    setDailyNugget(dailyNuggets[randomIndex]);
  }, []);

  if (!user) return null;

  const language = user.language;
  const levelProgress = calculateLevelProgress(user.xp, user.level);

  const t = {
    greeting: {
      en: `Welcome back, ${user.name}! 👋`,
      de: `Willkommen zurück, ${user.name}! 👋`,
    },
    streak: {
      en: 'Day Streak',
      de: 'Tage in Folge',
    },
    xp: {
      en: 'XP Points',
      de: 'XP Punkte',
    },
    level: {
      en: user.level.charAt(0).toUpperCase() + user.level.slice(1),
      de: getLevelGerman(user.level),
    },
    dailyNugget: {
      en: "Today's Learning Nugget",
      de: 'Lern-Nugget des Tages',
    },
    startQuiz: {
      en: 'Start Quiz',
      de: 'Quiz starten',
    },
    quizDuel: {
      en: 'Quiz Duel',
      de: 'Quiz-Duell',
    },
    askAgent: {
      en: 'Ask the Agent',
      de: 'Den Agenten fragen',
    },
    leaderboard: {
      en: 'Leaderboard',
      de: 'Rangliste',
    },
    achievements: {
      en: 'Achievements',
      de: 'Erfolge',
    },
    toNextLevel: {
      en: 'to next level',
      de: 'zum nächsten Level',
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted p-4 md:p-6 pb-24">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-2xl md:text-3xl font-bold mb-1">
            {t.greeting[language]}
          </h1>
          <p className="text-muted-foreground">
            {language === 'en' ? 'Keep up the great learning!' : 'Weiter so mit dem Lernen!'}
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-3"
        >
          {/* Streak */}
          <div className="bg-card rounded-2xl p-4 border border-border shadow-sm text-center">
            <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center mx-auto mb-2">
              <Flame className="w-6 h-6 text-warning" />
            </div>
            <p className="text-2xl font-bold">{user.streak}</p>
            <p className="text-xs text-muted-foreground">{t.streak[language]}</p>
          </div>

          {/* XP */}
          <div className="bg-card rounded-2xl p-4 border border-border shadow-sm text-center">
            <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-2">
              <Zap className="w-6 h-6 text-gold" />
            </div>
            <p className="text-2xl font-bold">{user.xp}</p>
            <p className="text-xs text-muted-foreground">{t.xp[language]}</p>
          </div>

          {/* Level */}
          <div className="bg-card rounded-2xl p-4 border border-border shadow-sm text-center">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-2">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <p className="text-lg font-bold">{t.level[language]}</p>
            <p className="text-xs text-muted-foreground">{language === 'en' ? 'Level' : 'Stufe'}</p>
          </div>
        </motion.div>

        {/* Level Progress */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl p-4 border border-border shadow-sm"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">{t.level[language]}</span>
            <span className="text-xs text-muted-foreground">
              {levelProgress.remaining} XP {t.toNextLevel[language]}
            </span>
          </div>
          <Progress value={levelProgress.percent} className="h-3" />
          <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
            <span className="font-medium text-primary">{levelProgress.currentXP} XP</span>
            <span>{levelProgress.nextLevelXP} XP</span>
          </div>
        </motion.div>

        {/* Daily Nugget */}
        {dailyNugget && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl p-5 border border-primary/20 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="font-semibold text-primary">{t.dailyNugget[language]}</span>
            </div>
            <h3 className="text-lg font-bold mb-2">{dailyNugget.title[language]}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {dailyNugget.content[language]}
            </p>
            
            {/* Learn More Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowLearnMore(!showLearnMore)}
              className="mt-4 w-full justify-between text-primary hover:text-primary hover:bg-primary/10"
            >
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                {language === 'en' ? 'Learn More' : 'Mehr erfahren'}
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showLearnMore ? 'rotate-180' : ''}`} />
            </Button>
            
            {/* Learn More Content */}
            <AnimatePresence>
              {showLearnMore && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 p-4 rounded-xl bg-background/50 border border-primary/10">
                    <p className="text-sm text-foreground leading-relaxed">
                      {dailyNugget.learnMore[language]}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 gap-3"
        >
          <Button
            variant="gradient"
            size="lg"
            onClick={onStartQuiz}
            className="h-auto py-4 flex-col gap-2"
          >
            <BookOpen className="w-6 h-6" />
            <span>{t.startQuiz[language]}</span>
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={onStartDuel}
            className="h-auto py-4 flex-col gap-2 border-2 border-primary/50 hover:bg-primary/10"
          >
            <Swords className="w-6 h-6 text-primary" />
            <span className="text-primary font-semibold">{t.quizDuel[language]}</span>
          </Button>
        </motion.div>

        {/* Ask Agent Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <Button
            variant="secondary"
            size="lg"
            onClick={onOpenChat}
            className="w-full h-auto py-4 flex-row gap-3"
          >
            <MessageCircle className="w-6 h-6" />
            <span>{t.askAgent[language]}</span>
          </Button>
        </motion.div>

        {/* Invite Colleague Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <InviteCard />
        </motion.div>

        {/* Leaderboard & Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-3"
        >
          <button
            onClick={onOpenLeaderboard}
            className="w-full bg-card rounded-2xl p-4 border border-border shadow-sm flex items-center justify-between hover:border-primary/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-gold flex items-center justify-center">
                <Trophy className="w-5 h-5 text-gold-foreground" />
              </div>
              <span className="font-semibold">{t.leaderboard[language]}</span>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>

          <button
            onClick={onOpenAchievements}
            className="w-full bg-card rounded-2xl p-4 border border-border shadow-sm flex items-center justify-between hover:border-primary/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-success flex items-center justify-center">
                <span className="text-lg">🏅</span>
              </div>
              <span className="font-semibold">{t.achievements[language]}</span>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}

function calculateLevelProgress(xp: number, level: string) {
  const thresholds: Record<string, { min: number; max: number }> = {
    beginner: { min: 0, max: 500 },
    intermediate: { min: 500, max: 1500 },
    advanced: { min: 1500, max: 3000 },
    expert: { min: 3000, max: 10000 },
  };

  const current = thresholds[level];
  const progress = xp - current.min;
  const range = current.max - current.min;
  const percent = Math.min((progress / range) * 100, 100);
  const remaining = Math.max(current.max - xp, 0);

  return { percent, remaining, currentXP: xp, nextLevelXP: current.max };
}

function getLevelGerman(level: string) {
  const map: Record<string, string> = {
    beginner: 'Anfänger',
    intermediate: 'Fortgeschritten',
    advanced: 'Profi',
    expert: 'Experte',
  };
  return map[level] || level;
}
