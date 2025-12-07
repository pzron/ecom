import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, Headphones, MessageSquare, BarChart3,
  Clock, CheckCircle2, AlertCircle, Users,
  ArrowUpRight, Calendar, Mail
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

const recentTickets = [
  { id: "TKT-001", customer: "Sarah Chen", subject: "Order delivery delay", priority: "high", status: "open", time: "10 min ago" },
  { id: "TKT-002", customer: "Mike Johnson", subject: "Refund request", priority: "medium", status: "open", time: "25 min ago" },
  { id: "TKT-003", customer: "Emma Wilson", subject: "Product inquiry", priority: "low", status: "pending", time: "1 hour ago" },
  { id: "TKT-004", customer: "David Brown", subject: "Account issue", priority: "high", status: "resolved", time: "2 hours ago" },
];

const upcomingTasks = [
  { id: 1, title: "Process pending refunds", dueTime: "2:00 PM", priority: "high" },
  { id: 2, title: "Generate weekly sales report", dueTime: "4:00 PM", priority: "medium" },
  { id: 3, title: "Update customer records", dueTime: "5:00 PM", priority: "low" },
  { id: 4, title: "Team meeting notes", dueTime: "Tomorrow", priority: "medium" },
];

const priorityColors: Record<string, string> = {
  high: "bg-red-500/20 text-red-400",
  medium: "bg-yellow-500/20 text-yellow-400",
  low: "bg-green-500/20 text-green-400",
};

const statusColors: Record<string, string> = {
  open: "bg-blue-500/20 text-blue-400",
  pending: "bg-yellow-500/20 text-yellow-400",
  resolved: "bg-green-500/20 text-green-400",
};

export default function OfficeDashboard() {
  return (
    <DashboardLayout role="office_member">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-heading font-bold text-white">Office Dashboard</h1>
            <p className="text-white/60">Administrative tasks and customer support</p>
          </div>
          <div className="flex gap-3">
            <Link href="/spoon/office/support">
              <Button variant="outline" className="border-white/10 bg-white/5">
                <Headphones className="w-4 h-4 mr-2" />
                Support Queue
              </Button>
            </Link>
            <Link href="/spoon/office/reports">
              <Button className="bg-gradient-to-r from-indigo-500 to-violet-500">
                <BarChart3 className="w-4 h-4 mr-2" />
                View Reports
              </Button>
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}>
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-indigo-500/20">
                    <Headphones className="w-5 h-5 text-indigo-400" />
                  </div>
                  <Badge className="bg-red-500/20 text-red-400">
                    <ArrowUpRight className="w-3 h-3 mr-1" /> +5
                  </Badge>
                </div>
                <h3 className="text-sm text-white/60 mb-1">Open Tickets</h3>
                <p className="text-3xl font-bold text-white">12</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <div className="p-3 rounded-xl bg-green-500/20 w-fit mb-4">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="text-sm text-white/60 mb-1">Resolved Today</h3>
                <p className="text-3xl font-bold text-white">28</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <div className="p-3 rounded-xl bg-purple-500/20 w-fit mb-4">
                  <FileText className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="text-sm text-white/60 mb-1">Pending Documents</h3>
                <p className="text-3xl font-bold text-white">7</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <div className="p-3 rounded-xl bg-cyan-500/20 w-fit mb-4">
                  <Clock className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="text-sm text-white/60 mb-1">Avg. Response</h3>
                <p className="text-3xl font-bold text-white">12 min</p>
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
                    <Headphones className="w-5 h-5 text-indigo-400" />
                    Recent Support Tickets
                  </CardTitle>
                  <Link href="/spoon/office/support">
                    <Button variant="ghost" size="sm" className="text-indigo-400 hover:text-indigo-300">
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentTickets.map((ticket, i) => (
                    <motion.div
                      key={ticket.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500/20 to-violet-500/20 flex items-center justify-center">
                          <Headphones className="w-5 h-5 text-indigo-400" />
                        </div>
                        <div>
                          <p className="font-medium text-white">{ticket.subject}</p>
                          <p className="text-sm text-white/60">{ticket.customer} • {ticket.id}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={priorityColors[ticket.priority]}>
                          {ticket.priority}
                        </Badge>
                        <Badge className={statusColors[ticket.status]}>
                          {ticket.status}
                        </Badge>
                        <span className="text-xs text-white/40">{ticket.time}</span>
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
                <CardTitle className="text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-indigo-400" />
                  Today's Tasks
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingTasks.map((task, i) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="p-3 rounded-lg bg-white/5 border border-white/5"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-sm font-medium text-white">{task.title}</p>
                      <Badge className={priorityColors[task.priority]} variant="outline">
                        {task.priority}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/40">
                      <Clock className="w-3 h-3" />
                      Due: {task.dueTime}
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/spoon/office/documents">
            <Card className="bg-gradient-to-br from-indigo-500/10 to-violet-500/10 border-indigo-500/20 hover:border-indigo-500/40 transition-colors cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-indigo-500/20">
                    <FileText className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Documents</h3>
                    <p className="text-sm text-white/60">Manage files & records</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
          
          <Link href="/spoon/office/reports">
            <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20 hover:border-purple-500/40 transition-colors cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-purple-500/20">
                    <BarChart3 className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Reports</h3>
                    <p className="text-sm text-white/60">Analytics & insights</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
          
          <Link href="/spoon/office/communications">
            <Card className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500/20 hover:border-cyan-500/40 transition-colors cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-cyan-500/20">
                    <MessageSquare className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Communications</h3>
                    <p className="text-sm text-white/60">Messages & notifications</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
