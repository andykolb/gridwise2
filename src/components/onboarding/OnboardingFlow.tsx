import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@/context/UserContext';
import { Language, Topic, UserLevel } from '@/types';
import { topics } from '@/data/content';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft, ChevronRight, Globe, BookOpen, Target, User } from 'lucide-react';

type Step = 'welcome' | 'language' | 'interests' | 'assessment' | 'name';

export function OnboardingFlow() {
  const { completeOnboarding } = useUser();
  const [step, setStep] = useState<Step>('welcome');
  const [language, setLanguage] = useState<Language>('en');
  const [interests, setInterests] = useState<Topic[]>([]);
  const [level, setLevel] = useState<UserLevel>('beginner');
  const [name, setName] = useState('');

  const toggleInterest = (topic: Topic) => {
    setInterests(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  const handleComplete = () => {
    completeOnboarding({
      name: name || 'Learner',
      language,
      interests,
      level,
    });
  };

  const t = {
    welcome: { en: 'Welcome to GridWise!', de: 'Willkommen bei GridWise!' },
    welcomeSub: { en: 'Learn about energy markets in a fun way', de: 'Lerne spielerisch über Energiemärkte' },
    getStarted: { en: 'Get Started', de: 'Los geht\'s' },
    selectLanguage: { en: 'Select your language', de: 'Wähle deine Sprache' },
    selectInterests: { en: 'What interests you?', de: 'Was interessiert dich?' },
    selectLevel: { en: 'What\'s your experience level?', de: 'Was ist dein Erfahrungslevel?' },
    whatsYourName: { en: 'What\'s your name?', de: 'Wie heißt du?' },
    namePlaceholder: { en: 'Enter your name', de: 'Gib deinen Namen ein' },
    next: { en: 'Next', de: 'Weiter' },
    back: { en: 'Back', de: 'Zurück' },
    finish: { en: 'Start Learning!', de: 'Jetzt lernen!' },
    beginner: { en: 'Beginner', de: 'Anfänger' },
    intermediate: { en: 'Intermediate', de: 'Fortgeschritten' },
    advanced: { en: 'Advanced', de: 'Profi' },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <AnimatePresence mode="wait">
          {step === 'welcome' && (
            <motion.div key="welcome" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center space-y-8">
              <div className="w-24 h-24 rounded-full gradient-primary flex items-center justify-center mx-auto">
                <span className="text-4xl">⚡</span>
              </div>
              <h1 className="text-3xl font-bold">{t.welcome[language]}</h1>
              <p className="text-muted-foreground">{t.welcomeSub[language]}</p>
              <Button variant="gradient" size="lg" onClick={() => setStep('language')} className="w-full">
                {t.getStarted[language]}
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          )}

          {step === 'language' && (
            <motion.div key="language" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <div className="text-center">
                <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-bold">{t.selectLanguage[language]}</h2>
              </div>
              <div className="space-y-3">
                {[
                  { id: 'en' as Language, label: 'English', flag: '🇬🇧' },
                  { id: 'de' as Language, label: 'Deutsch', flag: '🇩🇪' },
                ].map(lang => (
                  <button
                    key={lang.id}
                    onClick={() => setLanguage(lang.id)}
                    className={`w-full p-4 rounded-xl border-2 flex items-center gap-4 transition-all ${
                      language === lang.id ? 'border-primary bg-primary/5' : 'border-border bg-card hover:border-primary/50'
                    }`}
                  >
                    <span className="text-3xl">{lang.flag}</span>
                    <span className="text-lg font-medium">{lang.label}</span>
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep('welcome')} className="flex-1">
                  <ChevronLeft className="w-4 h-4 mr-1" /> {t.back[language]}
                </Button>
                <Button variant="gradient" onClick={() => setStep('interests')} className="flex-1">
                  {t.next[language]} <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 'interests' && (
            <motion.div key="interests" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <div className="text-center">
                <BookOpen className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-bold">{t.selectInterests[language]}</h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {topics.map(topic => (
                  <button
                    key={topic.id}
                    onClick={() => toggleInterest(topic.id)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      interests.includes(topic.id) ? 'border-primary bg-primary/5' : 'border-border bg-card hover:border-primary/50'
                    }`}
                  >
                    <span className="text-2xl block mb-1">{topic.icon}</span>
                    <span className="text-sm font-medium">{topic.label[language]}</span>
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep('language')} className="flex-1">
                  <ChevronLeft className="w-4 h-4 mr-1" /> {t.back[language]}
                </Button>
                <Button variant="gradient" onClick={() => setStep('assessment')} className="flex-1" disabled={interests.length === 0}>
                  {t.next[language]} <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 'assessment' && (
            <motion.div key="assessment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <div className="text-center">
                <Target className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-bold">{t.selectLevel[language]}</h2>
              </div>
              <div className="space-y-3">
                {[
                  { id: 'beginner' as UserLevel, label: t.beginner[language], icon: '🌱', desc: language === 'en' ? 'New to energy markets' : 'Neu bei Energiemärkten' },
                  { id: 'intermediate' as UserLevel, label: t.intermediate[language], icon: '⚡', desc: language === 'en' ? 'Some knowledge' : 'Etwas Wissen' },
                  { id: 'advanced' as UserLevel, label: t.advanced[language], icon: '🔥', desc: language === 'en' ? 'Industry experience' : 'Branchenerfahrung' },
                ].map(lvl => (
                  <button
                    key={lvl.id}
                    onClick={() => setLevel(lvl.id)}
                    className={`w-full p-4 rounded-xl border-2 flex items-center gap-4 transition-all ${
                      level === lvl.id ? 'border-primary bg-primary/5' : 'border-border bg-card hover:border-primary/50'
                    }`}
                  >
                    <span className="text-2xl">{lvl.icon}</span>
                    <div className="text-left">
                      <div className="font-medium">{lvl.label}</div>
                      <div className="text-sm text-muted-foreground">{lvl.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep('interests')} className="flex-1">
                  <ChevronLeft className="w-4 h-4 mr-1" /> {t.back[language]}
                </Button>
                <Button variant="gradient" onClick={() => setStep('name')} className="flex-1">
                  {t.next[language]} <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 'name' && (
            <motion.div key="name" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <div className="text-center">
                <User className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-bold">{t.whatsYourName[language]}</h2>
              </div>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.namePlaceholder[language]}
                className="h-14 text-lg rounded-xl"
                onKeyDown={(e) => e.key === 'Enter' && handleComplete()}
              />
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep('assessment')} className="flex-1">
                  <ChevronLeft className="w-4 h-4 mr-1" /> {t.back[language]}
                </Button>
                <Button variant="gradient" onClick={handleComplete} className="flex-1">
                  {t.finish[language]}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
