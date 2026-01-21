import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { UserProvider, useUser } from '@/context/UserContext';
import { OnboardingFlow } from '@/components/onboarding/OnboardingFlow';
import { LearningHome } from '@/components/home/LearningHome';
import { QuizMode } from '@/components/quiz/QuizMode';
import { QuizDuel } from '@/components/quiz/QuizDuel';
import { Leaderboard } from '@/components/leaderboard/Leaderboard';
import { Achievements } from '@/components/achievements/Achievements';
import { AgentChat } from '@/components/chat/AgentChat';
import { BottomNav } from '@/components/navigation/BottomNav';

type View = 'home' | 'quiz' | 'duel' | 'leaderboard' | 'achievements' | 'chat';

function AppContent() {
  const { isOnboarded } = useUser();
  const [currentView, setCurrentView] = useState<View>('home');

  if (!isOnboarded) {
    return <OnboardingFlow />;
  }

  return (
    <div className="min-h-screen bg-background overflow-y-auto">
      <AnimatePresence mode="wait">
        {currentView === 'home' && (
          <LearningHome
            key="home"
            onStartQuiz={() => setCurrentView('quiz')}
            onStartDuel={() => setCurrentView('duel')}
            onOpenChat={() => setCurrentView('chat')}
            onOpenLeaderboard={() => setCurrentView('leaderboard')}
            onOpenAchievements={() => setCurrentView('achievements')}
          />
        )}
        {currentView === 'duel' && (
          <QuizDuel key="duel" onClose={() => setCurrentView('home')} />
        )}
        {currentView === 'quiz' && (
          <QuizMode key="quiz" onClose={() => setCurrentView('home')} />
        )}
        {currentView === 'leaderboard' && (
          <Leaderboard key="leaderboard" onClose={() => setCurrentView('home')} />
        )}
        {currentView === 'achievements' && (
          <Achievements key="achievements" onClose={() => setCurrentView('home')} />
        )}
        {currentView === 'chat' && (
          <AgentChat key="chat" onClose={() => setCurrentView('home')} />
        )}
      </AnimatePresence>

      <BottomNav activeTab={currentView} onTabChange={setCurrentView} />
    </div>
  );
}

const Index = () => {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
};

export default Index;
