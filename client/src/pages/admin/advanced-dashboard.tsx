import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Package, DollarSign, Users, Clock, Truck, CheckCircle, XCircle, AlertTriangle, Eye, Filter } from "lucide-react";

const COLORS = ["#A855F7", "#EC4899", "#06B6D4", "#F59E0B"];

export default function AdvancedAdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [filterProduct, setFilterProduct] = useState("all");
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
    <motion.div whileHover={{ y: -8 }} className={`p-6 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-${color}-500/30 hover:border-${color}-500/50 transition-all`}>
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
        <div className={`p-4 rounded-xl bg-${color}-500/20`}>
          <Icon className={`w-8 h-8 text-${color}-400`} />
        </div>
      </div>
    </motion.div>
  );

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
            <span className="text-white text-sm">Auto-refresh</span>
          </label>
        </motion.div>

        {/* KPI Stats - 6 Cards */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <StatCard icon={DollarSign} label="Total Revenue" value={`৳${(stats?.totalRevenue || 0).toLocaleString()}`} trend={12} color="purple" />
          <StatCard icon={Package} label="Total Orders" value={stats?.totalOrders || 0} subtext={`${stats?.conversionRate}% conversion`} trend={8} color="pink" />
          <StatCard icon={Users} label="Active Users" value={stats?.totalUsers || 0} trend={15} color="cyan" />
          <StatCard icon={Clock} label="Pending Orders" value={stats?.pendingOrders || 0} subtext="Awaiting processing" color="orange" />
          <StatCard icon={Truck} label="In Transit" value={stats?.processingOrders || 0} subtext="Pending delivery" color="blue" />
          <StatCard icon={CheckCircle} label="Delivered" value={stats?.deliveredOrders || 0} subtext={`${((stats?.deliveredOrders / (stats?.totalOrders || 1)) * 100).toFixed(0)}% success rate`} color="green" />
        </motion.div>

        {/* Alert Cards - 2 more important metrics */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 20 }} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <motion.div whileHover={{ scale: 1.02 }} className="p-6 rounded-2xl bg-gradient-to-br from-red-900/20 to-slate-900 border border-red-500/30">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-red-400" /> Low Stock Alert</h3>
                <p className="text-3xl font-bold text-red-400 mt-3">{stats?.lowStockProducts || 0}</p>
                <p className="text-white/60 text-sm mt-1">Products need restocking</p>
              </div>
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} className="p-6 rounded-2xl bg-gradient-to-br from-green-900/20 to-slate-900 border border-green-500/30">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white flex items-center gap-2"><Eye className="w-5 h-5 text-green-400" /> Visitor Tracking</h3>
                <p className="text-3xl font-bold text-green-400 mt-3">{stats?.cartVisitors || 0}</p>
                <p className="text-white/60 text-sm mt-1">Unique cart visitors</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Charts Grid */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 20 }} className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Trend Area Chart */}
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

          {/* Orders by Status Pie Chart */}
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

          {/* Product Performance Bar Chart */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 lg:col-span-2">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Filter className="w-5 h-5 text-pink-400" /> Top Products Performance
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats?.topProducts?.slice(0, 8) || []}>
                <CartesianGrid stroke="#333" />
                <XAxis stroke="#999" tick={{ fontSize: 11 }} angle={-45} textAnchor="end" height={80} />
                <YAxis stroke="#999" />
                <Tooltip contentStyle={{ backgroundColor: "#1a1a2e", border: "1px solid #333" }} />
                <Legend />
                <Bar dataKey="reviewCount" fill="#A855F7" name="Reviews" />
                <Bar dataKey="stock" fill="#EC4899" name="Stock" />
              </BarChart>
            </ResponsiveContainer>
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
