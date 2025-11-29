import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, Users, DollarSign, ShoppingCart, 
  Activity, Globe, Zap, AlertCircle, ArrowUpRight, ArrowDownRight,
  Package, Eye, Star, RefreshCw, Bell, Settings, BarChart3,
  Layers, Cpu, Shield, Wallet
} from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Bar, BarChart, PieChart, Pie, Cell } from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const salesData = [
  { name: 'Mon', sales: 4000, visitors: 2400, orders: 120 },
  { name: 'Tue', sales: 3000, visitors: 1398, orders: 98 },
  { name: 'Wed', sales: 5000, visitors: 9800, orders: 180 },
  { name: 'Thu', sales: 2780, visitors: 3908, orders: 140 },
  { name: 'Fri', sales: 1890, visitors: 4800, orders: 110 },
  { name: 'Sat', sales: 6390, visitors: 3800, orders: 220 },
  { name: 'Sun', sales: 3490, visitors: 4300, orders: 160 },
];

const categoryData = [
  { name: 'Electronics', value: 40, color: '#a855f7' },
  { name: 'Fashion', value: 25, color: '#ec4899' },
  { name: 'Home', value: 20, color: '#06b6d4' },
  { name: 'Sports', value: 15, color: '#f59e0b' },
];

const recentOrders = [
  { id: "ORD-7291", customer: "Alex Morgan", amount: "$1,250.00", status: "completed", product: "MacBook Pro" },
  { id: "ORD-7290", customer: "Sarah Chen", amount: "$890.00", status: "processing", product: "iPhone 15 Pro" },
  { id: "ORD-7289", customer: "Mike Johnson", amount: "$340.00", status: "pending", product: "AirPods Max" },
  { id: "ORD-7288", customer: "Emily Davis", amount: "$2,100.00", status: "completed", product: "Gaming Setup" },
];

const topProducts = [
  { name: "iPhone 15 Pro Max", sales: 1247, revenue: "$1.2M", trend: "+23%" },
  { name: "MacBook Pro M3", sales: 892, revenue: "$1.6M", trend: "+18%" },
  { name: "AirPods Pro 2", sales: 2341, revenue: "$560K", trend: "+31%" },
  { name: "Apple Watch Ultra", sales: 567, revenue: "$450K", trend: "+12%" },
];

