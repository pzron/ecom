import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, Users, TrendingUp, Target,
  Phone, Mail, Calendar, CheckCircle2,
  ArrowUpRight, ArrowDownRight, Plus, BarChart3
} from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from "recharts";
import { motion } from "framer-motion";
import { Link } from "wouter";

const salesData = [
  { day: 'Mon', sales: 245000, deals: 12 },
  { day: 'Tue', sales: 189000, deals: 8 },
  { day: 'Wed', sales: 312000, deals: 15 },
  { day: 'Thu', sales: 278000, deals: 11 },
  { day: 'Fri', sales: 356000, deals: 18 },
  { day: 'Sat', sales: 198000, deals: 9 },
  { day: 'Sun', sales: 145000, deals: 6 },
];

const pipelineData = [
  { stage: 'Lead', value: 45, amount: '৳2.8M' },
  { stage: 'Qualified', value: 32, amount: '৳1.9M' },
  { stage: 'Proposal', value: 18, amount: '৳1.2M' },
  { stage: 'Negotiation', value: 12, amount: '৳850K' },
  { stage: 'Closed Won', value: 8, amount: '৳620K' },
];

const recentDeals = [
  { id: 1, customer: "TechCorp Ltd.", product: "Enterprise Package", value: "৳125,000", stage: "Closed Won", probability: "100%", closeDate: "Dec 5, 2024" },
  { id: 2, customer: "Digital Solutions", product: "Premium Bundle", value: "৳85,000", stage: "Negotiation", probability: "75%", closeDate: "Dec 12, 2024" },
  { id: 3, customer: "StartupXYZ", product: "Growth Pack", value: "৳45,000", stage: "Proposal", probability: "50%", closeDate: "Dec 15, 2024" },
  { id: 4, customer: "MegaRetail Inc.", product: "Bulk Order", value: "৳320,000", stage: "Qualified", probability: "30%", closeDate: "Dec 20, 2024" },
];

const topPerformers = [
  { name: "Ahmed Rahman", deals: 28, revenue: "৳1.2M", target: 95 },
  { name: "Fatima Khan", deals: 24, revenue: "৳980K", target: 88 },
  { name: "Rafiq Islam", deals: 21, revenue: "৳850K", target: 82 },
  { name: "Marium Begum", deals: 18, revenue: "৳720K", target: 75 },
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

export default function SalesDashboard() {
  return (
    <DashboardLayout role="sales">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-heading font-bold text-white">Sales Dashboard</h1>
            <p className="text-white/60">Track deals, leads, and sales performance</p>
          </div>
          <div className="flex gap-3">
            <Link href="/spoon/sales/pipeline">
              <Button variant="outline" className="border-white/10 bg-white/5">
                <BarChart3 className="w-4 h-4 mr-2" />
                Pipeline
              </Button>
            </Link>
            <Button className="bg-gradient-to-r from-green-500 to-cyan-500">
              <Plus className="w-4 h-4 mr-2" />
              New Deal
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Monthly Revenue" value="৳4.8M" change="+18.5%" icon={DollarSign} color="blue" delay={0} />
          <StatCard title="Active Deals" value="79" change="+12" icon={Target} color="green" delay={0.1} />
          <StatCard title="New Leads" value="156" change="+24.2%" icon={Users} color="orange" delay={0.2} />
          <StatCard title="Win Rate" value="68%" change="+5.2%" icon={TrendingUp} color="purple" delay={0.3} />
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
                      <CardTitle className="text-white">Weekly Sales</CardTitle>
                      <p className="text-sm text-white/60">Revenue and deals closed</p>
                    </div>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400">+18.5% this week</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={salesData}>
                      <defs>
                        <linearGradient id="colorSalesRev" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="day" stroke="rgba(255,255,255,0.3)" fontSize={12} />
                      <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickFormatter={(v) => `৳${v/1000}k`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'rgba(10,10,15,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                        itemStyle={{ color: '#fff' }}
                        formatter={(value: number) => [`৳${(value/1000).toFixed(0)}K`, 'Revenue']}
                      />
                      <Area type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} fill="url(#colorSalesRev)" />
                    </AreaChart>
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
                    <Target className="w-5 h-5 text-purple-400" />
                  </div>
                  <CardTitle className="text-white">Pipeline</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {pipelineData.map((stage, index) => (
                  <div key={stage.stage} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white">{stage.stage}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-white/60">{stage.value}</span>
                        <span className="text-white font-medium">{stage.amount}</span>
                      </div>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all"
                        style={{ width: `${(stage.value / 45) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-500/20">
                      <DollarSign className="w-5 h-5 text-green-400" />
                    </div>
                    <CardTitle className="text-white">Recent Deals</CardTitle>
                  </div>
                  <Link href="/spoon/sales/deals">
                    <Button variant="outline" size="sm" className="border-white/10 bg-white/5">
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentDeals.map((deal) => (
                  <div key={deal.id} className="p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="text-sm font-medium text-white">{deal.customer}</p>
                        <p className="text-xs text-white/60">{deal.product}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-green-400">{deal.value}</p>
                        <Badge className={deal.stage === 'Closed Won' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}>
                          {deal.stage}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-white/40">
                      <span>Close: {deal.closeDate}</span>
                      <span>Probability: {deal.probability}</span>
                    </div>
                  </div>
                ))}
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-orange-500/20">
                      <Users className="w-5 h-5 text-orange-400" />
                    </div>
                    <CardTitle className="text-white">Top Performers</CardTitle>
                  </div>
                  <Link href="/spoon/sales/reports">
                    <Button variant="outline" size="sm" className="border-white/10 bg-white/5">
                      Full Report
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {topPerformers.map((performer, index) => (
                  <div key={index} className="p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                        {performer.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">{performer.name}</p>
                        <div className="flex items-center gap-3 text-xs text-white/60">
                          <span>{performer.deals} deals</span>
                          <span>{performer.revenue}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-medium ${performer.target >= 90 ? 'text-green-400' : performer.target >= 75 ? 'text-yellow-400' : 'text-orange-400'}`}>
                          {performer.target}%
                        </p>
                        <p className="text-xs text-white/40">of target</p>
                      </div>
                    </div>
                    <div className="mt-2 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all ${performer.target >= 90 ? 'bg-green-500' : performer.target >= 75 ? 'bg-yellow-500' : 'bg-orange-500'}`}
                        style={{ width: `${performer.target}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
