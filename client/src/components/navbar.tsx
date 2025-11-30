import { Link, useLocation } from "wouter";
import { Search, ShoppingCart, User, Menu, Heart, Sparkles, Mic, MicOff, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect, useRef } from "react";
import { useCart } from "@/hooks/use-cart";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [, navigate] = useLocation();
  const { getItemCount, setIsOpen } = useCart();
  const itemCount = getItemCount();
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const startVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice search is not supported in your browser. Please use Chrome or Edge.');
      return;
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'en-US';

    let finalTranscript = '';

    recognitionRef.current.onstart = () => {
      setIsListening(true);
    };

    recognitionRef.current.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result: any) => result.transcript)
        .join('');
      finalTranscript = transcript;
      setSearchQuery(transcript);
    };

    recognitionRef.current.onerror = () => {
      setIsListening(false);
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
      if (finalTranscript.trim()) {
        navigate(`/products?search=${encodeURIComponent(finalTranscript)}`);
      }
    };

    recognitionRef.current.start();
  };

  const stopVoiceSearch = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-white/5 py-2 shadow-lg shadow-purple-500/5" 
          : "bg-transparent py-4"
      }`}
      data-testid="navbar"
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 cursor-pointer group" data-testid="logo-link">
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 blur-lg opacity-50 group-hover:opacity-70 transition-opacity" />
          </motion.div>
          <span className="font-heading font-bold text-xl tracking-wider text-white">
            Nex<span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Commerce</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {[
            { href: "/", label: "Home" },
            { href: "/products", label: "Products" },
            { href: "/deals", label: "Deals" },
            { href: "/compare", label: "Compare" },
          ].map(({ href, label }) => (
            <Link 
              key={href}
              href={href}
              className="relative text-sm font-medium text-white/70 hover:text-white transition-colors group"
              data-testid={`nav-${label.toLowerCase()}`}
            >
              {label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <form onSubmit={handleSearch} className="hidden md:flex relative">
            <Input 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-52 lg:w-64 bg-white/5 border-white/10 rounded-full pl-4 pr-20 focus:bg-white/10 focus:border-purple-500/50 transition-all text-sm ${isListening ? 'border-purple-500 bg-purple-500/10' : ''}`}
              data-testid="search-input"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className={`h-7 w-7 rounded-full ${isListening ? 'text-purple-400 bg-purple-500/20' : 'text-white/40 hover:text-white hover:bg-white/10'}`}
                onClick={isListening ? stopVoiceSearch : startVoiceSearch}
              >
                {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
              </Button>
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-full text-white/40 hover:text-white hover:bg-white/10"
              >
                <Search className="w-3.5 h-3.5" />
              </Button>
            </div>
          </form>

          <Link href="/wishlist">
            <Button 
              variant="ghost" 
              size="icon" 
              className="hidden sm:flex text-white/70 hover:text-white hover:bg-white/10 rounded-full relative"
              data-testid="wishlist-button"
            >
              <Heart className="w-5 h-5" />
            </Button>
          </Link>

          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white/70 hover:text-white hover:bg-white/10 rounded-full relative"
            onClick={() => setIsOpen(true)}
            data-testid="cart-button"
          >
            <ShoppingCart className="w-5 h-5" />
            <AnimatePresence>
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full text-xs font-bold text-white flex items-center justify-center shadow-lg"
                >
                  {itemCount > 9 ? "9+" : itemCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="hidden sm:flex text-white/70 hover:text-white hover:bg-white/10 rounded-full"
                data-testid="profile-button"
              >
                <User className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="w-48 bg-[#0f0f15]/95 backdrop-blur-xl border-white/10"
            >
              <DropdownMenuItem asChild className="focus:bg-white/10 cursor-pointer">
                <Link href="/signup" className="flex items-center gap-2 text-white">
                  <LogIn className="w-4 h-4" />
                  Login
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="focus:bg-white/10 cursor-pointer">
                <Link href="/signup" className="flex items-center gap-2 text-white">
                  <UserPlus className="w-4 h-4" />
                  Register
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Link href="/signup">
            <Button 
              className="hidden md:flex bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full px-6 font-medium shadow-lg shadow-purple-500/25 transition-all hover:shadow-purple-500/40 hover:scale-105"
              data-testid="signin-button"
            >
              Sign In
            </Button>
          </Link>

          <Sheet>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="lg:hidden text-white hover:bg-white/10 rounded-full"
                data-testid="mobile-menu-button"
              >
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#0a0a0f]/95 backdrop-blur-xl border-l border-white/10 w-80">
              <div className="flex flex-col gap-6 mt-8">
                <form onSubmit={handleSearch} className="relative">
                  <Input 
                    placeholder="Search products..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full bg-white/5 border-white/10 rounded-full pl-4 pr-16 ${isListening ? 'border-purple-500 bg-purple-500/10' : ''}`}
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className={`h-7 w-7 rounded-full ${isListening ? 'text-purple-400' : 'text-white/40'}`}
                      onClick={isListening ? stopVoiceSearch : startVoiceSearch}
                    >
                      {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                    </Button>
                    <Search className="w-4 h-4 text-white/40" />
                  </div>
                </form>
                
                <div className="h-px bg-white/10" />
                
                {[
                  { href: "/", label: "Home" },
                  { href: "/products", label: "Products" },
                  { href: "/deals", label: "Deals" },
                  { href: "/compare", label: "Compare" },
                  { href: "/wishlist", label: "Wishlist" },
                ].map(({ href, label }) => (
                  <Link 
                    key={href}
                    href={href}
                    className="text-lg font-medium text-white/70 hover:text-white transition-colors flex items-center gap-3"
                  >
                    {label}
                  </Link>
                ))}
                
                <div className="h-px bg-white/10" />
                
                <div className="text-xs text-white/40 uppercase tracking-wider">Account</div>
                
                <Link 
                  href="/signup"
                  className="text-sm font-medium text-white/50 hover:text-white transition-colors flex items-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </Link>
                <Link 
                  href="/signup"
                  className="text-sm font-medium text-white/50 hover:text-white transition-colors flex items-center gap-2"
                >
                  <UserPlus className="w-4 h-4" />
                  Register
                </Link>
                
                <Link href="/signup" className="mt-4">
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full font-medium">
                    Sign In
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
