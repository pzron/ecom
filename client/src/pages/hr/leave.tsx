import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, Clock, CheckCircle2, XCircle,
  AlertTriangle, Users, FileText, Filter
} from "lucide-react";
import { motion } from "framer-motion";

const leaveRequests = [
  { id: 1, employee: "Sarah Chen", department: "Sales", type: "Annual Leave", startDate: "Dec 10, 2024", endDate: "Dec 12, 2024", days: 3, reason: "Family vacation", status: "pending" },
  { id: 2, employee: "Mike Johnson", department: "Marketing", type: "Sick Leave", startDate: "Dec 8, 2024", endDate: "Dec 8, 2024", days: 1, reason: "Medical appointment", status: "approved" },
  { id: 3, employee: "Emma Davis", department: "Operations", type: "Annual Leave", startDate: "Dec 15, 2024", endDate: "Dec 20, 2024", days: 5, reason: "Personal travel", status: "pending" },
  { id: 4, employee: "John Smith", department: "Customer Service", type: "Emergency Leave", startDate: "Dec 7, 2024", endDate: "Dec 8, 2024", days: 2, reason: "Family emergency", status: "approved" },
  { id: 5, employee: "Lisa Wang", department: "HR", type: "Annual Leave", startDate: "Dec 23, 2024", endDate: "Dec 27, 2024", days: 5, reason: "Holiday break", status: "pending" },
  { id: 6, employee: "David Wilson", department: "Operations", type: "Sick Leave", startDate: "Dec 5, 2024", endDate: "Dec 5, 2024", days: 1, reason: "Not feeling well", status: "rejected" },
];

const leaveStats = [
  { type: "Pending Requests", count: 4, color: "yellow", icon: Clock },
  { type: "Approved This Month", count: 12, color: "green", icon: CheckCircle2 },
  { type: "Rejected This Month", count: 2, color: "red", icon: XCircle },
  { type: "On Leave Today", count: 3, color: "blue", icon: Users },
];

const leaveBalance = [
  { type: "Annual Leave", total: 20, used: 8, remaining: 12 },
  { type: "Sick Leave", total: 10, used: 3, remaining: 7 },
  { type: "Emergency Leave", total: 5, used: 1, remaining: 4 },
  { type: "Maternity/Paternity", total: 90, used: 0, remaining: 90 },
];

const upcomingLeaves = [
  { employee: "Sarah Chen", dates: "Dec 10-12", type: "Annual Leave" },
  { employee: "Emma Davis", dates: "Dec 15-20", type: "Annual Leave" },
  { employee: "Lisa Wang", dates: "Dec 23-27", type: "Annual Leave" },
];

export default function HRLeave() {
  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: "bg-yellow-500/20 text-yellow-400",
      approved: "bg-green-500/20 text-green-400",
      rejected: "bg-red-500/20 text-red-400",
    };
    return styles[status] || "bg-white/10 text-white";
  };

  const getTypeBadge = (type: string) => {
    const styles: Record<string, string> = {
      "Annual Leave": "bg-blue-500/20 text-blue-400",
      "Sick Leave": "bg-orange-500/20 text-orange-400",
      "Emergency Leave": "bg-red-500/20 text-red-400",
      "Maternity/Paternity": "bg-purple-500/20 text-purple-400",
    };
    return styles[type] || "bg-white/10 text-white";
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
            <h1 className="text-3xl font-heading font-bold text-white">Leave Management</h1>
            <p className="text-white/60">Manage employee leave requests and balances</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-white/10 bg-white/5">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" className="border-white/10 bg-white/5">
              <FileText className="w-4 h-4 mr-2" />
              Leave Policy
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {leaveStats.map((stat, index) => (
            <motion.div
              key={stat.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-white/5 border-white/10 hover:bg-white/[0.08] transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-white/60">{stat.type}</p>
                      <p className="text-2xl font-bold text-white mt-1">{stat.count}</p>
                    </div>
                    <div className={`p-3 rounded-xl bg-${stat.color}-500/20`}>
                      <stat.icon className={`w-5 h-5 text-${stat.color}-400`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
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
                    <div className="p-2 rounded-lg bg-yellow-500/20">
                      <Clock className="w-5 h-5 text-yellow-400" />
                    </div>
                    <CardTitle className="text-white">Leave Requests</CardTitle>
                  </div>
                  <Button variant="outline" size="sm" className="border-white/10 bg-white/5">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {leaveRequests.map((request) => (
                  <div key={request.id} className="p-4 rounded-lg bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                          {request.employee.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{request.employee}</p>
                          <p className="text-xs text-white/60">{request.department}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getTypeBadge(request.type)}>{request.type}</Badge>
                        <Badge className={getStatusBadge(request.status)}>
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-white/60 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {request.startDate} - {request.endDate}
                      </span>
                      <span>{request.days} day(s)</span>
                    </div>
                    <p className="text-sm text-white/80 mb-3">{request.reason}</p>
                    {request.status === 'pending' && (
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1 h-8 bg-green-500/20 text-green-400 hover:bg-green-500/30">
                          <CheckCircle2 className="w-3 h-3 mr-1" /> Approve
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 h-8 border-red-400/20 text-red-400 hover:bg-red-500/20">
                          <XCircle className="w-3 h-3 mr-1" /> Reject
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/20">
                      <Calendar className="w-5 h-5 text-blue-400" />
                    </div>
                    <CardTitle className="text-white">Upcoming Leaves</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {upcomingLeaves.map((leave, index) => (
                    <div key={index} className="p-3 rounded-lg bg-white/5 border border-white/5">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-white">{leave.employee}</p>
                          <p className="text-xs text-white/60">{leave.dates}</p>
                        </div>
                        <Badge className={getTypeBadge(leave.type)} variant="outline">
                          {leave.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-500/20">
                      <FileText className="w-5 h-5 text-purple-400" />
                    </div>
                    <CardTitle className="text-white">Leave Balance Summary</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {leaveBalance.map((balance, index) => (
                    <div key={index} className="p-3 rounded-lg bg-white/5 border border-white/5">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-white">{balance.type}</p>
                        <p className="text-sm text-white">
                          <span className="text-green-400">{balance.remaining}</span>
                          <span className="text-white/40"> / {balance.total}</span>
                        </p>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                          style={{ width: `${(balance.remaining / balance.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
