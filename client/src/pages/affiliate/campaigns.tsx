import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Copy, Plus, ExternalLink, BarChart2 } from "lucide-react";

export default function AffiliateCampaigns() {
  return (
    <DashboardLayout role="affiliate">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold text-white">My Campaigns</h1>
            <p className="text-muted-foreground">Create links and track performance</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 w-4 h-4" /> New Campaign
          </Button>
        </div>

        <Card className="bg-white/5 border-white/10 backdrop-blur-md">
          <CardContent className="p-6">
             <div className="flex flex-col md:flex-row gap-4 items-end">
               <div className="flex-1 w-full space-y-2">
                 <label className="text-sm font-medium text-white">Generate Referral Link</label>
                 <Input placeholder="Paste product URL here..." className="bg-black/20 border-white/10" />
               </div>
               <Button className="w-full md:w-auto bg-secondary hover:bg-secondary/90">Generate Link</Button>
             </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {[
            { name: "Summer Sale 2024", link: "nex.com/ref/summer-24", clicks: 1240, conv: "2.4%", earned: "$450" },
            { name: "iPhone 15 Promo", link: "nex.com/ref/iphone-15", clicks: 890, conv: "3.1%", earned: "$890" },
            { name: "Gaming Gear", link: "nex.com/ref/gamer", clicks: 420, conv: "1.8%", earned: "$120" },
          ].map((camp, i) => (
            <div key={i} className="flex flex-col md:flex-row items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
               <div className="flex-1 min-w-0 mb-4 md:mb-0">
                  <div className="font-bold text-white text-lg">{camp.name}</div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                     <span className="font-mono bg-black/20 px-2 py-0.5 rounded">{camp.link}</span>
                     <Button size="icon" variant="ghost" className="h-6 w-6"><Copy className="w-3 h-3"/></Button>
                  </div>
               </div>
               
               <div className="flex items-center gap-8">
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground">Clicks</div>
                    <div className="font-bold text-white">{camp.clicks}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground">Conversion</div>
                    <div className="font-bold text-green-400">{camp.conv}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground">Earnings</div>
                    <div className="font-bold text-primary">{camp.earned}</div>
                  </div>
                  <Button variant="outline" size="icon" className="border-white/10 ml-4">
                    <BarChart2 className="w-4 h-4" />
                  </Button>
               </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
