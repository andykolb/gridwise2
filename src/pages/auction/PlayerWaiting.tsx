import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { ASSETS, SEASONS, SEASON_ICONS } from '@/lib/gameUtils';

const PlayerWaiting = () => {
  const { roomCode } = useParams<{ roomCode: string }>();
  const navigate = useNavigate();
  const [playerName] = useState(
    () => localStorage.getItem(`player-name-${roomCode}`) ?? 'Player'
  );

  useEffect(() => {
    if (!roomCode) return;

    const channel = supabase
      .channel(`game-start:${roomCode}`)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'sessions' },
        (payload) => {
          const updated = payload.new as { status: string; room_code: string };
          if (updated.status !== 'lobby') {
            navigate(`/auction/play/${roomCode}/game`);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomCode, navigate]);

  const assetEntries = Object.entries(ASSETS);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
      <motion.div
        className="text-center max-w-sm w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="inline-flex items-center gap-2 mb-2">
          <Zap className="w-5 h-5 text-primary" />
          <span className="text-lg font-bold text-foreground">Energy Auction</span>
        </div>

        <h1 className="text-2xl font-bold mb-2 text-foreground">Welcome, {playerName}!</h1>
        <div className="flex items-center justify-center gap-2 text-muted-foreground mb-8">
          <Clock className="w-4 h-4 animate-spin" style={{ animationDuration: '3s' }} />
          <span>Waiting for host to start...</span>
        </div>

        <div className="bg-card rounded-xl border border-border p-5 text-left mb-6">
          <h3 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wider">
            Quick Rules
          </h3>
          <div className="space-y-2 text-sm text-foreground">
            <p>
              You start with <span className="text-primary font-bold">800 EC</span> budget
            </p>
            <p>Bid on energy assets each round</p>
            <p>Weather affects solar & wind output</p>
            <p>Score = Cost Efficiency + Reliability</p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 mb-6">
          {SEASONS.map((season) => (
            <div key={season} className="bg-card rounded-lg border border-border p-2 text-center">
              <div className="text-xl">{SEASON_ICONS[season]}</div>
              <div className="text-xs text-muted-foreground">{season}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-5 gap-2">
          {assetEntries.map(([key, asset]) => (
            <div
              key={key}
              className="bg-card/50 rounded-lg border border-border p-2 text-center"
            >
              <div className="text-lg">{asset.icon}</div>
              <div className="text-[10px] text-muted-foreground leading-tight">{asset.name}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default PlayerWaiting;
