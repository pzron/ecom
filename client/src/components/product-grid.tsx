import { Link } from "wouter";
import { homeProducts, categories, type Product } from "@/data/products";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, Star, Eye, Zap, ChevronRight, Sparkles, TrendingUp, Clock, Gift } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/hooks/use-cart";
import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

function generateWeightedRowPattern(length: number): number[] {
  const pattern: number[] = [];
  for (let i = 0; i < length; i++) {
    const rand = Math.random();
    if (rand < 0.45) {
      pattern.push(4);
    } else if (rand < 0.85) {
      pattern.push(5);
    } else if (rand < 0.93) {
      pattern.push(6);
    } else {
      pattern.push(7);
    }
  }
  return pattern;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

interface ProductCardProps {
  product: Product;
  index: number;
  size?: "small" | "medium" | "large";
  layout?: "default" | "featured" | "compact";
}

const colorGradients: Record<string, { bg: string; border: string; badge: string; hover: string; glow: string }> = {
  purple: { bg: "from-purple-950/40 to-indigo-950/20", border: "border-purple-500/30", badge: "bg-gradient-to-r from-purple-500 to-indigo-500", hover: "hover:border-purple-500/60 hover:from-purple-900/50", glow: "shadow-purple-500/20" },
  pink: { bg: "from-pink-950/40 to-rose-950/20", border: "border-pink-500/30", badge: "bg-gradient-to-r from-pink-500 to-rose-500", hover: "hover:border-pink-500/60 hover:from-pink-900/50", glow: "shadow-pink-500/20" },
  cyan: { bg: "from-cyan-950/40 to-blue-950/20", border: "border-cyan-500/30", badge: "bg-gradient-to-r from-cyan-500 to-blue-500", hover: "hover:border-cyan-500/60 hover:from-cyan-900/50", glow: "shadow-cyan-500/20" },
  emerald: { bg: "from-emerald-950/40 to-teal-950/20", border: "border-emerald-500/30", badge: "bg-gradient-to-r from-emerald-500 to-teal-500", hover: "hover:border-emerald-500/60 hover:from-emerald-900/50", glow: "shadow-emerald-500/20" },
  amber: { bg: "from-amber-950/40 to-orange-950/20", border: "border-amber-500/30", badge: "bg-gradient-to-r from-amber-500 to-orange-500", hover: "hover:border-amber-500/60 hover:from-amber-900/50", glow: "shadow-amber-500/20" },
  red: { bg: "from-red-950/40 to-pink-950/20", border: "border-red-500/30", badge: "bg-gradient-to-r from-red-500 to-pink-500", hover: "hover:border-red-500/60 hover:from-red-900/50", glow: "shadow-red-500/20" },
  green: { bg: "from-green-950/40 to-emerald-950/20", border: "border-green-500/30", badge: "bg-gradient-to-r from-green-500 to-emerald-500", hover: "hover:border-green-500/60 hover:from-green-900/50", glow: "shadow-green-500/20" },
  yellow: { bg: "from-yellow-950/40 to-amber-950/20", border: "border-yellow-500/30", badge: "bg-gradient-to-r from-yellow-500 to-amber-500", hover: "hover:border-yellow-500/60 hover:from-yellow-900/50", glow: "shadow-yellow-500/20" },
  blue: { bg: "from-blue-950/40 to-cyan-950/20", border: "border-blue-500/30", badge: "bg-gradient-to-r from-blue-500 to-cyan-500", hover: "hover:border-blue-500/60 hover:from-blue-900/50", glow: "shadow-blue-500/20" },
  violet: { bg: "from-violet-950/40 to-purple-950/20", border: "border-violet-500/30", badge: "bg-gradient-to-r from-violet-500 to-purple-500", hover: "hover:border-violet-500/60 hover:from-violet-900/50", glow: "shadow-violet-500/20" },
};

function ProductCard({ product, index, size = "medium", layout = "default" }: ProductCardProps) {
  const { addItem } = useCart();
  const { toast } = useToast();
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const colorKey = (product.badgeColor || "purple") as keyof typeof colorGradients;
  const gradient = colorGradients[colorKey] || colorGradients.purple;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAddingToCart(true);
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
    });

    toast({
      title: "Added to Cart!",
      description: `${product.name} has been added to your cart.`,
      duration: 2000,
    });
    
    setTimeout(() => setIsAddingToCart(false), 500);
  };

  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  const isFeaturedLayout = layout === "featured";
  const isCompactLayout = layout === "compact";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.015, 0.15) }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className={`h-full ${isFeaturedLayout ? 'col-span-2 row-span-2' : ''}`}
    >
      <Link href={`/product/${product.id}`}>
        <motion.div
          animate={{ 
            scale: isHovered ? 1.02 : 1,
            boxShadow: isHovered ? `0 20px 40px ${gradient.glow}` : "0 4px 12px rgba(0, 0, 0, 0.15)"
          }}
          transition={{ duration: 0.25 }}
        >
          <Card 
            className={`relative overflow-hidden group cursor-pointer h-full bg-gradient-to-br ${gradient.bg} border-white/10 ${gradient.border} transition-all duration-300 ${gradient.hover} backdrop-blur-sm rounded-2xl`}
            data-testid={`product-card-${product.id}`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient.badge} opacity-0 group-hover:opacity-5 transition-all duration-300`} />
          
            <CardContent className="p-0 relative">
              <div className="absolute top-2.5 left-2.5 z-20 flex flex-col gap-1.5">
                {product.isNew && (
                  <Badge className={`${gradient.badge} text-white border-none text-[10px] px-2 py-0.5 shadow-lg font-medium`}>
                    <Zap className="w-2.5 h-2.5 mr-0.5" /> NEW
                  </Badge>
                )}
                {product.isBestseller && (
                  <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-none text-[10px] px-2 py-0.5 shadow-lg font-medium">
                    <TrendingUp className="w-2.5 h-2.5 mr-0.5" /> TOP
                  </Badge>
                )}
                {discount > 0 && (
                  <Badge className="bg-gradient-to-r from-red-500 to-rose-500 text-white border-none text-[10px] px-2 py-0.5 shadow-lg font-medium">
                    -{discount}%
                  </Badge>
                )}
                {product.has3D && (
                  <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-none text-[10px] px-2 py-0.5 shadow-lg font-medium">
                    <Sparkles className="w-2.5 h-2.5 mr-0.5" /> 3D
                  </Badge>
                )}
              </div>
            
              <motion.div 
                className="absolute top-2.5 right-2.5 z-20 flex flex-col gap-1.5"
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 8 }}
                transition={{ duration: 0.2 }}
              >
                <Button 
                  size="icon" 
                  className="h-7 w-7 rounded-full bg-white/10 backdrop-blur-xl hover:bg-white/25 text-white border border-white/20 transition-all hover:scale-110"
                  onClick={(e) => { 
                    e.preventDefault(); 
                    e.stopPropagation();
                    toast({
                      title: "Added to Wishlist!",
                      description: `${product.name} saved to your wishlist.`,
                      duration: 2000,
                    });
                  }}
                  data-testid={`wishlist-${product.id}`}
                >
                  <Heart className="w-3 h-3" />
                </Button>
                <Button 
                  size="icon" 
                  className="h-7 w-7 rounded-full bg-white/10 backdrop-blur-xl hover:bg-white/25 text-white border border-white/20 transition-all hover:scale-110"
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                  data-testid={`quick-view-${product.id}`}
                >
                  <Eye className="w-3 h-3" />
                </Button>
              </motion.div>

              <div className={`${isFeaturedLayout ? 'aspect-[4/3]' : isCompactLayout ? 'aspect-[5/4]' : 'aspect-square'} overflow-hidden bg-gradient-to-br from-gray-900/80 to-black/60 p-3 flex items-center justify-center relative group/image rounded-t-2xl`}>
                <motion.div
                  className="relative w-full h-full flex items-center justify-center"
                  animate={{ 
                    rotateY: isHovered ? [0, 6, -6, 0] : 0,
                    scale: isHovered ? 1.08 : 1,
                  }}
                  transition={{ 
                    rotateY: { duration: 0.6, ease: "easeInOut" },
                    scale: { duration: 0.3, type: "spring", stiffness: 200, damping: 20 }
                  }}
                  style={{ perspective: 1000 }}
                >
                  <motion.img 
                    src={product.image} 
                    alt={product.name}
                    className="object-contain w-full h-full rounded-lg max-h-full"
                    loading="lazy"
                    style={{
                      borderRadius: isHovered ? '16px' : '8px',
                      transition: 'border-radius 0.3s ease-in-out'
                    }}
                  />
                </motion.div>
              
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex items-end justify-center p-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button 
                    className={`w-full rounded-xl ${gradient.badge} text-white font-semibold text-xs shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] py-2`}
                    onClick={handleAddToCart}
                    data-testid={`add-to-cart-${product.id}`}
                  >
                    {isAddingToCart ? (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex items-center gap-2"
                      >
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }} className="w-3 h-3 border-2 border-white border-t-transparent rounded-full" />
                      </motion.span>
                    ) : (
                      <><ShoppingCart className="w-3.5 h-3.5 mr-1.5" /> Add to Cart</>
                    )}
                  </Button>
                </motion.div>
              </div>
            </CardContent>

            <CardFooter className={`flex flex-col items-start gap-1.5 ${isCompactLayout ? 'p-2.5' : 'p-3'} bg-gradient-to-b from-white/5 to-white/[0.02] border-t border-white/10`}>
              <div className="w-full">
                <p className={`${isCompactLayout ? 'text-xs' : 'text-sm'} font-semibold text-white line-clamp-2 group-hover:text-purple-300 transition-colors leading-tight`}>
                  {product.name}
                </p>
                {!isCompactLayout && (
                  <p className="text-[10px] text-white/50 mt-0.5 truncate">{product.vendorName}</p>
                )}
              </div>

              <div className="flex items-center gap-1 w-full">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-2.5 h-2.5 ${i < Math.round(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-white/20'}`}
                    />
                  ))}
                </div>
                <span className="text-[10px] text-white/60">({product.reviews.toLocaleString()})</span>
              </div>

              <div className="w-full flex items-center gap-2">
                <span className={`${isCompactLayout ? 'text-sm' : 'text-base'} font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent`}>
                  ৳{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-[10px] text-white/40 line-through">
                    ৳{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </Link>
    </motion.div>
  );
}

