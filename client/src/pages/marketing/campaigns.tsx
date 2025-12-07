import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Megaphone, Search, Plus, Filter, MoreVertical,
  Calendar, DollarSign, Users, Target, TrendingUp,
  Play, Pause, Edit, Trash2, Eye
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const campaigns = [
  { id: 1, name: "Holiday Sale 2024", type: "Email + Social", status: "active", startDate: "Dec 1, 2024", endDate: "Dec 25, 2024", reach: "45.2K", impressions: "128.5K", clicks: "8.2K", conversions: 1240, budget: "৳50,000", spent: "৳32,500", roi: "+156%" },
  { id: 2, name: "New Year Promo", type: "Social Media", status: "scheduled", startDate: "Dec 26, 2024", endDate: "Jan 5, 2025", reach: "-", impressions: "-", clicks: "-", conversions: 0, budget: "৳75,000", spent: "৳0", roi: "-" },
  { id: 3, name: "Flash Friday", type: "Email", status: "active", startDate: "Nov 29, 2024", endDate: "Dec 31, 2024", reach: "28.5K", impressions: "85.2K", clicks: "5.8K", conversions: 856, budget: "৳25,000", spent: "৳18,200", roi: "+210%" },
  { id: 4, name: "Combo Deals Push", type: "Display Ads", status: "active", startDate: "Nov 15, 2024", endDate: "Dec 31, 2024", reach: "92.1K", impressions: "312.5K", clicks: "18.2K", conversions: 2150, budget: "৳100,000", spent: "৳67,800", roi: "+185%" },
  { id: 5, name: "Black Friday 2024", type: "Multi-channel", status: "completed", startDate: "Nov 24, 2024", endDate: "Nov 27, 2024", reach: "156.2K", impressions: "520.8K", clicks: "42.5K", conversions: 5840, budget: "৳150,000", spent: "৳148,500", roi: "+320%" },
  { id: 6, name: "Tech Week Special", type: "Social + Email", status: "paused", startDate: "Dec 5, 2024", endDate: "Dec 12, 2024", reach: "18.5K", impressions: "45.2K", clicks: "2.1K", conversions: 320, budget: "৳30,000", spent: "৳12,800", roi: "+85%" },
];

const campaignTypes = ["All Types", "Email", "Social Media", "Display Ads", "Multi-channel", "Email + Social", "Social + Email"];
const campaignStatuses = ["All Statuses", "Active", "Scheduled", "Paused", "Completed"];

export default function MarketingCampaigns() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "All Types" || campaign.type === selectedType;
    const matchesStatus = selectedStatus === "All Statuses" || campaign.status.toLowerCase() === selectedStatus.toLowerCase();
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      active: "bg-green-500/20 text-green-400",
      scheduled: "bg-blue-500/20 text-blue-400",
      paused: "bg-yellow-500/20 text-yellow-400",
      completed: "bg-purple-500/20 text-purple-400",
    };
    return styles[status] || "bg-white/10 text-white";
  };

  return (
    <DashboardLayout role="marketing">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-heading font-bold text-white">Campaigns</h1>
            <p className="text-white/60">Manage and track your marketing campaigns</p>
          </div>
          <Button className="bg-gradient-to-r from-pink-500 to-purple-500">
            <Plus className="w-4 h-4 mr-2" />
            Create Campaign
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
                    placeholder="Search campaigns..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm"
                  >
                    {campaignTypes.map(type => (
                      <option key={type} value={type} className="bg-gray-900">{type}</option>
                    ))}
                  </select>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm"
                  >
                    {campaignStatuses.map(status => (
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
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-pink-500/20">
                  <Megaphone className="w-5 h-5 text-pink-400" />
                </div>
                <CardTitle className="text-white">All Campaigns ({filteredCampaigns.length})</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredCampaigns.map((campaign) => (
                  <div key={campaign.id} className="p-4 rounded-lg bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <h4 className="text-base font-medium text-white">{campaign.name}</h4>
                          <Badge className={getStatusBadge(campaign.status)}>
                            {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-white/60 mt-1">
                          <Badge variant="outline" className="border-white/10">{campaign.type}</Badge>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {campaign.startDate} - {campaign.endDate}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {campaign.status === 'active' ? (
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0 border-white/10">
                            <Pause className="w-3 h-3" />
                          </Button>
                        ) : campaign.status === 'paused' ? (
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0 border-white/10">
                            <Play className="w-3 h-3" />
                          </Button>
                        ) : null}
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0 border-white/10">
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0 border-white/10">
                          <Edit className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 text-sm">
                      <div>
                        <p className="text-white/40 text-xs">Reach</p>
                        <p className="text-white font-medium">{campaign.reach}</p>
                      </div>
                      <div>
                        <p className="text-white/40 text-xs">Impressions</p>
                        <p className="text-white font-medium">{campaign.impressions}</p>
                      </div>
                      <div>
                        <p className="text-white/40 text-xs">Clicks</p>
                        <p className="text-white font-medium">{campaign.clicks}</p>
                      </div>
                      <div>
                        <p className="text-white/40 text-xs">Conversions</p>
                        <p className="text-white font-medium">{campaign.conversions.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-white/40 text-xs">Budget</p>
                        <p className="text-white font-medium">{campaign.budget}</p>
                      </div>
                      <div>
                        <p className="text-white/40 text-xs">Spent</p>
                        <p className="text-white font-medium">{campaign.spent}</p>
                      </div>
                      <div>
                        <p className="text-white/40 text-xs">ROI</p>
                        <p className={`font-medium ${campaign.roi.startsWith('+') ? 'text-green-400' : 'text-white'}`}>{campaign.roi}</p>
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
