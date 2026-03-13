import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@/context/UserContext';
import { leaderboardUsers } from '@/data/content';
import { LeaderboardUser } from '@/types';
import { X, Trophy, Flame, Medal } from 'lucide-react';

interface LeaderboardProps {
  onClose: () => void;
}

export function Leaderboard({ onClose }: LeaderboardProps) {
  const { user } = useUser();

  if (!user) return null;

  const language = user.language;

  const t = {
    title: { en: 'Leaderboard', de: 'Rangliste' },
    you: { en: '(You)', de: '(Du)' },
    streak: { en: 'day streak', de: 'Tage Serie' },
  };

  const allUsers = useMemo(() => {
    const currentUser: LeaderboardUser = {
      rank: 0,
      name: user.name,
      xp: user.xp,
      level: user.level,
      avatar: user.avatar || '👤',
      streak: user.streak,
    };

    const merged = [...leaderboardUsers, currentUser]
      .sort((a, b) => b.xp - a.xp)
      .map((u, i) => ({ ...u, rank: i + 1 }));

    const top10 = merged.slice(0, 10);
    const userEntry = merged.find(u => u.name === user.name);

    if (userEntry && userEntry.rank > 10) {
      return [...merged.slice(0, 9), userEntry];
    }

    return top10;
  }, [user]);

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-amber-600" />;
    return <span className="text-sm font-bold text-muted-foreground">{rank}</span>;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background z-50 flex flex-col overflow-hidden"
    >
      <div className="p-4 border-b border-border shrink-0">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg">
            <X className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">{t.title[language]}</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-32">
        <div className="max-w-2xl mx-auto space-y-3">
          {allUsers.map((entry, index) => {
            const isCurrentUser = entry.name === user.name;

            return (
              <motion.div
                key={`${entry.name}-${entry.rank}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                  isCurrentUser
                    ? 'border-primary bg-primary/5'
                    : entry.rank <= 3
                    ? 'border-gold/30 bg-gold/5'
                    : 'border-border bg-card'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                  {getRankIcon(entry.rank)}
                </div>

                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-lg shrink-0">
                  {entry.avatar}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold truncate">{entry.name}</span>
                    {isCurrentUser && (
                      <span className="text-xs text-primary font-medium">{t.you[language]}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="capitalize">{entry.level}</span>
                    {entry.streak > 0 && (
                      <span className="flex items-center gap-1">
                        <Flame className="w-3 h-3 text-warning" />
                        {entry.streak} {t.streak[language]}
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-lg font-bold text-gold">{entry.xp}</span>
                  <span className="text-xs text-muted-foreground ml-1">XP</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
