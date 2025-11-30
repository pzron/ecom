import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  MessageSquare, X, Send, Sparkles, 
  Search, ShoppingCart, Box, Star, ArrowRight,
  Mic, MicOff, Image, Loader2, Volume2, VolumeX
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { PRODUCTS, categories } from "@/data/products";
import { Link } from "wouter";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  products?: typeof PRODUCTS;
  timestamp: Date;
}

const quickActions = [
  { label: "Find headphones", icon: Search },
  { label: "Track my order", icon: Box },
  { label: "Best deals today", icon: Star },
];

const suggestedPrompts = [
  "Show me the latest smartphones",
  "I need a laptop for gaming",
  "What's trending this week?",
  "Compare AirPods vs Sony headphones",
];

function ProductCard({ product }: { product: typeof PRODUCTS[0] }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group"
    >
      <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
        {product.image ? (
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <Box className="w-6 h-6 text-purple-400" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-white text-sm truncate">{product.name}</h4>
        <div className="flex items-center gap-1 mt-0.5">
          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
          <span className="text-xs text-white/60">{product.rating} ({product.reviews} reviews)</span>
        </div>
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-purple-400">${product.price}</span>
            {product.originalPrice && (
              <span className="text-xs text-white/40 line-through">${product.originalPrice}</span>
            )}
          </div>
          <Link href={`/products/${product.id}`}>
            <Button 
              size="sm" 
              variant="ghost" 
              className="h-6 text-xs text-purple-400 hover:text-purple-300 p-0"
            >
              View <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex-shrink-0 flex items-center justify-center">
        <Sparkles className="w-4 h-4 text-white" />
      </div>
      <div className="bg-white/10 rounded-2xl rounded-tl-none p-3 flex items-center gap-1">
        <motion.div 
          className="w-2 h-2 rounded-full bg-white/60"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
        />
        <motion.div 
          className="w-2 h-2 rounded-full bg-white/60"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
        />
        <motion.div 
          className="w-2 h-2 rounded-full bg-white/60"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
        />
      </div>
    </div>
  );
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your AI shopping assistant powered by NexCommerce. I can help you find products, compare options, track orders, and answer any questions. What are you looking for today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const searchProducts = (query: string): typeof PRODUCTS => {
    const lowercaseQuery = query.toLowerCase();
    return PRODUCTS.filter(product => 
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery) ||
      product.description?.toLowerCase().includes(lowercaseQuery) ||
      product.shortDescription?.toLowerCase().includes(lowercaseQuery) ||
      product.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    ).slice(0, 3);
  };

  const getProductDetails = (productName: string): string => {
    const product = PRODUCTS.find(p => 
      p.name.toLowerCase().includes(productName.toLowerCase())
    );
    if (product) {
      let details = `The ${product.name} is priced at $${product.price}`;
      if (product.originalPrice) {
        const discount = Math.round((1 - product.price / product.originalPrice) * 100);
        details += ` (${discount}% off from $${product.originalPrice})`;
      }
      details += `. It has a ${product.rating} star rating from ${product.reviews} reviews.`;
      if (product.shortDescription) {
        details += ` ${product.shortDescription}`;
      }
      if (product.colors && product.colors.length > 0) {
        details += ` Available in ${product.colors.map(c => c.name).join(', ')}.`;
      }
      if (product.sizes && product.sizes.length > 0) {
        details += ` Sizes: ${product.sizes.join(', ')}.`;
      }
      details += product.inStock ? " Currently in stock!" : " Currently out of stock.";
      return details;
    }
    return "";
  };

  const getCategoryInfo = (categoryQuery: string): string => {
    const category = categories.find(c => 
      c.name.toLowerCase().includes(categoryQuery.toLowerCase()) ||
      c.slug.toLowerCase().includes(categoryQuery.toLowerCase())
    );
    if (category) {
      const categoryProducts = PRODUCTS.filter(p => p.categorySlug === category.slug);
      return `We have ${categoryProducts.length} products in our ${category.name} category. Would you like me to show you some options?`;
    }
    return "";
  };

  const speakText = (text: string) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;
    
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => 
      v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Karen')
    );
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    synthRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const startVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice input is not supported in your browser. Please use Chrome or Edge.');
      return;
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'en-US';

    let finalTranscript = '';

    recognitionRef.current.onstart = () => {
      setIsListening(true);
    };

    recognitionRef.current.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result: any) => result.transcript)
        .join('');
      finalTranscript = transcript;
      setInput(transcript);
    };

    recognitionRef.current.onerror = () => {
      setIsListening(false);
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
      if (finalTranscript.trim()) {
        const userMessage: Message = {
          id: Date.now().toString(),
          role: "user",
          content: finalTranscript,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        setTimeout(() => {
          const response = generateResponse(finalTranscript);
          const assistantMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: response.content,
            products: response.products,
            timestamp: new Date()
          };
          setMessages(prev => [...prev, assistantMessage]);
          setIsTyping(false);
          
          if (voiceEnabled) {
            speakText(response.content);
          }
        }, 800 + Math.random() * 400);
      }
    };

    recognitionRef.current.start();
  };

  const stopVoiceInput = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const generateResponse = (userMessage: string): { content: string; products?: typeof PRODUCTS } => {
    const lowercaseMessage = userMessage.toLowerCase();
    
    if (lowercaseMessage.includes("headphone") || lowercaseMessage.includes("audio") || lowercaseMessage.includes("sony") || lowercaseMessage.includes("earphone")) {
      const products = searchProducts("headphone");
      const details = getProductDetails("WH-1000XM5");
      return {
        content: `I found some excellent headphones for you! ${details || "The Sony WH-1000XM5 is our top recommendation with industry-leading noise cancellation."} Here are my top picks:`,
        products: products.length > 0 ? products : undefined
      };
    }
    
    if (lowercaseMessage.includes("phone") || lowercaseMessage.includes("iphone") || lowercaseMessage.includes("smartphone") || lowercaseMessage.includes("samsung") || lowercaseMessage.includes("galaxy")) {
      const products = searchProducts("phone");
      const details = getProductDetails("iPhone 15");
      return {
        content: `Looking for a new smartphone? ${details || "We have the latest flagship phones available."} Here are some options I'd recommend:`,
        products: products.length > 0 ? products : undefined
      };
    }
    
    if (lowercaseMessage.includes("laptop") || lowercaseMessage.includes("macbook") || lowercaseMessage.includes("computer") || lowercaseMessage.includes("notebook")) {
      const products = searchProducts("macbook");
      const details = getProductDetails("MacBook Pro");
      return {
        content: `For laptops, it depends on your needs! ${details || "The MacBook Pro with M3 chip is perfect for creative professionals."} Here's what I found:`,
        products: products.length > 0 ? products : undefined
      };
    }

    if (lowercaseMessage.includes("gaming") || lowercaseMessage.includes("playstation") || lowercaseMessage.includes("controller") || lowercaseMessage.includes("ps5") || lowercaseMessage.includes("xbox")) {
      const products = searchProducts("gaming");
      const categoryInfo = getCategoryInfo("gaming");
      return {
        content: `Gaming enthusiast? ${categoryInfo} Check out these gaming products:`,
        products: products.length > 0 ? products : undefined
      };
    }

    if (lowercaseMessage.includes("watch") || lowercaseMessage.includes("apple watch") || lowercaseMessage.includes("smartwatch")) {
      const products = searchProducts("watch");
      const details = getProductDetails("Apple Watch");
      return {
        content: `Looking for a smartwatch? ${details || "We have great options from Apple and other brands."} Here are our top picks:`,
        products: products.length > 0 ? products : undefined
      };
    }

    if (lowercaseMessage.includes("fashion") || lowercaseMessage.includes("clothes") || lowercaseMessage.includes("jacket") || lowercaseMessage.includes("sneaker") || lowercaseMessage.includes("dress")) {
      const products = searchProducts("fashion");
      const categoryInfo = getCategoryInfo("fashion");
      return {
        content: `Looking for fashion items? ${categoryInfo} Here are some stylish options:`,
        products: products.length > 0 ? products : undefined
      };
    }

    if (lowercaseMessage.includes("beauty") || lowercaseMessage.includes("skincare") || lowercaseMessage.includes("makeup") || lowercaseMessage.includes("perfume")) {
      const products = searchProducts("beauty");
      const categoryInfo = getCategoryInfo("beauty");
      return {
        content: `Interested in beauty products? ${categoryInfo} Here are our best sellers:`,
        products: products.length > 0 ? products : undefined
      };
    }

    if (lowercaseMessage.includes("sports") || lowercaseMessage.includes("fitness") || lowercaseMessage.includes("yoga") || lowercaseMessage.includes("exercise")) {
      const products = searchProducts("sports");
      const categoryInfo = getCategoryInfo("sports");
      return {
        content: `Ready to get active? ${categoryInfo} Check out these fitness essentials:`,
        products: products.length > 0 ? products : undefined
      };
    }

    if (lowercaseMessage.includes("home") || lowercaseMessage.includes("kitchen") || lowercaseMessage.includes("coffee") || lowercaseMessage.includes("furniture")) {
      const products = searchProducts("home");
      const categoryInfo = getCategoryInfo("home");
      return {
        content: `Looking for home items? ${categoryInfo} Here are some great options:`,
        products: products.length > 0 ? products : undefined
      };
    }

    if (lowercaseMessage.includes("deal") || lowercaseMessage.includes("sale") || lowercaseMessage.includes("discount") || lowercaseMessage.includes("cheap") || lowercaseMessage.includes("save")) {
      const products = PRODUCTS.filter(p => p.originalPrice).sort((a, b) => {
        const discountA = a.originalPrice ? (1 - a.price / a.originalPrice) : 0;
        const discountB = b.originalPrice ? (1 - b.price / b.originalPrice) : 0;
        return discountB - discountA;
      }).slice(0, 3);
      return {
        content: "Hot deals alert! Here are some products with amazing discounts right now. You can save up to 25% on select items:",
        products: products.length > 0 ? products : undefined
      };
    }

    if (lowercaseMessage.includes("trending") || lowercaseMessage.includes("popular") || lowercaseMessage.includes("best") || lowercaseMessage.includes("top rated")) {
      const products = PRODUCTS.sort((a, b) => b.rating - a.rating).slice(0, 3);
      return {
        content: "Here are our top-rated trending products that customers absolutely love! These have the highest ratings and reviews:",
        products
      };
    }

    if (lowercaseMessage.includes("new") || lowercaseMessage.includes("latest") || lowercaseMessage.includes("arrival")) {
      const products = PRODUCTS.filter(p => p.isNew).slice(0, 3);
      return {
        content: "Check out our latest arrivals! These are the newest products just added to our collection:",
        products: products.length > 0 ? products : undefined
      };
    }

    if (lowercaseMessage.includes("track") || lowercaseMessage.includes("order") || lowercaseMessage.includes("shipping") || lowercaseMessage.includes("delivery")) {
      return {
        content: "I'd be happy to help track your order! Please provide your order number (e.g., ORD-XXXX) and I'll look it up for you. You can also check all your orders in your profile page. Typically, orders are delivered within 3-5 business days."
      };
    }

    if (lowercaseMessage.includes("return") || lowercaseMessage.includes("refund") || lowercaseMessage.includes("exchange")) {
      return {
        content: "Our return policy allows returns within 30 days of purchase. Items must be in original condition with tags attached. For refunds, we process them within 5-7 business days after receiving the returned item. Would you like me to help you start a return?"
      };
    }

    if (lowercaseMessage.includes("compare")) {
      return {
        content: "Great idea to compare! You can add products to compare by clicking the compare icon on any product. Visit the Compare page to see detailed side-by-side comparisons of specs, prices, and reviews. Would you like me to recommend some products to compare?"
      };
    }

    if (lowercaseMessage.includes("category") || lowercaseMessage.includes("categories")) {
      const categoryList = categories.map(c => c.name).join(', ');
      return {
        content: `We have ${categories.length} main categories: ${categoryList}. Which category interests you most? I can show you our best products in any of these!`
      };
    }

    if (lowercaseMessage.includes("price") && lowercaseMessage.includes("range")) {
      return {
        content: "Our products range from $59 for accessories to $2,999 for premium items like Swiss watches. What's your budget? I can find the perfect products within your price range!"
      };
    }

    if (lowercaseMessage.includes("hello") || lowercaseMessage.includes("hi") || lowercaseMessage.includes("hey") || lowercaseMessage.includes("good morning") || lowercaseMessage.includes("good afternoon")) {
      return {
        content: "Hey there! Great to chat with you! I'm your AI shopping assistant, and I'm here to help you find exactly what you're looking for. I know everything about our products, from detailed specs to current deals. What can I help you with today?"
      };
    }

    if (lowercaseMessage.includes("thank") || lowercaseMessage.includes("thanks")) {
      return {
        content: "You're very welcome! It's my pleasure to help. Is there anything else you'd like to know about our products or services? I'm always here to assist!"
      };
    }

    if (lowercaseMessage.includes("bye") || lowercaseMessage.includes("goodbye")) {
      return {
        content: "Goodbye! It was great chatting with you. Feel free to come back anytime you need help shopping. Have a wonderful day!"
      };
    }

    if (lowercaseMessage.includes("help") || lowercaseMessage.includes("what can you do")) {
      return {
        content: "I can help you with lots of things! I can find products based on your needs, give you detailed information about any product, show you current deals and discounts, help you compare products, track orders, explain our return policy, and recommend items based on your preferences. Just ask me anything!"
      };
    }

    const products = searchProducts(userMessage);
    if (products.length > 0) {
      const firstProduct = products[0];
      const details = getProductDetails(firstProduct.name);
      return {
        content: `I found some products matching "${userMessage}". ${details ? details : ''} Here are the results:`,
        products
      };
    }

    return {
      content: "I'd be happy to help! I have detailed knowledge of all our products including specifications, prices, and availability. Could you tell me more about what you're looking for? For example, you could ask me about electronics, fashion, beauty products, or any specific item!"
    };
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = generateResponse(currentInput);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.content,
        products: response.products,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
      
      if (voiceEnabled) {
        speakText(response.content);
      }
    }, 800 + Math.random() * 400);
  };

  const handleQuickAction = (action: string) => {
    setInput(action);
    setTimeout(() => handleSend(), 100);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-20 right-0 w-[380px] h-[580px] bg-gradient-to-b from-[#0f0f15] to-[#0a0a0f] backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-purple-500/10 flex flex-col overflow-hidden"
            data-testid="chat-window"
          >
            <div className="p-4 border-b border-white/10 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <motion.div 
                      className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Sparkles className="w-5 h-5 text-white" />
                    </motion.div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0f0f15]" />
                  </div>
                  <div>
                    <div className="font-bold text-white flex items-center gap-2">
                      Nex AI
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300">Smart</span>
                    </div>
                    <div className="text-xs text-green-400 flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      {isSpeaking ? "Speaking..." : isListening ? "Listening..." : "Online • Ready to help"}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className={`h-8 w-8 ${voiceEnabled ? 'text-purple-400' : 'text-white/30'} hover:text-white hover:bg-white/10`}
                    onClick={() => {
                      setVoiceEnabled(!voiceEnabled);
                      if (isSpeaking) stopSpeaking();
                    }}
                    title={voiceEnabled ? "Disable voice" : "Enable voice"}
                  >
                    {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-white/50 hover:text-white hover:bg-white/10" 
                    onClick={() => {
                      setIsOpen(false);
                      stopSpeaking();
                    }}
                    data-testid="close-chat"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-white/10">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  {message.role === "assistant" ? (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex-shrink-0 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex-shrink-0 flex items-center justify-center text-xs text-white font-bold">
                      You
                    </div>
                  )}
                  <div className={`max-w-[80%] space-y-2 ${message.role === "user" ? "items-end" : ""}`}>
                    <div className={`rounded-2xl p-3 text-sm ${
                      message.role === "assistant" 
                        ? "bg-white/10 rounded-tl-none text-white" 
                        : "bg-gradient-to-r from-purple-500/30 to-pink-500/30 border border-purple-500/20 rounded-tr-none text-white"
                    }`}>
                      {message.content}
                    </div>
                    {message.products && message.products.length > 0 && (
                      <div className="space-y-2">
                        {message.products.map((product) => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            {messages.length === 1 && (
              <div className="px-4 pb-3">
                <p className="text-xs text-white/40 mb-2">Try asking:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedPrompts.slice(0, 2).map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => { setInput(prompt); }}
                      className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="p-4 border-t border-white/10 bg-white/5">
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`h-9 w-9 rounded-full ${isListening ? 'bg-purple-500/30 text-purple-300' : 'text-white/40 hover:text-white hover:bg-white/10'}`}
                  onClick={isListening ? stopVoiceInput : startVoiceInput}
                  title={isListening ? "Stop listening" : "Voice input"}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </Button>
                <div className="flex-1 relative">
                  <Input 
                    placeholder={isListening ? "Listening..." : "Ask about products, deals, orders..."} 
                    className={`bg-white/5 border-white/10 text-sm h-10 pr-10 focus-visible:ring-purple-500 placeholder:text-white/30 ${isListening ? 'border-purple-500 bg-purple-500/10' : ''}`}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    data-testid="chat-input"
                  />
                </div>
                <Button 
                  size="icon" 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 h-10 w-10"
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  data-testid="send-message"
                >
                  {isTyping ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>
              {isListening && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-purple-400 text-center mt-2"
                >
                  Speak now... I'm listening
                </motion.p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30 flex items-center justify-center border border-white/20"
        data-testid="chat-toggle"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageSquare className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {!isOpen && (
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-[#0a0a0f]"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.button>
    </div>
  );
}
