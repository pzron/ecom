import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Boxes, Package, Truck, AlertTriangle,
  ArrowUpRight, ArrowDownRight, TrendingUp, Clock
} from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { motion } from "framer-motion";
import { Link } from "wouter";

const stockMovement = [
  { day: 'Mon', received: 120, dispatched: 85 },
  { day: 'Tue', received: 95, dispatched: 110 },
  { day: 'Wed', received: 150, dispatched: 125 },
  { day: 'Thu', received: 80, dispatched: 90 },
  { day: 'Fri', received: 200, dispatched: 175 },
  { day: 'Sat', received: 60, dispatched: 45 },
  { day: 'Sun', received: 30, dispatched: 25 },
];

const recentActivity = [
  { id: 1, type: "received", product: "iPhone 15 Pro (50 units)", from: "Apple Warehouse", time: "10 min ago" },
  { id: 2, type: "dispatched", product: "MacBook Air (15 units)", to: "Floor Display", time: "25 min ago" },
  { id: 3, type: "alert", product: "AirPods Pro 2", message: "Low stock warning", time: "1 hour ago" },
  { id: 4, type: "received", product: "Samsung TV (20 units)", from: "Samsung Distribution", time: "2 hours ago" },
];

const lowStockItems = [
  { name: "MacBook Air M3", current: 8, minimum: 15, urgency: "high" },
  { name: "Nike Air Max", current: 3, minimum: 10, urgency: "critical" },
  { name: "Smart Watch Pro", current: 0, minimum: 15, urgency: "out" },
  { name: "Coffee Maker", current: 5, minimum: 8, urgency: "medium" },
];

export default function StockkeeperDashboard() {
  return (
    <DashboardLayout role="stockkeeper">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-heading font-bold text-white">Stockkeeper Dashboard</h1>
            <p className="text-white/60">Warehouse and inventory management</p>
          </div>
          <div className="flex gap-3">
            <Link href="/spoon/stockkeeper/receiving">
              <Button variant="outline" className="border-white/10 bg-white/5">
                <Truck className="w-4 h-4 mr-2" />
                Receive Stock
              </Button>
            </Link>
            <Link href="/spoon/stockkeeper/inventory">
              <Button className="bg-gradient-to-r from-orange-500 to-yellow-500">
                <Boxes className="w-4 h-4 mr-2" />
                View Inventory
              </Button>
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}>
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-orange-500/20">
                    <Boxes className="w-5 h-5 text-orange-400" />
                  </div>
                  <Badge className="bg-green-500/20 text-green-400">
                    <ArrowUpRight className="w-3 h-3 mr-1" /> +5%
                  </Badge>
                </div>
                <h3 className="text-sm text-white/60 mb-1">Total SKUs</h3>
                <p className="text-3xl font-bold text-white">1,247</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-green-500/20">
                    <Truck className="w-5 h-5 text-green-400" />
                  </div>
                </div>
                <h3 className="text-sm text-white/60 mb-1">Received Today</h3>
                <p className="text-3xl font-bold text-white">735</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-blue-500/20">
                    <Package className="w-5 h-5 text-blue-400" />
                  </div>
                </div>
                <h3 className="text-sm text-white/60 mb-1">Dispatched Today</h3>
                <p className="text-3xl font-bold text-white">655</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="bg-gradient-to-br from-red-500/20 to-orange-500/20 border-red-500/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-red-500/30">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                  </div>
                </div>
                <h3 className="text-sm text-white/60 mb-1">Stock Alerts</h3>
                <p className="text-3xl font-bold text-white">4</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-orange-400" />
                  Stock Movement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={stockMovement}>
                      <defs>
                        <linearGradient id="colorReceived" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorDispatched" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f97316" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="day" stroke="rgba(255,255,255,0.3)" fontSize={12} />
                      <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'rgba(10,10,15,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                        itemStyle={{ color: '#fff' }}
                      />
                      <Area type="monotone" dataKey="received" stroke="#22c55e" strokeWidth={2} fill="url(#colorReceived)" />
                      <Area type="monotone" dataKey="dispatched" stroke="#f97316" strokeWidth={2} fill="url(#colorDispatched)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-sm text-white/60">Received</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-orange-500" />
                    <span className="text-sm text-white/60">Dispatched</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-white/5 border-white/10 h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    Low Stock Alerts
                  </CardTitle>
                  <Link href="/spoon/stockkeeper/alerts">
                    <Button variant="ghost" size="sm" className="text-orange-400 hover:text-orange-300">
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {lowStockItems.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="p-3 rounded-lg bg-white/5 border border-white/5"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-white">{item.name}</span>
                      <Badge className={
                        item.urgency === 'critical' ? 'bg-red-500/20 text-red-400' :
                        item.urgency === 'out' ? 'bg-red-600/30 text-red-300' :
                        item.urgency === 'high' ? 'bg-orange-500/20 text-orange-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }>
                        {item.urgency === 'out' ? 'Out of Stock' : item.urgency.charAt(0).toUpperCase() + item.urgency.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-xs text-white/60">
                      <span>Current: {item.current}</span>
                      <span>Minimum: {item.minimum}</span>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-400" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity, i) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/5"
                  >
                    <div className={`p-2 rounded-lg ${
                      activity.type === 'received' ? 'bg-green-500/20' :
                      activity.type === 'dispatched' ? 'bg-blue-500/20' :
                      'bg-red-500/20'
                    }`}>
                      {activity.type === 'received' ? <Truck className="w-5 h-5 text-green-400" /> :
                       activity.type === 'dispatched' ? <Package className="w-5 h-5 text-blue-400" /> :
                       <AlertTriangle className="w-5 h-5 text-red-400" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-white">{activity.product}</p>
                      <p className="text-sm text-white/60">
                        {activity.from ? `From: ${activity.from}` : 
                         activity.to ? `To: ${activity.to}` : 
                         activity.message}
                      </p>
                    </div>
                    <span className="text-sm text-white/40">{activity.time}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