interface CategorySectionProps {
  title: string;
  icon?: React.ReactNode;
  products: Product[];
  layout: "grid-4" | "grid-5" | "grid-6" | "grid-7" | "mixed" | "featured";
  showViewAll?: boolean;
  categorySlug?: string;
}

function CategorySection({ title, icon, products, layout, showViewAll = true, categorySlug }: CategorySectionProps) {
  const getGridClass = () => {
    switch (layout) {
      case "grid-4": return "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
      case "grid-5": return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5";
      case "grid-6": return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6";
      case "grid-7": return "grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7";
      case "mixed": return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5";
      case "featured": return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5";
      default: return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="mb-10"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30">
              {icon}
            </div>
          )}
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-white">{title}</h3>
            <p className="text-xs text-white/50 mt-0.5">{products.length} products</p>
          </div>
        </div>
        {showViewAll && categorySlug && (
          <Link href={`/products?category=${categorySlug}`}>
            <Button variant="ghost" className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 text-sm">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        )}
      </div>
      
      <div className={`grid ${getGridClass()} gap-3 md:gap-4`}>
        {products.map((product, idx) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            index={idx}
            layout={layout === "featured" && idx === 0 ? "featured" : layout === "mixed" ? "compact" : "default"}
          />
        ))}
      </div>
    </motion.div>
  );
}

