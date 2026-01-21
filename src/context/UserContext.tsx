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
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const STORAGE_KEY = 'gridwise_user';
const ACHIEVEMENTS_KEY = 'gridwise_achievements';
const CHAT_KEY = 'gridwise_chat';
const REFERRALS_KEY = 'gridwise_referrals';

// Generate a unique referral code
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

  // Load from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem(STORAGE_KEY);
    const savedAchievements = localStorage.getItem(ACHIEVEMENTS_KEY);
    const savedChat = localStorage.getItem(CHAT_KEY);

    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setUserState(parsed);
      setIsOnboarded(true);
    }
    if (savedAchievements) {
      setAchievements(JSON.parse(savedAchievements));
    }
    if (savedChat) {
      setChatMessages(JSON.parse(savedChat));
    }
  }, []);

  // Save to localStorage on changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(achievements));
  }, [achievements]);

  useEffect(() => {
    localStorage.setItem(CHAT_KEY, JSON.stringify(chatMessages));
  }, [chatMessages]);

  const setUser = (newUser: User | null) => {
    setUserState(newUser);
    if (newUser) {
      setIsOnboarded(true);
    }
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      setUserState({ ...user, ...updates });
    }
  };

  const startOnboarding = () => {
    setIsOnboarded(false);
  };

  const completeOnboarding = (userData: Partial<User>) => {
    // Check for referral code in URL
    const urlParams = new URLSearchParams(window.location.search);
    const referralCode = urlParams.get('ref');
    
    // Calculate initial XP (bonus if referred)
    const initialXP = referralCode ? 50 : 0;
    
    const newUser: User = {
      name: userData.name || 'Learner',
      language: userData.language || 'en',
      interests: userData.interests || [],
      level: userData.level || 'beginner',
      xp: initialXP,
      streak: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      completedQuizzes: 0,
      questionsAsked: 0,
      achievements: [],
      referralCode: generateReferralCode(),
      invitesSent: 0,
      invitesAccepted: 0,
      referredBy: referralCode || undefined,
    };
    setUserState(newUser);
    setIsOnboarded(true);

    // Process referral if exists
    if (referralCode) {
      processReferral(referralCode);
      // Clean URL
      window.history.replaceState({}, '', window.location.pathname);
    }
  };

  const processReferral = (referralCode: string) => {
    // In a real app, this would call an API to validate and process the referral
    // For now, we store it locally and grant rewards
    const storedReferrals = localStorage.getItem(REFERRALS_KEY);
    const referrals: Record<string, string[]> = storedReferrals ? JSON.parse(storedReferrals) : {};
    
    // Store this referral (inviter code -> list of invitee IDs)
    if (!referrals[referralCode]) {
      referrals[referralCode] = [];
    }
    
    // Add current user's referral code as invitee identifier
    const inviteeId = Date.now().toString();
    referrals[referralCode].push(inviteeId);
    localStorage.setItem(REFERRALS_KEY, JSON.stringify(referrals));
    
    console.log(`Referral processed: ${referralCode} -> ${inviteeId}`);
  };

  const addXP = useCallback((amount: number) => {
    if (user) {
      const newXP = user.xp + amount;
      let newLevel = user.level;
      let didLevelUp = false;
      
      // Level thresholds
      if (newXP >= 3000 && user.level !== 'expert') {
        newLevel = 'expert';
        didLevelUp = true;
        unlockAchievement('level-up');
      } else if (newXP >= 1500 && user.level !== 'advanced' && user.level !== 'expert') {
        newLevel = 'advanced';
        didLevelUp = true;
      } else if (newXP >= 500 && user.level === 'beginner') {
        newLevel = 'intermediate';
        didLevelUp = true;
      }

      // Trigger XP animation
      setXPAnimation({ amount, id: Date.now() });

      // Trigger level up celebration after a delay (so XP animation shows first)
      if (didLevelUp) {
        setTimeout(() => {
          setLevelUpEvent({ newLevel, id: Date.now() });
        }, 1500);
      }

      setUserState({
        ...user,
        xp: newXP,
        level: newLevel,
      });
    }
  }, [user]);

  const clearXPAnimation = useCallback(() => {
    setXPAnimation(null);
  }, []);

  const clearLevelUpEvent = useCallback(() => {
    setLevelUpEvent(null);
  }, []);

  const incrementStreak = () => {
    if (user) {
      const today = new Date().toISOString().split('T')[0];
      const lastActive = user.lastActiveDate;
      
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      let newStreak = user.streak;
      
      if (lastActive === yesterdayStr) {
        newStreak = user.streak + 1;
      } else if (lastActive !== today) {
        newStreak = 1;
      }

      // Check streak achievements
      if (newStreak >= 3) unlockAchievement('streak-3');
      if (newStreak >= 7) unlockAchievement('streak-7');

      setUserState({
        ...user,
        streak: newStreak,
        lastActiveDate: today,
      });
    }
  };

  const completeQuiz = () => {
    if (user) {
      const newCount = user.completedQuizzes + 1;
      setUserState({
        ...user,
        completedQuizzes: newCount,
      });

      if (newCount === 1) unlockAchievement('first-quiz');
      if (newCount >= 10) unlockAchievement('quiz-champion');
    }
  };

  const askQuestion = () => {
    if (user) {
      const newCount = user.questionsAsked + 1;
      setUserState({
        ...user,
        questionsAsked: newCount,
      });

      if (newCount >= 5) unlockAchievement('curious-mind');
    }
  };

  const unlockAchievement = (id: string) => {
    setAchievements(prev =>
      prev.map(a =>
        a.id === id ? { ...a, unlocked: true } : a
      )
    );
    if (user && !user.achievements.includes(id)) {
      setUserState({
        ...user,
        achievements: [...user.achievements, id],
      });
    }
  };

  const addChatMessage = (message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage: ChatMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setChatMessages(prev => [...prev, newMessage]);
  };

  const clearChat = () => {
    setChatMessages([]);
  };

  const resetApp = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(ACHIEVEMENTS_KEY);
    localStorage.removeItem(CHAT_KEY);
    setUserState(null);
    setAchievements(achievementData);
    setChatMessages([]);
    setIsOnboarded(false);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isOnboarded,
        achievements,
        chatMessages,
        xpAnimation,
        levelUpEvent,
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
        processReferral,
        clearXPAnimation,
        clearLevelUpEvent,
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
