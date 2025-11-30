import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import { Trash2, ShoppingCart, Heart } from "lucide-react";
import { Link } from "wouter";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/layout/footer";

export default function WishlistPage() {
  // Mock wishlist data
  const wishlistItems = [products[1], products[4], products[6]];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-heading font-bold text-white mb-8 flex items-center gap-3"
        >
          <Heart className="w-8 h-8 text-secondary fill-secondary" /> 
          My Wishlist 
          <span className="text-muted-foreground text-2xl font-normal ml-2">({wishlistItems.length} items)</span>
        </motion.h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="glass-card border-white/10 bg-white/5 overflow-hidden group hover:border-primary/50 transition-all duration-300 h-full flex flex-col">
                <CardContent className="p-0 relative flex-1">
                   {product.isNew && (
                      <Badge className="absolute top-3 left-3 bg-secondary text-white border-none z-10">New</Badge>
                    )}
                    <div className="absolute top-3 right-3 z-10">
                      <Button size="icon" variant="destructive" className="h-8 w-8 rounded-full bg-red-500/20 hover:bg-red-500/40 text-red-400 border border-red-500/20 backdrop-blur-md">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="aspect-square overflow-hidden bg-white p-4 flex items-center justify-center relative">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                </CardContent>

                <CardFooter className="p-5 flex flex-col gap-4">
                  <div>
                    <h3 className="font-heading font-bold text-white text-lg line-clamp-1">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                  </div>
                  
                  <div className="flex items-center justify-between w-full mt-auto">
                    <span className="text-xl font-bold text-white">${product.price.toLocaleString()}</span>
                    <Button size="sm" className="rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
                      <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {wishlistItems.length === 0 && (
          <div className="text-center py-20">
            <Heart className="w-20 h-20 text-muted-foreground mx-auto mb-6 opacity-20" />
            <h2 className="text-2xl font-bold text-white mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-6">Start saving your favorite items for later.</p>
            <Link href="/products">
              <Button className="bg-primary hover:bg-primary/90">Browse Products</Button>
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
