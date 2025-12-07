import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Save, Store, CreditCard, Truck, Bell, Shield, Palette,
  Upload, Globe, Mail, Phone, MapPin, Building2, Bitcoin,
  CheckCircle, AlertCircle, Settings, ChevronRight, Eye, EyeOff,
  Package, Clock, DollarSign, Users
} from "lucide-react";

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

function SettingsSection({ 
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

export default function VendorSettings() {
  const [notifications, setNotifications] = useState({
    newOrders: true,
    orderUpdates: true,
    lowStock: true,
    payouts: true,
    marketing: false,
    newsletter: true,
  });

  const [showBankDetails, setShowBankDetails] = useState(false);

  return (
    <DashboardLayout role="vendor">
      <div className="space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-heading font-bold bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                Store Settings
              </h1>
              <Badge variant="outline" className="border-green-500/30 text-green-400 bg-green-500/10">
                <CheckCircle className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            </div>
            <p className="text-white/60">Manage your store profile, shipping, and payment settings</p>
          </div>
          
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
            <Save className="w-4 h-4 mr-2" />
            Save All Changes
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SettingsSection
            title="Store Profile"
            description="Your public vendor information"
            icon={Store}
            color="purple"
            delay={0.1}
          >
            <div className="space-y-5">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/10 flex items-center justify-center">
                  <Store className="w-10 h-10 text-purple-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white/60 mb-2">Store Logo</p>
                  <Button variant="outline" size="sm" className="border-white/10 bg-white/5 hover:bg-white/10">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Logo
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-white/80">Display Name</Label>
                <Input className="bg-white/5 border-white/10" defaultValue="FutureTech Inc." />
              </div>
              
              <div className="space-y-2">
                <Label className="text-white/80">Store Description</Label>
                <Textarea 
                  className="bg-white/5 border-white/10 min-h-[100px]" 
                  defaultValue="Premium electronics and 3D gadgets. We specialize in the latest Apple products and cutting-edge technology accessories."
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white/80">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <Input className="bg-white/5 border-white/10 pl-10" defaultValue="vendor@futuretech.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-white/80">Phone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <Input className="bg-white/5 border-white/10 pl-10" defaultValue="+880 1234 567890" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-white/80">Business Address</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-white/40" />
                  <Textarea 
                    className="bg-white/5 border-white/10 pl-10 min-h-[80px]" 
                    defaultValue="123 Tech Street, Gulshan-1, Dhaka 1212, Bangladesh"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-white/80">Website</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <Input className="bg-white/5 border-white/10 pl-10" defaultValue="https://futuretech.com.bd" />
                </div>
              </div>
            </div>
          </SettingsSection>

          <SettingsSection
            title="Payment Methods"
            description="Configure your payout preferences"
            icon={CreditCard}
            color="green"
            delay={0.2}
          >
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-green-400" />
                    <span className="font-medium text-white">Bank Account</span>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-none">Primary</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white/60 text-sm font-mono">
                    {showBankDetails ? "IBAN: BD91 BRAC 0012 3456 7890 1234" : "**** **** **** 1234"}
                  </span>
                  <button onClick={() => setShowBankDetails(!showBankDetails)} className="text-white/40 hover:text-white/60">
                    {showBankDetails ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Bitcoin className="w-5 h-5 text-orange-400" />
                    <span className="font-medium text-white">Crypto Wallet</span>
                  </div>
                  <Badge variant="outline" className="border-white/20 text-white/60">Secondary</Badge>
                </div>
                <span className="text-white/60 text-sm font-mono">0x71C7...9A21 (USDT/ETH)</span>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-white/80">Minimum Payout Amount</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <Input className="bg-white/5 border-white/10 pl-10" defaultValue="50,000" />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40">৳</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-white/80">Payout Schedule</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Weekly', 'Bi-weekly', 'Monthly'].map((schedule) => (
                      <button
                        key={schedule}
                        className={`p-3 rounded-lg border text-sm ${
                          schedule === 'Bi-weekly' 
                            ? 'border-purple-500/30 bg-purple-500/10 text-purple-400' 
                            : 'border-white/10 bg-white/5 text-white/60 hover:bg-white/10'
                        }`}
                      >
                        {schedule}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <Button variant="outline" className="w-full border-white/10 bg-white/5 hover:bg-white/10">
                <CreditCard className="w-4 h-4 mr-2" />
                Add Payment Method
              </Button>
            </div>
          </SettingsSection>

          <SettingsSection
            title="Shipping Settings"
            description="Configure your delivery options"
            icon={Truck}
            color="cyan"
            delay={0.3}
          >
            <div className="space-y-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3">
                    <Package className="w-5 h-5 text-cyan-400" />
                    <div>
                      <p className="font-medium text-white">Standard Delivery</p>
                      <p className="text-sm text-white/60">3-5 business days</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-white font-medium">৳150</span>
                    <Switch defaultChecked />
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-purple-400" />
                    <div>
                      <p className="font-medium text-white">Express Delivery</p>
                      <p className="text-sm text-white/60">1-2 business days</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-white font-medium">৳350</span>
                    <Switch defaultChecked />
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-pink-400" />
                    <div>
                      <p className="font-medium text-white">Same Day Delivery</p>
                      <p className="text-sm text-white/60">Within 24 hours (Dhaka only)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-white font-medium">৳500</span>
                    <Switch />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-white/80">Free Shipping Threshold</Label>
                <div className="relative">
                  <Input className="bg-white/5 border-white/10" defaultValue="5,000" />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40">৳</span>
                </div>
                <p className="text-xs text-white/40">Orders above this amount get free standard shipping</p>
              </div>
              
              <div className="space-y-2">
                <Label className="text-white/80">Processing Time</Label>
                <div className="grid grid-cols-4 gap-2">
                  {['1 day', '2 days', '3 days', '5 days'].map((time) => (
                    <button
                      key={time}
                      className={`p-2 rounded-lg border text-sm ${
                        time === '2 days' 
                          ? 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400' 
                          : 'border-white/10 bg-white/5 text-white/60 hover:bg-white/10'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </SettingsSection>

          <SettingsSection
            title="Notifications"
            description="Manage your alert preferences"
            icon={Bell}
            color="yellow"
            delay={0.4}
          >
            <div className="space-y-4">
              {[
                { key: 'newOrders', label: 'New Orders', desc: 'Get notified when you receive a new order', icon: Package },
                { key: 'orderUpdates', label: 'Order Updates', desc: 'Status changes and customer messages', icon: Truck },
                { key: 'lowStock', label: 'Low Stock Alerts', desc: 'When inventory falls below threshold', icon: AlertCircle },
                { key: 'payouts', label: 'Payout Notifications', desc: 'Withdrawal confirmations and updates', icon: DollarSign },
                { key: 'marketing', label: 'Marketing Tips', desc: 'Promotional strategies and insights', icon: Users },
                { key: 'newsletter', label: 'Newsletter', desc: 'Platform updates and new features', icon: Mail },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-yellow-400" />
                    <div>
                      <p className="font-medium text-white">{item.label}</p>
                      <p className="text-sm text-white/60">{item.desc}</p>
                    </div>
                  </div>
                  <Switch 
                    checked={notifications[item.key as keyof typeof notifications]}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, [item.key]: checked }))}
                  />
                </div>
              ))}
            </div>
          </SettingsSection>

          <SettingsSection
            title="Store Policies"
            description="Define your terms and conditions"
            icon={Shield}
            color="pink"
            delay={0.5}
          >
            <div className="space-y-5">
              <div className="space-y-2">
                <Label className="text-white/80">Return Policy</Label>
                <Textarea 
                  className="bg-white/5 border-white/10 min-h-[100px]" 
                  defaultValue="We offer a 7-day return policy for all unused items in original packaging. Electronics must be sealed. Refunds are processed within 5-7 business days after receiving the returned item."
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-white/80">Warranty Information</Label>
                <Textarea 
                  className="bg-white/5 border-white/10 min-h-[80px]" 
                  defaultValue="All products come with manufacturer warranty. Additional extended warranty options are available at checkout."
                />
              </div>
              
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                <div>
                  <p className="font-medium text-white">Accept Returns</p>
                  <p className="text-sm text-white/60">Allow customers to return items</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                <div>
                  <p className="font-medium text-white">Offer Exchanges</p>
                  <p className="text-sm text-white/60">Allow product exchanges</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </SettingsSection>

          <SettingsSection
            title="Brand Customization"
            description="Personalize your store appearance"
            icon={Palette}
            color="orange"
            delay={0.6}
          >
            <div className="space-y-5">
              <div className="space-y-2">
                <Label className="text-white/80">Brand Color</Label>
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    {['#a855f7', '#ec4899', '#06b6d4', '#22c55e', '#f59e0b', '#3b82f6'].map((color) => (
                      <button
                        key={color}
                        className={`w-10 h-10 rounded-lg border-2 ${
                          color === '#a855f7' ? 'border-white' : 'border-transparent'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <Input className="bg-white/5 border-white/10 w-28" defaultValue="#a855f7" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-white/80">Store Banner</Label>
                <div className="border-2 border-dashed border-white/10 rounded-xl p-6 text-center hover:border-purple-500/30 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-white/40 mx-auto mb-2" />
                  <p className="text-sm text-white/60">Upload banner image (1200x300px recommended)</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                <div>
                  <p className="font-medium text-white">Show Vendor Badge</p>
                  <p className="text-sm text-white/60">Display verified badge on products</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                <div>
                  <p className="font-medium text-white">Featured Vendor</p>
                  <p className="text-sm text-white/60">Apply for featured vendor status</p>
                </div>
                <Button size="sm" variant="outline" className="border-orange-500/30 text-orange-400 hover:bg-orange-500/10">
                  Apply <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </SettingsSection>
        </div>
      </div>
    </DashboardLayout>
  );
}
