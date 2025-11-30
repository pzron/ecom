import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { categories, products } from "@/data/products";
import { Search, SlidersHorizontal, Mic, MicOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link, useLocation, useSearch } from "wouter";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Star, ShoppingCart } from "lucide-react";
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
  const [, navigate] = useLocation();
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    setSelectedCategory(categoryFromUrl);
    setSearchQuery(searchFromUrl);
  }, [categoryFromUrl, searchFromUrl]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    const newParams = new URLSearchParams();
    if (category !== 'all') {
      newParams.set('category', category);
    }
    if (searchQuery) {
      newParams.set('search', searchQuery);
    }
    const queryString = newParams.toString();
    navigate(`/products${queryString ? `?${queryString}` : ''}`);
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
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl md:text-5xl font-heading font-bold text-white mb-4"
            >
              {selectedCategory !== 'all' 
                ? categories.find(c => c.slug === selectedCategory)?.name || 'Explore Collection'
                : 'Explore Collection'}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground max-w-xl"
            >
              {searchQuery 
                ? `Showing ${filteredProducts.length} results for "${searchQuery}"`
                : 'Discover our curated selection of premium items, featuring real-time 3D previews and AI-powered recommendations.'}
            </motion.p>
          </div>
          
          <motion.form 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 w-full md:w-auto"
            onSubmit={handleSearch}
          >
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`pl-10 pr-16 bg-white/5 border-white/10 rounded-full focus:bg-white/10 transition-all ${isListening ? 'border-purple-500 bg-purple-500/10' : ''}`}
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
              </div>
            </div>
            <Button variant="outline" size="icon" className="rounded-full border-white/10 bg-white/5">
              <SlidersHorizontal className="w-4 h-4" />
            </Button>
          </motion.form>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-6 mb-8 scrollbar-hide">
          <Button 
            variant={selectedCategory === "all" ? "default" : "outline"}
            className={`rounded-full ${selectedCategory === "all" ? "bg-primary" : "border-white/10 bg-white/5"}`}
            onClick={() => handleCategoryChange("all")}
          >
            All Items
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.slug ? "default" : "outline"}
              className={`rounded-full whitespace-nowrap ${selectedCategory === cat.slug ? "bg-primary" : "border-white/10 bg-white/5"}`}
              onClick={() => handleCategoryChange(cat.slug)}
            >
              {cat.name}
            </Button>
          ))}
        </div>

        {filteredProducts.length === 0 ? (
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
              Try adjusting your search or filter to find what you're looking for.
            </p>
            <Button 
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                navigate('/products');
              }}
              className="bg-primary hover:bg-primary/90"
            >
              Clear filters
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href={`/product/${product.id}`}>
                  <Card className="glass-card border-white/10 bg-white/5 overflow-hidden group hover:border-primary/50 transition-all duration-300 cursor-pointer h-full">
                    <CardContent className="p-0 relative">
                      {product.isNew && (
                        <Badge className="absolute top-3 left-3 bg-secondary text-white border-none z-10">New</Badge>
                      )}
                      {product.isBestseller && (
                        <Badge className="absolute top-3 left-3 bg-primary text-white border-none z-10">Bestseller</Badge>
                      )}
                      
                      <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 text-white">
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="aspect-square overflow-hidden bg-white p-4 flex items-center justify-center relative">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-500"
                        />
                        
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Button className="rounded-full bg-white text-black hover:bg-white/90 font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            Quick View
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="p-5 flex flex-col items-start gap-3">
                      <div className="flex items-center justify-between w-full">
                        <span className="text-xs font-medium text-primary uppercase tracking-wider">{product.category}</span>
                        <div className="flex items-center gap-1 text-yellow-400">
                          <Star className="w-3 h-3 fill-current" />
                          <span className="text-xs font-medium text-white">{product.rating}</span>
                        </div>
                      </div>
                      
                      <h3 className="font-heading font-bold text-white text-lg line-clamp-1 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      
                      <div className="flex items-center justify-between w-full mt-auto">
                        <div className="flex flex-col">
                          <span className="text-xl font-bold text-white">${product.price.toLocaleString()}</span>
                          {product.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through decoration-red-500/50">
                              ${product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                        <Button size="icon" className="rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
                          <ShoppingCart className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
