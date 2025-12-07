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
import ComboBuilderPage from "@/pages/combo-builder";

import AdminDashboard from "@/pages/admin/dashboard";
import AdminUsers from "@/pages/admin/users";
import AdminProducts from "@/pages/admin/products";
import AdminOrders from "@/pages/admin/orders";
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

import HRDashboard from "@/pages/hr/dashboard";
import HREmployees from "@/pages/hr/employees";
import HRRecruitment from "@/pages/hr/recruitment";
import HRPayroll from "@/pages/hr/payroll";
import HRAttendance from "@/pages/hr/attendance";
import HRLeave from "@/pages/hr/leave";

import MarketingDashboard from "@/pages/marketing/dashboard";
import MarketingCampaigns from "@/pages/marketing/campaigns";
import MarketingSocial from "@/pages/marketing/social";
import MarketingAnalytics from "@/pages/marketing/analytics";
import MarketingContent from "@/pages/marketing/content";

import SalesDashboard from "@/pages/sales/dashboard";
import SalesLeads from "@/pages/sales/leads";
import SalesDeals from "@/pages/sales/deals";
import SalesPipeline from "@/pages/sales/pipeline";
import SalesCustomers from "@/pages/sales/customers";
import SalesReports from "@/pages/sales/reports";

import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      {/* Customer Routes */}
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
      <Route path="/combo/builder" component={ComboBuilderPage} />

      {/* Admin Routes - /hair/ */}
      <Route path="/hair" component={AdminDashboard} />
      <Route path="/hair/dashboard" component={AdminDashboard} />
      <Route path="/hair/users" component={AdminUsers} />
      <Route path="/hair/roles" component={AdminRoles} />
      <Route path="/hair/products" component={AdminProducts} />
      <Route path="/hair/orders" component={AdminOrders} />
      <Route path="/hair/analytics" component={AdminAnalytics} />
      <Route path="/hair/settings" component={AdminSettings} />

      {/* Vendor & Affiliate Routes - /so/ */}
      <Route path="/so" component={VendorDashboard} />
      <Route path="/so/vendor" component={VendorDashboard} />
      <Route path="/so/vendor/dashboard" component={VendorDashboard} />
      <Route path="/so/vendor/products" component={VendorProducts} />
      <Route path="/so/vendor/sales" component={VendorSales} />
      <Route path="/so/vendor/settings" component={VendorSettings} />
      <Route path="/so/affiliate" component={AffiliateDashboard} />
      <Route path="/so/affiliate/dashboard" component={AffiliateDashboard} />
      <Route path="/so/affiliate/campaigns" component={AffiliateCampaigns} />
      <Route path="/so/affiliate/earnings" component={AffiliateEarnings} />
      <Route path="/so/affiliate/profile" component={AffiliateProfile} />

      {/* Store Management Routes - /spoon/ */}
      <Route path="/spoon" component={ManagerDashboard} />
      <Route path="/spoon/manager" component={ManagerDashboard} />
      <Route path="/spoon/manager/dashboard" component={ManagerDashboard} />
      <Route path="/spoon/manager/team" component={ManagerTeam} />
      <Route path="/spoon/manager/sales" component={ManagerSales} />
      <Route path="/spoon/manager/inventory" component={ManagerInventory} />
      <Route path="/spoon/manager/reports" component={ManagerReports} />
      <Route path="/spoon/manager/schedules" component={ManagerSchedules} />

      <Route path="/spoon/cashier" component={CashierDashboard} />
      <Route path="/spoon/cashier/dashboard" component={CashierDashboard} />
      <Route path="/spoon/cashier/pos" component={CashierPOS} />
      <Route path="/spoon/cashier/transactions" component={CashierTransactions} />
      <Route path="/spoon/cashier/summary" component={CashierSummary} />
      <Route path="/spoon/cashier/orders" component={CashierOrders} />

      <Route path="/spoon/stockkeeper" component={StockkeeperDashboard} />
      <Route path="/spoon/stockkeeper/dashboard" component={StockkeeperDashboard} />
      <Route path="/spoon/stockkeeper/inventory" component={StockkeeperInventory} />
      <Route path="/spoon/stockkeeper/receiving" component={StockkeeperReceiving} />
      <Route path="/spoon/stockkeeper/transfers" component={StockkeeperTransfers} />
      <Route path="/spoon/stockkeeper/alerts" component={StockkeeperAlerts} />

      <Route path="/spoon/office" component={OfficeDashboard} />
      <Route path="/spoon/office/dashboard" component={OfficeDashboard} />
      <Route path="/spoon/office/documents" component={OfficeDocuments} />
      <Route path="/spoon/office/reports" component={OfficeReports} />
      <Route path="/spoon/office/support" component={OfficeSupport} />
      <Route path="/spoon/office/communications" component={OfficeCommunications} />

      {/* HR Routes */}
      <Route path="/spoon/hr" component={HRDashboard} />
      <Route path="/spoon/hr/dashboard" component={HRDashboard} />
      <Route path="/spoon/hr/employees" component={HREmployees} />
      <Route path="/spoon/hr/recruitment" component={HRRecruitment} />
      <Route path="/spoon/hr/payroll" component={HRPayroll} />
      <Route path="/spoon/hr/attendance" component={HRAttendance} />
      <Route path="/spoon/hr/leave" component={HRLeave} />

      {/* Marketing Routes */}
      <Route path="/spoon/marketing" component={MarketingDashboard} />
      <Route path="/spoon/marketing/dashboard" component={MarketingDashboard} />
      <Route path="/spoon/marketing/campaigns" component={MarketingCampaigns} />
      <Route path="/spoon/marketing/social" component={MarketingSocial} />
      <Route path="/spoon/marketing/analytics" component={MarketingAnalytics} />
      <Route path="/spoon/marketing/content" component={MarketingContent} />

      {/* Sales Routes */}
      <Route path="/spoon/sales" component={SalesDashboard} />
      <Route path="/spoon/sales/dashboard" component={SalesDashboard} />
      <Route path="/spoon/sales/leads" component={SalesLeads} />
      <Route path="/spoon/sales/deals" component={SalesDeals} />
      <Route path="/spoon/sales/pipeline" component={SalesPipeline} />
      <Route path="/spoon/sales/customers" component={SalesCustomers} />
      <Route path="/spoon/sales/reports" component={SalesReports} />

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
