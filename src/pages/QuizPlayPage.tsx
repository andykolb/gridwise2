import { useNavigate } from 'react-router-dom';
import { QuizMode } from '@/components/quiz/QuizMode';

export function QuizPlayPage() {
  const navigate = useNavigate();

  return <QuizMode onClose={() => navigate('/quiz')} />;
}
