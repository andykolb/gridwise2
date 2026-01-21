import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Language } from '@/types';
import { User } from 'lucide-react';

interface NameStepProps {
  language: Language;
  onComplete: (name: string) => void;
  onBack: () => void;
}

export function NameStep({ language, onComplete, onBack }: NameStepProps) {
  const [name, setName] = useState('');

  const t = {
    title: {
      en: 'What should we call you?',
      de: 'Wie sollen wir dich nennen?',
    },
    subtitle: {
      en: 'Enter your name or nickname',
      de: 'Gib deinen Namen oder Spitznamen ein',
    },
    placeholder: {
      en: 'Your name',
      de: 'Dein Name',
    },
    button: {
      en: 'Start Learning',
      de: 'Lerne starten',
    },
    back: {
      en: 'Back',
      de: 'Zurück',
    },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onComplete(name.trim());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="flex flex-col items-center justify-center min-h-[80vh] px-6"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: 'spring' }}
        className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-8"
      >
        <User className="w-10 h-10 text-primary" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-3xl md:text-4xl font-bold mb-3 text-center"
      >
        {t.title[language]}
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-muted-foreground mb-10 text-center"
      >
        {t.subtitle[language]}
      </motion.p>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        onSubmit={handleSubmit}
        className="w-full max-w-sm"
      >
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t.placeholder[language]}
          className="h-14 text-lg text-center rounded-xl border-2 mb-6"
          autoFocus
        />

        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={onBack}
            className="flex-1"
          >
            {t.back[language]}
          </Button>
          <Button
            type="submit"
            variant="gradient"
            size="lg"
            disabled={!name.trim()}
            className="flex-1"
          >
            {t.button[language]}
          </Button>
        </div>
      </motion.form>
    </motion.div>
  );
}
