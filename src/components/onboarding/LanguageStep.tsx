import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Language } from '@/types';

interface LanguageStepProps {
  selected: Language;
  onSelect: (language: Language) => void;
  onNext: () => void;
  onBack: () => void;
}

const languages = [
  { id: 'en' as Language, label: 'English', flag: '🇬🇧', native: 'English' },
  { id: 'de' as Language, label: 'Deutsch', flag: '🇩🇪', native: 'German' },
];

export function LanguageStep({ selected, onSelect, onNext, onBack }: LanguageStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="flex flex-col items-center justify-center min-h-[80vh] px-6"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-bold mb-3 text-center"
      >
        Choose your language
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-muted-foreground mb-10 text-center"
      >
        Wähle deine Sprache
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-md mb-12">
        {languages.map((lang, index) => (
          <motion.button
            key={lang.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            onClick={() => onSelect(lang.id)}
            className={`p-6 rounded-2xl border-2 transition-all duration-200 ${
              selected === lang.id
                ? 'border-primary bg-primary/5 shadow-lg shadow-primary/20'
                : 'border-border hover:border-primary/50 bg-card'
            }`}
          >
            <span className="text-5xl mb-3 block">{lang.flag}</span>
            <span className="text-xl font-bold block">{lang.label}</span>
            <span className="text-sm text-muted-foreground">{lang.native}</span>
          </motion.button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex gap-4"
      >
        <Button variant="outline" size="lg" onClick={onBack}>
          Back
        </Button>
        <Button variant="gradient" size="lg" onClick={onNext}>
          Continue
        </Button>
      </motion.div>
    </motion.div>
  );
}
