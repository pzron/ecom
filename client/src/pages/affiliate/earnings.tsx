import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  DollarSign, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight,
  Calendar, Download, Filter, Search, Clock, CheckCircle, AlertCircle,
  Wallet, CreditCard, RefreshCw, ChevronRight, FileText, Eye,
  ArrowUp, ArrowDown
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { 
  AreaChart, Area, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip,
  BarChart, Bar, Cell
} from "recharts";

const earningsData = [
  { name: 'Jan', earnings: 12000 },
  { name: 'Feb', earnings: 18000 },
  { name: 'Mar', earnings: 15000 },
  { name: 'Apr', earnings: 28000 },
  { name: 'May', earnings: 22000 },
  { name: 'Jun', earnings: 35000 },
  { name: 'Jul', earnings: 42000 },
  { name: 'Aug', earnings: 38000 },
  { name: 'Sep', earnings: 45000 },
  { name: 'Oct', earnings: 52000 },
  { name: 'Nov', earnings: 48000 },
  { name: 'Dec', earnings: 61000 },
];

const monthlyBreakdown = [
  { month: 'Sep', amount: 45000, color: '#a855f7' },
  { month: 'Oct', amount: 52000, color: '#ec4899' },
  { month: 'Nov', amount: 48000, color: '#06b6d4' },
  { month: 'Dec', amount: 61000, color: '#22c55e' },
];

const transactions = [
  { id: "TRX-001", date: "Dec 5, 2024", source: "Black Friday Early Access", order: "#ORD-9921", amount: "+৳4,500", status: "pending", commission: "20%" },
  { id: "TRX-002", date: "Dec 4, 2024", source: "iPhone 15 Pro Launch", order: "#ORD-9882", amount: "+৳12,000", status: "cleared", commission: "10%" },
  { id: "TRX-003", date: "Dec 3, 2024", source: "iPhone 15 Pro Launch", order: "#ORD-9856", amount: "+৳12,000", status: "cleared", commission: "10%" },
  { id: "TRX-004", date: "Dec 2, 2024", source: "Summer Tech Sale", order: "#ORD-9711", amount: "+৳6,750", status: "cleared", commission: "15%" },
  { id: "TRX-005", date: "Dec 1, 2024", source: "Gaming Week Promo", order: "#ORD-9650", amount: "+৳1,250", status: "cleared", commission: "12%" },
  { id: "TRX-006", date: "Nov 30, 2024", source: "AirPods Bundle Deal", order: "#ORD-9612", amount: "+৳3,959", status: "cleared", commission: "12%" },
  { id: "TRX-007", date: "Nov 29, 2024", source: "Black Friday Early Access", order: "#ORD-9588", amount: "+৳8,000", status: "cleared", commission: "20%" },
  { id: "TRX-008", date: "Nov 28, 2024", source: "iPhone 15 Pro Launch", order: "#ORD-9534", amount: "+৳12,000", status: "cleared", commission: "10%" },
];

