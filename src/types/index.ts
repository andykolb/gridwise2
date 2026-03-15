export type Language = 'en' | 'de';

export type UserLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export type Topic = 
  | 'energy-basics'
  | 'price-drivers'
  | 'renewables'
  | 'grid-dso'
  | 'regulation'
  | 'trading'
  | 'retail';

export interface User {
  name: string;
  language: Language;
  interests: Topic[];
  level: UserLevel;
  xp: number;
  streak: number;
  lastActiveDate: string;
  completedQuizzes: number;
  questionsAsked: number;
  achievements: string[];
  referralCode: string;
  invitesSent: number;
  invitesAccepted: number;
  referredBy?: string;
  avatar?: string;
  readNuggets: string[]; // IDs of read daily nuggets
  topicStats: Partial<Record<Topic, { correct: number; total: number }>>;
  duelWins: number;
}

export interface Invite {
  id: string;
  inviterUserId: string;
  inviteCode: string;
  createdAt: string;
  channel: 'copy_link' | 'teams' | 'email';
  inviteeUserId?: string;
  acceptedAt?: string;
  rewardGranted: boolean;
}

export interface DailyNugget {
  id: string;
  title: {
    en: string;
    de: string;
  };
  content: {
    en: string;
    de: string;
  };
  learnMore: {
    en: string;
    de: string;
  };
  topic: Topic;
}

export interface QuizQuestion {
  id: string;
  question: {
    en: string;
    de: string;
  };
  options: {
    en: string[];
    de: string[];
  };
  correctIndex: number;
  explanation: {
    en: string;
    de: string;
  };
  learnMore?: {
    en: string;
    de: string;
  };
  topic: Topic;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  xp: number;
  level: UserLevel;
  avatar: string;
  streak: number;
}

export interface Achievement {
  id: string;
  name: {
    en: string;
    de: string;
  };
  description: {
    en: string;
    de: string;
  };
  icon: string;
  unlocked: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: { title: string; url: string }[];
  confidence?: 'low' | 'medium' | 'high';
  timestamp: Date;
}
