import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Send, Check, Trophy, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';
import { generateWeather, type WeatherCondition, type GamePhase } from '@/lib/gameEngine';
import {
  ASSETS,
  SEASON_ICONS,
  TOTAL_ROUNDS,
  type AssetType,
} from '@/lib/gameUtils';

type Session = Tables<'sessions'>;
type Player = Tables<'players'>;

const PlayerGame = () => {
  const { roomCode } = useParams<{ roomCode: string }>();
  const navigate = useNavigate();
  const [playerId] = useState(() => localStorage.getItem(`player-${roomCode}`) ?? '');
  const [session, setSession] = useState<Session | null>(null);
  const [player, setPlayer] = useState<Player | null>(null);
  const [phase, setPhase] = useState<GamePhase>('briefing');
  const [currentRound, setCurrentRound] = useState(1);
  const [weather, setWeather] = useState<WeatherCondition | null>(null);
  const [bids, setBids] = useState<Record<AssetType, number>>({
    solar: 0,
    wind: 0,
    gas: 0,
    nuclear: 0,
    battery: 0,
  });
  const [submitted, setSubmitted] = useState(false);
  const [wonBids, setWonBids] = useState<{ asset_type: string; amount: number; won: boolean }[]>(
    []
  );
  const [roundResult, setRoundResult] = useState<Tables<'round_results'> | null>(null);
  const [allPlayers, setAllPlayers] = useState<Player[]>([]);

  // Init: fetch session and player data
  useEffect(() => {
    if (!roomCode || !playerId) return;

    const init = async () => {
      const { data: sess } = await supabase
        .from('sessions')
        .select('*')
        .eq('room_code', roomCode)
        .single();
      if (!sess) return;
      setSession(sess);
      setCurrentRound(sess.current_round || 1);
      setPhase(sess.status as GamePhase);
      setWeather(generateWeather(sess.weather_seed, sess.current_round || 1));

      const { data: p } = await supabase
        .from('players')
        .select('*')
        .eq('id', playerId)
        .single();
      if (p) setPlayer(p);
    };

    init();
  }, [roomCode, playerId]);

  // Subscribe to session changes (phase transitions)
  useEffect(() => {
    if (!session) return;

    const channel = supabase
      .channel(`player-session:${session.id}`)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'sessions', filter: `id=eq.${session.id}` },
        (payload) => {
          const updated = payload.new as Session;
          const newPhase = updated.status as GamePhase;
          const newRound = updated.current_round;

          setPhase(newPhase);
          setSession(updated);

          if (newRound !== currentRound) {
            setCurrentRound(newRound);
            setWeather(generateWeather(updated.weather_seed, newRound));
            setSubmitted(false);
            setBids({ solar: 0, wind: 0, gas: 0, nuclear: 0, battery: 0 });
            setWonBids([]);
            setRoundResult(null);
          }

          // On resolving phase, fetch bid results
          if (newPhase === 'resolving') {
            fetchBidResults(updated.id, newRound);
          }
          // On scoring phase, fetch round results
          if (newPhase === 'scoring') {
            fetchRoundResult(updated.id, newRound);
            fetchAllPlayers(updated.id);
          }
          if (newPhase === 'finished') {
            fetchAllPlayers(updated.id);
          }
          // Refresh player data on phase change
          refreshPlayer();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [session, currentRound, playerId]);

  const refreshPlayer = useCallback(async () => {
    if (!playerId) return;
    const { data } = await supabase.from('players').select('*').eq('id', playerId).single();
    if (data) setPlayer(data);
  }, [playerId]);

  const fetchBidResults = async (sessionId: string, round: number) => {
    const { data } = await supabase
      .from('bids')
      .select('*')
      .eq('session_id', sessionId)
      .eq('player_id', playerId)
      .eq('round', round);
    if (data) setWonBids(data);
  };

  const fetchRoundResult = async (sessionId: string, round: number) => {
    const { data } = await supabase
      .from('round_results')
      .select('*')
      .eq('session_id', sessionId)
      .eq('player_id', playerId)
      .eq('round', round)
      .single();
    if (data) setRoundResult(data);
  };

  const fetchAllPlayers = async (sessionId: string) => {
    const { data } = await supabase
      .from('players')
      .select('*')
      .eq('session_id', sessionId)
      .order('total_score', { ascending: false });
    if (data) setAllPlayers(data);
  };

  const totalBidAmount = Object.values(bids).reduce((sum, v) => sum + v, 0);
  const remainingBudget = (player?.budget ?? 0) - totalBidAmount;

  const handleBidChange = (assetType: AssetType, value: string) => {
    const num = Math.max(0, parseInt(value) || 0);
    setBids((prev) => ({ ...prev, [assetType]: num }));
  };

  const handleSubmitBids = async () => {
    if (!session || !playerId || submitted) return;

    const bidEntries = Object.entries(bids)
      .filter(([, amount]) => amount > 0)
      .map(([assetType, amount]) => ({
        session_id: session.id,
        player_id: playerId,
        round: currentRound,
        asset_type: assetType as AssetType,
        amount,
      }));

    if (bidEntries.length === 0) return;

    const { error } = await supabase.from('bids').insert(bidEntries);
    if (!error) setSubmitted(true);
  };

  if (!session || !player || !weather) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const sortedPlayers = [...allPlayers].sort((a, b) => b.total_score - a.total_score);
  const myRank = sortedPlayers.findIndex((p) => p.id === playerId) + 1;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          <span className="font-bold">Energy Auction</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span>
            {SEASON_ICONS[weather.season]} R{currentRound}/{TOTAL_ROUNDS}
          </span>
          <div className="bg-primary/10 rounded-lg px-3 py-1">
            <span className="font-bold text-primary">{player.budget} EC</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 max-w-lg mx-auto w-full">
        <AnimatePresence mode="wait">
          {/* BRIEFING */}
          {phase === 'briefing' && (
            <motion.div
              key="briefing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h2 className="text-xl font-bold text-center mb-4">
                {SEASON_ICONS[weather.season]} {weather.season} Forecast
              </h2>

              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-card rounded-lg border border-border p-3 text-center">
                  <div className="text-xs text-muted-foreground">Sun</div>
                  <div className="font-bold text-yellow-500">
                    {Math.round(weather.sunLevel * 100)}%
                  </div>
                </div>
                <div className="bg-card rounded-lg border border-border p-3 text-center">
                  <div className="text-xs text-muted-foreground">Wind</div>
                  <div className="font-bold text-blue-500">
                    {Math.round(weather.windLevel * 100)}%
                  </div>
                </div>
                <div className="bg-card rounded-lg border border-border p-3 text-center">
                  <div className="text-xs text-muted-foreground">Demand</div>
                  <div className="font-bold text-primary">{weather.demand} MW</div>
                </div>
              </div>

              <div className="bg-card rounded-lg border border-border p-4 text-center">
                <Clock className="w-6 h-6 mx-auto mb-2 text-muted-foreground animate-spin" style={{ animationDuration: '3s' }} />
                <p className="text-muted-foreground">Waiting for host to open bidding...</p>
              </div>
            </motion.div>
          )}

          {/* BIDDING */}
          {phase === 'bidding' && (
            <motion.div
              key="bidding"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h2 className="text-xl font-bold text-center mb-1">Place Your Bids</h2>
              <p className="text-center text-sm text-muted-foreground mb-4">
                Budget: <span className={remainingBudget < 0 ? 'text-destructive font-bold' : 'text-primary font-bold'}>{remainingBudget} EC remaining</span>
              </p>

              {submitted ? (
                <div className="bg-green-500/10 border border-green-500/50 rounded-xl p-8 text-center">
                  <Check className="w-12 h-12 text-green-500 mx-auto mb-3" />
                  <h3 className="text-xl font-bold text-green-500">Bids Submitted!</h3>
                  <p className="text-muted-foreground mt-2">Waiting for auction to close...</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 mb-6">
                    {(Object.entries(ASSETS) as [AssetType, (typeof ASSETS)[AssetType]][]).map(
                      ([key, asset]) => (
                        <div
                          key={key}
                          className="bg-card rounded-lg border border-border p-3 flex items-center gap-3"
                        >
                          <div className="text-2xl">{asset.icon}</div>
                          <div className="flex-1">
                            <div className="font-medium text-sm">{asset.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {asset.capacity} MW &middot; Base {asset.basePrice} EC
                            </div>
                          </div>
                          <Input
                            type="number"
                            min={0}
                            max={player.budget}
                            value={bids[key] || ''}
                            onChange={(e) => handleBidChange(key, e.target.value)}
                            placeholder="0"
                            className="w-24 text-center font-mono bg-background"
                          />
                          <span className="text-xs text-muted-foreground w-6">EC</span>
                        </div>
                      )
                    )}
                  </div>

                  <Button
                    size="lg"
                    onClick={handleSubmitBids}
                    disabled={totalBidAmount === 0 || remainingBudget < 0}
                    className="w-full text-lg py-6"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Submit Bids ({totalBidAmount} EC)
                  </Button>

                  {remainingBudget < 0 && (
                    <p className="text-destructive text-sm text-center mt-2">
                      Total bids exceed your budget!
                    </p>
                  )}
                </>
              )}
            </motion.div>
          )}

          {/* RESOLVING */}
          {phase === 'resolving' && (
            <motion.div
              key="resolving"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h2 className="text-xl font-bold text-center mb-4">Your Bid Results</h2>

              <div className="space-y-3">
                {wonBids.length === 0 ? (
                  <div className="bg-card rounded-lg border border-border p-6 text-center text-muted-foreground">
                    Loading results...
                  </div>
                ) : (
                  wonBids.map((bid, i) => {
                    const asset = ASSETS[bid.asset_type as AssetType];
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`rounded-lg border p-4 flex items-center gap-3 ${
                          bid.won
                            ? 'bg-green-500/10 border-green-500/50'
                            : 'bg-muted/30 border-border opacity-60'
                        }`}
                      >
                        <div className="text-2xl">{asset?.icon}</div>
                        <div className="flex-1">
                          <div className="font-medium">{asset?.name}</div>
                          <div className="text-sm font-mono">{bid.amount} EC</div>
                        </div>
                        <div
                          className={`font-bold text-sm ${bid.won ? 'text-green-500' : 'text-muted-foreground'}`}
                        >
                          {bid.won ? 'WON' : 'LOST'}
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </div>
            </motion.div>
          )}

          {/* SCORING */}
          {phase === 'scoring' && (
            <motion.div
              key="scoring"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h2 className="text-xl font-bold text-center mb-4">Round {currentRound} Results</h2>

              {roundResult ? (
                <div className="space-y-4">
                  <div className="bg-card rounded-xl border border-border p-4">
                    <div className="text-sm text-muted-foreground mb-2">Energy Coverage</div>
                    <div className="flex items-center gap-3">
                      <Progress value={roundResult.coverage * 100} className="flex-1" />
                      <span className="font-bold text-lg">
                        {Math.round(roundResult.coverage * 100)}%
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-3 text-xs text-muted-foreground">
                      <div>Solar: {roundResult.solar_output} MW</div>
                      <div>Wind: {roundResult.wind_output} MW</div>
                      <div>Demand: {roundResult.demand} MW</div>
                      <div>Battery: {roundResult.battery_charge} MW stored</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-card rounded-xl border border-border p-4 text-center">
                      <div className="text-xs text-muted-foreground">Cost Score</div>
                      <div className="text-2xl font-bold text-green-500">
                        +{roundResult.cost_score}
                      </div>
                    </div>
                    <div className="bg-card rounded-xl border border-border p-4 text-center">
                      <div className="text-xs text-muted-foreground">Reliability</div>
                      <div className="text-2xl font-bold text-blue-500">
                        +{roundResult.reliability_score}
                      </div>
                    </div>
                  </div>

                  <div className="bg-primary/10 rounded-xl p-4 text-center">
                    <div className="text-sm text-muted-foreground">Your Total Score</div>
                    <div className="text-3xl font-bold text-primary">{player.total_score}</div>
                    {myRank > 0 && (
                      <div className="text-sm text-muted-foreground mt-1">
                        Rank: #{myRank} of {allPlayers.length}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-card rounded-lg border border-border p-6 text-center text-muted-foreground">
                  Calculating scores...
                </div>
              )}
            </motion.div>
          )}

          {/* FINISHED */}
          {phase === 'finished' && (
            <motion.div
              key="finished"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
              <h2 className="text-2xl font-bold mb-1">Game Over!</h2>
              <p className="text-muted-foreground mb-6">
                You finished #{myRank} of {allPlayers.length}
              </p>

              <div className="bg-primary/10 rounded-xl p-6 mb-6">
                <div className="text-sm text-muted-foreground">Your Final Score</div>
                <div className="text-4xl font-bold text-primary">{player.total_score}</div>
                <div className="flex justify-center gap-6 mt-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Cost: </span>
                    <span className="font-bold text-green-500">{player.cost_score}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Reliability: </span>
                    <span className="font-bold text-blue-500">{player.reliability_score}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                {sortedPlayers.map((p, i) => (
                  <div
                    key={p.id}
                    className={`rounded-lg border p-3 flex items-center gap-3 ${
                      p.id === playerId ? 'bg-primary/10 border-primary/50' : 'bg-card border-border'
                    }`}
                  >
                    <span className="font-bold text-lg w-8 text-center">
                      {i === 0 ? '\uD83E\uDD47' : i === 1 ? '\uD83E\uDD48' : i === 2 ? '\uD83E\uDD49' : `${i + 1}`}
                    </span>
                    <span className="flex-1 font-medium">{p.display_name}</span>
                    <span className="font-bold text-primary">{p.total_score}</span>
                  </div>
                ))}
              </div>

              <Button size="lg" onClick={() => navigate('/auction')} className="w-full">
                Back to Home
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PlayerGame;
