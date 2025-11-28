import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Plus } from "lucide-react";

export default function VendorProducts() {
  return (
    <DashboardLayout role="vendor">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold text-white">My Products</h1>
            <p className="text-muted-foreground">Manage your inventory and listings</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 w-4 h-4" /> Add Product
          </Button>
        </div>

        {/* Upload Area */}
        <Card className="bg-white/5 border-white/10 border-dashed">
          <CardContent className="p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Upload 3D Model</h3>
            <p className="text-muted-foreground max-w-md mb-6">
              Drag and drop your GLTF/GLB files here. AI will automatically generate 
              product descriptions and analyze mesh quality.
            </p>
            <Button variant="secondary">Select Files</Button>
          </CardContent>
        </Card>

        {/* List would go here (reusing similar structure to admin products but scoped to vendor) */}
        <div className="text-center py-12 text-muted-foreground">
           Displaying 0 products. Start by uploading your first item.
        </div>
      </div>
    </DashboardLayout>
  );
}
