import { useNavigate } from 'react-router-dom';
import { AgentChat } from '@/components/chat/AgentChat';

export function ChatPage() {
  const navigate = useNavigate();

  return <AgentChat onClose={() => navigate('/')} />;
}
