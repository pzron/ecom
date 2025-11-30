import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { categories, products } from "@/data/products";
import { Search, Mic, MicOff, Grid, List, Star, ShoppingCart, Heart, X, ChevronLeft, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link, useLocation, useSearch } from "wouter";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { useState, useEffect, useRef } from "react";
import { Footer } from "@/components/layout/footer";

export default function ProductsPage() {
  const searchParams = useSearch();
  const params = new URLSearchParams(searchParams);
  const categoryFromUrl = params.get('category') || 'all';
  const searchFromUrl = params.get('search') || '';
  
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
  const [searchQuery, setSearchQuery] = useState(searchFromUrl);
  const [isListening, setIsListening] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [showSidebar, setShowSidebar] = useState(true);
  const [, navigate] = useLocation();
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    setSelectedCategory(categoryFromUrl);
    setSearchQuery(searchFromUrl);
  }, [categoryFromUrl, searchFromUrl]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
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

  const filteredProducts = products.filter(p => {
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

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  const getCategoryCount = (slug: string) => {
    if (slug === 'all') return products.length;
    return products.filter(p => p.categorySlug === slug).length;
  };

  const hasActiveFilters = selectedCategory !== 'all' || priceRange[0] !== 0 || priceRange[1] !== 2000 || minRating > 0;

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-3">All Products</h1>
            <p className="text-muted-foreground">Discover our complete collection of 90+ products</p>
          </div>
          
          {/* Mobile Sidebar Toggle */}
          <Button
            onClick={() => setShowSidebar(!showSidebar)}
            variant="outline"
            size="icon"
            className="hidden md:flex border-white/10 bg-white/5 hover:bg-white/10"
          >
            {showSidebar ? <ChevronLeft className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </Button>
        </motion.div>

        <div className="flex gap-8 relative">
          {/* Left Sidebar - Filters with Toggle */}
          <AnimatePresence>
            {showSidebar && (
              <motion.div
                initial={{ opacity: 0, x: -20, width: 0 }}
                animate={{ opacity: 1, x: 0, width: 'auto' }}
                exit={{ opacity: 0, x: -20, width: 0 }}
                transition={{ duration: 0.3 }}
                className="w-64 flex-shrink-0 hidden md:block"
              >
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md sticky top-24 space-y-6 max-h-[calc(100vh-120px)] overflow-y-auto">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">Filters</h3>
                    <Button
                      onClick={() => setShowSidebar(false)}
                      variant="ghost"
                      size="icon"
                      className="md:hidden"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Category Filter */}
                  <div>
                    <h4 className="font-semibold text-white mb-4">Category</h4>
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      <Button
                        variant={selectedCategory === "all" ? "default" : "ghost"}
                        className={`w-full justify-start text-sm ${
                          selectedCategory === "all"
                            ? "bg-primary text-white"
                            : "text-white/70 hover:text-white hover:bg-white/10"
                        }`}
                        onClick={() => handleCategoryChange("all")}
                      >
                        <span>All Products</span>
                        <span className="ml-auto text-xs font-medium">({getCategoryCount('all')})</span>
                      </Button>
                      {categories.map((cat) => (
                        <Button
                          key={cat.id}
                          variant={selectedCategory === cat.slug ? "default" : "ghost"}
                          className={`w-full justify-start text-sm ${
                            selectedCategory === cat.slug
                              ? "bg-primary text-white"
                              : "text-white/70 hover:text-white hover:bg-white/10"
                          }`}
                          onClick={() => handleCategoryChange(cat.slug)}
                        >
                          <span>{cat.name}</span>
                          <span className="ml-auto text-xs font-medium">({getCategoryCount(cat.slug)})</span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="border-t border-white/10 pt-4">
                    <h4 className="font-semibold text-white mb-4">Price Range</h4>
                    <div className="space-y-4">
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        min={0}
                        max={2000}
                        step={50}
                        className="w-full"
                      />
                      <div className="flex gap-2 text-sm">
                        <div className="flex-1">
                          <span className="text-muted-foreground text-xs">Min</span>
                          <div className="text-white font-semibold">${priceRange[0]}</div>
                        </div>
                        <div className="flex-1">
                          <span className="text-muted-foreground text-xs">Max</span>
                          <div className="text-white font-semibold">${priceRange[1]}</div>
                        </div>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        {['Under 5K', '5K-20K', '20K-50K', '50K+'].map((label, idx) => {
                          const ranges = [[0, 5000], [5000, 20000], [20000, 50000], [50000, 2000000]];
                          return (
                            <Button
                              key={idx}
                              variant="outline"
                              size="sm"
                              className="text-xs bg-white/5 border-white/10 hover:bg-white/10"
                              onClick={() => setPriceRange(ranges[idx])}
                            >
                              {label}
                            </Button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Rating Filter */}
                  <div className="border-t border-white/10 pt-4">
                    <h4 className="font-semibold text-white mb-4">Rating</h4>
                    <div className="space-y-2">
                      <Button
                        variant={minRating === 0 ? "default" : "ghost"}
                        className={`w-full justify-start text-sm ${minRating === 0 ? "bg-primary text-white" : "text-white/70 hover:text-white hover:bg-white/10"}`}
                        onClick={() => setMinRating(0)}
                      >
                        <span>All Ratings</span>
                      </Button>
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <Button
                          key={rating}
                          variant={minRating === rating ? "default" : "ghost"}
                          className={`w-full justify-start text-sm ${minRating === rating ? "bg-primary text-white" : "text-white/70 hover:text-white hover:bg-white/10"}`}
                          onClick={() => setMinRating(rating)}
                        >
                          <div className="flex items-center gap-2">
                            {[...Array(rating)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            ))}
                            {[...Array(5 - rating)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 text-white/20" />
                            ))}
                          </div>
                          <span className="ml-auto text-xs">&amp; Up</span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Reset Button */}
                  {hasActiveFilters && (
                    <Button
                      onClick={() => {
                        setSelectedCategory('all');
                        setPriceRange([0, 2000]);
                        setMinRating(0);
                      }}
                      className="w-full bg-primary/20 text-primary hover:bg-primary/30 border border-primary/30"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Reset Filters
                    </Button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Right Content */}
          <div className="flex-1 min-w-0">
            {/* Search & Toolbar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8"
            >
              <form onSubmit={handleSearch} className="flex-1 max-w-md w-full">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search products..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`pl-10 pr-12 bg-white/5 border-white/10 rounded-full focus:bg-white/10 transition-all ${isListening ? 'border-purple-500 bg-purple-500/10' : ''}`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className={`absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full ${isListening ? 'text-purple-400 bg-purple-500/20' : 'text-white/40 hover:text-white hover:bg-white/10'}`}
                    onClick={isListening ? stopVoiceSearch : startVoiceSearch}
                  >
                    {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                  </Button>
                </div>
              </form>

              <div className="flex items-center gap-3 flex-wrap">
                <div className="text-sm text-muted-foreground">
                  Showing <span className="text-white font-semibold">{sortedProducts.length}</span> products
                </div>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white hover:bg-white/10 cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>

                <div className="flex items-center gap-2 border border-white/10 rounded-lg p-1 bg-white/5">
                  <Button
                    size="icon"
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    className={`h-8 w-8 rounded-md ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-white/50 hover:text-white'}`}
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    className={`h-8 w-8 rounded-md ${viewMode === 'list' ? 'bg-primary text-white' : 'text-white/50 hover:text-white'}`}
                    onClick={() => setViewMode('list')}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Products Grid - 6-7 per line */}
            {sortedProducts.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
                  <Search className="w-8 h-8 text-white/40" />
                </div>
                <h3 className="text-xl font-heading font-bold text-white mb-2">No products found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters or search to find what you're looking for.
                </p>
                <Button 
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                    setPriceRange([0, 2000]);
                    setMinRating(0);
                  }}
                  className="bg-primary hover:bg-primary/90"
                >
                  Clear filters
                </Button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 auto-rows-max">
                {sortedProducts.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.02 }}
                  >
                    <Link href={`/product/${product.id}`}>
                      <Card className="glass-card border-white/10 bg-white/5 overflow-hidden group hover:border-primary/50 transition-all duration-300 cursor-pointer h-full flex flex-col">
                        <CardContent className="p-0 relative flex-1">
                          {product.isNew && (
                            <Badge className="absolute top-2 left-2 bg-secondary text-white border-none z-10 text-xs">New</Badge>
                          )}
                          {product.isBestseller && (
                            <Badge className="absolute top-2 left-2 bg-primary text-white border-none z-10 text-xs">Bestseller</Badge>
                          )}
                          
                          <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button size="icon" variant="secondary" className="h-6 w-6 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 text-white">
                              <Heart className="w-3 h-3" />
                            </Button>
                          </div>

                          <div className="aspect-square overflow-hidden bg-white p-2 flex items-center justify-center relative">
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                        </CardContent>
                        
                        <CardFooter className="p-3 flex flex-col items-start gap-2 flex-1 justify-between">
                          <div className="w-full">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-medium text-primary/80 uppercase tracking-wider line-clamp-1">{product.category}</span>
                              <span className="text-xs text-green-400 font-medium whitespace-nowrap">In Stock</span>
                            </div>
                            
                            <h3 className="font-heading font-bold text-white text-xs line-clamp-2 group-hover:text-primary transition-colors mb-2">
                              {product.name}
                            </h3>
                            
                            <div className="flex items-center gap-1 mb-2">
                              <div className="flex items-center gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`w-2.5 h-2.5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-white/20'}`} 
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-white/60">({product.reviews})</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between w-full gap-2">
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-white">${product.price.toLocaleString()}</span>
                              {product.originalPrice && (
                                <span className="text-xs text-muted-foreground line-through">
                                  ${product.originalPrice.toLocaleString()}
                                </span>
                              )}
                            </div>
                            <Button size="icon" className="rounded-full bg-primary hover:bg-primary/90 text-white h-6 w-6 flex-shrink-0">
                              <ShoppingCart className="w-3 h-3" />
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
