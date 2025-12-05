import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ChatWidget } from "@/components/chat-widget";
import { CartDrawer } from "@/components/cart-drawer";
import Home from "@/pages/home";
import ProductsPage from "@/pages/products";
import ProductDetails from "@/pages/product-details";
import CartPage from "@/pages/cart";
import CheckoutPage from "@/pages/checkout";
import SignUpPage from "@/pages/signup";
import ProfilePage from "@/pages/profile";
import WishlistPage from "@/pages/wishlist";
import DealsPage from "@/pages/deals";
import ComparePage from "@/pages/compare";
import ComboPage from "@/pages/combo";

import AdminDashboard from "@/pages/admin/dashboard";
import AdminUsers from "@/pages/admin/users";
import AdminProducts from "@/pages/admin/products";
import AdminAnalytics from "@/pages/admin/analytics";
import AdminSettings from "@/pages/admin/settings";
import AdminRoles from "@/pages/admin/roles";

import AffiliateDashboard from "@/pages/affiliate/dashboard";
import AffiliateCampaigns from "@/pages/affiliate/campaigns";
import AffiliateEarnings from "@/pages/affiliate/earnings";
import AffiliateProfile from "@/pages/affiliate/profile";

import VendorDashboard from "@/pages/vendor/dashboard";
import VendorProducts from "@/pages/vendor/products";
import VendorSales from "@/pages/vendor/sales";
import VendorSettings from "@/pages/vendor/settings";

import ManagerDashboard from "@/pages/manager/dashboard";
import ManagerTeam from "@/pages/manager/team";
import ManagerSales from "@/pages/manager/sales";
import ManagerInventory from "@/pages/manager/inventory";
import ManagerReports from "@/pages/manager/reports";
import ManagerSchedules from "@/pages/manager/schedules";

import CashierDashboard from "@/pages/cashier/dashboard";
import CashierPOS from "@/pages/cashier/pos";
import CashierTransactions from "@/pages/cashier/transactions";
import CashierSummary from "@/pages/cashier/summary";
import CashierOrders from "@/pages/cashier/orders";

import StockkeeperDashboard from "@/pages/stockkeeper/dashboard";
import StockkeeperInventory from "@/pages/stockkeeper/inventory";
import StockkeeperReceiving from "@/pages/stockkeeper/receiving";
import StockkeeperTransfers from "@/pages/stockkeeper/transfers";
import StockkeeperAlerts from "@/pages/stockkeeper/alerts";

import OfficeDashboard from "@/pages/office/dashboard";
import OfficeDocuments from "@/pages/office/documents";
import OfficeReports from "@/pages/office/reports";
import OfficeSupport from "@/pages/office/support";
import OfficeCommunications from "@/pages/office/communications";

import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/products" component={ProductsPage} />
      <Route path="/product/:id" component={ProductDetails} />
      <Route path="/cart" component={CartPage} />
      <Route path="/checkout" component={CheckoutPage} />
      <Route path="/signup" component={SignUpPage} />
      <Route path="/login" component={SignUpPage} />
      <Route path="/profile" component={ProfilePage} />
      <Route path="/wishlist" component={WishlistPage} />
      <Route path="/deals" component={DealsPage} />
      <Route path="/compare" component={ComparePage} />
      <Route path="/combo" component={ComboPage} />

      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/admin/users" component={AdminUsers} />
      <Route path="/admin/roles" component={AdminRoles} />
      <Route path="/admin/products" component={AdminProducts} />
      <Route path="/admin/analytics" component={AdminAnalytics} />
      <Route path="/admin/settings" component={AdminSettings} />

      <Route path="/affiliate" component={AffiliateDashboard} />
      <Route path="/affiliate/dashboard" component={AffiliateDashboard} />
      <Route path="/affiliate/campaigns" component={AffiliateCampaigns} />
      <Route path="/affiliate/earnings" component={AffiliateEarnings} />
      <Route path="/affiliate/profile" component={AffiliateProfile} />

      <Route path="/vendor" component={VendorDashboard} />
      <Route path="/vendor/dashboard" component={VendorDashboard} />
      <Route path="/vendor/products" component={VendorProducts} />
      <Route path="/vendor/sales" component={VendorSales} />
      <Route path="/vendor/settings" component={VendorSettings} />

      <Route path="/manager" component={ManagerDashboard} />
      <Route path="/manager/dashboard" component={ManagerDashboard} />
      <Route path="/manager/team" component={ManagerTeam} />
      <Route path="/manager/sales" component={ManagerSales} />
      <Route path="/manager/inventory" component={ManagerInventory} />
      <Route path="/manager/reports" component={ManagerReports} />
      <Route path="/manager/schedules" component={ManagerSchedules} />

      <Route path="/cashier" component={CashierDashboard} />
      <Route path="/cashier/dashboard" component={CashierDashboard} />
      <Route path="/cashier/pos" component={CashierPOS} />
      <Route path="/cashier/transactions" component={CashierTransactions} />
      <Route path="/cashier/summary" component={CashierSummary} />
      <Route path="/cashier/orders" component={CashierOrders} />

      <Route path="/stockkeeper" component={StockkeeperDashboard} />
      <Route path="/stockkeeper/dashboard" component={StockkeeperDashboard} />
      <Route path="/stockkeeper/inventory" component={StockkeeperInventory} />
      <Route path="/stockkeeper/receiving" component={StockkeeperReceiving} />
      <Route path="/stockkeeper/transfers" component={StockkeeperTransfers} />
      <Route path="/stockkeeper/alerts" component={StockkeeperAlerts} />

      <Route path="/office" component={OfficeDashboard} />
      <Route path="/office/dashboard" component={OfficeDashboard} />
      <Route path="/office/documents" component={OfficeDocuments} />
      <Route path="/office/reports" component={OfficeReports} />
      <Route path="/office/support" component={OfficeSupport} />
      <Route path="/office/communications" component={OfficeCommunications} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
        <CartDrawer />
        <ChatWidget />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
