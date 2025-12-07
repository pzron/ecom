import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Users, Search, Plus, Filter, MoreVertical,
  Mail, Phone, MapPin, Calendar, Edit, Trash2
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const employees = [
  { id: 1, name: "Sarah Chen", email: "sarah.chen@nexcommerce.com", phone: "+880 1712-345678", role: "Sales Manager", department: "Sales", location: "Dhaka", joinDate: "Jan 15, 2023", status: "active" },
  { id: 2, name: "Mike Johnson", email: "mike.j@nexcommerce.com", phone: "+880 1812-456789", role: "Marketing Specialist", department: "Marketing", location: "Dhaka", joinDate: "Mar 22, 2023", status: "active" },
  { id: 3, name: "Emma Davis", email: "emma.d@nexcommerce.com", phone: "+880 1912-567890", role: "Operations Lead", department: "Operations", location: "Chittagong", joinDate: "Feb 10, 2023", status: "active" },
  { id: 4, name: "John Smith", email: "john.s@nexcommerce.com", phone: "+880 1612-678901", role: "Customer Service Rep", department: "Customer Service", location: "Dhaka", joinDate: "Apr 5, 2023", status: "active" },
  { id: 5, name: "Lisa Wang", email: "lisa.w@nexcommerce.com", phone: "+880 1512-789012", role: "HR Coordinator", department: "HR", location: "Dhaka", joinDate: "May 18, 2023", status: "active" },
  { id: 6, name: "David Wilson", email: "david.w@nexcommerce.com", phone: "+880 1412-890123", role: "Stock Keeper", department: "Operations", location: "Sylhet", joinDate: "Nov 25, 2024", status: "active" },
  { id: 7, name: "Jennifer Lee", email: "jennifer.l@nexcommerce.com", phone: "+880 1312-901234", role: "Accountant", department: "Finance", location: "Dhaka", joinDate: "Jun 1, 2023", status: "on_leave" },
  { id: 8, name: "Robert Brown", email: "robert.b@nexcommerce.com", phone: "+880 1212-012345", role: "IT Support", department: "IT", location: "Dhaka", joinDate: "Jul 12, 2023", status: "active" },
];

const departments = ["All Departments", "Sales", "Marketing", "Operations", "Customer Service", "HR", "Finance", "IT"];

export default function HREmployees() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          emp.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = selectedDepartment === "All Departments" || emp.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  return (
    <DashboardLayout role="hr">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-heading font-bold text-white">Employees</h1>
            <p className="text-white/60">Manage your workforce directory</p>
          </div>
          <Button className="bg-gradient-to-r from-blue-500 to-cyan-500">
            <Plus className="w-4 h-4 mr-2" />
            Add Employee
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
                  <Input
                    placeholder="Search employees..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm"
                  >
                    {departments.map(dept => (
                      <option key={dept} value={dept} className="bg-gray-900">{dept}</option>
                    ))}
                  </select>
                  <Button variant="outline" className="border-white/10 bg-white/5">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/20">
                  <Users className="w-5 h-5 text-blue-400" />
                </div>
                <CardTitle className="text-white">Employee Directory ({filteredEmployees.length})</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Employee</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Role</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Department</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Location</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployees.map((employee) => (
                      <tr key={employee.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                              {employee.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-white">{employee.name}</p>
                              <div className="flex items-center gap-2 text-xs text-white/40">
                                <Mail className="w-3 h-3" />
                                {employee.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <p className="text-sm text-white">{employee.role}</p>
                          <p className="text-xs text-white/40 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Joined {employee.joinDate}
                          </p>
                        </td>
                        <td className="py-4 px-4">
                          <Badge className="bg-white/10 text-white">{employee.department}</Badge>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1 text-sm text-white/60">
                            <MapPin className="w-3 h-3" />
                            {employee.location}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge className={employee.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}>
                            {employee.status === 'active' ? 'Active' : 'On Leave'}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline" className="h-8 w-8 p-0 border-white/10">
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="outline" className="h-8 w-8 p-0 border-white/10">
                              <MoreVertical className="w-3 h-3" />
                            </Button>
                          </div>
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
