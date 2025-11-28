import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save } from "lucide-react";

export default function AdminSettings() {
  return (
    <DashboardLayout role="admin">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold text-white">System Settings</h1>
            <p className="text-muted-foreground">Configure platform parameters</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Save className="mr-2 w-4 h-4" /> Save Changes
          </Button>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="bg-transparent border-b border-white/10 w-full justify-start h-auto p-0 rounded-none gap-6">
            <TabsTrigger value="general" className="px-0 py-4 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary text-lg">General</TabsTrigger>
            <TabsTrigger value="payment" className="px-0 py-4 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary text-lg">Payments & Crypto</TabsTrigger>
            <TabsTrigger value="security" className="px-0 py-4 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary text-lg">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
             <Card className="bg-white/5 border-white/10 backdrop-blur-md">
               <CardHeader>
                 <CardTitle className="text-white">Store Information</CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Store Name</Label>
                      <Input className="bg-black/20 border-white/10" defaultValue="NexCommerce" />
                    </div>
                    <div className="space-y-2">
                      <Label>Support Email</Label>
                      <Input className="bg-black/20 border-white/10" defaultValue="support@nex.com" />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <Label>Store Currency</Label>
                    <Input className="bg-black/20 border-white/10" defaultValue="USD ($)" />
                 </div>
               </CardContent>
             </Card>

             <Card className="bg-white/5 border-white/10 backdrop-blur-md">
               <CardHeader>
                 <CardTitle className="text-white">Features</CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                 <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-white">Maintenance Mode</Label>
                      <p className="text-xs text-muted-foreground">Disable store for visitors</p>
                    </div>
                    <Switch />
                 </div>
                 <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-white">Enable 3D Viewer</Label>
                      <p className="text-xs text-muted-foreground">Show 3D models on product pages</p>
                    </div>
                    <Switch defaultChecked />
                 </div>
               </CardContent>
             </Card>
          </TabsContent>

          <TabsContent value="payment">
             <Card className="bg-white/5 border-white/10 backdrop-blur-md">
               <CardHeader>
                 <CardTitle className="text-white">Web3 Integration</CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                  <div className="space-y-2">
                     <Label>Wallet Connect Project ID</Label>
                     <Input className="bg-black/20 border-white/10" type="password" value="****************" />
                  </div>
                  <div className="flex items-center gap-4">
                     <Switch defaultChecked />
                     <Label>Accept ETH</Label>
                  </div>
                  <div className="flex items-center gap-4">
                     <Switch defaultChecked />
                     <Label>Accept SOL</Label>
                  </div>
               </CardContent>
             </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
