import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Zap, Brain, Trophy, MessageCircle, Smartphone, Apple, ArrowRight } from 'lucide-react';

interface WelcomeStepProps {
  onNext: () => void;
  onLogin?: (username: string) => void;
}

export function WelcomeStep({ onNext, onLogin }: WelcomeStepProps) {
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState('');

  const features = [
    { icon: Brain, label: 'Learn daily nuggets' },
    { icon: Trophy, label: 'Earn XP & compete' },
    { icon: MessageCircle, label: 'Ask the AI agent' },
  ];

  const handleLogin = () => {
    if (username.trim() && onLogin) {
      onLogin(username.trim());
    }
  };

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
        className="flex flex-wrap justify-center gap-4 mb-10"
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

      {/* Login Section for Existing Users */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="w-full max-w-sm mb-6"
      >
        {showLogin ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-3"
          >
            <Input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              className="text-center"
            />
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowLogin(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="gradient"
                onClick={handleLogin}
                disabled={!username.trim()}
                className="flex-1"
              >
                Login
              </Button>
            </div>
          </motion.div>
        ) : (
          <button
            onClick={() => setShowLogin(true)}
            className="text-sm text-muted-foreground hover:text-primary transition-colors underline underline-offset-4"
          >
            Already have an account? <span className="font-medium">Login</span>
          </button>
        )}
      </motion.div>

      {/* Get Started Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mb-10"
      >
        <Button
          variant="gradient"
          size="xl"
          onClick={onNext}
          className="min-w-[200px] group"
        >
          Get Started
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </motion.div>

      {/* Fake App Store Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
        className="space-y-3"
      >
        <p className="text-sm text-muted-foreground mb-2">Also available on mobile</p>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {}}
            className="flex items-center gap-2 bg-foreground text-background px-4 py-2.5 rounded-lg hover:opacity-90 transition-opacity cursor-not-allowed"
            disabled
          >
            <Apple className="w-5 h-5" />
            <div className="text-left">
              <div className="text-[10px] leading-tight opacity-80">Download on the</div>
              <div className="text-sm font-semibold leading-tight">App Store</div>
            </div>
          </button>
          <button
            onClick={() => {}}
            className="flex items-center gap-2 bg-foreground text-background px-4 py-2.5 rounded-lg hover:opacity-90 transition-opacity cursor-not-allowed"
            disabled
          >
            <Smartphone className="w-5 h-5" />
            <div className="text-left">
              <div className="text-[10px] leading-tight opacity-80">Get it on</div>
              <div className="text-sm font-semibold leading-tight">Google Play</div>
            </div>
          </button>
        </div>
        <p className="text-xs text-muted-foreground/60">Coming soon</p>
      </motion.div>
    </motion.div>
  );
}
