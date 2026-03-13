import { useNavigate } from 'react-router-dom';
import { Achievements } from '@/components/achievements/Achievements';

export function AchievementsPage() {
  const navigate = useNavigate();

  return <Achievements onClose={() => navigate('/')} />;
}
