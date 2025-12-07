import { Navbar } from "@/components/navbar";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { CreditCard, Wallet, Lock, Check, Truck, MapPin, User, Mail, Phone, Gift, Zap, ShieldCheck, ChevronRight, MapPinIcon, Smartphone, Banknote, PartyPopper, AlertCircle, Tag, Globe, Clock, ShoppingBag } from "lucide-react";
import { useLocation, Link } from "wouter";
import { useCart } from "@/hooks/use-cart";
import { useAuthStore } from "@/stores/auth";
import { Footer } from "@/components/layout/footer";

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export default function CheckoutPage() {
  const [, navigate] = useLocation();
  const { items, getSubtotal, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    paymentMethod: "card",
    cardNumber: "",
    cardExpiry: "",
    cardCVC: "",
    giftMessage: "",
    instructions: "",
    latitude: 40.7128,
    longitude: -74.0060,
    location: "New York, NY",
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderStatus, setOrderStatus] = useState("pending");
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    bkashPhone: "",
    nagadPhone: "",
    rocketPhone: "",
    cryptoNetwork: "",
    walletAddress: "",
    codCharge: 0,
    promoCode: "",
  });

  const [deliveryOption, setDeliveryOption] = useState("standard");

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return formData.email && formData.firstName && formData.lastName && formData.phone;
      case 2:
        return formData.address && formData.city && formData.state && formData.zipCode && formData.location;
      case 3:
        return validatePaymentMethod();
      case 4:
        return true;
      default:
        return false;
    }
  };

  const validatePaymentMethod = () => {
    if (formData.paymentMethod === "card") return formData.cardNumber && formData.cardExpiry && formData.cardCVC;
    if (formData.paymentMethod === "banking") return paymentDetails.bkashPhone || paymentDetails.nagadPhone || paymentDetails.rocketPhone;
    if (formData.paymentMethod === "crypto") return paymentDetails.cryptoNetwork;
    if (formData.paymentMethod === "cod") return true;
    return false;
  };

  const handleMapClick = (lat: number, lng: number, location: string) => {
    setFormData(prev => ({ ...prev, latitude: lat, longitude: lng, location }));
  };

  const handleBankingPayment = async (provider: string, phone: string) => {
    setIsProcessing(true);
    setOrderStatus("validating");
    
    await new Promise(r => setTimeout(r, 1500));
    setOrderStatus("payment_initiated");
    
    // Simulate API call to bKash/Nagad/Rocket
    await new Promise(r => setTimeout(r, 2000));
    
    alert(`${provider.toUpperCase()} Payment Link Sent!\n\nPhone: ${phone}\n\nPlease complete payment in your banking app.`);
    
    setOrderStatus("processing");
    await new Promise(r => setTimeout(r, 2500));
    setOrderStatus("confirmed");
    await new Promise(r => setTimeout(r, 1500));
    setOrderStatus("shipped");
    await new Promise(r => setTimeout(r, 1000));
    setShowSuccess(true);
    clearCart();
    await new Promise(r => setTimeout(r, 3000));
    navigate("/");
  };

  const handleCryptoPayment = async () => {
    setIsProcessing(true);
    setOrderStatus("validating");
    
    await new Promise(r => setTimeout(r, 1500));
    setOrderStatus("wallet_connect");
    
    // Simulate Web3 wallet connection
    const providers: any = {
      metamask: "MetaMask",
      coinbase: "Coinbase Wallet",
    };
    
    alert(`Connecting to ${providers[paymentDetails.cryptoNetwork]}...\n\nPlease approve the transaction in your wallet.`);
    
    setOrderStatus("processing");
    await new Promise(r => setTimeout(r, 2500));
    setOrderStatus("confirmed");
    await new Promise(r => setTimeout(r, 1500));
    setOrderStatus("shipped");
    await new Promise(r => setTimeout(r, 1000));
    setShowSuccess(true);
    clearCart();
    await new Promise(r => setTimeout(r, 3000));
    navigate("/");
  };

  const handlePlaceOrder = async () => {
    if (formData.paymentMethod === "banking") {
      const provider = paymentDetails.bkashPhone ? "bkash" : paymentDetails.nagadPhone ? "nagad" : "rocket";
      const phone = paymentDetails.bkashPhone || paymentDetails.nagadPhone || paymentDetails.rocketPhone;
      await handleBankingPayment(provider, phone);
    } else if (formData.paymentMethod === "crypto") {
      await handleCryptoPayment();
    } else {
      setIsProcessing(true);
      setOrderStatus("validating");
      await new Promise(r => setTimeout(r, 1500));
      setOrderStatus("processing");
      await new Promise(r => setTimeout(r, 2000));
      setOrderStatus("confirmed");
      setCompletedSteps([...completedSteps, "step-4"]);
      await new Promise(r => setTimeout(r, 1500));
      setOrderStatus("shipped");
      await new Promise(r => setTimeout(r, 1000));
      setShowSuccess(true);
      clearCart();
      await new Promise(r => setTimeout(r, 3000));
      navigate("/");
    }
  };

  const steps = [
    { id: "contact", title: "Contact", icon: <Mail className="w-5 h-5" />, completed: completedSteps.includes("step-1") },
    { id: "shipping", title: "Shipping", icon: <MapPin className="w-5 h-5" />, completed: completedSteps.includes("step-2") },
    { id: "payment", title: "Payment", icon: <CreditCard className="w-5 h-5" />, completed: completedSteps.includes("step-3") },
    { id: "review", title: "Review", icon: <Check className="w-5 h-5" />, completed: completedSteps.includes("step-4") },
  ];

  const deliveryOptions = [
    { id: "standard", label: "Standard", charge: 0, days: "5-7", icon: "📦" },
    { id: "express", label: "Express", charge: 9.99, days: "2-3", icon: "🚚" },
    { id: "overnight", label: "Overnight", charge: 24.99, days: "1", icon: "✈️" },
  ];

  const subtotal = getSubtotal();
  const deliveryCharge = deliveryOptions.find(o => o.id === deliveryOption)?.charge || 0;
  const tax = Math.round(subtotal * 0.08 * 100) / 100;
  const finalTotal = subtotal + deliveryCharge + tax + paymentDetails.codCharge;

  const statusConfig: any = {
    pending: { icon: Clock, color: "text-yellow-400", label: "Pending" },
    validating: { icon: ShieldCheck, color: "text-blue-400", label: "Validating" },
    payment_initiated: { icon: Smartphone, color: "text-cyan-400", label: "Payment Initiated" },
    wallet_connect: { icon: Wallet, color: "text-purple-400", label: "Connecting Wallet" },
    processing: { icon: Zap, color: "text-cyan-400", label: "Processing" },
    confirmed: { icon: Check, color: "text-green-400", label: "Confirmed" },
    shipped: { icon: Truck, color: "text-purple-400", label: "Shipped" },
  };

  const StatusIcon = statusConfig[orderStatus]?.icon || Zap;
  const statusColor = statusConfig[orderStatus]?.color || "text-yellow-400";

  // Success Screen
  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.8, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="text-center px-4 max-w-md">
          <motion.div animate={{ rotate: 360, scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="inline-block mb-6">
            <PartyPopper className="w-16 h-16 text-primary" />
          </motion.div>

          <h1 className="text-5xl font-heading font-bold text-white mb-4">Order Confirmed!</h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-lg text-muted-foreground mb-2">
            Thank you for your purchase
          </motion.p>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="text-lg text-primary mb-8 font-semibold">
            Order ID: #NX{Math.random().toString(36).substr(2, 9).toUpperCase()}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Location</span><span className="text-white font-semibold">{formData.location}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Total Paid</span><span className="text-white font-semibold">${finalTotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span className="text-green-400 font-semibold">{deliveryOptions.find(o => o.id === deliveryOption)?.label}</span></div>
            </div>
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="text-muted-foreground">
            Redirecting to home...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-foreground selection:bg-primary selection:text-white">
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-20">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-heading font-bold text-white mb-2">Secure Checkout</h1>
          <p className="text-muted-foreground text-sm">Complete your purchase safely and securely</p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-12">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <motion.button
                  onClick={() => index < currentStep && setCurrentStep(index + 1)}
                  className={`relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${
                    index + 1 === currentStep
                      ? "bg-gradient-to-r from-primary to-secondary border-primary shadow-lg shadow-primary/30"
                      : step.completed
                      ? "bg-green-500/20 border-green-500"
                      : "bg-white/5 border-white/20"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {step.completed ? (
                    <Check className="w-6 h-6 text-green-400" />
                  ) : (
                    <span className={`text-sm font-bold ${index + 1 === currentStep ? "text-white" : "text-muted-foreground"}`}>
                      {index + 1}
                    </span>
                  )}
                </motion.button>

                {index < steps.length - 1 && (
                  <motion.div
                    className="flex-1 h-1 mx-2 rounded-full bg-white/10"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: index + 1 < currentStep ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ originX: 0 }}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-between text-xs md:text-sm">
            {steps.map(step => (
              <span key={step.id} className={`font-semibold ${step.completed || steps.indexOf(step) + 1 === currentStep ? "text-white" : "text-muted-foreground"}`}>
                {step.title}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Checkout Form */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2 space-y-6">
            {/* Step 1: Contact */}
            {currentStep === 1 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-md">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Mail className="w-6 h-6 text-primary" /> Contact Information
                </h2>

                <div className="space-y-4">
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email Address" className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First Name" className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all" />
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last Name" className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all" />
                  </div>

                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone Number" className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all" />
                </div>
              </motion.div>
            )}

            {/* Step 2: Shipping with Google Maps */}
            {currentStep === 2 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-md space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Truck className="w-6 h-6 text-primary" /> Shipping Address
                </h2>

                {/* Google Maps Embed */}
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full h-80 rounded-2xl overflow-hidden border border-white/10">
                  <iframe
                    width="100%"
                    height="100%"
                    style={{ border: "none" }}
                    loading="lazy"
                    allowFullScreen
                    src={`https://www.google.com/maps/embed/v1/view?key=AIzaSyDyWJOw5REfhChJJLKD2PN7V_XpDEfBjhg&center=${formData.latitude},${formData.longitude}&zoom=12`}
                  />
                </motion.div>

                {/* Location Selector */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { name: "New York, NY", lat: 40.7128, lng: -74.0060 },
                    { name: "Los Angeles, CA", lat: 34.0522, lng: -118.2437 },
                    { name: "Chicago, IL", lat: 41.8781, lng: -87.6298 },
                    { name: "Houston, TX", lat: 29.7604, lng: -95.3698 },
                    { name: "Miami, FL", lat: 25.7617, lng: -80.1918 },
                    { name: "Seattle, WA", lat: 47.6062, lng: -122.3321 },
                  ].map((loc, i) => (
                    <motion.button
                      key={loc.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => handleMapClick(loc.lat, loc.lng, loc.name)}
                      className={`p-3 rounded-lg border transition-all text-left text-sm ${
                        formData.location === loc.name
                          ? "bg-primary/20 border-primary"
                          : "bg-black/40 border-white/10 hover:border-white/30"
                      }`}
                      whileHover={{ scale: 1.02 }}
                    >
                      <p className="font-semibold text-white">{loc.name}</p>
                    </motion.button>
                  ))}
                </div>

                {/* Address Form */}
                <div className="space-y-4">
                  <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Street Address" className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all" />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="City" className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all" />
                    <input type="text" name="state" value={formData.state} onChange={handleInputChange} placeholder="State" className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all" />
                    <input type="text" name="zipCode" value={formData.zipCode} onChange={handleInputChange} placeholder="Zip Code" className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all" />
                  </div>

                  <textarea name="instructions" value={formData.instructions} onChange={handleInputChange} placeholder="Delivery instructions..." rows={2} className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all resize-none" />
                </div>

                {/* Delivery Options */}
                <div className="border-t border-white/10 pt-6">
                  <h3 className="text-lg font-bold text-white mb-4">Delivery Speed</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {deliveryOptions.map((opt, i) => (
                      <motion.button
                        key={opt.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        onClick={() => setDeliveryOption(opt.id)}
                        className={`p-4 rounded-lg border-2 transition-all text-left ${
                          deliveryOption === opt.id
                            ? "bg-primary/20 border-primary"
                            : "bg-black/40 border-white/10 hover:border-white/30"
                        }`}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="text-2xl mb-2">{opt.icon}</div>
                        <p className="font-semibold text-white">{opt.label}</p>
                        <p className="text-xs text-muted-foreground">{opt.days} days</p>
                        <p className="text-sm text-primary font-bold mt-2">{opt.charge === 0 ? "FREE" : `+$${opt.charge}`}</p>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Payment */}
            {currentStep === 3 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-md space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Lock className="w-6 h-6 text-primary" /> Payment Method
                </h2>

                {/* Payment Methods */}
                <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
                  {[
                    { id: "card", icon: "💳", label: "Card" },
                    { id: "banking", icon: "📱", label: "Mobile Banking" },
                    { id: "crypto", icon: "🪙", label: "Crypto" },
                    { id: "cod", icon: "💵", label: "Cash on Delivery" },
                  ].map((method, i) => (
                    <motion.button
                      key={method.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * i }}
                      onClick={() => setFormData(prev => ({ ...prev, paymentMethod: method.id }))}
                      className={`p-4 rounded-lg border-2 transition-all text-center ${
                        formData.paymentMethod === method.id
                          ? "bg-primary/20 border-primary shadow-lg shadow-primary/30"
                          : "bg-black/40 border-white/20 hover:border-white/40"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="text-2xl mb-2">{method.icon}</div>
                      <span className="text-xs font-semibold text-white">{method.label}</span>
                    </motion.button>
                  ))}
                </div>

                {/* Card Payment */}
                {formData.paymentMethod === "card" && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/30 space-y-4">
                    <p className="text-sm text-blue-200 mb-4">💳 Secured by Stripe</p>
                    <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} placeholder="Card Number" maxLength={19} className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all" />
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" name="cardExpiry" value={formData.cardExpiry} onChange={handleInputChange} placeholder="MM/YY" maxLength={5} className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all" />
                      <input type="text" name="cardCVC" value={formData.cardCVC} onChange={handleInputChange} placeholder="CVC" maxLength={3} className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all" />
                    </div>
                  </motion.div>
                )}

                {/* Mobile Banking */}
                {formData.paymentMethod === "banking" && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 p-4 rounded-lg bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border border-cyan-500/30">
                    <p className="text-sm text-cyan-200 font-semibold mb-4">📱 Select Banking Provider</p>
                    <div className="space-y-3">
                      {[
                        { id: "bkash", label: "🔴 bKash", key: "bkashPhone" },
                        { id: "nagad", label: "🟡 Nagad", key: "nagadPhone" },
                        { id: "rocket", label: "🟢 Rocket", key: "rocketPhone" },
                      ].map((service: any) => (
                        <div key={service.id} className="flex items-center gap-2">
                          <input
                            type="tel"
                            placeholder={`${service.label.split(" ")[1]} Number`}
                            value={paymentDetails[service.key as keyof typeof paymentDetails]}
                            onChange={(e) => setPaymentDetails(prev => ({ ...prev, [service.key]: e.target.value }))}
                            className="flex-1 bg-black/40 border border-white/20 rounded-lg px-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all text-sm"
                          />
                          <motion.button
                            onClick={() => paymentDetails[service.key as keyof typeof paymentDetails] && handleBankingPayment(service.id, paymentDetails[service.key as keyof typeof paymentDetails] as string)}
                            className="px-4 py-2 bg-primary/20 border border-primary rounded-lg text-primary font-semibold hover:bg-primary/30 transition-all text-sm"
                            whileHover={{ scale: 1.05 }}
                          >
                            Send
                          </motion.button>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-cyan-300 mt-4">✓ OTP will be sent to your registered phone number</p>
                  </motion.div>
                )}

                {/* Cryptocurrency */}
                {formData.paymentMethod === "crypto" && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-lg bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/30 space-y-4">
                    <p className="text-sm text-purple-200 font-semibold mb-4">🪙 Select Cryptocurrency & Wallet</p>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: "metamask", icon: "🦊", label: "MetaMask" },
                        { id: "coinbase", icon: "⭕", label: "Coinbase" },
                      ].map((wallet: any) => (
                        <motion.button
                          key={wallet.id}
                          onClick={() => setPaymentDetails(prev => ({ ...prev, cryptoNetwork: wallet.id }))}
                          className={`p-3 rounded-lg border transition-all text-left text-sm ${
                            paymentDetails.cryptoNetwork === wallet.id
                              ? "bg-primary/20 border-primary"
                              : "bg-black/40 border-white/20 hover:border-white/40"
                          }`}
                          whileHover={{ scale: 1.05 }}
                        >
                          <p className="text-lg mb-1">{wallet.icon}</p>
                          <p className="font-semibold text-white">{wallet.label}</p>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Cash on Delivery */}
                {formData.paymentMethod === "cod" && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-lg bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/30 space-y-4">
                    <p className="text-sm text-green-200 font-semibold mb-4">💵 Delivery Charges</p>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: "Standard", charge: 0 },
                        { label: "+$2 Fee", charge: 2 },
                        { label: "+$5 Premium", charge: 5 },
                      ].map((fee: any) => (
                        <motion.button
                          key={fee.label}
                          onClick={() => setPaymentDetails(prev => ({ ...prev, codCharge: fee.charge }))}
                          className={`p-2 rounded-lg border transition-all text-xs font-semibold ${
                            paymentDetails.codCharge === fee.charge
                              ? "bg-primary/20 border-primary text-white"
                              : "bg-black/40 border-white/20 hover:border-white/40 text-white"
                          }`}
                          whileHover={{ scale: 1.05 }}
                        >
                          {fee.label}
                        </motion.button>
                      ))}
                    </div>
                    <div className="mt-4 border-t border-white/10 pt-4">
                      <input
                        type="text"
                        placeholder="Promo Code (Optional)"
                        value={paymentDetails.promoCode}
                        onChange={(e) => setPaymentDetails(prev => ({ ...prev, promoCode: e.target.value }))}
                        className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all text-sm"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Gift Message */}
                <div>
                  <label className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                    <Gift className="w-4 h-4" /> Gift Message
                  </label>
                  <textarea name="giftMessage" value={formData.giftMessage} onChange={handleInputChange} placeholder="Write a message..." rows={2} className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all resize-none" />
                </div>
              </motion.div>
            )}

            {/* Step 4: Review */}
            {currentStep === 4 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                {[
                  { title: "Contact", icon: <User className="w-5 h-5 text-primary" />, content: `${formData.firstName} ${formData.lastName} • ${formData.email}` },
                  { title: "Location", icon: <MapPinIcon className="w-5 h-5 text-primary" />, content: formData.location },
                  { title: "Delivery", icon: <Truck className="w-5 h-5 text-primary" />, content: `${deliveryOptions.find(o => o.id === deliveryOption)?.label} (+$${deliveryCharge.toFixed(2)})` },
                  { title: "Payment", icon: <CreditCard className="w-5 h-5 text-primary" />, content: formData.paymentMethod === "card" ? "Credit Card" : formData.paymentMethod === "banking" ? "Mobile Banking" : formData.paymentMethod === "crypto" ? "Cryptocurrency" : "Cash on Delivery" },
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * i }} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                    <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                      {item.icon} {item.title}
                    </h3>
                    <p className="text-white font-semibold">{item.content}</p>
                  </motion.div>
                ))}

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/30 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                      <Check className="w-6 h-6 text-green-400" />
                    </motion.div>
                    <span className="text-green-400 font-semibold">Ready to complete your order</span>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Status Indicator */}
            {isProcessing && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                <motion.div className="bg-slate-900 border border-white/10 rounded-3xl p-8 max-w-md w-full mx-4" initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
                  <div className="text-center">
                    <motion.div animate={{ rotate: 360, scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="inline-block mb-4">
                      <StatusIcon className={`w-10 h-10 ${statusColor}`} />
                    </motion.div>

                    <p className="text-white font-bold text-lg mb-2">
                      {statusConfig[orderStatus]?.label || "Processing"}
                    </p>

                    {/* Animated dots */}
                    <div className="flex justify-center gap-1.5">
                      {[0, 1, 2].map(i => (
                        <motion.div
                          key={i}
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ delay: i * 0.2, duration: 1.5, repeat: Infinity }}
                          className={`w-2 h-2 rounded-full ${statusColor}`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Navigation */}
            <div className="flex gap-4 pt-6">
              {currentStep > 1 && (
                <motion.button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="flex-1 px-6 py-3 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-all font-semibold"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Back
                </motion.button>
              )}
              {currentStep < 4 && (
                <motion.button
                  onClick={() => {
                    if (validateStep(currentStep)) {
                      setCompletedSteps([...completedSteps, `step-${currentStep}`]);
                      setCurrentStep(currentStep + 1);
                    }
                  }}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:opacity-90 transition-all font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Next <ChevronRight className="w-4 h-4" />
                </motion.button>
              )}
              {currentStep === 4 && (
                <motion.button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:opacity-90 transition-all font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isProcessing ? "Processing..." : "Place Order"} <Check className="w-4 h-4" />
                </motion.button>
              )}
            </div>
          </motion.div>

          {/* Order Summary */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
                <h3 className="text-lg font-bold text-white mb-4">Order Summary</h3>
                <div className="space-y-3 pb-4 border-b border-white/10">
                  <div className="flex justify-between text-sm"><span className="text-muted-foreground">iPhone 15 Pro Max</span><span className="text-white">$1,199</span></div>
                  <div className="flex justify-between text-sm"><span className="text-muted-foreground">Sony Headphones x2</span><span className="text-white">$698</span></div>
                </div>

                <div className="space-y-3 py-4">
                  <div className="flex justify-between text-sm"><span className="text-muted-foreground">Subtotal</span><span className="text-white">${total}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-muted-foreground">Delivery</span><span className="text-green-400 font-semibold">{deliveryCharge === 0 ? "FREE" : `+$${deliveryCharge.toFixed(2)}`}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-muted-foreground">Insurance</span><span className="text-white">$4.99</span></div>
                  <div className="flex justify-between text-sm"><span className="text-muted-foreground">COD Fee</span><span className="text-white">${paymentDetails.codCharge.toFixed(2)}</span></div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                  <span className="text-white font-bold">Total</span>
                  <span className="text-2xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md space-y-2">
                {[
                  { icon: <ShieldCheck className="w-4 h-4" />, text: "SSL Encrypted" },
                  { icon: <Lock className="w-4 h-4" />, text: "Secure Payment" },
                  { icon: <Truck className="w-4 h-4" />, text: "Insured Delivery" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-primary">{item.icon}</span>
                    <span className="text-xs text-muted-foreground">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