interface DynamicRowProps {
  products: Product[];
  startIndex: number;
  itemCount: number;
  rowIndex?: number;
}

function DynamicRow({ products, startIndex, itemCount, rowIndex = 0 }: DynamicRowProps) {
  const rowProducts = products.slice(startIndex, startIndex + itemCount);
  
  const gridCols = useMemo(() => {
    switch(itemCount) {
      case 4: return "grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4";
      case 5: return "grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5";
      case 6: return "grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-6";
      case 7: return "grid-cols-2 sm:grid-cols-4 md:grid-cols-7 lg:grid-cols-7";
      default: return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5";
    }
  }, [itemCount]);

  const rowStyle = useMemo(() => {
    const styles = [
      "gap-3 md:gap-4",
      "gap-2 md:gap-3",
      "gap-4 md:gap-5",
      "gap-3 md:gap-4",
      "gap-2 md:gap-4",
    ];
    return styles[rowIndex % styles.length];
  }, [rowIndex]);

  return (
    <motion.div 
      layout
      className={`grid ${gridCols} ${rowStyle} mb-5`}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, layout: { duration: 0.6, type: "spring", stiffness: 100, damping: 15 } }}
    >
      {rowProducts.map((product, idx) => (
        <motion.div
          key={product.id}
          layout
          layoutId={`product-${product.id}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ 
            duration: 0.4,
            layout: { duration: 0.5, type: "spring", stiffness: 120, damping: 18 }
          }}
        >
          <ProductCard 
            product={product} 
            index={startIndex + idx}
            layout={itemCount >= 6 ? "compact" : "default"}
            size={itemCount <= 4 ? "large" : itemCount >= 7 ? "small" : "medium"}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

export function ProductGrid() {
  const [visibleProducts, setVisibleProducts] = useState(60);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"mixed" | "grid">("mixed");
  const [dynamicPattern, setDynamicPattern] = useState<number[]>(() => generateWeightedRowPattern(20));
  const [shuffleKey, setShuffleKey] = useState(0);
  const { toast } = useToast();
  const patternIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const shuffleIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (viewMode === "mixed") {
      patternIntervalRef.current = setInterval(() => {
        setDynamicPattern(generateWeightedRowPattern(20));
      }, 58000);

      shuffleIntervalRef.current = setInterval(() => {
        setShuffleKey(prev => prev + 1);
      }, 65000);
    }

    return () => {
      if (patternIntervalRef.current) clearInterval(patternIntervalRef.current);
      if (shuffleIntervalRef.current) clearInterval(shuffleIntervalRef.current);
    };
  }, [viewMode]);
  
  const categorizedProducts = useMemo(() => {
    const grouped: Record<string, Product[]> = {};
    homeProducts.forEach(product => {
      if (!grouped[product.categorySlug]) {
        grouped[product.categorySlug] = [];
      }
      grouped[product.categorySlug].push(product);
    });
    return grouped;
  }, []);

  const featuredCategories = useMemo(() => {
    const categoryOrder = ["electronics", "cosmetics-items", "fashion", "health-items", "tea-coffee", "shoes"];
    return categoryOrder
      .filter(slug => categorizedProducts[slug]?.length > 0)
      .slice(0, 4)
      .map(slug => ({
        slug,
        category: categories.find(c => c.slug === slug),
        products: categorizedProducts[slug].slice(0, 8)
      }));
  }, [categorizedProducts]);

  const mixedProducts = useMemo(() => {
    const result: Product[] = [];
    const categoryKeys = Object.keys(categorizedProducts);
    let indices: Record<string, number> = {};
    categoryKeys.forEach(key => indices[key] = 0);
    
    while (result.length < visibleProducts && result.length < homeProducts.length) {
      for (const key of categoryKeys) {
        if (result.length >= visibleProducts) break;
        if (indices[key] < categorizedProducts[key].length) {
          result.push(categorizedProducts[key][indices[key]]);
          indices[key]++;
        }
      }
    }
    return shuffleKey > 0 ? shuffleArray(result) : result;
  }, [categorizedProducts, visibleProducts, shuffleKey]);

  const rows = useMemo(() => {
    const result: { start: number; count: number }[] = [];
    let currentIndex = 0;
    let patternIndex = 0;
    
    while (currentIndex < visibleProducts && currentIndex < mixedProducts.length) {
      const count = Math.min(dynamicPattern[patternIndex % dynamicPattern.length], mixedProducts.length - currentIndex);
      result.push({ start: currentIndex, count });
      currentIndex += count;
      patternIndex++;
    }
    
    return result;
  }, [visibleProducts, mixedProducts.length, dynamicPattern]);

  const loadMore = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleProducts(prev => Math.min(prev + 60, homeProducts.length));
      setIsLoading(false);
      toast({
        title: "Products Loaded!",
        description: "More products have been loaded successfully.",
        duration: 2000,
      });
    }, 400);
  }, [toast]);

  const totalProducts = homeProducts.length;
  const remainingProducts = Math.max(0, totalProducts - visibleProducts);

  return (
    <section className="py-10 px-4 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent">
      <div className="container mx-auto max-w-[1900px]">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-purple-400" />
                Featured Collection
              </h2>
              <p className="text-white/60 mt-2 text-sm">
                Curated excellence, delivered to you
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "mixed" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("mixed")}
                className={`w-10 h-10 rounded-full ${viewMode === "mixed" ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/25" : "border-white/20 text-white/70 hover:bg-white/10 backdrop-blur-sm"}`}
                title="Mixed View"
              >
                <Sparkles className="w-5 h-5" />
              </Button>
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className={`w-10 h-10 rounded-full ${viewMode === "grid" ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/25" : "border-white/20 text-white/70 hover:bg-white/10 backdrop-blur-sm"}`}
                title="By Category"
              >
                <TrendingUp className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {viewMode === "grid" ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {featuredCategories.map(({ slug, category, products }) => (
                <CategorySection
                  key={slug}
                  title={category?.name || slug}
                  icon={<span className="text-xl">{category?.icon}</span>}
                  products={products}
                  layout="grid-5"
                  categorySlug={slug}
                />
              ))}
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-8"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30">
                    <TrendingUp className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white">More Products</h3>
                    <p className="text-xs text-white/50 mt-0.5">Discover more from all categories</p>
                  </div>
                </div>
                
                {rows.slice(0, Math.ceil(visibleProducts / 30)).map((row, idx) => (
                  <DynamicRow 
                    key={`row-${idx}`}
                    products={mixedProducts}
                    startIndex={row.start}
                    itemCount={row.count}
                    rowIndex={idx}
                  />
                ))}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="mixed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {rows.map((row, idx) => (
                <DynamicRow 
                  key={`row-${idx}`}
                  products={mixedProducts}
                  startIndex={row.start}
                  itemCount={row.count}
                  rowIndex={idx}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {visibleProducts < totalProducts && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-4 mt-10"
          >
            <div className="w-full max-w-md bg-white/5 rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                initial={{ width: 0 }}
                animate={{ width: `${(visibleProducts / totalProducts) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="text-white/50 text-sm">
              {((visibleProducts / totalProducts) * 100).toFixed(0)}% loaded
            </p>
            <Button 
              onClick={loadMore}
              disabled={isLoading}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full px-10 py-3 font-semibold shadow-lg shadow-purple-500/30 transition-all hover:scale-105"
            >
              {isLoading ? (
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                />
              ) : null}
              {isLoading ? "Loading..." : `Load More (${remainingProducts.toLocaleString()} remaining)`}
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
