import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, TrendingUp, Package, DollarSign, 
  Clock, CheckCircle2, AlertTriangle, Calendar,
  ArrowUpRight, ArrowDownRight, BarChart3, Target, Loader2
} from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from "recharts";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

interface ManagerDashboardData {
  todaySales: number;
  teamMembersActive: string;
  ordersProcessed: number;
  avgProcessingTime: string;
  salesData: { name: string; sales: number; target: number }[];
  teamPerformance: { name: string; sales: number; efficiency: number }[];
  pendingApprovals: { id: number; type: string; employee?: string; description?: string; customer?: string; date?: string; amount?: string; hours?: string; status: string }[];
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

export default function ManagerDashboard() {
  const { data, isLoading, error } = useQuery<ManagerDashboardData>({
    queryKey: ["/api/manager/dashboard"],
    queryFn: async () => {
      const res = await fetch("/api/manager/dashboard", { credentials: "include" });
      if (!res.ok) {
        if (res.status === 401) throw new Error("Please log in to access this dashboard");
        if (res.status === 403) throw new Error("You don't have permission to access this dashboard");
        throw new Error("Failed to load dashboard");
      }
      return res.json();
    },
  });

  const salesData = data?.salesData || [];
  const teamPerformance = data?.teamPerformance || [];
  const pendingApprovals = data?.pendingApprovals || [];

  if (isLoading) {
    return (
      <DashboardLayout role="manager">
        <div className="flex items-center justify-center h-96">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout role="manager">
        <div className="flex flex-col items-center justify-center h-96 gap-4">
          <AlertTriangle className="w-12 h-12 text-red-400" />
          <p className="text-white/60">{error.message}</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="manager">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-heading font-bold text-white">Manager Dashboard</h1>
            <p className="text-white/60">Store performance overview and team management</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-white/10 bg-white/5">
              <Calendar className="w-4 h-4 mr-2" />
              Today's Schedule
            </Button>
            <Button className="bg-gradient-to-r from-blue-500 to-cyan-500">
              <BarChart3 className="w-4 h-4 mr-2" />
              View Reports
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Today's Sales" value={`৳${(data?.todaySales || 0).toLocaleString()}`} change="+12.5%" icon={DollarSign} color="blue" delay={0} />
          <StatCard title="Team Members Active" value={data?.teamMembersActive || "0/0"} change="+2" icon={Users} color="green" delay={0.1} />
          <StatCard title="Orders Processed" value={String(data?.ordersProcessed || 0)} change="+18%" icon={Package} color="orange" delay={0.2} />
          <StatCard title="Avg. Processing Time" value={data?.avgProcessingTime || "0 min"} change="-8%" icon={Clock} color="purple" delay={0.3} />
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
                      <CardTitle className="text-white">Sales vs Target</CardTitle>
                      <p className="text-sm text-white/60">Weekly performance comparison</p>
                    </div>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400">On Track</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={salesData}>
                      <defs>
                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={12} />
                      <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickFormatter={(v) => `৳${v/1000}k`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'rgba(10,10,15,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                        itemStyle={{ color: '#fff' }}
                      />
                      <Area type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} fill="url(#colorSales)" />
                      <Area type="monotone" dataKey="target" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" fill="transparent" />
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
                  <div className="p-2 rounded-lg bg-orange-500/20">
                    <AlertTriangle className="w-5 h-5 text-orange-400" />
                  </div>
                  <CardTitle className="text-white">Pending Approvals</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {pendingApprovals.map((item) => (
                  <div key={item.id} className="p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-white">{item.type}</span>
                      <Badge variant="outline" className="text-yellow-400 border-yellow-400/20 bg-yellow-400/10">
                        Pending
                      </Badge>
                    </div>
                    <p className="text-xs text-white/60">
                      {item.employee || item.description || item.customer}
                    </p>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" className="flex-1 h-7 bg-green-500/20 text-green-400 hover:bg-green-500/30">
                        <CheckCircle2 className="w-3 h-3 mr-1" /> Approve
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 h-7 border-white/10 text-white/60">
                        Review
                      </Button>
                    </div>
                  </div>
                ))}
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
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/20">
                    <Target className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <CardTitle className="text-white">Team Performance</CardTitle>
                    <p className="text-sm text-white/60">Individual sales and efficiency metrics</p>
                  </div>
                </div>
                <Button variant="outline" className="border-white/10 bg-white/5">
                  View All Team
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {teamPerformance.map((member, i) => (
                  <div key={member.name} className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                        {member.name[0]}
                      </div>
                      <div>
                        <p className="font-medium text-white">{member.name}</p>
                        <p className="text-xs text-white/60">Sales Associate</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">Sales Today</span>
                        <span className="text-white font-medium">{member.sales} orders</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">Efficiency</span>
                        <span className={`font-medium ${member.efficiency >= 90 ? 'text-green-400' : 'text-yellow-400'}`}>
                          {member.efficiency}%
                        </span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all"
                          style={{ width: `${member.efficiency}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
