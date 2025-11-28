import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AffiliateProfile() {
  return (
    <DashboardLayout role="affiliate">
       <div className="space-y-8 max-w-2xl">
         <div>
            <h1 className="text-3xl font-heading font-bold text-white">Affiliate Profile</h1>
            <p className="text-muted-foreground">Manage your public profile and payout details</p>
         </div>

         <Card className="bg-white/5 border-white/10 backdrop-blur-md">
            <CardContent className="p-8 flex flex-col md:flex-row gap-8 items-start">
               <div className="flex flex-col items-center gap-4">
                  <Avatar className="w-24 h-24 border-2 border-primary">
                     <AvatarImage src="https://github.com/shadcn.png" />
                     <AvatarFallback>AF</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm" className="border-white/10">Change Avatar</Button>
               </div>
               
               <div className="flex-1 w-full space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <Label>First Name</Label>
                        <Input className="bg-black/20 border-white/10" defaultValue="Mike" />
                     </div>
                     <div className="space-y-2">
                        <Label>Last Name</Label>
                        <Input className="bg-black/20 border-white/10" defaultValue="Ross" />
                     </div>
                  </div>
                  <div className="space-y-2">
                     <Label>Email Address</Label>
                     <Input className="bg-black/20 border-white/10" defaultValue="mike@affiliate.com" />
                  </div>
                  <div className="space-y-2">
                     <Label>Payout Method (PayPal Email)</Label>
                     <Input className="bg-black/20 border-white/10" defaultValue="mike.ross@paypal.com" />
                  </div>
                  
                  <Button className="bg-primary hover:bg-primary/90 w-full md:w-auto">Save Changes</Button>
               </div>
            </CardContent>
         </Card>
       </div>
    </DashboardLayout>
  );
}
