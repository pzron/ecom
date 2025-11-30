import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import {
  User, Package, Heart, Award, Settings, LogOut, MapPin, CreditCard, Clock,
  ChevronRight, Edit2, Trash2, Plus, Bell, Shield, Download,
  Star, TrendingUp, Share2, Copy, Check, Zap, Lock, Mail,
  Phone, Home, DollarSign, Calendar, Percent, Gift, BarChart3, Trophy
} from "lucide-react";
import { useAuthStore } from "@/stores/auth";
import { useState } from "react";

export default function ProfilePage() {
  const [, navigate] = useLocation();
  const { user, logout, isAuthenticated } = useAuthStore();
  const [activeNav, setActiveNav] = useState("overview");
  const [editMode, setEditMode] = useState(false);
  const [copyRef, setCopyRef] = useState(false);

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
    { id: "wishlist", icon: Heart, label: "Wishlist" },
    { id: "affiliate", icon: Award, label: "Affiliate Program" },
    { id: "addresses", icon: MapPin, label: "Addresses" },
    { id: "payments", icon: CreditCard, label: "Payment Methods" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  const orders = [
    { id: "ORD-2024-001", date: "Today", status: "In Transit", total: "$2,053.76", items: 2, itemsList: ["iPhone 15 Pro Max", "Sony WH-1000X"] },
    { id: "ORD-2024-002", date: "Nov 28, 2024", status: "Delivered", total: "$499.99", items: 1, itemsList: ["MacBook Air M3"] },
    { id: "ORD-2024-003", date: "Nov 20, 2024", status: "Delivered", total: "$149.99", items: 1, itemsList: ["Apple Watch Series 9"] },
  ];

  const wishlistItems = [
    { name: "PlayStation 5 Pro", price: "$799.99", image: "🎮" },
    { name: "DJI Mini 4 Pro", price: "$459.00", image: "🚁" },
    { name: "Sony A6700 Camera", price: "$1,398.00", image: "📷" },
  ];

  const addresses = [
    { id: 1, label: "Home", address: "123 Main St, New York, NY 10001", default: true },
    { id: 2, label: "Office", address: "456 Business Ave, New York, NY 10002", default: false },
  ];

  const payments = [
    { id: 1, type: "card", label: "Visa", last4: "4242", expiry: "12/25", default: true },
    { id: 2, type: "card", label: "Mastercard", last4: "5555", expiry: "08/26", default: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-foreground selection:bg-primary selection:text-white pb-20">
      <Navbar />

      <main className="container mx-auto px-4 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-3 space-y-6">
            {/* Profile Card */}
            <div className="bg-gradient-to-br from-primary/20 to-secondary/20 border border-white/10 rounded-2xl p-6 text-center backdrop-blur-md">
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary p-1 mx-auto mb-4">
                <img src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} alt="User" className="w-full h-full rounded-full border-4 border-slate-900" />
              </motion.div>
              <h2 className="text-2xl font-bold text-white mb-1">{user?.name || "User"}</h2>
              <p className="text-muted-foreground text-sm mb-4">{user?.email}</p>
              <div className="space-y-2 mb-4">
                <Badge className="bg-gradient-to-r from-primary to-secondary border-0 mx-1 text-sm py-2">⭐ Platinum Member</Badge>
                <Badge className="bg-green-500/20 text-green-400 border border-green-500/30 mx-1 text-sm py-2">✓ Verified</Badge>
              </div>
              <div className="space-y-1 bg-black/30 rounded-lg p-3">
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: "75%" }} transition={{ duration: 1, delay: 0.3 }} className="h-full bg-gradient-to-r from-primary to-secondary" />
                </div>
                <p className="text-xs text-muted-foreground font-semibold">2,450 / 5,000 XP to Diamond Tier</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="bg-white/5 border border-white/10 rounded-2xl p-3 backdrop-blur-md space-y-1">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => setActiveNav(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${activeNav === item.id ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/30" : "text-muted-foreground hover:text-white hover:bg-white/5"}`}
                  whileHover={{ scale: 1.02 }}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-semibold text-sm">{item.label}</span>
                </motion.button>
              ))}
              <motion.button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-all text-left font-semibold text-sm"
                whileHover={{ scale: 1.02 }}
              >
                <LogOut className="w-5 h-5" />
                Log Out
              </motion.button>
            </nav>

            {/* Quick Stats */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md space-y-4">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Quick Stats
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 bg-black/30 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-blue-400" />
                    <span className="text-muted-foreground text-sm">Total Orders</span>
                  </div>
                  <span className="font-bold text-white text-lg">12</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-black/30 rounded-lg">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-400" />
                    <span className="text-muted-foreground text-sm">Total Spent</span>
                  </div>
                  <span className="font-bold text-white text-lg">$15.2K</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-black/30 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-muted-foreground text-sm">Loyalty Points</span>
                  </div>
                  <span className="font-bold text-primary text-lg">2,450</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Main Content */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="lg:col-span-9">
            <div className="bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md overflow-hidden">
              {/* Overview */}
              {activeNav === "overview" && (
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/30 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-purple-200">Status</span>
                        <Trophy className="w-5 h-5 text-purple-400" />
                      </div>
                      <p className="text-2xl font-bold text-white">Platinum</p>
                      <p className="text-xs text-purple-300 mt-1">Member Tier</p>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-blue-200">Loyalty Points</span>
                        <Star className="w-5 h-5 text-blue-400" />
                      </div>
                      <p className="text-2xl font-bold text-white">2,450</p>
                      <p className="text-xs text-blue-300 mt-1">+2,550 to Diamond</p>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-green-200">Referral Link</span>
                        <Share2 className="w-5 h-5 text-green-400" />
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <code className="text-xs bg-black/40 text-primary px-2 py-1 rounded flex-1 overflow-hidden text-ellipsis">nex-ref-{user?.id?.substring(0, 8)}</code>
                        <motion.button whileHover={{ scale: 1.1 }} onClick={() => setCopyRef(true)} className="p-1.5 hover:bg-white/10 rounded-lg transition-all">
                          {copyRef ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-primary" />}
                        </motion.button>
                      </div>
                    </motion.div>
                  </div>

                  <div className="border-t border-white/10 pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold text-white">Personal Information</h2>
                      <motion.button whileHover={{ scale: 1.1 }} onClick={() => setEditMode(!editMode)} className="p-2 hover:bg-white/10 rounded-lg transition-all">
                        <Edit2 className="w-5 h-5 text-primary" />
                      </motion.button>
                    </div>

                    {editMode ? (
                      <div className="space-y-4">
                        <div><label className="text-sm font-semibold text-white mb-2 block">Full Name</label>
                          <input type="text" defaultValue={user?.name} className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30" /></div>
                        <div><label className="text-sm font-semibold text-white mb-2 block">Email</label>
                          <input type="email" defaultValue={user?.email} className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30" /></div>
                        <div><label className="text-sm font-semibold text-white mb-2 block">Phone</label>
                          <input type="tel" defaultValue="+1 (555) 000-0000" className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30" /></div>
                        <div className="flex gap-2"><Button onClick={() => setEditMode(false)} className="flex-1 bg-primary hover:bg-primary/90">Save</Button>
                          <Button onClick={() => setEditMode(false)} variant="outline" className="flex-1">Cancel</Button></div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { icon: User, label: "Name", value: user?.name },
                          { icon: Mail, label: "Email", value: user?.email },
                          { icon: Phone, label: "Phone", value: "+1 (555) 000-0000" },
                          { icon: Calendar, label: "Member Since", value: "Jan 2024" },
                        ].map((item, i) => (
                          <div key={i} className="p-4 bg-black/40 rounded-lg border border-white/10">
                            <div className="flex items-center gap-3 mb-2"><item.icon className="w-5 h-5 text-primary" />
                              <span className="text-xs text-muted-foreground">{item.label}</span></div>
                            <p className="text-white font-semibold">{item.value}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Orders with Invoice */}
              {activeNav === "orders" && (
                <div className="p-6 space-y-4">
                  <h2 className="text-2xl font-bold text-white mb-6">Order History</h2>
                  {orders.map((order, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }} className="bg-black/40 border border-white/10 rounded-lg p-5 hover:border-white/20 transition-all">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <p className="font-bold text-white">{order.id}</p>
                            <Badge className={order.status === "Delivered" ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-blue-500/20 text-blue-400 border-blue-500/30"}>{order.status}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{order.date}</p>
                          <p className="text-xs text-muted-foreground">{order.itemsList.join(", ")}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-2xl font-bold text-primary">{order.total}</p>
                          </div>
                          <motion.button whileHover={{ scale: 1.05 }} className="px-4 py-2 bg-primary/10 border border-primary/30 text-primary rounded-lg hover:bg-primary/20 transition-all text-sm font-semibold flex items-center gap-2">
                            <Download className="w-4 h-4" />
                            Invoice
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Wishlist */}
              {activeNav === "wishlist" && (
                <div className="p-6 space-y-4">
                  <h2 className="text-2xl font-bold text-white mb-6">Wishlist</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {wishlistItems.map((item, i) => (
                      <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }} className="bg-black/40 border border-white/10 rounded-lg p-4 hover:border-white/20 transition-all text-center">
                        <p className="text-4xl mb-3">{item.image}</p>
                        <p className="text-white font-semibold mb-2">{item.name}</p>
                        <p className="text-primary font-bold mb-3">{item.price}</p>
                        <div className="flex gap-2">
                          <Button className="flex-1 bg-primary hover:bg-primary/90 text-xs h-9">Add to Cart</Button>
                          <motion.button whileHover={{ scale: 1.1 }} className="px-3 h-9 hover:bg-white/10 rounded-lg transition-all"><Trash2 className="w-4 h-4 text-red-400" /></motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Affiliate Program */}
              {activeNav === "affiliate" && (
                <div className="p-6 space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Award className="w-6 h-6 text-primary" />
                    Affiliate Program
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2"><span className="text-sm text-blue-200">Total Referrals</span><User className="w-5 h-5 text-blue-400" /></div>
                      <p className="text-3xl font-bold text-white">24</p>
                      <p className="text-xs text-blue-300 mt-2">Active Referrals</p>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2"><span className="text-sm text-green-200">Total Earnings</span><DollarSign className="w-5 h-5 text-green-400" /></div>
                      <p className="text-3xl font-bold text-white">$1,240</p>
                      <p className="text-xs text-green-300 mt-2">Lifetime Earnings</p>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/30 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2"><span className="text-sm text-purple-200">Commission Rate</span><Percent className="w-5 h-5 text-purple-400" /></div>
                      <p className="text-3xl font-bold text-white">5%</p>
                      <p className="text-xs text-purple-300 mt-2">Per Referral Sale</p>
                    </motion.div>
                  </div>

                  <div className="bg-black/40 border border-white/10 rounded-lg p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Your Referral Link</h3>
                    <div className="flex items-center gap-2 mb-4">
                      <input type="text" readOnly value={`https://nexcommerce.com/ref/${user?.id?.substring(0, 12)}`} className="flex-1 bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-primary text-sm focus:outline-none" />
                      <motion.button whileHover={{ scale: 1.05 }} className="px-4 py-3 bg-primary/10 border border-primary/30 text-primary rounded-lg hover:bg-primary/20 transition-all font-semibold flex items-center gap-2">
                        <Copy className="w-4 h-4" />
                        Copy
                      </motion.button>
                    </div>
                    <p className="text-sm text-muted-foreground">Share your link to earn 5% commission on every purchase</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white mb-4">Top Referrals</h3>
                    <div className="space-y-2">
                      {[
                        { name: "John Doe", orders: 8, revenue: "$450" },
                        { name: "Jane Smith", orders: 6, revenue: "$320" },
                        { name: "Mike Johnson", orders: 4, revenue: "$210" },
                      ].map((ref, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-black/40 rounded-lg border border-white/10">
                          <div><p className="text-white font-semibold">{ref.name}</p>
                            <p className="text-xs text-muted-foreground">{ref.orders} orders</p></div>
                          <p className="text-primary font-bold">{ref.revenue}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Addresses */}
              {activeNav === "addresses" && (
                <div className="p-6 space-y-4">
                  <h2 className="text-2xl font-bold text-white mb-6">Saved Addresses</h2>
                  {addresses.map((addr, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }} className="bg-black/40 border border-white/10 rounded-lg p-5 hover:border-white/20 transition-all">
                      <div className="flex items-start justify-between">
                        <div><div className="flex items-center gap-3 mb-2">
                          <h4 className="font-bold text-white">{addr.label}</h4>
                          {addr.default && <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">Default</Badge>}</div>
                          <p className="text-muted-foreground text-sm">{addr.address}</p></div>
                        <div className="flex gap-2">
                          <motion.button whileHover={{ scale: 1.1 }} className="p-2 hover:bg-white/10 rounded-lg"><Edit2 className="w-4 h-4 text-primary" /></motion.button>
                          <motion.button whileHover={{ scale: 1.1 }} className="p-2 hover:bg-red-500/10 rounded-lg"><Trash2 className="w-4 h-4 text-red-400" /></motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  <motion.button whileHover={{ scale: 1.02 }} className="w-full py-3 border border-dashed border-white/20 rounded-lg text-primary hover:border-white/40 transition-all font-semibold flex items-center justify-center gap-2">
                    <Plus className="w-5 h-5" />
                    Add New Address
                  </motion.button>
                </div>
              )}

              {/* Payments */}
              {activeNav === "payments" && (
                <div className="p-6 space-y-4">
                  <h2 className="text-2xl font-bold text-white mb-6">Payment Methods</h2>
                  {payments.map((method, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }} className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-lg p-5 border border-white/10">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <CreditCard className="w-6 h-6 text-primary" />
                          <div><p className="font-bold text-white">{method.label} •••• {method.last4}</p>
                            <p className="text-sm text-muted-foreground">Expires {method.expiry}</p></div>
                        </div>
                        <div className="flex items-center gap-3">
                          {method.default && <Badge className="bg-primary/20 text-primary border-primary/30">Default</Badge>}
                          <motion.button whileHover={{ scale: 1.1 }} className="p-2 hover:bg-white/10 rounded-lg"><Edit2 className="w-4 h-4 text-primary" /></motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  <motion.button whileHover={{ scale: 1.02 }} className="w-full py-3 border border-dashed border-white/20 rounded-lg text-primary hover:border-white/40 transition-all font-semibold flex items-center justify-center gap-2">
                    <Plus className="w-5 h-5" />
                    Add Payment Method
                  </motion.button>
                </div>
              )}

              {/* Settings */}
              {activeNav === "settings" && (
                <div className="p-6 space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Settings</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-white flex items-center gap-2"><Shield className="w-5 h-5 text-primary" /> Security</h3>
                      {[{ label: "Change Password", icon: Lock }, { label: "Two-Factor Auth", icon: Shield }, { label: "Login History", icon: Clock }].map((item, i) => (
                        <motion.button key={i} whileHover={{ scale: 1.02 }} className="w-full flex items-center justify-between p-3 bg-black/40 hover:bg-white/5 rounded-lg border border-white/10 transition-all">
                          <div className="flex items-center gap-3"><item.icon className="w-4 h-4 text-primary" /><span className="text-white font-semibold text-sm">{item.label}</span></div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </motion.button>
                      ))}
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-white flex items-center gap-2"><Bell className="w-5 h-5 text-primary" /> Notifications</h3>
                      {[{ label: "Order Updates", enabled: true }, { label: "Promotions", enabled: false }, { label: "Newsletter", enabled: true }].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-black/40 rounded-lg border border-white/10">
                          <span className="text-white text-sm">{item.label}</span>
                          <motion.button className={`w-10 h-6 rounded-full transition-all ${item.enabled ? "bg-primary" : "bg-white/10"}`}>
                            <motion.div className={`w-4 h-4 rounded-full bg-white transition-all ${item.enabled ? "ml-5" : "ml-1"}`} />
                          </motion.button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
