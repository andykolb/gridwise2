import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';

const PlayerJoin = () => {
  const { roomCode: paramCode } = useParams<{ roomCode?: string }>();
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState(paramCode?.toUpperCase() ?? '');
  const [displayName, setDisplayName] = useState('');
  const [step, setStep] = useState<'code' | 'name'>(paramCode ? 'name' : 'code');
  const [error, setError] = useState('');
  const [isJoining, setIsJoining] = useState(false);

  const handleCodeSubmit = async () => {
    setError('');
    const code = roomCode.toUpperCase().trim();
    if (code.length !== 6) {
      setError('Room code must be 6 characters');
      return;
    }

    const { data } = await supabase
      .from('sessions')
      .select('id, status')
      .eq('room_code', code)
      .single();

    if (!data) {
      setError('Game not found. Check the code and try again.');
      return;
    }

    if (data.status !== 'lobby') {
      setError('This game has already started.');
      return;
    }

    setRoomCode(code);
    setStep('name');
  };

  const handleJoin = async () => {
    setError('');
    const name = displayName.trim();
    if (!name) {
      setError('Please enter your name');
      return;
    }

    setIsJoining(true);
    try {
      const { data: session } = await supabase
        .from('sessions')
        .select('id')
        .eq('room_code', roomCode)
        .single();

      if (!session) {
        setError('Game not found');
        return;
      }

      const { data: player, error: insertError } = await supabase
        .from('players')
        .insert({ session_id: session.id, display_name: name })
        .select()
        .single();

      if (insertError) throw insertError;

      localStorage.setItem(`player-${roomCode}`, player.id);
      localStorage.setItem(`player-name-${roomCode}`, name);

      navigate(`/auction/play/${roomCode}`);
    } catch (err) {
      console.error('Join error:', err);
      setError('Failed to join game');
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <motion.div
        className="w-full max-w-sm"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <Zap className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold text-foreground">Energy Auction</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Join Game</h1>
        </div>

        {step === 'code' ? (
          <motion.div
            key="code"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Room Code</label>
              <Input
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase().slice(0, 6))}
                placeholder="ABCD12"
                className="text-center text-2xl font-mono tracking-[0.3em] h-14 bg-card border-border"
                maxLength={6}
                onKeyDown={(e) => e.key === 'Enter' && handleCodeSubmit()}
              />
            </div>
            {error && <p className="text-destructive text-sm text-center">{error}</p>}
            <Button
              onClick={handleCodeSubmit}
              className="w-full h-12 text-lg"
              disabled={roomCode.length !== 6}
            >
              Next <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="name"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="text-center mb-2">
              <span className="text-sm text-muted-foreground">Room</span>
              <span className="ml-2 font-mono text-lg font-bold text-primary tracking-wider">
                {roomCode}
              </span>
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Your Display Name</label>
              <Input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value.slice(0, 20))}
                placeholder="Enter your name"
                className="text-center text-xl h-14 bg-card border-border"
                maxLength={20}
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && handleJoin()}
              />
            </div>
            {error && <p className="text-destructive text-sm text-center">{error}</p>}
            <Button
              onClick={handleJoin}
              className="w-full h-12 text-lg"
              disabled={!displayName.trim() || isJoining}
            >
              {isJoining ? 'Joining...' : 'Join Game'}
            </Button>
            {!paramCode && (
              <button
                onClick={() => {
                  setStep('code');
                  setError('');
                }}
                className="text-sm text-muted-foreground hover:text-foreground w-full text-center"
              >
                &larr; Change room code
              </button>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default PlayerJoin;
