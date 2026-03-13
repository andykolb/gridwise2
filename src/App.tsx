import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { UserProvider } from "@/context/UserContext";
import { AppLayout } from "@/pages/AppLayout";
import { HomePage } from "@/pages/HomePage";
import { QuizPage } from "@/pages/QuizPage";
import { QuizPlayPage } from "@/pages/QuizPlayPage";
import { DuelPage } from "@/pages/DuelPage";
import { LeaderboardPage } from "@/pages/LeaderboardPage";
import { AchievementsPage } from "@/pages/AchievementsPage";
import { ChatPage } from "@/pages/ChatPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <UserProvider>
            <Routes>
              <Route element={<AppLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/quiz" element={<QuizPage />} />
                <Route path="/quiz/play" element={<QuizPlayPage />} />
                <Route path="/duel" element={<DuelPage />} />
                <Route path="/leaderboard" element={<LeaderboardPage />} />
                <Route path="/achievements" element={<AchievementsPage />} />
                <Route path="/chat" element={<ChatPage />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </UserProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
