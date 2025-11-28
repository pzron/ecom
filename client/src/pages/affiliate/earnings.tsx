import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AffiliateEarnings() {
  return (
    <DashboardLayout role="affiliate">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white">Earnings History</h1>
          <p className="text-muted-foreground">Detailed breakdown of your commissions</p>
        </div>

        <Card className="bg-white/5 border-white/10 backdrop-blur-md">
          <CardHeader className="border-b border-white/10">
             <CardTitle className="text-white">Transaction Log</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
             <table className="w-full text-sm">
                <thead className="text-xs uppercase text-muted-foreground bg-white/5">
                   <tr>
                     <th className="px-6 py-3 text-left">Date</th>
                     <th className="px-6 py-3 text-left">Source</th>
                     <th className="px-6 py-3 text-left">Order ID</th>
                     <th className="px-6 py-3 text-right">Commission</th>
                     <th className="px-6 py-3 text-right">Status</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                   {[
                     { date: "Nov 28, 2024", source: "Summer Sale 2024", order: "#9921", amount: "+$45.00", status: "Pending" },
                     { date: "Nov 27, 2024", source: "iPhone 15 Promo", order: "#9882", amount: "+$120.00", status: "Cleared" },
                     { date: "Nov 25, 2024", source: "iPhone 15 Promo", order: "#9711", amount: "+$120.00", status: "Cleared" },
                     { date: "Nov 24, 2024", source: "Gaming Gear", order: "#9650", amount: "+$12.50", status: "Cleared" },
                   ].map((row, i) => (
                     <tr key={i} className="hover:bg-white/5">
                        <td className="px-6 py-4 text-muted-foreground">{row.date}</td>
                        <td className="px-6 py-4 text-white font-medium">{row.source}</td>
                        <td className="px-6 py-4 text-muted-foreground">{row.order}</td>
                        <td className="px-6 py-4 text-right text-green-400 font-bold">{row.amount}</td>
                        <td className="px-6 py-4 text-right">
                           <Badge variant="outline" className={`border-none ${row.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'}`}>
                              {row.status}
                           </Badge>
                        </td>
                     </tr>
                   ))}
                </tbody>
             </table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
