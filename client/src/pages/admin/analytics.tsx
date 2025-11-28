import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from "recharts";
import { Download, Calendar } from "lucide-react";

const salesData = [
  { name: 'Jan', revenue: 4000, profit: 2400 },
  { name: 'Feb', revenue: 3000, profit: 1398 },
  { name: 'Mar', revenue: 2000, profit: 9800 },
  { name: 'Apr', revenue: 2780, profit: 3908 },
  { name: 'May', revenue: 1890, profit: 4800 },
  { name: 'Jun', revenue: 2390, profit: 3800 },
];

const categoryData = [
  { name: 'Electronics', value: 400 },
  { name: 'Fashion', value: 300 },
  { name: 'Home', value: 300 },
  { name: 'Sports', value: 200 },
];

const COLORS = ['#a855f7', '#ec4899', '#3b82f6', '#22c55e'];

export default function AdminAnalytics() {
  return (
    <DashboardLayout role="admin">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold text-white">Analytics Overview</h1>
            <p className="text-muted-foreground">Deep dive into store performance</p>
          </div>
          <div className="flex gap-2">
             <Button variant="outline" className="border-white/10"><Calendar className="mr-2 w-4 h-4"/> Last 30 Days</Button>
             <Button className="bg-primary hover:bg-primary/90"><Download className="mr-2 w-4 h-4"/> Export Report</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white/5 border-white/10 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-white">Revenue vs Profit</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                  <XAxis dataKey="name" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1222', border: '1px solid rgba(255,255,255,0.1)' }}
                  />
                  <Line type="monotone" dataKey="revenue" stroke="#a855f7" strokeWidth={2} />
                  <Line type="monotone" dataKey="profit" stroke="#22c55e" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-white">Sales by Category</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#1a1222', border: '1px solid rgba(255,255,255,0.1)' }} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           <Card className="lg:col-span-2 bg-white/5 border-white/10 backdrop-blur-md">
             <CardHeader>
               <CardTitle className="text-white">Traffic Sources</CardTitle>
             </CardHeader>
             <CardContent className="h-[250px]">
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={[
                   { name: 'Direct', value: 400 },
                   { name: 'Social', value: 300 },
                   { name: 'Organic', value: 500 },
                   { name: 'Referral', value: 200 },
                 ]}>
                   <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                   <XAxis dataKey="name" stroke="#888" />
                   <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{ backgroundColor: '#1a1222', border: '1px solid rgba(255,255,255,0.1)' }} />
                   <Bar dataKey="value" fill="#ec4899" radius={[4, 4, 0, 0]} />
                 </BarChart>
               </ResponsiveContainer>
             </CardContent>
           </Card>

           <Card className="bg-white/5 border-white/10 backdrop-blur-md">
             <CardHeader>
               <CardTitle className="text-white">Top Locations</CardTitle>
             </CardHeader>
             <CardContent className="space-y-4">
               {[
                 { country: "United States", value: "45%" },
                 { country: "United Kingdom", value: "20%" },
                 { country: "Germany", value: "15%" },
                 { country: "Japan", value: "10%" },
               ].map((loc, i) => (
                 <div key={i} className="flex items-center justify-between">
                   <span className="text-sm text-muted-foreground">{loc.country}</span>
                   <div className="flex items-center gap-3 w-1/2">
                     <div className="h-2 bg-white/10 rounded-full flex-1 overflow-hidden">
                       <div className="h-full bg-primary" style={{ width: loc.value }} />
                     </div>
                     <span className="text-xs text-white font-bold w-8 text-right">{loc.value}</span>
                   </div>
                 </div>
               ))}
             </CardContent>
           </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
