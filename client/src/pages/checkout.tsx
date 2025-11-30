import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { CreditCard, Wallet, Lock, Check, Truck, MapPin, User, Mail, Phone, Gift, Clock, Zap, ShieldCheck, ChevronRight, MapPinIcon, Smartphone, Banknote, PartyPopper, AlertCircle, ArrowRight, Eye, EyeOff, Building2, TrendingUp, Tag, Home } from "lucide-react";
import { useLocation } from "wouter";

interface CheckoutStep {
  id: string;
  title: string;
  icon: React.ReactNode;
  completed: boolean;
}

interface MapLocation {
  name: string;
  lat: number;
  lng: number;
  emoji: string;
}

export default function CheckoutPage() {
  const [, navigate] = useLocation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [mapOpen, setMapOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<MapLocation>({ name: "New York, NY", lat: 40.7128, lng: -74.0060, emoji: "🗽" });
  const [paymentProcess, setPaymentProcess] = useState<string>("");
  const [selectedCrypto, setSelectedCrypto] = useState("");
  const [deliveryOption, setDeliveryOption] = useState("standard");
  const [customOffer, setCustomOffer] = useState(false);

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
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderStatus, setOrderStatus] = useState("pending");
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return formData.email && formData.firstName && formData.lastName && formData.phone;
      case 2:
        return selectedLocation && formData.address && formData.city && formData.state && formData.zipCode;
      case 3:
        return formData.paymentMethod === "crypto" || formData.paymentMethod === "cod" || formData.paymentMethod === "banking" || (formData.cardNumber && formData.cardExpiry && formData.cardCVC);
      case 4:
        return true;
      default:
        return false;
    }
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCompletedSteps([...completedSteps, `step-${currentStep}`]);
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    setOrderStatus("validating");
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setOrderStatus("processing");
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setOrderStatus("confirmed");
    setCompletedSteps([...completedSteps, "step-4"]);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setOrderStatus("shipped");
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setShowSuccess(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    navigate("/");
  };

  // Draw map on canvas
  useEffect(() => {
    if (mapOpen && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = canvas.offsetWidth;
      canvas.height = 300;

      // Draw map background
      ctx.fillStyle = '#1a1a2e';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 30) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      for (let i = 0; i < canvas.height; i += 30) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }

      // Normalize coordinates to canvas
      const minLat = 25;
      const maxLat = 42;
      const minLng = -120;
      const maxLng = -70;

      mapLocations.forEach((loc) => {
        const x = ((loc.lng - minLng) / (maxLng - minLng)) * canvas.width;
        const y = ((maxLat - loc.lat) / (maxLat - minLat)) * canvas.height;

        // Draw location marker
        ctx.fillStyle = selectedLocation.name === loc.name ? '#A855F7' : 'rgba(168, 85, 247, 0.5)';
        ctx.beginPath();
        ctx.arc(x, y, selectedLocation.name === loc.name ? 8 : 6, 0, Math.PI * 2);
        ctx.fill();

        // Draw location label
        ctx.fillStyle = 'white';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(loc.name.split(',')[0], x, y + 20);
      });
    }
  }, [mapOpen, selectedLocation]);

  const steps: CheckoutStep[] = [
    { id: "contact", title: "Contact", icon: <Mail className="w-5 h-5" />, completed: completedSteps.includes("step-1") },
    { id: "shipping", title: "Shipping", icon: <MapPin className="w-5 h-5" />, completed: completedSteps.includes("step-2") },
    { id: "payment", title: "Payment", icon: <CreditCard className="w-5 h-5" />, completed: completedSteps.includes("step-3") },
    { id: "review", title: "Review", icon: <Check className="w-5 h-5" />, completed: completedSteps.includes("step-4") },
  ];

  const mapLocations: MapLocation[] = [
    { name: "New York, NY", lat: 40.7128, lng: -74.0060, emoji: "🗽" },
    { name: "Los Angeles, CA", lat: 34.0522, lng: -118.2437, emoji: "☀️" },
    { name: "Chicago, IL", lat: 41.8781, lng: -87.6298, emoji: "🌆" },
    { name: "Houston, TX", lat: 29.7604, lng: -95.3698, emoji: "🤠" },
    { name: "Miami, FL", lat: 25.7617, lng: -80.1918, emoji: "🏖️" },
  ];

  const deliveryOptions = [
    { id: "standard", label: "Standard Delivery", charge: 0, days: "5-7", icon: "📦" },
    { id: "express", label: "Express Delivery", charge: 9.99, days: "2-3", icon: "🚚" },
    { id: "overnight", label: "Overnight Delivery", charge: 24.99, days: "Next Day", icon: "✈️" },
  ];

  const total = 2053.76;
  const deliveryCharge = deliveryOptions.find(opt => opt.id === deliveryOption)?.charge || 0;
  const finalTotal = total + deliveryCharge;

  // Status icons and colors
  const statusConfig = {
    pending: { icon: Clock, color: "text-yellow-400", label: "Pending" },
    validating: { icon: ShieldCheck, color: "text-blue-400", label: "Validating" },
    processing: { icon: Zap, color: "text-cyan-400", label: "Processing" },
    confirmed: { icon: Check, color: "text-green-400", label: "Confirmed" },
    shipped: { icon: Truck, color: "text-purple-400", label: "Shipped" },
  };

  const PaymentIcon = statusConfig[orderStatus as keyof typeof statusConfig]?.icon || Clock;
  const statusColor = statusConfig[orderStatus as keyof typeof statusConfig]?.color || "text-yellow-400";

  // Success Screen
  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-foreground selection:bg-primary selection:text-white flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.8, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="text-center px-4 max-w-md">
          <motion.div animate={{ rotate: 360, scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="inline-block mb-6">
            <PartyPopper className="w-16 h-16 text-primary" />
          </motion.div>

          <h1 className="text-5xl font-heading font-bold text-white mb-4">Order Confirmed!</h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-xl text-muted-foreground mb-2">
            Thank you for your purchase
          </motion.p>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="text-lg text-primary mb-8 font-semibold">
            Order ID: #NX{Math.random().toString(36).substr(2, 9).toUpperCase()}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Estimated Delivery</span><span className="text-green-400 font-semibold">Dec 2-3, 2025</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Total Paid</span><span className="text-white font-semibold">${finalTotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Status</span><span className="text-blue-400 font-semibold">Processing</span></div>
            </div>
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="text-muted-foreground mb-2">
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
            {/* Step 1: Contact Information */}
            {currentStep === 1 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-md">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Mail className="w-6 h-6 text-primary" /> Contact Information
                </h2>

                <div className="space-y-4">
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                    <label className="text-sm font-semibold text-white mb-2 block">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all"
                    />
                  </motion.div>

                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First Name" className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all" />
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last Name" className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all" />
                  </motion.div>

                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                    <label className="text-sm font-semibold text-white mb-2 block">Phone Number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+1 (555) 000-0000" className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all" />
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Shipping Information with Map */}
            {currentStep === 2 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-md space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Truck className="w-6 h-6 text-primary" /> Shipping Address
                </h2>

                {/* Interactive Map */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="bg-black/40 border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:border-white/30 transition-all"
                  onClick={() => setMapOpen(!mapOpen)}
                >
                  <canvas ref={canvasRef} className="w-full" />
                  <div className="p-4 border-t border-white/10">
                    <p className="text-xs text-muted-foreground">📍 Selected Location</p>
                    <p className="text-white font-semibold flex items-center gap-2">
                      {selectedLocation.emoji} {selectedLocation.name}
                      <ChevronRight className={`w-4 h-4 ml-auto transition-transform ${mapOpen ? "rotate-90" : ""}`} />
                    </p>
                  </div>
                </motion.div>

                {/* Location Selector */}
                {mapOpen && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-black/40 border border-white/10 rounded-2xl p-4 space-y-3">
                    <p className="text-sm font-semibold text-white">Select Delivery Location</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {mapLocations.map((loc, i) => (
                        <motion.button
                          key={loc.name}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          onClick={() => {
                            setSelectedLocation(loc);
                            setMapOpen(false);
                          }}
                          className={`p-3 rounded-lg border transition-all text-left text-sm ${
                            selectedLocation.name === loc.name
                              ? "bg-primary/20 border-primary"
                              : "bg-white/5 border-white/10 hover:border-white/30"
                          }`}
                          whileHover={{ scale: 1.02 }}
                        >
                          <span className="text-lg mr-2">{loc.emoji}</span>
                          <span className="font-semibold">{loc.name}</span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Address Form */}
                <div className="space-y-4">
                  <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Street Address" className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all" />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="City" className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all" />
                    <input type="text" name="state" value={formData.state} onChange={handleInputChange} placeholder="State" className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all" />
                    <input type="text" name="zipCode" value={formData.zipCode} onChange={handleInputChange} placeholder="Zip Code" className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all" />
                  </div>

                  <textarea name="instructions" value={formData.instructions} onChange={handleInputChange} placeholder="Delivery instructions..." rows={3} className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all resize-none" />
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
                        <p className="text-xs text-muted-foreground">{opt.days}</p>
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

                {/* Payment Methods Grid */}
                <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
                  {[
                    { id: "card", label: "Credit Card", icon: "💳" },
                    { id: "banking", label: "Mobile Banking", icon: "📱" },
                    { id: "crypto", label: "Cryptocurrency", icon: "🪙" },
                    { id: "cod", label: "Cash on Delivery", icon: "💵" },
                  ].map((method, i) => (
                    <motion.button
                      key={method.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * i }}
                      onClick={() => {
                        setFormData(prev => ({ ...prev, paymentMethod: method.id }));
                        setPaymentProcess(method.id);
                      }}
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

                {/* Credit Card */}
                {formData.paymentMethod === "card" && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 p-4 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/30">
                    <p className="text-sm text-blue-200 mb-4">💳 Enter your card details</p>
                    <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} placeholder="1234 5678 9012 3456" maxLength={19} className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all" />
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" name="cardExpiry" value={formData.cardExpiry} onChange={handleInputChange} placeholder="MM/YY" maxLength={5} className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all" />
                      <input type="text" name="cardCVC" value={formData.cardCVC} onChange={handleInputChange} placeholder="CVC" maxLength={3} className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all" />
                    </div>
                  </motion.div>
                )}

                {/* Mobile Banking */}
                {formData.paymentMethod === "banking" && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 p-4 rounded-lg bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border border-cyan-500/30">
                    <p className="text-sm text-cyan-200 font-semibold mb-4">📱 Select Mobile Banking Service</p>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: "bkash", label: "bKash", emoji: "🔴" },
                        { id: "nagad", label: "Nagad", emoji: "🟡" },
                        { id: "rocket", label: "Rocket", emoji: "🟢" },
                      ].map((service) => (
                        <motion.button
                          key={service.id}
                          onClick={() => {
                            setPaymentProcess(`banking-${service.id}`);
                            alert(`${service.label} payment flow will be initiated.\nA payment link will be sent to your registered number.`);
                          }}
                          className="p-3 rounded-lg bg-black/40 border border-white/20 hover:border-white/40 transition-all"
                          whileHover={{ scale: 1.05 }}
                        >
                          <div className="text-2xl mb-1">{service.emoji}</div>
                          <p className="text-xs font-semibold text-white">{service.label}</p>
                        </motion.button>
                      ))}
                    </div>
                    <p className="text-xs text-cyan-300 mt-4">✓ An OTP will be sent to your registered phone number for verification</p>
                  </motion.div>
                )}

                {/* Cryptocurrency */}
                {formData.paymentMethod === "crypto" && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 p-4 rounded-lg bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/30">
                    <p className="text-sm text-purple-200 font-semibold mb-4">🪙 Select Cryptocurrency & Wallet</p>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: "btc-metamask", crypto: "Bitcoin", wallet: "MetaMask", icon: "🦊" },
                        { id: "eth-coinbase", crypto: "Ethereum", wallet: "Coinbase", icon: "⭕" },
                        { id: "eth-metamask", crypto: "Ethereum", wallet: "MetaMask", icon: "🦊" },
                        { id: "ltc-metamask", crypto: "Litecoin", wallet: "MetaMask", icon: "🦊" },
                      ].map((option) => (
                        <motion.button
                          key={option.id}
                          onClick={() => {
                            setSelectedCrypto(option.id);
                            alert(`Connecting to ${option.wallet}...\nPlease approve the transaction in your wallet extension.`);
                          }}
                          className={`p-3 rounded-lg border transition-all text-left text-xs ${
                            selectedCrypto === option.id
                              ? "bg-primary/20 border-primary"
                              : "bg-black/40 border-white/20 hover:border-white/40"
                          }`}
                          whileHover={{ scale: 1.05 }}
                        >
                          <p className="text-lg mb-1">{option.icon}</p>
                          <p className="font-semibold text-white">{option.crypto}</p>
                          <p className="text-muted-foreground">{option.wallet}</p>
                        </motion.button>
                      ))}
                    </div>
                    <div className="bg-black/40 rounded-lg p-3 mt-4">
                      <p className="text-xs text-purple-300">💡 <span className="font-semibold">Wallet Balance:</span> 0.5 ETH | Sufficient for payment</p>
                    </div>
                  </motion.div>
                )}

                {/* Cash on Delivery */}
                {formData.paymentMethod === "cod" && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 p-4 rounded-lg bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/30">
                    <p className="text-sm text-green-200 font-semibold mb-4">💵 Cash on Delivery Options</p>
                    
                    {/* Delivery Charges */}
                    <div className="space-y-2">
                      <p className="text-xs text-green-300 font-semibold">Delivery Service Fee</p>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { charge: 0, label: "Standard" },
                          { charge: 2, label: "+$2 Premium" },
                          { charge: 5, label: "+$5 VIP" },
                        ].map((fee) => (
                          <motion.button key={fee.label} className="p-2 rounded-lg bg-black/40 border border-white/20 hover:border-white/40 transition-all text-xs" whileHover={{ scale: 1.05 }}>
                            <p className="font-semibold text-white">{fee.label}</p>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Custom Offers */}
                    <div className="border-t border-white/10 pt-4">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={customOffer}
                          onChange={() => setCustomOffer(!customOffer)}
                          className="w-4 h-4 rounded"
                        />
                        <span className="text-sm text-white font-semibold">Apply custom offer/discount</span>
                      </label>
                    </div>

                    {customOffer && (
                      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-3 rounded-lg bg-black/40 border border-white/20 space-y-2">
                        <div className="flex items-center gap-2">
                          <Tag className="w-4 h-4 text-primary" />
                          <input type="text" placeholder="Enter promo code" className="flex-1 bg-transparent text-white text-sm focus:outline-none" />
                          <button className="text-primary text-sm font-semibold">Apply</button>
                        </div>
                      </motion.div>
                    )}

                    <p className="text-xs text-green-300">✓ Pay securely when your order arrives at your doorstep</p>
                  </motion.div>
                )}

                {/* Gift Message */}
                <div>
                  <label className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                    <Gift className="w-4 h-4" /> Add Gift Message
                  </label>
                  <textarea name="giftMessage" value={formData.giftMessage} onChange={handleInputChange} placeholder="Write a special message..." rows={2} className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all resize-none" />
                </div>
              </motion.div>
            )}

            {/* Step 4: Review */}
            {currentStep === 4 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                {[
                  { title: "Contact", icon: <User className="w-5 h-5 text-primary" />, content: `${formData.firstName} ${formData.lastName} • ${formData.email}` },
                  { title: "Location", icon: <MapPinIcon className="w-5 h-5 text-primary" />, content: `${selectedLocation.emoji} ${selectedLocation.name}` },
                  { title: "Delivery", icon: <Truck className="w-5 h-5 text-primary" />, content: `${deliveryOptions.find(o => o.id === deliveryOption)?.label} (+$${deliveryCharge.toFixed(2)})` },
                  { title: "Payment", icon: <CreditCard className="w-5 h-5 text-primary" />, content: formData.paymentMethod === "card" ? "Credit Card" : formData.paymentMethod === "banking" ? "Mobile Banking" : formData.paymentMethod === "cod" ? "Cash on Delivery" : "Cryptocurrency" },
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
                  <p className="text-sm text-green-300">Click "Place Order" to proceed with payment securely.</p>
                </motion.div>
              </motion.div>
            )}

            {/* Status Indicator - Enhanced */}
            {isProcessing && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                <motion.div className="bg-slate-900 border border-white/10 rounded-3xl p-8 max-w-md w-full mx-4" initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
                  <div className="text-center">
                    <motion.div animate={{ rotate: 360, scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="inline-block mb-4">
                      <PaymentIcon className={`w-10 h-10 ${statusColor}`} />
                    </motion.div>

                    <p className="text-white font-bold text-lg mb-2">
                      {orderStatus === "validating" && "Validating Payment..."}
                      {orderStatus === "processing" && "Processing Payment..."}
                      {orderStatus === "confirmed" && "Order Confirmed!"}
                      {orderStatus === "shipped" && "Preparing Shipment..."}
                    </p>

                    {/* Progress dots */}
                    <div className="flex justify-center gap-1.5 mb-4">
                      {[0, 1, 2].map(i => (
                        <motion.div
                          key={i}
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ delay: i * 0.2, duration: 1.5, repeat: Infinity }}
                          className={`w-2 h-2 rounded-full ${statusColor}`}
                        />
                      ))}
                    </div>

                    <p className="text-sm text-muted-foreground">
                      {orderStatus === "validating" && "Verifying payment details..."}
                      {orderStatus === "processing" && "Processing your transaction..."}
                      {orderStatus === "confirmed" && "Your payment received successfully"}
                      {orderStatus === "shipped" && "Your order is being prepared"}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
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
                  onClick={handleNextStep}
                  disabled={!validateStep(currentStep)}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:opacity-90 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:opacity-90 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isProcessing ? "Processing..." : "Place Order"} <Check className="w-4 h-4" />
                </motion.button>
              )}
            </div>
          </motion.div>

          {/* Order Summary Sidebar */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
                <h3 className="text-lg font-bold text-white mb-4">Order Summary</h3>
                <div className="space-y-3 pb-4 border-b border-white/10">
                  {[
                    { name: "iPhone 15 Pro Max", qty: 1, price: 1199 },
                    { name: "Sony WH-1000X...", qty: 2, price: 349 },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{item.name} x {item.qty}</span>
                      <span className="text-white font-semibold">${item.price * item.qty}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 py-4">
                  <div className="flex justify-between text-sm"><span className="text-muted-foreground">Subtotal</span><span className="text-white">${total}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-muted-foreground">Delivery</span><span className="text-green-400 font-semibold">{deliveryCharge === 0 ? "FREE" : `+$${deliveryCharge.toFixed(2)}`}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-muted-foreground">Insurance</span><span className="text-white">$4.99</span></div>
                  <div className="flex justify-between text-sm"><span className="text-muted-foreground">Tax</span><span className="text-white">$151.76</span></div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                  <span className="text-white font-bold">Total</span>
                  <span className="text-2xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">${finalTotal.toFixed(2)}</span>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md space-y-2">
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
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
