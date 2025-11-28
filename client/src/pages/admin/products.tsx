import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { products } from "@/data/products";
import { Search, Edit2, Trash2, Plus, Box } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminProducts() {
  return (
    <DashboardLayout role="admin">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold text-white">Product Management</h1>
            <p className="text-muted-foreground">Manage catalog, prices, and 3D assets</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 w-4 h-4" /> Add New Product
          </Button>
        </div>

        <Card className="bg-white/5 border-white/10 backdrop-blur-md">
          <CardHeader className="border-b border-white/10 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex gap-4">
                <Button variant="ghost" className="text-primary bg-primary/10">All Products</Button>
                <Button variant="ghost" className="text-muted-foreground hover:text-white">Low Stock</Button>
                <Button variant="ghost" className="text-muted-foreground hover:text-white">Drafts</Button>
              </div>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search products..." className="pl-9 bg-black/20 border-white/10" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid grid-cols-1 gap-4 p-4">
              {products.map((product, i) => (
                <motion.div 
                  key={product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all group"
                >
                  <div className="w-16 h-16 rounded-lg bg-white p-2 flex-shrink-0">
                    <img src={product.image} className="w-full h-full object-contain" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-white truncate">{product.name}</h3>
                      {product.isNew && <Badge className="bg-secondary text-xs">New</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground">{product.category} • ID: {product.id}</p>
                  </div>

                  <div className="flex items-center gap-8 px-4 border-x border-white/5">
                    <div>
                      <div className="text-xs text-muted-foreground">Price</div>
                      <div className="font-bold text-white">${product.price.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Stock</div>
                      <div className="font-bold text-green-400">124</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Status</div>
                      <Badge variant="outline" className="border-green-500/30 text-green-400 bg-green-500/10">Active</Badge>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                    <Button size="icon" variant="ghost" className="hover:bg-white/10">
                      <Box className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="hover:bg-blue-500/20 text-blue-400">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="hover:bg-red-500/20 text-red-400">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
