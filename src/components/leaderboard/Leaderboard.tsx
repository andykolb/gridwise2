import { motion } from 'framer-motion';
import { useUser } from '@/context/UserContext';
import { LeaderboardUser } from '@/types';
import { X, Trophy, Flame, Medal, Users } from 'lucide-react';

interface LeaderboardProps {
  onClose: () => void;
}

export function Leaderboard({ onClose }: LeaderboardProps) {
  const { user } = useUser();

  if (!user) return null;

  const language = user.language;

  const t = {
    title: { en: 'Leaderboard', de: 'Rangliste' },
    subtitle: { en: 'Top learners this week', de: 'Top-Lerner diese Woche' },
    you: { en: '(You)', de: '(Du)' },
    streak: { en: 'day streak', de: 'Tage Serie' },
    emptyTitle: { en: 'Be the first!', de: 'Sei der Erste!' },
    emptySubtitle: {
      en: 'Complete quizzes and earn XP to climb the leaderboard. Invite colleagues to compete!',
      de: 'Schließe Quizze ab und sammle XP, um in der Rangliste aufzusteigen. Lade Kollegen ein!',
    },
  };

  // Show only the current user
  const userEntry: LeaderboardUser = {
    rank: 1,
    name: user.name,
    xp: user.xp,
    level: user.level,
    avatar: '🧑‍💻',
    streak: user.streak,
  };

  const displayUsers = [userEntry];

  const getRankStyle = (rank: number) => {
    if (rank === 1) return 'gradient-gold text-gold-foreground';
    if (rank === 2) return 'bg-gray-300 text-gray-700';
    if (rank === 3) return 'bg-amber-600 text-white';
    return 'bg-muted text-muted-foreground';
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-4 h-4" />;
    if (rank === 2) return <Medal className="w-4 h-4" />;
    if (rank === 3) return <Medal className="w-4 h-4" />;
    return rank;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-background z-50 flex flex-col"
    >
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{t.title[language]}</h1>
            <p className="text-sm text-muted-foreground">{t.subtitle[language]}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg">
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-2xl mx-auto space-y-2">
          {displayUsers.map((leaderUser, index) => (
            <motion.div
              key={`${leaderUser.name}-${leaderUser.rank}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-4 p-4 rounded-2xl border-2 transition-all border-primary bg-primary/5 shadow-lg"
            >
              {/* Rank */}
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${getRankStyle(leaderUser.rank)}`}>
                {getRankIcon(leaderUser.rank)}
              </div>

              {/* Avatar */}
              <div className="text-3xl">{leaderUser.avatar}</div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold truncate">{leaderUser.name}</span>
                  <span className="text-xs text-primary font-medium">{t.you[language]}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="capitalize">{leaderUser.level}</span>
                  <span className="flex items-center gap-1">
                    <Flame className="w-3 h-3 text-warning" />
                    {leaderUser.streak} {t.streak[language]}
                  </span>
                </div>
              </div>

              {/* XP */}
              <div className="text-right">
                <div className="font-bold text-lg">{leaderUser.xp.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">XP</div>
              </div>
            </motion.div>
          ))}

          {/* Empty state / invite prompt */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 text-center py-12 px-6"
          >
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{t.emptyTitle[language]}</h3>
            <p className="text-muted-foreground text-sm max-w-xs mx-auto">
              {t.emptySubtitle[language]}
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
