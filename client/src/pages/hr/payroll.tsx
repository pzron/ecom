import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, Users, Calendar, Download,
  TrendingUp, CheckCircle2, Clock, FileText,
  ArrowUpRight, ArrowDownRight
} from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from "recharts";
import { motion } from "framer-motion";

const payrollHistory = [
  { month: 'Jul', amount: 2100000 },
  { month: 'Aug', amount: 2150000 },
  { month: 'Sep', amount: 2200000 },
  { month: 'Oct', amount: 2280000 },
  { month: 'Nov', amount: 2350000 },
  { month: 'Dec', amount: 2400000 },
];

const departmentPayroll = [
  { name: 'Sales', amount: 720000, employees: 18 },
  { name: 'Marketing', amount: 320000, employees: 8 },
  { name: 'Operations', amount: 450000, employees: 15 },
  { name: 'Customer Service', amount: 300000, employees: 12 },
  { name: 'Admin', amount: 200000, employees: 5 },
];

const recentPayments = [
  { id: 1, employee: "Sarah Chen", department: "Sales", amount: "৳55,000", status: "paid", date: "Dec 1, 2024" },
  { id: 2, employee: "Mike Johnson", department: "Marketing", amount: "৳48,000", status: "paid", date: "Dec 1, 2024" },
  { id: 3, employee: "Emma Davis", department: "Operations", amount: "৳52,000", status: "pending", date: "Dec 1, 2024" },
  { id: 4, employee: "John Smith", department: "Customer Service", amount: "৳32,000", status: "paid", date: "Dec 1, 2024" },
  { id: 5, employee: "Lisa Wang", department: "HR", amount: "৳45,000", status: "processing", date: "Dec 1, 2024" },
];

const upcomingPayroll = [
  { period: "December 2024", employees: 58, amount: "৳2.4M", status: "pending", dueDate: "Dec 25, 2024" },
  { period: "January 2025", employees: 60, amount: "৳2.5M", status: "scheduled", dueDate: "Jan 25, 2025" },
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

export default function HRPayroll() {
  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      paid: "bg-green-500/20 text-green-400",
      pending: "bg-yellow-500/20 text-yellow-400",
      processing: "bg-blue-500/20 text-blue-400",
      scheduled: "bg-purple-500/20 text-purple-400",
    };
    return styles[status] || "bg-white/10 text-white";
  };

  return (
    <DashboardLayout role="hr">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-heading font-bold text-white">Payroll</h1>
            <p className="text-white/60">Manage employee compensation and payments</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-white/10 bg-white/5">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button className="bg-gradient-to-r from-green-500 to-cyan-500">
              <DollarSign className="w-4 h-4 mr-2" />
              Run Payroll
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Monthly Payroll" value="৳2.4M" change="+8.2%" icon={DollarSign} color="blue" delay={0} />
          <StatCard title="Employees Paid" value="55/58" change="+3" icon={Users} color="green" delay={0.1} />
          <StatCard title="Avg. Salary" value="৳41,379" change="+5.4%" icon={TrendingUp} color="orange" delay={0.2} />
          <StatCard title="Pending Payments" value="3" change="-2" icon={Clock} color="purple" delay={0.3} />
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
                      <CardTitle className="text-white">Payroll Trend</CardTitle>
                      <p className="text-sm text-white/60">Monthly payroll expenses</p>
                    </div>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400">+14.3% YTD</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={payrollHistory}>
                      <defs>
                        <linearGradient id="colorPayroll" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={12} />
                      <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickFormatter={(v) => `৳${v/1000000}M`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'rgba(10,10,15,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                        itemStyle={{ color: '#fff' }}
                        formatter={(value: number) => [`৳${(value/1000000).toFixed(2)}M`, 'Payroll']}
                      />
                      <Area type="monotone" dataKey="amount" stroke="#10b981" strokeWidth={2} fill="url(#colorPayroll)" />
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
                    <Calendar className="w-5 h-5 text-orange-400" />
                  </div>
                  <CardTitle className="text-white">Upcoming Payroll</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingPayroll.map((payroll, index) => (
                  <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-white">{payroll.period}</h4>
                      <Badge className={getStatusBadge(payroll.status)}>
                        {payroll.status.charAt(0).toUpperCase() + payroll.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-xs text-white/60">
                      <div className="flex justify-between">
                        <span>Employees</span>
                        <span className="text-white">{payroll.employees}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Amount</span>
                        <span className="text-white">{payroll.amount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Due Date</span>
                        <span className="text-white">{payroll.dueDate}</span>
                      </div>
                    </div>
                    <Button size="sm" className="w-full mt-3 h-8 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30">
                      <FileText className="w-3 h-3 mr-1" />
                      View Details
                    </Button>
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
                    <Users className="w-5 h-5 text-purple-400" />
                  </div>
                  <CardTitle className="text-white">Recent Payments</CardTitle>
                </div>
                <Button variant="outline" size="sm" className="border-white/10 bg-white/5">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Employee</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Department</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Amount</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Date</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentPayments.map((payment) => (
                      <tr key={payment.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xs">
                              {payment.employee.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="text-sm text-white">{payment.employee}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-white/60">{payment.department}</td>
                        <td className="py-3 px-4 text-sm font-medium text-white">{payment.amount}</td>
                        <td className="py-3 px-4 text-sm text-white/60">{payment.date}</td>
                        <td className="py-3 px-4">
                          <Badge className={getStatusBadge(payment.status)}>
                            {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
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
    </DashboardLayout>
  );
}
