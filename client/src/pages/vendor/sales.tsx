import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell
} from "recharts";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  DollarSign, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight,
  Wallet, CreditCard, Clock, CheckCircle, Calendar, Download,
  Filter, RefreshCw, Banknote, Building2, Bitcoin, Eye, ChevronRight
} from "lucide-react";

const salesData = [
  { name: 'Mon', sales: 12400, orders: 34 },
  { name: 'Tue', sales: 9800, orders: 28 },
  { name: 'Wed', sales: 16800, orders: 52 },
  { name: 'Thu', sales: 14080, orders: 41 },
  { name: 'Fri', sales: 24800, orders: 63 },
  { name: 'Sat', sales: 18800, orders: 48 },
  { name: 'Sun', sales: 21300, orders: 55 },
];

const monthlyData = [
  { month: 'Jan', earnings: 45000, payouts: 42000 },
  { month: 'Feb', earnings: 52000, payouts: 48000 },
  { month: 'Mar', earnings: 48000, payouts: 45000 },
  { month: 'Apr', earnings: 61000, payouts: 58000 },
  { month: 'May', earnings: 55000, payouts: 52000 },
  { month: 'Jun', earnings: 67000, payouts: 64000 },
];

const categoryBreakdown = [
  { name: 'Electronics', value: 45, color: '#a855f7' },
  { name: 'Audio', value: 25, color: '#ec4899' },
  { name: 'Wearables', value: 20, color: '#06b6d4' },
  { name: 'Accessories', value: 10, color: '#f59e0b' },
];

const recentOrders = [
  { id: "#ORD-9382", product: "iPhone 15 Pro Max", customer: "Alex Morgan", amount: "৳149,990", commission: "৳14,999", status: "completed", time: "2 mins ago" },
  { id: "#ORD-9381", product: "Sony WH-1000XM5", customer: "Sarah Chen", amount: "৳42,990", commission: "৳4,299", status: "processing", time: "1 hour ago" },
  { id: "#ORD-9380", product: "MacBook Pro 16\"", customer: "Mike Johnson", amount: "৳289,990", commission: "৳28,999", status: "completed", time: "3 hours ago" },
  { id: "#ORD-9379", product: "Apple Watch Ultra", customer: "Emily Davis", amount: "৳119,990", commission: "৳11,999", status: "shipped", time: "5 hours ago" },
  { id: "#ORD-9378", product: "AirPods Pro 2", customer: "David Kim", amount: "৳32,990", commission: "৳3,299", status: "completed", time: "8 hours ago" },
];

const payoutHistory = [
  { id: "PAY-001", date: "Nov 30, 2024", amount: "৳245,000", method: "Bank Transfer", status: "completed" },
  { id: "PAY-002", date: "Nov 15, 2024", amount: "৳198,500", method: "Bank Transfer", status: "completed" },
  { id: "PAY-003", date: "Oct 31, 2024", amount: "৳312,000", method: "Crypto (USDT)", status: "completed" },
  { id: "PAY-004", date: "Oct 15, 2024", amount: "৳178,900", method: "Bank Transfer", status: "completed" },
];

