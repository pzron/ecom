import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Users, Search, Plus, Filter, MoreVertical,
  Phone, Mail, Building, Calendar, Star,
  ArrowRight, CheckCircle2
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const leads = [
  { id: 1, name: "TechVentures Inc.", contact: "Kamal Hossain", email: "kamal@techventures.com", phone: "+880 1712-345678", source: "Website", status: "new", score: 85, value: "৳250,000", lastContact: "Dec 5, 2024" },
  { id: 2, name: "Digital Dynamics", contact: "Sabrina Ahmed", email: "sabrina@digitaldynamics.com", phone: "+880 1812-456789", source: "Referral", status: "contacted", score: 72, value: "৳180,000", lastContact: "Dec 4, 2024" },
  { id: 3, name: "StartUp Hub BD", contact: "Rafiq Islam", email: "rafiq@startuphub.com", phone: "+880 1912-567890", source: "Trade Show", status: "qualified", score: 90, value: "৳420,000", lastContact: "Dec 3, 2024" },
  { id: 4, name: "MegaMart Retail", contact: "Fatima Khan", email: "fatima@megamart.com", phone: "+880 1612-678901", source: "Cold Call", status: "new", score: 45, value: "৳75,000", lastContact: "Dec 5, 2024" },
  { id: 5, name: "Cloud Solutions Ltd.", contact: "Ahmed Rahman", email: "ahmed@cloudsolutions.com", phone: "+880 1512-789012", source: "LinkedIn", status: "qualified", score: 88, value: "৳350,000", lastContact: "Dec 2, 2024" },
  { id: 6, name: "E-Commerce Plus", contact: "Nadia Begum", email: "nadia@ecomplus.com", phone: "+880 1412-890123", source: "Website", status: "contacted", score: 65, value: "৳120,000", lastContact: "Dec 4, 2024" },
  { id: 7, name: "Innovation Labs", contact: "Imran Hossain", email: "imran@innovlabs.com", phone: "+880 1312-901234", source: "Referral", status: "new", score: 78, value: "৳280,000", lastContact: "Dec 5, 2024" },
  { id: 8, name: "Smart Systems BD", contact: "Tasnim Akter", email: "tasnim@smartsystems.com", phone: "+880 1212-012345", source: "Website", status: "qualified", score: 92, value: "৳500,000", lastContact: "Dec 1, 2024" },
];

const leadSources = ["All Sources", "Website", "Referral", "Trade Show", "Cold Call", "LinkedIn", "Email Campaign"];
const leadStatuses = ["All Statuses", "New", "Contacted", "Qualified", "Proposal", "Negotiation"];

export default function SalesLeads() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSource, setSelectedSource] = useState("All Sources");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          lead.contact.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSource = selectedSource === "All Sources" || lead.source === selectedSource;
    const matchesStatus = selectedStatus === "All Statuses" || lead.status.toLowerCase() === selectedStatus.toLowerCase();
    return matchesSearch && matchesSource && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      new: "bg-blue-500/20 text-blue-400",
      contacted: "bg-yellow-500/20 text-yellow-400",
      qualified: "bg-green-500/20 text-green-400",
      proposal: "bg-purple-500/20 text-purple-400",
      negotiation: "bg-orange-500/20 text-orange-400",
    };
    return styles[status] || "bg-white/10 text-white";
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    return "text-orange-400";
  };

  return (
    <DashboardLayout role="sales">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-heading font-bold text-white">Leads</h1>
            <p className="text-white/60">Manage and convert your sales leads</p>
          </div>
          <Button className="bg-gradient-to-r from-green-500 to-cyan-500">
            <Plus className="w-4 h-4 mr-2" />
            Add Lead
          </Button>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}>
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-4">
                <p className="text-sm text-white/60">Total Leads</p>
                <p className="text-2xl font-bold text-white mt-1">{leads.length}</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-4">
                <p className="text-sm text-white/60">New This Week</p>
                <p className="text-2xl font-bold text-white mt-1">{leads.filter(l => l.status === 'new').length}</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-4">
                <p className="text-sm text-white/60">Qualified</p>
                <p className="text-2xl font-bold text-white mt-1">{leads.filter(l => l.status === 'qualified').length}</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-4">
                <p className="text-sm text-white/60">Pipeline Value</p>
                <p className="text-2xl font-bold text-white mt-1">৳2.2M</p>
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
                    placeholder="Search leads..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={selectedSource}
                    onChange={(e) => setSelectedSource(e.target.value)}
                    className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm"
                  >
                    {leadSources.map(source => (
                      <option key={source} value={source} className="bg-gray-900">{source}</option>
                    ))}
                  </select>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm"
                  >
                    {leadStatuses.map(status => (
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
                <CardTitle className="text-white">Lead Pipeline ({filteredLeads.length})</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredLeads.map((lead) => (
                  <div key={lead.id} className="p-4 rounded-lg bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                          <Building className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-base font-medium text-white">{lead.name}</h4>
                            <Badge className={getStatusBadge(lead.status)}>
                              {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                            </Badge>
                          </div>
                          <p className="text-sm text-white/60">{lead.contact}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-medium text-green-400">{lead.value}</p>
                        <div className="flex items-center gap-1 justify-end">
                          <Star className={`w-4 h-4 ${getScoreColor(lead.score)}`} />
                          <span className={`text-sm font-medium ${getScoreColor(lead.score)}`}>{lead.score}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-white/60">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {lead.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {lead.phone}
                        </span>
                        <Badge variant="outline" className="border-white/10">{lead.source}</Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="h-8 border-white/10">
                          <Phone className="w-3 h-3 mr-1" />
                          Call
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 border-white/10">
                          <Mail className="w-3 h-3 mr-1" />
                          Email
                        </Button>
                        <Button size="sm" className="h-8 bg-green-500/20 text-green-400 hover:bg-green-500/30">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Convert
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
