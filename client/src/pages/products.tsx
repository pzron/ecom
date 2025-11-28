import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { categories, products } from "@/data/products";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Star, ShoppingCart } from "lucide-react";
import { useState } from "react";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(p => p.category.toLowerCase() === selectedCategory);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white pb-20">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl md:text-5xl font-heading font-bold text-white mb-4"
            >
              Explore Collection
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground max-w-xl"
            >
              Discover our curated selection of premium items, featuring real-time 3D previews and AI-powered recommendations.
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 w-full md:w-auto"
          >
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search products..." 
                className="pl-10 bg-white/5 border-white/10 rounded-full focus:bg-white/10 transition-all"
              />
            </div>
            <Button variant="outline" size="icon" className="rounded-full border-white/10 bg-white/5">
              <SlidersHorizontal className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-6 mb-8 scrollbar-hide">
          <Button 
            variant={selectedCategory === "all" ? "default" : "outline"}
            className={`rounded-full ${selectedCategory === "all" ? "bg-primary" : "border-white/10 bg-white/5"}`}
            onClick={() => setSelectedCategory("all")}
          >
            All Items
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.name.toLowerCase() ? "default" : "outline"}
              className={`rounded-full whitespace-nowrap ${selectedCategory === cat.name.toLowerCase() ? "bg-primary" : "border-white/10 bg-white/5"}`}
              onClick={() => setSelectedCategory(cat.name.toLowerCase())}
            >
              {cat.name}
            </Button>
          ))}
        </div>

        {/* Product Grid */}
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
      </main>
    </div>
  );
}
