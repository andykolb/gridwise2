import { Outlet, Navigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { OnboardingFlow } from '@/components/onboarding/OnboardingFlow';
import { BottomNav } from '@/components/navigation/BottomNav';
import { XPToast } from '@/components/effects/XPToast';
import { LevelUpCelebration } from '@/components/effects/LevelUpCelebration';
import { useState, useEffect } from 'react';

export function AppLayout() {
  const { user, isOnboarded, xpAnimation, levelUpEvent, clearXPAnimation, clearLevelUpEvent } = useUser();
  const [showXPToast, setShowXPToast] = useState(false);

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
      <Outlet />

      <BottomNav />

      {xpAnimation && (
        <XPToast
          amount={xpAnimation.amount}
          isVisible={showXPToast}
          onComplete={() => {}}
        />
      )}

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
