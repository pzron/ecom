import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import ProductsPage from "@/pages/products";
import ProductDetails from "@/pages/product-details";
import CartPage from "@/pages/cart";
import CheckoutPage from "@/pages/checkout";
import SignUpPage from "@/pages/signup";
import AdminDashboard from "@/pages/admin/dashboard";
import AffiliateDashboard from "@/pages/affiliate/dashboard";
import VendorDashboard from "@/pages/vendor/dashboard";
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
      <Route path="/login" component={SignUpPage} /> {/* Reusing signup for mockup */}
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/affiliate" component={AffiliateDashboard} />
      <Route path="/vendor" component={VendorDashboard} />
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
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
