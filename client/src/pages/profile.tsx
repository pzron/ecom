import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import {
  User, Package, Heart, Award, Settings, LogOut, MapPin, CreditCard, Clock,
  ChevronRight, Edit2, Trash2, Plus, Bell, Shield, 
  Mail, Phone, Calendar, Truck, MapPinCheck, RotateCcw,
  Lock, Check, AlertCircle, CheckCircle, Circle, Key, DollarSign, FileText, Eye, EyeOff, X
} from "lucide-react";
import { useAuthStore } from "@/stores/auth";
import { useState } from "react";
import { validatePassword } from "@/lib/validation";

export default function ProfilePage() {
  const [, navigate] = useLocation();
  const { user, logout, isAuthenticated, submitAffiliateApplication, approveAffiliateApplication, updateProfile, changePassword } = useAuthStore();
  const [activeNav, setActiveNav] = useState("overview");
  const [editMode, setEditMode] = useState(false);
  const [showAffiliateModal, setShowAffiliateModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  const [profileForm, setProfileForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
  });
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  
  const [affiliateFormData, setAffiliateFormData] = useState({
    phone: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    bankAccount: "",
    taxId: "",
    websiteUrl: "",
    socialMedia: "",
    monthlyVisitors: "",
    primaryAudience: "",
  });
  
  const passwordValidation = validatePassword(passwordForm.newPassword);
  
  const handleSaveProfile = async () => {
    setIsSavingProfile(true);
    setSaveMessage(null);
    const result = await updateProfile({
      name: profileForm.name,
      phone: profileForm.phone,
    });
    setIsSavingProfile(false);
    if (result.success) {
      setSaveMessage({ type: 'success', text: 'Profile updated successfully!' });
      setEditMode(false);
      setTimeout(() => setSaveMessage(null), 3000);
    } else {
      setSaveMessage({ type: 'error', text: result.message });
    }
  };
  
  const handleChangePassword = async () => {
    setPasswordError("");
    setPasswordSuccess("");
    
    if (!passwordForm.currentPassword.trim()) {
      setPasswordError("Current password is required");
      return;
    }
    
    if (!passwordValidation.valid) {
      setPasswordError("New password doesn't meet requirements");
      return;
    }
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("New passwords don't match");
      return;
    }
    
    setIsSavingPassword(true);
    const result = await changePassword(passwordForm.currentPassword, passwordForm.newPassword);
    setIsSavingPassword(false);
    
    if (result.success) {
      setPasswordSuccess("Password changed successfully!");
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setTimeout(() => {
        setShowPasswordModal(false);
        setPasswordSuccess("");
      }, 2000);
    } else {
      setPasswordError(result.message);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-foreground flex items-center justify-center">
        <Navbar />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-md px-4">
          <div className="mb-6 text-6xl">🔒</div>
          <h2 className="text-3xl font-bold text-white mb-4">Please Login First</h2>
          <p className="text-muted-foreground mb-8">You need to be signed in to view your profile</p>
          <Button onClick={() => navigate("/signup")} className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
            Go to Login
          </Button>
        </motion.div>
      </div>
    );
  }

  const navItems = [
    { id: "overview", icon: User, label: "Overview" },
    { id: "orders", icon: Package, label: "Orders" },
    { id: "tracking", icon: Truck, label: "Order Tracking" },
    { id: "wishlist", icon: Heart, label: "Wishlist" },
    { id: "affiliate", icon: Award, label: "Affiliate Program" },
    { id: "addresses", icon: MapPin, label: "Addresses" },
    { id: "payments", icon: CreditCard, label: "Payment Methods" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  const orders = [
    { id: "ORD-2024-001", date: "Today", status: "In Transit", total: "৳2,053.76", items: 2, shipping: "on_way", location: "NYC Distribution Center", return_eligible: true },
    { id: "ORD-2024-002", date: "Nov 28, 2024", status: "Delivered", total: "৳499.99", items: 1, shipping: "delivered", location: "Delivered to Home", return_eligible: false },
    { id: "ORD-2024-003", date: "Nov 20, 2024", status: "Delivered", total: "৳149.99", items: 1, shipping: "delivered", location: "Delivered to Home", return_eligible: false },
  ];

  const trackingDetails = [
    { 
      id: "ORD-2024-001", 
      stage: "in_transit", 
      stages: [
        { name: "Order Confirmed", done: true, date: "Nov 30, 10:00 AM" },
        { name: "Shipped", done: true, date: "Nov 30, 2:30 PM" },
        { name: "In Transit", done: true, date: "Dec 1, 5:00 AM" },
        { name: "Out for Delivery", done: false, date: "Expected Dec 2" },
        { name: "Delivered", done: false, date: "Est. Dec 2" },
      ], 
      location: "NYC Distribution Center", 
      coordinates: "40.7128, -74.0060" 
    }
  ];


  const wishlistItems = [
    { name: "PlayStation 5 Pro", price: "৳799.99", image: "🎮" },
    { name: "DJI Mini 4 Pro", price: "৳459.00", image: "🚁" },
    { name: "Sony A6700 Camera", price: "৳1,398.00", image: "📷" },
  ];

  const addresses = [
    { id: 1, label: "Home", address: "123 Main St, New York, NY 10001", default: true },
    { id: 2, label: "Office", address: "456 Business Ave, New York, NY 10002", default: false },
  ];

  const payments = [
    { id: 1, type: "card", label: "Visa", last4: "4242", expiry: "12/25", default: true },
    { id: 2, type: "card", label: "Mastercard", last4: "5555", expiry: "08/26", default: false },
  ];

  const getShippingIcon = (status: string) => {
    switch(status) {
      case "delivered": return <CheckCircle className="w-5 h-5 text-green-400" />;
      case "on_way": return <Truck className="w-5 h-5 text-blue-400" />;
      case "pending": return <Circle className="w-5 h-5 text-yellow-400" />;
      default: return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-foreground selection:bg-primary selection:text-white pb-20">
      <Navbar />

      <main className="container mx-auto px-4 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-3">
            {/* Profile Card */}
            <motion.div className="bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 border border-primary/20 rounded-2xl p-6 text-center backdrop-blur-xl sticky top-28 space-y-6">
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary p-1 mx-auto">
                <img src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} alt="User" className="w-full h-full rounded-full border-4 border-slate-900" />
              </motion.div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{user?.name || "User"}</h2>
                <p className="text-muted-foreground text-sm mt-1">{user?.email}</p>
              </div>

              {/* Navigation */}
              <nav className="bg-white/5 border border-white/10 rounded-xl p-2 backdrop-blur-md space-y-1 max-h-[500px] overflow-y-auto">
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => setActiveNav(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-left text-sm font-medium ${activeNav === item.id ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/20" : "text-muted-foreground hover:text-white hover:bg-white/5"}`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <item.icon className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </motion.button>
                ))}
                <motion.button
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-all text-left text-sm font-medium mt-2"
                  whileHover={{ scale: 1.02 }}
                >
                  <LogOut className="w-4 h-4" />
                  Log Out
                </motion.button>
              </nav>
            </motion.div>
          </motion.div>

          {/* Main Content */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="lg:col-span-9 space-y-6">
            {/* Overview */}
            {activeNav === "overview" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/10 rounded-2xl backdrop-blur-xl overflow-hidden">
                  <div className="p-6 space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold text-white">Personal Information</h2>
                      <motion.button whileHover={{ scale: 1.1 }} onClick={() => setEditMode(!editMode)} className="p-2.5 hover:bg-white/10 rounded-lg transition-all border border-white/10">
                        <Edit2 className="w-5 h-5 text-primary" />
                      </motion.button>
                    </div>

                    {saveMessage && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        className={`p-3 rounded-lg flex items-center gap-2 ${saveMessage.type === 'success' ? 'bg-green-500/20 border border-green-500/30' : 'bg-red-500/20 border border-red-500/30'}`}
                      >
                        {saveMessage.type === 'success' ? <CheckCircle className="w-5 h-5 text-green-400" /> : <AlertCircle className="w-5 h-5 text-red-400" />}
                        <span className={saveMessage.type === 'success' ? 'text-green-200' : 'text-red-200'}>{saveMessage.text}</span>
                      </motion.div>
                    )}

                    {editMode ? (
                      <div className="space-y-4">
                        <div><label className="text-sm font-semibold text-white mb-2 block">Full Name</label>
                          <input type="text" value={profileForm.name} onChange={(e) => setProfileForm({...profileForm, name: e.target.value})} className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30" /></div>
                        <div><label className="text-sm font-semibold text-white mb-2 block">Email</label>
                          <input type="email" value={user?.email} disabled className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-2.5 text-white/50 cursor-not-allowed" /></div>
                        <div><label className="text-sm font-semibold text-white mb-2 block">Phone</label>
                          <input type="tel" value={profileForm.phone} onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})} placeholder="+1 (555) 000-0000" className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30" /></div>
                        <div className="flex gap-2">
                          <Button onClick={handleSaveProfile} disabled={isSavingProfile} className="flex-1 bg-primary hover:bg-primary/90">
                            {isSavingProfile ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }} className="w-4 h-4 border-2 border-white border-t-transparent rounded-full" /> : "Save"}
                          </Button>
                          <Button onClick={() => { setEditMode(false); setProfileForm({ name: user?.name || "", phone: user?.phone || "" }); }} variant="outline" className="flex-1">Cancel</Button>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { icon: User, label: "Name", value: user?.name },
                          { icon: Mail, label: "Email", value: user?.email },
                          { icon: Phone, label: "Phone", value: "+1 (555) 000-0000" },
                          { icon: Calendar, label: "Member Since", value: "Jan 2024" },
                        ].map((item, i) => (
                          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="p-4 bg-white/5 border border-white/10 rounded-lg hover:border-white/20 transition-all">
                            <div className="flex items-center gap-3 mb-2"><item.icon className="w-4 h-4 text-primary" />
                              <span className="text-xs text-muted-foreground">{item.label}</span></div>
                            <p className="text-white font-semibold">{item.value}</p>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Order Tracking with Animations */}
            {activeNav === "tracking" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <div className="bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/10 rounded-2xl backdrop-blur-xl p-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Order Tracking</h2>
                  {trackingDetails.map((order) => (
                    <motion.div key={order.id} className="space-y-6" variants={containerVariants} initial="hidden" animate="visible">
                      <motion.div variants={itemVariants} className="flex items-center justify-between">
                        <div><p className="font-bold text-white">{order.id}</p>
                          <p className="text-sm text-muted-foreground mt-1">{order.location}</p></div>
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">In Transit</Badge>
                      </motion.div>
                      
                      <motion.div className="space-y-3" variants={containerVariants} initial="hidden" animate="visible">
                        {order.stages.map((stage, i) => (
                          <motion.div 
                            key={i} 
                            variants={itemVariants}
                            className="flex gap-4"
                            whileHover={{ x: 5 }}
                          >
                            <div className="flex flex-col items-center">
                              <motion.div 
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${stage.done ? "bg-green-500/20 border border-green-500/30" : "bg-white/5 border border-white/10"}`}
                                animate={!stage.done ? { scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] } : {}}
                                transition={{ repeat: Infinity, duration: 2 }}
                              >
                                {stage.done ? <CheckCircle className="w-5 h-5 text-green-400" /> : <Circle className="w-5 h-5 text-white/30" />}
                              </motion.div>
                              {i < order.stages.length - 1 && (
                                <motion.div 
                                  className={`w-1 h-8 ${stage.done ? "bg-green-500/30" : "bg-white/5"}`}
                                  initial={{ scaleY: 0 }}
                                  animate={{ scaleY: 1 }}
                                  transition={{ delay: 0.2 + i * 0.1 }}
                                />
                              )}
                            </div>
                            <motion.div 
                              className="pt-1"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 + i * 0.1 }}
                            >
                              <p className={`font-semibold ${stage.done ? "text-green-400" : "text-muted-foreground"}`}>{stage.name}</p>
                              <p className="text-xs text-muted-foreground">{stage.date}</p>
                            </motion.div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Orders */}
            {activeNav === "orders" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <div className="bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/10 rounded-2xl backdrop-blur-xl p-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Order History</h2>
                  {orders.map((order, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }} className="bg-white/5 border border-white/10 rounded-lg p-5 mb-4 hover:border-white/20 transition-all">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                        <div><p className="font-bold text-white text-lg">{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.date}</p></div>
                        <Badge className={order.status === "Delivered" ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-blue-500/20 text-blue-400 border-blue-500/30"}>{order.status}</Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 bg-black/30 rounded-lg mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${order.shipping === "delivered" ? "bg-green-500/20" : "bg-blue-500/20"}`}>
                            {getShippingIcon(order.shipping)}
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Shipping</p>
                            <p className="text-sm font-semibold text-white capitalize">{order.shipping.replace("_", " ")}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-purple-500/20">
                            <MapPinCheck className="w-5 h-5 text-purple-400" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Location</p>
                            <p className="text-sm font-semibold text-white">{order.location}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${order.return_eligible ? "bg-orange-500/20" : "bg-gray-500/20"}`}>
                            <RotateCcw className={`w-5 h-5 ${order.return_eligible ? "text-orange-400" : "text-gray-400"}`} />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Return</p>
                            <p className="text-sm font-semibold text-white">{order.return_eligible ? "Eligible" : "Not Eligible"}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <p className="text-2xl font-bold text-primary">{order.total}</p>
                        <motion.button whileHover={{ scale: 1.05 }} className="px-4 py-2 bg-primary/10 border border-primary/30 text-primary rounded-lg hover:bg-primary/20 transition-all text-sm font-semibold">
                          View Details
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}


            {/* Wishlist */}
            {activeNav === "wishlist" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/10 rounded-2xl backdrop-blur-xl p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Wishlist</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {wishlistItems.map((item, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }} className="bg-white/5 border border-white/10 rounded-lg p-4 hover:border-white/20 transition-all text-center">
                      <p className="text-4xl mb-3">{item.image}</p>
                      <p className="text-white font-semibold mb-2">{item.name}</p>
                      <p className="text-primary font-bold mb-3">{item.price}</p>
                      <div className="flex gap-2">
                        <Button className="flex-1 bg-primary hover:bg-primary/90 text-xs h-9">Add to Cart</Button>
                        <motion.button whileHover={{ scale: 1.1 }} className="px-3 h-9 hover:bg-red-500/10 rounded-lg transition-all"><Trash2 className="w-4 h-4 text-red-400" /></motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Affiliate Program */}
            {activeNav === "affiliate" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <div className="bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/10 rounded-2xl backdrop-blur-xl p-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Affiliate Program</h2>
                  
                  <div className="space-y-6">
                    {user?.role === "customer" && !user?.affiliateApplied ? (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
                        <Award className="w-16 h-16 text-primary mx-auto mb-4 opacity-50" />
                        <p className="text-muted-foreground mb-6 max-w-md">Join our affiliate program and start earning commissions on every referral.</p>
                        <Button onClick={() => setShowAffiliateModal(true)} className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 px-8">Apply Now</Button>
                      </motion.div>
                    ) : user?.affiliateApplied && user?.role === "customer" ? (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-center">
                        <AlertCircle className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                        <p className="text-yellow-200 font-semibold mb-2">Application Under Review</p>
                        <p className="text-yellow-100/70 text-sm">We're reviewing your application. You'll be notified soon.</p>
                        <div className="mt-4 p-3 bg-yellow-500/5 rounded-lg text-xs text-yellow-200">
                          💡 <strong>Admin Tip:</strong> Click "Approve Application" button below to auto-switch role
                        </div>
                        <motion.button whileHover={{ scale: 1.02 }} onClick={approveAffiliateApplication} className="w-full mt-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white font-semibold text-sm transition-all">
                          Approve Application (Simulate Admin)
                        </motion.button>
                      </motion.div>
                    ) : user?.role === "affiliate" ? (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                        <div className="p-6 bg-green-500/10 border border-green-500/30 rounded-lg text-center">
                          <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                          <p className="text-green-200 font-semibold mb-2">Approved ✓</p>
                          <p className="text-green-100/70 text-sm">Congratulations! You're now an affiliate partner.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                            <DollarSign className="w-5 h-5 text-primary mb-2" />
                            <p className="text-white/70 text-xs">Commission Rate</p>
                            <p className="text-white font-bold text-lg">15%</p>
                          </div>
                          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                            <FileText className="w-5 h-5 text-primary mb-2" />
                            <p className="text-white/70 text-xs">Earnings</p>
                            <p className="text-white font-bold text-lg">$0.00</p>
                          </div>
                        </div>
                        <Button className="w-full bg-primary hover:bg-primary/90">Go to Affiliate Dashboard</Button>
                      </motion.div>
                    ) : null}
                  </div>
                </div>

                {showAffiliateModal && !user?.affiliateApplied && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/10 rounded-2xl backdrop-blur-xl p-6">
                    <h3 className="text-xl font-bold text-white mb-6">Affiliate Application Form</h3>
                    <div className="space-y-4 max-h-[600px] overflow-y-auto">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-white/70 block mb-1.5 font-semibold">Phone Number *</label>
                          <input type="tel" value={affiliateFormData.phone} onChange={(e) => setAffiliateFormData({...affiliateFormData, phone: e.target.value})} placeholder="+1 (555) 000-0000" className="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary" />
                        </div>
                        <div>
                          <label className="text-xs text-white/70 block mb-1.5 font-semibold">Country *</label>
                          <input type="text" value={affiliateFormData.country} onChange={(e) => setAffiliateFormData({...affiliateFormData, country: e.target.value})} placeholder="United States" className="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary" />
                        </div>
                        <div>
                          <label className="text-xs text-white/70 block mb-1.5 font-semibold">City *</label>
                          <input type="text" value={affiliateFormData.city} onChange={(e) => setAffiliateFormData({...affiliateFormData, city: e.target.value})} placeholder="New York" className="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary" />
                        </div>
                        <div>
                          <label className="text-xs text-white/70 block mb-1.5 font-semibold">Postal Code *</label>
                          <input type="text" value={affiliateFormData.postalCode} onChange={(e) => setAffiliateFormData({...affiliateFormData, postalCode: e.target.value})} placeholder="10001" className="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary" />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs text-white/70 block mb-1.5 font-semibold">Street Address *</label>
                        <input type="text" value={affiliateFormData.address} onChange={(e) => setAffiliateFormData({...affiliateFormData, address: e.target.value})} placeholder="123 Main Street" className="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary" />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-white/70 block mb-1.5 font-semibold">Tax ID *</label>
                          <input type="text" value={affiliateFormData.taxId} onChange={(e) => setAffiliateFormData({...affiliateFormData, taxId: e.target.value})} placeholder="XX-XXXXXXX" className="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary" />
                        </div>
                        <div>
                          <label className="text-xs text-white/70 block mb-1.5 font-semibold">Bank Account *</label>
                          <input type="text" value={affiliateFormData.bankAccount} onChange={(e) => setAffiliateFormData({...affiliateFormData, bankAccount: e.target.value})} placeholder="IBAN or Account Number" className="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary" />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs text-white/70 block mb-1.5 font-semibold">Website/Blog URL</label>
                        <input type="url" value={affiliateFormData.websiteUrl} onChange={(e) => setAffiliateFormData({...affiliateFormData, websiteUrl: e.target.value})} placeholder="https://yourwebsite.com" className="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary" />
                      </div>

                      <div>
                        <label className="text-xs text-white/70 block mb-1.5 font-semibold">Social Media Handles</label>
                        <input type="text" value={affiliateFormData.socialMedia} onChange={(e) => setAffiliateFormData({...affiliateFormData, socialMedia: e.target.value})} placeholder="@yourhandle, @instagram, etc" className="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary" />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-white/70 block mb-1.5 font-semibold">Monthly Visitors</label>
                          <input type="text" value={affiliateFormData.monthlyVisitors} onChange={(e) => setAffiliateFormData({...affiliateFormData, monthlyVisitors: e.target.value})} placeholder="10,000" className="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary" />
                        </div>
                        <div>
                          <label className="text-xs text-white/70 block mb-1.5 font-semibold">Primary Audience</label>
                          <input type="text" value={affiliateFormData.primaryAudience} onChange={(e) => setAffiliateFormData({...affiliateFormData, primaryAudience: e.target.value})} placeholder="Tech enthusiasts, gamers, etc" className="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary" />
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button onClick={() => { submitAffiliateApplication(affiliateFormData); setShowAffiliateModal(false); }} className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90">Submit Application</Button>
                        <Button onClick={() => setShowAffiliateModal(false)} variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/5">Cancel</Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Addresses */}
            {activeNav === "addresses" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/10 rounded-2xl backdrop-blur-xl p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Saved Addresses</h2>
                <div className="space-y-3">
                  {addresses.map((addr, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }} className="bg-white/5 border border-white/10 rounded-lg p-4 hover:border-white/20 transition-all flex items-start justify-between">
                      <div><div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-white">{addr.label}</h4>
                        {addr.default && <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">Default</Badge>}</div>
                        <p className="text-muted-foreground text-sm">{addr.address}</p></div>
                      <div className="flex gap-2">
                        <motion.button whileHover={{ scale: 1.1 }} className="p-2 hover:bg-white/10 rounded-lg"><Edit2 className="w-4 h-4 text-primary" /></motion.button>
                        <motion.button whileHover={{ scale: 1.1 }} className="p-2 hover:bg-red-500/10 rounded-lg"><Trash2 className="w-4 h-4 text-red-400" /></motion.button>
                      </div>
                    </motion.div>
                  ))}
                  <motion.button whileHover={{ scale: 1.02 }} className="w-full py-3 border border-dashed border-white/20 rounded-lg text-primary hover:border-white/40 transition-all font-semibold text-sm flex items-center justify-center gap-2">
                    <Plus className="w-4 h-4" /> Add New Address
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Payments */}
            {activeNav === "payments" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/10 rounded-2xl backdrop-blur-xl p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Payment Methods</h2>
                <div className="space-y-3">
                  {payments.map((method, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }} className="bg-gradient-to-r from-slate-800/50 to-slate-700/30 rounded-lg p-4 border border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <CreditCard className="w-6 h-6 text-primary" />
                        <div><p className="font-semibold text-white">{method.label} •••• {method.last4}</p>
                          <p className="text-xs text-muted-foreground">Expires {method.expiry}</p></div>
                      </div>
                      <div className="flex items-center gap-2">
                        {method.default && <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">Default</Badge>}
                        <motion.button whileHover={{ scale: 1.1 }} className="p-2 hover:bg-white/10 rounded-lg"><Edit2 className="w-4 h-4 text-primary" /></motion.button>
                      </div>
                    </motion.div>
                  ))}
                  <motion.button whileHover={{ scale: 1.02 }} className="w-full py-3 border border-dashed border-white/20 rounded-lg text-primary hover:border-white/40 transition-all font-semibold text-sm flex items-center justify-center gap-2">
                    <Plus className="w-4 h-4" /> Add Payment Method
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Settings */}
            {activeNav === "settings" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <div className="bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/10 rounded-2xl backdrop-blur-xl p-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Settings</h2>
                  
                  <div className="space-y-6">
                    {/* Security - Change Password */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><Shield className="w-5 h-5 text-primary" /> Security</h3>
                      <motion.button onClick={() => setShowPasswordModal(true)} whileHover={{ scale: 1.02 }} className="w-full flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all">
                        <div className="flex items-center gap-3">
                          <Key className="w-5 h-5 text-primary" />
                          <div className="text-left">
                            <p className="text-white font-semibold text-sm">Change Password</p>
                            <p className="text-xs text-muted-foreground">Update your password regularly</p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </motion.button>
                    </div>

                    {/* Notifications */}
                    <div className="border-t border-white/10 pt-6">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><Bell className="w-5 h-5 text-primary" /> Notifications</h3>
                      <div className="space-y-3">
                        {[
                          { label: "Order Updates", desc: "Track order status changes" },
                          { label: "Promotions", desc: "Exclusive deals and offers" },
                          { label: "Newsletter", desc: "Weekly product updates" },
                          { label: "Security Alerts", desc: "Account security warnings" }
                        ].map((item, i) => (
                          <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                            <div>
                              <p className="text-white text-sm font-semibold">{item.label}</p>
                              <p className="text-xs text-muted-foreground">{item.desc}</p>
                            </div>
                            <motion.button className={`w-10 h-6 rounded-full transition-all ${i % 2 === 0 ? "bg-primary" : "bg-white/10"}`}>
                              <motion.div className={`w-4 h-4 rounded-full bg-white transition-all ${i % 2 === 0 ? "ml-5" : "ml-1"}`} />
                            </motion.button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Preferences */}
                    <div className="border-t border-white/10 pt-6">
                      <h3 className="text-lg font-semibold text-white mb-4">Preferences</h3>
                      <div className="space-y-3">
                        {[
                          { label: "Email Frequency", value: "Daily", options: ["Daily", "Weekly", "Monthly"] },
                          { label: "Currency", value: "USD", options: ["USD", "EUR", "GBP", "INR"] },
                          { label: "Language", value: "English", options: ["English", "Spanish", "French", "German"] },
                          { label: "Theme", value: "Dark", options: ["Dark", "Light"] }
                        ].map((item, i) => (
                          <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                            <p className="text-white text-sm font-semibold">{item.label}</p>
                            <select className="bg-black/40 border border-white/20 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-primary">
                              {item.options.map((opt) => <option key={opt}>{opt}</option>)}
                            </select>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setShowPasswordModal(false); }}
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            className="bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Lock className="w-5 h-5 text-primary" /> Change Password
              </h3>
              <motion.button 
                whileHover={{ scale: 1.1 }} 
                onClick={() => { setShowPasswordModal(false); setPasswordError(""); setPasswordSuccess(""); }}
                className="p-2 hover:bg-white/10 rounded-lg transition-all"
              >
                <X className="w-5 h-5 text-white/60" />
              </motion.button>
            </div>

            {passwordError && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <span className="text-red-200 text-sm">{passwordError}</span>
              </motion.div>
            )}

            {passwordSuccess && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-green-200 text-sm">{passwordSuccess}</span>
              </motion.div>
            )}

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-white/80">Current Password</label>
                <div className="relative">
                  <input 
                    type={showCurrentPassword ? "text" : "password"} 
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                    placeholder="Enter current password"
                    className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-2.5 pr-10 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
                  >
                    {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-white/80">New Password</label>
                <div className="relative">
                  <input 
                    type={showNewPassword ? "text" : "password"} 
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                    placeholder="Enter new password"
                    className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-2.5 pr-10 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {passwordForm.newPassword && (
                  <div className="mt-2 space-y-1">
                    {[
                      { label: '8+ characters', valid: passwordForm.newPassword.length >= 8 },
                      { label: 'Uppercase letter', valid: /[A-Z]/.test(passwordForm.newPassword) },
                      { label: 'Lowercase letter', valid: /[a-z]/.test(passwordForm.newPassword) },
                      { label: 'Number', valid: /[0-9]/.test(passwordForm.newPassword) },
                      { label: 'Special character', valid: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(passwordForm.newPassword) },
                    ].map((req, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs">
                        {req.valid ? <Check className="w-3 h-3 text-green-400" /> : <X className="w-3 h-3 text-white/30" />}
                        <span className={req.valid ? 'text-green-400' : 'text-white/40'}>{req.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-white/80">Confirm New Password</label>
                <input 
                  type="password" 
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                  placeholder="Confirm new password"
                  className={`w-full bg-black/40 border rounded-lg px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary/30 ${
                    passwordForm.confirmPassword && passwordForm.newPassword !== passwordForm.confirmPassword 
                      ? 'border-red-500/50 focus:border-red-500' 
                      : 'border-white/20 focus:border-primary'
                  }`}
                />
                {passwordForm.confirmPassword && passwordForm.newPassword !== passwordForm.confirmPassword && (
                  <p className="text-xs text-red-400">Passwords don't match</p>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  onClick={handleChangePassword} 
                  disabled={isSavingPassword || !passwordForm.currentPassword.trim() || !passwordValidation.valid || passwordForm.newPassword !== passwordForm.confirmPassword}
                  className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                >
                  {isSavingPassword ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }} className="w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                  ) : (
                    "Update Password"
                  )}
                </Button>
                <Button 
                  onClick={() => { setShowPasswordModal(false); setPasswordError(""); setPasswordSuccess(""); setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" }); }}
                  variant="outline" 
                  className="flex-1 border-white/20 text-white hover:bg-white/5"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