function HolographicCard({ 
  children, 
  className = "",
  glowColor = "purple"
}: { 
  children: React.ReactNode; 
  className?: string;
  glowColor?: "purple" | "pink" | "cyan" | "green" | "orange";
}) {
  const glowColors = {
    purple: "from-purple-500/20 via-purple-500/5 to-transparent shadow-purple-500/10",
    pink: "from-pink-500/20 via-pink-500/5 to-transparent shadow-pink-500/10",
    cyan: "from-cyan-500/20 via-cyan-500/5 to-transparent shadow-cyan-500/10",
    green: "from-green-500/20 via-green-500/5 to-transparent shadow-green-500/10",
    orange: "from-orange-500/20 via-orange-500/5 to-transparent shadow-orange-500/10",
  };

  return (
    <div className={`relative group ${className}`}>
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${glowColors[glowColor]} rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500`} />
      <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {children}
      </div>
    </div>
  );
}

function KPICard({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  color,
  delay = 0,
  subValue
}: { 
  title: string;
  value: string;
  change: string;
  icon: any;
  color: "purple" | "pink" | "cyan" | "green" | "orange";
  delay?: number;
  subValue?: string;
}) {
  const colorClasses = {
    purple: "text-purple-400 bg-purple-500/20",
    pink: "text-pink-400 bg-pink-500/20",
    cyan: "text-cyan-400 bg-cyan-500/20",
    green: "text-green-400 bg-green-500/20",
    orange: "text-orange-400 bg-orange-500/20",
  };

  const isPositive = change.startsWith('+');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
    >
      <HolographicCard glowColor={color}>
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-xl ${colorClasses[color]}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              {change}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-white/60 mb-1">{title}</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white">{value}</span>
              {subValue && <span className="text-sm text-white/40">{subValue}</span>}
            </div>
          </div>

          <motion.div 
            className="mt-4 h-1 rounded-full bg-white/5 overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: delay + 0.3, duration: 0.8 }}
          >
            <motion.div 
              className={`h-full rounded-full bg-gradient-to-r ${color === 'purple' ? 'from-purple-500 to-pink-500' : color === 'pink' ? 'from-pink-500 to-rose-500' : color === 'cyan' ? 'from-cyan-500 to-blue-500' : color === 'green' ? 'from-green-500 to-emerald-500' : 'from-orange-500 to-yellow-500'}`}
              initial={{ width: 0 }}
              animate={{ width: `${Math.random() * 40 + 60}%` }}
              transition={{ delay: delay + 0.5, duration: 1, ease: "easeOut" }}
            />
          </motion.div>
        </div>
      </HolographicCard>
    </motion.div>
  );
}

function LiveIndicator() {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
      <div className="relative w-2 h-2">
        <div className="absolute inset-0 rounded-full bg-green-500 animate-ping" />
        <div className="relative w-2 h-2 rounded-full bg-green-500" />
      </div>
      <span className="text-xs font-medium text-green-400">Live</span>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    completed: "bg-green-500/10 text-green-400 border-green-500/20",
    processing: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    pending: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  return (
    <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${styles[status] || styles.pending}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export default function AdminDashboard() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState("7d");

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  return (
    <DashboardLayout role="admin">
      <div className="space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-heading font-bold bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                Command Center
              </h1>
              <LiveIndicator />
            </div>
            <p className="text-white/60">Real-time platform analytics and AI-powered insights</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex rounded-lg bg-white/5 border border-white/10 p-1">
              {["24h", "7d", "30d", "90d"].map((tf) => (
                <button
                  key={tf}
                  onClick={() => setSelectedTimeframe(tf)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                    selectedTimeframe === tf 
                      ? "bg-purple-500 text-white" 
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                  data-testid={`timeframe-${tf}`}
                >
                  {tf}
                </button>
              ))}
            </div>
            
            <Button 
              variant="outline" 
              size="icon"
              className="border-white/10 bg-white/5 hover:bg-white/10"
              onClick={handleRefresh}
              data-testid="refresh-dashboard"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </Button>
            
            <Button 
              variant="outline"
              className="border-white/10 bg-white/5 hover:bg-white/10"
            >
              <Bell className="w-4 h-4 mr-2" />
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
              </span>
            </Button>
            
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              <Zap className="w-4 h-4 mr-2" />
              AI Actions
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard 
            title="Total Revenue" 
            value="$128,430" 
            change="+12.5%" 
            icon={DollarSign} 
            color="purple"
            delay={0}
            subValue="this month"
          />
          <KPICard 
            title="Active Users" 
            value="14,293" 
            change="+5.2%" 
            icon={Users} 
            color="cyan"
            delay={0.1}
            subValue="online now"
          />
          <KPICard 
            title="Orders Today" 
            value="1,432" 
            change="+18.1%" 
            icon={ShoppingCart} 
            color="green"
            delay={0.2}
          />
          <KPICard 
            title="Conversion Rate" 
            value="3.24%" 
            change="-0.4%" 
            icon={TrendingUp} 
            color="orange"
            delay={0.3}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <HolographicCard glowColor="purple">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-500/20">
                      <BarChart3 className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Revenue Analytics</h3>
                      <p className="text-sm text-white/60">Weekly performance overview</p>
                    </div>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-purple-500" />
                      <span className="text-white/60">Revenue</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-cyan-500" />
                      <span className="text-white/60">Visitors</span>
                    </div>
                  </div>
                </div>
                
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={salesData}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis 
                        dataKey="name" 
                        stroke="rgba(255,255,255,0.3)" 
                        fontSize={12} 
                        tickLine={false} 
                        axisLine={false}
                      />
                      <YAxis 
                        stroke="rgba(255,255,255,0.3)" 
                        fontSize={12} 
                        tickLine={false} 
                        axisLine={false} 
                        tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(10, 10, 15, 0.95)', 
                          border: '1px solid rgba(255,255,255,0.1)', 
                          borderRadius: '12px',
                          boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
                        }}
                        itemStyle={{ color: '#fff' }}
                        labelStyle={{ color: 'rgba(255,255,255,0.7)' }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="sales" 
                        stroke="#a855f7" 
                        strokeWidth={3} 
                        fillOpacity={1} 
                        fill="url(#colorRevenue)"
                        dot={{ fill: '#a855f7', strokeWidth: 0, r: 4 }}
                        activeDot={{ r: 6, fill: '#a855f7', stroke: '#fff', strokeWidth: 2 }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="visitors" 
                        stroke="#06b6d4" 
                        strokeWidth={2} 
                        fillOpacity={1} 
                        fill="url(#colorVisitors)"
                        dot={false}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </HolographicCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-6"
          >
            <HolographicCard glowColor="pink">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-pink-500/20">
                    <Layers className="w-5 h-5 text-pink-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Sales by Category</h3>
                    <p className="text-sm text-white/60">Product distribution</p>
                  </div>
                </div>
                
                <div className="h-[180px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(10, 10, 15, 0.95)', 
                          border: '1px solid rgba(255,255,255,0.1)', 
                          borderRadius: '8px' 
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {categoryData.map((cat, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div 
                        className="w-2 h-2 rounded-full" 
                        style={{ backgroundColor: cat.color }}
                      />
                      <span className="text-xs text-white/60">{cat.name}</span>
                      <span className="text-xs text-white font-medium ml-auto">{cat.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </HolographicCard>

            <HolographicCard glowColor="cyan">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-cyan-500/20">
                      <Cpu className="w-5 h-5 text-cyan-400" />
                    </div>
                    <span className="font-semibold text-white">System Status</span>
                  </div>
                  <span className="text-xs text-green-400">All Systems Go</span>
                </div>
                
                <div className="space-y-3">
                  {[
                    { label: "API Response", value: "23ms", percent: 95 },
                    { label: "Database Load", value: "42%", percent: 42 },
                    { label: "CDN Coverage", value: "99.9%", percent: 99 },
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-white/60">{item.label}</span>
                        <span className="text-white font-medium">{item.value}</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${item.percent}%` }}
                          transition={{ delay: 0.8 + i * 0.1, duration: 0.8 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </HolographicCard>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <HolographicCard glowColor="green">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-500/20">
                      <ShoppingCart className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Recent Orders</h3>
                      <p className="text-sm text-white/60">Latest transactions</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300">
                    View All
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {recentOrders.map((order, i) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + i * 0.1 }}
                      className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-colors"
                      data-testid={`order-${order.id}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                          <Package className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <p className="font-medium text-white">{order.customer}</p>
                          <p className="text-sm text-white/60">{order.product}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-white">{order.amount}</p>
                        <StatusBadge status={order.status} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </HolographicCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <HolographicCard glowColor="orange">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-orange-500/20">
                      <Star className="w-5 h-5 text-orange-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Top Products</h3>
                      <p className="text-sm text-white/60">Best performers this week</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300">
                    Analytics
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {topProducts.map((product, i) => (
                    <motion.div
                      key={product.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500/20 to-yellow-500/20 flex items-center justify-center text-sm font-bold text-orange-400">
                          {i + 1}
                        </div>
                        <div>
                          <p className="font-medium text-white">{product.name}</p>
                          <p className="text-sm text-white/60">{product.sales.toLocaleString()} units</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-white">{product.revenue}</p>
                        <p className="text-sm text-green-400">{product.trend}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </HolographicCard>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <HolographicCard glowColor="purple">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-yellow-500/20">
                    <AlertCircle className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">AI Insights & Alerts</h3>
                    <p className="text-sm text-white/60">Smart recommendations from your AI assistant</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="border-white/10 bg-white/5">
                  <Settings className="w-4 h-4 mr-2" />
                  Configure
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { 
                    title: "Inventory Alert", 
                    message: "iPhone 15 Pro Max stock running low. Consider restocking within 3 days.",
                    type: "warning",
                    action: "Reorder Now"
                  },
                  { 
                    title: "Traffic Anomaly", 
                    message: "300% traffic spike detected from Southeast Asia region.",
                    type: "info",
                    action: "View Details"
                  },
                  { 
                    title: "Revenue Opportunity", 
                    message: "Bundle deals could increase AOV by 15% based on purchase patterns.",
                    type: "success",
                    action: "Create Bundle"
                  },
                ].map((alert, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + i * 0.1 }}
                    className={`p-4 rounded-xl border ${
                      alert.type === 'warning' 
                        ? 'bg-yellow-500/10 border-yellow-500/20' 
                        : alert.type === 'info' 
                        ? 'bg-blue-500/10 border-blue-500/20'
                        : 'bg-green-500/10 border-green-500/20'
                    }`}
                    data-testid={`alert-${i}`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`w-2 h-2 rounded-full mt-1.5 ${
                        alert.type === 'warning' ? 'bg-yellow-500' : alert.type === 'info' ? 'bg-blue-500' : 'bg-green-500'
                      }`} />
                      <div>
                        <h4 className="font-medium text-white text-sm">{alert.title}</h4>
                        <p className="text-sm text-white/60 mt-1">{alert.message}</p>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className={`w-full mt-2 ${
                        alert.type === 'warning' 
                          ? 'text-yellow-400 hover:bg-yellow-500/10' 
                          : alert.type === 'info' 
                          ? 'text-blue-400 hover:bg-blue-500/10'
                          : 'text-green-400 hover:bg-green-500/10'
                      }`}
                    >
                      {alert.action}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          </HolographicCard>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
