import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2, ArrowRight, ShieldCheck, CreditCard, Wallet, Truck, Gift, Zap, Package, Tag, Check, Clock, Shield, RefreshCw, Heart, Share2, Sparkles, Flame, Users, TrendingUp } from "lucide-react";
import { Link } from "wouter";
import { useState, useMemo, useRef, useEffect } from "react";
import { useCart } from "@/hooks/use-cart";
import { Footer } from "@/components/layout/footer";

export default function CartPage() {
  const { items, updateQuantity, removeItem, getSubtotal, getTax, getShipping, getTotal, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [deliveryOption, setDeliveryOption] = useState("standard");
  const [insurance, setInsurance] = useState(true);
  const [giftWrap, setGiftWrap] = useState(false);
  const [selectedTab, setSelectedTab] = useState("delivery");

  const handleUpdateQuantity = (productId: string, newQty: number) => {
    if (newQty <= 0) {
      removeItem(productId);
      return;
    }
    updateQuantity(productId, newQty);
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

  const subtotal = getSubtotal();
  const discountAmount = (subtotal * discount) / 100;
  const afterDiscount = subtotal - discountAmount;
  const deliveryFee = deliveryOption === "express" ? 14.99 : (afterDiscount > 100 ? 0 : 9.99);
  const insuranceFee = insurance ? 4.99 : 0;
  const giftFee = giftWrap ? 3.99 : 0;
  const tax = Math.round((afterDiscount + deliveryFee) * 0.08 * 100) / 100;
  const total = afterDiscount + deliveryFee + insuranceFee + giftFee + tax;

  const dropOffsets = useMemo(() => 
    items.map(() => (Math.random() - 0.5) * 120), 
    [items.length]
  );

  const productDropVariants = (index: number) => ({
    hidden: { opacity: 0, y: -500, x: 0, scale: 1 },
    drop: {
      opacity: 1,
      y: 0,
      x: dropOffsets[index] || 0,
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
        delay: Math.max(items.length * 0.18, 0.7) + 0.3,
        duration: 0.6,
      },
    },
    bounce: {
      y: [0, -20, 0],
      transition: {
        duration: 0.5,
        delay: Math.max(items.length * 0.18, 0.7) + 1,
      },
    },
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-foreground selection:bg-primary selection:text-white">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-heading font-bold text-white mb-2">Shopping Cart</h1>
          <p className="text-muted-foreground text-sm">{items.length} {items.length === 1 ? "item" : "items"} in your cart</p>
        </motion.div>

        {items.length === 0 ? (
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4 md:space-y-6"
            >
              <div className="bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl overflow-hidden backdrop-blur-md">
                <div className="hidden md:grid grid-cols-5 gap-2 md:gap-3 p-3 md:p-5 bg-gradient-to-r from-white/10 to-transparent border-b border-white/10">
                  <div className="col-span-2 text-xs font-bold text-muted-foreground uppercase">Product</div>
                  <div className="text-xs font-bold text-muted-foreground uppercase">Price</div>
                  <div className="text-xs font-bold text-muted-foreground uppercase">Qty</div>
                  <div className="text-xs font-bold text-muted-foreground uppercase text-right">Total</div>
                </div>

                <div className="hide-scrollbar max-h-[500px] md:max-h-[400px] overflow-y-auto">
                  {items.map((item, i) => (
                    <motion.div
                      key={item.product.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i }}
                      className="grid grid-cols-4 md:grid-cols-5 gap-2 md:gap-3 p-3 md:p-5 border-b border-white/5 hover:bg-white/5 transition-all duration-300 items-center group"
                    >
                      <div className="md:col-span-2 col-span-3 flex gap-2 md:gap-4 items-center min-w-0">
                        <div className="w-14 h-14 md:w-20 md:h-20 bg-gradient-to-br from-white/20 to-white/5 rounded-lg md:rounded-xl p-2 flex-shrink-0 flex items-center justify-center group-hover:from-white/30 group-hover:to-white/10 transition-all duration-300 shadow-lg shadow-purple-500/10">
                          <img src={item.product.image} alt={item.product.name} className="w-full h-full object-contain" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-white truncate text-xs md:text-sm">{item.product.name}</h4>
                          {item.product.selectedColor && (
                            <p className="text-xs text-muted-foreground">Color: {item.product.selectedColor}</p>
                          )}
                          {item.product.selectedSize && (
                            <p className="text-xs text-muted-foreground">Size: {item.product.selectedSize}</p>
                          )}
                          <div className="flex gap-0.5 mt-1 md:flex">
                            {[...Array(5)].map((_, i) => (
                              <Sparkles key={i} className="w-2 md:w-3 h-2 md:h-3 text-yellow-400" fill="currentColor" />
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="hidden md:block text-sm">
                        <span className="text-white font-semibold">${item.product.price.toLocaleString()}</span>
                        {item.product.originalPrice && (
                          <span className="text-xs text-muted-foreground line-through ml-2">
                            ${item.product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>

                      <div className="col-span-1 flex items-center justify-end md:justify-center">
                        <div className="flex items-center gap-0.5 bg-black/60 rounded-lg p-1 md:p-1.5 border border-white/20">
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            className="h-5 w-5 md:h-6 md:w-6 rounded hover:bg-white/30 text-white p-0 text-xs"
                            onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
                          >
                            <Minus className="w-2.5 h-2.5 md:w-3 md:h-3" />
                          </Button>
                          <span className="text-white font-bold w-4 md:w-5 text-center text-xs">{item.quantity}</span>
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            className="h-5 w-5 md:h-6 md:w-6 rounded hover:bg-white/30 text-white p-0"
                            onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="w-2.5 h-2.5 md:w-3 md:h-3" />
                          </Button>
                        </div>
                      </div>

                      <div className="col-span-1 flex items-center justify-end gap-1">
                        <span className="font-bold text-primary text-xs md:text-sm">${(item.product.price * item.quantity).toLocaleString()}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-muted-foreground hover:text-red-400 h-5 w-5 md:h-6 md:w-6 hover:bg-red-400/10 flex-shrink-0"
                          onClick={() => removeItem(item.product.id)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative h-64 md:h-96 bg-gradient-to-b from-purple-500/15 via-pink-500/10 to-blue-500/15 border-2 border-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-2xl md:rounded-3xl overflow-hidden flex items-end justify-center backdrop-blur-sm"
                style={{
                  borderImage: "linear-gradient(135deg, rgba(168,85,247,0.3), rgba(236,72,153,0.3)) 1"
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 via-transparent to-transparent opacity-60" />
                
                <div className="absolute inset-0 opacity-10">
                  <div className="grid grid-cols-12 h-full">
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className="border-r border-white/20" />
                    ))}
                  </div>
                </div>
                
                <div className="relative w-full h-full flex items-start justify-center pt-4 md:pt-8">
                  {items.slice(0, 6).map((item, i) => (
                    <motion.div
                      key={`drop-${item.product.id}`}
                      initial={{ opacity: 0, y: -500 }}
                      animate={{ opacity: 1, y: 0, x: (i - 2.5) * 40 }}
                      transition={{ duration: 0.9, delay: i * 0.18 }}
                      className="absolute"
                    >
                      <motion.div 
                        className="w-14 h-14 md:w-20 md:h-20 bg-white rounded-xl md:rounded-2xl p-2 md:p-3 flex items-center justify-center shadow-2xl shadow-purple-500/50 border-2 border-gradient-to-r from-purple-300 to-pink-300"
                        whileHover={{ scale: 1.05, rotateZ: 5 }}
                      >
                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-contain" />
                      </motion.div>
                    </motion.div>
                  ))}
                </div>

                <motion.div 
                  className="absolute bottom-0 flex items-end justify-center w-full pointer-events-none pb-2 md:pb-4"
                  variants={bucketVariants}
                  initial="hidden"
                  animate={["visible", "bounce"]}
                >
                  <motion.div className="relative">
                    <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-purple-600 to-pink-600 opacity-50 -z-10" />
                    
                    <div className="w-32 h-24 md:w-44 md:h-32 bg-gradient-to-b from-purple-600 to-pink-600 rounded-b-2xl md:rounded-b-3xl shadow-2xl shadow-purple-500/60 border-4 border-purple-400 flex items-center justify-center overflow-hidden relative">
                      <div className="absolute -top-6 md:-top-8 left-4 md:left-6 right-4 md:right-6 h-8 md:h-12 border-4 border-purple-400 rounded-full" />
                      
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        animate={{ x: [-300, 300] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      
                      <div className="text-center z-10 relative">
                        <motion.div
                          animate={{ y: [0, -6, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          <Truck className="w-8 h-8 md:w-12 md:h-12 text-white mx-auto mb-0.5 md:mb-1" />
                        </motion.div>
                        <p className="text-white font-bold text-xs md:text-sm">Ready for Delivery</p>
                        <p className="text-white/80 text-xs hidden md:block">Checkout to continue</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>

            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="space-y-4">
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
                        {tab === "delivery" ? "Delivery" : "Options"}
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

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-md space-y-4"
                >
                  <h2 className="text-lg font-bold text-white">Order Summary</h2>

                  <div className="space-y-3 pb-4 border-b border-white/10">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal ({items.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                      <span className="text-white font-semibold">${subtotal.toLocaleString()}</span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between text-sm bg-green-500/10 p-2 rounded border border-green-500/20">
                        <span className="text-green-400 font-semibold">Discount ({discount}%)</span>
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
                      <span className="text-muted-foreground">Tax (8%)</span>
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
                              ? "bg-primary/20 border-primary text-primary"
                              : "bg-black/40 border-white/10 text-white hover:border-white/30"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          {method.label}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>

                <Link href="/checkout">
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-primary via-purple-500 to-secondary text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all mt-4"
                  >
                    <ShieldCheck className="w-5 h-5" />
                    Proceed to Checkout
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>

                <div className="flex items-center justify-center gap-4 pt-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Shield className="w-3 h-3" /> Secure Checkout
                  </div>
                  <div className="flex items-center gap-1">
                    <RefreshCw className="w-3 h-3" /> Easy Returns
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> 24/7 Support
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
