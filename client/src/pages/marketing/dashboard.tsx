import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, Users, Eye, MousePointer,
  Share2, Target, BarChart3, Megaphone,
  ArrowUpRight, ArrowDownRight, Calendar, Plus
} from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from "recharts";
import { motion } from "framer-motion";
import { Link } from "wouter";

const trafficData = [
  { day: 'Mon', visitors: 2400, pageViews: 4800 },
  { day: 'Tue', visitors: 1398, pageViews: 3200 },
  { day: 'Wed', visitors: 9800, pageViews: 15600 },
  { day: 'Thu', visitors: 3908, pageViews: 6500 },
  { day: 'Fri', visitors: 4800, pageViews: 8200 },
  { day: 'Sat', visitors: 3800, pageViews: 6100 },
  { day: 'Sun', visitors: 4300, pageViews: 7200 },
];

const trafficSources = [
  { name: 'Organic Search', value: 45, color: '#3b82f6' },
  { name: 'Social Media', value: 25, color: '#10b981' },
  { name: 'Direct', value: 15, color: '#f59e0b' },
  { name: 'Referral', value: 10, color: '#8b5cf6' },
  { name: 'Email', value: 5, color: '#ec4899' },
];

const activeCampaigns = [
  { id: 1, name: "Holiday Sale 2024", type: "Email + Social", status: "active", reach: "45.2K", conversions: 1240, budget: "৳50,000", spent: "৳32,500" },
  { id: 2, name: "New Year Promo", type: "Social Media", status: "scheduled", reach: "-", conversions: 0, budget: "৳75,000", spent: "৳0" },
  { id: 3, name: "Flash Friday", type: "Email", status: "active", reach: "28.5K", conversions: 856, budget: "৳25,000", spent: "৳18,200" },
  { id: 4, name: "Combo Deals Push", type: "Display Ads", status: "active", reach: "92.1K", conversions: 2150, budget: "৳100,000", spent: "৳67,800" },
];

const topContent = [
  { title: "iPhone 15 Pro Max Review", views: "12.5K", engagement: "8.2%", type: "Blog" },
  { title: "Holiday Gift Guide 2024", views: "9.8K", engagement: "12.1%", type: "Blog" },
  { title: "Unboxing: Samsung Galaxy S24", views: "8.2K", engagement: "15.3%", type: "Video" },
  { title: "Tech Deals This Week", views: "6.5K", engagement: "6.8%", type: "Newsletter" },
];

function StatCard({ title, value, change, icon: Icon, color, delay = 0 }: {
  title: string;
  value: string;
  change: string;
  icon: any;
  color: string;
  delay?: number;
}) {
  const isPositive = change.startsWith('+');
  const colorClasses: Record<string, string> = {
    blue: "text-blue-400 bg-blue-500/20",
    green: "text-green-400 bg-green-500/20",
    orange: "text-orange-400 bg-orange-500/20",
    purple: "text-purple-400 bg-purple-500/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Card className="bg-white/5 border-white/10 hover:bg-white/[0.08] transition-colors">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-xl ${colorClasses[color]}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              {change}
            </div>
          </div>
          <h3 className="text-sm font-medium text-white/60 mb-1">{title}</h3>
          <span className="text-2xl font-bold text-white">{value}</span>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function MarketingDashboard() {
  return (
    <DashboardLayout role="marketing">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-heading font-bold text-white">Marketing Dashboard</h1>
            <p className="text-white/60">Campaign performance and marketing analytics</p>
          </div>
          <div className="flex gap-3">
            <Link href="/spoon/marketing/campaigns">
              <Button variant="outline" className="border-white/10 bg-white/5">
                <Megaphone className="w-4 h-4 mr-2" />
                Campaigns
              </Button>
            </Link>
            <Button className="bg-gradient-to-r from-pink-500 to-purple-500">
              <Plus className="w-4 h-4 mr-2" />
              New Campaign
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Visitors" value="30.4K" change="+24.5%" icon={Users} color="blue" delay={0} />
          <StatCard title="Page Views" value="51.6K" change="+18.2%" icon={Eye} color="green" delay={0.1} />
          <StatCard title="Click Rate" value="4.8%" change="+0.8%" icon={MousePointer} color="orange" delay={0.2} />
          <StatCard title="Conversions" value="4,246" change="+32.1%" icon={Target} color="purple" delay={0.3} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/20">
                      <TrendingUp className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <CardTitle className="text-white">Website Traffic</CardTitle>
                      <p className="text-sm text-white/60">Weekly visitors and page views</p>
                    </div>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400">+24.5% this week</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trafficData}>
                      <defs>
                        <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorPageViews" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="day" stroke="rgba(255,255,255,0.3)" fontSize={12} />
                      <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickFormatter={(v) => `${v/1000}k`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'rgba(10,10,15,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                        itemStyle={{ color: '#fff' }}
                      />
                      <Area type="monotone" dataKey="visitors" stroke="#3b82f6" strokeWidth={2} fill="url(#colorVisitors)" />
                      <Area type="monotone" dataKey="pageViews" stroke="#10b981" strokeWidth={2} fill="url(#colorPageViews)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-white/5 border-white/10 h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/20">
                    <Share2 className="w-5 h-5 text-purple-400" />
                  </div>
                  <CardTitle className="text-white">Traffic Sources</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[180px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={trafficSources}
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={70}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {trafficSources.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'rgba(10,10,15,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                        itemStyle={{ color: '#fff' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2 mt-4">
                  {trafficSources.map((source) => (
                    <div key={source.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: source.color }} />
                        <span className="text-white/60">{source.name}</span>
                      </div>
                      <span className="text-white font-medium">{source.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-pink-500/20">
                      <Megaphone className="w-5 h-5 text-pink-400" />
                    </div>
                    <CardTitle className="text-white">Active Campaigns</CardTitle>
                  </div>
                  <Link href="/spoon/marketing/campaigns">
                    <Button variant="outline" size="sm" className="border-white/10 bg-white/5">
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {activeCampaigns.slice(0, 3).map((campaign) => (
                  <div key={campaign.id} className="p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="text-sm font-medium text-white">{campaign.name}</p>
                        <p className="text-xs text-white/60">{campaign.type}</p>
                      </div>
                      <Badge className={campaign.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}>
                        {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs mt-3">
                      <div>
                        <p className="text-white/40">Reach</p>
                        <p className="text-white font-medium">{campaign.reach}</p>
                      </div>
                      <div>
                        <p className="text-white/40">Conversions</p>
                        <p className="text-white font-medium">{campaign.conversions.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-white/40">Spent</p>
                        <p className="text-white font-medium">{campaign.spent}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-orange-500/20">
                      <BarChart3 className="w-5 h-5 text-orange-400" />
                    </div>
                    <CardTitle className="text-white">Top Performing Content</CardTitle>
                  </div>
                  <Link href="/spoon/marketing/content">
                    <Button variant="outline" size="sm" className="border-white/10 bg-white/5">
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {topContent.map((content, index) => (
                  <div key={index} className="p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{content.title}</p>
                        <div className="flex items-center gap-3 text-xs text-white/60 mt-1">
                          <span>{content.views} views</span>
                          <span>{content.engagement} engagement</span>
                        </div>
                      </div>
                      <Badge className="bg-white/10 text-white">{content.type}</Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
