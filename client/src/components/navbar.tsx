import { Link } from "wouter";
import { Search, ShoppingCart, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setIsScrolled(window.scrollY > 20);
    });
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md border-b border-white/10 py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer">
            <img src="/attached_assets/logo.png" alt="NexCommerce" className="h-8 w-8" />
            <span className="font-heading font-bold text-xl tracking-wider text-white">
              Nex<span className="text-primary">Commerce</span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/"><a className="text-sm font-medium hover:text-primary transition-colors">Home</a></Link>
          <Link href="/products"><a className="text-sm font-medium hover:text-primary transition-colors">Products</a></Link>
          <Link href="/admin"><a className="text-sm font-medium hover:text-primary transition-colors">Admin</a></Link>
          <Link href="/affiliate"><a className="text-sm font-medium hover:text-primary transition-colors">Affiliates</a></Link>
          <Link href="/vendor"><a className="text-sm font-medium hover:text-primary transition-colors">Vendors</a></Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex relative">
            <Input 
              placeholder="Search..." 
              className="w-64 bg-white/5 border-white/10 rounded-full pl-4 pr-10 focus:bg-white/10 transition-all"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          </div>

          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full" asChild>
            <Link href="/cart">
              <ShoppingCart className="w-5 h-5" />
            </Link>
          </Button>
          
          <Button className="hidden md:flex bg-primary hover:bg-primary/90 text-white rounded-full px-6 font-medium shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all hover:shadow-[0_0_25px_rgba(168,85,247,0.7)]" asChild>
            <Link href="/signup">Sign In</Link>
          </Button>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-white">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background/95 backdrop-blur-xl border-l border-white/10">
              <div className="flex flex-col gap-6 mt-8">
                <Link href="/"><a className="text-lg font-medium hover:text-primary">Home</a></Link>
                <Link href="/products"><a className="text-lg font-medium hover:text-primary">Products</a></Link>
                <Link href="/categories"><a className="text-lg font-medium hover:text-primary">Categories</a></Link>
                <Button className="bg-primary hover:bg-primary/90 text-white rounded-full w-full mt-4">
                  Sign In
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
