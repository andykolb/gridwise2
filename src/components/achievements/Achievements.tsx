import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@/context/UserContext';
import { X, Lock, CheckCircle2 } from 'lucide-react';

interface AchievementsProps {
  onClose: () => void;
}

export function Achievements({ onClose }: AchievementsProps) {
  const { user, achievements, clearNewAchievements } = useUser();

  useEffect(() => {
    clearNewAchievements();
  }, [clearNewAchievements]);

  if (!user) return null;

  const language = user.language;
  const unlockedCount = achievements.filter(a => a.unlocked).length;

  const t = {
    title: { en: 'Achievements', de: 'Erfolge' },
    unlocked: { en: 'Unlocked', de: 'Freigeschaltet' },
    locked: { en: 'Locked', de: 'Gesperrt' },
  };

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
          <div className="text-center">
            <h1 className="text-xl font-bold">{t.title[language]}</h1>
            <p className="text-xs text-muted-foreground">
              {unlockedCount}/{achievements.length} {t.unlocked[language]}
            </p>
          </div>
          <div className="w-10" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-32">
        <div className="max-w-2xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className={`relative p-4 rounded-2xl border text-center transition-all ${
                achievement.unlocked
                  ? 'border-success/30 bg-success/5'
                  : 'border-border bg-card opacity-60'
              }`}
            >
              <motion.div
                animate={achievement.unlocked ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.3 }}
                className="text-4xl mb-3"
              >
                {achievement.unlocked ? (
                  achievement.icon
                ) : (
                  <Lock className="w-10 h-10 text-muted-foreground mx-auto" />
                )}
              </motion.div>

              <h3 className="font-semibold text-sm mb-1">
                {achievement.name[language]}
              </h3>
              <p className="text-xs text-muted-foreground">
                {achievement.description[language]}
              </p>

              {achievement.unlocked && (
                <div className="absolute top-2 right-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
