import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { combos, comboFilterCategories, type Combo } from "@/data/combos";
import { useState, useMemo } from "react";
import { 
  ShoppingCart, 
  Heart, 
  Star, 
  Package, 
  Sparkles, 
  Filter, 
  Grid, 
  List,
  ChevronDown,
  Percent,
  Gift,
  Zap,
  TrendingUp,
  ShoppingBasket,
  X
} from "lucide-react";
import { useCart } from "@/hooks/use-cart";

interface BasketProductImageProps {
  products: { id: string; name: string; image: string; originalPrice: number }[];
  isHovered: boolean;
}

function BasketProductImage({ products, isHovered }: BasketProductImageProps) {
  const displayProducts = products.slice(0, 5);
  
  return (
    <div className="relative w-full h-72 bg-gradient-to-br from-slate-900/50 to-slate-800/30 rounded-2xl overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.1),transparent_70%)]" />
      
      <svg
        viewBox="0 0 200 180"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85%] h-auto"
        style={{ filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.4))" }}
      >
        <defs>
          <linearGradient id="basketGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#92400e" />
            <stop offset="50%" stopColor="#78350f" />
            <stop offset="100%" stopColor="#451a03" />
          </linearGradient>
          <linearGradient id="basketRim" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#92400e" />
          </linearGradient>
          <linearGradient id="handleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#a16207" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>
        </defs>
        
        <ellipse cx="100" cy="160" rx="75" ry="15" fill="rgba(0,0,0,0.3)" />
        
        <path
          d="M30 60 Q20 100 35 145 Q50 165 100 165 Q150 165 165 145 Q180 100 170 60 L30 60"
          fill="url(#basketGradient)"
          stroke="#78350f"
          strokeWidth="2"
        />
        
        <rect x="25" y="55" width="150" height="12" rx="6" fill="url(#basketRim)" />
        
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <line
            key={i}
            x1={42 + i * 20}
            y1="67"
            x2={38 + i * 20}
            y2="155"
            stroke="#451a03"
            strokeWidth="2"
            opacity="0.6"
          />
        ))}
        
        {[0, 1, 2, 3].map((i) => (
          <path
            key={i}
            d={`M35 ${85 + i * 20} Q100 ${95 + i * 20} 165 ${85 + i * 20}`}
            stroke="#451a03"
            strokeWidth="1.5"
            fill="none"
            opacity="0.5"
          />
        ))}
        
        <path
          d="M45 55 Q30 25 100 10 Q170 25 155 55"
          stroke="url(#handleGradient)"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M45 55 Q30 25 100 10 Q170 25 155 55"
          stroke="#b45309"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>
      
      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[75%] h-[55%] flex flex-wrap justify-center items-end gap-1 px-2">
        {displayProducts.map((product, index) => {
          const positions = [
            { x: 0, y: 0, rotate: -10, scale: 0.9 },
            { x: 40, y: -5, rotate: 8, scale: 0.85 },
            { x: -35, y: 5, rotate: -5, scale: 0.88 },
            { x: 20, y: 10, rotate: 12, scale: 0.82 },
            { x: -20, y: 15, rotate: -8, scale: 0.8 },
          ];
          const pos = positions[index] || positions[0];
          
          return (
            <motion.div
              key={product.id}
              className="absolute"
              style={{
                left: `calc(50% + ${pos.x}px)`,
                top: `calc(35% + ${pos.y}px)`,
                transform: `translateX(-50%) rotate(${pos.rotate}deg) scale(${pos.scale})`,
                zIndex: 5 - index,
              }}
              initial={{ y: -50, opacity: 0, scale: 0 }}
              animate={{ 
                y: isHovered ? pos.y - 10 : pos.y, 
                opacity: 1, 
                scale: isHovered ? pos.scale + 0.05 : pos.scale,
              }}
              transition={{ 
                delay: index * 0.1, 
                type: "spring", 
                stiffness: 200, 
                damping: 15 
              }}
            >
              <div 
                className="w-16 h-16 rounded-xl overflow-hidden border-2 border-white/20 shadow-lg bg-white/10 backdrop-blur-sm"
                style={{ 
                  boxShadow: isHovered 
                    ? "0 8px 25px rgba(139,92,246,0.4), 0 4px 10px rgba(0,0,0,0.3)" 
                    : "0 4px 15px rgba(0,0,0,0.3)" 
                }}
              >
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {products.length > 5 && (
        <motion.div 
          className="absolute top-4 right-4 bg-purple-500/90 text-white text-xs font-bold px-2 py-1 rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          +{products.length - 5} more
        </motion.div>
      )}
      
      <motion.div 
        className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-gradient-to-r from-amber-600/90 to-orange-600/90 px-3 py-1.5 rounded-full shadow-lg"
        animate={{ y: isHovered ? -5 : 0 }}
      >
        <ShoppingBasket className="w-4 h-4 text-white" />
        <span className="text-white font-semibold text-sm">{products.length} items</span>
      </motion.div>
    </div>
  );
}

interface ComboCardProps {
  combo: Combo;
  index: number;
  viewMode: "grid" | "list";
}

function ComboCard({ combo, index, viewMode }: ComboCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    combo.products.forEach(product => {
      addItem({
        id: product.id,
        name: product.name,
        price: product.originalPrice,
        image: product.image,
      }, 1);
    });
  };

  if (viewMode === "list") {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
        className="bg-gradient-to-r from-slate-900/80 to-slate-800/60 rounded-2xl border border-white/10 overflow-hidden hover:border-purple-500/50 transition-all"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex flex-col md:flex-row">
          <div className="md:w-80 flex-shrink-0 p-4">
            <BasketProductImage products={combo.products} isHovered={isHovered} />
          </div>
          
          <div className="flex-1 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-3">
                <div>
                  {combo.badge && (
                    <Badge className={`bg-gradient-to-r ${combo.badgeColor} text-white border-0 mb-2`}>
                      {combo.badge}
                    </Badge>
                  )}
                  <h3 className="text-xl font-bold text-white">{combo.name}</h3>
                  <p className="text-white/60 text-sm mt-1">{combo.category}</p>
                </div>
                <button 
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-2 rounded-full transition-all ${isWishlisted ? "bg-pink-500 text-white" : "bg-white/10 text-white/60 hover:bg-white/20"}`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
                </button>
              </div>
              
              <p className="text-white/70 text-sm mb-4">{combo.description}</p>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-white font-semibold">{combo.rating}</span>
                  <span className="text-white/50 text-sm">({combo.reviews})</span>
                </div>
                <div className="flex items-center gap-1 text-green-400">
                  <Percent className="w-4 h-4" />
                  <span className="font-semibold">Save {combo.savingsPercent}%</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-white">৳{combo.comboPrice.toLocaleString()}</span>
                  <span className="text-lg text-white/40 line-through">৳{combo.originalPrice.toLocaleString()}</span>
                </div>
                <p className="text-green-400 text-sm font-medium">You save ৳{combo.savings.toLocaleString()}</p>
              </div>
              
              <Button 
                onClick={handleAddToCart}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add Combo to Cart
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group bg-gradient-to-br from-slate-900/80 to-slate-800/60 rounded-2xl border border-white/10 overflow-hidden hover:border-purple-500/50 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {combo.badge && (
          <div className={`absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${combo.badgeColor}`}>
            {combo.badge}
          </div>
        )}
        
        <button 
          onClick={() => setIsWishlisted(!isWishlisted)}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-all ${isWishlisted ? "bg-pink-500 text-white" : "bg-black/30 backdrop-blur-sm text-white/70 hover:bg-black/50 hover:text-white"}`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
        </button>
        
        {combo.isLimited && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 px-2 py-1 bg-red-500/90 rounded-full text-[10px] font-bold text-white flex items-center gap-1">
            <Zap className="w-3 h-3" /> Limited Stock
          </div>
        )}
        
        <BasketProductImage products={combo.products} isHovered={isHovered} />
      </div>
      
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-purple-400 font-medium uppercase tracking-wider">{combo.category}</span>
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="text-white text-sm font-medium">{combo.rating}</span>
            <span className="text-white/40 text-xs">({combo.reviews})</span>
          </div>
        </div>
        
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-purple-300 transition-colors">
          {combo.name}
        </h3>
        
        <p className="text-white/60 text-sm mb-4 line-clamp-2">{combo.description}</p>
        
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg px-3 py-2 mb-4 border border-green-500/30">
          <div className="flex items-center justify-between">
            <span className="text-green-400 text-sm font-medium flex items-center gap-1">
              <Gift className="w-4 h-4" />
              Save ৳{combo.savings.toLocaleString()}
            </span>
            <span className="bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {combo.savingsPercent}% OFF
            </span>
          </div>
        </div>
        
        <div className="flex items-end justify-between mb-4">
          <div>
            <span className="text-white/40 text-xs line-through block">৳{combo.originalPrice.toLocaleString()}</span>
            <span className="text-2xl font-bold text-white">৳{combo.comboPrice.toLocaleString()}</span>
          </div>
          <div className="text-right">
            <span className="text-white/50 text-xs block">Includes</span>
            <span className="text-purple-400 font-semibold">{combo.products.length} products</span>
          </div>
        </div>
        
        <Button 
          onClick={handleAddToCart}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-semibold py-3 group/btn"
        >
          <ShoppingCart className="w-4 h-4 mr-2 group-hover/btn:animate-bounce" />
          Add to Cart
        </Button>
      </div>
    </motion.div>
  );
}

