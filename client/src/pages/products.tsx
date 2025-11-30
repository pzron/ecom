import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { categories, products } from "@/data/products";
import { Search, Mic, MicOff, Grid, List, Star, ShoppingCart, Heart, X, Menu, ChevronLeft, SlidersHorizontal } from "lucide-react";
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
  const [showSidebar, setShowSidebar] = useState(false);
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
      
      <main className="pt-20 pb-20">
        {/* Header Section */}
        <div className="container mx-auto px-4 mb-8">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-2">All Products</h1>
            <p className="text-muted-foreground text-sm md:text-base">Discover our complete collection of 90+ premium products</p>
          </motion.div>

          {/* Search Bar */}
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

          {/* Controls Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-between gap-4 flex-wrap"
          >
            <div className="text-sm text-muted-foreground">
              <span className="text-white font-semibold">{sortedProducts.length}</span> products
            </div>
            
            <div className="flex items-center gap-3 flex-wrap">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white hover:bg-white/10 cursor-pointer transition-all font-medium"
              >
                <option value="featured">Featured</option>
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

              {/* Filter Toggle Button */}
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

        {/* Main Content Layout */}
        <div className="container mx-auto px-4 flex gap-6 relative">
          {/* Sidebar - Filters */}
          <AnimatePresence>
            {showSidebar && (
              <>
                {/* Mobile Overlay */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm lg:hidden z-30"
                  onClick={() => setShowSidebar(false)}
                />

                {/* Sidebar Panel */}
                <motion.div
                  initial={{ opacity: 0, x: -400 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -400 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="fixed left-0 top-0 lg:relative z-40 lg:z-0 w-80 lg:w-72 h-screen lg:h-auto bg-background lg:bg-transparent overflow-y-auto lg:overflow-visible"
                >
                  <div className="sticky top-0 lg:top-24 p-6 lg:p-0 bg-background/95 lg:bg-transparent backdrop-blur-xl lg:backdrop-blur-none rounded-r-2xl lg:rounded-none border-r border-white/10 lg:border-0">
                    {/* Sidebar Header */}
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
                      {/* Category Filter */}
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
                              key={cat.id}
                              variant={selectedCategory === cat.slug ? "default" : "ghost"}
                              className={`w-full justify-start text-sm rounded-lg transition-all ${
                                selectedCategory === cat.slug
                                  ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/20"
                                  : "text-white/60 hover:text-white hover:bg-white/10"
                              }`}
                              onClick={() => handleCategoryChange(cat.slug)}
                            >
                              <span className="flex-1">{cat.name}</span>
                              <span className="text-xs opacity-70 bg-white/10 px-2 py-0.5 rounded">({getCategoryCount(cat.slug)})</span>
                            </Button>
                          ))}
                        </div>
                      </div>

                      {/* Price Range */}
                      <div className="border-t border-white/10 pt-6">
                        <h4 className="font-semibold text-white mb-4 text-xs uppercase tracking-wider">Price Range</h4>
                        <div className="space-y-4">
                          <Slider
                            value={priceRange}
                            onValueChange={setPriceRange}
                            min={0}
                            max={2000}
                            step={50}
                            className="w-full"
                          />
                          <div className="flex gap-3 text-sm bg-white/5 p-3 rounded-lg border border-white/10">
                            <div className="flex-1">
                              <span className="text-muted-foreground text-xs block mb-1 uppercase tracking-wide">Min</span>
                              <div className="text-white font-bold">${priceRange[0]}</div>
                            </div>
                            <div className="w-px bg-white/10" />
                            <div className="flex-1">
                              <span className="text-muted-foreground text-xs block mb-1 uppercase tracking-wide">Max</span>
                              <div className="text-white font-bold">${priceRange[1]}</div>
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
                                  className="text-xs bg-white/5 border-white/10 hover:bg-white/10 hover:border-primary/50 rounded-lg transition-all font-medium"
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
                          {[5, 4, 3, 2, 1].map((rating) => (
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

          {/* Products Grid */}
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
                    setPriceRange([0, 2000]);
                    setMinRating(0);
                  }}
                  className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 font-medium"
                >
                  <X className="w-4 h-4 mr-2" />
                  Clear all filters
                </Button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3 md:gap-4 auto-rows-max">
                {sortedProducts.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.015 }}
                  >
                    <Link href={`/product/${product.id}`}>
                      <Card className="glass-card border-white/10 bg-white/5 hover:bg-white/10 overflow-hidden group hover:border-primary/50 transition-all duration-300 cursor-pointer h-full flex flex-col">
                        <CardContent className="p-0 relative flex-1">
                          {product.isNew && (
                            <Badge className="absolute top-2 left-2 bg-secondary text-white border-none z-10 text-xs font-semibold">New</Badge>
                          )}
                          {product.isBestseller && (
                            <Badge className="absolute top-2 left-2 bg-gradient-to-r from-primary to-secondary text-white border-none z-10 text-xs font-semibold">Bestseller</Badge>
                          )}
                          
                          <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button size="icon" variant="secondary" className="h-7 w-7 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/20">
                              <Heart className="w-3.5 h-3.5" />
                            </Button>
                          </div>

                          <div className="aspect-square overflow-hidden bg-white p-2 flex items-center justify-center">
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                        </CardContent>
                        
                        <CardFooter className="p-2.5 flex flex-col items-start gap-1 flex-1 justify-between">
                          <div className="w-full min-h-0">
                            <div className="flex items-center justify-between mb-1 gap-1">
                              <span className="text-xs font-medium text-primary/80 uppercase tracking-wider line-clamp-1">{product.category}</span>
                              <span className="text-xs text-green-400 font-medium whitespace-nowrap flex-shrink-0">Stock</span>
                            </div>
                            
                            <h3 className="font-heading font-bold text-white text-xs line-clamp-2 group-hover:text-primary transition-colors mb-1">
                              {product.name}
                            </h3>
                            
                            <div className="flex items-center gap-1">
                              <div className="flex items-center gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`w-2 h-2 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-white/20'}`} 
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-white/50">({product.reviews})</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between w-full gap-1.5 mt-auto">
                            <div className="flex flex-col min-w-0">
                              <span className="text-xs font-bold text-white leading-tight">${product.price.toLocaleString()}</span>
                            </div>
                            <Button size="icon" className="rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white h-6 w-6 flex-shrink-0 transition-all">
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
