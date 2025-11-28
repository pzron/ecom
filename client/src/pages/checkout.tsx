import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { useState } from "react";
import { Check, CreditCard, Truck, Package, Wallet, ChevronRight } from "lucide-react";

export default function CheckoutPage() {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white pb-20">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 max-w-4xl">
        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-12 relative">
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-white/10 -z-10" />
          {[
            { icon: Package, label: "Cart" },
            { icon: Truck, label: "Shipping" },
            { icon: CreditCard, label: "Payment" },
            { icon: Check, label: "Confirm" }
          ].map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-2 bg-background px-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                step > i + 1 ? "bg-primary border-primary text-white" :
                step === i + 1 ? "bg-background border-primary text-primary shadow-[0_0_15px_rgba(168,85,247,0.5)]" :
                "bg-background border-white/10 text-muted-foreground"
              }`}>
                <s.icon className="w-5 h-5" />
              </div>
              <span className={`text-xs font-medium ${step === i + 1 ? "text-primary" : "text-muted-foreground"}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            {step === 1 && (
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                <h2 className="text-2xl font-bold text-white mb-6">Shipping Details</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>First Name</Label>
                    <Input className="bg-black/20 border-white/10" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label>Last Name</Label>
                    <Input className="bg-black/20 border-white/10" placeholder="Doe" />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label>Address</Label>
                    <Input className="bg-black/20 border-white/10" placeholder="123 Future Street" />
                  </div>
                  <div className="space-y-2">
                    <Label>City</Label>
                    <Input className="bg-black/20 border-white/10" placeholder="Tech City" />
                  </div>
                  <div className="space-y-2">
                    <Label>Postal Code</Label>
                    <Input className="bg-black/20 border-white/10" placeholder="10101" />
                  </div>
                </div>
                <Button 
                  className="w-full mt-8 bg-primary hover:bg-primary/90 h-12 text-lg"
                  onClick={() => setStep(2)}
                >
                  Continue to Payment
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                <h2 className="text-2xl font-bold text-white mb-6">Payment Method</h2>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-xl border border-primary bg-primary/10 cursor-pointer flex flex-col items-center gap-2">
                    <CreditCard className="w-8 h-8 text-primary" />
                    <span className="font-bold text-white">Credit Card</span>
                  </div>
                  <div className="p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 cursor-pointer flex flex-col items-center gap-2 transition-colors">
                    <Wallet className="w-8 h-8 text-white" />
                    <span className="font-medium text-muted-foreground">Crypto Wallet</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Card Number</Label>
                    <Input className="bg-black/20 border-white/10" placeholder="0000 0000 0000 0000" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Expiry</Label>
                      <Input className="bg-black/20 border-white/10" placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                      <Label>CVC</Label>
                      <Input className="bg-black/20 border-white/10" placeholder="123" />
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full mt-8 bg-green-500 hover:bg-green-600 h-12 text-lg shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                  onClick={() => setStep(3)}
                >
                  Pay $47,298.00
                </Button>
              </div>
            )}

            {step === 3 && (
              <div className="p-12 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-center">
                <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(34,197,94,0.5)] animate-bounce">
                  <Check className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Order Confirmed!</h2>
                <p className="text-muted-foreground mb-8">Your futuristic gear is being prepared for teleportation (shipping).</p>
                <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/10">
                  Return to Home
                </Button>
              </div>
            )}
          </motion.div>

          {/* Order Summary Sidebar */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md sticky top-24">
              <h3 className="font-bold text-white mb-4">Order Summary</h3>
              <div className="space-y-4 mb-4">
                <div className="flex items-center gap-3">
                   <div className="w-12 h-12 rounded-lg bg-white p-1">
                      <img src="https://public.readdy.ai/ai/img_res/3ecb9515515c5565557f3118f811827c.jpg" className="w-full h-full object-contain"/>
                   </div>
                   <div className="flex-1">
                      <div className="text-sm font-medium text-white">iPhone 15 Pro Max</div>
                      <div className="text-xs text-muted-foreground">Qty: 1</div>
                   </div>
                   <div className="text-sm font-bold text-white">$45,999</div>
                </div>
                <div className="flex items-center gap-3">
                   <div className="w-12 h-12 rounded-lg bg-white p-1">
                      <img src="https://readdy.ai/api/search-image?query=premium%20black%20Sony%20noise%20cancelling%20over%20ear%20headphones%20floating%20on%20pure%20white%20background%20soft%20shadows%20product%20photography%20style&width=400&height=400&seq=e4&orientation=squarish" className="w-full h-full object-contain"/>
                   </div>
                   <div className="flex-1">
                      <div className="text-sm font-medium text-white">Sony Headphones</div>
                      <div className="text-xs text-muted-foreground">Qty: 2</div>
                   </div>
                   <div className="text-sm font-bold text-white">$1,299</div>
                </div>
              </div>
              
              <div className="h-px bg-white/10 my-4" />
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                   <span>Subtotal</span>
                   <span>$47,298.00</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                   <span>Shipping</span>
                   <span className="text-green-400">Free</span>
                </div>
                <div className="flex justify-between text-white font-bold text-lg mt-4">
                   <span>Total</span>
                   <span className="text-primary">$47,298.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
