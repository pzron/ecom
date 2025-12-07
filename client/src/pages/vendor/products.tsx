import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, Plus, Package, Search, Filter, MoreVertical,
  Edit, Trash2, Eye, Copy, TrendingUp, TrendingDown,
  CheckCircle, XCircle, Clock, Image, Box, Star,
  ArrowUpDown, Grid, List, Download, RefreshCw
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const products = [
  { 
    id: 1, 
    name: "iPhone 15 Pro Max", 
    sku: "IPH15PM-256", 
    price: "৳149,990", 
    stock: 24, 
    status: "active",
    sales: 156, 
    revenue: "৳23.4M",
    rating: 4.9,
    image: "📱",
    category: "Electronics",
    trend: "+12%"
  },
  { 
    id: 2, 
    name: "MacBook Pro 16\" M3", 
    sku: "MBP16M3-512", 
    price: "৳289,990", 
    stock: 8, 
    status: "low_stock",
    sales: 42, 
    revenue: "৳12.2M",
    rating: 4.8,
    image: "💻",
    category: "Electronics",
    trend: "+8%"
  },
  { 
    id: 3, 
    name: "AirPods Pro 2", 
    sku: "APP2-USB", 
    price: "৳32,990", 
    stock: 156, 
    status: "active",
    sales: 234, 
    revenue: "৳7.7M",
    rating: 4.7,
    image: "🎧",
    category: "Audio",
    trend: "+23%"
  },
  { 
    id: 4, 
    name: "Sony WH-1000XM5", 
    sku: "SONYXM5-BLK", 
    price: "৳42,990", 
    stock: 3, 
    status: "critical",
    sales: 89, 
    revenue: "৳3.8M",
    rating: 4.6,
    image: "🎵",
    category: "Audio",
    trend: "-5%"
  },
  { 
    id: 5, 
    name: "iPad Pro 12.9\"", 
    sku: "IPADP129-256", 
    price: "৳159,990", 
    stock: 0, 
    status: "out_of_stock",
    sales: 67, 
    revenue: "৳10.7M",
    rating: 4.8,
    image: "📲",
    category: "Electronics",
    trend: "+15%"
  },
  { 
    id: 6, 
    name: "Apple Watch Ultra 2", 
    sku: "AWU2-49MM", 
    price: "৳119,990", 
    stock: 45, 
    status: "active",
    sales: 128, 
    revenue: "৳15.4M",
    rating: 4.9,
    image: "⌚",
    category: "Wearables",
    trend: "+34%"
  },
];

