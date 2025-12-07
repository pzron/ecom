import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { categories as staticCategories, products as staticProducts, type Category, type Product } from "@/data/products";
import { Search, Mic, MicOff, Grid, List, Star, ShoppingCart, Heart, X, ChevronLeft, SlidersHorizontal, Zap, Eye, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link, useLocation, useSearch } from "wouter";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { useState, useEffect, useRef, useMemo } from "react";
import { Footer } from "@/components/layout/footer";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { useWishlist } from "@/stores/wishlist";
import { useAuthStore } from "@/stores/auth";

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

interface ProductCardProps {
  product: Product;
  index: number;
}

function ProductCard({ product, index }: ProductCardProps) {
  const { addItem } = useCart();
  const { toast } = useToast();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const isWishlisted = isInWishlist(product.id);

  const colorKey = (product.badgeColor || "purple") as keyof typeof colorGradients;
  const gradient = colorGradients[colorKey] || colorGradients.purple;
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.01, 0.15) }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -6 }}
      className="h-full"
    >
      <Link href={`/product/${product.id}`}>
        <Card className={`relative overflow-hidden group cursor-pointer h-full bg-gradient-to-br ${gradient.bg} border-white/10 ${gradient.border} transition-all duration-300 ${gradient.hover} backdrop-blur-sm rounded-xl`}>
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient.badge} opacity-0 group-hover:opacity-5 transition-all duration-300`} />
          
          <CardContent className="p-0 relative">
            <div className="absolute top-2 left-2 z-20 flex flex-col gap-1">
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
              className="absolute top-2 right-2 z-20 flex flex-col gap-1"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 10 }}
              transition={{ duration: 0.2 }}
            >
              <Button 
                size="icon" 
                className={`h-7 w-7 rounded-full backdrop-blur-xl border transition-all hover:scale-110 ${
                  isWishlisted 
                    ? 'bg-red-500/20 hover:bg-red-500/30 text-red-400 border-red-500/30' 
                    : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
                }`}
                onClick={(e) => { 
                  e.preventDefault(); 
                  e.stopPropagation();
                  if (isWishlisted) {
                    removeFromWishlist(product.id);
                    toast({
                      title: "Removed from Wishlist",
                      description: `${product.name} removed from your wishlist.`,
                      duration: 2000,
                    });
                  } else {
                    addToWishlist({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      originalPrice: product.originalPrice,
                      image: product.image,
                      category: product.category,
                      rating: product.rating,
                      inStock: product.inStock,
                    });
                    toast({
                      title: "Added to Wishlist!",
                      description: `${product.name} saved to your wishlist.`,
                      duration: 2000,
                    });
                  }
                }}
              >
                <Heart className={`w-3 h-3 ${isWishlisted ? 'fill-current' : ''}`} />
              </Button>
              <Button 
                size="icon" 
                className="h-7 w-7 rounded-full bg-white/10 backdrop-blur-xl hover:bg-white/20 text-white border border-white/20 transition-all hover:scale-110"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
              >
                <Eye className="w-3 h-3" />
              </Button>
            </motion.div>

            <div className="aspect-square overflow-hidden bg-gradient-to-br from-gray-900 to-black p-3 flex items-center justify-center relative rounded-t-xl">
              <motion.div
                className="relative w-full h-full"
                animate={{ 
                  rotateY: isHovered ? [0, 6, -6, 0] : 0,
                  scale: isHovered ? 1.1 : 1,
                }}
                transition={{ 
                  rotateY: { duration: 0.6, ease: "easeInOut" },
                  scale: { duration: 0.3 }
                }}
              >
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="object-contain w-full h-full rounded-md transition-all duration-300"
                  style={{ borderRadius: isHovered ? '16px' : '6px' }}
                  loading="lazy"
                />
              </motion.div>
              
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex items-end justify-center p-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <Button 
                  className={`w-full rounded-lg ${gradient.badge} text-white font-semibold text-xs shadow-lg transition-all hover:shadow-xl hover:scale-105`}
                  onClick={handleAddToCart}
                  size="sm"
                >
                  {isAddingToCart ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <><ShoppingCart className="w-3 h-3 mr-1" /> Add to Cart</>
                  )}
                </Button>
              </motion.div>
            </div>
          </CardContent>
          
          <CardFooter className="p-2 flex flex-col items-start gap-1 bg-gradient-to-b from-white/5 to-white/[0.02] border-t border-white/10">
            <div className="w-full">
              <p className="text-xs text-primary/80 uppercase tracking-wider line-clamp-1">{product.category}</p>
              <h3 className="text-xs font-semibold text-white line-clamp-2 group-hover:text-purple-300 transition-colors mt-0.5">
                {product.name}
              </h3>
            </div>

            <div className="flex items-center gap-1 w-full">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-2.5 h-2.5 ${i < Math.round(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-white/20'}`}
                  />
                ))}
              </div>
              <span className="text-[10px] text-white/60">({product.reviews})</span>
            </div>

            <div className="w-full flex items-center gap-2">
              <span className="text-sm font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                ৳{product.price}
              </span>
              {product.originalPrice && (
                <span className="text-[10px] text-white/40 line-through">
                  ৳{product.originalPrice}
                </span>
              )}
            </div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}

