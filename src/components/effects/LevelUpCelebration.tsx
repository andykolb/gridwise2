import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserLevel } from '@/types';

interface LevelUpCelebrationProps {
  isVisible: boolean;
  newLevel: UserLevel;
  language: 'en' | 'de';
  onClose: () => void;
}

const levelConfig: Record<UserLevel, { icon: string; color: string }> = {
  beginner: { icon: '🌱', color: 'from-green-400 to-green-600' },
  intermediate: { icon: '⚡', color: 'from-blue-400 to-blue-600' },
  advanced: { icon: '🔥', color: 'from-orange-400 to-orange-600' },
  expert: { icon: '👑', color: 'from-yellow-400 to-yellow-600' },
};

const levelLabels: Record<UserLevel, { en: string; de: string }> = {
  beginner: { en: 'Beginner', de: 'Anfänger' },
  intermediate: { en: 'Intermediate', de: 'Fortgeschritten' },
  advanced: { en: 'Advanced', de: 'Profi' },
  expert: { en: 'Expert', de: 'Experte' },
};

// Confetti particle component
function Confetti() {
  const [particles] = useState(() => 
    [...Array(50)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 2 + Math.random() * 2,
      size: 6 + Math.random() * 8,
      color: ['#FFD700', '#FF6B6B', '#4ECDC4', '#A855F7', '#F472B6', '#34D399'][Math.floor(Math.random() * 6)],
      rotation: Math.random() * 360,
    }))
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[70]">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ 
            x: `${particle.x}vw`, 
            y: '-10vh',
            rotate: 0,
            opacity: 1
          }}
          animate={{ 
            y: '110vh',
            rotate: particle.rotation + 720,
            opacity: [1, 1, 0]
          }}
          transition={{ 
            duration: particle.duration,
            delay: particle.delay,
            ease: 'linear'
          }}
          style={{
            position: 'absolute',
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          }}
        />
      ))}
    </div>
  );
}

export function LevelUpCelebration({ isVisible, newLevel, language, onClose }: LevelUpCelebrationProps) {
  const config = levelConfig[newLevel];
  const label = levelLabels[newLevel][language];

  const t = {
    levelUp: { en: 'Level Up!', de: 'Level aufgestiegen!' },
    youReached: { en: 'You reached', de: 'Du hast erreicht' },
    awesome: { en: 'Keep up the amazing work!', de: 'Mach weiter so!' },
    continue: { en: 'Continue', de: 'Weiter' },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <Confetti />
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[65]"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed inset-0 flex items-center justify-center z-[70] p-6"
          >
            <div className="bg-card rounded-3xl p-8 max-w-sm w-full text-center border border-border shadow-2xl">
              {/* Animated stars */}
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute -top-4 -left-4"
                >
                  <Star className="w-6 h-6 text-gold fill-gold" />
                </motion.div>
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                  className="absolute -top-2 -right-2"
                >
                  <Sparkles className="w-5 h-5 text-primary" />
                </motion.div>

                {/* Level badge */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className={`w-28 h-28 rounded-full bg-gradient-to-br ${config.color} flex items-center justify-center mx-auto mb-6 shadow-lg`}
                >
                  <span className="text-5xl">{config.icon}</span>
                </motion.div>
              </div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-gold bg-clip-text text-transparent"
              >
                {t.levelUp[language]}
              </motion.h2>

              {/* Level name */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-4"
              >
                <p className="text-muted-foreground mb-1">{t.youReached[language]}</p>
                <p className="text-2xl font-bold">{label}</p>
              </motion.div>

              {/* Trophy animation */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
                className="flex justify-center gap-2 mb-6"
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -8, 0] }}
                    transition={{ 
                      delay: 0.6 + i * 0.1, 
                      duration: 0.5,
                      repeat: Infinity,
                      repeatDelay: 1
                    }}
                  >
                    <Trophy className="w-8 h-8 text-gold fill-gold/20" />
                  </motion.div>
                ))}
              </motion.div>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-muted-foreground mb-6"
              >
                {t.awesome[language]}
              </motion.p>

              {/* Continue button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Button
                  variant="gradient"
                  size="lg"
                  onClick={onClose}
                  className="w-full"
                >
                  {t.continue[language]}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
