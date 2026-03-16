import { ASSETS, SEASONS, type AssetType, type Season } from './gameUtils';

// Seeded PRNG (linear congruential generator)
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

export interface WeatherCondition {
  season: Season;
  sunLevel: number; // 0-1
  windLevel: number; // 0-1
  demand: number; // MW needed
}

// Base weather levels per season
const SEASON_BASE: Record<Season, { sun: number; wind: number; demand: number }> = {
  Spring: { sun: 0.5, wind: 0.4, demand: 90 },
  Summer: { sun: 0.9, wind: 0.2, demand: 100 },
  Autumn: { sun: 0.3, wind: 0.7, demand: 110 },
  Winter: { sun: 0.2, wind: 0.8, demand: 120 },
};

export function generateWeather(weatherSeed: number, round: number): WeatherCondition {
  const rng = seededRandom(weatherSeed + round * 7919);
  const season = SEASONS[round - 1];
  const base = SEASON_BASE[season];

  // Add +-20% variation
  const sunVariation = (rng() - 0.5) * 0.4;
  const windVariation = (rng() - 0.5) * 0.4;
  const demandVariation = (rng() - 0.5) * 0.2 * base.demand;

  return {
    season,
    sunLevel: Math.max(0, Math.min(1, base.sun + sunVariation)),
    windLevel: Math.max(0, Math.min(1, base.wind + windVariation)),
    demand: Math.round(base.demand + demandVariation),
  };
}

export interface PlayerAssetInfo {
  asset_type: AssetType;
  quantity: number;
}

export interface OutputResult {
  solarOutput: number;
  windOutput: number;
  gasOutput: number;
  nuclearOutput: number;
  batteryDischarge: number;
  totalOutput: number;
  excess: number;
  batteryCharge: number;
  coverage: number;
}

export function calculateOutput(
  assets: PlayerAssetInfo[],
  weather: WeatherCondition,
  previousBatteryCharge: number
): OutputResult {
  let solarQty = 0, windQty = 0, gasQty = 0, nuclearQty = 0, batteryQty = 0;

  for (const a of assets) {
    switch (a.asset_type) {
      case 'solar': solarQty += a.quantity; break;
      case 'wind': windQty += a.quantity; break;
      case 'gas': gasQty += a.quantity; break;
      case 'nuclear': nuclearQty += a.quantity; break;
      case 'battery': batteryQty += a.quantity; break;
    }
  }

  const solarOutput = ASSETS.solar.capacity * weather.sunLevel * solarQty;
  const windOutput = ASSETS.wind.capacity * weather.windLevel * windQty;
  const gasOutput = ASSETS.gas.capacity * gasQty;
  const nuclearOutput = ASSETS.nuclear.capacity * nuclearQty;

  const baseOutput = solarOutput + windOutput + gasOutput + nuclearOutput;
  const maxBatteryCapacity = ASSETS.battery.capacity * batteryQty;

  let batteryDischarge = 0;
  let batteryCharge = previousBatteryCharge;
  let excess = 0;

  if (baseOutput >= weather.demand) {
    // Excess energy — charge batteries
    excess = baseOutput - weather.demand;
    const chargeRoom = maxBatteryCapacity - batteryCharge;
    const chargeAmount = Math.min(excess, chargeRoom);
    batteryCharge += chargeAmount;
  } else {
    // Shortfall — discharge batteries
    const shortfall = weather.demand - baseOutput;
    batteryDischarge = Math.min(shortfall, batteryCharge);
    batteryCharge -= batteryDischarge;
  }

  const totalOutput = baseOutput + batteryDischarge;
  const coverage = Math.min(1, totalOutput / weather.demand);

  return {
    solarOutput: Math.round(solarOutput * 10) / 10,
    windOutput: Math.round(windOutput * 10) / 10,
    gasOutput: Math.round(gasOutput * 10) / 10,
    nuclearOutput: Math.round(nuclearOutput * 10) / 10,
    batteryDischarge: Math.round(batteryDischarge * 10) / 10,
    totalOutput: Math.round(totalOutput * 10) / 10,
    excess: Math.round(excess * 10) / 10,
    batteryCharge: Math.round(batteryCharge * 10) / 10,
    coverage: Math.round(coverage * 1000) / 1000,
  };
}

export interface BidEntry {
  id: string;
  player_id: string;
  asset_type: AssetType;
  amount: number;
  created_at: string;
}

export interface ResolvedBid extends BidEntry {
  won: boolean;
}

export function resolveBidsForAsset(
  bids: BidEntry[],
  assetType: AssetType
): ResolvedBid[] {
  const assetBids = bids.filter((b) => b.asset_type === assetType);
  const supply = ASSETS[assetType].supply;

  // Sort by amount DESC, then by created_at ASC (earliest wins ties)
  const sorted = [...assetBids].sort((a, b) => {
    if (b.amount !== a.amount) return b.amount - a.amount;
    return a.created_at.localeCompare(b.created_at);
  });

  return sorted.map((bid, index) => ({
    ...bid,
    won: index < supply && bid.amount > 0,
  }));
}

export function resolveAllBids(bids: BidEntry[]): ResolvedBid[] {
  const assetTypes: AssetType[] = ['solar', 'wind', 'gas', 'nuclear', 'battery'];
  return assetTypes.flatMap((type) => resolveBidsForAsset(bids, type));
}

export interface RoundScore {
  costScore: number;
  reliabilityScore: number;
  roundTotal: number;
}

export function calculateRoundScore(
  totalSpentThisRound: number,
  remainingBudget: number,
  coverage: number
): RoundScore {
  // Cost efficiency: reward spending less. 100 points if you spent nothing, 0 if you spent everything
  const initialBudget = 800;
  const totalSpentSoFar = initialBudget - remainingBudget;
  const costScore = Math.round(Math.max(0, 100 * (1 - totalSpentSoFar / initialBudget)));

  // Reliability: how well you met demand
  const reliabilityScore = Math.round(coverage * 100);

  return {
    costScore,
    reliabilityScore,
    roundTotal: costScore + reliabilityScore,
  };
}

export type GamePhase = 'lobby' | 'briefing' | 'bidding' | 'resolving' | 'scoring' | 'finished';
