import { Link } from "wouter";
import { products, type Product } from "@/data/products";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, Star, Eye, Box, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/hooks/use-cart";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  index: number;
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

function ProductCard({ product, index }: ProductCardProps) {
  const { addItem } = useCart();
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
    
    setTimeout(() => setIsAddingToCart(false), 500);
  };

  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.03, 0.3) }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="h-full"
    >
      <Link href={`/product/${product.id}`}>
        <Card 
          className={`relative overflow-hidden group cursor-pointer h-full bg-gradient-to-br ${gradient.bg} border-white/10 ${gradient.border} transition-all duration-300 ${gradient.hover} backdrop-blur-sm`}
          data-testid={`product-card-${product.id}`}
        >
          {/* Gradient overlay on hover */}
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient.badge} opacity-0 group-hover:opacity-5 transition-all duration-300`} />
          
          <CardContent className="p-0 relative">
            {/* Badges */}
            <div className="absolute top-2 left-2 z-20 flex flex-col gap-1.5">
              {product.isNew && (
                <Badge className={`${gradient.badge} text-white border-none text-xs shadow-lg`}>
                  <Zap className="w-3 h-3 mr-0.5" /> New
                </Badge>
              )}
              {product.isBestseller && (
                <Badge className={`${gradient.badge} text-white border-none text-xs shadow-lg`}>
                  ⭐ Bestseller
                </Badge>
              )}
              {discount > 0 && (
                <Badge className="bg-red-500/90 text-white border-none text-xs shadow-lg">
                  -{discount}%
                </Badge>
              )}
            </div>
            
            {/* Action buttons */}
            <motion.div 
              className="absolute top-2 right-2 z-20 flex flex-col gap-1.5"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 10 }}
              transition={{ duration: 0.2 }}
            >
              <Button 
                size="icon" 
                className="h-8 w-8 rounded-full bg-white/10 backdrop-blur-xl hover:bg-white/20 text-white border border-white/20 transition-all"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                data-testid={`wishlist-${product.id}`}
              >
                <Heart className="w-3.5 h-3.5" />
              </Button>
              <Button 
                size="icon" 
                className="h-8 w-8 rounded-full bg-white/10 backdrop-blur-xl hover:bg-white/20 text-white border border-white/20 transition-all"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                data-testid={`quick-view-${product.id}`}
              >
                <Eye className="w-3.5 h-3.5" />
              </Button>
            </motion.div>

            {/* Product image */}
            <div className="aspect-square overflow-hidden bg-gradient-to-br from-gray-900 to-black p-4 flex items-center justify-center relative group/image">
              <motion.img 
                src={product.image} 
                alt={product.name}
                className="object-contain w-full h-full"
                animate={{ 
                  scale: isHovered ? 1.08 : 1,
                  y: isHovered ? -5 : 0
                }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Hover overlay with CTA */}
              <motion.div 
                className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end justify-center p-3`}
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <Button 
                  className={`w-full rounded-lg ${gradient.badge} text-white font-semibold text-sm shadow-lg transition-all hover:shadow-xl`}
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

          {/* Product info */}
          <CardFooter className="flex flex-col items-start gap-2 p-3 bg-gradient-to-b from-white/5 to-white/[0.02] border-t border-white/10">
            <div className="w-full">
              <p className="text-sm font-semibold text-white line-clamp-2 group-hover:text-purple-300 transition-colors">
                {product.name}
              </p>
              <p className="text-xs text-white/50 mt-0.5">{product.vendorName}</p>
            </div>

            {/* Rating */}
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

            {/* Price */}
            <div className="w-full flex items-center gap-2">
              <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-white/40 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            {/* Stock status */}
            <div className="w-full">
              <p className={`text-xs font-medium ${product.inStock ? 'text-green-400' : 'text-red-400'}`}>
                {product.inStock ? `${product.stock} in stock` : 'Out of stock'}
              </p>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}

export function ProductGrid() {
  return (
    <section className="py-12 px-4 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent">
      <div className="container mx-auto max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2">
            Featured Collection
          </h2>
          <p className="text-white/60">Explore 272+ premium products across 34 categories</p>
        </motion.div>

        {/* Responsive grid - 4 items per line with variations */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-5">
          {products.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              index={index}
            />
          ))}
        </div>

        {/* Load more button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mt-12"
        >
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full px-8 py-3 font-semibold shadow-lg shadow-purple-500/30 transition-all hover:scale-105">
            Load More Products
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
