import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, UserPlus, Calendar, DollarSign, 
  Clock, FileText, Briefcase, TrendingUp,
  ArrowUpRight, ArrowDownRight, CheckCircle2, XCircle, AlertTriangle, Loader2
} from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from "recharts";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";

interface HRDashboardData {
  totalEmployees: number;
  openPositions: number;
  pendingLeave: number;
  monthlyPayroll: string;
  headcountData: { month: string; employees: number }[];
  departmentDistribution: { name: string; value: number; color: string }[];
  pendingRequests: { id: number; type: string; employee: string; department: string; days?: string; hours?: string; status: string }[];
  recentHires: { name: string; role: string; department: string; startDate: string }[];
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

export default function HRDashboard() {
  const { data, isLoading, error } = useQuery<HRDashboardData>({
    queryKey: ["/api/hr/dashboard"],
    queryFn: async () => {
      const res = await fetch("/api/hr/dashboard", { credentials: "include" });
      if (!res.ok) {
        if (res.status === 401) throw new Error("Please log in to access this dashboard");
        if (res.status === 403) throw new Error("You don't have permission to access this dashboard");
        throw new Error("Failed to load dashboard");
      }
      return res.json();
    },
  });

  const headcountData = data?.headcountData || [];
  const defaultColors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];
  const departmentDistribution = (data?.departmentDistribution || []).map((dept, i) => ({
    ...dept,
    color: dept.color || defaultColors[i % defaultColors.length]
  }));
  const pendingRequests = data?.pendingRequests || [];
  const recentHires = data?.recentHires || [];

  if (isLoading) {
    return (
      <DashboardLayout role="hr">
        <div className="flex items-center justify-center h-96">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout role="hr">
        <div className="flex flex-col items-center justify-center h-96 gap-4">
          <AlertTriangle className="w-12 h-12 text-red-400" />
          <p className="text-white/60">{error.message}</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="hr">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-heading font-bold text-white">HR Dashboard</h1>
            <p className="text-white/60">Employee management and workforce analytics</p>
          </div>
          <div className="flex gap-3">
            <Link href="/spoon/hr/recruitment">
              <Button variant="outline" className="border-white/10 bg-white/5">
                <UserPlus className="w-4 h-4 mr-2" />
                New Hire
              </Button>
            </Link>
            <Link href="/spoon/hr/payroll">
              <Button className="bg-gradient-to-r from-blue-500 to-cyan-500">
                <DollarSign className="w-4 h-4 mr-2" />
                Run Payroll
              </Button>
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Employees" value={String(data?.totalEmployees || 0)} change="+5.4%" icon={Users} color="blue" delay={0} />
          <StatCard title="Open Positions" value={String(data?.openPositions || 0)} change="+2" icon={Briefcase} color="green" delay={0.1} />
          <StatCard title="Pending Leave" value={String(data?.pendingLeave || 0)} change="-12%" icon={Calendar} color="orange" delay={0.2} />
          <StatCard title="Monthly Payroll" value={data?.monthlyPayroll || "৳0"} change="+8.2%" icon={DollarSign} color="purple" delay={0.3} />
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
                      <CardTitle className="text-white">Headcount Growth</CardTitle>
                      <p className="text-sm text-white/60">Monthly employee trend</p>
                    </div>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400">+38% YTD</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={headcountData}>
                      <defs>
                        <linearGradient id="colorEmployees" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={12} />
                      <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'rgba(10,10,15,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                        itemStyle={{ color: '#fff' }}
                      />
                      <Area type="monotone" dataKey="employees" stroke="#3b82f6" strokeWidth={2} fill="url(#colorEmployees)" />
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
                    <Users className="w-5 h-5 text-purple-400" />
                  </div>
                  <CardTitle className="text-white">By Department</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={departmentDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {departmentDistribution.map((entry, index) => (
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
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {departmentDistribution.map((dept) => (
                    <div key={dept.name} className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: dept.color }} />
                      <span className="text-white/60">{dept.name}</span>
                      <span className="text-white font-medium ml-auto">{dept.value}</span>
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-orange-500/20">
                      <Clock className="w-5 h-5 text-orange-400" />
                    </div>
                    <CardTitle className="text-white">Pending Requests</CardTitle>
                  </div>
                  <Link href="/spoon/hr/leave">
                    <Button variant="outline" size="sm" className="border-white/10 bg-white/5">
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {pendingRequests.map((request) => (
                  <div key={request.id} className="p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="text-sm font-medium text-white">{request.employee}</span>
                        <span className="text-xs text-white/40 ml-2">({request.department})</span>
                      </div>
                      <Badge variant="outline" className="text-yellow-400 border-yellow-400/20 bg-yellow-400/10">
                        {request.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-white/60 mb-3">
                      {request.days || request.hours}
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 h-7 bg-green-500/20 text-green-400 hover:bg-green-500/30">
                        <CheckCircle2 className="w-3 h-3 mr-1" /> Approve
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 h-7 border-red-400/20 text-red-400 hover:bg-red-500/20">
                        <XCircle className="w-3 h-3 mr-1" /> Decline
                      </Button>
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
                    <div className="p-2 rounded-lg bg-green-500/20">
                      <UserPlus className="w-5 h-5 text-green-400" />
                    </div>
                    <CardTitle className="text-white">Recent Hires</CardTitle>
                  </div>
                  <Link href="/spoon/hr/employees">
                    <Button variant="outline" size="sm" className="border-white/10 bg-white/5">
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentHires.map((hire, index) => (
                  <div key={index} className="p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                        {hire.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">{hire.name}</p>
                        <p className="text-xs text-white/60">{hire.role} - {hire.department}</p>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-blue-500/20 text-blue-400">New</Badge>
                        <p className="text-xs text-white/40 mt-1">{hire.startDate}</p>
                      </div>
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
