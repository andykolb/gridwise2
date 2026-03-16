import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { Users, Play, Copy, Check, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

type Player = Tables<'players'>;

const HostLobby = () => {
  const { roomCode } = useParams<{ roomCode: string }>();
  const navigate = useNavigate();
  const [players, setPlayers] = useState<Player[]>([]);
  const [session, setSession] = useState<Tables<'sessions'> | null>(null);
  const [copied, setCopied] = useState(false);

  const joinUrl = `${window.location.origin}/auction/join/${roomCode}`;

  useEffect(() => {
    if (!roomCode) return;

    const fetchSession = async () => {
      const { data } = await supabase
        .from('sessions')
        .select('*')
        .eq('room_code', roomCode)
        .single();
      if (data) setSession(data);
    };

    const fetchPlayers = async () => {
      const { data: sess } = await supabase
        .from('sessions')
        .select('id')
        .eq('room_code', roomCode)
        .single();
      if (!sess) return;
      const { data } = await supabase
        .from('players')
        .select('*')
        .eq('session_id', sess.id);
      if (data) setPlayers(data);
    };

    fetchSession();
    fetchPlayers();

    const channel = supabase
      .channel(`lobby:${roomCode}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'players' },
        (payload) => {
          const newPlayer = payload.new as Player;
          setPlayers((prev) => {
            if (prev.find((p) => p.id === newPlayer.id)) return prev;
            return [...prev, newPlayer];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomCode]);

  const handleCopy = () => {
    navigator.clipboard.writeText(roomCode ?? '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleStartGame = async () => {
    if (!session) return;
    await supabase
      .from('sessions')
      .update({ status: 'briefing', current_round: 1 })
      .eq('id', session.id);
    navigate(`/auction/host/${roomCode}/game`);
  };

  const canStart = players.length >= 2;

  return (
    <div className="min-h-screen flex flex-col p-8 bg-background">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Zap className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">Energy Auction</h1>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Users className="w-5 h-5" />
          <span className="text-lg font-mono">{players.length} players</span>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="flex flex-col items-center justify-center">
          <motion.div
            className="bg-card rounded-2xl border border-border p-8 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h2 className="text-xl font-semibold mb-4 text-muted-foreground">Scan to Join</h2>
            <div className="bg-white rounded-xl p-4 mb-6 inline-block">
              <QRCodeSVG value={joinUrl} size={200} level="M" />
            </div>
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-2">or enter code</p>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-2 bg-secondary rounded-lg px-6 py-3 font-mono text-3xl font-bold tracking-[0.3em] hover:bg-secondary/80 transition-colors text-foreground"
              >
                {roomCode}
                {copied ? (
                  <Check className="w-5 h-5 text-green-500" />
                ) : (
                  <Copy className="w-5 h-5 text-muted-foreground" />
                )}
              </button>
            </div>
            <p className="text-sm text-muted-foreground">
              Go to <span className="text-primary font-mono">{window.location.origin}/auction/join</span>
            </p>
          </motion.div>
        </div>

        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold mb-6 text-center text-foreground">Players</h2>
          <div className="flex-1 grid grid-cols-2 gap-3 content-start">
            <AnimatePresence>
              {players.map((player, i) => (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, scale: 0.5, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card rounded-xl border border-border p-4 flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    {player.display_name.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium truncate text-foreground">{player.display_name}</span>
                </motion.div>
              ))}
            </AnimatePresence>
            {players.length === 0 && (
              <div className="col-span-2 text-center text-muted-foreground py-12">
                <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>Waiting for players to join...</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-6">
          <div className="bg-card rounded-2xl border border-border p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-4 text-foreground">How It Works</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold">1</span>
                <span>Bid on energy assets each round</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold">2</span>
                <span>Weather changes every season</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold">3</span>
                <span>Balance cost vs reliability</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold">4</span>
                <span>Highest combined score wins!</span>
              </div>
            </div>
          </div>

          <Button
            size="lg"
            onClick={handleStartGame}
            disabled={!canStart}
            className="text-lg px-10 py-6 w-full max-w-sm disabled:opacity-50"
          >
            <Play className="w-5 h-5 mr-2" />
            {canStart ? 'Start Game' : `Need ${2 - players.length} more players`}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HostLobby;
