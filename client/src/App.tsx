import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ChatWidget } from "@/components/chat-widget";
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

// Admin Pages
import AdminDashboard from "@/pages/admin/dashboard";
import AdminUsers from "@/pages/admin/users";
import AdminProducts from "@/pages/admin/products";
import AdminAnalytics from "@/pages/admin/analytics";
import AdminSettings from "@/pages/admin/settings";

// Affiliate Pages
import AffiliateDashboard from "@/pages/affiliate/dashboard";
import AffiliateCampaigns from "@/pages/affiliate/campaigns";
import AffiliateEarnings from "@/pages/affiliate/earnings";
import AffiliateProfile from "@/pages/affiliate/profile";

// Vendor Pages
import VendorDashboard from "@/pages/vendor/dashboard";
import VendorProducts from "@/pages/vendor/products";
import VendorSales from "@/pages/vendor/sales";
import VendorSettings from "@/pages/vendor/settings";

import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      {/* Public Routes */}
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

      {/* Admin Routes */}
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/users" component={AdminUsers} />
      <Route path="/admin/products" component={AdminProducts} />
      <Route path="/admin/analytics" component={AdminAnalytics} />
      <Route path="/admin/settings" component={AdminSettings} />

      {/* Affiliate Routes */}
      <Route path="/affiliate" component={AffiliateDashboard} />
      <Route path="/affiliate/campaigns" component={AffiliateCampaigns} />
      <Route path="/affiliate/earnings" component={AffiliateEarnings} />
      <Route path="/affiliate/profile" component={AffiliateProfile} />

      {/* Vendor Routes */}
      <Route path="/vendor" component={VendorDashboard} />
      <Route path="/vendor/products" component={VendorProducts} />
      <Route path="/vendor/sales" component={VendorSales} />
      <Route path="/vendor/settings" component={VendorSettings} />

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
        <ChatWidget />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
