import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
  RadarChart, Radar, ScatterChart, Scatter
} from "recharts";
import { Download, Calendar, TrendingUp, Users, ShoppingCart, DollarSign, Eye, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const COLORS = ['#a855f7', '#ec4899', '#06b6d4', '#22c55e', '#f59e0b'];

const salesData = [
  { month: 'Jan', revenue: 4200, profit: 2400, orders: 240, customers: 120 },
  { month: 'Feb', revenue: 3890, profit: 1398, orders: 221, customers: 105 },
  { month: 'Mar', revenue: 5200, profit: 3800, orders: 320, customers: 155 },
  { month: 'Apr', revenue: 4780, profit: 3908, orders: 298, customers: 142 },
  { month: 'May', revenue: 6190, profit: 4800, orders: 380, customers: 178 },
  { month: 'Jun', revenue: 5890, profit: 3800, orders: 350, customers: 165 },
];

const categoryData = [
  { name: 'Electronics', value: 4500, percentage: 35 },
  { name: 'Fashion', value: 3200, percentage: 25 },
  { name: 'Home', value: 2800, percentage: 22 },
  { name: 'Sports', value: 1800, percentage: 14 },
  { name: 'Others', value: 700, percentage: 4 },
];

const topProducts = [
  { id: 1, name: 'iPhone 15 Pro', sales: 4500, revenue: 5850000, rating: 4.8, trend: '+23%' },
  { id: 2, name: 'MacBook Pro 16', sales: 1200, revenue: 2400000, rating: 4.7, trend: '+15%' },
  { id: 3, name: 'AirPods Pro 2', sales: 2300, revenue: 575000, rating: 4.6, trend: '+45%' },
  { id: 4, name: 'iPad Air', sales: 890, revenue: 890000, rating: 4.4, trend: '+18%' },
  { id: 5, name: 'Apple Watch', sales: 1900, revenue: 1425000, rating: 4.5, trend: '-5%' },
];

const topCities = [
  { city: 'Dhaka', sales: 4200, orders: 156, customers: 340, growth: '+12%' },
  { city: 'Chittagong', sales: 2800, orders: 94, customers: 210, growth: '+8%' },
  { city: 'Sylhet', sales: 1500, orders: 52, customers: 115, growth: '+5%' },
  { city: 'Khulna', sales: 1200, orders: 38, customers: 85, growth: '+3%' },
  { city: 'Rajshahi', sales: 900, orders: 28, customers: 60, growth: '+2%' },
];

const conversionData = [
  { source: 'Direct', visits: 4000, conversions: 240, rate: 6.0 },
  { source: 'Organic', visits: 3800, conversions: 228, rate: 6.0 },
  { source: 'Social', visits: 2800, conversions: 140, rate: 5.0 },
  { source: 'Email', visits: 2200, conversions: 88, rate: 4.0 },
  { source: 'Paid Ads', visits: 2290, conversions: 91, rate: 4.0 },
];

export default function AdminAnalytics() {
  const [timeRange, setTimeRange] = useState("30d");

  const colorClasses: Record<string, { bg: string; text: string }> = {
    purple: { bg: "bg-purple-500/20", text: "text-purple-400" },
    pink: { bg: "bg-pink-500/20", text: "text-pink-400" },
    blue: { bg: "bg-blue-500/20", text: "text-blue-400" },
    green: { bg: "bg-green-500/20", text: "text-green-400" },
    orange: { bg: "bg-orange-500/20", text: "text-orange-400" },
    red: { bg: "bg-red-500/20", text: "text-red-400" },
  };

  const StatCard = ({ icon: Icon, label, value, subtext, color }: any) => (
    <motion.div whileHover={{ y: -4 }} className="p-4 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-white/60 text-sm">{label}</p>
          <h3 className="text-2xl font-bold text-white mt-2">{value}</h3>
          {subtext && <p className="text-xs text-white/40 mt-1">{subtext}</p>}
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]?.bg || "bg-purple-500/20"}`}>
          <Icon className={`w-6 h-6 ${colorClasses[color]?.text || "text-purple-400"}`} />
        </div>
      </div>
    </motion.div>
  );

  return (
    <DashboardLayout role="admin">
      <div className="space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Advanced Analytics</h1>
            <p className="text-white/60 mt-2">Deep dive into store performance metrics and insights</p>
          </div>
          <div className="flex gap-2">
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
              <option value="1y">Last Year</option>
            </select>
            <button className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg text-white font-semibold flex items-center gap-2">
              <Download className="w-4 h-4" /> Export
            </button>
          </div>
        </motion.div>

        {/* Key Metrics - 8 Stat Cards */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={DollarSign} label="Total Revenue" value="৳128.4K" subtext="+12.5% from last month" color="purple" />
          <StatCard icon={ShoppingCart} label="Total Orders" value="1,432" subtext="+8.2% from last month" color="pink" />
          <StatCard icon={Users} label="Active Users" value="14,293" subtext="+15% from last month" color="blue" />
          <StatCard icon={Eye} label="Visitors" value="42,834" subtext="+23% from last month" color="green" />
          <StatCard icon={TrendingUp} label="Conversion Rate" value="3.24%" subtext="-0.4% from last month" color="orange" />
          <StatCard icon={CheckCircle} label="Completed Orders" value="1,386" subtext="96.8% success rate" color="green" />
          <StatCard icon={Clock} label="Pending Orders" value="46" subtext="2 hours avg wait time" color="orange" />
          <StatCard icon={AlertCircle} label="Low Stock Items" value="23" subtext="Urgent attention needed" color="red" />
        </motion.div>

        {/* Charts Row 1: Revenue & Orders */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 20 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-400" /> Revenue & Profit Trend
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid stroke="#333" />
                <XAxis stroke="#999" dataKey="month" />
                <YAxis stroke="#999" />
                <Tooltip contentStyle={{ backgroundColor: "#1a1a2e", border: "1px solid #333" }} />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#a855f7" strokeWidth={2} name="Revenue" />
                <Line type="monotone" dataKey="profit" stroke="#22c55e" strokeWidth={2} name="Profit" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-pink-400" /> Orders & Customers
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#333" />
                <XAxis stroke="#999" dataKey="month" />
                <YAxis stroke="#999" />
                <Tooltip contentStyle={{ backgroundColor: "#1a1a2e", border: "1px solid #333" }} />
                <Area type="monotone" dataKey="orders" stroke="#a855f7" fillOpacity={1} fill="url(#colorOrders)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Charts Row 2: Category & Conversion */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 20 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Sales by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ percentage }) => `${percentage}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "#1a1a2e", border: "1px solid #333" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Conversion by Source</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={conversionData}>
                <CartesianGrid stroke="#333" />
                <XAxis stroke="#999" dataKey="source" />
                <YAxis stroke="#999" />
                <Tooltip contentStyle={{ backgroundColor: "#1a1a2e", border: "1px solid #333" }} />
                <Bar dataKey="conversions" fill="#a855f7" name="Conversions" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Top Products Table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 20 }} className="p-6 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Top Performing Products</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-4 py-3 text-left text-white font-semibold">Product</th>
                  <th className="px-4 py-3 text-left text-white font-semibold">Sales</th>
                  <th className="px-4 py-3 text-left text-white font-semibold">Revenue</th>
                  <th className="px-4 py-3 text-left text-white font-semibold">Rating</th>
                  <th className="px-4 py-3 text-left text-white font-semibold">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {topProducts.map((product, idx) => (
                  <tr key={idx} className="hover:bg-white/5">
                    <td className="px-4 py-3 text-white font-medium">{product.name}</td>
                    <td className="px-4 py-3 text-white/70">{product.sales.toLocaleString()}</td>
                    <td className="px-4 py-3 text-green-400 font-semibold">৳{(product.revenue / 1000).toFixed(0)}K</td>
                    <td className="px-4 py-3"><span className="px-2 py-1 rounded bg-yellow-500/20 text-yellow-400 text-xs">⭐ {product.rating}</span></td>
                    <td className="px-4 py-3"><span className={`text-xs font-semibold ${product.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{product.trend}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Geographic & Performance Row */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 20 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Cities */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Sales by City</h3>
            <div className="space-y-3">
              {topCities.map((city, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-semibold">{city.city}</h4>
                    <span className={`text-xs font-semibold ${city.growth.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{city.growth}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-white/60">
                    <span>৳{city.sales}K • {city.orders} orders • {city.customers} customers</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1.5 mt-2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 rounded-full" style={{ width: `${(city.sales / 5000) * 100}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Category Performance</h3>
            <div className="space-y-3">
              {categoryData.map((cat, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-semibold">{cat.name}</h4>
                    <span className="text-sm text-purple-400 font-bold">{cat.percentage}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: `${cat.percentage}%` }}></div>
                  </div>
                  <p className="text-xs text-white/60 mt-1">৳{(cat.value / 1000).toFixed(0)}K revenue</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Insights & Summary */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 20 }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-green-900/20 to-slate-900 border border-green-500/30">
            <h4 className="text-white font-bold mb-3">✓ Strengths</h4>
            <ul className="space-y-2 text-white/70 text-sm">
              <li>• Strong growth in Electronics (35% sales)</li>
              <li>• High conversion rate (3.24%)</li>
              <li>• Customer retention improving</li>
            </ul>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-900/20 to-slate-900 border border-orange-500/30">
            <h4 className="text-white font-bold mb-3">! Opportunities</h4>
            <ul className="space-y-2 text-white/70 text-sm">
              <li>• Expand in underperforming regions</li>
              <li>• Optimize social media campaigns</li>
              <li>• Increase email engagement</li>
            </ul>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-900/20 to-slate-900 border border-purple-500/30">
            <h4 className="text-white font-bold mb-3">→ Recommendations</h4>
            <ul className="space-y-2 text-white/70 text-sm">
              <li>• Focus on Q3 summer campaigns</li>
              <li>• Boost inventory for top products</li>
              <li>• Improve Sylhet market presence</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