export default function ComboPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const filteredCombos = useMemo(() => {
    let filtered = selectedCategory === "all" 
      ? combos 
      : combos.filter(c => c.category === selectedCategory);

    switch (sortBy) {
      case "price-low":
        filtered = [...filtered].sort((a, b) => a.comboPrice - b.comboPrice);
        break;
      case "price-high":
        filtered = [...filtered].sort((a, b) => b.comboPrice - a.comboPrice);
        break;
      case "savings":
        filtered = [...filtered].sort((a, b) => b.savingsPercent - a.savingsPercent);
        break;
      case "rating":
        filtered = [...filtered].sort((a, b) => b.rating - a.rating);
        break;
      case "popular":
        filtered = [...filtered].sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        break;
    }

    return filtered;
  }, [selectedCategory, sortBy]);

  const stats = useMemo(() => ({
    totalCombos: combos.length,
    avgSavings: Math.round(combos.reduce((sum, c) => sum + c.savingsPercent, 0) / combos.length),
    maxSavings: Math.max(...combos.map(c => c.savingsPercent)),
    totalProducts: combos.reduce((sum, c) => sum + c.products.length, 0),
  }), []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-foreground selection:bg-primary selection:text-white">
      <Navbar />
      
      <main className="pt-20">
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-pink-900/20" />
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-pink-600/20 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 mb-6">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-purple-300 text-sm font-medium">Exclusive Combo Deals</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">
                  Super Combo
                </span>
                <br />
                <span className="text-white">Packages</span>
              </h1>
              
              <p className="text-white/60 text-lg mb-8">
                Get more for less with our carefully curated combo packages. 
                Save up to {stats.maxSavings}% on bundled products!
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <Package className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{stats.totalCombos}+</div>
                  <div className="text-white/50 text-sm">Combo Packs</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <Percent className="w-6 h-6 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{stats.avgSavings}%</div>
                  <div className="text-white/50 text-sm">Avg. Savings</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <TrendingUp className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{stats.maxSavings}%</div>
                  <div className="text-white/50 text-sm">Max Savings</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <Gift className="w-6 h-6 text-pink-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{stats.totalProducts}+</div>
                  <div className="text-white/50 text-sm">Products</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        
        <section className="py-8 border-y border-white/10 bg-slate-900/50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg text-white"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                </button>
                
                <div className="hidden lg:flex items-center gap-2 flex-wrap">
                  {comboFilterCategories.map((cat) => (
                    <Button
                      key={cat}
                      variant={selectedCategory === cat ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setSelectedCategory(cat)}
                      className={`rounded-full whitespace-nowrap ${
                        selectedCategory === cat
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                          : "text-white/60 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {cat === "all" ? "All Combos" : cat}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
                <div className="flex items-center gap-2">
                  <span className="text-white/50 text-sm">Sort:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="savings">Highest Savings</option>
                    <option value="rating">Top Rated</option>
                    <option value="popular">Most Popular</option>
                  </select>
                </div>
                
                <div className="flex items-center gap-1 bg-white/10 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-md transition-colors ${viewMode === "grid" ? "bg-purple-600 text-white" : "text-white/60 hover:text-white"}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-md transition-colors ${viewMode === "list" ? "bg-purple-600 text-white" : "text-white/60 hover:text-white"}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="text-white/50 text-sm">
                  {filteredCombos.length} combos
                </div>
              </div>
            </div>
            
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="lg:hidden overflow-hidden mt-4"
                >
                  <div className="flex flex-wrap gap-2 p-4 bg-white/5 rounded-xl">
                    {comboFilterCategories.map((cat) => (
                      <Button
                        key={cat}
                        variant={selectedCategory === cat ? "default" : "ghost"}
                        size="sm"
                        onClick={() => {
                          setSelectedCategory(cat);
                          setShowFilters(false);
                        }}
                        className={`rounded-full ${
                          selectedCategory === cat
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                            : "text-white/60 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        {cat === "all" ? "All Combos" : cat}
                      </Button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
        
        <section className="py-12">
          <div className="container mx-auto px-4">
            {viewMode === "grid" ? (
              <motion.div 
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                <AnimatePresence mode="popLayout">
                  {filteredCombos.map((combo, index) => (
                    <ComboCard key={combo.id} combo={combo} index={index} viewMode={viewMode} />
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div layout className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {filteredCombos.map((combo, index) => (
                    <ComboCard key={combo.id} combo={combo} index={index} viewMode={viewMode} />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
            
            {filteredCombos.length === 0 && (
              <div className="text-center py-20">
                <Package className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No combos found</h3>
                <p className="text-white/60">Try adjusting your filters to see more results.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
