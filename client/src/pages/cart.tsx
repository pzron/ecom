import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import { Minus, Plus, Trash2, ArrowRight, ShieldCheck, CreditCard, Wallet, Truck, Gift, Zap, Package, Tag, Check, AlertCircle } from "lucide-react";
import { Link } from "wouter";
import { useState, useEffect } from "react";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    { ...products[0], quantity: 1 },
    { ...products[3], quantity: 2 }
  ]);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const updateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      removeItem(index);
      return;
    }
    const updated = [...cartItems];
    updated[index].quantity = newQty;
    setCartItems(updated);
  };

  const removeItem = (index: number) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  const applyPromo = () => {
    if (promoCode.toUpperCase() === "SAVE10") {
      setDiscount(10);
    } else if (promoCode.toUpperCase() === "SAVE20") {
      setDiscount(20);
    } else {
      setDiscount(0);
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discountAmount = (subtotal * discount) / 100;
  const afterDiscount = subtotal - discountAmount;
  const shipping = afterDiscount > 100 ? 0 : 9.99;
  const tax = Math.round((afterDiscount + shipping) * 0.08 * 100) / 100;
  const total = afterDiscount + shipping + tax;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -200, rotateX: 45 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white pb-20">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-heading font-bold text-white mb-2"
        >
          Your Cart
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground mb-8"
        >
          {cartItems.length} {cartItems.length === 1 ? "item" : "items"} ready for delivery
        </motion.p>

        {cartItems.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground mb-6 text-lg">Your cart is empty</p>
            <Link href="/products">
              <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                Continue Shopping
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* PRODUCTS SECTION - COMPACT */}
            <motion.div 
              className="lg:col-span-2 space-y-3"
              variants={containerVariants}
              initial="hidden"
              animate={isAnimating ? "visible" : "hidden"}
            >
              <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <div className="hidden md:grid grid-cols-12 gap-4 p-3 bg-white/5 border-b border-white/10 text-xs font-semibold text-muted-foreground">
                  <div className="col-span-5">Product</div>
                  <div className="col-span-2">Price</div>
                  <div className="col-span-2">Qty</div>
                  <div className="col-span-2">Total</div>
                  <div className="col-span-1"></div>
                </div>

                {cartItems.map((item, i) => (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b border-white/5 hover:bg-white/5 transition-colors items-center"
                  >
                    {/* Product Image & Name */}
                    <div className="md:col-span-5 flex gap-3 items-start">
                      <div className="w-16 h-16 bg-white rounded-lg p-1 flex-shrink-0 flex items-center justify-center">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-white text-sm truncate">{item.name}</h4>
                        <p className="text-xs text-muted-foreground">{item.category}</p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="md:col-span-2 text-sm">
                      <span className="md:hidden text-muted-foreground">Price: </span>
                      <span className="font-semibold text-white">${item.price.toLocaleString()}</span>
                    </div>

                    {/* Quantity */}
                    <div className="md:col-span-2">
                      <div className="flex items-center gap-1 bg-black/20 rounded-lg p-1 border border-white/10 w-fit">
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-6 w-6 rounded hover:bg-white/10 text-white p-0"
                          onClick={() => updateQuantity(i, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="text-white font-medium w-6 text-center text-sm">{item.quantity}</span>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-6 w-6 rounded hover:bg-white/10 text-white p-0"
                          onClick={() => updateQuantity(i, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="md:col-span-2 text-sm">
                      <span className="md:hidden text-muted-foreground">Total: </span>
                      <span className="font-bold text-primary">${(item.price * item.quantity).toLocaleString()}</span>
                    </div>

                    {/* Delete */}
                    <div className="md:col-span-1 flex justify-end md:justify-start">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-muted-foreground hover:text-red-400 h-8 w-8"
                        onClick={() => removeItem(i)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Delivery Info */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-2 gap-3"
              >
                <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                  <div className="flex items-center gap-2 mb-1">
                    <Truck className="w-4 h-4 text-green-400" />
                    <span className="text-xs font-semibold text-green-400">Free Delivery</span>
                  </div>
                  <p className="text-xs text-green-300/70">On orders over $100</p>
                </div>
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-semibold text-blue-400">Express</span>
                  </div>
                  <p className="text-xs text-blue-300/70">Arrives in 2-3 days</p>
                </div>
              </motion.div>
            </motion.div>

            {/* ORDER SUMMARY - ENHANCED */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-24 space-y-4">
                {/* Promo Code */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-white/10 backdrop-blur-sm"
                >
                  <label className="text-xs font-semibold text-muted-foreground mb-2 block">PROMO CODE</label>
                  <div className="flex gap-2">
                    <input 
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Try SAVE10 or SAVE20"
                      className="flex-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-primary"
                    />
                    <Button 
                      size="sm"
                      className="bg-primary hover:bg-primary/90"
                      onClick={applyPromo}
                    >
                      <Tag className="w-4 h-4" />
                    </Button>
                  </div>
                  {discount > 0 && (
                    <p className="text-xs text-green-400 mt-2 flex items-center gap-1">
                      <Check className="w-3 h-3" /> {discount}% discount applied!
                    </p>
                  )}
                </motion.div>

                {/* Order Summary Box */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-4"
                >
                  <h2 className="text-lg font-bold text-white">Order Summary</h2>

                  {/* Itemized Breakdown */}
                  <div className="space-y-3 pb-4 border-b border-white/10">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-white font-medium">${subtotal.toLocaleString()}</span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between items-center text-sm bg-green-500/10 p-2 rounded-lg border border-green-500/20">
                        <span className="text-green-400 font-medium">Discount ({discount}%)</span>
                        <span className="text-green-400 font-bold">-${discountAmount.toLocaleString()}</span>
                      </div>
                    )}

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className={shipping === 0 ? "text-green-400 font-medium" : "text-white font-medium"}>
                        {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Estimated Tax</span>
                      <span className="text-white font-medium">${tax.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-white font-bold">Total</span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      ${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>

                  {/* Estimated Delivery */}
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                    <p className="text-xs text-blue-300">
                      <span className="font-semibold">Estimated Delivery:</span> Dec 2-3, 2025
                    </p>
                  </div>
                </motion.div>

                {/* Payment Methods */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-2"
                >
                  <p className="text-xs font-semibold text-muted-foreground">PAYMENT METHOD</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setPaymentMethod("card")}
                      className={`p-3 rounded-lg border transition-all text-sm font-medium flex items-center justify-center gap-2 ${
                        paymentMethod === "card"
                          ? "bg-primary border-primary text-white"
                          : "bg-white/5 border-white/10 text-muted-foreground hover:border-white/20"
                      }`}
                    >
                      <CreditCard className="w-4 h-4" /> Card
                    </button>
                    <button
                      onClick={() => setPaymentMethod("crypto")}
                      className={`p-3 rounded-lg border transition-all text-sm font-medium flex items-center justify-center gap-2 ${
                        paymentMethod === "crypto"
                          ? "bg-primary border-primary text-white"
                          : "bg-white/5 border-white/10 text-muted-foreground hover:border-white/20"
                      }`}
                    >
                      <Wallet className="w-4 h-4" /> Crypto
                    </button>
                  </div>
                </motion.div>

                {/* Checkout Button */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                >
                  <Link href="/checkout">
                    <Button className="w-full h-12 text-base bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-lg shadow-primary/30 font-semibold">
                      Proceed to Checkout <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                </motion.div>

                {/* Trust Badges */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-2 pt-2"
                >
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <ShieldCheck className="w-4 h-4 text-green-400" />
                    SSL Encrypted
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Check className="w-4 h-4 text-green-400" />
                    Money-back guarantee
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Gift className="w-4 h-4 text-pink-400" />
                    Free returns 30 days
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </main>
    </div>
  );
}
