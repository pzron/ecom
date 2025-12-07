import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, Users, Calendar, CheckCircle2, XCircle,
  AlertTriangle, TrendingUp, Download, Filter
} from "lucide-react";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { motion } from "framer-motion";

const weeklyAttendance = [
  { day: 'Mon', present: 55, absent: 2, late: 1 },
  { day: 'Tue', present: 54, absent: 3, late: 1 },
  { day: 'Wed', present: 56, absent: 1, late: 1 },
  { day: 'Thu', present: 53, absent: 4, late: 1 },
  { day: 'Fri', present: 52, absent: 5, late: 1 },
  { day: 'Sat', present: 48, absent: 8, late: 2 },
  { day: 'Sun', present: 25, absent: 3, late: 0 },
];

const todayAttendance = [
  { id: 1, name: "Sarah Chen", department: "Sales", checkIn: "09:00 AM", checkOut: "06:15 PM", status: "present", hours: "9h 15m" },
  { id: 2, name: "Mike Johnson", department: "Marketing", checkIn: "09:15 AM", checkOut: "06:00 PM", status: "late", hours: "8h 45m" },
  { id: 3, name: "Emma Davis", department: "Operations", checkIn: "08:45 AM", checkOut: "-", status: "present", hours: "In Progress" },
  { id: 4, name: "John Smith", department: "Customer Service", checkIn: "-", checkOut: "-", status: "absent", hours: "-" },
  { id: 5, name: "Lisa Wang", department: "HR", checkIn: "09:00 AM", checkOut: "-", status: "present", hours: "In Progress" },
  { id: 6, name: "David Wilson", department: "Operations", checkIn: "08:30 AM", checkOut: "-", status: "present", hours: "In Progress" },
  { id: 7, name: "Jennifer Lee", department: "Finance", checkIn: "-", checkOut: "-", status: "leave", hours: "-" },
  { id: 8, name: "Robert Brown", department: "IT", checkIn: "09:05 AM", checkOut: "-", status: "present", hours: "In Progress" },
];

const attendanceStats = [
  { label: "Present Today", value: 52, total: 58, color: "green", icon: CheckCircle2 },
  { label: "Absent Today", value: 4, total: 58, color: "red", icon: XCircle },
  { label: "On Leave", value: 2, total: 58, color: "yellow", icon: Calendar },
  { label: "Late Arrivals", value: 1, total: 58, color: "orange", icon: AlertTriangle },
];

export default function HRAttendance() {
  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      present: "bg-green-500/20 text-green-400",
      absent: "bg-red-500/20 text-red-400",
      late: "bg-orange-500/20 text-orange-400",
      leave: "bg-yellow-500/20 text-yellow-400",
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
            <h1 className="text-3xl font-heading font-bold text-white">Attendance</h1>
            <p className="text-white/60">Track employee attendance and working hours</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-white/10 bg-white/5">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" className="border-white/10 bg-white/5">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {attendanceStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-white/5 border-white/10 hover:bg-white/[0.08] transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-white/60">{stat.label}</p>
                      <p className="text-2xl font-bold text-white mt-1">
                        {stat.value}
                        <span className="text-sm font-normal text-white/40">/{stat.total}</span>
                      </p>
                    </div>
                    <div className={`p-3 rounded-xl bg-${stat.color}-500/20`}>
                      <stat.icon className={`w-5 h-5 text-${stat.color}-400`} />
                    </div>
                  </div>
                  <div className="mt-3 h-2 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-${stat.color}-500 rounded-full transition-all`}
                      style={{ width: `${(stat.value / stat.total) * 100}%` }}
                    />
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
                    <div className="p-2 rounded-lg bg-blue-500/20">
                      <TrendingUp className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <CardTitle className="text-white">Weekly Overview</CardTitle>
                      <p className="text-sm text-white/60">Attendance distribution this week</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyAttendance}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="day" stroke="rgba(255,255,255,0.3)" fontSize={12} />
                      <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'rgba(10,10,15,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                        itemStyle={{ color: '#fff' }}
                      />
                      <Bar dataKey="present" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
                      <Bar dataKey="late" stackId="a" fill="#f59e0b" radius={[0, 0, 0, 0]} />
                      <Bar dataKey="absent" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-green-500" />
                    <span className="text-sm text-white/60">Present</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-orange-500" />
                    <span className="text-sm text-white/60">Late</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-red-500" />
                    <span className="text-sm text-white/60">Absent</span>
                  </div>
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
                    <Clock className="w-5 h-5 text-purple-400" />
                  </div>
                  <CardTitle className="text-white">Quick Stats</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                  <p className="text-sm text-white/60 mb-1">Avg. Check-in Time</p>
                  <p className="text-xl font-bold text-white">09:02 AM</p>
                  <p className="text-xs text-green-400 mt-1">2 min earlier than target</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                  <p className="text-sm text-white/60 mb-1">Avg. Working Hours</p>
                  <p className="text-xl font-bold text-white">8h 32m</p>
                  <p className="text-xs text-green-400 mt-1">Above 8h target</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                  <p className="text-sm text-white/60 mb-1">Attendance Rate</p>
                  <p className="text-xl font-bold text-white">94.8%</p>
                  <p className="text-xs text-green-400 mt-1">+2.3% from last month</p>
                </div>
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
                  <div className="p-2 rounded-lg bg-green-500/20">
                    <Users className="w-5 h-5 text-green-400" />
                  </div>
                  <CardTitle className="text-white">Today's Attendance</CardTitle>
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
                      <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Check In</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Check Out</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Hours</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {todayAttendance.map((record) => (
                      <tr key={record.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xs">
                              {record.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="text-sm text-white">{record.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-white/60">{record.department}</td>
                        <td className="py-3 px-4 text-sm text-white">{record.checkIn}</td>
                        <td className="py-3 px-4 text-sm text-white">{record.checkOut}</td>
                        <td className="py-3 px-4 text-sm text-white">{record.hours}</td>
                        <td className="py-3 px-4">
                          <Badge className={getStatusBadge(record.status)}>
                            {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
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
