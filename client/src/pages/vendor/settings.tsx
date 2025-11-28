import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";

export default function VendorSettings() {
  return (
    <DashboardLayout role="vendor">
      <div className="space-y-8 max-w-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold text-white">Store Settings</h1>
            <p className="text-muted-foreground">Manage your public profile and payouts</p>
          </div>
        </div>

        <Card className="bg-white/5 border-white/10 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-white">Vendor Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Display Name</Label>
              <Input className="bg-black/20 border-white/10" defaultValue="FutureTech Inc." />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Input className="bg-black/20 border-white/10" defaultValue="Premium electronics and 3D gadgets." />
            </div>
            <div className="space-y-2">
              <Label>Contact Email</Label>
              <Input className="bg-black/20 border-white/10" defaultValue="vendor@futuretech.com" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-white">Payout Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
               <Label>Bank Account (IBAN)</Label>
               <Input className="bg-black/20 border-white/10" value="**** **** **** 4921" readOnly />
            </div>
            <div className="space-y-2">
               <Label>Crypto Wallet (USDT/ETH)</Label>
               <Input className="bg-black/20 border-white/10" value="0x71C...9A21" readOnly />
            </div>
            <Button className="w-full bg-primary hover:bg-primary/90 mt-4">
              <Save className="mr-2 w-4 h-4" /> Update Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
