import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  FileText, Search, Plus, Filter, MoreVertical,
  Eye, Heart, MessageCircle, Calendar, Edit,
  Trash2, Image, Video, Mail
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const contentItems = [
  { id: 1, title: "iPhone 15 Pro Max Complete Review", type: "Blog", status: "published", author: "Sarah Chen", publishDate: "Dec 2, 2024", views: "12.5K", engagement: "8.2%", thumbnail: true },
  { id: 2, title: "Holiday Gift Guide 2024", type: "Blog", status: "published", author: "Mike Johnson", publishDate: "Dec 1, 2024", views: "9.8K", engagement: "12.1%", thumbnail: true },
  { id: 3, title: "Unboxing: Samsung Galaxy S24", type: "Video", status: "published", author: "Emma Davis", publishDate: "Nov 28, 2024", views: "28.2K", engagement: "15.3%", thumbnail: true },
  { id: 4, title: "Tech Deals Weekly Newsletter", type: "Newsletter", status: "published", author: "Lisa Wang", publishDate: "Dec 5, 2024", views: "6.5K", engagement: "6.8%", thumbnail: false },
  { id: 5, title: "Best Budget Smartphones 2024", type: "Blog", status: "draft", author: "John Smith", publishDate: "-", views: "-", engagement: "-", thumbnail: true },
  { id: 6, title: "Smart Home Essentials Guide", type: "Blog", status: "scheduled", author: "Sarah Chen", publishDate: "Dec 10, 2024", views: "-", engagement: "-", thumbnail: true },
  { id: 7, title: "MacBook Pro vs Dell XPS Comparison", type: "Video", status: "draft", author: "Emma Davis", publishDate: "-", views: "-", engagement: "-", thumbnail: true },
  { id: 8, title: "Flash Sale Announcement", type: "Newsletter", status: "scheduled", author: "Mike Johnson", publishDate: "Dec 8, 2024", views: "-", engagement: "-", thumbnail: false },
];

const contentTypes = ["All Types", "Blog", "Video", "Newsletter", "Social Post"];
const contentStatuses = ["All Statuses", "Published", "Draft", "Scheduled"];

export default function MarketingContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");

  const filteredContent = contentItems.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "All Types" || content.type === selectedType;
    const matchesStatus = selectedStatus === "All Statuses" || content.status.toLowerCase() === selectedStatus.toLowerCase();
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      published: "bg-green-500/20 text-green-400",
      draft: "bg-yellow-500/20 text-yellow-400",
      scheduled: "bg-blue-500/20 text-blue-400",
    };
    return styles[status] || "bg-white/10 text-white";
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Blog": return <FileText className="w-4 h-4" />;
      case "Video": return <Video className="w-4 h-4" />;
      case "Newsletter": return <Mail className="w-4 h-4" />;
      default: return <Image className="w-4 h-4" />;
    }
  };

  const contentStats = [
    { label: "Total Content", value: contentItems.length },
    { label: "Published", value: contentItems.filter(c => c.status === 'published').length },
    { label: "Drafts", value: contentItems.filter(c => c.status === 'draft').length },
    { label: "Scheduled", value: contentItems.filter(c => c.status === 'scheduled').length },
  ];

  return (
    <DashboardLayout role="marketing">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-heading font-bold text-white">Content</h1>
            <p className="text-white/60">Manage marketing content and publications</p>
          </div>
          <Button className="bg-gradient-to-r from-pink-500 to-purple-500">
            <Plus className="w-4 h-4 mr-2" />
            Create Content
          </Button>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {contentStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-4">
                  <p className="text-sm text-white/60">{stat.label}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
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
                    placeholder="Search content..."
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
                    {contentTypes.map(type => (
                      <option key={type} value={type} className="bg-gray-900">{type}</option>
                    ))}
                  </select>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm"
                  >
                    {contentStatuses.map(status => (
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
                <div className="p-2 rounded-lg bg-purple-500/20">
                  <FileText className="w-5 h-5 text-purple-400" />
                </div>
                <CardTitle className="text-white">Content Library ({filteredContent.length})</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredContent.map((content) => (
                  <div key={content.id} className="p-4 rounded-lg bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-colors">
                    <div className="flex items-start gap-4">
                      {content.thumbnail && (
                        <div className="w-24 h-16 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
                          {getTypeIcon(content.type)}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h4 className="text-base font-medium text-white">{content.title}</h4>
                            <div className="flex items-center gap-3 text-xs text-white/60 mt-1">
                              <Badge variant="outline" className="border-white/10">
                                {getTypeIcon(content.type)}
                                <span className="ml-1">{content.type}</span>
                              </Badge>
                              <span>By {content.author}</span>
                              {content.publishDate !== "-" && (
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {content.publishDate}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusBadge(content.status)}>
                              {content.status.charAt(0).toUpperCase() + content.status.slice(1)}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-4 text-xs text-white/60">
                            {content.views !== "-" && (
                              <>
                                <span className="flex items-center gap-1">
                                  <Eye className="w-3 h-3" />
                                  {content.views}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Heart className="w-3 h-3" />
                                  {content.engagement}
                                </span>
                              </>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="h-8 border-white/10">
                              <Eye className="w-3 h-3 mr-1" />
                              View
                            </Button>
                            <Button size="sm" variant="outline" className="h-8 border-white/10">
                              <Edit className="w-3 h-3 mr-1" />
                              Edit
                            </Button>
                            <Button size="sm" variant="outline" className="h-8 w-8 p-0 border-white/10">
                              <MoreVertical className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
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
