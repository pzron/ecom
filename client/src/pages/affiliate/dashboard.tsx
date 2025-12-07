import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Trophy, Share2, Wallet, TrendingUp, Target, 
  Gift, Copy, BarChart2, DollarSign, Users, Link2,
  ArrowUpRight, ArrowDownRight, Sparkles, Zap, Crown,
  Star, RefreshCw, ExternalLink, MousePointer, Loader2, AlertTriangle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/stores/auth";

interface AffiliateDashboardData {
  affiliate: any;
  totalEarnings: number;
  pendingEarnings: number;
  totalClicks: number;
  totalConversions: number;
  tier: string;
  conversionRate: string;
  campaigns: any[];
  earningsData: { name: string; earnings: number; clicks: number }[];
}

const defaultEarningsData = [
  { name: 'Mon', earnings: 0, clicks: 0 },
  { name: 'Tue', earnings: 0, clicks: 0 },
  { name: 'Wed', earnings: 0, clicks: 0 },
  { name: 'Thu', earnings: 0, clicks: 0 },
  { name: 'Fri', earnings: 0, clicks: 0 },
  { name: 'Sat', earnings: 0, clicks: 0 },
  { name: 'Sun', earnings: 0, clicks: 0 },
];

const leaderboard = [
  { rank: 1, name: "CryptoKing", avatar: "👑", earnings: "৳45,230", badge: "diamond" },
  { rank: 2, name: "TechGuru", avatar: "🚀", earnings: "৳38,450", badge: "platinum" },
  { rank: 3, name: "InfluencerPro", avatar: "⭐", earnings: "৳29,120", badge: "gold" },
  { rank: 4, name: "You", avatar: "🎯", earnings: "৳12,450", badge: "gold", isYou: true },
];

