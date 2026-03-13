import { useNavigate } from 'react-router-dom';
import { Leaderboard } from '@/components/leaderboard/Leaderboard';

export function LeaderboardPage() {
  const navigate = useNavigate();

  return <Leaderboard onClose={() => navigate('/')} />;
}
