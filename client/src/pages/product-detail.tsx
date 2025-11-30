import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { categories, products, Product } from "@/data/products";
import { Heart, ShoppingCart, Star, Send, Play, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useRoute } from "wouter";
import { useState, useEffect } from "react";
import { Footer } from "@/components/layout/footer";
import { useCartStore } from "@/stores/cart";
import { Input } from "@/components/ui/input";

export default function ProductDetailPage() {
  const [, params] = useRoute("/product/:id");
  const productId = params?.id;
  
  const product = products.find(p => p.id === productId);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([
    { id: 1, author: "John Doe", rating: 5, text: "Excellent product! Highly recommended.", date: "2 days ago" },
    { id: 2, author: "Jane Smith", rating: 4, text: "Great quality, fast shipping.", date: "5 days ago" },
  ]);
  const [userPurchased, setUserPurchased] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const addToCart = useCartStore((state: any) => state.addItem);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <Navbar />
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Product not found</h1>
          <Link href="/products">
            <Button className="bg-gradient-to-r from-primary to-secondary">Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const similarProducts = products.filter(
    p => p.categorySlug === product.categorySlug && p.id !== product.id
  ).slice(0, 6);

  const topProducts = products.filter(p => p.isBestseller || p.isFeatured).slice(0, 6);

  const handleAddReview = () => {
    if (reviewText.trim()) {
      const newReview = {
        id: reviews.length + 1,
        author: "You",
        rating: reviewRating,
        text: reviewText,
        date: "just now"
      };
      setReviews([newReview, ...reviews]);
      setReviewText("");
      setReviewRating(5);
      setShowReviewForm(false);
    }
  };

  const productImages = product.images || [product.image];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 mb-8 text-sm text-muted-foreground"
          >
            <Link href="/">
              <span className="hover:text-white cursor-pointer transition">Home</span>
            </Link>
            <span>/</span>
            <Link href="/products">
              <span className="hover:text-white cursor-pointer transition">Products</span>
            </Link>
            <span>/</span>
            <span className="text-white">{product.name}</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Product Media Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              {/* Main Image */}
              <div className="relative bg-white rounded-2xl overflow-hidden group aspect-square flex items-center justify-center">
                {showVideo ? (
                  <div className="w-full h-full flex items-center justify-center bg-black/20">
                    <div className="text-center">
                      <Play className="w-16 h-16 text-white/40 mx-auto mb-4" />
                      <p className="text-white/60">Video Preview</p>
                      <p className="text-sm text-white/40 mt-2">Product demonstration video</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <img 
                      src={productImages[selectedImage]} 
                      alt={product.name}
                      className="object-contain w-full h-full p-8"
                    />
                    {product.has3D && (
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-primary to-secondary text-white px-3 py-1 rounded-full text-xs font-semibold">
                        3D View Available
                      </div>
                    )}
                  </>
                )}
                
                {/* Video Toggle Button */}
                <Button
                  onClick={() => setShowVideo(!showVideo)}
                  className="absolute bottom-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 backdrop-blur-md border border-white/20"
                >
                  {showVideo ? <X className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </Button>
              </div>

              {/* Image Thumbnails */}
              <div className="flex gap-3 overflow-x-auto pb-2">
                {productImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedImage(idx);
                      setShowVideo(false);
                    }}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === idx
                        ? 'border-primary bg-white/10'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
                
                {/* Video Thumbnail */}
                <button
                  onClick={() => setShowVideo(!showVideo)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 flex items-center justify-center transition-all ${
                    showVideo
                      ? 'border-primary bg-gradient-to-br from-primary/30 to-secondary/30'
                      : 'border-white/10 hover:border-white/30 bg-white/5'
                  }`}
                >
                  <Play className="w-6 h-6 text-white/40" />
                </button>
              </div>
            </motion.div>

            {/* Product Details Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col justify-between"
            >
              {/* Header */}
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    {product.isNew && <Badge className="bg-secondary text-white mb-2">New</Badge>}
                    {product.isBestseller && <Badge className="bg-gradient-to-r from-primary to-secondary text-white mb-2">Bestseller</Badge>}
                    <h1 className="text-3xl md:text-4xl font-heading font-bold text-white">{product.name}</h1>
                  </div>
                  <Button size="icon" className="rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white flex-shrink-0">
                    <Heart className="w-5 h-5" />
                  </Button>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-white/20'}`}
                      />
                    ))}
                  </div>
                  <span className="text-white font-semibold">{product.rating}</span>
                  <span className="text-muted-foreground text-sm">({product.reviews.toLocaleString()} reviews)</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-white">${product.price.toLocaleString()}</span>
                  {product.originalPrice && (
                    <span className="text-xl text-muted-foreground line-through">${product.originalPrice.toLocaleString()}</span>
                  )}
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-base">{product.description || product.shortDescription}</p>

                {/* Stock Status */}
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-400' : 'bg-red-400'}`} />
                  <span className={product.inStock ? 'text-green-400' : 'text-red-400'}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>

              {/* Product Options */}
              {(product.colors || product.sizes) && (
                <div className="space-y-4 py-6 border-y border-white/10">
                  {product.colors && (
                    <div>
                      <label className="block text-sm font-medium text-white mb-3">Color</label>
                      <div className="flex gap-3">
                        {product.colors.map((color) => (
                          <button
                            key={color.value}
                            className="w-8 h-8 rounded-full border-2 border-white/20 hover:border-white/60 transition-all"
                            style={{ backgroundColor: color.value }}
                            title={color.name}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  {product.sizes && (
                    <div>
                      <label className="block text-sm font-medium text-white mb-3">Size/Capacity</label>
                      <div className="flex gap-2 flex-wrap">
                        {product.sizes.map((size) => (
                          <button
                            key={size}
                            className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all text-sm font-medium"
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Add to Cart */}
              <div className="flex gap-3 pt-6">
                <div className="flex items-center border border-white/10 rounded-lg bg-white/5 px-3">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="py-2 text-white/60 hover:text-white">−</button>
                  <span className="px-4 py-2 text-white font-medium w-12 text-center">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="py-2 text-white/60 hover:text-white">+</button>
                </div>
                <Button
                  onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, image: product.image, quantity })}
                  className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-bold gap-2 text-base py-6"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </Button>
              </div>

              {/* Specs */}
              {product.specifications && (
                <div className="border-t border-white/10 pt-6 mt-6 space-y-3">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{key}</span>
                      <span className="text-white font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* Reviews Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <Tabs defaultValue="reviews" className="w-full">
              <TabsList className="bg-white/5 border border-white/10 mb-6">
                <TabsTrigger value="reviews" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary">
                  Reviews ({reviews.length})
                </TabsTrigger>
                <TabsTrigger value="specs" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary">
                  Specifications
                </TabsTrigger>
              </TabsList>

              <TabsContent value="reviews" className="space-y-6">
                {/* Write Review Button */}
                {userPurchased && !showReviewForm && (
                  <Button
                    onClick={() => setShowReviewForm(true)}
                    className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Write a Review
                  </Button>
                )}

                {/* Review Form */}
                <AnimatePresence>
                  {showReviewForm && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4"
                    >
                      <h3 className="text-lg font-bold text-white">Share your thoughts</h3>
                      
                      <div>
                        <label className="block text-sm font-medium text-white mb-3">Rating</label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => setReviewRating(star)}
                              className="transition-transform hover:scale-110"
                            >
                              <Star
                                className={`w-7 h-7 ${star <= reviewRating ? 'fill-yellow-400 text-yellow-400' : 'text-white/20'}`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white mb-2">Your Review</label>
                        <textarea
                          value={reviewText}
                          onChange={(e) => setReviewText(e.target.value)}
                          placeholder="Share your experience with this product..."
                          className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/40 resize-none rounded-lg p-3 focus:outline-none focus:border-primary/50"
                          rows={4}
                        />
                      </div>

                      <div className="flex gap-3">
                        <Button
                          onClick={handleAddReview}
                          disabled={!reviewText.trim()}
                          className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 disabled:opacity-50"
                        >
                          Post Review
                        </Button>
                        <Button
                          onClick={() => setShowReviewForm(false)}
                          variant="outline"
                          className="border-white/20 text-white"
                        >
                          Cancel
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Reviews List */}
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-white">{review.author}</h4>
                          <p className="text-xs text-muted-foreground">{review.date}</p>
                        </div>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-white/20'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-white/80 text-sm">{review.text}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="specs" className="space-y-4">
                {product.specifications ? (
                  <div className="space-y-3">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center border-b border-white/10 pb-3">
                        <span className="text-white font-medium">{key}</span>
                        <span className="text-muted-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No specifications available</p>
                )}
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Similar Products */}
          {similarProducts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-heading font-bold text-white mb-8">Similar Products</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {similarProducts.map((p) => (
                  <Link key={p.id} href={`/product/${p.id}`}>
                    <Card className="glass-card border-white/10 bg-white/5 hover:bg-white/10 overflow-hidden group hover:border-primary/50 transition-all duration-300 cursor-pointer h-full flex flex-col">
                      <CardContent className="p-0 relative flex-1">
                        {p.isNew && <Badge className="absolute top-2 left-2 bg-secondary text-white border-none z-10 text-xs">New</Badge>}
                        <div className="aspect-square overflow-hidden bg-white p-2 flex items-center justify-center">
                          <img src={p.image} alt={p.name} className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-500" />
                        </div>
                      </CardContent>
                      <CardFooter className="p-2.5 flex flex-col items-start gap-1 flex-1 justify-between">
                        <div className="w-full">
                          <h3 className="font-heading font-bold text-white text-xs line-clamp-2 group-hover:text-primary transition-colors mb-1">
                            {p.name}
                          </h3>
                          <div className="flex items-center gap-1 mb-1">
                            <div className="flex items-center gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-2 h-2 ${i < Math.floor(p.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-white/20'}`} />
                              ))}
                            </div>
                            <span className="text-xs text-white/50">({p.reviews})</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between w-full">
                          <span className="text-xs font-bold text-white">${p.price.toLocaleString()}</span>
                          <Button size="icon" className="rounded-full bg-gradient-to-r from-primary to-secondary h-6 w-6">
                            <ShoppingCart className="w-3 h-3" />
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}

          {/* Top Products */}
          {topProducts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-3xl font-heading font-bold text-white mb-8">Best Sellers & Featured</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {topProducts.map((p) => (
                  <Link key={p.id} href={`/product/${p.id}`}>
                    <Card className="glass-card border-white/10 bg-white/5 hover:bg-white/10 overflow-hidden group hover:border-primary/50 transition-all duration-300 cursor-pointer h-full flex flex-col">
                      <CardContent className="p-0 relative flex-1">
                        {p.isBestseller && <Badge className="absolute top-2 left-2 bg-gradient-to-r from-primary to-secondary text-white border-none z-10 text-xs">Bestseller</Badge>}
                        {p.isNew && <Badge className="absolute top-2 left-2 bg-secondary text-white border-none z-10 text-xs">New</Badge>}
                        <div className="aspect-square overflow-hidden bg-white p-2 flex items-center justify-center">
                          <img src={p.image} alt={p.name} className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-500" />
                        </div>
                      </CardContent>
                      <CardFooter className="p-2.5 flex flex-col items-start gap-1 flex-1 justify-between">
                        <div className="w-full">
                          <h3 className="font-heading font-bold text-white text-xs line-clamp-2 group-hover:text-primary transition-colors mb-1">
                            {p.name}
                          </h3>
                          <div className="flex items-center gap-1 mb-1">
                            <div className="flex items-center gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-2 h-2 ${i < Math.floor(p.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-white/20'}`} />
                              ))}
                            </div>
                            <span className="text-xs text-white/50">({p.reviews})</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between w-full">
                          <span className="text-xs font-bold text-white">${p.price.toLocaleString()}</span>
                          <Button size="icon" className="rounded-full bg-gradient-to-r from-primary to-secondary h-6 w-6">
                            <ShoppingCart className="w-3 h-3" />
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
