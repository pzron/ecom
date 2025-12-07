import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Trash2, ShoppingCart, Heart, Loader2 } from "lucide-react";
import { Link } from "wouter";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/layout/footer";
import { useWishlist } from "@/stores/wishlist";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/stores/auth";
import { useEffect } from "react";

export default function WishlistPage() {
  const { items, removeItem, isLoading, syncWithServer } = useWishlist();
  const { addItem } = useCart();
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      syncWithServer(user.id);
    }
  }, [isAuthenticated, user?.id, syncWithServer]);

  const handleAddToCart = (item: typeof items[0]) => {
    addItem({
      id: item.product.id,
      name: item.product.name,
      price: item.product.price,
      originalPrice: item.product.originalPrice,
      image: item.product.image,
    });
    toast({
      title: "Added to Cart!",
      description: `${item.product.name} has been added to your cart.`,
      duration: 2000,
    });
  };

  const handleRemoveFromWishlist = (productId: string, productName: string) => {
    removeItem(productId);
    toast({
      title: "Removed from Wishlist",
      description: `${productName} has been removed from your wishlist.`,
      duration: 2000,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-20">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-heading font-bold text-white mb-8 flex items-center gap-3"
        >
          <Heart className="w-8 h-8 text-secondary fill-secondary" /> 
          My Wishlist 
          <span className="text-muted-foreground text-2xl font-normal ml-2">({items.length} items)</span>
        </motion.h1>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="glass-card border-white/10 bg-white/5 overflow-hidden group hover:border-primary/50 transition-all duration-300 h-full flex flex-col">
                  <CardContent className="p-0 relative flex-1">
                    {item.product.inStock === false && (
                      <Badge className="absolute top-3 left-3 bg-red-500/80 text-white border-none z-10">Out of Stock</Badge>
                    )}
                    <div className="absolute top-3 right-3 z-10">
                      <Button 
                        size="icon" 
                        variant="destructive" 
                        className="h-8 w-8 rounded-full bg-red-500/20 hover:bg-red-500/40 text-red-400 border border-red-500/20 backdrop-blur-md"
                        onClick={() => handleRemoveFromWishlist(item.productId, item.product.name)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <Link href={`/product/${item.productId}`}>
                      <div className="aspect-square overflow-hidden bg-white p-4 flex items-center justify-center relative cursor-pointer">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name}
                          className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    </Link>
                  </CardContent>

                  <CardFooter className="p-5 flex flex-col gap-4">
                    <div>
                      <Link href={`/product/${item.productId}`}>
                        <h3 className="font-heading font-bold text-white text-lg line-clamp-1 hover:text-primary transition-colors cursor-pointer">
                          {item.product.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground">{item.product.category}</p>
                    </div>
                    
                    <div className="flex items-center justify-between w-full mt-auto">
                      <div className="flex flex-col">
                        <span className="text-xl font-bold text-white">৳{item.product.price.toLocaleString()}</span>
                        {item.product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ৳{item.product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <Button 
                        size="sm" 
                        className="rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
                        onClick={() => handleAddToCart(item)}
                        disabled={item.product.inStock === false}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <Heart className="w-20 h-20 text-muted-foreground mx-auto mb-6 opacity-20" />
            <h2 className="text-2xl font-bold text-white mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-6">Start saving your favorite items for later.</p>
            <Link href="/products">
              <Button className="bg-primary hover:bg-primary/90">Browse Products</Button>
            </Link>
          </motion.div>
        )}
      </main>
      <Footer />
    </div>
  );
}
