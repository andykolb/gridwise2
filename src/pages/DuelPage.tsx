import { useNavigate } from 'react-router-dom';
import { QuizDuel } from '@/components/quiz/QuizDuel';

export function DuelPage() {
  const navigate = useNavigate();

  return <QuizDuel onClose={() => navigate('/')} />;
}
