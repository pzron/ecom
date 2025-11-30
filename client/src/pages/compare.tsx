import { Navbar } from "@/components/navbar";
import { ProductViewer } from "@/components/3d/product-viewer";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { products } from "@/data/products";
import { useState } from "react";
import { ArrowRightLeft, Check, X } from "lucide-react";
import { Footer } from "@/components/layout/footer";

export default function ComparePage() {
  const [leftId, setLeftId] = useState(products[0].id);
  const [rightId, setRightId] = useState(products[1].id);

  const leftProduct = products.find(p => p.id === leftId) || products[0];
  const rightProduct = products.find(p => p.id === rightId) || products[1];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <h1 className="text-3xl font-heading font-bold text-white flex items-center gap-3">
            <ArrowRightLeft className="w-8 h-8 text-primary" /> 3D Comparison Mode
          </h1>
          <p className="text-muted-foreground">Compare specs, dimensions, and aesthetics side-by-side.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Left Product */}
          <div className="space-y-4">
            <Select value={leftId} onValueChange={setLeftId}>
              <SelectTrigger className="bg-white/5 border-white/10 text-white h-12">
                <SelectValue placeholder="Select Product 1" />
              </SelectTrigger>
              <SelectContent className="bg-black/90 border-white/10 text-white">
                {products.map(p => (
                  <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <div className="h-[400px] rounded-2xl border border-white/10 bg-white/5 overflow-hidden relative">
              <ProductViewer color="#D3C1E7" />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur text-xs font-bold text-white border border-white/10">
                Product A
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-2">{leftProduct.name}</h2>
              <div className="text-2xl font-bold text-primary mb-4">${leftProduct.price.toLocaleString()}</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-muted-foreground">Rating</span>
                  <span className="text-white font-bold">{leftProduct.rating}/5</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-muted-foreground">Category</span>
                  <span className="text-white">{leftProduct.category}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-muted-foreground">Availability</span>
                  <span className={leftProduct.inStock ? "text-green-400" : "text-red-400"}>
                    {leftProduct.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Product */}
          <div className="space-y-4">
            <Select value={rightId} onValueChange={setRightId}>
              <SelectTrigger className="bg-white/5 border-white/10 text-white h-12">
                <SelectValue placeholder="Select Product 2" />
              </SelectTrigger>
              <SelectContent className="bg-black/90 border-white/10 text-white">
                {products.map(p => (
                  <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="h-[400px] rounded-2xl border border-white/10 bg-white/5 overflow-hidden relative">
              <ProductViewer color="#1A1222" />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur text-xs font-bold text-white border border-white/10">
                Product B
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-2">{rightProduct.name}</h2>
              <div className="text-2xl font-bold text-primary mb-4">${rightProduct.price.toLocaleString()}</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-muted-foreground">Rating</span>
                  <span className="text-white font-bold">{rightProduct.rating}/5</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-muted-foreground">Category</span>
                  <span className="text-white">{rightProduct.category}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-muted-foreground">Availability</span>
                  <span className={rightProduct.inStock ? "text-green-400" : "text-red-400"}>
                    {rightProduct.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
