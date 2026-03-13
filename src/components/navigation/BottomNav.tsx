import { motion } from 'framer-motion';
import { useUser } from '@/context/UserContext';
import { Home, BookOpen, Trophy, Award, MessageCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const tabs = [
  { id: 'home', path: '/', icon: Home, label: { en: 'Home', de: 'Start' } },
  { id: 'quiz-hub', path: '/quiz', icon: BookOpen, label: { en: 'Quiz', de: 'Quiz' } },
  { id: 'leaderboard', path: '/leaderboard', icon: Trophy, label: { en: 'Rank', de: 'Rang' } },
  { id: 'achievements', path: '/achievements', icon: Award, label: { en: 'Badges', de: 'Erfolge' } },
  { id: 'chat', path: '/chat', icon: MessageCircle, label: { en: 'Agent', de: 'Agent' } },
];

export function BottomNav() {
  const { user, newAchievementCount } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const language = user?.language || 'en';

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-40">
      <div className="max-w-2xl mx-auto flex justify-around py-2">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path ||
            (tab.id === 'quiz-hub' && location.pathname.startsWith('/quiz'));
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className="relative flex flex-col items-center px-4 py-2"
            >
              <div className={`relative ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                <Icon className="w-6 h-6" />
                {tab.id === 'achievements' && newAchievementCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center bg-primary text-primary-foreground text-[10px] font-bold rounded-full px-1"
                  >
                    {newAchievementCount}
                  </motion.span>
                )}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -inset-2 rounded-xl bg-primary/10 -z-10"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </div>
              <span className={`text-xs mt-1 ${isActive ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>
                {tab.label[language]}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
