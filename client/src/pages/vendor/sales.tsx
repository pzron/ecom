import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from "recharts";

const vendorSalesData = [
  { name: 'Mon', sales: 1200 },
  { name: 'Tue', sales: 900 },
  { name: 'Wed', sales: 1600 },
  { name: 'Thu', sales: 1100 },
  { name: 'Fri', sales: 2100 },
  { name: 'Sat', sales: 1800 },
  { name: 'Sun', sales: 2400 },
];

export default function VendorSales() {
  return (
    <DashboardLayout role="vendor">
       <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white">Sales & Payouts</h1>
          <p className="text-muted-foreground">Track your revenue and withdrawal history</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <Card className="bg-white/5 border-white/10 backdrop-blur-md">
             <CardContent className="p-6">
               <div className="text-sm text-muted-foreground mb-1">Total Earnings</div>
               <div className="text-3xl font-bold text-white">$14,290.00</div>
             </CardContent>
           </Card>
           <Card className="bg-white/5 border-white/10 backdrop-blur-md">
             <CardContent className="p-6">
               <div className="text-sm text-muted-foreground mb-1">Pending Payout</div>
               <div className="text-3xl font-bold text-yellow-400">$2,450.00</div>
             </CardContent>
           </Card>
           <Card className="bg-white/5 border-white/10 backdrop-blur-md">
             <CardContent className="p-6">
               <div className="text-sm text-muted-foreground mb-1">Next Payout Date</div>
               <div className="text-3xl font-bold text-white">Nov 30</div>
             </CardContent>
           </Card>
        </div>

        <Card className="bg-white/5 border-white/10 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-white">Weekly Performance</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={vendorSalesData}>
                 <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                 <XAxis dataKey="name" stroke="#888" />
                 <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{ backgroundColor: '#1a1222', border: '1px solid rgba(255,255,255,0.1)' }} />
                 <Bar dataKey="sales" fill="#3b82f6" radius={[4, 4, 0, 0]} />
               </BarChart>
             </ResponsiveContainer>
          </CardContent>
        </Card>
       </div>
    </DashboardLayout>
  );
}
