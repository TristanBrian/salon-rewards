
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CustomerCheckin from "./pages/CustomerCheckin";
import StaffDashboard from "./pages/StaffDashboard";
import RewardRedemption from "./pages/RewardRedemption";
import AdminSettings from "./pages/AdminSettings";
import AllCustomers from "./pages/AllCustomers";
import Analytics from "./pages/Analytics";
import ManageRewards from "./pages/ManageRewards";
import ScheduleSettings from "./pages/ScheduleSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/customer-checkin" element={<CustomerCheckin />} />
          <Route path="/staff-dashboard" element={<StaffDashboard />} />
          <Route path="/redeem-rewards" element={<RewardRedemption />} />
          <Route path="/admin-settings" element={<AdminSettings />} />
          <Route path="/all-customers" element={<AllCustomers />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/manage-rewards" element={<ManageRewards />} />
          <Route path="/schedule-settings" element={<ScheduleSettings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
