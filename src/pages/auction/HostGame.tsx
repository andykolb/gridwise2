import { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Timer, Users, Trophy, ArrowRight, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';
import {
  generateWeather,
  resolveAllBids,
  calculateOutput,
  calculateRoundScore,
  type WeatherCondition,
  type ResolvedBid,
  type GamePhase,
  type PlayerAssetInfo,
} from '@/lib/gameEngine';
import {
  ASSETS,
  SEASONS,
  SEASON_ICONS,
  BIDDING_DURATION_SECONDS,
  TOTAL_ROUNDS,
  type AssetType,
} from '@/lib/gameUtils';

type Player = Tables<'players'>;
type Session = Tables<'sessions'>;

const HostGame = () => {
  const { roomCode } = useParams<{ roomCode: string }>();
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [phase, setPhase] = useState<GamePhase>('briefing');
  const [currentRound, setCurrentRound] = useState(1);
  const [weather, setWeather] = useState<WeatherCondition | null>(null);
  const [bidsReceived, setBidsReceived] = useState<number>(0);
  const [resolvedBids, setResolvedBids] = useState<ResolvedBid[]>([]);
  const [timer, setTimer] = useState(BIDDING_DURATION_SECONDS);
  const [roundScores, setRoundScores] = useState<
    Record<string, { costScore: number; reliabilityScore: number; coverage: number }>
  >({});
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Fetch session and players on mount
  useEffect(() => {
    if (!roomCode) return;

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

      const w = generateWeather(sess.weather_seed, sess.current_round || 1);
      setWeather(w);

      const { data: p } = await supabase
        .from('players')
        .select('*')
        .eq('session_id', sess.id);
      if (p) setPlayers(p);
    };

    init();
  }, [roomCode]);

  // Subscribe to bids during bidding phase
  useEffect(() => {
    if (!session || phase !== 'bidding') return;

    setBidsReceived(0);
    const channel = supabase
      .channel(`bids:${session.id}:${currentRound}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'bids' },
        () => {
          setBidsReceived((prev) => prev + 1);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [session, phase, currentRound]);

  // Bidding timer
  useEffect(() => {
    if (phase !== 'bidding') {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    setTimer(BIDDING_DURATION_SECONDS);
    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          handleAdvanceToResolving();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase]);

  const updateSessionPhase = useCallback(
    async (newPhase: GamePhase, round?: number) => {
      if (!session) return;
      const update: Record<string, unknown> = { status: newPhase };
      if (round !== undefined) update.current_round = round;
      await supabase.from('sessions').update(update).eq('id', session.id);
      setPhase(newPhase);
      if (round !== undefined) setCurrentRound(round);
    },
    [session]
  );

  const handleStartBidding = useCallback(async () => {
    await updateSessionPhase('bidding');
  }, [updateSessionPhase]);

  const handleAdvanceToResolving = useCallback(async () => {
    if (!session) return;
    await updateSessionPhase('resolving');

    // Fetch all bids for this round
    const { data: bids } = await supabase
      .from('bids')
      .select('*')
      .eq('session_id', session.id)
      .eq('round', currentRound);

    if (!bids) return;

    const resolved = resolveAllBids(bids);
    setResolvedBids(resolved);

    // Update bid won status in DB
    for (const bid of resolved) {
      await supabase.from('bids').update({ won: bid.won }).eq('id', bid.id);
    }

    // Record won assets and deduct budgets
    const winningBids = resolved.filter((b) => b.won);
    for (const bid of winningBids) {
      await supabase.from('player_assets').insert({
        session_id: session.id,
        player_id: bid.player_id,
        asset_type: bid.asset_type,
        acquired_round: currentRound,
        price_paid: bid.amount,
      });

      // Deduct budget
      const player = players.find((p) => p.id === bid.player_id);
      if (player) {
        const newBudget = player.budget - bid.amount;
        await supabase
          .from('players')
          .update({ budget: newBudget })
          .eq('id', player.id);
      }
    }

    // Refresh players
    const { data: updatedPlayers } = await supabase
      .from('players')
      .select('*')
      .eq('session_id', session.id);
    if (updatedPlayers) setPlayers(updatedPlayers);
  }, [session, currentRound, players, updateSessionPhase]);

  const handleAdvanceToScoring = useCallback(async () => {
    if (!session || !weather) return;
    await updateSessionPhase('scoring');

    const scores: typeof roundScores = {};

    for (const player of players) {
      // Get all assets for this player
      const { data: assets } = await supabase
        .from('player_assets')
        .select('*')
        .eq('player_id', player.id)
        .eq('session_id', session.id);

      // Aggregate assets by type
      const assetMap: Record<string, number> = {};
      for (const a of assets || []) {
        assetMap[a.asset_type] = (assetMap[a.asset_type] || 0) + a.quantity;
      }
      const playerAssets: PlayerAssetInfo[] = Object.entries(assetMap).map(([type, qty]) => ({
        asset_type: type as AssetType,
        quantity: qty,
      }));

      // Get previous battery charge
      let prevCharge = 0;
      if (currentRound > 1) {
        const { data: prevResult } = await supabase
          .from('round_results')
          .select('battery_charge')
          .eq('player_id', player.id)
          .eq('session_id', session.id)
          .eq('round', currentRound - 1)
          .single();
        if (prevResult) prevCharge = prevResult.battery_charge;
      }

      const output = calculateOutput(playerAssets, weather, prevCharge);

      // Calculate how much this player spent this round
      const roundBids = resolvedBids.filter(
        (b) => b.player_id === player.id && b.won
      );
      const roundSpend = roundBids.reduce((sum, b) => sum + b.amount, 0);
      const score = calculateRoundScore(roundSpend, player.budget, output.coverage);

      scores[player.id] = {
        costScore: score.costScore,
        reliabilityScore: score.reliabilityScore,
        coverage: output.coverage,
      };

      // Save round result
      await supabase.from('round_results').insert({
        session_id: session.id,
        player_id: player.id,
        round: currentRound,
        solar_output: output.solarOutput,
        wind_output: output.windOutput,
        demand: weather.demand,
        coverage: output.coverage,
        cost_score: score.costScore,
        reliability_score: score.reliabilityScore,
        battery_charge: output.batteryCharge,
      });

      // Update player cumulative scores
      await supabase
        .from('players')
        .update({
          cost_score: player.cost_score + score.costScore,
          reliability_score: player.reliability_score + score.reliabilityScore,
          total_score:
            player.total_score + score.costScore + score.reliabilityScore,
        })
        .eq('id', player.id);
    }

    setRoundScores(scores);

    // Refresh players with updated scores
    const { data: updatedPlayers } = await supabase
      .from('players')
      .select('*')
      .eq('session_id', session.id);
    if (updatedPlayers) setPlayers(updatedPlayers);
  }, [session, weather, players, currentRound, resolvedBids, updateSessionPhase]);

  const handleNextRound = useCallback(async () => {
    if (!session) return;
    if (currentRound >= TOTAL_ROUNDS) {
      await updateSessionPhase('finished');
      return;
    }
    const nextRound = currentRound + 1;
    await updateSessionPhase('briefing', nextRound);
    const w = generateWeather(session.weather_seed, nextRound);
    setWeather(w);
    setResolvedBids([]);
    setRoundScores({});
    setBidsReceived(0);
  }, [session, currentRound, updateSessionPhase]);

  const handleNewGame = () => navigate('/auction');

  const sortedPlayers = [...players].sort((a, b) => b.total_score - a.total_score);

  if (!session || !weather) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <Zap className="w-6 h-6 text-primary" />
          <span className="text-xl font-bold">Energy Auction</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{SEASON_ICONS[weather.season]}</span>
            <span className="font-semibold text-lg">{weather.season}</span>
          </div>
          <div className="bg-primary/10 rounded-lg px-4 py-2">
            <span className="text-sm text-muted-foreground">Round</span>
            <span className="ml-2 font-bold text-primary text-lg">
              {currentRound}/{TOTAL_ROUNDS}
            </span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>{players.length}</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8">
        <AnimatePresence mode="wait">
          {/* BRIEFING PHASE */}
          {phase === 'briefing' && (
            <motion.div
              key="briefing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-3xl font-bold text-center mb-8">
                {SEASON_ICONS[weather.season]} {weather.season} Forecast
              </h2>

              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="bg-card rounded-xl border border-border p-6 text-center">
                  <div className="text-3xl mb-2">&#9728;&#65039;</div>
                  <div className="text-sm text-muted-foreground mb-1">Sun Level</div>
                  <div className="text-2xl font-bold text-yellow-500">
                    {Math.round(weather.sunLevel * 100)}%
                  </div>
                  <Progress value={weather.sunLevel * 100} className="mt-2" />
                </div>
                <div className="bg-card rounded-xl border border-border p-6 text-center">
                  <div className="text-3xl mb-2">&#128168;</div>
                  <div className="text-sm text-muted-foreground mb-1">Wind Level</div>
                  <div className="text-2xl font-bold text-blue-500">
                    {Math.round(weather.windLevel * 100)}%
                  </div>
                  <Progress value={weather.windLevel * 100} className="mt-2" />
                </div>
                <div className="bg-card rounded-xl border border-border p-6 text-center">
                  <div className="text-3xl mb-2">&#9889;</div>
                  <div className="text-sm text-muted-foreground mb-1">Energy Demand</div>
                  <div className="text-2xl font-bold text-primary">{weather.demand} MW</div>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-4 mb-8">
                {(Object.entries(ASSETS) as [AssetType, (typeof ASSETS)[AssetType]][]).map(
                  ([key, asset]) => (
                    <div
                      key={key}
                      className="bg-card rounded-xl border border-border p-4 text-center"
                    >
                      <div className="text-2xl mb-1">{asset.icon}</div>
                      <div className="font-semibold text-sm">{asset.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Base: {asset.basePrice} EC
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Supply: {asset.supply} units
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Capacity: {asset.capacity} MW
                      </div>
                    </div>
                  )
                )}
              </div>

              <div className="text-center">
                <Button size="lg" onClick={handleStartBidding} className="text-lg px-10 py-6">
                  Start Bidding <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* BIDDING PHASE */}
          {phase === 'bidding' && (
            <motion.div
              key="bidding"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-3xl font-bold mb-4">Bidding in Progress</h2>

              <div className="flex items-center justify-center gap-3 mb-8">
                <Timer className="w-8 h-8 text-primary" />
                <span
                  className={`text-6xl font-mono font-bold ${timer <= 5 ? 'text-destructive' : 'text-primary'}`}
                >
                  {timer}
                </span>
              </div>

              <div className="bg-card rounded-xl border border-border p-8 mb-8">
                <div className="text-lg text-muted-foreground mb-2">Bids Received</div>
                <div className="text-4xl font-bold text-primary">{bidsReceived}</div>
                <div className="text-sm text-muted-foreground mt-2">
                  from {players.length} players
                </div>
              </div>

              <p className="text-muted-foreground">
                Players are submitting their bids on their devices...
              </p>

              <Button
                variant="outline"
                size="lg"
                onClick={handleAdvanceToResolving}
                className="mt-6"
              >
                End Bidding Early
              </Button>
            </motion.div>
          )}

          {/* RESOLVING PHASE */}
          {phase === 'resolving' && (
            <motion.div
              key="resolving"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-5xl mx-auto"
            >
              <h2 className="text-3xl font-bold text-center mb-8">Auction Results</h2>

              <div className="grid grid-cols-5 gap-4 mb-8">
                {(Object.keys(ASSETS) as AssetType[]).map((assetType) => {
                  const asset = ASSETS[assetType];
                  const assetBids = resolvedBids.filter((b) => b.asset_type === assetType);
                  return (
                    <div key={assetType} className="bg-card rounded-xl border border-border p-4">
                      <div className="text-center mb-3">
                        <div className="text-2xl">{asset.icon}</div>
                        <div className="font-semibold text-sm">{asset.name}</div>
                      </div>
                      <div className="space-y-2">
                        {assetBids.length === 0 ? (
                          <p className="text-xs text-muted-foreground text-center">No bids</p>
                        ) : (
                          assetBids.map((bid) => {
                            const player = players.find((p) => p.id === bid.player_id);
                            return (
                              <motion.div
                                key={bid.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className={`rounded-lg p-2 text-xs ${
                                  bid.won
                                    ? 'bg-green-500/20 border border-green-500/50'
                                    : 'bg-muted/50 opacity-50'
                                }`}
                              >
                                <div className="font-medium truncate">
                                  {player?.display_name ?? '?'}
                                </div>
                                <div className="font-mono">
                                  {bid.amount} EC {bid.won ? '  Won' : ''}
                                </div>
                              </motion.div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="text-center">
                <Button size="lg" onClick={handleAdvanceToScoring} className="text-lg px-10 py-6">
                  Calculate Scores <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* SCORING PHASE */}
          {phase === 'scoring' && (
            <motion.div
              key="scoring"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-3xl font-bold text-center mb-8">
                Round {currentRound} Scores
              </h2>

              <div className="space-y-4 mb-8">
                {sortedPlayers.map((player, index) => {
                  const rs = roundScores[player.id];
                  return (
                    <motion.div
                      key={player.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-card rounded-xl border border-border p-4 flex items-center gap-4"
                    >
                      <div className="text-2xl font-bold text-muted-foreground w-8 text-center">
                        {index + 1}
                      </div>
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                        {player.display_name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">{player.display_name}</div>
                        <div className="text-xs text-muted-foreground">
                          Budget: {player.budget} EC
                        </div>
                      </div>
                      {rs && (
                        <div className="flex gap-4 text-sm">
                          <div className="text-center">
                            <div className="text-muted-foreground text-xs">Coverage</div>
                            <div className="font-bold">
                              {Math.round(rs.coverage * 100)}%
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-muted-foreground text-xs">Cost</div>
                            <div className="font-bold text-green-500">+{rs.costScore}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-muted-foreground text-xs">Reliability</div>
                            <div className="font-bold text-blue-500">
                              +{rs.reliabilityScore}
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground">Total</div>
                        <div className="text-xl font-bold text-primary">
                          {player.total_score}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="text-center">
                <Button size="lg" onClick={handleNextRound} className="text-lg px-10 py-6">
                  {currentRound >= TOTAL_ROUNDS ? (
                    <>
                      <Trophy className="w-5 h-5 mr-2" /> Final Results
                    </>
                  ) : (
                    <>
                      Next Round <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          )}

          {/* FINISHED PHASE */}
          {phase === 'finished' && (
            <motion.div
              key="finished"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto text-center"
            >
              <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-4xl font-bold mb-2">Game Over!</h2>
              <p className="text-xl text-muted-foreground mb-8">Final Standings</p>

              <div className="space-y-4 mb-8">
                {sortedPlayers.map((player, index) => (
                  <motion.div
                    key={player.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.15 }}
                    className={`rounded-xl border p-6 flex items-center gap-4 ${
                      index === 0
                        ? 'bg-yellow-500/10 border-yellow-500/50'
                        : index === 1
                          ? 'bg-gray-300/10 border-gray-400/50'
                          : index === 2
                            ? 'bg-orange-500/10 border-orange-500/50'
                            : 'bg-card border-border'
                    }`}
                  >
                    <div className="text-3xl font-bold w-12 text-center">
                      {index === 0 ? '\uD83E\uDD47' : index === 1 ? '\uD83E\uDD48' : index === 2 ? '\uD83E\uDD49' : `${index + 1}`}
                    </div>
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl">
                      {player.display_name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="text-xl font-bold">{player.display_name}</div>
                      <div className="text-sm text-muted-foreground">
                        Budget remaining: {player.budget} EC
                      </div>
                    </div>
                    <div className="flex gap-6 text-sm">
                      <div className="text-center">
                        <div className="text-muted-foreground text-xs">Cost Score</div>
                        <div className="font-bold text-green-500">{player.cost_score}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-muted-foreground text-xs">Reliability</div>
                        <div className="font-bold text-blue-500">
                          {player.reliability_score}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">Total</div>
                      <div className="text-3xl font-bold text-primary">
                        {player.total_score}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Button size="lg" onClick={handleNewGame} className="text-lg px-10 py-6">
                <RotateCcw className="w-5 h-5 mr-2" /> New Game
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HostGame;
