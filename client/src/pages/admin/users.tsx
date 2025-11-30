import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Users, Shield, Plus, Trash2, Edit2, Check, X, Package, UserCheck, TrendingUp } from "lucide-react";

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [vendors, setVendors] = useState<any[]>([]);
  const [affiliates, setAffiliates] = useState<any[]>([]);
  const [roles, setRoles] = useState([
    { id: "admin", name: "Admin", color: "purple", powers: ["Full Access", "Manage Users", "Manage Products", "View Analytics"] },
    { id: "vendor", name: "Vendor", color: "blue", powers: ["Manage Own Products", "View Sales", "Manage Orders"] },
    { id: "affiliate", name: "Affiliate", color: "pink", powers: ["View Campaigns", "Track Earnings", "Share Links"] },
    { id: "customer", name: "Customer", color: "green", powers: ["Browse Products", "Make Purchases", "View Orders"] }
  ]);
  const [selectedTab, setSelectedTab] = useState("users");
  const [showNewRole, setShowNewRole] = useState(false);
  const [newRole, setNewRole] = useState({ name: "", powers: [] });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [usersRes, vendorsRes, affiliatesRes] = await Promise.all([
        fetch("/api/admin/users"),
        fetch("/api/admin/vendors"),
        fetch("/api/affiliate/stats")
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
    if (confirm("Are you sure? This action cannot be undone.")) {
      try {
        await fetch(`/api/admin/users/${userId}`, { method: "DELETE" });
        fetchAllData();
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    }
  };

  const createRole = () => {
    if (newRole.name.trim()) {
      setRoles([...roles, { 
        id: newRole.name.toLowerCase().replace(/\s+/g, "_"), 
        name: newRole.name, 
        color: "indigo",
        powers: newRole.powers || ["View Dashboard"] 
      }]);
      setNewRole({ name: "", powers: [] });
      setShowNewRole(false);
    }
  };

  const StatCard = ({ icon: Icon, label, value, color }: any) => (
    <motion.div whileHover={{ y: -5 }} className="p-4 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/60 text-sm">{label}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-lg bg-${color}-500/20`}>
          <Icon className={`w-6 h-6 text-${color}-400`} />
        </div>
      </div>
    </motion.div>
  );

  if (loading) return <div className="text-white text-center py-12 text-xl">Loading...</div>;

  const filteredUsers = users.filter(u => 
    u.username?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">User Management</h1>
          <p className="text-white/60 mt-2">Complete control center for users, vendors, affiliates & roles</p>
        </motion.div>

        {/* Summary Cards */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard icon={Users} label="Total Users" value={users.length} color="purple" />
          <StatCard icon={Package} label="Active Vendors" value={vendors.length} color="blue" />
          <StatCard icon={UserCheck} label="Affiliates" value={affiliates.length} color="pink" />
          <StatCard icon={Shield} label="Custom Roles" value={roles.length} color="green" />
        </motion.div>

        {/* Tabs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 20 }} className="mb-8 flex gap-2 border-b border-white/10">
          {["users", "vendors", "affiliates", "roles"].map(tab => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-6 py-3 font-semibold transition-all capitalize ${
                selectedTab === tab 
                  ? "border-b-2 border-purple-500 text-purple-400" 
                  : "text-white/60 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        {/* Users Tab */}
        {selectedTab === "users" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">All Users ({filteredUsers.length})</h3>
              <input 
                type="text" 
                placeholder="Search users..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40"
              />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-4 py-3 text-left text-white font-semibold">User</th>
                    <th className="px-4 py-3 text-left text-white font-semibold">Email</th>
                    <th className="px-4 py-3 text-left text-white font-semibold">Current Role</th>
                    <th className="px-4 py-3 text-left text-white font-semibold">Status</th>
                    <th className="px-4 py-3 text-right text-white font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredUsers.map((user: any) => (
                    <tr key={user.id} className="hover:bg-white/5">
                      <td className="px-4 py-3 text-white font-medium">{user.fullName || user.username}</td>
                      <td className="px-4 py-3 text-white/70">{user.email}</td>
                      <td className="px-4 py-3">
                        <select 
                          value={user.role}
                          onChange={(e) => updateUserRole(user.id, e.target.value)}
                          className="px-3 py-1 rounded bg-white/10 border border-white/20 text-white text-xs font-semibold"
                        >
                          {roles.map(r => (
                            <option key={r.id} value={r.id}>{r.name}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.isVerified ? "bg-green-500/20 text-green-400" : "bg-orange-500/20 text-orange-400"
                        }`}>
                          {user.isVerified ? "Verified" : "Pending"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right flex items-center justify-end gap-2">
                        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                          <Edit2 className="w-4 h-4 text-blue-400" />
                        </button>
                        <button onClick={() => deleteUser(user.id)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Vendors Tab */}
        {selectedTab === "vendors" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6">Vendor Requests & Management</h3>
            <div className="space-y-4">
              {vendors.length === 0 ? (
                <p className="text-white/60">No vendor requests at this time</p>
              ) : (
                vendors.map((vendor: any) => (
                  <motion.div key={vendor.id} whileHover={{ x: 4 }} className="p-4 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-semibold">{vendor.storeName}</h4>
                      <p className="text-white/60 text-sm">{vendor.contactEmail}</p>
                      <p className="text-white/40 text-xs mt-1">Commission: {vendor.commissionRate}%</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 flex items-center gap-2 text-sm font-semibold">
                        <Check className="w-4 h-4" /> Approve
                      </button>
                      <button className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 flex items-center gap-2 text-sm font-semibold">
                        <X className="w-4 h-4" /> Reject
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        )}

        {/* Affiliates Tab */}
        {selectedTab === "affiliates" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6">Affiliate Requests & Earnings</h3>
            <div className="space-y-4">
              {affiliates.length === 0 ? (
                <p className="text-white/60">No affiliate data available</p>
              ) : (
                affiliates.map((aff: any) => (
                  <motion.div key={aff.id} whileHover={{ x: 4 }} className="p-4 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="text-white font-semibold flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-pink-400" /> Affiliate ID: {aff.id}
                      </h4>
                      <p className="text-white/60 text-sm mt-1">Total Earnings: ৳{(aff.totalEarnings || 0).toLocaleString()}</p>
                      <p className="text-white/40 text-xs">Transactions: {aff.transactionCount || 0}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 text-sm font-semibold">
                        View Details
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        )}

        {/* Roles Tab */}
        {selectedTab === "roles" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {/* Existing Roles */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Active Roles</h3>
                <button 
                  onClick={() => setShowNewRole(true)}
                  className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg text-white font-semibold flex items-center gap-2 transition-colors"
                >
                  <Plus className="w-4 h-4" /> New Role
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {roles.map((role: any) => (
                  <motion.div key={role.id} whileHover={{ y: -4 }} className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-white font-bold text-lg flex items-center gap-2">
                        <Shield className={`w-5 h-5 text-${role.color}-400`} /> {role.name}
                      </h4>
                      <span className={`text-xs px-2 py-1 rounded bg-${role.color}-500/20 text-${role.color}-400`}>{role.id}</span>
                    </div>
                    <div className="space-y-2">
                      <p className="text-white/60 text-sm font-semibold">Access Powers:</p>
                      <ul className="space-y-1">
                        {(role.powers || []).map((power: string, idx: number) => (
                          <li key={idx} className="text-white/70 text-xs flex items-center gap-2">
                            <Check className="w-3 h-3 text-green-400" /> {power}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Create New Role */}
            {showNewRole && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-6 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">Create New Role</h3>
                <div className="space-y-4">
                  <input 
                    type="text"
                    placeholder="Role name (e.g., Moderator)"
                    value={newRole.name}
                    onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40"
                  />
                  <div>
                    <p className="text-white/60 text-sm mb-2">Access Powers (comma-separated):</p>
                    <textarea 
                      placeholder="e.g., View Dashboard, Manage Products, View Reports"
                      value={newRole.powers.join(", ")}
                      onChange={(e) => setNewRole({ ...newRole, powers: e.target.value.split(",").map(p => p.trim()) })}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 h-24"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={createRole}
                      className="px-6 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-white font-semibold flex items-center gap-2"
                    >
                      <Check className="w-4 h-4" /> Create
                    </button>
                    <button 
                      onClick={() => setShowNewRole(false)}
                      className="px-6 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white font-semibold flex items-center gap-2"
                    >
                      <X className="w-4 h-4" /> Cancel
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
