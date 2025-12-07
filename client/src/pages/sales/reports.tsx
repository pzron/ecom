import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, TrendingUp, DollarSign, Users,
  Target, Download, Calendar, ArrowUpRight, ArrowDownRight
} from "lucide-react";
import { Area, AreaChart, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import { motion } from "framer-motion";

const monthlyRevenue = [
  { month: 'Jul', revenue: 2450000, target: 2200000 },
  { month: 'Aug', revenue: 2890000, target: 2500000 },
  { month: 'Sep', revenue: 3250000, target: 2800000 },
  { month: 'Oct', revenue: 3680000, target: 3200000 },
  { month: 'Nov', revenue: 4520000, target: 3800000 },
  { month: 'Dec', revenue: 4850000, target: 4200000 },
];

const salesByCategory = [
  { name: 'Electronics', value: 45, color: '#3b82f6' },
  { name: 'Accessories', value: 25, color: '#10b981' },
  { name: 'Software', value: 15, color: '#f59e0b' },
  { name: 'Services', value: 10, color: '#8b5cf6' },
  { name: 'Other', value: 5, color: '#ec4899' },
];

const salesByRegion = [
  { region: 'Dhaka', sales: 8500000, growth: '+24%' },
  { region: 'Chittagong', sales: 3200000, growth: '+18%' },
  { region: 'Sylhet', sales: 1800000, growth: '+12%' },
  { region: 'Rajshahi', sales: 1200000, growth: '+8%' },
  { region: 'Khulna', sales: 950000, growth: '+15%' },
];

const teamPerformance = [
  { name: 'Ahmed Rahman', deals: 28, revenue: 1250000, quota: 1200000, achievement: 104 },
  { name: 'Fatima Khan', deals: 24, revenue: 980000, quota: 1000000, achievement: 98 },
  { name: 'Rafiq Islam', deals: 21, revenue: 850000, quota: 900000, achievement: 94 },
  { name: 'Marium Begum', deals: 18, revenue: 720000, quota: 800000, achievement: 90 },
  { name: 'Imran Hossain', deals: 15, revenue: 620000, quota: 700000, achievement: 89 },
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

export default function SalesReports() {
  return (
    <DashboardLayout role="sales">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-heading font-bold text-white">Sales Reports</h1>
            <p className="text-white/60">Performance analytics and insights</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-white/10 bg-white/5">
              <Calendar className="w-4 h-4 mr-2" />
              Q4 2024
            </Button>
            <Button variant="outline" className="border-white/10 bg-white/5">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Revenue" value="৳21.6M" change="+28.5%" icon={DollarSign} color="blue" delay={0} />
          <StatCard title="Total Deals" value="106" change="+15.2%" icon={Target} color="green" delay={0.1} />
          <StatCard title="New Customers" value="42" change="+22.4%" icon={Users} color="orange" delay={0.2} />
          <StatCard title="Avg. Deal Size" value="৳204K" change="+8.7%" icon={TrendingUp} color="purple" delay={0.3} />
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
                      <CardTitle className="text-white">Revenue vs Target</CardTitle>
                      <p className="text-sm text-white/60">Monthly comparison</p>
                    </div>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400">115% of target</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyRevenue}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={12} />
                      <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickFormatter={(v) => `৳${v/1000000}M`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'rgba(10,10,15,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                        itemStyle={{ color: '#fff' }}
                        formatter={(value: number, name: string) => [`৳${(value/1000000).toFixed(2)}M`, name === 'revenue' ? 'Revenue' : 'Target']}
                      />
                      <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="target" fill="#f59e0b" radius={[4, 4, 0, 0]} />
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
                    <BarChart3 className="w-5 h-5 text-purple-400" />
                  </div>
                  <CardTitle className="text-white">Sales by Category</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[180px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={salesByCategory}
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={70}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {salesByCategory.map((entry, index) => (
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
                  {salesByCategory.map((category) => (
                    <div key={category.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                        <span className="text-white/60">{category.name}</span>
                      </div>
                      <span className="text-white font-medium">{category.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                  <CardTitle className="text-white">Sales by Region</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {salesByRegion.map((region, index) => (
                    <div key={region.region} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white">{region.region}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-white font-medium">৳{(region.sales / 1000000).toFixed(1)}M</span>
                          <span className="text-green-400 text-xs">{region.growth}</span>
                        </div>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-green-500 to-cyan-500 rounded-full"
                          style={{ width: `${(region.sales / 8500000) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-orange-500/20">
                    <Users className="w-5 h-5 text-orange-400" />
                  </div>
                  <CardTitle className="text-white">Team Performance</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-2 text-xs font-medium text-white/60">Rep</th>
                        <th className="text-right py-2 text-xs font-medium text-white/60">Deals</th>
                        <th className="text-right py-2 text-xs font-medium text-white/60">Revenue</th>
                        <th className="text-right py-2 text-xs font-medium text-white/60">% Quota</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teamPerformance.map((rep) => (
                        <tr key={rep.name} className="border-b border-white/5">
                          <td className="py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
                                {rep.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <span className="text-sm text-white">{rep.name}</span>
                            </div>
                          </td>
                          <td className="py-3 text-sm text-white text-right">{rep.deals}</td>
                          <td className="py-3 text-sm text-white text-right">৳{(rep.revenue / 1000).toFixed(0)}K</td>
                          <td className="py-3 text-right">
                            <Badge className={rep.achievement >= 100 ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}>
                              {rep.achievement}%
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
        </div>
      </div>
    </DashboardLayout>
  );
}
