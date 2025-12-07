import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, TrendingUp, Users, Eye, MousePointer,
  Target, DollarSign, Download, Calendar,
  ArrowUpRight, ArrowDownRight
} from "lucide-react";
import { Area, AreaChart, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import { motion } from "framer-motion";

const conversionFunnel = [
  { stage: 'Visitors', count: 30400, percentage: 100 },
  { stage: 'Product Views', count: 18240, percentage: 60 },
  { stage: 'Add to Cart', count: 7296, percentage: 24 },
  { stage: 'Checkout', count: 4378, percentage: 14.4 },
  { stage: 'Purchase', count: 3065, percentage: 10.1 },
];

const monthlyPerformance = [
  { month: 'Jul', revenue: 2400000, spend: 180000, roi: 13.3 },
  { month: 'Aug', revenue: 2800000, spend: 210000, roi: 13.3 },
  { month: 'Sep', revenue: 3200000, spend: 240000, roi: 13.3 },
  { month: 'Oct', revenue: 3800000, spend: 280000, roi: 13.6 },
  { month: 'Nov', revenue: 5200000, spend: 380000, roi: 13.7 },
  { month: 'Dec', revenue: 4800000, spend: 320000, roi: 15.0 },
];

const channelPerformance = [
  { name: 'Email', conversions: 1850, revenue: 2850000, cost: 45000, cpa: 24.32, roas: 63.3 },
  { name: 'Social', conversions: 1420, revenue: 2180000, cost: 125000, cpa: 88.03, roas: 17.4 },
  { name: 'Search', conversions: 980, revenue: 1520000, cost: 85000, cpa: 86.73, roas: 17.9 },
  { name: 'Display', conversions: 450, revenue: 680000, cost: 45000, cpa: 100.00, roas: 15.1 },
  { name: 'Affiliate', conversions: 365, revenue: 570000, cost: 28000, cpa: 76.71, roas: 20.4 },
];

const deviceDistribution = [
  { name: 'Mobile', value: 58, color: '#3b82f6' },
  { name: 'Desktop', value: 32, color: '#10b981' },
  { name: 'Tablet', value: 10, color: '#f59e0b' },
];

const topProducts = [
  { name: "iPhone 15 Pro Max", views: 12500, conversions: 420, revenue: "৳4.2M" },
  { name: "Samsung Galaxy S24 Ultra", views: 9800, conversions: 380, revenue: "৳3.4M" },
  { name: "MacBook Pro 14\"", views: 7500, conversions: 145, revenue: "৳2.9M" },
  { name: "Sony WH-1000XM5", views: 6200, conversions: 520, revenue: "৳1.3M" },
  { name: "iPad Pro 12.9\"", views: 5800, conversions: 210, revenue: "৳2.1M" },
];

function StatCard({ title, value, change, icon: Icon, color, delay = 0 }: {
  title: string;
  value: string;
  change: string;
  icon: any;
  color: string;
  delay?: number;
}) {
  const isPositive = change.startsWith('+');
  const colorClasses: Record<string, string> = {
    blue: "text-blue-400 bg-blue-500/20",
    green: "text-green-400 bg-green-500/20",
    orange: "text-orange-400 bg-orange-500/20",
    purple: "text-purple-400 bg-purple-500/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Card className="bg-white/5 border-white/10 hover:bg-white/[0.08] transition-colors">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-xl ${colorClasses[color]}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              {change}
            </div>
          </div>
          <h3 className="text-sm font-medium text-white/60 mb-1">{title}</h3>
          <span className="text-2xl font-bold text-white">{value}</span>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function MarketingAnalytics() {
  return (
    <DashboardLayout role="marketing">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-heading font-bold text-white">Marketing Analytics</h1>
            <p className="text-white/60">Performance metrics and insights</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-white/10 bg-white/5">
              <Calendar className="w-4 h-4 mr-2" />
              Last 30 Days
            </Button>
            <Button variant="outline" className="border-white/10 bg-white/5">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Revenue" value="৳22.2M" change="+28.5%" icon={DollarSign} color="blue" delay={0} />
          <StatCard title="Marketing Spend" value="৳1.61M" change="+18.2%" icon={TrendingUp} color="green" delay={0.1} />
          <StatCard title="Avg. ROAS" value="13.8x" change="+2.4x" icon={Target} color="orange" delay={0.2} />
          <StatCard title="Conversion Rate" value="10.1%" change="+1.8%" icon={MousePointer} color="purple" delay={0.3} />
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/20">
                      <TrendingUp className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <CardTitle className="text-white">Revenue vs Spend</CardTitle>
                      <p className="text-sm text-white/60">Monthly performance comparison</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyPerformance}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={12} />
                      <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickFormatter={(v) => `৳${v/1000000}M`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'rgba(10,10,15,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                        itemStyle={{ color: '#fff' }}
                        formatter={(value: number, name: string) => [
                          `৳${(value/1000000).toFixed(2)}M`,
                          name.charAt(0).toUpperCase() + name.slice(1)
                        ]}
                      />
                      <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="spend" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
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
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/20">
                    <Users className="w-5 h-5 text-purple-400" />
                  </div>
                  <CardTitle className="text-white">Device Distribution</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[180px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={deviceDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={70}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {deviceDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'rgba(10,10,15,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                        itemStyle={{ color: '#fff' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2 mt-4">
                  {deviceDistribution.map((device) => (
                    <div key={device.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: device.color }} />
                        <span className="text-white/60">{device.name}</span>
                      </div>
                      <span className="text-white font-medium">{device.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/20">
                  <Target className="w-5 h-5 text-green-400" />
                </div>
                <CardTitle className="text-white">Conversion Funnel</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {conversionFunnel.map((stage, index) => (
                  <div key={stage.stage} className="relative">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-white">{stage.stage}</span>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-white font-medium">{stage.count.toLocaleString()}</span>
                        <span className="text-white/40">{stage.percentage}%</span>
                      </div>
                    </div>
                    <div className="h-8 bg-white/5 rounded-lg overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg transition-all flex items-center justify-end pr-3"
                        style={{ width: `${stage.percentage}%` }}
                      >
                        {stage.percentage > 20 && (
                          <span className="text-xs text-white font-medium">{stage.percentage}%</span>
                        )}
                      </div>
                    </div>
                    {index < conversionFunnel.length - 1 && (
                      <div className="absolute left-1/2 -bottom-1 transform -translate-x-1/2 text-xs text-white/40">
                        ↓ {((conversionFunnel[index + 1].count / stage.count) * 100).toFixed(1)}%
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-orange-500/20">
                    <BarChart3 className="w-5 h-5 text-orange-400" />
                  </div>
                  <CardTitle className="text-white">Channel Performance</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-2 text-xs font-medium text-white/60">Channel</th>
                        <th className="text-right py-2 text-xs font-medium text-white/60">Conversions</th>
                        <th className="text-right py-2 text-xs font-medium text-white/60">CPA</th>
                        <th className="text-right py-2 text-xs font-medium text-white/60">ROAS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {channelPerformance.map((channel) => (
                        <tr key={channel.name} className="border-b border-white/5">
                          <td className="py-3 text-sm text-white">{channel.name}</td>
                          <td className="py-3 text-sm text-white text-right">{channel.conversions.toLocaleString()}</td>
                          <td className="py-3 text-sm text-white text-right">৳{channel.cpa.toFixed(2)}</td>
                          <td className="py-3 text-sm text-right">
                            <Badge className={channel.roas > 20 ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}>
                              {channel.roas.toFixed(1)}x
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-pink-500/20">
                    <Eye className="w-5 h-5 text-pink-400" />
                  </div>
                  <CardTitle className="text-white">Top Performing Products</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topProducts.map((product, index) => (
                    <div key={index} className="p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-white">{product.name}</p>
                        <span className="text-sm font-medium text-green-400">{product.revenue}</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-white/60">
                        <span>{product.views.toLocaleString()} views</span>
                        <span>{product.conversions} conversions</span>
                        <span>{((product.conversions / product.views) * 100).toFixed(1)}% CVR</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
