import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Share2, Users, Heart, MessageCircle, Eye,
  TrendingUp, Plus, Calendar, ExternalLink,
  ArrowUpRight, ArrowDownRight
} from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { motion } from "framer-motion";

const engagementData = [
  { day: 'Mon', facebook: 2400, instagram: 3200, twitter: 1200 },
  { day: 'Tue', facebook: 1398, instagram: 2800, twitter: 980 },
  { day: 'Wed', facebook: 9800, instagram: 8500, twitter: 3200 },
  { day: 'Thu', facebook: 3908, instagram: 4200, twitter: 1800 },
  { day: 'Fri', facebook: 4800, instagram: 5200, twitter: 2100 },
  { day: 'Sat', facebook: 3800, instagram: 6800, twitter: 1500 },
  { day: 'Sun', facebook: 4300, instagram: 5500, twitter: 1800 },
];

const socialPlatforms = [
  { name: "Facebook", followers: "125.4K", growth: "+2.3%", engagement: "4.2%", posts: 45, icon: "📘", color: "#1877F2" },
  { name: "Instagram", followers: "89.2K", growth: "+5.8%", engagement: "6.8%", posts: 62, icon: "📷", color: "#E4405F" },
  { name: "Twitter/X", followers: "45.6K", growth: "+1.2%", engagement: "2.1%", posts: 128, icon: "🐦", color: "#1DA1F2" },
  { name: "TikTok", followers: "32.1K", growth: "+12.4%", engagement: "8.5%", posts: 28, icon: "🎵", color: "#000000" },
];

const scheduledPosts = [
  { id: 1, platform: "Instagram", content: "Holiday Sale starts NOW! 🎄 Up to 50% off on electronics...", scheduledFor: "Dec 7, 10:00 AM", status: "scheduled" },
  { id: 2, platform: "Facebook", content: "Check out our latest iPhone 15 Pro Max review! Link in bio...", scheduledFor: "Dec 7, 2:00 PM", status: "scheduled" },
  { id: 3, platform: "Twitter/X", content: "Flash Deal Alert! 🚨 Samsung Galaxy S24 now available...", scheduledFor: "Dec 7, 4:00 PM", status: "scheduled" },
  { id: 4, platform: "TikTok", content: "Unboxing the most requested tech gadget of 2024! 📦", scheduledFor: "Dec 8, 12:00 PM", status: "draft" },
];

const topPosts = [
  { platform: "Instagram", content: "Black Friday Mega Sale 🛒", likes: "12.5K", comments: 842, shares: 1250, reach: "156K" },
  { platform: "TikTok", content: "iPhone 15 vs Samsung S24 - Which is better?", likes: "28.2K", comments: 1540, shares: 3200, reach: "420K" },
  { platform: "Facebook", content: "Holiday Gift Guide 2024 🎁", likes: "8.5K", comments: 425, shares: 890, reach: "95K" },
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
    pink: "text-pink-400 bg-pink-500/20",
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

export default function MarketingSocial() {
  return (
    <DashboardLayout role="marketing">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-heading font-bold text-white">Social Media</h1>
            <p className="text-white/60">Manage social media presence and engagement</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-white/10 bg-white/5">
              <Calendar className="w-4 h-4 mr-2" />
              Content Calendar
            </Button>
            <Button className="bg-gradient-to-r from-pink-500 to-purple-500">
              <Plus className="w-4 h-4 mr-2" />
              Create Post
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Followers" value="292.3K" change="+4.2%" icon={Users} color="blue" delay={0} />
          <StatCard title="Total Engagement" value="156.8K" change="+12.5%" icon={Heart} color="pink" delay={0.1} />
          <StatCard title="Posts This Week" value="48" change="+8" icon={Share2} color="green" delay={0.2} />
          <StatCard title="Avg. Reach" value="85.2K" change="+18.4%" icon={Eye} color="purple" delay={0.3} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {socialPlatforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <Card className="bg-white/5 border-white/10 hover:bg-white/[0.08] transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{platform.icon}</span>
                      <span className="text-white font-medium">{platform.name}</span>
                    </div>
                    <Button size="sm" variant="outline" className="h-7 border-white/10">
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Followers</span>
                      <span className="text-white font-medium">{platform.followers}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Growth</span>
                      <span className="text-green-400 font-medium">{platform.growth}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Engagement</span>
                      <span className="text-white font-medium">{platform.engagement}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Posts</span>
                      <span className="text-white font-medium">{platform.posts}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
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
                      <CardTitle className="text-white">Engagement Overview</CardTitle>
                      <p className="text-sm text-white/60">Weekly engagement by platform</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={engagementData}>
                      <defs>
                        <linearGradient id="colorFacebook" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#1877F2" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#1877F2" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorInstagram" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#E4405F" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#E4405F" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorTwitter" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#1DA1F2" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#1DA1F2" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="day" stroke="rgba(255,255,255,0.3)" fontSize={12} />
                      <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickFormatter={(v) => `${v/1000}k`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'rgba(10,10,15,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                        itemStyle={{ color: '#fff' }}
                      />
                      <Area type="monotone" dataKey="instagram" stroke="#E4405F" strokeWidth={2} fill="url(#colorInstagram)" />
                      <Area type="monotone" dataKey="facebook" stroke="#1877F2" strokeWidth={2} fill="url(#colorFacebook)" />
                      <Area type="monotone" dataKey="twitter" stroke="#1DA1F2" strokeWidth={2} fill="url(#colorTwitter)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <Card className="bg-white/5 border-white/10 h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-orange-500/20">
                    <Calendar className="w-5 h-5 text-orange-400" />
                  </div>
                  <CardTitle className="text-white">Scheduled Posts</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {scheduledPosts.map((post) => (
                  <div key={post.id} className="p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-white/10 text-white">{post.platform}</Badge>
                      <Badge className={post.status === 'scheduled' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}>
                        {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-sm text-white/80 line-clamp-2 mb-2">{post.content}</p>
                    <p className="text-xs text-white/40">{post.scheduledFor}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-pink-500/20">
                    <Heart className="w-5 h-5 text-pink-400" />
                  </div>
                  <CardTitle className="text-white">Top Performing Posts</CardTitle>
                </div>
                <Button variant="outline" size="sm" className="border-white/10 bg-white/5">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {topPosts.map((post, index) => (
                  <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <Badge className="bg-white/10 text-white">{post.platform}</Badge>
                      <span className="text-xs text-white/40">Reach: {post.reach}</span>
                    </div>
                    <p className="text-sm font-medium text-white mb-3">{post.content}</p>
                    <div className="flex items-center gap-4 text-xs text-white/60">
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        {post.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" />
                        {post.comments}
                      </span>
                      <span className="flex items-center gap-1">
                        <Share2 className="w-3 h-3" />
                        {post.shares}
                      </span>
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
