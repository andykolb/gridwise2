import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';

interface XPToastProps {
  amount: number;
  isVisible: boolean;
  onComplete: () => void;
}

export function XPToast({ amount, isVisible, onComplete }: XPToastProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -100, scale: 0.8 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 20
          }}
          className="fixed bottom-32 left-1/2 -translate-x-1/2 z-[60] pointer-events-none"
        >
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.3, times: [0, 0.5, 1] }}
            className="flex items-center gap-2 bg-gold text-gold-foreground px-6 py-3 rounded-full shadow-lg"
          >
            <motion.div
              animate={{ rotate: [0, -15, 15, 0] }}
              transition={{ duration: 0.4, repeat: 2 }}
            >
              <Zap className="w-6 h-6 fill-current" />
            </motion.div>
            <span className="text-2xl font-bold">+{amount} XP</span>
          </motion.div>

          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1
              }}
              animate={{
                opacity: 0,
                x: (i % 2 === 0 ? 1 : -1) * (30 + Math.random() * 40),
                y: -50 - Math.random() * 50,
                scale: 0
              }}
              transition={{
                duration: 0.8,
                delay: 0.1 + i * 0.05,
                ease: 'easeOut'
              }}
              className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-gold"
              style={{
                transform: `rotate(${i * 60}deg) translateX(${20}px)`
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
