import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Topic, Language } from '@/types';
import { topics } from '@/data/content';
import { Check } from 'lucide-react';

interface InterestsStepProps {
  selected: Topic[];
  language: Language;
  onToggle: (topic: Topic) => void;
  onNext: () => void;
  onBack: () => void;
}

export function InterestsStep({ selected, language, onToggle, onNext, onBack }: InterestsStepProps) {
  const t = {
    title: {
      en: 'What interests you?',
      de: 'Was interessiert dich?',
    },
    subtitle: {
      en: 'Select topics you want to learn about',
      de: 'Wähle Themen aus, über die du lernen möchtest',
    },
    min: {
      en: 'Select at least 2 topics',
      de: 'Wähle mindestens 2 Themen',
    },
  };

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
        {t.title[language]}
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-muted-foreground mb-8 text-center"
      >
        {t.subtitle[language]}
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl mb-8">
        {topics.map((topic, index) => {
          const isSelected = selected.includes(topic.id);
          return (
            <motion.button
              key={topic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + index * 0.05 }}
              onClick={() => onToggle(topic.id)}
              className={`p-4 rounded-xl border-2 text-left transition-all duration-200 flex items-center gap-4 ${
                isSelected
                  ? 'border-primary bg-primary/5 shadow-md'
                  : 'border-border hover:border-primary/50 bg-card'
              }`}
            >
              <span className="text-3xl">{topic.icon}</span>
              <span className="font-semibold flex-1">{topic.label[language]}</span>
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                >
                  <Check className="w-4 h-4 text-primary-foreground" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-sm text-muted-foreground mb-6"
      >
        {selected.length < 2 ? t.min[language] : `${selected.length} topics selected`}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex gap-4"
      >
        <Button variant="outline" size="lg" onClick={onBack}>
          {language === 'de' ? 'Zurück' : 'Back'}
        </Button>
        <Button
          variant="gradient"
          size="lg"
          onClick={onNext}
          disabled={selected.length < 2}
        >
          {language === 'de' ? 'Weiter' : 'Continue'}
        </Button>
      </motion.div>
    </motion.div>
  );
}
