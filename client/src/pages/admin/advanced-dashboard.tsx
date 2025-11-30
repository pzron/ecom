import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, ScatterChart, Scatter } from "recharts";
import { TrendingUp, Package, DollarSign, Users, Clock, Truck, CheckCircle, XCircle, AlertTriangle, Eye, Filter, MapPin, ShoppingCart, Zap } from "lucide-react";

const COLORS = ["#A855F7", "#EC4899", "#06B6D4", "#F59E0B", "#10B981"];

export default function AdvancedAdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedMetric, setSelectedMetric] = useState("revenue");
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    fetchStats();
    const interval = autoRefresh ? setInterval(fetchStats, 10000) : null;
    return () => clearInterval(interval as any);
  }, [autoRefresh]);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/dashboard");
      const data = await res.json();
      setStats(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-screen text-white text-xl">Loading...</div>;

  const StatCard = ({ icon: Icon, label, value, subtext, trend, color }: any) => (
    <motion.div whileHover={{ y: -8 }} className="p-6 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 hover:border-white/20 transition-all">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-white/60 text-sm font-medium">{label}</p>
          <h3 className="text-3xl font-bold text-white mt-2">{value}</h3>
          {subtext && <p className="text-xs text-white/40 mt-2">{subtext}</p>}
          {trend !== undefined && (
            <p className={`text-xs mt-2 font-semibold ${trend > 0 ? "text-green-400" : "text-red-400"}`}>
              {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}% vs last month
            </p>
          )}
        </div>
        <div className="p-4 rounded-xl bg-white/5">
          <Icon className="w-8 h-8 text-white/50" />
        </div>
      </div>
    </motion.div>
  );

  const filteredLocationData = selectedLocation === "all" ? stats?.locationData : stats?.locationData?.filter((l: any) => l.location === selectedLocation);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Admin Dashboard</h1>
            <p className="text-white/60 mt-2">Real-time platform analytics & control center</p>
          </div>
          <label className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-lg border border-white/10 cursor-pointer">
            <input type="checkbox" checked={autoRefresh} onChange={(e) => setAutoRefresh(e.target.checked)} />
            <span className="text-white text-sm">Auto-refresh (10s)</span>
          </label>
        </motion.div>

        {/* Primary KPI Stats - 6 Cards */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <StatCard icon={DollarSign} label="Total Revenue" value={`৳${(stats?.totalRevenue || 0).toLocaleString()}`} trend={12} />
          <StatCard icon={Package} label="Total Orders" value={stats?.totalOrders || 0} subtext={`${stats?.conversionRate}% conversion`} trend={8} />
          <StatCard icon={Users} label="Active Users" value={stats?.totalUsers || 0} trend={15} />
          <StatCard icon={Clock} label="Order Requests" value={stats?.orderRequests || 0} subtext="Awaiting processing" trend={3} />
          <StatCard icon={Truck} label="Pending Delivery" value={stats?.pendingDelivery || 0} subtext="In transit" trend={5} />
          <StatCard icon={CheckCircle} label="Delivered" value={stats?.deliveredOrders || 0} subtext={`${((stats?.deliveredOrders / (stats?.totalOrders || 1)) * 100).toFixed(0)}% success rate`} trend={18} />
        </motion.div>

        {/* Additional 4 Cards - Advanced Metrics */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 20 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <motion.div whileHover={{ scale: 1.02 }} className="p-4 rounded-2xl bg-gradient-to-br from-purple-900/20 to-slate-900 border border-purple-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-xs">Avg Order Value</p>
                <p className="text-2xl font-bold text-purple-400 mt-2">৳{(stats?.avgOrderValue || 0).toLocaleString()}</p>
              </div>
              <DollarSign className="w-6 h-6 text-purple-400" />
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} className="p-4 rounded-2xl bg-gradient-to-br from-pink-900/20 to-slate-900 border border-pink-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-xs">Conversion Rate</p>
                <p className="text-2xl font-bold text-pink-400 mt-2">{stats?.conversionRate || 0}%</p>
              </div>
              <TrendingUp className="w-6 h-6 text-pink-400" />
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} className="p-4 rounded-2xl bg-gradient-to-br from-cyan-900/20 to-slate-900 border border-cyan-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-xs">Low Stock Items</p>
                <p className="text-2xl font-bold text-cyan-400 mt-2">{stats?.lowStockProducts || 0}</p>
              </div>
              <AlertTriangle className="w-6 h-6 text-cyan-400" />
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} className="p-4 rounded-2xl bg-gradient-to-br from-green-900/20 to-slate-900 border border-green-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-xs">Cart Visitors</p>
                <p className="text-2xl font-bold text-green-400 mt-2">{(stats?.cartVisitors || 0).toLocaleString()}</p>
              </div>
              <Eye className="w-6 h-6 text-green-400" />
            </div>
          </motion.div>
        </motion.div>

        {/* Charts Row 1: Revenue + Order Distribution */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 20 }} className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-purple-400" /> Revenue Trend (Last 30 Days)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={stats?.revenueTrend || []}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#A855F7" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#A855F7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#333" />
                <XAxis stroke="#999" tick={{ fontSize: 12 }} />
                <YAxis stroke="#999" tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ backgroundColor: "#1a1a2e", border: "1px solid #333" }} />
                <Area type="monotone" dataKey="revenue" stroke="#A855F7" fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Order Status Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Pending", value: stats?.pendingOrders || 0 },
                    { name: "Processing", value: stats?.processingOrders || 0 },
                    { name: "Delivered", value: stats?.deliveredOrders || 0 },
                    { name: "Cancelled", value: stats?.cancelledOrders || 0 }
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {COLORS.map((color, index) => (
                    <Cell key={`cell-${index}`} fill={color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Charts Row 2: Location Analytics + Visitor Conversion */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 20 }} className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2"><MapPin className="w-5 h-5 text-cyan-400" /> Sales by Location</h3>
              <select 
                value={selectedLocation} 
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-3 py-1 bg-slate-700 rounded text-white text-sm border border-white/10"
              >
                <option value="all">All Locations</option>
                {stats?.locationData?.map((loc: any) => (
                  <option key={loc.location} value={loc.location}>{loc.location}</option>
                ))}
              </select>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={filteredLocationData || []}>
                <CartesianGrid stroke="#333" />
                <XAxis stroke="#999" tick={{ fontSize: 12 }} dataKey="location" />
                <YAxis stroke="#999" />
                <Tooltip contentStyle={{ backgroundColor: "#1a1a2e", border: "1px solid #333" }} />
                <Legend />
                <Bar dataKey="sales" fill="#A855F7" name="Sales (৳)" />
                <Bar dataKey="orders" fill="#EC4899" name="Orders" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><ShoppingCart className="w-5 h-5 text-green-400" /> Visitor Analytics (7 Days)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={stats?.visitorAnalytics || []}>
                <defs>
                  <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPurchases" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#333" />
                <XAxis stroke="#999" tick={{ fontSize: 11 }} dataKey="date" />
                <YAxis stroke="#999" />
                <Tooltip contentStyle={{ backgroundColor: "#1a1a2e", border: "1px solid #333" }} />
                <Area type="monotone" dataKey="visitors" stroke="#06B6D4" fill="url(#colorVisitors)" name="Total Visitors" />
                <Area type="monotone" dataKey="purchases" stroke="#10B981" fill="url(#colorPurchases)" name="Purchases" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Product Performance & Performance Metrics */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 20 }} className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 p-6 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><Filter className="w-5 h-5 text-pink-400" /> Top Product Performance</h3>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {stats?.productMetrics?.map((product: any, idx: number) => (
                <motion.div key={idx} whileHover={{ x: 4 }} className="p-4 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="text-white font-semibold">{product.name}</h4>
                      <p className="text-white/60 text-xs">Stock: {product.stock} | Rating: ⭐{product.rating}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-green-400 font-bold">৳{(product.revenue || 0).toLocaleString()}</p>
                      <p className={`text-xs ${product.trend.startsWith("+") ? "text-green-400" : "text-red-400"}`}>{product.trend}</p>
                    </div>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1.5">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 rounded-full" style={{ width: `${(product.sales / 5000) * 100}%` }}></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><Zap className="w-5 h-5 text-yellow-400" /> Performance Metrics</h3>
            <div className="space-y-4">
              <div>
                <p className="text-white/60 text-sm mb-1">Page Load Time</p>
                <p className="text-2xl font-bold text-yellow-400">{stats?.pageLoadTime}</p>
              </div>
              <div>
                <p className="text-white/60 text-sm mb-1">API Response</p>
                <p className="text-2xl font-bold text-cyan-400">{stats?.apiResponseTime}</p>
              </div>
              <div>
                <p className="text-white/60 text-sm mb-1">Database Query</p>
                <p className="text-2xl font-bold text-green-400">{stats?.databaseQueryTime}</p>
              </div>
              <div>
                <p className="text-white/60 text-sm mb-1">Cache Hit Rate</p>
                <p className="text-2xl font-bold text-purple-400">{stats?.cacheHitRate}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Orders Table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 20 }} className="p-6 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Orders</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-4 py-3 text-left text-white font-semibold">Order #</th>
                  <th className="px-4 py-3 text-left text-white font-semibold">Total</th>
                  <th className="px-4 py-3 text-left text-white font-semibold">Status</th>
                  <th className="px-4 py-3 text-left text-white font-semibold">Payment</th>
                  <th className="px-4 py-3 text-left text-white font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {stats?.recentOrders?.slice(0, 8).map((order: any) => (
                  <tr key={order.id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="px-4 py-3 text-white font-medium">{order.orderNumber}</td>
                    <td className="px-4 py-3 text-green-400 font-semibold">৳{parseFloat(order.total).toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === "delivered" ? "bg-green-500/20 text-green-400" :
                        order.status === "processing" ? "bg-blue-500/20 text-blue-400" :
                        order.status === "pending" ? "bg-orange-500/20 text-orange-400" :
                        "bg-red-500/20 text-red-400"
                      }`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.paymentStatus === "paid" ? "bg-green-500/20 text-green-400" : "bg-orange-500/20 text-orange-400"
                      }`}>
                        {order.paymentStatus === "paid" ? "✓ Paid" : "Pending"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-white/60">{new Date(order.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
