import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { CategoriesMarquee } from "@/components/categories-marquee";
import { ProductGrid } from "@/components/product-grid";
import { NotificationPopup } from "@/components/notification-popup";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <CategoriesMarquee />
        <ProductGrid />
      </main>
      <Footer />
      <NotificationPopup />
    </div>
  );
}
