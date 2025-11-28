import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import { Minus, Plus, Trash2, ArrowRight, ShieldCheck, CreditCard, Wallet } from "lucide-react";
import { Link } from "wouter";

export default function CartPage() {
  const cartItems = [
    { ...products[0], quantity: 1 },
    { ...products[3], quantity: 2 }
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white pb-20">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-heading font-bold text-white mb-8"
        >
          Your Cart <span className="text-muted-foreground text-2xl font-normal ml-2">({cartItems.length} items)</span>
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
              >
                <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-xl p-2 flex items-center justify-center flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                </div>
                
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-white text-lg md:text-xl">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.category} • In Stock</p>
                    </div>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-red-400">
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-end">
                    <div className="flex items-center gap-3 bg-black/20 rounded-full p-1 border border-white/10">
                      <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full hover:bg-white/10 text-white">
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="text-white font-medium w-4 text-center">{item.quantity}</span>
                      <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full hover:bg-white/10 text-white">
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="text-xl font-bold text-primary">${(item.price * item.quantity).toLocaleString()}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md sticky top-24">
              <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="text-white">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span className="text-green-400">Free</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Tax</span>
                  <span className="text-white">Calculated at checkout</span>
                </div>
                <div className="h-px bg-white/10 my-4" />
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-white">Total</span>
                  <span className="text-primary">${total.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-4">
                <Link href="/checkout">
                  <Button className="w-full h-12 text-lg bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                    Proceed to Checkout <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10">
                    <Wallet className="mr-2 w-4 h-4" /> Crypto
                  </Button>
                  <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10">
                    <CreditCard className="mr-2 w-4 h-4" /> Card
                  </Button>
                </div>

                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mt-4">
                  <ShieldCheck className="w-4 h-4 text-green-400" />
                  Secure Encrypted Checkout
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
