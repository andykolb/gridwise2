import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import AuctionHome from "./pages/auction/AuctionHome";
import HostLobby from "./pages/auction/HostLobby";
import HostGame from "./pages/auction/HostGame";
import PlayerJoin from "./pages/auction/PlayerJoin";
import PlayerWaiting from "./pages/auction/PlayerWaiting";
import PlayerGame from "./pages/auction/PlayerGame";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  
  if (!user) return <Navigate to="/auth" replace />;
  return <>{children}</>;
}

function AuthRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  
  if (user) return <Navigate to="/" replace />;
  return <>{children}</>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/auth" element={<AuthRoute><Auth /></AuthRoute>} />
            <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
            {/* Energy Auction game (no auth required) */}
            <Route path="/auction" element={<AuctionHome />} />
            <Route path="/auction/host/:roomCode" element={<HostLobby />} />
            <Route path="/auction/host/:roomCode/game" element={<HostGame />} />
            <Route path="/auction/join" element={<PlayerJoin />} />
            <Route path="/auction/join/:roomCode" element={<PlayerJoin />} />
            <Route path="/auction/play/:roomCode" element={<PlayerWaiting />} />
            <Route path="/auction/play/:roomCode/game" element={<PlayerGame />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
