import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  User, Mail, Phone, Globe, Save, Upload, Camera,
  Crown, Star, Trophy, Target, DollarSign, TrendingUp,
  Twitter, Instagram, Youtube, Facebook, Linkedin, Link2,
  CreditCard, Building2, Wallet, Bitcoin, CheckCircle, Shield,
  Award, Zap, Gift, ChevronRight, Eye, EyeOff
} from "lucide-react";

const tierProgression = [
  { name: "Bronze", minEarnings: 0, commission: "8%", perks: ["Basic analytics", "Email support"], completed: true },
  { name: "Silver", minEarnings: 50000, commission: "10%", perks: ["Priority support", "Custom links"], completed: true },
  { name: "Gold", minEarnings: 200000, commission: "12%", perks: ["Dedicated manager", "Early access"], completed: true, current: true },
  { name: "Platinum", minEarnings: 500000, commission: "15%", perks: ["VIP events", "Exclusive deals"], completed: false },
  { name: "Diamond", minEarnings: 1000000, commission: "20%", perks: ["Custom commission", "NFT rewards"], completed: false },
];

const achievements = [
  { name: "First Sale", desc: "Made your first referral sale", icon: Target, earned: true, date: "Oct 2024" },
  { name: "100 Conversions", desc: "Reached 100 successful conversions", icon: Trophy, earned: true, date: "Nov 2024" },
  { name: "৳200K Milestone", desc: "Earned ৳200,000 in commissions", icon: DollarSign, earned: true, date: "Nov 2024" },
  { name: "Viral Campaign", desc: "Campaign with 10,000+ clicks", icon: Zap, earned: false, progress: 78 },
  { name: "Top 10 Affiliate", desc: "Ranked in top 10 affiliates", icon: Crown, earned: false, progress: 45 },
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

function ProfileSection({ 
  title, 
  description, 
  icon: Icon, 
  color, 
  children,
  delay = 0
}: { 
  title: string;
  description: string;
  icon: any;
  color: "purple" | "pink" | "cyan" | "green" | "orange" | "yellow";
  children: React.ReactNode;
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <HolographicCard glowColor={color}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-2.5 rounded-xl ${colorClasses[color]}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <p className="text-sm text-white/60">{description}</p>
            </div>
          </div>
          {children}
        </div>
      </HolographicCard>
    </motion.div>
  );
}

export default function AffiliateProfile() {
  const [showPayment, setShowPayment] = useState(false);

  const currentTier = tierProgression.find(t => t.current);
  const nextTier = tierProgression.find(t => !t.completed);
  const progressToNext = nextTier ? ((416000 - 200000) / (nextTier.minEarnings - 200000)) * 100 : 100;

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
                Affiliate Profile
              </h1>
              <Badge className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 border-yellow-500/30">
                <Crown className="w-3 h-3 mr-1" />
                Gold Partner
              </Badge>
            </div>
            <p className="text-white/60">Manage your profile, social links, and payment methods</p>
          </div>
          
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-2xl bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-pink-500/10 border border-yellow-500/20"
        >
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex items-center gap-4">
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-orange-600 p-[3px]">
                  <Avatar className="w-full h-full border-4 border-black">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-2xl">MR</AvatarFallback>
                  </Avatar>
                </div>
                <button className="absolute bottom-0 right-0 p-2 rounded-full bg-purple-500 hover:bg-purple-600 transition-colors">
                  <Camera className="w-4 h-4 text-white" />
                </button>
              </motion.div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-bold text-white">Mike Ross</h2>
                  <Badge className="bg-green-500/20 text-green-400 border-none">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                </div>
                <p className="text-white/60">@mikeross_affiliate</p>
                <div className="flex items-center gap-2 mt-2">
                  {[Star, Star, Star, Star, Star].map((StarIcon, i) => (
                    <StarIcon key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-500 fill-yellow-500' : 'text-yellow-500/30'}`} />
                  ))}
                  <span className="text-sm text-white/60 ml-1">Gold Partner</span>
                </div>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white/60">Progress to {nextTier?.name}</span>
                <span className="text-sm font-medium text-yellow-400">৳416K / ৳500K</span>
              </div>
              <div className="w-full h-3 bg-black/40 rounded-full overflow-hidden mb-2">
                <motion.div 
                  className="h-full bg-gradient-to-r from-yellow-400 to-orange-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(progressToNext, 100)}%` }}
                  transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                />
              </div>
              <p className="text-xs text-white/40">৳84,000 more to unlock Platinum status and 15% commission</p>
            </div>

            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">558</div>
                <div className="text-xs text-white/60">Conversions</div>
              </div>
              <div className="w-px bg-white/10" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">10.4%</div>
                <div className="text-xs text-white/60">Conv. Rate</div>
              </div>
              <div className="w-px bg-white/10" />
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">৳416K</div>
                <div className="text-xs text-white/60">Total Earned</div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProfileSection
            title="Personal Information"
            description="Your account details"
            icon={User}
            color="purple"
            delay={0.2}
          >
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white/80">First Name</Label>
                  <Input className="bg-white/5 border-white/10" defaultValue="Mike" />
                </div>
                <div className="space-y-2">
                  <Label className="text-white/80">Last Name</Label>
                  <Input className="bg-white/5 border-white/10" defaultValue="Ross" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-white/80">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <Input className="bg-white/5 border-white/10 pl-10" defaultValue="mike@affiliate.com" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-white/80">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <Input className="bg-white/5 border-white/10 pl-10" defaultValue="+880 1234 567890" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-white/80">Bio</Label>
                <Textarea 
                  className="bg-white/5 border-white/10 min-h-[80px]" 
                  defaultValue="Tech enthusiast and digital marketer specializing in consumer electronics. Helping people discover the best gadgets since 2020."
                />
              </div>
            </div>
          </ProfileSection>

          <ProfileSection
            title="Social Links"
            description="Connect your social media accounts"
            icon={Globe}
            color="cyan"
            delay={0.3}
          >
            <div className="space-y-4">
              {[
                { icon: Twitter, name: "Twitter / X", placeholder: "@username", value: "@mikeross_tech" },
                { icon: Instagram, name: "Instagram", placeholder: "@username", value: "@mikeross.official" },
                { icon: Youtube, name: "YouTube", placeholder: "Channel URL", value: "" },
                { icon: Facebook, name: "Facebook", placeholder: "Profile URL", value: "" },
                { icon: Linkedin, name: "LinkedIn", placeholder: "Profile URL", value: "linkedin.com/in/mikeross" },
                { icon: Globe, name: "Website", placeholder: "https://your-website.com", value: "" },
              ].map((social) => (
                <div key={social.name} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                    <social.icon className="w-5 h-5 text-white/60" />
                  </div>
                  <div className="flex-1">
                    <Input 
                      className="bg-white/5 border-white/10" 
                      placeholder={social.placeholder}
                      defaultValue={social.value}
                    />
                  </div>
                  {social.value && (
                    <Badge className="bg-green-500/20 text-green-400 border-none">
                      <CheckCircle className="w-3 h-3" />
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </ProfileSection>

          <ProfileSection
            title="Payment Methods"
            description="Configure your payout preferences"
            icon={CreditCard}
            color="green"
            delay={0.4}
          >
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Wallet className="w-5 h-5 text-green-400" />
                    <span className="font-medium text-white">PayPal</span>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-none">Primary</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white/60 text-sm">
                    {showPayment ? "mike.ross@paypal.com" : "m***@paypal.com"}
                  </span>
                  <button onClick={() => setShowPayment(!showPayment)} className="text-white/40 hover:text-white/60">
                    {showPayment ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-cyan-400" />
                    <span className="font-medium text-white">Bank Account</span>
                  </div>
                  <Badge variant="outline" className="border-white/20 text-white/60">Secondary</Badge>
                </div>
                <span className="text-white/60 text-sm font-mono">**** **** **** 4567</span>
              </div>
              
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Bitcoin className="w-5 h-5 text-orange-400" />
                    <span className="font-medium text-white">Crypto Wallet</span>
                  </div>
                  <Button size="sm" variant="outline" className="border-white/10 hover:bg-white/10">
                    Connect
                  </Button>
                </div>
                <span className="text-white/40 text-sm">Not connected</span>
              </div>
              
              <Button variant="outline" className="w-full border-white/10 bg-white/5 hover:bg-white/10">
                <CreditCard className="w-4 h-4 mr-2" />
                Add Payment Method
              </Button>
            </div>
          </ProfileSection>

          <ProfileSection
            title="Tier Progression"
            description="Your affiliate rank and benefits"
            icon={Trophy}
            color="yellow"
            delay={0.5}
          >
            <div className="space-y-3">
              {tierProgression.map((tier, i) => (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className={`p-4 rounded-xl border transition-all ${
                    tier.current 
                      ? 'bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/30'
                      : tier.completed
                      ? 'bg-green-500/5 border-green-500/20'
                      : 'bg-white/5 border-white/10 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        tier.current ? 'bg-yellow-500' :
                        tier.completed ? 'bg-green-500' : 'bg-white/10'
                      }`}>
                        {tier.completed ? (
                          <CheckCircle className="w-4 h-4 text-white" />
                        ) : (
                          <span className="text-xs font-bold text-white">{i + 1}</span>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`font-medium ${tier.current ? 'text-yellow-400' : tier.completed ? 'text-white' : 'text-white/60'}`}>
                            {tier.name}
                          </span>
                          {tier.current && (
                            <Badge className="bg-yellow-500/20 text-yellow-400 border-none text-xs">
                              Current
                            </Badge>
                          )}
                        </div>
                        <span className="text-xs text-white/40">৳{tier.minEarnings.toLocaleString()}+ earnings</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-white">{tier.commission}</div>
                      <span className="text-xs text-white/40">Commission</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </ProfileSection>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <HolographicCard glowColor="pink">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-pink-500/20">
                    <Award className="w-5 h-5 text-pink-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Achievements</h3>
                    <p className="text-sm text-white/60">Your earned badges and milestones</p>
                  </div>
                </div>
                <Button variant="ghost" className="text-pink-400 hover:text-pink-300">
                  View All <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {achievements.map((achievement, i) => (
                  <motion.div
                    key={achievement.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    className={`p-4 rounded-xl border text-center ${
                      achievement.earned
                        ? 'bg-gradient-to-br from-pink-500/10 to-purple-500/10 border-pink-500/30'
                        : 'bg-white/5 border-white/10 opacity-70'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center ${
                      achievement.earned ? 'bg-pink-500/20' : 'bg-white/5'
                    }`}>
                      <achievement.icon className={`w-6 h-6 ${achievement.earned ? 'text-pink-400' : 'text-white/40'}`} />
                    </div>
                    <h4 className="font-medium text-white text-sm mb-1">{achievement.name}</h4>
                    <p className="text-xs text-white/40 mb-2">{achievement.desc}</p>
                    {achievement.earned ? (
                      <Badge className="bg-green-500/20 text-green-400 border-none text-xs">
                        {achievement.date}
                      </Badge>
                    ) : (
                      <div>
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
                            style={{ width: `${achievement.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-white/40 mt-1">{achievement.progress}%</span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </HolographicCard>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