const payoutHistory = [
  { id: "PAY-001", date: "Dec 1, 2024", amount: "৳48,000", method: "Bank Transfer", status: "completed" },
  { id: "PAY-002", date: "Nov 15, 2024", amount: "৳52,000", method: "Bank Transfer", status: "completed" },
  { id: "PAY-003", date: "Nov 1, 2024", amount: "৳45,000", method: "PayPal", status: "completed" },
  { id: "PAY-004", date: "Oct 15, 2024", amount: "৳38,000", method: "Bank Transfer", status: "completed" },
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

function EarningsKPI({ 
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

function TransactionStatus({ status }: { status: string }) {
  const styles: Record<string, { bg: string; text: string; icon: any }> = {
    pending: { bg: "bg-yellow-500/10", text: "text-yellow-400", icon: Clock },
    cleared: { bg: "bg-green-500/10", text: "text-green-400", icon: CheckCircle },
    failed: { bg: "bg-red-500/10", text: "text-red-400", icon: AlertCircle },
  };

  const style = styles[status] || styles.pending;
  const IconComponent = style.icon;

  return (
    <Badge className={`${style.bg} ${style.text} border-none`}>
      <IconComponent className="w-3 h-3 mr-1" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}

export default function AffiliateEarnings() {
  const [dateRange, setDateRange] = useState("30d");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  return (
    <DashboardLayout role="affiliate">
      <div className="space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-heading font-bold bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                Earnings History
              </h1>
              <Badge variant="outline" className="border-green-500/30 text-green-400 bg-green-500/10">
                <TrendingUp className="w-3 h-3 mr-1" />
                +24% this month
              </Badge>
            </div>
            <p className="text-white/60">Detailed breakdown of your commissions and payouts</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center border border-white/10 rounded-lg overflow-hidden text-sm">
              {['7d', '30d', '90d', '1y'].map((range) => (
                <button
                  key={range}
                  onClick={() => setDateRange(range)}
                  className={`px-3 py-2 ${dateRange === range ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5'}`}
                >
                  {range}
                </button>
              ))}
            </div>
            <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <EarningsKPI 
            title="Total Earnings" 
            value="৳416K" 
            change="+32.5%" 
            icon={DollarSign} 
            color="green"
            delay={0}
          />
          <EarningsKPI 
            title="This Month" 
            value="৳61,000" 
            change="+27.1%" 
            icon={Calendar} 
            color="purple"
            delay={0.1}
          />
          <EarningsKPI 
            title="Pending" 
            value="৳4,500" 
            change="+1" 
            icon={Clock} 
            color="yellow"
            delay={0.2}
          />
          <EarningsKPI 
            title="Lifetime Payouts" 
            value="৳411K" 
            change="+18.2%" 
            icon={Wallet} 
            color="cyan"
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
                <Wallet className="w-8 h-8 text-green-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Available Balance</h2>
                <p className="text-white/60">Ready to withdraw</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-3xl font-bold text-white">৳61,000</div>
              <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                <CreditCard className="w-4 h-4 mr-2" />
                Withdraw Now
              </Button>
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
                      <h3 className="text-lg font-semibold text-white">Earnings Trend</h3>
                      <p className="text-sm text-white/60">Monthly earnings overview</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300">
                    <Download className="w-4 h-4 mr-2" />
                    Report
                  </Button>
                </div>
                
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={earningsData}>
                      <defs>
                        <linearGradient id="earningsGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
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
                        formatter={(value: number) => [`৳${value.toLocaleString()}`, 'Earnings']}
                      />
                      <Area type="monotone" dataKey="earnings" stroke="#22c55e" strokeWidth={3} fill="url(#earningsGrad)" />
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
            <HolographicCard glowColor="cyan">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-cyan-500/20">
                    <Wallet className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Recent Payouts</h3>
                    <p className="text-sm text-white/60">Withdrawal history</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {payoutHistory.map((payout, i) => (
                    <motion.div
                      key={payout.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
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
                      <Badge className="bg-white/5 text-white/60 border-white/10 text-xs">
                        {payout.method}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
                
                <Button variant="ghost" className="w-full mt-4 text-cyan-400 hover:text-cyan-300">
                  View All Payouts <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </HolographicCard>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <HolographicCard glowColor="green">
            <div className="p-4 border-b border-white/5">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <div className="relative flex-1 md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <Input 
                      placeholder="Search transactions..." 
                      className="pl-10 bg-white/5 border-white/10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="icon" className="border-white/10 bg-white/5 hover:bg-white/10">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Button variant="outline" size="sm" className="border-white/10 bg-white/10 text-white">
                    All
                  </Button>
                  <Button variant="outline" size="sm" className="border-white/10 bg-white/5 text-white/60">
                    Cleared
                  </Button>
                  <Button variant="outline" size="sm" className="border-white/10 bg-white/5 text-white/60">
                    Pending
                  </Button>
                  <button 
                    onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
                    className="flex items-center gap-1 px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-white/60 hover:bg-white/10"
                  >
                    {sortOrder === 'desc' ? <ArrowDown className="w-3 h-3" /> : <ArrowUp className="w-3 h-3" />}
                    Date
                  </button>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs uppercase text-white/40 bg-white/[0.02]">
                    <th className="p-4">Date</th>
                    <th className="p-4">Source Campaign</th>
                    <th className="p-4">Order ID</th>
                    <th className="p-4">Commission</th>
                    <th className="p-4 text-right">Amount</th>
                    <th className="p-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {transactions.map((tx, i) => (
                    <motion.tr 
                      key={tx.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + i * 0.05 }}
                      className="hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="p-4 text-white/60">{tx.date}</td>
                      <td className="p-4">
                        <span className="font-medium text-white">{tx.source}</span>
                      </td>
                      <td className="p-4">
                        <span className="font-mono text-sm text-white/60">{tx.order}</span>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline" className="border-purple-500/30 text-purple-400 bg-purple-500/10">
                          {tx.commission}
                        </Badge>
                      </td>
                      <td className="p-4 text-right">
                        <span className="font-bold text-green-400">{tx.amount}</span>
                      </td>
                      <td className="p-4 text-right">
                        <TransactionStatus status={tx.status} />
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t border-white/5 flex items-center justify-between">
              <p className="text-sm text-white/40">Showing {transactions.length} transactions</p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="border-white/10" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="border-white/10 bg-white/10">
                  1
                </Button>
                <Button variant="outline" size="sm" className="border-white/10">
                  2
                </Button>
                <Button variant="outline" size="sm" className="border-white/10">
                  Next
                </Button>
              </div>
            </div>
          </HolographicCard>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
