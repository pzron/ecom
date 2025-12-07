import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Trash2, Shield, Plus, Check, X, Edit2, Users, Package, TrendingUp, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [vendors, setVendors] = useState<any[]>([]);
  const [affiliates, setAffiliates] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([
    { id: "customer", name: "Customer", color: "green", powers: ["Browse Products", "Make Purchases", "View Orders"] },
    { id: "vendor", name: "Vendor", color: "blue", powers: ["Manage Products", "View Sales", "Process Orders"] },
    { id: "affiliate", name: "Affiliate", color: "pink", powers: ["View Campaigns", "Track Earnings", "Share Links"] },
    { id: "admin", name: "Admin", color: "purple", powers: ["Full System Access", "Manage Users", "View All Analytics"] }
  ]);
  
  const [activeTab, setActiveTab] = useState("users");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showNewRole, setShowNewRole] = useState(false);
  const [editingRole, setEditingRole] = useState<any>(null);
  const [newRoleData, setNewRoleData] = useState({ name: "", powers: "" });

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [usersRes, vendorsRes, affiliatesRes] = await Promise.all([
        fetch("/api/admin/users"),
        fetch("/api/admin/vendors"),
        fetch("/api/admin/affiliate-requests")
      ]);
      setUsers(await usersRes.json() || []);
      setVendors(await vendorsRes.json() || []);
      setAffiliates(await affiliatesRes.json() || []);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      await fetch(`/api/admin/users/${userId}/role`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole })
      });
      fetchAllData();
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const deleteUser = async (userId: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        await fetch(`/api/admin/users/${userId}`, { method: "DELETE" });
        fetchAllData();
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    }
  };

  const createRole = async () => {
    if (!newRoleData.name.trim()) return;
    const newRole = {
      id: newRoleData.name.toLowerCase().replace(/\s+/g, "_"),
      name: newRoleData.name,
      color: "indigo",
      powers: newRoleData.powers.split(",").map((p: string) => p.trim()).filter((p: string) => p)
    };
    setRoles([...roles, newRole]);
    setNewRoleData({ name: "", powers: "" });
    setShowNewRole(false);
  };

  const deleteRole = (roleId: string) => {
    if (["customer", "vendor", "affiliate", "admin"].includes(roleId)) {
      alert("Cannot delete default roles");
      return;
    }
    setRoles(roles.filter((r: any) => r.id !== roleId));
  };

  const filteredUsers = users.filter(u => 
    u.username?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="text-white text-center py-12">Loading...</div>;

  const colorClasses: Record<string, { bg: string; text: string }> = {
    purple: { bg: "bg-purple-500/20", text: "text-purple-400" },
    blue: { bg: "bg-blue-500/20", text: "text-blue-400" },
    pink: { bg: "bg-pink-500/20", text: "text-pink-400" },
    orange: { bg: "bg-orange-500/20", text: "text-orange-400" },
    green: { bg: "bg-green-500/20", text: "text-green-400" },
  };

  const StatCard = ({ icon: Icon, label, value, color }: any) => (
    <motion.div whileHover={{ y: -5 }} className="p-4 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/60 text-sm">{label}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]?.bg || "bg-purple-500/20"}`}>
          <Icon className={`w-6 h-6 ${colorClasses[color]?.text || "text-purple-400"}`} />
        </div>
      </div>
    </motion.div>
  );

  return (
    <DashboardLayout role="admin">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white">User Management</h1>
          <p className="text-white/60 mt-1">Complete control center for users, vendors, affiliates & roles</p>
        </div>

        {/* Summary Cards */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <StatCard icon={Users} label="Total Users" value={users.length} color="purple" />
          <StatCard icon={Package} label="Vendors" value={vendors.length} color="blue" />
          <StatCard icon={TrendingUp} label="Affiliates" value={affiliates.length} color="pink" />
          <StatCard icon={Clock} label="Pending" value={vendors.filter((v: any) => !v.isVerified).length} color="orange" />
          <StatCard icon={Shield} label="Roles" value={roles.length} color="green" />
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-white/10">
          {["users", "vendors", "affiliates", "roles"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold transition-all capitalize ${
                activeTab === tab 
                  ? "border-b-2 border-purple-500 text-purple-400" 
                  : "text-white/60 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Users Tab */}
        {activeTab === "users" && (
          <Card className="bg-white/5 border-white/10 backdrop-blur-md">
            <CardHeader className="border-b border-white/10 pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">All Users ({filteredUsers.length})</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <Input 
                    placeholder="Search users..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9 bg-black/20 border-white/10" 
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full">
                <thead className="bg-white/5 text-xs uppercase text-white/60">
                  <tr>
                    <th className="px-6 py-3 text-left">User</th>
                    <th className="px-6 py-3 text-left">Email</th>
                    <th className="px-6 py-3 text-left">Role</th>
                    <th className="px-6 py-3 text-left">Status</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredUsers.map((user: any, i: number) => (
                    <motion.tr 
                      key={user.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="hover:bg-white/5 transition-colors"
                    >
                      <td className="px-6 py-4 flex items-center gap-3">
                        <Avatar className="w-8 h-8 border border-white/10">
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`} />
                          <AvatarFallback>{user.username?.[0]?.toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="font-medium text-white">{user.fullName || user.username}</div>
                      </td>
                      <td className="px-6 py-4 text-white/70 text-sm">{user.email}</td>
                      <td className="px-6 py-4">
                        <select 
                          value={user.role || "customer"}
                          onChange={(e) => updateUserRole(user.id, e.target.value)}
                          className="px-3 py-1 rounded bg-white/10 border border-white/20 text-white text-sm"
                        >
                          {roles.map((r: any) => (
                            <option key={r.id} value={r.id}>{r.name}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={user.isVerified ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"}>
                          {user.isVerified ? "Verified" : "Pending"}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => deleteUser(user.id)}
                          className="text-red-400 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        )}

        {/* Vendors Tab */}
        {activeTab === "vendors" && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Vendor Requests ({vendors.filter((v: any) => !v.isVerified).length})</h3>
            {vendors.filter((v: any) => !v.isVerified).length === 0 ? (
              <div className="p-6 rounded-xl bg-white/5 border border-white/10 text-white/60">No pending vendor requests</div>
            ) : (
              vendors.filter((v: any) => !v.isVerified).map((vendor: any) => (
                <motion.div key={vendor.id} whileHover={{ x: 4 }} className="p-4 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-semibold">{vendor.storeName}</h4>
                      <p className="text-white/60 text-sm">{vendor.contactEmail}</p>
                      <p className="text-white/40 text-xs mt-1">Commission: {vendor.commissionRate}%</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4" /> Approve
                      </button>
                      <button className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 flex items-center gap-2 text-sm">
                        <X className="w-4 h-4" /> Reject
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}

        {/* Affiliates Tab */}
        {activeTab === "affiliates" && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Affiliate Requests ({affiliates.length})</h3>
            {affiliates.length === 0 ? (
              <div className="p-6 rounded-xl bg-white/5 border border-white/10 text-white/60">No affiliate requests</div>
            ) : (
              affiliates.map((affiliate: any) => (
                <motion.div key={affiliate.id} whileHover={{ x: 4 }} className="p-4 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-semibold">Affiliate ID: {affiliate.id}</h4>
                      <p className="text-white/60 text-sm">Earnings: ৳{(affiliate.totalEarnings || 0).toLocaleString()}</p>
                      <p className="text-white/40 text-xs mt-1">Transactions: {affiliate.transactionCount || 0}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 text-sm">
                        View Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}

        {/* Roles Tab */}
        {activeTab === "roles" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Manage Roles ({roles.length})</h3>
              <button 
                onClick={() => setShowNewRole(true)}
                className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg text-white font-semibold flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> New Role
              </button>
            </div>

            {/* Create New Role Form */}
            {showNewRole && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-4 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10">
                <h4 className="text-white font-semibold mb-4">Create New Role</h4>
                <div className="space-y-4">
                  <input 
                    type="text"
                    placeholder="Role name"
                    value={newRoleData.name}
                    onChange={(e) => setNewRoleData({ ...newRoleData, name: e.target.value })}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40"
                  />
                  <textarea 
                    placeholder="Access powers (comma-separated)"
                    value={newRoleData.powers}
                    onChange={(e) => setNewRoleData({ ...newRoleData, powers: e.target.value })}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 h-20"
                  />
                  <div className="flex gap-2">
                    <button 
                      onClick={createRole}
                      className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-white font-semibold flex items-center gap-2"
                    >
                      <Check className="w-4 h-4" /> Create
                    </button>
                    <button 
                      onClick={() => setShowNewRole(false)}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white font-semibold flex items-center gap-2"
                    >
                      <X className="w-4 h-4" /> Cancel
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Existing Roles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {roles.map((role: any) => {
                const roleColorMap: Record<string, string> = {
                  green: "text-green-400",
                  blue: "text-blue-400",
                  pink: "text-pink-400",
                  purple: "text-purple-400",
                  indigo: "text-indigo-400",
                };
                return (
                <motion.div key={role.id} whileHover={{ y: -4 }} className="p-4 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Shield className={`w-5 h-5 ${roleColorMap[role.color] || "text-purple-400"}`} />
                      <h4 className="text-white font-bold text-lg">{role.name}</h4>
                    </div>
                    {!["customer", "vendor", "affiliate", "admin"].includes(role.id) && (
                      <button 
                        onClick={() => deleteRole(role.id)}
                        className="p-1 hover:bg-red-500/20 rounded"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    )}
                  </div>
                  <div>
                    <p className="text-white/60 text-xs font-semibold mb-2">Access Powers:</p>
                    <ul className="space-y-1">
                      {(role.powers || []).map((power: string, idx: number) => (
                        <li key={idx} className="text-white/70 text-xs flex items-center gap-2">
                          <Check className="w-3 h-3 text-green-400" /> {power}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
              })}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
