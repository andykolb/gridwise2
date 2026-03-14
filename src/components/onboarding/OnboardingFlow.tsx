import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { WelcomeStep } from './WelcomeStep';
import { LanguageStep } from './LanguageStep';
import { InterestsStep } from './InterestsStep';
import { AssessmentStep } from './AssessmentStep';
import { NameStep } from './NameStep';
import { Language, Topic, UserLevel } from '@/types';
import { useUser } from '@/context/UserContext';

type Step = 'welcome' | 'language' | 'interests' | 'assessment' | 'name';

export function OnboardingFlow() {
  const [step, setStep] = useState<Step>('welcome');
  const [language, setLanguage] = useState<Language>('en');
  const [interests, setInterests] = useState<Topic[]>([]);
  const [level, setLevel] = useState<UserLevel>('beginner');
  const { completeOnboarding } = useUser();

  const toggleInterest = (topic: Topic) => {
    setInterests(prev =>
      prev.includes(topic)
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  const handleAssessmentComplete = (assessedLevel: UserLevel) => {
    setLevel(assessedLevel);
    setStep('name');
  };

  const handleNameComplete = (name: string) => {
    completeOnboarding({
      name,
      language,
      interests,
      level,
    });
  };

  const handleLogin = (username: string) => {
    // For now, simulate login by completing onboarding with the username
    // In a real app, this would check against stored users
    completeOnboarding({
      name: username,
      language: 'en',
      interests: [],
      level: 'beginner',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <AnimatePresence mode="wait">
        {step === 'welcome' && (
          <WelcomeStep key="welcome" onNext={() => setStep('language')} onLogin={handleLogin} />
        )}
        {step === 'language' && (
          <LanguageStep
            key="language"
            selected={language}
            onSelect={setLanguage}
            onNext={() => setStep('interests')}
            onBack={() => setStep('welcome')}
          />
        )}
        {step === 'interests' && (
          <InterestsStep
            key="interests"
            selected={interests}
            language={language}
            onToggle={toggleInterest}
            onNext={() => setStep('assessment')}
            onBack={() => setStep('language')}
          />
        )}
        {step === 'assessment' && (
          <AssessmentStep
            key="assessment"
            language={language}
            onComplete={handleAssessmentComplete}
            onBack={() => setStep('interests')}
          />
        )}
        {step === 'name' && (
          <NameStep
            key="name"
            language={language}
            onComplete={handleNameComplete}
            onBack={() => setStep('assessment')}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
