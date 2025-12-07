import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, DollarSign, Receipt, ShoppingCart,
  ArrowUpRight, Clock, CheckCircle2, TrendingUp, Loader2, AlertTriangle
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";

interface CashierDashboardData {
  todaySales: number;
  transactions: number;
  itemsSold: number;
  avgTime: string;
  recentTransactions: { id: string; customer: string; amount: number; items: number; method: string; time: string }[];
  shiftInfo: { start: string; end: string; breakTaken: string };
}

const quickActions = [
  { label: "New Sale", icon: ShoppingCart, href: "/spoon/cashier/pos", color: "from-green-500 to-emerald-500" },
  { label: "Refund", icon: Receipt, href: "/spoon/cashier/transactions", color: "from-orange-500 to-amber-500" },
  { label: "Daily Report", icon: TrendingUp, href: "/spoon/cashier/summary", color: "from-blue-500 to-cyan-500" },
];

export default function CashierDashboard() {
  const { data, isLoading, error } = useQuery<CashierDashboardData>({
    queryKey: ["/api/cashier/dashboard"],
    queryFn: async () => {
      const res = await fetch("/api/cashier/dashboard", { credentials: "include" });
      if (!res.ok) {
        if (res.status === 401) throw new Error("Please log in to access this dashboard");
        if (res.status === 403) throw new Error("You don't have permission to access this dashboard");
        throw new Error("Failed to load dashboard");
      }
      return res.json();
    },
  });

  const recentTransactions = data?.recentTransactions || [];

  if (isLoading) {
    return (
      <DashboardLayout role="cashier">
        <div className="flex items-center justify-center h-96">
          <Loader2 className="w-8 h-8 animate-spin text-green-500" />
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout role="cashier">
        <div className="flex flex-col items-center justify-center h-96 gap-4">
          <AlertTriangle className="w-12 h-12 text-red-400" />
          <p className="text-white/60">{error.message}</p>
        </div>
      </DashboardLayout>
    );
  }
  return (
    <DashboardLayout role="cashier">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-heading font-bold text-white">Cashier Dashboard</h1>
            <p className="text-white/60">Welcome back! Ready to serve customers.</p>
          </div>
          <Link href="/spoon/cashier/pos">
            <Button className="bg-gradient-to-r from-green-500 to-emerald-500 text-lg px-6">
              <CreditCard className="w-5 h-5 mr-2" />
              Open POS
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}>
            <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-green-500/30">
                    <DollarSign className="w-5 h-5 text-green-400" />
                  </div>
                  <Badge className="bg-green-500/30 text-green-300">
                    <ArrowUpRight className="w-3 h-3 mr-1" /> +12%
                  </Badge>
                </div>
                <h3 className="text-sm text-white/60 mb-1">Today's Sales</h3>
                <p className="text-3xl font-bold text-white">৳{(data?.todaySales || 0).toLocaleString()}</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-blue-500/20">
                    <Receipt className="w-5 h-5 text-blue-400" />
                  </div>
                </div>
                <h3 className="text-sm text-white/60 mb-1">Transactions</h3>
                <p className="text-3xl font-bold text-white">{data?.transactions || 0}</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-purple-500/20">
                    <ShoppingCart className="w-5 h-5 text-purple-400" />
                  </div>
                </div>
                <h3 className="text-sm text-white/60 mb-1">Items Sold</h3>
                <p className="text-3xl font-bold text-white">{data?.itemsSold || 0}</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-orange-500/20">
                    <Clock className="w-5 h-5 text-orange-400" />
                  </div>
                </div>
                <h3 className="text-sm text-white/60 mb-1">Avg. Time</h3>
                <p className="text-3xl font-bold text-white">{data?.avgTime || "0 min"}</p>
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
            <Card className="bg-white/5 border-white/10 h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Receipt className="w-5 h-5 text-green-400" />
                    Recent Transactions
                  </CardTitle>
                  <Link href="/spoon/cashier/transactions">
                    <Button variant="ghost" size="sm" className="text-green-400 hover:text-green-300">
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentTransactions.map((txn, i) => (
                    <motion.div
                      key={txn.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-green-400" />
                        </div>
                        <div>
                          <p className="font-medium text-white">{txn.customer}</p>
                          <p className="text-sm text-white/60">{txn.items} items • {txn.method}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-white">{txn.amount}</p>
                        <p className="text-xs text-white/40">{txn.time}</p>
                      </div>
                    </motion.div>
                  ))}
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
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {quickActions.map((action, i) => (
                  <Link key={action.label} href={action.href}>
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      className={`p-4 rounded-xl bg-gradient-to-r ${action.color} cursor-pointer hover:opacity-90 transition-opacity`}
                    >
                      <div className="flex items-center gap-3">
                        <action.icon className="w-6 h-6 text-white" />
                        <span className="text-lg font-semibold text-white">{action.label}</span>
                      </div>
                    </motion.div>
                  </Link>
                ))}

                <div className="pt-4 border-t border-white/10">
                  <h4 className="text-sm text-white/60 mb-3">Shift Info</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Shift Start</span>
                      <span className="text-white">{data?.shiftInfo?.start || "6:00 AM"}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Shift End</span>
                      <span className="text-white">{data?.shiftInfo?.end || "2:00 PM"}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Break Taken</span>
                      <span className="text-green-400">{data?.shiftInfo?.breakTaken || "0 min"}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
