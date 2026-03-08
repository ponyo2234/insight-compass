import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import PortfolioPage from "@/pages/PortfolioPage";
import MarketRiskPage from "@/pages/MarketRiskPage";
import MacroPage from "@/pages/MacroPage";
import DCFPage from "@/pages/DCFPage";
import TechnicalPage from "@/pages/TechnicalPage";
import SettingsPage from "@/pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<PortfolioPage />} />
            <Route path="/market-risk" element={<MarketRiskPage />} />
            <Route path="/macro" element={<MacroPage />} />
            <Route path="/dcf" element={<DCFPage />} />
            <Route path="/technical" element={<TechnicalPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DashboardLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
