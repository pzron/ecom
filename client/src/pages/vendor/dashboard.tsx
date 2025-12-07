import React from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Package, Upload, BarChart, MessageSquare, 
  Truck, AlertTriangle, CheckCircle, DollarSign,
  TrendingUp, Eye, Star, ShoppingCart, ArrowUpRight,
  ArrowDownRight, Box, Zap, RefreshCw, Settings, Plus
} from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Bar, BarChart as RechartsBarChart, Cell } from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const salesData = [
  { name: 'Mon', sales: 2400, orders: 34 },
  { name: 'Tue', sales: 1398, orders: 28 },
  { name: 'Wed', sales: 3800, orders: 52 },
  { name: 'Thu', sales: 2908, orders: 41 },
  { name: 'Fri', sales: 4800, orders: 63 },
  { name: 'Sat', sales: 3800, orders: 48 },
  { name: 'Sun', sales: 4300, orders: 55 },
];

const productPerformance = [
  { name: 'iPhone 15', sales: 4500, color: '#a855f7' },
  { name: 'MacBook', sales: 3200, color: '#ec4899' },
  { name: 'AirPods', sales: 2800, color: '#06b6d4' },
  { name: 'Watch', sales: 1900, color: '#f59e0b' },
  { name: 'iPad', sales: 1500, color: '#10b981' },
];

const recentOrders = [
  { id: "#ORD-9382", item: "iPhone 15 Pro Max", customer: "Alex Morgan", status: "Processing", amount: "৳1,299", time: "2 mins ago", image: "📱" },
  { id: "#ORD-9381", item: "Sony WH-1000XM5", customer: "Sarah Chen", status: "Shipped", amount: "৳348", time: "1 hour ago", image: "🎧" },
  { id: "#ORD-9380", item: "MacBook Pro 16", customer: "Mike Johnson", status: "Delivered", amount: "৳2,499", time: "3 hours ago", image: "💻" },
  { id: "#ORD-9379", item: "Apple Watch Ultra", customer: "Emily Davis", status: "Processing", amount: "৳799", time: "5 hours ago", image: "⌚" },
];

