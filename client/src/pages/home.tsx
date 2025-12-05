import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { ProductGrid } from "@/components/product-grid";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <ProductGrid />
      </main>
      <Footer />
    </div>
  );
}
