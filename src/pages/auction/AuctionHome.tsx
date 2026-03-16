import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Users, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { generateRoomCode, getOrCreateHostId, ASSETS } from '@/lib/gameUtils';

const AuctionHome = () => {
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateGame = async () => {
    setIsCreating(true);
    try {
      const roomCode = generateRoomCode();
      const hostId = getOrCreateHostId();

      const { data, error } = await supabase
        .from('sessions')
        .insert({ room_code: roomCode, host_id: hostId })
        .select()
        .single();

      if (error) throw error;
      navigate(`/auction/host/${data.room_code}`);
    } catch (err) {
      console.error('Failed to create game:', err);
    } finally {
      setIsCreating(false);
    }
  };

  const assetEntries = Object.entries(ASSETS);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-background">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {assetEntries.map(([key, asset], i) => (
        <motion.div
          key={key}
          className="absolute text-4xl opacity-20 select-none pointer-events-none"
          style={{
            top: `${15 + i * 16}%`,
            left: i % 2 === 0 ? '8%' : '85%',
          }}
          animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
        >
          {asset.icon}
        </motion.div>
      ))}

      <motion.div
        className="text-center z-10 max-w-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="mb-8"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center animate-pulse-glow">
              <Zap className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-3">
            <span className="text-primary">Energy</span>{' '}
            <span className="text-foreground">Auction</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto">
            Compete to build the cheapest and most reliable energy portfolio across 4 seasonal rounds
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Button
            size="lg"
            onClick={handleCreateGame}
            disabled={isCreating}
            className="text-lg px-8 py-6 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Play className="w-5 h-5 mr-2" />
            {isCreating ? 'Creating...' : 'Create Game'}
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate('/auction/join')}
            className="text-lg px-8 py-6 border-border hover:bg-secondary"
          >
            <Users className="w-5 h-5 mr-2" />
            Join Game
          </Button>
        </motion.div>

        <motion.div
          className="grid grid-cols-5 gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {assetEntries.map(([key, asset]) => (
            <div key={key} className="rounded-lg bg-card/50 border border-border p-3 text-center">
              <div className="text-2xl mb-1">{asset.icon}</div>
              <div className="text-xs font-medium text-muted-foreground">{asset.name}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuctionHome;
