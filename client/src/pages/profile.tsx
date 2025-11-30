import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import {
  User, Package, Heart, Award, Settings, LogOut, MapPin, CreditCard, Clock,
  ChevronRight, Edit2, Trash2, Plus, Eye, EyeOff, Bell, Shield, Download,
  Star, TrendingUp, Share2, Copy, Check, X, AlertCircle, Zap, Lock, Mail,
  Phone, Home, Briefcase, Gift, BarChart3, DollarSign, Calendar
} from "lucide-react";
import { useAuthStore } from "@/stores/auth";
import { useState } from "react";

export default function ProfilePage() {
  const [, navigate] = useLocation();
  const { user, logout, isAuthenticated } = useAuthStore();
  const [activeTab, setActiveTab] = useState("overview");
  const [editMode, setEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [addresses, setAddresses] = useState([
    { id: 1, label: "Home", address: "123 Main St, New York, NY 10001", default: true },
    { id: 2, label: "Office", address: "456 Business Ave, New York, NY 10002", default: false },
  ]);
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, type: "card", label: "Visa", last4: "4242", expiry: "12/25", default: true },
    { id: 2, type: "card", label: "Mastercard", last4: "5555", expiry: "08/26", default: false },
  ]);
  const [editForm, setEditForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    bio: user?.bio || "",
  });
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [copyRef, setCopyRef] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-foreground flex items-center justify-center">
        <Navbar />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-md px-4">
          <div className="mb-6 text-6xl">🔒</div>
          <h2 className="text-3xl font-bold text-white mb-4">Please Login First</h2>
          <p className="text-muted-foreground mb-8">You need to be signed in to view your profile</p>
          <Button
            onClick={() => navigate("/signup")}
            className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
          >
            Go to Login
          </Button>
        </motion.div>
      </div>
    );
  }

  const orders = [
    { id: "ORD-2024-001", date: "Today", status: "In Transit", total: "$2,053.76", items: 2, itemsList: ["iPhone 15 Pro Max x1", "Sony WH-1000X Headphones x1"] },
    { id: "ORD-2024-002", date: "Nov 28, 2024", status: "Delivered", total: "$499.99", items: 1, itemsList: ["MacBook Air M3 x1"] },
    { id: "ORD-2024-003", date: "Nov 20, 2024", status: "Delivered", total: "$149.99", items: 1, itemsList: ["Apple Watch Series 9 x1"] },
  ];

  const statsCards = [
    { icon: Package, label: "Total Orders", value: "12", color: "from-blue-500 to-blue-600" },
    { icon: DollarSign, label: "Total Spent", value: "$15,240.50", color: "from-green-500 to-green-600" },
    { icon: Heart, label: "Wishlist Items", value: "8", color: "from-red-500 to-red-600" },
    { icon: TrendingUp, label: "Loyalty Points", value: "2,450 pts", color: "from-purple-500 to-purple-600" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-foreground selection:bg-primary selection:text-white pb-20">
      <Navbar />

      <main className="container mx-auto px-4 pt-24">
        {/* Header Section */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary p-1"
                >
                  <img
                    src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`}
                    alt="User"
                    className="w-full h-full rounded-full border-4 border-slate-900 object-cover"
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="absolute -bottom-2 -right-2 bg-primary text-white rounded-full p-2 cursor-pointer hover:bg-secondary transition-all"
                >
                  <Edit2 className="w-4 h-4" />
                </motion.div>
              </div>

              <div>
                <h1 className="text-4xl font-bold text-white font-heading">{user?.name || "User"}</h1>
                <p className="text-muted-foreground">{user?.email}</p>
                <div className="flex items-center gap-2 mt-3">
                  <Badge className="bg-gradient-to-r from-primary to-secondary border-0">⭐ Platinum Member</Badge>
                  <Badge className="bg-green-500/20 text-green-400 border border-green-500/30">Verified</Badge>
                </div>
                <div className="mt-3 flex items-center gap-2 text-sm">
                  <div className="w-32 h-2 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "75%" }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="h-full bg-gradient-to-r from-primary to-secondary"
                    />
                  </div>
                  <span className="text-muted-foreground">2,450/5,000 XP</span>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="px-6 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-all font-semibold flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Log Out
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          {statsCards.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 border border-white/10 text-white`}
            >
              <div className="flex items-center justify-between mb-4">
                <stat.icon className="w-6 h-6 opacity-80" />
                <span className="text-xs font-semibold opacity-70">+15%</span>
              </div>
              <p className="text-3xl font-bold mb-1">{stat.value}</p>
              <p className="text-sm opacity-80">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Tabs Section */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full bg-transparent border-b border-white/10 rounded-none p-0 h-auto">
              {[
                { value: "overview", label: "Overview", icon: User },
                { value: "orders", label: "Orders", icon: Package },
                { value: "addresses", label: "Addresses", icon: MapPin },
                { value: "payment", label: "Payments", icon: CreditCard },
                { value: "settings", label: "Settings", icon: Settings },
              ].map((tab, i) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="px-4 py-4 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none text-sm md:text-base data-[state=active]:text-white text-muted-foreground"
                >
                  <tab.icon className="w-4 h-4 mr-2 hidden md:inline" />
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Info */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">Personal Information</h3>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      onClick={() => setEditMode(!editMode)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-all"
                    >
                      <Edit2 className="w-4 h-4 text-primary" />
                    </motion.button>
                  </div>

                  {editMode ? (
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-semibold text-white mb-2 block">Full Name</label>
                        <input
                          type="text"
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-white mb-2 block">Email</label>
                        <input
                          type="email"
                          value={editForm.email}
                          onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                          className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-white mb-2 block">Phone</label>
                        <input
                          type="tel"
                          value={editForm.phone}
                          onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                          className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={() => setEditMode(false)} className="flex-1 bg-primary hover:bg-primary/90">Save Changes</Button>
                        <Button onClick={() => setEditMode(false)} variant="outline" className="flex-1">Cancel</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {[
                        { icon: User, label: "Name", value: user?.name },
                        { icon: Mail, label: "Email", value: user?.email },
                        { icon: Phone, label: "Phone", value: user?.phone || "+1 (555) 000-0000" },
                        { icon: Calendar, label: "Member Since", value: "Jan 2024" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-black/40 rounded-lg border border-white/10">
                          <item.icon className="w-5 h-5 text-primary" />
                          <div>
                            <p className="text-xs text-muted-foreground">{item.label}</p>
                            <p className="text-white font-semibold">{item.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>

                {/* Loyalty & Rewards */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-4">
                  <h3 className="text-xl font-bold text-white mb-4">Loyalty & Rewards</h3>
                  <div className="space-y-3">
                    <motion.div className="bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/30 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-purple-200">Total Points</span>
                        <TrendingUp className="w-4 h-4 text-purple-400" />
                      </div>
                      <p className="text-3xl font-bold text-white">2,450</p>
                      <p className="text-xs text-purple-300 mt-2">Redeem for exclusive rewards</p>
                    </motion.div>

                    <motion.div className="bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-green-200">Referral Link</span>
                        <Share2 className="w-4 h-4 text-green-400" />
                      </div>
                      <div className="flex items-center gap-2">
                        <code className="text-xs bg-black/40 text-primary px-2 py-1 rounded flex-1 overflow-hidden text-ellipsis">nex-ref-{user?.id?.substring(0, 8)}</code>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          onClick={() => setCopyRef(true)}
                          className="p-2 hover:bg-white/10 rounded-lg transition-all"
                        >
                          {copyRef ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-primary" />}
                        </motion.button>
                      </div>
                    </motion.div>

                    <motion.div className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-blue-200">Tier Status</span>
                        <Star className="w-4 h-4 text-blue-400" />
                      </div>
                      <div className="space-y-2">
                        <p className="text-white font-semibold">Platinum (Tier 3)</p>
                        <p className="text-xs text-blue-300">2,550 XP to Diamond Tier</p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders" className="p-6 space-y-4">
              {orders.map((order, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="bg-black/40 border border-white/10 rounded-xl p-5 hover:border-white/20 transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <p className="font-bold text-white text-lg">{order.id}</p>
                        <Badge className={`${order.status === "Delivered" ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-blue-500/20 text-blue-400 border-blue-500/30"}`}>
                          {order.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{order.date} • {order.items} items</p>
                      <div className="text-xs text-muted-foreground space-y-1">
                        {order.itemsList.map((item, j) => (
                          <p key={j}>• {item}</p>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                      <p className="text-2xl font-bold text-primary">{order.total}</p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="px-4 py-2 bg-primary/10 border border-primary/30 text-primary rounded-lg hover:bg-primary/20 transition-all text-sm font-semibold flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Invoice
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </TabsContent>

            {/* Addresses Tab */}
            <TabsContent value="addresses" className="p-6 space-y-4">
              {addresses.map((addr, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="bg-black/40 border border-white/10 rounded-xl p-5 hover:border-white/20 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-bold text-white text-lg">{addr.label}</h4>
                        {addr.default && <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">Default</Badge>}
                      </div>
                      <p className="text-muted-foreground text-sm">{addr.address}</p>
                    </div>
                    <div className="flex gap-2">
                      <motion.button whileHover={{ scale: 1.1 }} className="p-2 hover:bg-white/10 rounded-lg transition-all">
                        <Edit2 className="w-4 h-4 text-primary" />
                      </motion.button>
                      <motion.button whileHover={{ scale: 1.1 }} className="p-2 hover:bg-red-500/10 rounded-lg transition-all">
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}

              {showAddAddress ? (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-black/40 border border-primary/30 rounded-xl p-5 space-y-4">
                  <h4 className="font-bold text-white">Add New Address</h4>
                  <div className="space-y-3">
                    <input type="text" placeholder="Label (e.g., Home, Office)" className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30" />
                    <input type="text" placeholder="Street Address" className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30" />
                    <div className="grid grid-cols-2 gap-3">
                      <input type="text" placeholder="City" className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30" />
                      <input type="text" placeholder="Zip Code" className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30" />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={() => setShowAddAddress(false)} className="flex-1 bg-primary hover:bg-primary/90">Add Address</Button>
                      <Button onClick={() => setShowAddAddress(false)} variant="outline" className="flex-1">Cancel</Button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setShowAddAddress(true)}
                  className="w-full py-4 border border-dashed border-white/20 rounded-xl text-primary hover:border-white/40 transition-all font-semibold flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add New Address
                </motion.button>
              )}
            </TabsContent>

            {/* Payment Methods Tab */}
            <TabsContent value="payment" className="p-6 space-y-4">
              {paymentMethods.map((method, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl p-5 border border-white/10"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-bold text-white">{method.label} •••• {method.last4}</p>
                        <p className="text-sm text-muted-foreground">Expires {method.expiry}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {method.default && <Badge className="bg-primary/20 text-primary border-primary/30">Default</Badge>}
                      <motion.button whileHover={{ scale: 1.1 }} className="p-2 hover:bg-white/10 rounded-lg transition-all">
                        <Edit2 className="w-4 h-4 text-primary" />
                      </motion.button>
                      <motion.button whileHover={{ scale: 1.1 }} className="p-2 hover:bg-red-500/10 rounded-lg transition-all">
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}

              {showAddPayment ? (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-black/40 border border-primary/30 rounded-xl p-5 space-y-4">
                  <h4 className="font-bold text-white">Add Payment Method</h4>
                  <div className="space-y-3">
                    <input type="text" placeholder="Card Number" maxLength={19} className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30" />
                    <div className="grid grid-cols-2 gap-3">
                      <input type="text" placeholder="MM/YY" maxLength={5} className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30" />
                      <input type="text" placeholder="CVC" maxLength={3} className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30" />
                    </div>
                    <input type="text" placeholder="Cardholder Name" className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30" />
                    <div className="flex gap-2">
                      <Button onClick={() => setShowAddPayment(false)} className="flex-1 bg-primary hover:bg-primary/90">Add Card</Button>
                      <Button onClick={() => setShowAddPayment(false)} variant="outline" className="flex-1">Cancel</Button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setShowAddPayment(true)}
                  className="w-full py-4 border border-dashed border-white/20 rounded-xl text-primary hover:border-white/40 transition-all font-semibold flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add Payment Method
                </motion.button>
              )}
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Account Settings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Account Security
                  </h3>
                  <motion.div className="bg-black/40 border border-white/10 rounded-lg p-4 space-y-4">
                    {[
                      { label: "Change Password", icon: Lock },
                      { label: "Two-Factor Authentication", icon: Shield },
                      { label: "Active Sessions", icon: Zap },
                      { label: "Login History", icon: Clock },
                    ].map((item, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.02 }}
                        className="w-full flex items-center justify-between p-3 hover:bg-white/5 rounded-lg transition-all border border-transparent hover:border-white/10"
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="w-5 h-5 text-primary" />
                          <span className="text-white font-semibold">{item.label}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </motion.button>
                    ))}
                  </motion.div>
                </div>

                {/* Notification Settings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Bell className="w-5 h-5 text-primary" />
                    Notifications
                  </h3>
                  <motion.div className="bg-black/40 border border-white/10 rounded-lg p-4 space-y-4">
                    {[
                      { label: "Order Updates", enabled: true },
                      { label: "Promotional Offers", enabled: false },
                      { label: "Newsletter", enabled: true },
                      { label: "Wishlist Alerts", enabled: true },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-white">{item.label}</span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          className={`w-12 h-6 rounded-full transition-all ${item.enabled ? "bg-primary" : "bg-white/10"}`}
                        >
                          <motion.div className={`w-5 h-5 rounded-full bg-white transition-all ${item.enabled ? "ml-6" : "ml-1"}`} />
                        </motion.button>
                      </div>
                    ))}
                  </motion.div>
                </div>

                {/* Preferences */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" />
                    Preferences
                  </h3>
                  <motion.div className="bg-black/40 border border-white/10 rounded-lg p-4 space-y-4">
                    {[
                      { label: "Language", value: "English" },
                      { label: "Currency", value: "USD" },
                      { label: "Theme", value: "Dark" },
                      { label: "Email Frequency", value: "Weekly" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-white">{item.label}</span>
                        <select className="bg-black/40 border border-white/20 rounded-lg px-3 py-1 text-white text-sm cursor-pointer hover:border-white/40 transition-all">
                          <option>{item.value}</option>
                        </select>
                      </div>
                    ))}
                  </motion.div>
                </div>

                {/* Privacy & Data */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Lock className="w-5 h-5 text-primary" />
                    Privacy & Data
                  </h3>
                  <motion.div className="bg-black/40 border border-white/10 rounded-lg p-4 space-y-3">
                    {[
                      { label: "Download My Data", color: "text-blue-400" },
                      { label: "Data Privacy Policy", color: "text-blue-400" },
                      { label: "Delete Account", color: "text-red-400" },
                    ].map((item, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.02 }}
                        className={`w-full text-left font-semibold py-2 px-3 hover:bg-white/5 rounded-lg transition-all ${item.color}`}
                      >
                        {item.label}
                      </motion.button>
                    ))}
                  </motion.div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
}
