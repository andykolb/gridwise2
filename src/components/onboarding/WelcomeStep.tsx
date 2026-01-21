import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Zap, Brain, Trophy, MessageCircle } from 'lucide-react';

interface WelcomeStepProps {
  onNext: () => void;
}

export function WelcomeStep({ onNext }: WelcomeStepProps) {
  const features = [
    { icon: Brain, label: 'Learn daily nuggets' },
    { icon: Trophy, label: 'Earn XP & compete' },
    { icon: MessageCircle, label: 'Ask the AI agent' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="w-24 h-24 rounded-3xl gradient-primary flex items-center justify-center mb-8 shadow-glow"
      >
        <Zap className="w-12 h-12 text-primary-foreground" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-4xl md:text-5xl font-extrabold mb-4"
      >
        Welcome to{' '}
        <span className="text-gradient">GridWise</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-lg text-muted-foreground mb-10 max-w-md"
      >
        Your AI-powered journey to mastering energy markets starts here
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex flex-wrap justify-center gap-4 mb-12"
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            className="flex items-center gap-2 bg-card rounded-full px-5 py-3 shadow-md border border-border"
          >
            <feature.icon className="w-5 h-5 text-primary" />
            <span className="font-medium">{feature.label}</span>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        <Button
          variant="gradient"
          size="xl"
          onClick={onNext}
          className="min-w-[200px]"
        >
          Get Started
        </Button>
      </motion.div>
    </motion.div>
  );
}