export default function ProductsPage() {
  const searchParams = useSearch();
  const params = new URLSearchParams(searchParams);
  const categoryFromUrl = params.get('category') || 'all';
  const searchFromUrl = params.get('search') || '';
  
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
  const [searchQuery, setSearchQuery] = useState(searchFromUrl);
  const [isListening, setIsListening] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [showSidebar, setShowSidebar] = useState(false);
  const [visibleCount, setVisibleCount] = useState(50);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [, navigate] = useLocation();
  const recognitionRef = useRef<any>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const [products, setProducts] = useState<Product[]>(staticProducts);
  const [categories, setCategories] = useState<Category[]>(staticCategories);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  
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
              badgeColor: ['purple', 'pink', 'cyan', 'emerald', 'amber'][Math.floor(Math.random() * 5)],
            }));
            setProducts(formattedProducts);
          }
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setIsLoadingProducts(false);
      }
    };
    
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories', { credentials: 'include' });
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            const formattedCategories: Category[] = data.map((c: any) => ({
              name: c.name,
              slug: c.slug,
              icon: c.icon || '📦',
              iconName: c.iconName || 'Package',
              gradient: c.gradient || 'from-purple-600 to-pink-500',
              image: c.image,
            }));
            setCategories(formattedCategories);
          }
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };
    
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    setSelectedCategory(categoryFromUrl);
    setSearchQuery(searchFromUrl);
  }, [categoryFromUrl, searchFromUrl]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setVisibleCount(50);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const newParams = new URLSearchParams();
    if (selectedCategory !== 'all') {
      newParams.set('category', selectedCategory);
    }
    if (searchQuery) {
      newParams.set('search', searchQuery);
    }
    const queryString = newParams.toString();
    navigate(`/products${queryString ? `?${queryString}` : ''}`);
  };

  const startVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast({
        title: "Voice Search Unavailable",
        description: "Voice search is not supported in your browser. Please use Chrome or Edge.",
        duration: 3000,
      });
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
      toast({
        title: "Listening...",
        description: "Speak now to search products",
        duration: 2000,
      });
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
        const newParams = new URLSearchParams();
        if (selectedCategory !== 'all') {
          newParams.set('category', selectedCategory);
        }
        newParams.set('search', finalTranscript);
        navigate(`/products?${newParams.toString()}`);
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

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesCategory = selectedCategory === 'all' || 
        p.categorySlug === selectedCategory || 
        p.category.toLowerCase() === selectedCategory.toLowerCase();
      
      const matchesSearch = !searchQuery || 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.shortDescription?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      const matchesRating = p.rating >= minRating;
      
      return matchesCategory && matchesSearch && matchesPrice && matchesRating;
    });
  }, [selectedCategory, searchQuery, priceRange, minRating]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0;
    });
  }, [filteredProducts, sortBy]);

  const visibleProducts = sortedProducts.slice(0, visibleCount);
  const hasMore = visibleCount < sortedProducts.length;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
          setIsLoadingMore(true);
          setTimeout(() => {
            setVisibleCount(prev => Math.min(prev + 30, sortedProducts.length));
            setIsLoadingMore(false);
          }, 300);
        }
      },
      { threshold: 0.1, rootMargin: '200px' }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isLoadingMore, sortedProducts.length]);

  const getCategoryCount = (slug: string) => {
    if (slug === 'all') return products.length;
    return products.filter(p => p.categorySlug === slug).length;
  };

  const hasActiveFilters = selectedCategory !== 'all' || priceRange[0] !== 0 || priceRange[1] !== 5000 || minRating > 0;

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white">
      <Navbar />
      
      <main className="pt-20 pb-20">
        <div className="container mx-auto px-4 mb-8">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-2">All Products</h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Discover our complete collection of {products.length}+ premium products
            </p>
          </motion.div>

          <motion.form 
            onSubmit={handleSearch}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full mb-6"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
              <Input 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-12 pr-12 bg-white/5 border-white/10 rounded-xl text-base focus:bg-white/10 transition-all ${isListening ? 'border-purple-500 bg-purple-500/10' : ''}`}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className={`absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full ${isListening ? 'text-purple-400 bg-purple-500/20' : 'text-white/40 hover:text-white hover:bg-white/10'}`}
                onClick={isListening ? stopVoiceSearch : startVoiceSearch}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </Button>
            </div>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-between gap-4 flex-wrap"
          >
            <div className="text-sm text-muted-foreground">
              <span className="text-white font-semibold">{sortedProducts.length}</span> products
              {visibleProducts.length < sortedProducts.length && (
                <span className="ml-2 text-purple-400">(showing {visibleProducts.length})</span>
              )}
            </div>
            
            <div className="flex items-center gap-3 flex-wrap">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white hover:bg-white/10 cursor-pointer transition-all font-medium"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>

              <div className="flex items-center gap-2 border border-white/10 rounded-lg p-1.5 bg-white/5">
                <Button
                  size="icon"
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  className={`h-8 w-8 rounded-md ${viewMode === 'grid' ? 'bg-gradient-to-r from-primary to-secondary text-white' : 'text-white/50 hover:text-white hover:bg-white/10'}`}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  className={`h-8 w-8 rounded-md ${viewMode === 'list' ? 'bg-gradient-to-r from-primary to-secondary text-white' : 'text-white/50 hover:text-white hover:bg-white/10'}`}
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>

              <Button
                onClick={() => setShowSidebar(!showSidebar)}
                className={`gap-2.5 font-medium transition-all duration-300 ${
                  showSidebar
                    ? 'bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90'
                    : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span className="hidden sm:inline text-sm">{showSidebar ? 'Hide' : 'Show'} Filters</span>
              </Button>
            </div>
          </motion.div>
        </div>

        <div className="container mx-auto px-4 flex gap-6 relative">
          <AnimatePresence>
            {showSidebar && (
              <>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm lg:hidden z-30"
                  onClick={() => setShowSidebar(false)}
                />

                <motion.div
                  initial={{ opacity: 0, x: -400 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -400 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="fixed left-0 top-0 lg:relative z-40 lg:z-0 w-80 lg:w-72 h-screen lg:h-auto bg-background lg:bg-transparent overflow-y-auto lg:overflow-visible"
                >
                  <div className="sticky top-0 lg:top-24 p-6 lg:p-0 bg-background/95 lg:bg-transparent backdrop-blur-xl lg:backdrop-blur-none rounded-r-2xl lg:rounded-none border-r border-white/10 lg:border-0">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <SlidersHorizontal className="w-5 h-5 text-primary" />
                        Filters
                      </h3>
                      <Button
                        onClick={() => setShowSidebar(false)}
                        variant="ghost"
                        size="icon"
                        className="lg:hidden h-8 w-8 rounded-full hover:bg-white/10"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </Button>
                    </div>

                    <div className="space-y-6 pr-2">
                      <div>
                        <h4 className="font-semibold text-white mb-3 text-xs uppercase tracking-wider">Category</h4>
                        <div className="space-y-2 max-h-96 overflow-y-auto">
                          <Button
                            variant={selectedCategory === "all" ? "default" : "ghost"}
                            className={`w-full justify-start text-sm font-medium rounded-lg transition-all ${
                              selectedCategory === "all"
                                ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/20"
                                : "text-white/60 hover:text-white hover:bg-white/10"
                            }`}
                            onClick={() => handleCategoryChange("all")}
                          >
                            <span className="flex-1">All Products</span>
                            <span className="text-xs opacity-70 bg-white/10 px-2 py-0.5 rounded">({getCategoryCount('all')})</span>
                          </Button>
                          {categories.map((cat) => (
                            <Button
                              key={cat.slug}
                              variant={selectedCategory === cat.slug ? "default" : "ghost"}
                              className={`w-full justify-start text-sm rounded-lg transition-all ${
                                selectedCategory === cat.slug
                                  ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/20"
                                  : "text-white/60 hover:text-white hover:bg-white/10"
                              }`}
                              onClick={() => handleCategoryChange(cat.slug)}
                            >
                              <span className="flex-1 truncate">{cat.name}</span>
                              <span className="text-xs opacity-70 bg-white/10 px-2 py-0.5 rounded">({getCategoryCount(cat.slug)})</span>
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div className="border-t border-white/10 pt-6">
                        <h4 className="font-semibold text-white mb-4 text-xs uppercase tracking-wider">Price Range</h4>
                        <div className="space-y-4">
                          <Slider
                            value={priceRange}
                            onValueChange={setPriceRange}
                            min={0}
                            max={5000}
                            step={100}
                            className="w-full"
                          />
                          <div className="flex gap-3 text-sm bg-white/5 p-3 rounded-lg border border-white/10">
                            <div className="flex-1">
                              <span className="text-muted-foreground text-xs block mb-1 uppercase tracking-wide">Min</span>
                              <div className="text-white font-bold">৳{priceRange[0]}</div>
                            </div>
                            <div className="w-px bg-white/10" />
                            <div className="flex-1">
                              <span className="text-muted-foreground text-xs block mb-1 uppercase tracking-wide">Max</span>
                              <div className="text-white font-bold">৳{priceRange[1]}</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-white/10 pt-6">
                        <h4 className="font-semibold text-white mb-3 text-xs uppercase tracking-wider">Rating</h4>
                        <div className="space-y-2">
                          <Button
                            variant={minRating === 0 ? "default" : "ghost"}
                            className={`w-full justify-start text-sm font-medium rounded-lg transition-all ${minRating === 0 ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/20" : "text-white/60 hover:text-white hover:bg-white/10"}`}
                            onClick={() => setMinRating(0)}
                          >
                            <span>All Ratings</span>
                          </Button>
                          {[4, 3, 2, 1].map((rating) => (
                            <Button
                              key={rating}
                              variant={minRating === rating ? "default" : "ghost"}
                              className={`w-full justify-start text-sm font-medium rounded-lg transition-all ${minRating === rating ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/20" : "text-white/60 hover:text-white hover:bg-white/10"}`}
                              onClick={() => setMinRating(rating)}
                            >
                              <div className="flex items-center gap-1">
                                {[...Array(rating)].map((_, i) => (
                                  <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                ))}
                                {[...Array(5 - rating)].map((_, i) => (
                                  <Star key={i} className="w-3 h-3 text-white/20" />
                                ))}
                              </div>
                              <span className="ml-auto text-xs">& Up</span>
                            </Button>
                          ))}
                        </div>
                      </div>

                      {hasActiveFilters && (
                        <Button
                          onClick={() => {
                            setSelectedCategory('all');
                            setPriceRange([0, 5000]);
                            setMinRating(0);
                            setVisibleCount(50);
                          }}
                          className="w-full bg-white/5 text-white hover:bg-white/10 border border-white/10 font-medium rounded-lg transition-all"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Reset Filters
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          <div className="flex-1 w-full">
            {sortedProducts.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20 px-4"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
                  <Search className="w-8 h-8 text-white/40" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-white mb-3">No products found</h3>
                <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
                  Try adjusting your filters or search terms to find what you're looking for.
                </p>
                <Button 
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                    setPriceRange([0, 5000]);
                    setMinRating(0);
                  }}
                  className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 font-medium"
                >
                  <X className="w-4 h-4 mr-2" />
                  Clear all filters
                </Button>
              </motion.div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3 md:gap-4">
                  {visibleProducts.map((product, i) => (
                    <ProductCard key={product.id} product={product} index={i} />
                  ))}
                </div>

                {hasMore && (
                  <div 
                    ref={loadMoreRef}
                    className="flex justify-center items-center py-12"
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center gap-4"
                    >
                      {isLoadingMore ? (
                        <>
                          <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
                          <p className="text-white/60 text-sm">Loading more products...</p>
                        </>
                      ) : (
                        <p className="text-white/40 text-sm">
                          Scroll down to load more ({sortedProducts.length - visibleCount} remaining)
                        </p>
                      )}
                    </motion.div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
