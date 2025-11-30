import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import { Timer, Zap, Tag, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/layout/footer";

export default function DealsPage() {
  // Filter products with discounts
  const dealProducts = products.filter(p => p.originalPrice && p.originalPrice > p.price);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24">
        {/* Flash Sale Hero */}
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
                 <div className="bg-black/40 p-3 rounded-lg border border-white/10">02<span className="text-xs block text-muted-foreground font-sans font-normal">Hours</span></div>
                 <span className="text-red-500 animate-pulse">:</span>
                 <div className="bg-black/40 p-3 rounded-lg border border-white/10">45<span className="text-xs block text-muted-foreground font-sans font-normal">Mins</span></div>
                 <span className="text-red-500 animate-pulse">:</span>
                 <div className="bg-black/40 p-3 rounded-lg border border-white/10">12<span className="text-xs block text-muted-foreground font-sans font-normal">Secs</span></div>
              </div>
            </div>
            
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
                -40%
              </div>
            </motion.div>
          </div>
        </div>

        {/* Deals Grid */}
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Zap className="w-6 h-6 text-yellow-400 fill-yellow-400" /> Trending Deals
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {dealProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/product/${product.id}`}>
                <Card className="glass-card border-white/10 bg-white/5 overflow-hidden group hover:border-red-500/30 transition-all duration-300 cursor-pointer h-full flex flex-col">
                  <CardContent className="p-0 relative flex-1">
                    <Badge className="absolute top-3 left-3 bg-red-500 text-white border-none z-10 flex items-center gap-1">
                      <Timer className="w-3 h-3" /> Limited Deal
                    </Badge>
                    
                    <div className="aspect-square overflow-hidden bg-white p-4 flex items-center justify-center relative">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-500"
                      />
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
                      <Badge variant="outline" className="ml-auto border-red-500/30 text-red-400">
                        Save ${(product.originalPrice! - product.price).toLocaleString()}
                      </Badge>
                    </div>
                    
                    <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-2">
                      <div className="bg-red-500 w-[85%] h-full" />
                    </div>
                    <p className="text-xs text-red-400">85% Claimed</p>
                  </CardFooter>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