function HolographicCard({ 
  children, 
  className = "",
  glowColor = "purple"
}: { 
  children: React.ReactNode; 
  className?: string;
  glowColor?: "purple" | "pink" | "cyan" | "green" | "orange" | "yellow";
}) {
  const glowColors = {
    purple: "from-purple-500/20 via-purple-500/5 to-transparent shadow-purple-500/10",
    pink: "from-pink-500/20 via-pink-500/5 to-transparent shadow-pink-500/10",
    cyan: "from-cyan-500/20 via-cyan-500/5 to-transparent shadow-cyan-500/10",
    green: "from-green-500/20 via-green-500/5 to-transparent shadow-green-500/10",
    orange: "from-orange-500/20 via-orange-500/5 to-transparent shadow-orange-500/10",
    yellow: "from-yellow-500/20 via-yellow-500/5 to-transparent shadow-yellow-500/10",
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

function SalesKPI({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  color,
  delay = 0
}: { 
  title: string;
  value: string;
  change: string;
  icon: any;
  color: "purple" | "pink" | "cyan" | "green" | "orange" | "yellow";
  delay?: number;
}) {
  const colorClasses = {
    purple: "text-purple-400 bg-purple-500/20",
    pink: "text-pink-400 bg-pink-500/20",
    cyan: "text-cyan-400 bg-cyan-500/20",
    green: "text-green-400 bg-green-500/20",
    orange: "text-orange-400 bg-orange-500/20",
    yellow: "text-yellow-400 bg-yellow-500/20",
  };

  const isPositive = change.startsWith('+');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
    >
      <HolographicCard glowColor={color}>
        <div className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2.5 rounded-xl ${colorClasses[color]}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div className={`flex items-center gap-1 text-xs font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              {change}
            </div>
          </div>
          <h3 className="text-xs font-medium text-white/60 mb-1">{title}</h3>
          <span className="text-2xl font-bold text-white">{value}</span>
        </div>
      </HolographicCard>
    </motion.div>
  );
}

function OrderStatus({ status }: { status: string }) {
  const styles: Record<string, string> = {
    processing: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    shipped: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    completed: "bg-green-500/10 text-green-400 border-green-500/20",
  };

  return (
    <Badge className={`${styles[status]} border`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}

export default function VendorSales() {
  const [dateRange, setDateRange] = useState("7d");

  return (
    <DashboardLayout role="vendor">
      <div className="space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-heading font-bold bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                Sales & Payouts
              </h1>
              <Badge variant="outline" className="border-green-500/30 text-green-400 bg-green-500/10">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse" />
                Live
              </Badge>
            </div>
            <p className="text-white/60">Track your revenue, orders, and withdrawal history</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center border border-white/10 rounded-lg overflow-hidden text-sm">
              {['24h', '7d', '30d', '90d'].map((range) => (
                <button
                  key={range}
                  onClick={() => setDateRange(range)}
                  className={`px-3 py-2 ${dateRange === range ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5'}`}
                >
                  {range}
                </button>
              ))}
            </div>
            <Button variant="outline" size="icon" className="border-white/10 bg-white/5 hover:bg-white/10">
              <RefreshCw className="w-4 h-4" />
            </Button>
            <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
              <Wallet className="w-4 h-4 mr-2" />
              Withdraw
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <SalesKPI 
            title="Total Earnings" 
            value="৳1.42M" 
            change="+18.3%" 
            icon={DollarSign} 
            color="green"
            delay={0}
          />
          <SalesKPI 
            title="Pending Payout" 
            value="৳245K" 
            change="+12.5%" 
            icon={Clock} 
            color="yellow"
            delay={0.1}
          />
          <SalesKPI 
            title="This Week" 
            value="৳118K" 
            change="+24.1%" 
            icon={TrendingUp} 
            color="cyan"
            delay={0.2}
          />
          <SalesKPI 
            title="Total Orders" 
            value="1,248" 
            change="+15.8%" 
            icon={CheckCircle} 
            color="purple"
            delay={0.3}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-2xl bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-cyan-500/10 border border-green-500/20"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-xl bg-green-500/20">
                <Banknote className="w-8 h-8 text-green-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Next Payout</h2>
                <p className="text-white/60">Scheduled for December 15, 2024</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div>
                <div className="text-3xl font-bold text-white">৳245,000</div>
                <div className="text-sm text-white/60">Estimated amount</div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10">
                  <Building2 className="w-4 h-4 mr-2" />
                  Bank
                </Button>
                <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10">
                  <Bitcoin className="w-4 h-4 mr-2" />
                  Crypto
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

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
                      <TrendingUp className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Sales Overview</h3>
                      <p className="text-sm text-white/60">Weekly revenue performance</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
                
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={salesData}>
                      <defs>
                        <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `৳${(v/1000).toFixed(0)}k`} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(10, 10, 15, 0.95)', 
                          border: '1px solid rgba(255,255,255,0.1)', 
                          borderRadius: '12px' 
                        }}
                        formatter={(value: number) => [`৳${value.toLocaleString()}`, 'Sales']}
                      />
                      <Area type="monotone" dataKey="sales" stroke="#a855f7" strokeWidth={3} fill="url(#salesGradient)" />
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
          >
            <HolographicCard glowColor="pink">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-pink-500/20">
                    <BarChart className="w-5 h-5 text-pink-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">By Category</h3>
                    <p className="text-sm text-white/60">Sales breakdown</p>
                  </div>
                </div>
                
                <div className="h-[180px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryBreakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {categoryBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(10, 10, 15, 0.95)', 
                          border: '1px solid rgba(255,255,255,0.1)', 
                          borderRadius: '8px' 
                        }}
                        formatter={(value: number) => [`${value}%`, 'Share']}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="space-y-2 mt-4">
                  {categoryBreakdown.map((cat) => (
                    <div key={cat.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                        <span className="text-sm text-white/80">{cat.name}</span>
                      </div>
                      <span className="text-sm font-medium text-white">{cat.value}%</span>
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
            <HolographicCard glowColor="cyan">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-cyan-500/20">
                      <CreditCard className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Recent Orders</h3>
                      <p className="text-sm text-white/60">Latest sales activity</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-cyan-300">
                    View All <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {recentOrders.slice(0, 4).map((order, i) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + i * 0.1 }}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs text-white/40">{order.id}</span>
                          <OrderStatus status={order.status} />
                        </div>
                        <p className="font-medium text-white text-sm truncate">{order.product}</p>
                        <p className="text-xs text-white/60">{order.customer} • {order.time}</p>
                      </div>
                      <div className="text-right ml-4">
                        <p className="font-semibold text-white">{order.amount}</p>
                        <p className="text-xs text-green-400">+{order.commission}</p>
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
            <HolographicCard glowColor="green">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-500/20">
                      <Wallet className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Payout History</h3>
                      <p className="text-sm text-white/60">Previous withdrawals</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-green-400 hover:text-green-300">
                    View All <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {payoutHistory.map((payout, i) => (
                    <motion.div
                      key={payout.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        </div>
                        <div>
                          <p className="font-medium text-white text-sm">{payout.amount}</p>
                          <p className="text-xs text-white/60">{payout.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-white/5 text-white/80 border-white/10">
                          {payout.method}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </HolographicCard>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
