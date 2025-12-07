import { cn } from "@/lib/utils";
import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, ShoppingBag, Users, Settings, 
  BarChart3, Box, Wallet, Bell, Search, Menu,
  Package, Receipt, ClipboardList, TrendingUp,
  FileText, MessageSquare, UserCheck, Truck,
  AlertCircle, Building2, ShieldCheck, Calendar,
  CreditCard, Boxes, ArrowLeftRight, Headphones,
  Briefcase, Target, DollarSign, UserPlus, Clock,
  Share2, Megaphone, PieChart, Heart, Users2,
  type LucideIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore, UserRole } from "@/stores/auth";

interface NavItem {
  icon: LucideIcon;
  label: string;
  href: string;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: UserRole;
}

export function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const [location] = useLocation();
  const { user } = useAuthStore();

  const navItems: Record<string, NavItem[]> = {
    admin: [
      { icon: LayoutDashboard, label: "Command Center", href: "/hair" },
      { icon: Users, label: "User Management", href: "/hair/users" },
      { icon: ShieldCheck, label: "Role Management", href: "/hair/roles" },
      { icon: ShoppingBag, label: "Products", href: "/hair/products" },
      { icon: BarChart3, label: "Analytics", href: "/hair/analytics" },
      { icon: Building2, label: "Store Settings", href: "/hair/settings" },
    ],
    manager: [
      { icon: LayoutDashboard, label: "Dashboard", href: "/spoon/manager" },
      { icon: Users, label: "Team Management", href: "/spoon/manager/team" },
      { icon: TrendingUp, label: "Sales Overview", href: "/spoon/manager/sales" },
      { icon: Boxes, label: "Inventory Control", href: "/spoon/manager/inventory" },
      { icon: BarChart3, label: "Reports", href: "/spoon/manager/reports" },
      { icon: Calendar, label: "Schedules", href: "/spoon/manager/schedules" },
    ],
    cashier: [
      { icon: LayoutDashboard, label: "Dashboard", href: "/spoon/cashier" },
      { icon: CreditCard, label: "Point of Sale", href: "/spoon/cashier/pos" },
      { icon: Receipt, label: "Transactions", href: "/spoon/cashier/transactions" },
      { icon: ClipboardList, label: "Daily Summary", href: "/spoon/cashier/summary" },
      { icon: Package, label: "Quick Orders", href: "/spoon/cashier/orders" },
    ],
    stockkeeper: [
      { icon: LayoutDashboard, label: "Dashboard", href: "/spoon/stockkeeper" },
      { icon: Boxes, label: "Inventory", href: "/spoon/stockkeeper/inventory" },
      { icon: Truck, label: "Receiving", href: "/spoon/stockkeeper/receiving" },
      { icon: ArrowLeftRight, label: "Transfers", href: "/spoon/stockkeeper/transfers" },
      { icon: AlertCircle, label: "Stock Alerts", href: "/spoon/stockkeeper/alerts" },
    ],
    office_member: [
      { icon: LayoutDashboard, label: "Dashboard", href: "/spoon/office" },
      { icon: FileText, label: "Documents", href: "/spoon/office/documents" },
      { icon: BarChart3, label: "Reports", href: "/spoon/office/reports" },
      { icon: Headphones, label: "Customer Support", href: "/spoon/office/support" },
      { icon: MessageSquare, label: "Communications", href: "/spoon/office/communications" },
    ],
    vendor: [
      { icon: LayoutDashboard, label: "Dashboard", href: "/so/vendor" },
      { icon: Box, label: "My Products", href: "/so/vendor/products" },
      { icon: Wallet, label: "Sales & Payouts", href: "/so/vendor/sales" },
      { icon: Settings, label: "Store Settings", href: "/so/vendor/settings" },
    ],
    affiliate: [
      { icon: LayoutDashboard, label: "Workspace", href: "/so/affiliate" },
      { icon: BarChart3, label: "Campaigns", href: "/so/affiliate/campaigns" },
      { icon: Wallet, label: "Earnings", href: "/so/affiliate/earnings" },
      { icon: Settings, label: "Profile", href: "/so/affiliate/profile" },
    ],
    hr: [
      { icon: LayoutDashboard, label: "Dashboard", href: "/spoon/hr" },
      { icon: Users2, label: "Employees", href: "/spoon/hr/employees" },
      { icon: UserPlus, label: "Recruitment", href: "/spoon/hr/recruitment" },
      { icon: DollarSign, label: "Payroll", href: "/spoon/hr/payroll" },
      { icon: Clock, label: "Attendance", href: "/spoon/hr/attendance" },
      { icon: Calendar, label: "Leave Management", href: "/spoon/hr/leave" },
    ],
    marketing: [
      { icon: LayoutDashboard, label: "Dashboard", href: "/spoon/marketing" },
      { icon: Megaphone, label: "Campaigns", href: "/spoon/marketing/campaigns" },
      { icon: Share2, label: "Social Media", href: "/spoon/marketing/social" },
      { icon: PieChart, label: "Analytics", href: "/spoon/marketing/analytics" },
      { icon: FileText, label: "Content", href: "/spoon/marketing/content" },
    ],
    sales: [
      { icon: LayoutDashboard, label: "Dashboard", href: "/spoon/sales" },
      { icon: Target, label: "Leads", href: "/spoon/sales/leads" },
      { icon: Briefcase, label: "Deals", href: "/spoon/sales/deals" },
      { icon: TrendingUp, label: "Pipeline", href: "/spoon/sales/pipeline" },
      { icon: Heart, label: "Customers", href: "/spoon/sales/customers" },
      { icon: BarChart3, label: "Reports", href: "/spoon/sales/reports" },
    ],
    customer: []
  };

  const roleLabels: Record<string, string> = {
    admin: "ADMIN",
    manager: "MANAGER",
    cashier: "CASHIER",
    stockkeeper: "STOCK",
    office_member: "OFFICE",
    vendor: "VENDOR",
    affiliate: "AFFILIATE",
    hr: "HR",
    marketing: "MARKETING",
    sales: "SALES",
    customer: "CUSTOMER"
  };

  const roleColors: Record<string, string> = {
    admin: "from-purple-500 to-pink-500",
    manager: "from-blue-500 to-cyan-500",
    cashier: "from-green-500 to-emerald-500",
    stockkeeper: "from-orange-500 to-yellow-500",
    office_member: "from-indigo-500 to-violet-500",
    vendor: "from-rose-500 to-red-500",
    affiliate: "from-teal-500 to-green-500",
    hr: "from-pink-500 to-rose-500",
    marketing: "from-amber-500 to-orange-500",
    sales: "from-emerald-500 to-teal-500",
    customer: "from-gray-500 to-slate-500"
  };

  const items = navItems[role] || [];

  return (
    <div className="min-h-screen bg-[#050505] flex">
      <aside className="w-64 border-r border-white/10 bg-black/40 backdrop-blur-xl fixed h-full hidden md:flex flex-col z-20">
        <div className="p-6 border-b border-white/10">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <img src="/attached_assets/logo.png" alt="NexCommerce" className="h-8 w-8" />
              <span className="font-heading font-bold text-lg text-white">
                Nex<span className="text-primary">Dashboard</span>
              </span>
            </div>
          </Link>
          <div className={cn(
            "mt-2 px-3 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider w-fit",
            `bg-gradient-to-r ${roleColors[role]} text-white`
          )}>
            {roleLabels[role]} PORTAL
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {items.map((item) => (
            <Link key={item.href} href={item.href}>
              <div className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer group",
                location === item.href 
                  ? "bg-primary/20 text-primary border border-primary/20" 
                  : "text-muted-foreground hover:text-white hover:bg-white/5"
              )}>
                <item.icon className={cn("w-5 h-5", location === item.href && "animate-pulse")} />
                <span className="font-medium">{item.label}</span>
                {location === item.href && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
                )}
              </div>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
            <Avatar className="h-10 w-10 border border-white/20">
              <AvatarImage src={user?.avatar ?? "https://api.dicebear.com/7.x/avataaars/svg?seed=default"} />
              <AvatarFallback>{user?.name?.charAt(0) ?? "U"}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white truncate">{user?.name ?? "Guest User"}</div>
              <div className="text-xs text-muted-foreground truncate">{user?.email ?? "guest@nex.com"}</div>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 md:ml-64 flex flex-col min-h-screen relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-96 bg-primary/5 blur-[100px] pointer-events-none" />
        
        <header className="h-16 border-b border-white/10 bg-black/20 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="md:hidden">
            <Button variant="ghost" size="icon"><Menu className="w-5 h-5" /></Button>
          </div>
          
          <div className="flex-1 max-w-xl mx-4 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-white">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500" />
            </Button>
            {role === 'admin' && (
              <Button size="sm" className="bg-primary/20 text-primary border border-primary/20 hover:bg-primary/30">
                <Wallet className="mr-2 w-4 h-4" /> Connect Wallet
              </Button>
            )}
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
