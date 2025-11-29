import { Link } from "wouter";
import { products, type Product } from "@/data/products";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, Star, Eye, Sparkles, Box } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/hooks/use-cart";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  index: number;
}

function ProductCard({ product, index }: ProductCardProps) {
  const { addItem } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.id}`}>
        <Card 
          className="relative overflow-hidden group cursor-pointer h-full border-white/5 bg-gradient-to-b from-white/5 to-white/[0.02] hover:border-purple-500/30 transition-all duration-500"
          data-testid={`product-card-${product.id}`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500" />
          
          <CardContent className="p-0 relative">
            <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
              {product.isNew && (
                <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-none shadow-lg shadow-cyan-500/30">
                  New
                </Badge>
              )}
              {product.isBestseller && (
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none shadow-lg shadow-purple-500/30">
                  Bestseller
                </Badge>
              )}
              {product.has3D && (
                <Badge variant="outline" className="border-white/20 bg-black/40 backdrop-blur-sm text-white/80">
                  <Box className="w-3 h-3 mr-1" /> 3D
                </Badge>
              )}
            </div>
            
            <motion.div 
              className="absolute top-3 right-3 z-10 flex flex-col gap-2"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 10 }}
              transition={{ duration: 0.2 }}
            >
              <Button 
                size="icon" 
                variant="secondary" 
                className="h-9 w-9 rounded-full bg-white/10 backdrop-blur-xl hover:bg-white/20 text-white border border-white/10"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                data-testid={`wishlist-${product.id}`}
              >
                <Heart className="w-4 h-4" />
              </Button>
              <Button 
                size="icon" 
                variant="secondary" 
                className="h-9 w-9 rounded-full bg-white/10 backdrop-blur-xl hover:bg-white/20 text-white border border-white/10"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                data-testid={`quick-view-${product.id}`}
              >
                <Eye className="w-4 h-4" />
              </Button>
            </motion.div>

            <div className="aspect-square overflow-hidden bg-gradient-to-br from-gray-900 to-black p-6 flex items-center justify-center relative">
              <motion.img 
                src={product.image} 
                alt={product.name}
                className="object-contain w-full h-full"
                animate={{ 
                  scale: isHovered ? 1.1 : 1,
                  y: isHovered ? -10 : 0
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
              
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <Button 
                  className="w-full rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold shadow-lg shadow-purple-500/30"
                  onClick={handleAddToCart}
                  data-testid={`add-to-cart-${product.id}`}
                >
                  {isAddingToCart ? (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex items-center"
                    >
                      <Sparkles className="w-4 h-4 mr-2" /> Added!
                    </motion.span>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
                    </>
                  )}
                </Button>
              </motion.div>
            </div>
          </CardContent>
          
          <CardFooter className="p-5 flex flex-col items-start gap-3 relative">
            <div className="flex items-center justify-between w-full">
              <span className="text-xs font-medium text-purple-400 uppercase tracking-wider">{product.category}</span>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-medium text-white">{product.rating}</span>
                <span className="text-xs text-white/40">({product.reviews})</span>
              </div>
            </div>
            
            <h3 className="font-semibold text-white text-lg line-clamp-1 group-hover:text-purple-300 transition-colors">
              {product.name}
            </h3>
            
            {product.colors && product.colors.length > 0 && (
              <div className="flex gap-1.5">
                {product.colors.slice(0, 4).map((color) => (
                  <div 
                    key={color.name}
                    className="w-4 h-4 rounded-full border border-white/20"
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
                {product.colors.length > 4 && (
                  <span className="text-xs text-white/40">+{product.colors.length - 4}</span>
                )}
              </div>
            )}
            
            <div className="flex items-center justify-between w-full mt-auto">
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-white">${product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-sm text-white/40 line-through">
                    ${product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              
              {product.originalPrice && (
                <Badge className="bg-green-500/20 text-green-400 border-green-500/20 text-xs">
                  Save ${(product.originalPrice - product.price).toLocaleString()}
                </Badge>
              )}
            </div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}

interface ProductGridProps {
  title?: string;
  subtitle?: string;
  productList?: Product[];
  limit?: number;
  showViewAll?: boolean;
}

export function ProductGrid({ 
  title = "Premium Collection",
  subtitle = "Discover products with stunning 3D visualization",
  productList = products,
  limit,
  showViewAll = true
}: ProductGridProps) {
  const displayProducts = limit ? productList.slice(0, limit) : productList;

  return (
    <section className="container mx-auto px-4 py-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex items-end justify-between mb-12"
      >
        <div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-3" data-testid="section-title">
            {title}
          </h2>
          <p className="text-white/50">{subtitle}</p>
        </div>
        {showViewAll && (
          <Link href="/products">
            <Button 
              variant="outline" 
              className="hidden md:flex border-white/20 hover:bg-white/10 hover:border-purple-500/30 transition-all"
              data-testid="view-all-button"
            >
              View All Products
            </Button>
          </Link>
        )}
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayProducts.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </section>
  );
}
