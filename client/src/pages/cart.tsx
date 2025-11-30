import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import { Minus, Plus, Trash2, ArrowRight, ShieldCheck, CreditCard, Wallet, Truck, Gift, Zap, Package, Tag, Check, Clock, Shield, RefreshCw, Heart, Share2, Sparkles, Flame, Users, TrendingUp } from "lucide-react";
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
  const [deliveryOption, setDeliveryOption] = useState("standard");
  const [insurance, setInsurance] = useState(true);
  const [giftWrap, setGiftWrap] = useState(false);
  const [selectedTab, setSelectedTab] = useState("summary");

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
  const deliveryFee = deliveryOption === "express" ? 14.99 : (afterDiscount > 100 ? 0 : 9.99);
  const insuranceFee = insurance ? 4.99 : 0;
  const giftFee = giftWrap ? 3.99 : 0;
  const tax = Math.round((afterDiscount + deliveryFee) * 0.08 * 100) / 100;
  const total = afterDiscount + deliveryFee + insuranceFee + giftFee + tax;

  // Animation variants
  const productDropVariants = (index: number) => ({
    hidden: { opacity: 0, y: -500, x: 0, scale: 1 },
    drop: {
      opacity: 1,
      y: 0,
      x: (Math.random() - 0.5) * 120,
      scale: 1,
      transition: {
        duration: 0.9,
        delay: index * 0.18,
      },
    },
  });

  const bucketVariants = {
    hidden: { opacity: 0, scale: 0.3, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: Math.max(cartItems.length * 0.18, 0.7) + 0.3,
        duration: 0.6,
      },
    },
    bounce: {
      y: [0, -20, 0],
      transition: {
        duration: 0.5,
        delay: Math.max(cartItems.length * 0.18, 0.7) + 1,
      },
    },
  };

  const frequentlyBought = products.slice(5, 8);
  const loyaltyPoints = Math.floor(total);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-foreground selection:bg-primary selection:text-white">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-heading font-bold text-white mb-2">Shopping Cart</h1>
          <p className="text-muted-foreground text-sm">{cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart</p>
        </motion.div>

        {cartItems.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* LEFT SIDE - PRODUCTS & ANIMATION */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Products Card */}
              <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md">
                <div className="hidden sm:grid grid-cols-5 gap-3 p-5 bg-gradient-to-r from-white/10 to-transparent border-b border-white/10">
                  <div className="col-span-2 text-xs font-bold text-muted-foreground uppercase">Product</div>
                  <div className="text-xs font-bold text-muted-foreground uppercase">Price</div>
                  <div className="text-xs font-bold text-muted-foreground uppercase">Qty</div>
                  <div className="text-xs font-bold text-muted-foreground uppercase text-right">Total</div>
                </div>

                <div className="max-h-[600px] overflow-y-auto">
                  {cartItems.map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i }}
                      className="grid grid-cols-1 sm:grid-cols-5 gap-3 p-5 border-b border-white/5 hover:bg-white/5 transition-all duration-300 items-center group"
                    >
                      {/* Product */}
                      <div className="sm:col-span-2 flex gap-4 items-center min-w-0">
                        <div className="w-20 h-20 bg-gradient-to-br from-white/20 to-white/5 rounded-xl p-2 flex-shrink-0 flex items-center justify-center group-hover:from-white/30 group-hover:to-white/10 transition-all duration-300 shadow-lg shadow-purple-500/10">
                          <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-white truncate text-sm">{item.name}</h4>
                          <p className="text-xs text-muted-foreground">{item.category}</p>
                          <div className="flex gap-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Sparkles key={i} className="w-3 h-3 text-yellow-400" fill="currentColor" />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="hidden sm:block text-sm">
                        <span className="text-white font-semibold">${item.price.toLocaleString()}</span>
                      </div>

                      {/* Quantity */}
                      <div className="flex items-center justify-between sm:justify-center">
                        <span className="sm:hidden text-xs text-muted-foreground">Qty:</span>
                        <div className="flex items-center gap-1 bg-black/60 rounded-lg p-1.5 border border-white/20">
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            className="h-6 w-6 rounded hover:bg-white/30 text-white p-0"
                            onClick={() => updateQuantity(i, item.quantity - 1)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="text-white font-bold w-5 text-center text-xs">{item.quantity}</span>
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            className="h-6 w-6 rounded hover:bg-white/30 text-white p-0"
                            onClick={() => updateQuantity(i, item.quantity + 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>

                      {/* Total & Actions */}
                      <div className="flex items-center justify-between sm:justify-end gap-2">
                        <span className="font-bold text-primary">${(item.price * item.quantity).toLocaleString()}</span>
                        <div className="flex gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-muted-foreground hover:text-pink-400 h-6 w-6 hover:bg-pink-400/10"
                          >
                            <Heart className="w-3 h-3" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-muted-foreground hover:text-red-400 h-6 w-6 hover:bg-red-400/10"
                            onClick={() => removeItem(i)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Drop Animation - Products falling into bucket */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative h-96 bg-gradient-to-b from-purple-500/15 via-pink-500/10 to-blue-500/15 border-2 border-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-3xl overflow-hidden flex items-end justify-center backdrop-blur-sm"
                style={{
                  borderImage: "linear-gradient(135deg, rgba(168,85,247,0.3), rgba(236,72,153,0.3)) 1"
                }}
              >
                {/* Animated background glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 via-transparent to-transparent opacity-60" />
                
                {/* Grid background */}
                <div className="absolute inset-0 opacity-10">
                  <div className="grid grid-cols-12 h-full">
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className="border-r border-white/20" />
                    ))}
                  </div>
                </div>
                
                {/* Dropping Products Container */}
                <div className="relative w-full h-full flex items-start justify-center pt-8">
                  {cartItems.map((item, i) => (
                    <motion.div
                      key={`drop-${item.id}`}
                      variants={productDropVariants(i)}
                      initial="hidden"
                      animate="drop"
                      className="absolute"
                    >
                      <motion.div 
                        className="w-20 h-20 bg-white rounded-2xl p-3 flex items-center justify-center shadow-2xl shadow-purple-500/50 border-2 border-gradient-to-r from-purple-300 to-pink-300"
                        whileHover={{ scale: 1.05, rotateZ: 5 }}
                      >
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                      </motion.div>
                    </motion.div>
                  ))}
                </div>

                {/* Bucket at bottom - receives products */}
                <motion.div 
                  className="absolute bottom-0 flex items-end justify-center w-full pointer-events-none pb-4"
                  variants={bucketVariants}
                  initial="hidden"
                  animate={["visible", "bounce"]}
                >
                  <motion.div className="relative">
                    {/* Bucket glow effect */}
                    <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-purple-600 to-pink-600 opacity-50 -z-10" />
                    
                    {/* Bucket */}
                    <div className="w-44 h-32 bg-gradient-to-b from-purple-600 to-pink-600 rounded-b-3xl shadow-2xl shadow-purple-500/60 border-4 border-purple-400 flex items-center justify-center overflow-hidden relative">
                      {/* Bucket handle */}
                      <div className="absolute -top-8 left-6 right-6 h-12 border-4 border-purple-400 rounded-full" />
                      
                      {/* Shimmer effect */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        animate={{ x: [-300, 300] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      
                      {/* Content */}
                      <div className="text-center z-10 relative">
                        <motion.div
                          animate={{ y: [0, -6, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          <Truck className="w-12 h-12 text-white mx-auto mb-1" />
                        </motion.div>
                        <p className="text-white font-bold text-sm">Ready for Delivery</p>
                        <p className="text-white/80 text-xs">Checkout to continue</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Frequently Bought Together */}
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
                <h3 className="font-bold text-white text-lg flex items-center gap-2 mb-4">
                  <Flame className="w-5 h-5 text-orange-400" /> Frequently Bought Together
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {frequentlyBought.map((prod, i) => (
                    <motion.div
                      key={prod.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * i }}
                      className="p-3 rounded-lg bg-black/40 border border-white/10 hover:border-white/30 transition-all cursor-pointer group"
                    >
                      <div className="w-12 h-12 bg-white/10 rounded-lg p-1 flex items-center justify-center mb-2 group-hover:bg-white/20 transition-colors">
                        <img src={prod.image} alt={prod.name} className="w-full h-full object-contain" />
                      </div>
                      <p className="text-xs font-semibold text-white truncate">{prod.name}</p>
                      <p className="text-xs text-primary font-bold">${prod.price}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* RIGHT SIDE - ORDER SUMMARY & OPTIONS */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="sticky top-24 space-y-4 max-h-[calc(100vh-120px)] overflow-y-auto">
                {/* Promo Code */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="p-5 rounded-2xl bg-gradient-to-br from-purple-500/15 to-pink-500/15 border border-white/10 backdrop-blur-md hover:border-white/30 transition-all"
                >
                  <label className="text-xs font-bold text-muted-foreground mb-3 block">PROMO CODE</label>
                  <div className="flex gap-2">
                    <input 
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="SAVE10 or SAVE20"
                      className="flex-1 bg-black/60 border border-white/20 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all"
                    />
                    <Button 
                      className="bg-primary hover:bg-primary/90"
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

                {/* Delivery & Options Tabs */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-4"
                >
                  <div className="flex gap-2 border-b border-white/10">
                    {["delivery", "options"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setSelectedTab(tab)}
                        className={`pb-3 px-3 text-xs font-bold uppercase transition-colors ${
                          selectedTab === tab
                            ? "text-primary border-b-2 border-primary"
                            : "text-muted-foreground hover:text-white"
                        }`}
                      >
                        {tab === "delivery" ? "🚚 Delivery" : "⚙️ Options"}
                      </button>
                    ))}
                  </div>

                  {selectedTab === "delivery" && (
                    <div className="space-y-2">
                      {[
                        { id: "standard", label: "Standard", desc: "2-5 days", price: afterDiscount > 100 ? "FREE" : "$9.99" },
                        { id: "express", label: "Express", desc: "Next day", price: "$14.99" }
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => setDeliveryOption(opt.id)}
                          className={`w-full p-3 rounded-lg border transition-all text-left text-xs ${
                            deliveryOption === opt.id
                              ? "bg-primary/20 border-primary"
                              : "bg-black/40 border-white/10 hover:border-white/30"
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-white">{opt.label}</span>
                            <span className="font-bold text-primary">{opt.price}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{opt.desc}</p>
                        </button>
                      ))}
                    </div>
                  )}

                  {selectedTab === "options" && (
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 p-3 rounded-lg bg-black/40 border border-white/10 hover:border-white/20 cursor-pointer transition-all">
                        <input type="checkbox" checked={insurance} onChange={(e) => setInsurance(e.target.checked)} className="w-4 h-4 rounded" />
                        <div className="flex-1">
                          <div className="text-xs font-semibold text-white">Order Protection</div>
                          <p className="text-xs text-muted-foreground">Full coverage for loss/damage</p>
                        </div>
                        <span className="text-xs font-bold text-primary">${insurance ? "4.99" : "0"}</span>
                      </label>
                      <label className="flex items-center gap-3 p-3 rounded-lg bg-black/40 border border-white/10 hover:border-white/20 cursor-pointer transition-all">
                        <input type="checkbox" checked={giftWrap} onChange={(e) => setGiftWrap(e.target.checked)} className="w-4 h-4 rounded" />
                        <div className="flex-1">
                          <div className="text-xs font-semibold text-white">Gift Wrap</div>
                          <p className="text-xs text-muted-foreground">Beautiful presentation included</p>
                        </div>
                        <span className="text-xs font-bold text-primary">${giftWrap ? "3.99" : "0"}</span>
                      </label>
                    </div>
                  )}
                </motion.div>

                {/* Order Summary */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-md space-y-4"
                >
                  <h2 className="text-lg font-bold text-white">Order Summary</h2>

                  <div className="space-y-3 pb-4 border-b border-white/10">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-white font-semibold">${subtotal.toLocaleString()}</span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between text-sm bg-green-500/10 p-2 rounded border border-green-500/20">
                        <span className="text-green-400 font-semibold">Discount</span>
                        <span className="text-green-400 font-bold">-${discountAmount.toLocaleString()}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Delivery</span>
                      <span className={deliveryFee === 0 ? "text-green-400 font-semibold" : "text-white font-semibold"}>
                        {deliveryFee === 0 ? "FREE" : `$${deliveryFee.toFixed(2)}`}
                      </span>
                    </div>

                    {insurance && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Insurance</span>
                        <span className="text-white font-semibold">${insuranceFee.toFixed(2)}</span>
                      </div>
                    )}

                    {giftWrap && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Gift Wrap</span>
                        <span className="text-white font-semibold">${giftFee.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax</span>
                      <span className="text-white font-semibold">${tax.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <span className="text-white font-bold">Total</span>
                    <span className="text-3xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      ${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </motion.div>

                {/* Payment Methods */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="space-y-3"
                >
                  <p className="text-xs font-bold text-muted-foreground">PAYMENT METHOD</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "card", icon: CreditCard, label: "Card" },
                      { id: "crypto", icon: Wallet, label: "Crypto" }
                    ].map((method) => {
                      const Icon = method.icon;
                      return (
                        <button
                          key={method.id}
                          onClick={() => setPaymentMethod(method.id)}
                          className={`p-3 rounded-lg border transition-all text-xs font-bold flex items-center justify-center gap-2 ${
                            paymentMethod === method.id
                              ? "bg-gradient-to-r from-primary to-secondary border-primary text-white shadow-lg shadow-primary/30"
                              : "bg-black/40 border-white/10 text-muted-foreground hover:border-white/30"
                          }`}
                        >
                          <Icon className="w-4 h-4" /> {method.label}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>

                {/* Estimated Delivery */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-blue-500/15 border border-blue-500/30 rounded-lg p-4"
                >
                  <p className="text-xs text-blue-200 flex items-center gap-2">
                    <Clock className="w-4 h-4 flex-shrink-0" />
                    <span><span className="font-bold">Est. Delivery:</span> {deliveryOption === "express" ? "Tomorrow" : "Dec 2-3"}</span>
                  </p>
                </motion.div>

                {/* Checkout Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
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
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="grid grid-cols-2 gap-2 text-xs"
                >
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10">
                    <ShieldCheck className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span className="text-muted-foreground">SSL Secure</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10">
                    <RefreshCw className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <span className="text-muted-foreground">30-Day Return</span>
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
