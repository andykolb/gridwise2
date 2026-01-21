import { motion } from 'framer-motion';
import { useUser } from '@/context/UserContext';
import { Home, BookOpen, Trophy, Award, MessageCircle } from 'lucide-react';

type TabId = 'home' | 'quiz' | 'duel' | 'leaderboard' | 'achievements' | 'chat';

interface BottomNavProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const { user } = useUser();
  const language = user?.language || 'en';

  const tabs = [
    { id: 'home' as TabId, icon: Home, label: { en: 'Home', de: 'Start' } },
    { id: 'quiz' as TabId, icon: BookOpen, label: { en: 'Quiz', de: 'Quiz' } },
    { id: 'leaderboard' as TabId, icon: Trophy, label: { en: 'Rank', de: 'Rang' } },
    { id: 'achievements' as TabId, icon: Award, label: { en: 'Badges', de: 'Erfolge' } },
    { id: 'chat' as TabId, icon: MessageCircle, label: { en: 'Agent', de: 'Agent' } },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-40">
      <div className="max-w-2xl mx-auto flex justify-around py-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="relative flex flex-col items-center px-4 py-2"
            >
              <div className={`relative ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                <Icon className="w-6 h-6" />
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
