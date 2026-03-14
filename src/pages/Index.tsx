import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { UserProvider, useUser } from '@/context/UserContext';
import { OnboardingFlow } from '@/components/onboarding/OnboardingFlow';
import { LearningHome } from '@/components/home/LearningHome';
import { QuizHub } from '@/components/quiz/QuizHub';
import { QuizMode } from '@/components/quiz/QuizMode';
import { QuizDuel } from '@/components/quiz/QuizDuel';
import { Leaderboard } from '@/components/leaderboard/Leaderboard';
import { Achievements } from '@/components/achievements/Achievements';
import { AgentChat } from '@/components/chat/AgentChat';
import { BottomNav } from '@/components/navigation/BottomNav';
import { XPToast } from '@/components/effects/XPToast';
import { LevelUpCelebration } from '@/components/effects/LevelUpCelebration';

type View = 'home' | 'quiz-hub' | 'quiz' | 'duel' | 'leaderboard' | 'achievements' | 'chat';

function AppContent() {
  const { user, isOnboarded, xpAnimation, levelUpEvent, clearXPAnimation, clearLevelUpEvent } = useUser();
  const [currentView, setCurrentView] = useState<View>('home');
  const [showXPToast, setShowXPToast] = useState(false);

  // Handle XP animation
  useEffect(() => {
    if (xpAnimation) {
      setShowXPToast(true);
      const timer = setTimeout(() => {
        setShowXPToast(false);
        setTimeout(clearXPAnimation, 300);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [xpAnimation, clearXPAnimation]);

  if (!isOnboarded) {
    return <OnboardingFlow />;
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <AnimatePresence mode="wait">
        {currentView === 'home' && (
          <LearningHome
            key="home"
            onStartQuiz={() => setCurrentView('quiz-hub')}
            onStartDuel={() => setCurrentView('duel')}
            onOpenChat={() => setCurrentView('chat')}
            onOpenLeaderboard={() => setCurrentView('leaderboard')}
            onOpenAchievements={() => setCurrentView('achievements')}
          />
        )}
        {currentView === 'quiz-hub' && (
          <QuizHub 
            key="quiz-hub" 
            onClose={() => setCurrentView('home')} 
            onStartQuiz={() => setCurrentView('quiz')}
          />
        )}
        {currentView === 'duel' && (
          <QuizDuel key="duel" onClose={() => setCurrentView('home')} />
        )}
        {currentView === 'quiz' && (
          <QuizMode key="quiz" onClose={() => setCurrentView('quiz-hub')} />
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

      <BottomNav activeTab={currentView === 'quiz-hub' || currentView === 'quiz' ? 'quiz-hub' : currentView} onTabChange={setCurrentView} />

      {/* XP Toast Animation */}
      {xpAnimation && (
        <XPToast
          amount={xpAnimation.amount}
          isVisible={showXPToast}
          onComplete={() => {}}
        />
      )}

      {/* Level Up Celebration */}
      {levelUpEvent && user && (
        <LevelUpCelebration
          isVisible={!!levelUpEvent}
          newLevel={levelUpEvent.newLevel}
          language={user.language}
          onClose={clearLevelUpEvent}
        />
      )}
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