const topProducts = [
  { name: "iPhone 15 Pro Max", stock: 24, status: "healthy", sales: 156, revenue: "৳202K" },
  { name: "MacBook Pro 16\"", stock: 8, status: "low", sales: 42, revenue: "৳104K" },
  { name: "AirPods Pro 2", stock: 156, status: "healthy", sales: 234, revenue: "৳58K" },
  { name: "Sony WH-1000XM5", stock: 3, status: "critical", sales: 89, revenue: "৳31K" },
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

function VendorKPI({ 
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
  color: "purple" | "pink" | "cyan" | "green" | "orange";
  delay?: number;
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

function StockBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    healthy: "bg-green-500/10 text-green-400 border-green-500/20",
    low: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    critical: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  return (
    <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${styles[status]}`}>
      {status === 'healthy' ? 'In Stock' : status === 'low' ? 'Low Stock' : 'Critical'}
    </span>
  );
}

function OrderStatus({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Processing: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    Shipped: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    Delivered: "bg-green-500/10 text-green-400 border-green-500/20",
  };

  return (
    <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${styles[status]}`}>
      {status}
    </span>
  );
}

export default function VendorDashboard() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

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
                Vendor Portal
              </h1>
              <Badge variant="outline" className="border-green-500/30 text-green-400 bg-green-500/10">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse" />
                Active
              </Badge>
            </div>
            <p className="text-white/60">Manage your products, orders, and inventory in real-time</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="icon"
              className="border-white/10 bg-white/5 hover:bg-white/10"
              onClick={handleRefresh}
              data-testid="refresh-vendor"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </Button>
            
            <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <VendorKPI 
            title="Total Revenue" 
            value="৳48,320" 
            change="+15.3%" 
            icon={DollarSign} 
            color="purple"
            delay={0}
          />
          <VendorKPI 
            title="Total Orders" 
            value="342" 
            change="+8.2%" 
            icon={ShoppingCart} 
            color="cyan"
            delay={0.1}
          />
          <VendorKPI 
            title="Products Views" 
            value="12.4K" 
            change="+23.1%" 
            icon={Eye} 
            color="pink"
            delay={0.2}
          />
          <VendorKPI 
            title="Avg Rating" 
            value="4.8" 
            change="+0.3" 
            icon={Star} 
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
                      <BarChart className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Sales Overview</h3>
                      <p className="text-sm text-white/60">Weekly revenue performance</p>
                    </div>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-purple-500" />
                      <span className="text-white/60">Revenue</span>
                    </div>
                  </div>
                </div>
                
                <div className="h-[260px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={salesData}>
                      <defs>
                        <linearGradient id="vendorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
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
                        tickFormatter={(value) => `৳${(value / 1000).toFixed(0)}k`}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(10, 10, 15, 0.95)', 
                          border: '1px solid rgba(255,255,255,0.1)', 
                          borderRadius: '12px',
                          boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
                        }}
                        itemStyle={{ color: '#fff' }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="sales" 
                        stroke="#a855f7" 
                        strokeWidth={3} 
                        fillOpacity={1} 
                        fill="url(#vendorRevenue)"
                        dot={{ fill: '#a855f7', strokeWidth: 0, r: 4 }}
                        activeDot={{ r: 6, fill: '#a855f7', stroke: '#fff', strokeWidth: 2 }}
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
          >
            <HolographicCard glowColor="pink">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-pink-500/20">
                    <Package className="w-5 h-5 text-pink-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Top Products</h3>
                    <p className="text-sm text-white/60">By revenue</p>
                  </div>
                </div>
                
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={productPerformance} layout="vertical">
                      <XAxis type="number" hide />
                      <YAxis 
                        type="category" 
                        dataKey="name" 
                        stroke="rgba(255,255,255,0.3)" 
                        fontSize={11}
                        tickLine={false}
                        axisLine={false}
                        width={70}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(10, 10, 15, 0.95)', 
                          border: '1px solid rgba(255,255,255,0.1)', 
                          borderRadius: '8px' 
                        }}
                        formatter={(value) => [`৳${value}`, 'Sales']}
                      />
                      <Bar dataKey="sales" radius={[0, 4, 4, 0]}>
                        {productPerformance.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </RechartsBarChart>
                  </ResponsiveContainer>
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
                      <ShoppingCart className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Recent Orders</h3>
                      <p className="text-sm text-white/60">Latest customer purchases</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300">
                    View All
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {recentOrders.map((order, i) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + i * 0.1 }}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-colors"
                      data-testid={`vendor-order-${order.id}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center text-xl">
                          {order.image}
                        </div>
                        <div>
                          <p className="font-medium text-white text-sm">{order.item}</p>
                          <p className="text-xs text-white/60">{order.customer} • {order.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-white text-sm">{order.amount}</p>
                        <OrderStatus status={order.status} />
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
                      <Box className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Inventory Status</h3>
                      <p className="text-sm text-white/60">Stock levels overview</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300">
                    Manage
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {topProducts.map((product, i) => (
                    <motion.div
                      key={product.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          product.status === 'healthy' ? 'bg-green-500' : 
                          product.status === 'low' ? 'bg-yellow-500' : 'bg-red-500'
                        }`} />
                        <div>
                          <p className="font-medium text-white text-sm">{product.name}</p>
                          <p className="text-xs text-white/60">{product.stock} units • {product.sales} sold</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-white text-sm">{product.revenue}</p>
                        <StockBadge status={product.status} />
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
          <HolographicCard glowColor="orange">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-orange-500/20">
                    <Zap className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
                    <p className="text-sm text-white/60">Common vendor tasks</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: Upload, label: "Upload Product", color: "purple" },
                  { icon: Package, label: "Manage Inventory", color: "cyan" },
                  { icon: Truck, label: "Ship Orders", color: "green" },
                  { icon: MessageSquare, label: "Customer Messages", color: "pink" },
                ].map((action, i) => (
                  <motion.button
                    key={action.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 + i * 0.1 }}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group"
                    data-testid={`action-${action.label.toLowerCase().replace(' ', '-')}`}
                  >
                    <action.icon className={`w-6 h-6 mb-2 mx-auto text-${action.color}-400 group-hover:scale-110 transition-transform`} />
                    <span className="text-sm text-white/80 group-hover:text-white">{action.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </HolographicCard>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
