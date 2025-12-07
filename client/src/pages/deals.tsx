import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { products as staticProducts, type Product } from "@/data/products";
import { Timer, Zap, Tag, ArrowRight, Loader2, ShoppingCart } from "lucide-react";
import { Link } from "wouter";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/layout/footer";
import { useState, useEffect, useMemo } from "react";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";

export default function DealsPage() {
  const [products, setProducts] = useState<Product[]>(staticProducts);
  const [isLoading, setIsLoading] = useState(true);
  const [countdown, setCountdown] = useState({ hours: 2, mins: 45, secs: 12 });
  const { addItem } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products', { credentials: 'include' });
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            const formattedProducts: Product[] = data.map((p: any) => ({
              id: p.id,
              name: p.name,
              slug: p.slug || p.name.toLowerCase().replace(/\s+/g, '-'),
              category: p.category?.name || p.categoryName || 'General',
              categorySlug: p.category?.slug || p.categorySlug || 'general',
              price: parseFloat(p.price) || 0,
              originalPrice: p.originalPrice ? parseFloat(p.originalPrice) : undefined,
              rating: parseFloat(p.rating) || 4.5,
              reviews: p.reviewCount || Math.floor(Math.random() * 500),
              image: p.images?.[0] || p.image || '/placeholder.jpg',
              images: p.images || [],
              description: p.description,
              shortDescription: p.shortDescription,
              isNew: p.isNew || false,
              isBestseller: p.isBestseller || false,
              isFeatured: p.isFeatured || false,
              inStock: p.inStock ?? true,
              stock: p.stock || 0,
              vendorName: p.vendor?.storeName,
              tags: p.tags || [],
              badgeColor: ['purple', 'pink', 'cyan', 'emerald', 'amber', 'red'][Math.floor(Math.random() * 6)],
            }));
            setProducts(formattedProducts);
          }
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        let { hours, mins, secs } = prev;
        secs--;
        if (secs < 0) {
          secs = 59;
          mins--;
        }
        if (mins < 0) {
          mins = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
          mins = 59;
          secs = 59;
        }
        return { hours, mins, secs };
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const dealProducts = useMemo(() => {
    return products.filter(p => p.originalPrice && p.originalPrice > p.price);
  }, [products]);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
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
  };

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-red-900/40 to-purple-900/40 border border-white/10 p-8 md:p-12 mb-12">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 text-center md:text-left">
              <Badge className="bg-red-500 text-white border-none animate-pulse">FLASH SALE LIVE</Badge>
              <h1 className="text-4xl md:text-6xl font-heading font-bold text-white leading-tight">
                Super Tech <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Markdown Event</span>
              </h1>
              <p className="text-lg text-gray-300 max-w-xl">
                Up to 70% off on premium electronics, 3D-ready assets, and exclusive bundles. Limited time only.
              </p>
              <div className="flex items-center justify-center md:justify-start gap-4 text-2xl font-mono font-bold text-white">
                 <div className="bg-black/40 p-3 rounded-lg border border-white/10">
                   {formatNumber(countdown.hours)}
                   <span className="text-xs block text-muted-foreground font-sans font-normal">Hours</span>
                 </div>
                 <span className="text-red-500 animate-pulse">:</span>
                 <div className="bg-black/40 p-3 rounded-lg border border-white/10">
                   {formatNumber(countdown.mins)}
                   <span className="text-xs block text-muted-foreground font-sans font-normal">Mins</span>
                 </div>
                 <span className="text-red-500 animate-pulse">:</span>
                 <div className="bg-black/40 p-3 rounded-lg border border-white/10">
                   {formatNumber(countdown.secs)}
                   <span className="text-xs block text-muted-foreground font-sans font-normal">Secs</span>
                 </div>
              </div>
            </div>
            
            {dealProducts[0] && (
              <motion.div 
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <div className="absolute inset-0 bg-red-500/20 blur-[50px] rounded-full" />
                <img 
                  src={dealProducts[0]?.image} 
                  alt="Deal Star" 
                  className="w-64 h-64 md:w-80 md:h-80 object-contain relative z-10 drop-shadow-2xl"
                />
                <div className="absolute -top-4 -right-4 bg-yellow-400 text-black font-bold rounded-full w-20 h-20 flex items-center justify-center -rotate-12 shadow-lg border-4 border-white z-20">
                  -{Math.round(((dealProducts[0]?.originalPrice || 0) - dealProducts[0]?.price) / (dealProducts[0]?.originalPrice || 1) * 100)}%
                </div>
              </motion.div>
            )}
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Zap className="w-6 h-6 text-yellow-400 fill-yellow-400" /> Trending Deals
          {isLoading && <Loader2 className="w-5 h-5 ml-2 animate-spin text-muted-foreground" />}
        </h2>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden animate-pulse">
                <div className="aspect-square bg-white/10" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-white/10 rounded w-3/4" />
                  <div className="h-6 bg-white/10 rounded w-1/2" />
                  <div className="h-2 bg-white/10 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : dealProducts.length === 0 ? (
          <div className="text-center py-20">
            <Tag className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground text-lg mb-4">No deals available at the moment</p>
            <Link href="/products">
              <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                Browse All Products
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {dealProducts.map((product, i) => {
              const discount = product.originalPrice 
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
                : 0;
              const claimed = Math.floor(Math.random() * 30) + 60;
              
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.05, 0.3) }}
                >
                  <Link href={`/product/${product.id}`}>
                    <Card className="glass-card border-white/10 bg-white/5 overflow-hidden group hover:border-red-500/30 transition-all duration-300 cursor-pointer h-full flex flex-col">
                      <CardContent className="p-0 relative flex-1">
                        <Badge className="absolute top-3 left-3 bg-red-500 text-white border-none z-10 flex items-center gap-1">
                          <Timer className="w-3 h-3" /> Limited Deal
                        </Badge>
                        
                        <Badge className="absolute top-3 right-3 bg-yellow-500 text-black border-none z-10 font-bold">
                          -{discount}%
                        </Badge>
                        
                        <div className="aspect-square overflow-hidden bg-white p-4 flex items-center justify-center relative">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-500"
                          />
                          
                          <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileHover={{ scale: 1.1 }}
                            onClick={(e) => handleAddToCart(e, product)}
                            className="absolute bottom-3 right-3 bg-primary text-white p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                          >
                            <ShoppingCart className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </CardContent>
                      
                      <CardFooter className="p-5 flex flex-col gap-3">
                        <h3 className="font-heading font-bold text-white text-lg line-clamp-1">{product.name}</h3>
                        
                        <div className="flex items-center gap-3">
                          <span className="text-2xl font-bold text-red-400">${product.price.toLocaleString()}</span>
                          {product.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              ${product.originalPrice.toLocaleString()}
                            </span>
                          )}
                          <Badge variant="outline" className="ml-auto border-red-500/30 text-red-400 text-xs">
                            Save ${(product.originalPrice! - product.price).toLocaleString()}
                          </Badge>
                        </div>
                        
                        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-2">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${claimed}%` }}
                            transition={{ duration: 1, delay: i * 0.1 }}
                            className="bg-red-500 h-full" 
                          />
                        </div>
                        <p className="text-xs text-red-400">{claimed}% Claimed</p>
                      </CardFooter>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
