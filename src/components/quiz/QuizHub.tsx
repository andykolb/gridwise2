import { useState } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@/context/UserContext';
import { topics, quizQuestions } from '@/data/content';
import { Topic } from '@/types';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import {
  X,
  Trophy,
  Target,
  Flame,
  Star,
  CheckCircle2,
  Lock,
  Play
} from 'lucide-react';

interface QuizHubProps {
  onClose: () => void;
  onStartQuiz: () => void;
}

function getTopicMastery(topic: Topic, completedQuizzes: number): number {
  const baseMastery = Math.min((completedQuizzes * 5), 100);
  const topicVariance: Record<Topic, number> = {
    'energy-basics': 1.2,
    'price-drivers': 0.9,
    'renewables': 1.1,
    'grid-dso': 0.7,
    'regulation': 0.8,
    'trading': 0.6,
    'retail': 1.0,
  };
  return Math.min(Math.round(baseMastery * (topicVariance[topic] || 1)), 100);
}

function getMasteryColor(mastery: number): string {
  if (mastery >= 80) return 'bg-success';
  if (mastery >= 60) return 'bg-primary';
  if (mastery >= 40) return 'bg-gold';
  if (mastery >= 20) return 'bg-orange-500';
  return 'bg-destructive/60';
}

function getMasteryLabel(mastery: number, language: 'en' | 'de'): string {
  if (mastery >= 80) return language === 'en' ? 'Expert' : 'Experte';
  if (mastery >= 60) return language === 'en' ? 'Advanced' : 'Fortgeschritten';
  if (mastery >= 40) return language === 'en' ? 'Intermediate' : 'Mittel';
  if (mastery >= 20) return language === 'en' ? 'Learning' : 'Lernend';
  return language === 'en' ? 'New' : 'Neu';
}

const journeyStages = [
  { id: 1, label: { en: 'Basics', de: 'Grundlagen' }, requiredQuizzes: 0, icon: '🌱' },
  { id: 2, label: { en: 'Foundations', de: 'Fundament' }, requiredQuizzes: 3, icon: '🧱' },
  { id: 3, label: { en: 'Explorer', de: 'Entdecker' }, requiredQuizzes: 6, icon: '🧭' },
  { id: 4, label: { en: 'Specialist', de: 'Spezialist' }, requiredQuizzes: 10, icon: '⚡' },
  { id: 5, label: { en: 'Expert', de: 'Experte' }, requiredQuizzes: 15, icon: '🏆' },
];

