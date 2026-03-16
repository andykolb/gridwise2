-- Energy Auction game tables

-- Create enum for session status
CREATE TYPE public.session_status AS ENUM ('lobby', 'briefing', 'bidding', 'resolving', 'scoring', 'finished');

-- Create enum for energy asset types
CREATE TYPE public.asset_type AS ENUM ('solar', 'wind', 'gas', 'nuclear', 'battery');

-- Sessions table
CREATE TABLE public.sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  room_code TEXT NOT NULL UNIQUE,
  status session_status NOT NULL DEFAULT 'lobby',
  current_round INTEGER NOT NULL DEFAULT 0,
  weather_seed INTEGER NOT NULL DEFAULT floor(random() * 1000000)::int,
  host_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Players table
CREATE TABLE public.players (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES public.sessions(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  budget INTEGER NOT NULL DEFAULT 800,
  total_score INTEGER NOT NULL DEFAULT 0,
  cost_score INTEGER NOT NULL DEFAULT 0,
  reliability_score INTEGER NOT NULL DEFAULT 0,
  is_connected BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Bids table
CREATE TABLE public.bids (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES public.sessions(id) ON DELETE CASCADE,
  player_id UUID NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
  round INTEGER NOT NULL,
  asset_type asset_type NOT NULL,
  amount INTEGER NOT NULL,
  won BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Player assets table
CREATE TABLE public.player_assets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES public.sessions(id) ON DELETE CASCADE,
  player_id UUID NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
  asset_type asset_type NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  acquired_round INTEGER NOT NULL,
  price_paid INTEGER NOT NULL
);

-- Round results table
CREATE TABLE public.round_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES public.sessions(id) ON DELETE CASCADE,
  player_id UUID NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
  round INTEGER NOT NULL,
  solar_output NUMERIC NOT NULL DEFAULT 0,
  wind_output NUMERIC NOT NULL DEFAULT 0,
  demand NUMERIC NOT NULL DEFAULT 100,
  coverage NUMERIC NOT NULL DEFAULT 0,
  cost_score INTEGER NOT NULL DEFAULT 0,
  reliability_score INTEGER NOT NULL DEFAULT 0,
  battery_charge NUMERIC NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bids ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.round_results ENABLE ROW LEVEL SECURITY;

-- Open anon access (no auth required for the auction game)
CREATE POLICY "Anyone can read sessions" ON public.sessions FOR SELECT TO anon USING (true);
CREATE POLICY "Anyone can create sessions" ON public.sessions FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Anyone can update sessions" ON public.sessions FOR UPDATE TO anon USING (true);

CREATE POLICY "Anyone can read players" ON public.players FOR SELECT TO anon USING (true);
CREATE POLICY "Anyone can create players" ON public.players FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Anyone can update players" ON public.players FOR UPDATE TO anon USING (true);

CREATE POLICY "Anyone can read bids" ON public.bids FOR SELECT TO anon USING (true);
CREATE POLICY "Anyone can create bids" ON public.bids FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Anyone can update bids" ON public.bids FOR UPDATE TO anon USING (true);

CREATE POLICY "Anyone can read player_assets" ON public.player_assets FOR SELECT TO anon USING (true);
CREATE POLICY "Anyone can create player_assets" ON public.player_assets FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Anyone can read round_results" ON public.round_results FOR SELECT TO anon USING (true);
CREATE POLICY "Anyone can create round_results" ON public.round_results FOR INSERT TO anon WITH CHECK (true);

-- Indexes
CREATE INDEX idx_sessions_room_code ON public.sessions(room_code);
CREATE INDEX idx_players_session ON public.players(session_id);
CREATE INDEX idx_bids_session_round ON public.bids(session_id, round);
CREATE INDEX idx_player_assets_player ON public.player_assets(player_id);
CREATE INDEX idx_round_results_session_round ON public.round_results(session_id, round);

-- Enable realtime on all tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.sessions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.players;
ALTER PUBLICATION supabase_realtime ADD TABLE public.bids;
ALTER PUBLICATION supabase_realtime ADD TABLE public.player_assets;
ALTER PUBLICATION supabase_realtime ADD TABLE public.round_results;

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_sessions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_sessions_updated_at
  BEFORE UPDATE ON public.sessions
  FOR EACH ROW EXECUTE FUNCTION public.update_sessions_updated_at();
