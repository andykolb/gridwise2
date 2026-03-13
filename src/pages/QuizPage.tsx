import { useNavigate } from 'react-router-dom';
import { QuizHub } from '@/components/quiz/QuizHub';

export function QuizPage() {
  const navigate = useNavigate();

  return (
    <QuizHub
      onClose={() => navigate('/')}
      onStartQuiz={() => navigate('/quiz/play')}
    />
  );
}
