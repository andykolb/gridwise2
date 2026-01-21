import { motion } from 'framer-motion';
import { useUser } from '@/context/UserContext';
import { X, Lock } from 'lucide-react';

interface AchievementsProps {
  onClose: () => void;
}

export function Achievements({ onClose }: AchievementsProps) {
  const { user, achievements } = useUser();

  if (!user) return null;

  const language = user.language;

  const t = {
    title: { en: 'Achievements', de: 'Erfolge' },
    subtitle: { en: 'Your earned badges', de: 'Deine verdienten Abzeichen' },
    unlocked: { en: 'Unlocked', de: 'Freigeschaltet' },
    locked: { en: 'Locked', de: 'Gesperrt' },
  };

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-background z-50 flex flex-col"
    >
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{t.title[language]}</h1>
            <p className="text-sm text-muted-foreground">
              {unlockedCount}/{achievements.length} {t.unlocked[language].toLowerCase()}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg">
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-2xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className={`relative p-5 rounded-2xl border-2 text-center transition-all ${
                achievement.unlocked
                  ? 'border-success bg-success/5 shadow-md'
                  : 'border-border bg-card opacity-60'
              }`}
            >
              {!achievement.unlocked && (
                <div className="absolute top-3 right-3">
                  <Lock className="w-4 h-4 text-muted-foreground" />
                </div>
              )}
              
              <motion.div
                className={`text-5xl mb-3 ${achievement.unlocked ? '' : 'grayscale'}`}
                animate={achievement.unlocked ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                {achievement.icon}
              </motion.div>
              
              <h3 className="font-bold mb-1">{achievement.name[language]}</h3>
              <p className="text-xs text-muted-foreground">
                {achievement.description[language]}
              </p>

              {achievement.unlocked && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="mt-3 inline-block px-3 py-1 rounded-full bg-success text-success-foreground text-xs font-semibold"
                >
                  ✓ {t.unlocked[language]}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