export function QuizHub({ onClose, onStartQuiz }: QuizHubProps) {
  const { user } = useUser();

  if (!user) return null;

  const language = user.language;
  const completedQuizzes = user.completedQuizzes;

  const currentStage = journeyStages.reduce((acc, stage) => {
    if (completedQuizzes >= stage.requiredQuizzes) return stage;
    return acc;
  }, journeyStages[0]);

  const nextStage = journeyStages.find(s => s.requiredQuizzes > completedQuizzes);
  const progressToNext = nextStage
    ? ((completedQuizzes - currentStage.requiredQuizzes) / (nextStage.requiredQuizzes - currentStage.requiredQuizzes)) * 100
    : 100;

  const t = {
    title: { en: 'Quiz Hub', de: 'Quiz-Zentrale' },
    progress: { en: 'Your Progress', de: 'Dein Fortschritt' },
    quizzesCompleted: { en: 'Quizzes Completed', de: 'Quizze abgeschlossen' },
    totalXP: { en: 'Total XP', de: 'Gesamt-XP' },
    currentStreak: { en: 'Current Streak', de: 'Aktuelle Serie' },
    days: { en: 'days', de: 'Tage' },
    skillGap: { en: 'Skill Gap Analysis', de: 'Kompetenzlücken-Analyse' },
    mastery: { en: 'Mastery', de: 'Beherrschung' },
    journey: { en: 'Learning Journey', de: 'Lernreise' },
    startQuiz: { en: 'Start Quiz', de: 'Quiz starten' },
    questionsAvailable: { en: 'questions available', de: 'Fragen verfügbar' },
    currentLevel: { en: 'Current Level', de: 'Aktuelles Level' },
    nextLevel: { en: 'Next', de: 'Nächstes' },
    quizzesToNext: { en: 'quizzes to next level', de: 'Quizze bis zum nächsten Level' },
    completed: { en: 'Completed!', de: 'Abgeschlossen!' },
    locked: { en: 'Locked', de: 'Gesperrt' },
  };

  const totalQuestions = quizQuestions.length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background z-50 flex flex-col overflow-hidden"
    >
      <div className="p-4 border-b border-border shrink-0">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg">
            <X className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">{t.title[language]}</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 pb-32">
        <div className="max-w-2xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl p-6 border border-border"
          >
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-gold" />
              {t.progress[language]}
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-muted rounded-xl">
                <div className="text-2xl font-bold text-primary">{completedQuizzes}</div>
                <div className="text-xs text-muted-foreground">{t.quizzesCompleted[language]}</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-xl">
                <div className="text-2xl font-bold text-gold">{user.xp}</div>
                <div className="text-xs text-muted-foreground">{t.totalXP[language]}</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-xl">
                <div className="text-2xl font-bold text-destructive flex items-center justify-center gap-1">
                  <Flame className="w-5 h-5" />
                  {user.streak}
                </div>
                <div className="text-xs text-muted-foreground">{t.days[language]}</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-2xl p-6 border border-border"
          >
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              {t.skillGap[language]}
            </h2>
            <div className="space-y-3">
              {topics.map((topic) => {
                const mastery = getTopicMastery(topic.id, completedQuizzes);
                const questionsForTopic = quizQuestions.filter(q => q.topic === topic.id).length;
                return (
                  <div key={topic.id} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <span>{topic.icon}</span>
                        <span className="font-medium">{topic.label[language]}</span>
                        <span className="text-xs text-muted-foreground">({questionsForTopic})</span>
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getMasteryColor(mastery)} text-white`}>
                        {getMasteryLabel(mastery, language)}
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${mastery}%` }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className={`h-full ${getMasteryColor(mastery)} rounded-full`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-2xl p-6 border border-border"
          >
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-gold" />
              {t.journey[language]}
            </h2>

            <div className="bg-gradient-to-r from-primary/10 to-gold/10 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{currentStage.icon}</span>
                <div>
                  <div className="text-sm text-muted-foreground">{t.currentLevel[language]}</div>
                  <div className="text-xl font-bold">{currentStage.label[language]}</div>
                </div>
              </div>
              {nextStage && (
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>{t.nextLevel[language]}: {nextStage.label[language]}</span>
                    <span>{nextStage.requiredQuizzes - completedQuizzes} {t.quizzesToNext[language]}</span>
                  </div>
                  <Progress value={progressToNext} className="h-2" />
                </div>
              )}
              {!nextStage && (
                <div className="text-sm text-success font-medium mt-2">{t.completed[language]} 🎉</div>
              )}
            </div>

            <div className="relative">
              <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-border" />
              <div className="space-y-4">
                {journeyStages.map((stage, index) => {
                  const isCompleted = completedQuizzes >= stage.requiredQuizzes;
                  const isCurrent = stage.id === currentStage.id;
                  const isLocked = !isCompleted && !isCurrent;

                  return (
                    <motion.div
                      key={stage.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className={`relative flex items-center gap-4 p-3 rounded-xl transition-all
                        ${isCurrent ? 'bg-primary/10 border-2 border-primary' : ''}
                        ${isCompleted && !isCurrent ? 'bg-success/10' : ''}
                        ${isLocked ? 'opacity-50' : ''}
                      `}
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center z-10 shrink-0
                        ${isCompleted ? 'bg-success text-white' : ''}
                        ${isCurrent ? 'bg-primary text-white' : ''}
                        ${isLocked ? 'bg-muted text-muted-foreground' : ''}
                      `}>
                        {isCompleted && !isCurrent ? (
                          <CheckCircle2 className="w-6 h-6" />
                        ) : isLocked ? (
                          <Lock className="w-5 h-5" />
                        ) : (
                          <span className="text-xl">{stage.icon}</span>
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="font-medium">{stage.label[language]}</div>
                        <div className="text-xs text-muted-foreground">
                          {stage.requiredQuizzes} {t.quizzesCompleted[language].toLowerCase()}
                        </div>
                      </div>

                      {isCurrent && (
                        <div className="shrink-0">
                          <Button size="sm" variant="gradient" onClick={onStartQuiz}>
                            <Play className="w-4 h-4 mr-1" />
                            {t.startQuiz[language]}
                          </Button>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="fixed bottom-20 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent">
        <div className="max-w-2xl mx-auto">
          <Button
            variant="gradient"
            size="lg"
            onClick={onStartQuiz}
            className="w-full"
          >
            <Play className="w-5 h-5 mr-2" />
            {t.startQuiz[language]}
            <span className="ml-2 text-sm opacity-80">({totalQuestions} {t.questionsAvailable[language]})</span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