const rewards = [
  { name: "Top Seller NFT #10", type: "nft", status: "unlocked", rarity: "legendary" },
  { name: "500 Referrals Badge", type: "badge", status: "unlocked", rarity: "epic" },
  { name: "Diamond Partner", type: "title", status: "locked", progress: 82, rarity: "legendary" },
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

function AffiliateKPI({ 
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

function RankBadge({ rank, badge }: { rank: number; badge: string }) {
  const colors: Record<string, string> = {
    diamond: "from-cyan-400 to-blue-500",
    platinum: "from-gray-300 to-gray-500",
    gold: "from-yellow-400 to-orange-500",
  };

  return (
    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${colors[badge]} flex items-center justify-center text-sm font-bold text-black`}>
      {rank}
    </div>
  );
}

export default function AffiliateDashboard() {
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [dashboardData, setDashboardData] = useState<AffiliateDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthStore();

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/affiliate/dashboard', {
        credentials: 'include',
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to fetch dashboard data');
      }
      
      const data = await response.json();
      setDashboardData(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const copyLink = (campaignName: string) => {
    const code = dashboardData?.affiliate?.affiliateCode || 'PARTNER';
    navigator.clipboard.writeText(`https://nexcommerce.com/ref/${code}/${campaignName.toLowerCase().replace(/ /g, '-')}`);
    setCopiedLink(campaignName);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const earningsData = dashboardData?.earningsData || defaultEarningsData;
  const totalEarnings = dashboardData?.totalEarnings || 0;
  const pendingEarnings = dashboardData?.pendingEarnings || 0;
  const totalClicks = dashboardData?.totalClicks || 0;
  const totalConversions = dashboardData?.totalConversions || 0;
  const tier = dashboardData?.tier || 'bronze';
  const conversionRate = dashboardData?.conversionRate || "0";
  const campaigns = dashboardData?.campaigns || [];
  const affiliateCode = dashboardData?.affiliate?.affiliateCode || 'PARTNER';

  const activeCampaigns = campaigns.length > 0 ? campaigns.map((c: any) => ({
    name: c.name,
    commission: `${c.commissionRate || 5}%`,
    clicks: c.clicks || 0,
    conversions: c.conversions || 0,
    earnings: `৳${c.earnings || 0}`,
    status: c.isActive ? 'active' : 'inactive',
    trend: '+0%',
  })) : [
    { name: "Welcome Campaign", commission: "5%", clicks: 0, conversions: 0, earnings: "৳0", status: "active", trend: "+0%" },
  ];

  if (isLoading) {
    return (
      <DashboardLayout role="affiliate">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-yellow-500 mx-auto mb-4" />
            <p className="text-white/60">Loading affiliate dashboard...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout role="affiliate">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">Access Issue</h2>
            <p className="text-white/60 mb-4">{error}</p>
            <Button onClick={fetchDashboardData}>Try Again</Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

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
                Affiliate Hub
              </h1>
              <Badge className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 border-yellow-500/30">
                <Crown className="w-3 h-3 mr-1" />
                Gold Partner
              </Badge>
            </div>
            <p className="text-white/60">Track campaigns, earn rewards, and climb the leaderboard</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10">
              <Wallet className="w-4 h-4 mr-2" />
              Withdraw
            </Button>
            <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold">
              <Trophy className="w-4 h-4 mr-2" />
              Leaderboard
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-2xl bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-pink-500/10 border border-yellow-500/20 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4">
            <Trophy className="w-24 h-24 text-yellow-500/20" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex items-center gap-4">
              <motion.div 
                className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-600 p-[3px]"
                animate={{ rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">Lvl 5</span>
                </div>
              </motion.div>
              <div>
                <h2 className="text-xl font-bold text-white">Gold Influencer</h2>
                <p className="text-sm text-white/60">Next: Platinum Partner (82%)</p>
                <div className="flex items-center gap-2 mt-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <Star className="w-4 h-4 text-yellow-500" />
                  <Star className="w-4 h-4 text-yellow-500" />
                  <Star className="w-4 h-4 text-yellow-500" />
                  <Star className="w-4 h-4 text-yellow-500/30" />
                </div>
              </div>
            </div>
            
            <div className="flex-1 max-w-md">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-white/60">XP Progress</span>
                <span className="text-yellow-400 font-medium">8,200 / 10,000 XP</span>
              </div>
              <div className="w-full h-3 bg-black/40 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-yellow-400 to-orange-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "82%" }}
                  transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{totalConversions}</div>
                <div className="text-xs text-white/60">Referrals</div>
              </div>
              <div className="w-px bg-white/10" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{conversionRate}%</div>
                <div className="text-xs text-white/60">Conv. Rate</div>
              </div>
              <div className="w-px bg-white/10" />
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">৳{(totalEarnings / 1000).toFixed(1)}K</div>
                <div className="text-xs text-white/60">Earnings</div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <AffiliateKPI 
            title="Total Earnings" 
            value={`৳${totalEarnings.toLocaleString()}`} 
            change="+24.5%" 
            icon={DollarSign} 
            color="green"
            delay={0}
          />
          <AffiliateKPI 
            title="Total Clicks" 
            value={totalClicks.toLocaleString()} 
            change="+18.2%" 
            icon={MousePointer} 
            color="cyan"
            delay={0.1}
          />
          <AffiliateKPI 
            title="Conversions" 
            value={totalConversions.toString()} 
            change="+32.1%" 
            icon={Target} 
            color="pink"
            delay={0.2}
          />
          <AffiliateKPI 
            title="Active Campaigns" 
            value={activeCampaigns.length.toString()} 
            change="+2" 
            icon={Link2} 
            color="purple"
            delay={0.3}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <HolographicCard glowColor="green">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-500/20">
                      <BarChart2 className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Earnings Overview</h3>
                      <p className="text-sm text-white/60">Weekly performance</p>
                    </div>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <span className="text-white/60">Earnings</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-cyan-500" />
                      <span className="text-white/60">Clicks</span>
                    </div>
                  </div>
                </div>
                
                <div className="h-[260px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={earningsData}>
                      <defs>
                        <linearGradient id="affEarnings" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="affClicks" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `৳${v}`} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(10, 10, 15, 0.95)', 
                          border: '1px solid rgba(255,255,255,0.1)', 
                          borderRadius: '12px' 
                        }}
                      />
                      <Area type="monotone" dataKey="earnings" stroke="#22c55e" strokeWidth={3} fill="url(#affEarnings)" />
                      <Area type="monotone" dataKey="clicks" stroke="#06b6d4" strokeWidth={2} fill="url(#affClicks)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </HolographicCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <HolographicCard glowColor="yellow">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-yellow-500/20">
                    <Trophy className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Leaderboard</h3>
                    <p className="text-sm text-white/60">Top affiliates</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {leaderboard.map((user, i) => (
                    <motion.div
                      key={user.rank}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      className={`flex items-center justify-between p-3 rounded-xl transition-colors ${
                        user.isYou 
                          ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30' 
                          : 'bg-white/5 border border-white/5 hover:bg-white/[0.08]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <RankBadge rank={user.rank} badge={user.badge} />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{user.avatar}</span>
                            <span className={`font-medium ${user.isYou ? 'text-purple-300' : 'text-white'}`}>
                              {user.name}
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className="font-bold text-white">{user.earnings}</span>
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
          transition={{ delay: 0.6 }}
        >
          <HolographicCard glowColor="purple">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/20">
                    <Target className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Active Campaigns</h3>
                    <p className="text-sm text-white/60">Your promotional links</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300">
                  View All
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeCampaigns.map((campaign, i) => (
                  <motion.div
                    key={campaign.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    className={`p-4 rounded-xl border transition-all ${
                      campaign.status === 'featured'
                        ? 'bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/30'
                        : 'bg-white/5 border-white/10 hover:bg-white/[0.08]'
                    }`}
                    data-testid={`campaign-${campaign.name.toLowerCase().replace(/ /g, '-')}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-white">{campaign.name}</h4>
                          {campaign.status === 'featured' && (
                            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs">
                              <Sparkles className="w-3 h-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                        </div>
                        <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30">
                          {campaign.commission} Commission
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-white">{campaign.earnings}</div>
                        <div className="text-xs text-green-400">{campaign.trend}</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <span className="text-white/60">Clicks</span>
                        <div className="font-medium text-white">{campaign.clicks.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-white/60">Conversions</span>
                        <div className="font-medium text-white">{campaign.conversions}</div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1 h-8 text-xs border-white/10 hover:bg-white/10"
                        onClick={() => copyLink(campaign.name)}
                      >
                        {copiedLink === campaign.name ? (
                          <>
                            <span className="text-green-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 mr-1" /> Copy Link
                          </>
                        )}
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 h-8 text-xs border-white/10 hover:bg-white/10">
                        <Share2 className="w-3 h-3 mr-1" /> Share
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </HolographicCard>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <HolographicCard glowColor="pink">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-pink-500/20">
                    <Gift className="w-5 h-5 text-pink-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Rewards & NFTs</h3>
                    <p className="text-sm text-white/60">Your earned achievements</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  {rewards.map((reward, i) => (
                    <motion.div 
                      key={reward.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.9 + i * 0.1 }}
                      className={`aspect-square rounded-xl border flex flex-col items-center justify-center p-3 text-center cursor-pointer transition-all ${
                        reward.status === 'locked'
                          ? 'bg-white/5 border-white/10 opacity-60'
                          : reward.rarity === 'legendary'
                          ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500/30 hover:border-yellow-500/50'
                          : 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30 hover:border-purple-500/50'
                      }`}
                    >
                      <Gift className={`w-8 h-8 mb-2 ${
                        reward.rarity === 'legendary' ? 'text-yellow-400' : 'text-purple-400'
                      }`} />
                      <span className="text-xs font-medium text-white leading-tight">{reward.name}</span>
                      {reward.status === 'locked' && reward.progress && (
                        <div className="w-full mt-2">
                          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                              style={{ width: `${reward.progress}%` }}
                            />
                          </div>
                          <span className="text-[10px] text-white/40 mt-1">{reward.progress}%</span>
                        </div>
                      )}
                      {reward.status === 'unlocked' && (
                        <span className="text-[10px] text-green-400 mt-1">Unlocked</span>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </HolographicCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <HolographicCard glowColor="cyan">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-cyan-500/20">
                    <Zap className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">AI Recommendations</h3>
                    <p className="text-sm text-white/60">Smart suggestions for you</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {[
                    { text: "Promote 'Sony Headphones' this weekend for 2x engagement based on your audience.", color: "blue" },
                    { text: "Your followers love Tech products. Try the new 'VR Headset Pro' campaign.", color: "purple" },
                    { text: "Post between 6-8 PM for 40% higher click-through rates.", color: "green" },
                  ].map((suggestion, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + i * 0.1 }}
                      className={`p-4 rounded-xl border ${
                        suggestion.color === 'blue' 
                          ? 'bg-blue-500/10 border-blue-500/20' 
                          : suggestion.color === 'purple'
                          ? 'bg-purple-500/10 border-purple-500/20'
                          : 'bg-green-500/10 border-green-500/20'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Sparkles className={`w-4 h-4 mt-0.5 ${
                          suggestion.color === 'blue' ? 'text-blue-400' : 
                          suggestion.color === 'purple' ? 'text-purple-400' : 'text-green-400'
                        }`} />
                        <p className="text-sm text-white/80">{suggestion.text}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </HolographicCard>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