function HolographicCard({ 
  children, 
  className = "",
  glowColor = "purple"
}: { 
  children: React.ReactNode; 
  className?: string;
  glowColor?: "purple" | "pink" | "cyan" | "green" | "orange" | "yellow";
}) {
  const glowColors = {
    purple: "from-purple-500/20 via-purple-500/5 to-transparent shadow-purple-500/10",
    pink: "from-pink-500/20 via-pink-500/5 to-transparent shadow-pink-500/10",
    cyan: "from-cyan-500/20 via-cyan-500/5 to-transparent shadow-cyan-500/10",
    green: "from-green-500/20 via-green-500/5 to-transparent shadow-green-500/10",
    orange: "from-orange-500/20 via-orange-500/5 to-transparent shadow-orange-500/10",
    yellow: "from-yellow-500/20 via-yellow-500/5 to-transparent shadow-yellow-500/10",
  };

  return (
    <div className={`relative group ${className}`}>
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${glowColors[glowColor]} rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500`} />
      <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {children}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, { bg: string; text: string; label: string }> = {
    active: { bg: "bg-green-500/10", text: "text-green-400", label: "Active" },
    low_stock: { bg: "bg-yellow-500/10", text: "text-yellow-400", label: "Low Stock" },
    critical: { bg: "bg-red-500/10", text: "text-red-400", label: "Critical" },
    out_of_stock: { bg: "bg-gray-500/10", text: "text-gray-400", label: "Out of Stock" },
    draft: { bg: "bg-blue-500/10", text: "text-blue-400", label: "Draft" },
  };

  const style = styles[status] || styles.draft;

  return (
    <Badge className={`${style.bg} ${style.text} border-none`}>
      {style.label}
    </Badge>
  );
}

export default function VendorProducts() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleProductSelection = (id: number) => {
    setSelectedProducts(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map(p => p.id));
    }
  };

  return (
    <DashboardLayout role="vendor">
      <div className="space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-heading font-bold bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                My Products
              </h1>
              <Badge variant="outline" className="border-purple-500/30 text-purple-400 bg-purple-500/10">
                {products.length} Items
              </Badge>
            </div>
            <p className="text-white/60">Manage your inventory and product listings</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" className="border-white/10 bg-white/5 hover:bg-white/10">
              <RefreshCw className="w-4 h-4" />
            </Button>
            <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <HolographicCard glowColor="cyan">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-cyan-500/20">
                  <Upload className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Quick Upload</h3>
                  <p className="text-sm text-white/60">Drag and drop 3D models or product images</p>
                </div>
              </div>
              
              <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-purple-500/30 transition-colors cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mx-auto mb-4">
                  <Image className="w-8 h-8 text-purple-400" />
                </div>
                <p className="text-white/80 mb-2">Drop GLTF/GLB files or images here</p>
                <p className="text-sm text-white/40 mb-4">AI will automatically generate descriptions and analyze quality</p>
                <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10">
                  Select Files
                </Button>
              </div>
            </div>
          </HolographicCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <HolographicCard glowColor="purple">
            <div className="p-4 border-b border-white/5">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <div className="relative flex-1 md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <Input 
                      placeholder="Search products..." 
                      className="pl-10 bg-white/5 border-white/10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="icon" className="border-white/10 bg-white/5 hover:bg-white/10">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex items-center gap-3">
                  {selectedProducts.length > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-white/60">{selectedProducts.length} selected</span>
                      <Button variant="outline" size="sm" className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                        <Trash2 className="w-3 h-3 mr-1" /> Delete
                      </Button>
                      <Button variant="outline" size="sm" className="border-white/10">
                        Bulk Edit
                      </Button>
                    </div>
                  )}
                  
                  <div className="flex items-center border border-white/10 rounded-lg overflow-hidden">
                    <button 
                      className={`p-2 ${viewMode === 'list' ? 'bg-white/10' : 'hover:bg-white/5'}`}
                      onClick={() => setViewMode('list')}
                    >
                      <List className="w-4 h-4 text-white/60" />
                    </button>
                    <button 
                      className={`p-2 ${viewMode === 'grid' ? 'bg-white/10' : 'hover:bg-white/5'}`}
                      onClick={() => setViewMode('grid')}
                    >
                      <Grid className="w-4 h-4 text-white/60" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {viewMode === 'list' ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-xs uppercase text-white/40 bg-white/[0.02]">
                      <th className="p-4 w-10">
                        <input 
                          type="checkbox" 
                          className="rounded border-white/20 bg-white/5"
                          checked={selectedProducts.length === products.length}
                          onChange={toggleSelectAll}
                        />
                      </th>
                      <th className="p-4">Product</th>
                      <th className="p-4">
                        <button className="flex items-center gap-1 hover:text-white/60">
                          Price <ArrowUpDown className="w-3 h-3" />
                        </button>
                      </th>
                      <th className="p-4">Stock</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Sales</th>
                      <th className="p-4">Revenue</th>
                      <th className="p-4">Rating</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {products.map((product, i) => (
                      <motion.tr 
                        key={product.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.05 }}
                        className="hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="p-4">
                          <input 
                            type="checkbox" 
                            className="rounded border-white/20 bg-white/5"
                            checked={selectedProducts.includes(product.id)}
                            onChange={() => toggleProductSelection(product.id)}
                          />
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center text-2xl">
                              {product.image}
                            </div>
                            <div>
                              <p className="font-medium text-white">{product.name}</p>
                              <p className="text-xs text-white/40">{product.sku}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-white font-medium">{product.price}</td>
                        <td className="p-4">
                          <span className={`font-medium ${
                            product.stock === 0 ? 'text-gray-400' :
                            product.stock < 5 ? 'text-red-400' :
                            product.stock < 20 ? 'text-yellow-400' :
                            'text-green-400'
                          }`}>
                            {product.stock}
                          </span>
                        </td>
                        <td className="p-4">
                          <StatusBadge status={product.status} />
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <span className="text-white">{product.sales}</span>
                            <span className={`text-xs ${
                              product.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'
                            }`}>
                              {product.trend}
                            </span>
                          </div>
                        </td>
                        <td className="p-4 text-white font-medium">{product.revenue}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                            <span className="text-white">{product.rating}</span>
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10">
                              <Eye className="w-4 h-4 text-white/60" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10">
                              <Edit className="w-4 h-4 text-white/60" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10">
                              <MoreVertical className="w-4 h-4 text-white/60" />
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center text-3xl">
                        {product.image}
                      </div>
                      <StatusBadge status={product.status} />
                    </div>
                    <h4 className="font-semibold text-white mb-1">{product.name}</h4>
                    <p className="text-xs text-white/40 mb-3">{product.sku}</p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-bold text-white">{product.price}</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm text-white">{product.rating}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs mb-4">
                      <div className="p-2 rounded-lg bg-white/5">
                        <div className={`font-bold ${product.stock < 10 ? 'text-red-400' : 'text-white'}`}>
                          {product.stock}
                        </div>
                        <div className="text-white/40">Stock</div>
                      </div>
                      <div className="p-2 rounded-lg bg-white/5">
                        <div className="font-bold text-white">{product.sales}</div>
                        <div className="text-white/40">Sales</div>
                      </div>
                      <div className="p-2 rounded-lg bg-white/5">
                        <div className="font-bold text-green-400">{product.trend}</div>
                        <div className="text-white/40">Trend</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1 border-white/10 hover:bg-white/10">
                        <Edit className="w-3 h-3 mr-1" /> Edit
                      </Button>
                      <Button size="sm" variant="outline" className="border-white/10 hover:bg-white/10">
                        <Eye className="w-3 h-3" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            <div className="p-4 border-t border-white/5 flex items-center justify-between">
              <p className="text-sm text-white/40">Showing {products.length} of {products.length} products</p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="border-white/10" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="border-white/10 bg-white/10">
                  1
                </Button>
                <Button variant="outline" size="sm" className="border-white/10" disabled>
                  Next
                </Button>
              </div>
            </div>
          </HolographicCard>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
