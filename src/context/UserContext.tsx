import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { User, Language, Topic, UserLevel, Achievement, ChatMessage } from '@/types';
import { achievements as achievementData } from '@/data/content';

interface XPAnimation {
  amount: number;
  id: number;
}

interface LevelUpEvent {
  newLevel: UserLevel;
  id: number;
}

interface UserContextType {
  user: User | null;
  isOnboarded: boolean;
  achievements: Achievement[];
  chatMessages: ChatMessage[];
  xpAnimation: XPAnimation | null;
  levelUpEvent: LevelUpEvent | null;
  newAchievementCount: number;
  setUser: (user: User | null) => void;
  updateUser: (updates: Partial<User>) => void;
  startOnboarding: () => void;
  completeOnboarding: (userData: Partial<User>) => void;
  addXP: (amount: number) => void;
  incrementStreak: () => void;
  completeQuiz: () => void;
  askQuestion: () => void;
  unlockAchievement: (id: string) => void;
  addChatMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  clearChat: () => void;
  resetApp: () => void;
  processReferral: (referralCode: string) => void;
  clearXPAnimation: () => void;
  clearLevelUpEvent: () => void;
  markNuggetAsRead: (nuggetId: string) => void;
  isNuggetRead: (nuggetId: string) => boolean;
  clearNewAchievements: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const STORAGE_KEY = 'gridwise_user';
const ACHIEVEMENTS_KEY = 'gridwise_achievements';
const CHAT_KEY = 'gridwise_chat';
const REFERRALS_KEY = 'gridwise_referrals';
const VIEWED_ACHIEVEMENTS_KEY = 'gridwise_viewed_achievements';

/**
 * Safely read and parse JSON from localStorage.
 * Returns `fallback` on any error (missing key, corrupted data, etc.).
 */
function safeReadStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch (err) {
    console.warn(`Failed to read localStorage key "${key}":`, err);
    return fallback;
  }
}

/**
 * Safely write JSON to localStorage.
 * Silently logs on failure (e.g. quota exceeded).
 */
function safeWriteStorage(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`Failed to write localStorage key "${key}":`, err);
  }
}

function generateReferralCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>(achievementData);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [xpAnimation, setXPAnimation] = useState<XPAnimation | null>(null);
  const [levelUpEvent, setLevelUpEvent] = useState<LevelUpEvent | null>(null);
  const [viewedAchievements, setViewedAchievements] = useState<string[]>([]);

  // Load persisted state on mount — with safe parsing
  useEffect(() => {
    const savedUser = safeReadStorage<User | null>(STORAGE_KEY, null);
    const savedAchievements = safeReadStorage<Achievement[] | null>(ACHIEVEMENTS_KEY, null);
    const savedChat = safeReadStorage<ChatMessage[] | null>(CHAT_KEY, null);
    const savedViewedAchievements = safeReadStorage<string[] | null>(VIEWED_ACHIEVEMENTS_KEY, null);

    if (savedUser) {
      setUserState(savedUser);
      setIsOnboarded(true);
    }
    if (savedAchievements) {
      setAchievements(savedAchievements);
    }
    if (savedChat) {
      setChatMessages(savedChat);
    }
    if (savedViewedAchievements) {
      setViewedAchievements(savedViewedAchievements);
    }
  }, []);

  // Persist state changes — with safe writes
  useEffect(() => {
    if (user) {
      safeWriteStorage(STORAGE_KEY, user);
    }
  }, [user]);

  useEffect(() => {
    safeWriteStorage(ACHIEVEMENTS_KEY, achievements);
  }, [achievements]);

  useEffect(() => {
    safeWriteStorage(CHAT_KEY, chatMessages);
  }, [chatMessages]);

  const setUser = useCallback((newUser: User | null) => {
    setUserState(newUser);
    if (newUser) {
      setIsOnboarded(true);
    }
  }, []);

  const updateUser = useCallback((updates: Partial<User>) => {
    setUserState(prev => prev ? { ...prev, ...updates } : prev);
  }, []);

  const startOnboarding = useCallback(() => {
    setIsOnboarded(false);
  }, []);

  const unlockAchievement = useCallback((id: string) => {
    setAchievements(prev =>
      prev.map(a =>
        a.id === id ? { ...a, unlocked: true } : a
      )
    );
    setUserState(prev => {
      if (!prev || prev.achievements.includes(id)) return prev;
      return { ...prev, achievements: [...prev.achievements, id] };
    });
  }, []);

  const completeOnboarding = useCallback((userData: Partial<User>) => {
    const urlParams = new URLSearchParams(window.location.search);
    const referralCode = urlParams.get('ref');

    const welcomeBonus = 25;
    const referralBonus = referralCode ? 25 : 0;
    const totalWelcomeXP = welcomeBonus + referralBonus;

    const newUser: User = {
      name: userData.name || 'Learner',
      language: userData.language || 'en',
      interests: userData.interests || [],
      level: userData.level || 'beginner',
      xp: 0,
      streak: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      completedQuizzes: 0,
      questionsAsked: 0,
      achievements: [],
      referralCode: generateReferralCode(),
      invitesSent: 0,
      invitesAccepted: 0,
      referredBy: referralCode || undefined,
      readNuggets: [],
    };
    setUserState(newUser);
    setIsOnboarded(true);

    setTimeout(() => {
      unlockAchievement('welcome');
    }, 500);

    setTimeout(() => {
      setXPAnimation({ amount: totalWelcomeXP, id: Date.now() });
      setUserState(prev => prev ? { ...prev, xp: totalWelcomeXP } : prev);
    }, 800);

    if (referralCode) {
      processReferral(referralCode);
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, [unlockAchievement]);

  const processReferral = useCallback((referralCode: string) => {
    const referrals = safeReadStorage<Record<string, string[]>>(REFERRALS_KEY, {});

    if (!referrals[referralCode]) {
      referrals[referralCode] = [];
    }

    const inviteeId = Date.now().toString();
    referrals[referralCode].push(inviteeId);
    safeWriteStorage(REFERRALS_KEY, referrals);
  }, []);

  // FIX: Use functional state updater to avoid stale closure over `user`
  const addXP = useCallback((amount: number) => {
    setUserState(prev => {
      if (!prev) return prev;
      const newXP = prev.xp + amount;
      let newLevel = prev.level;
      let didLevelUp = false;

      if (newXP >= 3000 && prev.level !== 'expert') {
        newLevel = 'expert';
        didLevelUp = true;
      } else if (newXP >= 1500 && prev.level !== 'advanced' && prev.level !== 'expert') {
        newLevel = 'advanced';
        didLevelUp = true;
      } else if (newXP >= 500 && prev.level === 'beginner') {
        newLevel = 'intermediate';
        didLevelUp = true;
      }

      setXPAnimation({ amount, id: Date.now() });

      if (didLevelUp) {
        if (newLevel === 'expert') {
          unlockAchievement('level-up');
        }
        setTimeout(() => {
          setLevelUpEvent({ newLevel, id: Date.now() });
        }, 1500);
      }

      return { ...prev, xp: newXP, level: newLevel };
    });
  }, [unlockAchievement]);

  const clearXPAnimation = useCallback(() => {
    setXPAnimation(null);
  }, []);

  const clearLevelUpEvent = useCallback(() => {
    setLevelUpEvent(null);
  }, []);

  // FIX: Use functional state updater to avoid stale closure
  const incrementStreak = useCallback(() => {
    setUserState(prev => {
      if (!prev) return prev;

      const today = new Date().toISOString().split('T')[0];
      const lastActive = prev.lastActiveDate;

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      let newStreak = prev.streak;

      if (lastActive === yesterdayStr) {
        newStreak = prev.streak + 1;
      } else if (lastActive !== today) {
        newStreak = 1;
      }

      // Trigger streak achievements via setTimeout to avoid nested state updates
      if (newStreak >= 3) {
        setTimeout(() => unlockAchievement('streak-3'), 0);
      }
      if (newStreak >= 7) {
        setTimeout(() => unlockAchievement('streak-7'), 0);
      }

      return { ...prev, streak: newStreak, lastActiveDate: today };
    });
  }, [unlockAchievement]);

  // FIX: Use functional state updater to avoid stale closure
  const completeQuiz = useCallback(() => {
    setUserState(prev => {
      if (!prev) return prev;
      const newCount = prev.completedQuizzes + 1;

      if (newCount === 1) {
        setTimeout(() => unlockAchievement('first-quiz'), 0);
      }
      if (newCount >= 10) {
        setTimeout(() => unlockAchievement('quiz-champion'), 0);
      }

      return { ...prev, completedQuizzes: newCount };
    });
  }, [unlockAchievement]);

  // FIX: Use functional state updater to avoid stale closure
  const askQuestion = useCallback(() => {
    setUserState(prev => {
      if (!prev) return prev;
      const newCount = prev.questionsAsked + 1;

      if (newCount >= 5) {
        setTimeout(() => unlockAchievement('curious-mind'), 0);
      }

      return { ...prev, questionsAsked: newCount };
    });
  }, [unlockAchievement]);

  const addChatMessage = useCallback((message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage: ChatMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setChatMessages(prev => [...prev, newMessage]);
  }, []);

  const clearChat = useCallback(() => {
    setChatMessages([]);
  }, []);

  const markNuggetAsRead = useCallback((nuggetId: string) => {
    setUserState(prev => {
      if (!prev || prev.readNuggets?.includes(nuggetId)) return prev;
      return { ...prev, readNuggets: [...(prev.readNuggets || []), nuggetId] };
    });
  }, []);

  const isNuggetRead = useCallback((nuggetId: string): boolean => {
    // This reads from the current render's user value via the component closure,
    // which is fine since it's called synchronously during render.
    return user?.readNuggets?.includes(nuggetId) || false;
  }, [user]);

  const newAchievementCount = achievements.filter(
    a => a.unlocked && !viewedAchievements.includes(a.id)
  ).length;

  const clearNewAchievements = useCallback(() => {
    const unlockedIds = achievements.filter(a => a.unlocked).map(a => a.id);
    setViewedAchievements(unlockedIds);
    safeWriteStorage(VIEWED_ACHIEVEMENTS_KEY, unlockedIds);
  }, [achievements]);

  const resetApp = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(ACHIEVEMENTS_KEY);
      localStorage.removeItem(CHAT_KEY);
      localStorage.removeItem(VIEWED_ACHIEVEMENTS_KEY);
    } catch (err) {
      console.warn('Failed to clear localStorage:', err);
    }
    setUserState(null);
    setAchievements(achievementData);
    setChatMessages([]);
    setViewedAchievements([]);
    setIsOnboarded(false);
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        isOnboarded,
        achievements,
        chatMessages,
        xpAnimation,
        levelUpEvent,
        newAchievementCount,
        setUser,
        updateUser,
        startOnboarding,
        completeOnboarding,
        addXP,
        incrementStreak,
        completeQuiz,
        askQuestion,
        unlockAchievement,
        addChatMessage,
        clearChat,
        resetApp,
        clearNewAchievements,
        processReferral,
        clearXPAnimation,
        clearLevelUpEvent,
        markNuggetAsRead,
        isNuggetRead,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
