import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Users, Search, Plus, Filter,
  Building, Mail, Phone, DollarSign,
  Calendar, Star, Eye, Edit, MoreVertical
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const customers = [
  { id: 1, name: "TechCorp Ltd.", contact: "Kamal Hossain", email: "kamal@techcorp.com", phone: "+880 1712-345678", totalSpent: "৳1,250,000", orders: 28, lastOrder: "Dec 5, 2024", status: "active", tier: "Enterprise" },
  { id: 2, name: "Digital Solutions", contact: "Sabrina Ahmed", email: "sabrina@digitalsolutions.com", phone: "+880 1812-456789", totalSpent: "৳820,000", orders: 15, lastOrder: "Dec 3, 2024", status: "active", tier: "Premium" },
  { id: 3, name: "StartUp Hub BD", contact: "Rafiq Islam", email: "rafiq@startuphub.com", phone: "+880 1912-567890", totalSpent: "৳425,000", orders: 12, lastOrder: "Nov 28, 2024", status: "active", tier: "Standard" },
  { id: 4, name: "MegaRetail Inc.", contact: "Fatima Khan", email: "fatima@megaretail.com", phone: "+880 1612-678901", totalSpent: "৳2,180,000", orders: 45, lastOrder: "Dec 6, 2024", status: "active", tier: "Enterprise" },
  { id: 5, name: "Cloud Solutions Ltd.", contact: "Ahmed Rahman", email: "ahmed@cloudsolutions.com", phone: "+880 1512-789012", totalSpent: "৳680,000", orders: 18, lastOrder: "Dec 1, 2024", status: "active", tier: "Premium" },
  { id: 6, name: "E-Commerce Plus", contact: "Nadia Begum", email: "nadia@ecomplus.com", phone: "+880 1412-890123", totalSpent: "৳320,000", orders: 8, lastOrder: "Nov 15, 2024", status: "inactive", tier: "Standard" },
  { id: 7, name: "Innovation Labs", contact: "Imran Hossain", email: "imran@innovlabs.com", phone: "+880 1312-901234", totalSpent: "৳950,000", orders: 22, lastOrder: "Dec 4, 2024", status: "active", tier: "Premium" },
  { id: 8, name: "Smart Systems BD", contact: "Tasnim Akter", email: "tasnim@smartsystems.com", phone: "+880 1212-012345", totalSpent: "৳1,580,000", orders: 35, lastOrder: "Dec 6, 2024", status: "active", tier: "Enterprise" },
];

const tiers = ["All Tiers", "Enterprise", "Premium", "Standard"];
const statuses = ["All Statuses", "Active", "Inactive"];

export default function SalesCustomers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTier, setSelectedTier] = useState("All Tiers");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          customer.contact.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTier = selectedTier === "All Tiers" || customer.tier === selectedTier;
    const matchesStatus = selectedStatus === "All Statuses" || customer.status.toLowerCase() === selectedStatus.toLowerCase();
    return matchesSearch && matchesTier && matchesStatus;
  });

  const getTierBadge = (tier: string) => {
    const styles: Record<string, string> = {
      Enterprise: "bg-purple-500/20 text-purple-400",
      Premium: "bg-blue-500/20 text-blue-400",
      Standard: "bg-green-500/20 text-green-400",
    };
    return styles[tier] || "bg-white/10 text-white";
  };

  const totalRevenue = customers.reduce((sum, c) => sum + parseInt(c.totalSpent.replace(/[৳,]/g, '')), 0);
  const activeCustomers = customers.filter(c => c.status === 'active').length;

  return (
    <DashboardLayout role="sales">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-heading font-bold text-white">Customers</h1>
            <p className="text-white/60">Manage your customer relationships</p>
          </div>
          <Button className="bg-gradient-to-r from-green-500 to-cyan-500">
            <Plus className="w-4 h-4 mr-2" />
            Add Customer
          </Button>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}>
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-4">
                <p className="text-sm text-white/60">Total Customers</p>
                <p className="text-2xl font-bold text-white mt-1">{customers.length}</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-4">
                <p className="text-sm text-white/60">Active Customers</p>
                <p className="text-2xl font-bold text-green-400 mt-1">{activeCustomers}</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-4">
                <p className="text-sm text-white/60">Total Revenue</p>
                <p className="text-2xl font-bold text-white mt-1">৳{(totalRevenue / 1000000).toFixed(1)}M</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-4">
                <p className="text-sm text-white/60">Avg. Customer Value</p>
                <p className="text-2xl font-bold text-white mt-1">৳{(totalRevenue / customers.length / 1000).toFixed(0)}K</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
                  <Input
                    placeholder="Search customers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={selectedTier}
                    onChange={(e) => setSelectedTier(e.target.value)}
                    className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm"
                  >
                    {tiers.map(tier => (
                      <option key={tier} value={tier} className="bg-gray-900">{tier}</option>
                    ))}
                  </select>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status} className="bg-gray-900">{status}</option>
                    ))}
                  </select>
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
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/20">
                  <Users className="w-5 h-5 text-blue-400" />
                </div>
                <CardTitle className="text-white">Customer Directory ({filteredCustomers.length})</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Customer</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Contact</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Total Spent</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Orders</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Tier</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCustomers.map((customer) => (
                      <tr key={customer.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                              <Building className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-white">{customer.name}</p>
                              <p className="text-xs text-white/40">Last order: {customer.lastOrder}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <p className="text-sm text-white">{customer.contact}</p>
                            <div className="flex items-center gap-2 text-xs text-white/40">
                              <Mail className="w-3 h-3" />
                              {customer.email}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm font-medium text-green-400">{customer.totalSpent}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm text-white">{customer.orders}</span>
                        </td>
                        <td className="py-4 px-4">
                          <Badge className={getTierBadge(customer.tier)}>{customer.tier}</Badge>
                        </td>
                        <td className="py-4 px-4">
                          <Badge className={customer.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}>
                            {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline" className="h-8 w-8 p-0 border-white/10">
                              <Eye className="w-3 h-3" />
                            </Button>
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
