import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Copy, Plus, ExternalLink, BarChart2, Link2, TrendingUp,
  Search, Filter, Share2, Settings, Eye, Pause, Play,
  ArrowUpRight, ArrowDownRight, Target, MousePointer,
  DollarSign, RefreshCw, Calendar, Sparkles, ChevronRight,
  Globe, Edit, Trash2, MoreVertical, Zap
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { 
  AreaChart, Area, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip,
  BarChart, Bar
} from "recharts";

const campaigns = [
  { 
    id: 1,
    name: "Summer Tech Sale", 
    link: "nex.com/ref/summer-24", 
    clicks: 1240, 
    conversions: 89,
    convRate: "7.2%",
    earned: "৳45,000", 
    status: "active",
    trend: "+23%",
    commission: "15%",
    created: "Nov 1, 2024"
  },
  { 
    id: 2,
    name: "iPhone 15 Pro Launch", 
    link: "nex.com/ref/iphone-15", 
    clicks: 892, 
    conversions: 156,
    convRate: "17.5%",
    earned: "৳89,000", 
    status: "active",
    trend: "+45%",
    commission: "10%",
    created: "Oct 15, 2024"
  },
  { 
    id: 3,
    name: "Gaming Week Promo", 
    link: "nex.com/ref/gamer", 
    clicks: 450, 
    conversions: 34,
    convRate: "7.6%",
    earned: "৳12,000", 
    status: "paused",
    trend: "-5%",
    commission: "12%",
    created: "Oct 1, 2024"
  },
  { 
    id: 4,
    name: "Black Friday Early Access", 
    link: "nex.com/ref/bf-2024", 
    clicks: 2100, 
    conversions: 234,
    convRate: "11.1%",
    earned: "৳124,000", 
    status: "featured",
    trend: "+67%",
    commission: "20%",
    created: "Nov 20, 2024"
  },
  { 
    id: 5,
    name: "AirPods Bundle Deal", 
    link: "nex.com/ref/airpods", 
    clicks: 678, 
    conversions: 45,
    convRate: "6.6%",
    earned: "৳28,500", 
    status: "active",
    trend: "+12%",
    commission: "12%",
    created: "Nov 10, 2024"
  },
];

const campaignPerformance = [
  { name: 'Week 1', clicks: 890, conversions: 45 },
  { name: 'Week 2', clicks: 1200, conversions: 78 },
  { name: 'Week 3', clicks: 980, conversions: 56 },
  { name: 'Week 4', clicks: 1450, conversions: 112 },
];

const topProducts = [
  { name: "iPhone 15 Pro", clicks: 456, conv: 89, earnings: "৳45K" },
  { name: "MacBook Pro", clicks: 234, conv: 34, earnings: "৳28K" },
  { name: "AirPods Pro 2", clicks: 345, conv: 56, earnings: "৳18K" },
  { name: "Apple Watch", clicks: 189, conv: 23, earnings: "৳12K" },
];

function HolographicCard({ 
  children, 
  className = "",
  glowColor = "purple"
}: { 
  children: React.ReactNode; 
  className?: string;
  glowColor?: "purple" | "pink" | "cyan" | "green" | "orange" | "yellow";
}) {
  const glowColors = {
    purple: "from-purple-500/20 via-purple-500/5 to-transparent shadow-purple-500/10",
    pink: "from-pink-500/20 via-pink-500/5 to-transparent shadow-pink-500/10",
    cyan: "from-cyan-500/20 via-cyan-500/5 to-transparent shadow-cyan-500/10",
    green: "from-green-500/20 via-green-500/5 to-transparent shadow-green-500/10",
    orange: "from-orange-500/20 via-orange-500/5 to-transparent shadow-orange-500/10",
    yellow: "from-yellow-500/20 via-yellow-500/5 to-transparent shadow-yellow-500/10",
  };

  return (
    <div className={`relative group ${className}`}>
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${glowColors[glowColor]} rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500`} />
      <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {children}
      </div>
    </div>
  );
}

function CampaignKPI({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  color,
  delay = 0
}: { 
  title: string;
  value: string;
  change: string;
  icon: any;
  color: "purple" | "pink" | "cyan" | "green" | "orange" | "yellow";
  delay?: number;
}) {
  const colorClasses = {
    purple: "text-purple-400 bg-purple-500/20",
    pink: "text-pink-400 bg-pink-500/20",
    cyan: "text-cyan-400 bg-cyan-500/20",
    green: "text-green-400 bg-green-500/20",
    orange: "text-orange-400 bg-orange-500/20",
    yellow: "text-yellow-400 bg-yellow-500/20",
  };

  const isPositive = change.startsWith('+');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
    >
      <HolographicCard glowColor={color}>
        <div className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2.5 rounded-xl ${colorClasses[color]}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div className={`flex items-center gap-1 text-xs font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              {change}
            </div>
          </div>
          <h3 className="text-xs font-medium text-white/60 mb-1">{title}</h3>
          <span className="text-2xl font-bold text-white">{value}</span>
        </div>
      </HolographicCard>
    </motion.div>
  );
}

