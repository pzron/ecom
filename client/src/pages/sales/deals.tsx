import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  DollarSign, Search, Plus, Filter,
  Building, Calendar, User, TrendingUp,
  Eye, Edit, MoreVertical
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const deals = [
  { id: 1, name: "Enterprise Tech Package", company: "TechCorp Ltd.", value: "৳125,000", stage: "Closed Won", probability: 100, owner: "Ahmed Rahman", closeDate: "Dec 5, 2024", created: "Nov 1, 2024" },
  { id: 2, name: "Premium Hardware Bundle", company: "Digital Solutions", value: "৳85,000", stage: "Negotiation", probability: 75, owner: "Fatima Khan", closeDate: "Dec 12, 2024", created: "Nov 15, 2024" },
  { id: 3, name: "Growth Software Pack", company: "StartupXYZ", value: "৳45,000", stage: "Proposal", probability: 50, owner: "Rafiq Islam", closeDate: "Dec 15, 2024", created: "Nov 20, 2024" },
  { id: 4, name: "Bulk Electronics Order", company: "MegaRetail Inc.", value: "৳320,000", stage: "Qualified", probability: 30, owner: "Marium Begum", closeDate: "Dec 20, 2024", created: "Nov 25, 2024" },
  { id: 5, name: "Cloud Infrastructure Deal", company: "Cloud Solutions Ltd.", value: "৳180,000", stage: "Proposal", probability: 60, owner: "Ahmed Rahman", closeDate: "Dec 18, 2024", created: "Nov 10, 2024" },
  { id: 6, name: "Smart Office Setup", company: "Innovation Labs", value: "৳95,000", stage: "Negotiation", probability: 80, owner: "Fatima Khan", closeDate: "Dec 10, 2024", created: "Nov 5, 2024" },
  { id: 7, name: "Annual Maintenance Contract", company: "E-Commerce Plus", value: "৳72,000", stage: "Closed Won", probability: 100, owner: "Rafiq Islam", closeDate: "Dec 1, 2024", created: "Oct 20, 2024" },
  { id: 8, name: "Data Center Equipment", company: "Smart Systems BD", value: "৳450,000", stage: "Qualified", probability: 25, owner: "Marium Begum", closeDate: "Dec 30, 2024", created: "Nov 28, 2024" },
];

const stages = ["All Stages", "Qualified", "Proposal", "Negotiation", "Closed Won", "Closed Lost"];

export default function SalesDeals() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStage, setSelectedStage] = useState("All Stages");

  const filteredDeals = deals.filter(deal => {
    const matchesSearch = deal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          deal.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStage = selectedStage === "All Stages" || deal.stage === selectedStage;
    return matchesSearch && matchesStage;
  });

  const getStageBadge = (stage: string) => {
    const styles: Record<string, string> = {
      "Qualified": "bg-blue-500/20 text-blue-400",
      "Proposal": "bg-purple-500/20 text-purple-400",
      "Negotiation": "bg-orange-500/20 text-orange-400",
      "Closed Won": "bg-green-500/20 text-green-400",
      "Closed Lost": "bg-red-500/20 text-red-400",
    };
    return styles[stage] || "bg-white/10 text-white";
  };

  const totalValue = filteredDeals.reduce((sum, deal) => {
    const value = parseInt(deal.value.replace(/[৳,]/g, ''));
    return sum + value;
  }, 0);

  const wonValue = deals.filter(d => d.stage === 'Closed Won').reduce((sum, deal) => {
    const value = parseInt(deal.value.replace(/[৳,]/g, ''));
    return sum + value;
  }, 0);

  return (
    <DashboardLayout role="sales">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-heading font-bold text-white">Deals</h1>
            <p className="text-white/60">Track and manage your sales opportunities</p>
          </div>
          <Button className="bg-gradient-to-r from-green-500 to-cyan-500">
            <Plus className="w-4 h-4 mr-2" />
            New Deal
          </Button>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}>
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-4">
                <p className="text-sm text-white/60">Total Deals</p>
                <p className="text-2xl font-bold text-white mt-1">{deals.length}</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-4">
                <p className="text-sm text-white/60">Pipeline Value</p>
                <p className="text-2xl font-bold text-white mt-1">৳{(totalValue / 1000000).toFixed(2)}M</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-4">
                <p className="text-sm text-white/60">Closed Won</p>
                <p className="text-2xl font-bold text-green-400 mt-1">৳{(wonValue / 1000).toFixed(0)}K</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-4">
                <p className="text-sm text-white/60">Avg. Deal Size</p>
                <p className="text-2xl font-bold text-white mt-1">৳{(totalValue / deals.length / 1000).toFixed(0)}K</p>
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
                    placeholder="Search deals..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={selectedStage}
                    onChange={(e) => setSelectedStage(e.target.value)}
                    className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm"
                  >
                    {stages.map(stage => (
                      <option key={stage} value={stage} className="bg-gray-900">{stage}</option>
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
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/20">
                  <DollarSign className="w-5 h-5 text-green-400" />
                </div>
                <CardTitle className="text-white">Active Deals ({filteredDeals.length})</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Deal</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Company</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Value</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Stage</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Probability</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Owner</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Close Date</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDeals.map((deal) => (
                      <tr key={deal.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-4 px-4">
                          <p className="text-sm font-medium text-white">{deal.name}</p>
                          <p className="text-xs text-white/40">Created {deal.created}</p>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Building className="w-4 h-4 text-white/40" />
                            <span className="text-sm text-white">{deal.company}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm font-medium text-green-400">{deal.value}</span>
                        </td>
                        <td className="py-4 px-4">
                          <Badge className={getStageBadge(deal.stage)}>{deal.stage}</Badge>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-white/5 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${deal.probability >= 75 ? 'bg-green-500' : deal.probability >= 50 ? 'bg-yellow-500' : 'bg-orange-500'}`}
                                style={{ width: `${deal.probability}%` }}
                              />
                            </div>
                            <span className="text-sm text-white">{deal.probability}%</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
                              {deal.owner.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="text-sm text-white/60">{deal.owner}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1 text-sm text-white/60">
                            <Calendar className="w-3 h-3" />
                            {deal.closeDate}
                          </div>
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
