import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, Users, TrendingUp, Target,
  Phone, Mail, Calendar, CheckCircle2,
  ArrowUpRight, ArrowDownRight, Plus, BarChart3, AlertTriangle, Loader2
} from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from "recharts";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";

interface SalesDashboardData {
  monthlyRevenue: string;
  activeDeals: number;
  newLeads: number;
  winRate: string;
  salesData: { day: string; sales: number; deals: number }[];
  pipelineData: { stage: string; value: number; amount: string }[];
  recentDeals: { id: number; customer: string; product: string; value: string; stage: string; probability: string; closeDate: string }[];
  topPerformers: { name: string; deals: number; revenue: string; target: number }[];
}

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
  const { data, isLoading, error } = useQuery<SalesDashboardData>({
    queryKey: ["/api/sales/dashboard"],
    queryFn: async () => {
      const res = await fetch("/api/sales/dashboard", { credentials: "include" });
      if (!res.ok) {
        if (res.status === 401) throw new Error("Please log in to access this dashboard");
        if (res.status === 403) throw new Error("You don't have permission to access this dashboard");
        throw new Error("Failed to load dashboard");
      }
      return res.json();
    },
  });

  const salesData = data?.salesData || [];
  const pipelineData = data?.pipelineData || [];
  const recentDeals = data?.recentDeals || [];
  const topPerformers = data?.topPerformers || [];

  if (isLoading) {
    return (
      <DashboardLayout role="sales">
        <div className="flex items-center justify-center h-96">
          <Loader2 className="w-8 h-8 animate-spin text-green-500" />
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout role="sales">
        <div className="flex flex-col items-center justify-center h-96 gap-4">
          <AlertTriangle className="w-12 h-12 text-red-400" />
          <p className="text-white/60">{error.message}</p>
        </div>
      </DashboardLayout>
    );
  }

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
          <StatCard title="Monthly Revenue" value={data?.monthlyRevenue || "৳0"} change="+18.5%" icon={DollarSign} color="blue" delay={0} />
          <StatCard title="Active Deals" value={String(data?.activeDeals || 0)} change="+12" icon={Target} color="green" delay={0.1} />
          <StatCard title="New Leads" value={String(data?.newLeads || 0)} change="+24.2%" icon={Users} color="orange" delay={0.2} />
          <StatCard title="Win Rate" value={data?.winRate || "0%"} change="+5.2%" icon={TrendingUp} color="purple" delay={0.3} />
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