function CampaignStatus({ status }: { status: string }) {
  const styles: Record<string, { bg: string; text: string; label: string }> = {
    active: { bg: "bg-green-500/10", text: "text-green-400", label: "Active" },
    paused: { bg: "bg-yellow-500/10", text: "text-yellow-400", label: "Paused" },
    featured: { bg: "bg-purple-500/10", text: "text-purple-400", label: "Featured" },
    ended: { bg: "bg-gray-500/10", text: "text-gray-400", label: "Ended" },
  };

  const style = styles[status] || styles.active;

  return (
    <Badge className={`${style.bg} ${style.text} border-none`}>
      {status === 'featured' && <Sparkles className="w-3 h-3 mr-1" />}
      {style.label}
    </Badge>
  );
}

export default function AffiliateCampaigns() {
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [urlInput, setUrlInput] = useState("");

  const copyLink = (link: string) => {
    navigator.clipboard.writeText(`https://${link}`);
    setCopiedLink(link);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  return (
    <DashboardLayout role="affiliate">
      <div className="space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-heading font-bold bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                My Campaigns
              </h1>
              <Badge variant="outline" className="border-purple-500/30 text-purple-400 bg-purple-500/10">
                {campaigns.length} Active
              </Badge>
            </div>
            <p className="text-white/60">Create referral links and track campaign performance</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" className="border-white/10 bg-white/5 hover:bg-white/10">
              <RefreshCw className="w-4 h-4" />
            </Button>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              <Plus className="w-4 h-4 mr-2" />
              New Campaign
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <CampaignKPI 
            title="Total Campaigns" 
            value="5" 
            change="+2" 
            icon={Target} 
            color="purple"
            delay={0}
          />
          <CampaignKPI 
            title="Total Clicks" 
            value="5,360" 
            change="+28.4%" 
            icon={MousePointer} 
            color="cyan"
            delay={0.1}
          />
          <CampaignKPI 
            title="Conversions" 
            value="558" 
            change="+35.2%" 
            icon={TrendingUp} 
            color="green"
            delay={0.2}
          />
          <CampaignKPI 
            title="Total Earnings" 
            value="৳298K" 
            change="+42.1%" 
            icon={DollarSign} 
            color="yellow"
            delay={0.3}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <HolographicCard glowColor="cyan">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-cyan-500/20">
                  <Link2 className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Quick Link Generator</h3>
                  <p className="text-sm text-white/60">Paste any product URL to create an affiliate link</p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <Input 
                    placeholder="Paste product URL here (e.g., nexcommerce.com/product/iphone-15)" 
                    className="bg-white/5 border-white/10 pl-10"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                  />
                </div>
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                  <Zap className="w-4 h-4 mr-2" />
                  Generate Link
                </Button>
              </div>
              
              {urlInput && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 p-4 rounded-xl bg-green-500/10 border border-green-500/20"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-white/60 mb-1">Your Affiliate Link:</p>
                      <p className="font-mono text-green-400">nex.com/ref/your-link-123</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-green-500/30 text-green-400 hover:bg-green-500/10">
                        <Copy className="w-3 h-3 mr-1" /> Copy
                      </Button>
                      <Button size="sm" variant="outline" className="border-white/10 hover:bg-white/10">
                        <Share2 className="w-3 h-3 mr-1" /> Share
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </HolographicCard>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2"
          >
            <HolographicCard glowColor="purple">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-500/20">
                      <BarChart2 className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Campaign Performance</h3>
                      <p className="text-sm text-white/60">Monthly clicks vs conversions</p>
                    </div>
                  </div>
                  <div className="flex gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-purple-500" />
                      <span className="text-white/60">Clicks</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-cyan-500" />
                      <span className="text-white/60">Conversions</span>
                    </div>
                  </div>
                </div>
                
                <div className="h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={campaignPerformance}>
                      <defs>
                        <linearGradient id="clicksGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="convGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(10, 10, 15, 0.95)', 
                          border: '1px solid rgba(255,255,255,0.1)', 
                          borderRadius: '12px' 
                        }}
                      />
                      <Area type="monotone" dataKey="clicks" stroke="#a855f7" strokeWidth={3} fill="url(#clicksGrad)" />
                      <Area type="monotone" dataKey="conversions" stroke="#06b6d4" strokeWidth={3} fill="url(#convGrad)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </HolographicCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <HolographicCard glowColor="green">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-green-500/20">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Top Products</h3>
                    <p className="text-sm text-white/60">Best performing items</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {topProducts.map((product, i) => (
                    <motion.div
                      key={product.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + i * 0.1 }}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-colors"
                    >
                      <div>
                        <p className="font-medium text-white text-sm">{product.name}</p>
                        <p className="text-xs text-white/60">{product.clicks} clicks • {product.conv} conv</p>
                      </div>
                      <span className="font-bold text-green-400">{product.earnings}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </HolographicCard>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <HolographicCard glowColor="pink">
            <div className="p-4 border-b border-white/5">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <div className="relative flex-1 md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <Input 
                      placeholder="Search campaigns..." 
                      className="pl-10 bg-white/5 border-white/10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="icon" className="border-white/10 bg-white/5 hover:bg-white/10">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Button variant="outline" size="sm" className="border-white/10 bg-white/10 text-white">
                    All
                  </Button>
                  <Button variant="outline" size="sm" className="border-white/10 bg-white/5 text-white/60">
                    Active
                  </Button>
                  <Button variant="outline" size="sm" className="border-white/10 bg-white/5 text-white/60">
                    Paused
                  </Button>
                  <Button variant="outline" size="sm" className="border-white/10 bg-white/5 text-white/60">
                    Featured
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {campaigns.map((campaign, i) => (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.05 }}
                  className={`p-4 rounded-xl border transition-all ${
                    campaign.status === 'featured'
                      ? 'bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30'
                      : 'bg-white/5 border-white/10 hover:bg-white/[0.08]'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-white">{campaign.name}</h4>
                        <CampaignStatus status={campaign.status} />
                        <Badge variant="outline" className="border-green-500/30 text-green-400 bg-green-500/10">
                          {campaign.commission}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-mono text-sm bg-black/20 px-2 py-1 rounded text-white/60">{campaign.link}</span>
                        <button 
                          onClick={() => copyLink(campaign.link)}
                          className="text-white/40 hover:text-white/60 transition-colors"
                        >
                          {copiedLink === campaign.link ? (
                            <span className="text-green-400 text-xs">Copied!</span>
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                      <p className="text-xs text-white/40">Created {campaign.created}</p>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="grid grid-cols-4 gap-4 text-center">
                        <div>
                          <div className="text-xs text-white/40 mb-1">Clicks</div>
                          <div className="font-bold text-white">{campaign.clicks.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-xs text-white/40 mb-1">Conv.</div>
                          <div className="font-bold text-white">{campaign.conversions}</div>
                        </div>
                        <div>
                          <div className="text-xs text-white/40 mb-1">Rate</div>
                          <div className="font-bold text-cyan-400">{campaign.convRate}</div>
                        </div>
                        <div>
                          <div className="text-xs text-white/40 mb-1">Earned</div>
                          <div className="font-bold text-green-400">{campaign.earned}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 border-l border-white/10 pl-4">
                        <div className={`flex items-center gap-1 text-xs font-medium ${
                          campaign.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {campaign.trend.startsWith('+') ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                          {campaign.trend}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10">
                          <Share2 className="w-4 h-4 text-white/60" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10">
                          <BarChart2 className="w-4 h-4 text-white/60" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10">
                          {campaign.status === 'paused' ? (
                            <Play className="w-4 h-4 text-white/60" />
                          ) : (
                            <Pause className="w-4 h-4 text-white/60" />
                          )}
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10">
                          <MoreVertical className="w-4 h-4 text-white/60" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-4 border-t border-white/5 flex items-center justify-between">
              <p className="text-sm text-white/40">Showing {campaigns.length} campaigns</p>
              <Button variant="ghost" className="text-purple-400 hover:text-purple-300">
                View All Campaigns <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </HolographicCard>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
