// Room code generation — excludes ambiguous characters (I, O, 0, 1)
export function generateRoomCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

// Generate a unique host ID (stored in localStorage)
export function getOrCreateHostId(): string {
  const key = 'energy-auction-host-id';
  let hostId = localStorage.getItem(key);
  if (!hostId) {
    hostId = crypto.randomUUID();
    localStorage.setItem(key, hostId);
  }
  return hostId;
}

// Asset definitions
export const ASSETS = {
  solar: {
    name: 'Solar Farm',
    icon: '\u2600\uFE0F',
    basePrice: 120,
    supply: 6,
    capacity: 50,
    description: 'High output in summer, low in winter',
    color: 'hsl(45, 93%, 47%)',
  },
  wind: {
    name: 'Wind Turbine',
    icon: '\uD83D\uDCA8',
    basePrice: 100,
    supply: 6,
    capacity: 40,
    description: 'Variable output, best in autumn/winter',
    color: 'hsl(200, 70%, 50%)',
  },
  gas: {
    name: 'Gas Plant',
    icon: '\uD83D\uDD25',
    basePrice: 150,
    supply: 4,
    capacity: 60,
    description: 'Reliable but expensive to run',
    color: 'hsl(15, 80%, 50%)',
  },
  nuclear: {
    name: 'Nuclear Reactor',
    icon: '\u269B\uFE0F',
    basePrice: 250,
    supply: 2,
    capacity: 100,
    description: 'Massive reliable output, high cost',
    color: 'hsl(270, 60%, 55%)',
  },
  battery: {
    name: 'Battery Storage',
    icon: '\uD83D\uDD0B',
    basePrice: 80,
    supply: 5,
    capacity: 30,
    description: 'Stores excess, discharges during shortfall',
    color: 'hsl(142, 71%, 40%)',
  },
} as const;

export type AssetType = keyof typeof ASSETS;

export const SEASONS = ['Spring', 'Summer', 'Autumn', 'Winter'] as const;
export type Season = (typeof SEASONS)[number];

export const SEASON_ICONS: Record<Season, string> = {
  Spring: '\uD83C\uDF38',
  Summer: '\u2600\uFE0F',
  Autumn: '\uD83C\uDF42',
  Winter: '\u2744\uFE0F',
};

export const INITIAL_BUDGET = 800;
export const BIDDING_DURATION_SECONDS = 30;
export const TOTAL_ROUNDS = 4;
