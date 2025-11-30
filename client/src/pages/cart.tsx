import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import { Minus, Plus, Trash2, ArrowRight, ShieldCheck, CreditCard, Wallet, Truck, Gift, Zap, Package, Tag, Check, AlertCircle } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    { ...products[0], quantity: 1 },
    { ...products[3], quantity: 2 }
  ]);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("card");

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Bucket animation with products dropping
  const dropSequence = {
    loop: {
      transition: {
        staggerChildren: 0.15,
        repeatDelay: 1.5,
        repeat: Infinity,
      },
    },
  };

  const productDropVariants = (index: number) => ({
    hidden: { opacity: 0, y: -400, x: 0 },
    drop: {
      opacity: 1,
      y: 0,
      x: (Math.random() - 0.5) * 120,
      transition: {
        duration: 0.8,
        ease: "easeIn",
      },
    },
  });

  const bucketBounceVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { delay: 0.6, duration: 0.4 },
    },
    bounce: {
      y: [0, -8, 0],
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        delay: 1.2,
        repeat: Infinity,
        repeatDelay: 2.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white pb-20">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-5xl font-heading font-bold text-white mb-2">Your Cart</h1>
          <p className="text-muted-foreground text-lg">{cartItems.length} {cartItems.length === 1 ? "item" : "items"} ready for delivery</p>
        </motion.div>

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
          <motion.div 
            className="grid grid-cols-1 xl:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Left Section - Products & Animation */}
            <div className="xl:col-span-2 space-y-8">
              {/* Product Items Table */}
              <motion.div variants={itemVariants} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gradient-to-r from-white/5 to-transparent border-b border-white/10">
                  <div className="col-span-5 text-xs font-bold text-muted-foreground">PRODUCT</div>
                  <div className="col-span-2 text-xs font-bold text-muted-foreground">PRICE</div>
                  <div className="col-span-2 text-xs font-bold text-muted-foreground">QTY</div>
                  <div className="col-span-2 text-xs font-bold text-muted-foreground">TOTAL</div>
                  <div className="col-span-1"></div>
                </div>

                {cartItems.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i }}
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b border-white/5 hover:bg-white/5 transition-colors items-center group"
                  >
                    {/* Product Image & Name */}
                    <div className="md:col-span-5 flex gap-4 items-start">
                      <div className="w-20 h-20 bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-2 flex-shrink-0 flex items-center justify-center group-hover:from-white/20 group-hover:to-white/10 transition-colors">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-white truncate text-sm md:text-base">{item.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{item.category}</p>
                      </div>
                    </div>

                    {/* Price - Hidden on mobile */}
                    <div className="md:col-span-2 hidden md:block">
                      <span className="font-semibold text-white">${item.price.toLocaleString()}</span>
                    </div>

                    {/* Quantity */}
                    <div className="md:col-span-2">
                      <div className="flex items-center gap-2 bg-black/40 rounded-lg p-2 border border-white/10 w-fit">
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-6 w-6 rounded hover:bg-white/20 text-white p-0"
                          onClick={() => updateQuantity(i, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="text-white font-bold w-5 text-center text-sm">{item.quantity}</span>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-6 w-6 rounded hover:bg-white/20 text-white p-0"
                          onClick={() => updateQuantity(i, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="md:col-span-2 hidden md:block">
                      <span className="font-bold text-primary">${(item.price * item.quantity).toLocaleString()}</span>
                    </div>

                    {/* Delete */}
                    <div className="md:col-span-1 flex justify-end">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-muted-foreground hover:text-red-400 h-8 w-8 hover:bg-red-400/10"
                        onClick={() => removeItem(i)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Delivery Info Cards */}
              <motion.div 
                variants={itemVariants}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                <div className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 hover:border-green-500/40 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <Truck className="w-5 h-5 text-green-400" />
                    <span className="font-semibold text-green-400">Free Delivery</span>
                  </div>
                  <p className="text-xs text-green-300/70">On orders over $100</p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20 hover:border-blue-500/40 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <Zap className="w-5 h-5 text-blue-400" />
                    <span className="font-semibold text-blue-400">Express</span>
                  </div>
                  <p className="text-xs text-blue-300/70">Arrives in 2-3 days</p>
                </div>
              </motion.div>

              {/* Bucket Animation */}
              <motion.div 
                variants={itemVariants}
                className="relative h-96 bg-gradient-to-b from-purple-500/5 to-pink-500/5 border border-white/10 rounded-2xl overflow-hidden flex items-center justify-center"
              >
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 via-transparent to-transparent opacity-50" />
                
                {/* Dropping Products */}
                <motion.div 
                  className="relative w-full h-full flex items-start justify-center pt-8"
                  variants={dropSequence}
                  initial="hidden"
                  animate="loop"
                >
                  {cartItems.map((item, i) => (
                    <motion.div
                      key={`drop-${item.id}`}
                      className="absolute"
                      variants={productDropVariants(i)}
                      initial="hidden"
                      animate="drop"
                    >
                      <div className="w-20 h-20 bg-white rounded-lg p-2 flex items-center justify-center shadow-2xl shadow-purple-500/30 border border-white">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Bucket Container */}
                <motion.div 
                  className="absolute bottom-8 flex items-end justify-center w-full pointer-events-none"
                  variants={bucketBounceVariants}
                  initial="hidden"
                  animate={["visible", "bounce"]}
                >
                  <div className="relative w-56 h-40">
                    {/* Bucket Body */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-32 bg-gradient-to-b from-purple-600 to-pink-600 rounded-b-3xl shadow-2xl shadow-purple-500/50 border-4 border-purple-500 flex items-center justify-center overflow-hidden">
                      {/* Bucket Handle */}
                      <div className="absolute -top-8 left-6 right-6 h-14 border-4 border-purple-500 rounded-t-full" />
                      
                      {/* Shimmer Effect */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{ x: [-200, 200] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      
                      {/* Content */}
                      <div className="text-center z-10 relative">
                        <motion.div
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          <Truck className="w-10 h-10 text-white mx-auto mb-1" />
                        </motion.div>
                        <p className="text-white font-bold text-sm">Ready for</p>
                        <p className="text-white font-bold text-sm">Delivery</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Right Section - Order Summary */}
            <motion.div 
              className="xl:col-span-2"
              variants={itemVariants}
            >
              <div className="sticky top-24 space-y-4">
                {/* Promo Code */}
                <motion.div 
                  className="p-5 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-white/10 backdrop-blur-sm hover:border-white/20 transition-colors"
                  whileHover={{ borderColor: "rgba(255,255,255,0.3)" }}
                >
                  <label className="text-xs font-bold text-muted-foreground mb-3 block">PROMO CODE</label>
                  <div className="flex gap-2">
                    <input 
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="SAVE10 or SAVE20"
                      className="flex-1 bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-primary transition-colors"
                    />
                    <Button 
                      size="sm"
                      className="bg-primary hover:bg-primary/90 px-4"
                      onClick={applyPromo}
                    >
                      <Tag className="w-4 h-4" />
                    </Button>
                  </div>
                  {discount > 0 && (
                    <motion.p 
                      className="text-xs text-green-400 mt-2 flex items-center gap-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <Check className="w-4 h-4" /> {discount}% discount applied!
                    </motion.p>
                  )}
                </motion.div>

                {/* Order Summary */}
                <motion.div 
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-5"
                  whileHover={{ borderColor: "rgba(255,255,255,0.2)" }}
                >
                  <h2 className="text-xl font-bold text-white">Order Summary</h2>

                  <div className="space-y-3 pb-5 border-b border-white/10">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-white font-semibold">${subtotal.toLocaleString()}</span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between items-center text-sm bg-gradient-to-r from-green-500/10 to-green-500/5 p-3 rounded-lg border border-green-500/20">
                        <span className="text-green-400 font-semibold">Discount ({discount}%)</span>
                        <span className="text-green-400 font-bold">-${discountAmount.toLocaleString()}</span>
                      </div>
                    )}

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className={shipping === 0 ? "text-green-400 font-semibold" : "text-white font-semibold"}>
                        {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Estimated Tax</span>
                      <span className="text-white font-semibold">${tax.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-white font-bold text-lg">Total</span>
                    <span className="text-3xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      ${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>

                  {/* Estimated Delivery */}
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                    <p className="text-xs text-blue-200">
                      <span className="font-bold">📦 Estimated Delivery:</span><br />Dec 2-3, 2025
                    </p>
                  </div>
                </motion.div>

                {/* Payment Methods */}
                <motion.div className="space-y-3">
                  <p className="text-xs font-bold text-muted-foreground">PAYMENT METHOD</p>
                  <div className="grid grid-cols-2 gap-3">
                    <motion.button
                      onClick={() => setPaymentMethod("card")}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-3 rounded-lg border transition-all text-sm font-bold flex items-center justify-center gap-2 ${
                        paymentMethod === "card"
                          ? "bg-gradient-to-r from-primary to-secondary border-primary text-white shadow-lg shadow-primary/30"
                          : "bg-white/5 border-white/10 text-muted-foreground hover:border-white/30"
                      }`}
                    >
                      <CreditCard className="w-4 h-4" /> Card
                    </motion.button>
                    <motion.button
                      onClick={() => setPaymentMethod("crypto")}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-3 rounded-lg border transition-all text-sm font-bold flex items-center justify-center gap-2 ${
                        paymentMethod === "crypto"
                          ? "bg-gradient-to-r from-primary to-secondary border-primary text-white shadow-lg shadow-primary/30"
                          : "bg-white/5 border-white/10 text-muted-foreground hover:border-white/30"
                      }`}
                    >
                      <Wallet className="w-4 h-4" /> Crypto
                    </motion.button>
                  </div>
                </motion.div>

                {/* Checkout Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link href="/checkout">
                    <Button className="w-full h-12 text-base bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-xl shadow-primary/30 font-bold">
                      Proceed to Checkout <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                </motion.div>

                {/* Trust Badges */}
                <motion.div 
                  className="space-y-2 pt-4 border-t border-white/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center gap-3 text-xs text-muted-foreground hover:text-white transition-colors">
                    <ShieldCheck className="w-4 h-4 text-green-400" />
                    SSL Encrypted
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground hover:text-white transition-colors">
                    <Check className="w-4 h-4 text-green-400" />
                    Money-back guarantee
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground hover:text-white transition-colors">
                    <Gift className="w-4 h-4 text-pink-400" />
                    Free returns 30 days
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
