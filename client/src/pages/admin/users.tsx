import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, MoreVertical, Shield, Ban, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminUsers() {
  const users = [
    { name: "Alex Chen", email: "alex@example.com", role: "User", status: "Active", spent: "$45,200" },
    { name: "Sarah Miller", email: "sarah@vendor.com", role: "Vendor", status: "Verified", spent: "$0" },
    { name: "Mike Ross", email: "mike@affiliate.com", role: "Affiliate", status: "Pending", spent: "$1,200" },
    { name: "Jessica Liu", email: "jessica@example.com", role: "User", status: "Banned", spent: "$450" },
    { name: "David Kim", email: "david@admin.com", role: "Admin", status: "Active", spent: "$0" },
  ];

  return (
    <DashboardLayout role="admin">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold text-white">User Management</h1>
            <p className="text-muted-foreground">Manage permissions, roles, and account status</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-white/10">Export List</Button>
            <Button className="bg-primary hover:bg-primary/90">Add User</Button>
          </div>
        </div>

        <Card className="bg-white/5 border-white/10 backdrop-blur-md">
          <CardHeader className="border-b border-white/10 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">All Users</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search users..." className="pl-9 bg-black/20 border-white/10" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full">
              <thead className="bg-white/5 text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="px-6 py-3 text-left">User</th>
                  <th className="px-6 py-3 text-left">Role</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Total Spent</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.map((user, i) => (
                  <motion.tr 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4 flex items-center gap-3">
                      <Avatar className="w-8 h-8 border border-white/10">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-white">{user.name}</div>
                        <div className="text-xs text-muted-foreground">{user.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className="border-white/10 text-white">
                        {user.role}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={`
                        ${user.status === 'Active' || user.status === 'Verified' ? 'bg-green-500/20 text-green-400' : ''}
                        ${user.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400' : ''}
                        ${user.status === 'Banned' ? 'bg-red-500/20 text-red-400' : ''}
                        border-none
                      `}>
                        {user.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-white font-mono">{user.spent}</td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-white">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
