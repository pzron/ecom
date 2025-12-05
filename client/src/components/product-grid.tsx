import { Link } from "wouter";
import { homeProducts, type Product } from "@/data/products";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, Star, Eye, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/hooks/use-cart";
import { useState, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
  index: number;
  size?: "small" | "medium" | "large";
}

const colorGradients: Record<string, { bg: string; border: string; badge: string; hover: string }> = {
  purple: { bg: "from-purple-950/40 to-indigo-950/20", border: "border-purple-500/30", badge: "bg-gradient-to-r from-purple-500 to-indigo-500", hover: "hover:border-purple-500/60 hover:from-purple-900/50" },
  pink: { bg: "from-pink-950/40 to-rose-950/20", border: "border-pink-500/30", badge: "bg-gradient-to-r from-pink-500 to-rose-500", hover: "hover:border-pink-500/60 hover:from-pink-900/50" },
  cyan: { bg: "from-cyan-950/40 to-blue-950/20", border: "border-cyan-500/30", badge: "bg-gradient-to-r from-cyan-500 to-blue-500", hover: "hover:border-cyan-500/60 hover:from-cyan-900/50" },
  emerald: { bg: "from-emerald-950/40 to-teal-950/20", border: "border-emerald-500/30", badge: "bg-gradient-to-r from-emerald-500 to-teal-500", hover: "hover:border-emerald-500/60 hover:from-emerald-900/50" },
  amber: { bg: "from-amber-950/40 to-orange-950/20", border: "border-amber-500/30", badge: "bg-gradient-to-r from-amber-500 to-orange-500", hover: "hover:border-amber-500/60 hover:from-amber-900/50" },
  red: { bg: "from-red-950/40 to-pink-950/20", border: "border-red-500/30", badge: "bg-gradient-to-r from-red-500 to-pink-500", hover: "hover:border-red-500/60 hover:from-red-900/50" },
  green: { bg: "from-green-950/40 to-emerald-950/20", border: "border-green-500/30", badge: "bg-gradient-to-r from-green-500 to-emerald-500", hover: "hover:border-green-500/60 hover:from-green-900/50" },
  yellow: { bg: "from-yellow-950/40 to-amber-950/20", border: "border-yellow-500/30", badge: "bg-gradient-to-r from-yellow-500 to-amber-500", hover: "hover:border-yellow-500/60 hover:from-yellow-900/50" },
  blue: { bg: "from-blue-950/40 to-cyan-950/20", border: "border-blue-500/30", badge: "bg-gradient-to-r from-blue-500 to-cyan-500", hover: "hover:border-blue-500/60 hover:from-blue-900/50" },
  violet: { bg: "from-violet-950/40 to-purple-950/20", border: "border-violet-500/30", badge: "bg-gradient-to-r from-violet-500 to-purple-500", hover: "hover:border-violet-500/60 hover:from-violet-900/50" },
};

