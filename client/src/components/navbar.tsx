import { Link, useLocation } from "wouter";
import { Search, ShoppingCart, User, Menu, Heart, Sparkles, Mic, MicOff, LogIn, UserPlus, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect, useRef } from "react";
import { useCart } from "@/hooks/use-cart";
import { useAuthStore } from "@/stores/auth";
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
  const { isAuthenticated, user, logout } = useAuthStore();
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
      <div className="container mx-auto px-3 md:px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 cursor-pointer group flex-shrink-0" data-testid="logo-link">
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <div className="w-9 md:w-10 h-9 md:h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30 flex-shrink-0">
              <Sparkles className="w-4 md:w-5 h-4 md:h-5 text-white" />
            </div>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 blur-lg opacity-50 group-hover:opacity-70 transition-opacity" />
          </motion.div>
          <span className="font-heading font-bold text-lg md:text-xl tracking-wider text-white hidden sm:inline">
            Nex<span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Commerce</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-6 ml-8">
          {[
            { href: "/", label: "Home" },
            { href: "/products", label: "Products" },
            { href: "/deals", label: "Deals" },
            { href: "/combo", label: "Combo" },
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

        <div className="flex items-center gap-1 md:gap-2 lg:gap-3 ml-auto flex-shrink-0">
          <form onSubmit={handleSearch} className="hidden md:flex relative">
            <Input 
              placeholder="Search..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-40 lg:w-56 bg-white/5 border-white/10 rounded-full pl-3 pr-16 focus:bg-white/10 focus:border-purple-500/50 transition-all text-xs md:text-sm ${isListening ? 'border-purple-500 bg-purple-500/10' : ''}`}
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
              className="hidden md:flex h-8 w-8 lg:h-10 lg:w-10 text-white/70 hover:text-white hover:bg-white/10 rounded-full relative"
              data-testid="wishlist-button"
            >
              <Heart className="w-4 h-4" />
            </Button>
          </Link>

          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 lg:h-10 lg:w-10 text-white/70 hover:text-white hover:bg-white/10 rounded-full relative"
            onClick={() => setIsOpen(true)}
            data-testid="cart-button"
          >
            <ShoppingCart className="w-4 h-4" />
            <AnimatePresence>
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full text-xs font-bold text-white flex items-center justify-center shadow-lg"
                >
                  {itemCount > 9 ? "9+" : itemCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Button>

          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="h-8 w-8 lg:h-10 lg:w-10 rounded-full border-2 border-purple-500/50 hover:border-purple-400 transition-all overflow-hidden flex items-center justify-center bg-gradient-to-br from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 group"
                  data-testid="profile-button"
                >
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xs font-bold text-purple-400">{user.name.charAt(0).toUpperCase()}</span>
                  )}
                </motion.button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-56 bg-[#0f0f15]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl shadow-purple-500/10 mt-2"
              >
                <div className="px-4 py-4 border-b border-white/10">
                  <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Signed in as</p>
                  <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                  <p className="text-xs text-white/40 truncate">{user.email}</p>
                </div>
                <DropdownMenuItem asChild className="focus:bg-purple-500/10 cursor-pointer">
                  <Link href="/profile" className="flex items-center gap-3 text-white text-sm px-4 py-2.5">
                    <User className="w-4 h-4 text-purple-400" />
                    My Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="focus:bg-purple-500/10 cursor-pointer">
                  <Link href="/profile" className="flex items-center gap-3 text-white text-sm px-4 py-2.5">
                    <Settings className="w-4 h-4 text-cyan-400" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <div className="my-1 border-t border-white/10" />
                <DropdownMenuItem 
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  className="focus:bg-red-500/10 cursor-pointer px-4 py-2.5"
                >
                  <LogOut className="w-4 h-4 mr-3 text-red-400" />
                  <span className="text-red-400 text-sm">Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="h-8 w-8 lg:h-10 lg:w-10 rounded-full border-2 border-white/20 hover:border-white/40 transition-all flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10"
                  data-testid="profile-button"
                >
                  <User className="w-4 h-4" />
                </motion.button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-52 bg-[#0f0f15]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl shadow-purple-500/10 mt-2"
              >
                <DropdownMenuItem asChild className="focus:bg-purple-500/10 cursor-pointer">
                  <Link href="/signup" className="flex items-center gap-3 text-white text-sm px-4 py-2.5">
                    <LogIn className="w-4 h-4 text-cyan-400" />
                    Login
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="focus:bg-purple-500/10 cursor-pointer">
                  <Link href="/signup" className="flex items-center gap-3 text-white text-sm px-4 py-2.5">
                    <UserPlus className="w-4 h-4 text-purple-400" />
                    Sign Up
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden text-white hover:bg-white/10 rounded-full h-8 w-8"
                data-testid="mobile-menu-button"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#0a0a0f]/95 backdrop-blur-xl border-l border-white/10 w-72 md:w-80">
              <div className="flex flex-col gap-6 mt-8">
                <form onSubmit={handleSearch} className="relative">
                  <Input 
                    placeholder="Search..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full bg-white/5 border-white/10 rounded-full pl-4 pr-16 text-sm ${isListening ? 'border-purple-500 bg-purple-500/10' : ''}`}
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
                  { href: "/combo", label: "Combo" },
                  { href: "/compare", label: "Compare" },
                  { href: "/wishlist", label: "Wishlist" },
                ].map(({ href, label }) => (
                  <Link 
                    key={href}
                    href={href}
                    className="text-base font-medium text-white/70 hover:text-white transition-colors flex items-center gap-3"
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