function ProductCard({ product, index, size = "medium" }: ProductCardProps) {
  const { addItem } = useCart();
  const { toast } = useToast();
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [imageRotation, setImageRotation] = useState(0);

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.02, 0.2) }}
      onMouseEnter={() => {
        setIsHovered(true);
        setImageRotation(5);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setImageRotation(0);
      }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="h-full"
    >
      <Link href={`/product/${product.id}`}>
        <motion.div
          animate={{ 
            scale: isHovered ? 1.03 : 1,
            boxShadow: isHovered ? "0 25px 50px rgba(168, 85, 247, 0.35)" : "0 5px 15px rgba(0, 0, 0, 0.2)"
          }}
          transition={{ duration: 0.3 }}
        >
          <Card 
            className={`relative overflow-hidden group cursor-pointer h-full bg-gradient-to-br ${gradient.bg} border-white/10 ${gradient.border} transition-all duration-300 ${gradient.hover} backdrop-blur-sm rounded-xl`}
            data-testid={`product-card-${product.id}`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient.badge} opacity-0 group-hover:opacity-5 transition-all duration-300`} />
          
            <CardContent className="p-0 relative">
              <div className="absolute top-2 left-2 z-20 flex flex-col gap-1.5">
                {product.isNew && (
                  <Badge className={`${gradient.badge} text-white border-none text-xs shadow-lg`}>
                    <Zap className="w-3 h-3 mr-0.5" /> New
                  </Badge>
                )}
                {product.isBestseller && (
                  <Badge className={`${gradient.badge} text-white border-none text-xs shadow-lg`}>
                    Bestseller
                  </Badge>
                )}
                {discount > 0 && (
                  <Badge className="bg-red-500/90 text-white border-none text-xs shadow-lg">
                    -{discount}%
                  </Badge>
                )}
                {product.has3D && (
                  <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-none text-xs shadow-lg">
                    3D
                  </Badge>
                )}
              </div>
            
              <motion.div 
                className="absolute top-2 right-2 z-20 flex flex-col gap-1.5"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 10 }}
                transition={{ duration: 0.2 }}
              >
                <Button 
                  size="icon" 
                  className="h-8 w-8 rounded-full bg-white/10 backdrop-blur-xl hover:bg-white/20 text-white border border-white/20 transition-all hover:scale-110"
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
                  <Heart className="w-3.5 h-3.5" />
                </Button>
                <Button 
                  size="icon" 
                  className="h-8 w-8 rounded-full bg-white/10 backdrop-blur-xl hover:bg-white/20 text-white border border-white/20 transition-all hover:scale-110"
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                  data-testid={`quick-view-${product.id}`}
                >
                  <Eye className="w-3.5 h-3.5" />
                </Button>
              </motion.div>

              <div className="aspect-square overflow-hidden bg-gradient-to-br from-gray-900 to-black p-4 flex items-center justify-center relative group/image rounded-lg">
                <motion.div
                  className="relative w-full h-full"
                  animate={{ 
                    rotateY: isHovered ? [0, 8, -8, 0] : 0,
                    scale: isHovered ? 1.12 : 1,
                  }}
                  transition={{ 
                    rotateY: { duration: 0.8, ease: "easeInOut" },
                    scale: { duration: 0.4, type: "spring", stiffness: 200, damping: 20 }
                  }}
                  style={{ perspective: 1000 }}
                >
                  <motion.img 
                    src={product.image} 
                    alt={product.name}
                    className="object-contain w-full h-full rounded-md"
                    style={{
                      borderRadius: isHovered ? '20px' : '8px',
                      transition: 'border-radius 0.4s ease-in-out'
                    }}
                  />
                </motion.div>
              
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end justify-center p-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button 
                    className={`w-full rounded-lg ${gradient.badge} text-white font-semibold text-sm shadow-lg transition-all hover:shadow-xl hover:scale-105`}
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
                      <><ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart</>
                    )}
                  </Button>
                </motion.div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col items-start gap-2 p-3 bg-gradient-to-b from-white/5 to-white/[0.02] border-t border-white/10">
              <div className="w-full">
                <p className="text-sm font-semibold text-white line-clamp-2 group-hover:text-purple-300 transition-colors">
                  {product.name}
                </p>
                <p className="text-xs text-white/50 mt-0.5">{product.vendorName}</p>
              </div>

              <div className="flex items-center gap-1 w-full">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${i < Math.round(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-white/20'}`}
                    />
                  ))}
                </div>
                <span className="text-xs text-white/60">({product.reviews})</span>
              </div>

              <div className="w-full flex items-center gap-2">
                <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  ৳{product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-white/40 line-through">
                    ৳{product.originalPrice}
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

function DynamicRow({ products, startIndex, itemCount }: { products: Product[]; startIndex: number; itemCount: number }) {
  const rowProducts = products.slice(startIndex, startIndex + itemCount);
  
  const gridCols = useMemo(() => {
    switch(itemCount) {
      case 4: return "grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4";
      case 5: return "grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5";
      case 6: return "grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-6";
      case 7: return "grid-cols-2 sm:grid-cols-4 md:grid-cols-7 lg:grid-cols-7";
      default: return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4";
    }
  }, [itemCount]);

  return (
    <div className={`grid ${gridCols} gap-4 md:gap-5 mb-6`}>
      {rowProducts.map((product, idx) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          index={startIndex + idx}
        />
      ))}
    </div>
  );
}

export function ProductGrid() {
  const [visibleProducts, setVisibleProducts] = useState(60);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const rowPattern = [4, 5, 6, 4, 7, 5, 4, 6, 5, 7, 4, 5, 6, 4, 7];
  
  const rows = useMemo(() => {
    const result: { start: number; count: number }[] = [];
    let currentIndex = 0;
    let patternIndex = 0;
    
    while (currentIndex < visibleProducts && currentIndex < homeProducts.length) {
      const count = Math.min(rowPattern[patternIndex % rowPattern.length], homeProducts.length - currentIndex);
      result.push({ start: currentIndex, count });
      currentIndex += count;
      patternIndex++;
    }
    
    return result;
  }, [visibleProducts]);

  const loadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleProducts(prev => Math.min(prev + 40, homeProducts.length));
      setIsLoading(false);
      toast({
        title: "Products Loaded!",
        description: "More products have been loaded successfully.",
        duration: 2000,
      });
    }, 500);
  };

  return (
    <section className="py-12 px-4 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent">
      <div className="container mx-auto max-w-[1800px]">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 flex items-center justify-between"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
              Featured Collection
            </h2>
            <p className="text-white/60 mt-2">
              Showing {Math.min(visibleProducts, homeProducts.length)} of {homeProducts.length}+ products
            </p>
          </div>
        </motion.div>

        {rows.map((row, idx) => (
          <DynamicRow 
            key={`row-${idx}`}
            products={homeProducts}
            startIndex={row.start}
            itemCount={row.count}
          />
        ))}

        {visibleProducts < homeProducts.length && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mt-12"
          >
            <Button 
              onClick={loadMore}
              disabled={isLoading}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full px-8 py-3 font-semibold shadow-lg shadow-purple-500/30 transition-all hover:scale-105"
            >
              {isLoading ? (
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                />
              ) : null}
              {isLoading ? "Loading..." : `Load More Products (${homeProducts.length - visibleProducts} remaining)`}
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
