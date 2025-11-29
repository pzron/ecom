import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  MessageSquare, X, Send, Paperclip, Sparkles, 
  Search, ShoppingCart, Box, Star, ArrowRight,
  Mic, Image, Loader2, ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { PRODUCTS } from "@/data/products";
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
      <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center flex-shrink-0">
        <Box className="w-6 h-6 text-purple-400" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-white text-sm truncate">{product.name}</h4>
        <div className="flex items-center gap-1 mt-0.5">
          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
          <span className="text-xs text-white/60">{product.rating}</span>
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-sm font-bold text-purple-400">${product.price}</span>
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
      content: "Hello! 👋 I'm your AI shopping assistant powered by NexCommerce. I can help you find products, compare options, track orders, and answer any questions. What are you looking for today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
      product.description.toLowerCase().includes(lowercaseQuery)
    ).slice(0, 3);
  };

  const generateResponse = (userMessage: string): { content: string; products?: typeof PRODUCTS } => {
    const lowercaseMessage = userMessage.toLowerCase();
    
    if (lowercaseMessage.includes("headphone") || lowercaseMessage.includes("audio") || lowercaseMessage.includes("sony")) {
      const products = searchProducts("headphone");
      return {
        content: "I found some excellent headphones for you! The Sony WH-1000XM5 is our top recommendation with industry-leading noise cancellation. Here are my top picks:",
        products: products.length > 0 ? products : undefined
      };
    }
    
    if (lowercaseMessage.includes("phone") || lowercaseMessage.includes("iphone") || lowercaseMessage.includes("smartphone")) {
      const products = searchProducts("iphone");
      return {
        content: "Looking for a new smartphone? The iPhone 15 Pro Max is incredibly popular right now. Here are some options I'd recommend:",
        products: products.length > 0 ? products : undefined
      };
    }
    
    if (lowercaseMessage.includes("laptop") || lowercaseMessage.includes("macbook") || lowercaseMessage.includes("computer")) {
      const products = searchProducts("macbook");
      return {
        content: "For laptops, it depends on your needs! The MacBook Pro with M3 chip is perfect for creative professionals. Here's what I found:",
        products: products.length > 0 ? products : undefined
      };
    }

    if (lowercaseMessage.includes("gaming") || lowercaseMessage.includes("playstation") || lowercaseMessage.includes("controller")) {
      const products = searchProducts("gaming");
      return {
        content: "Gaming enthusiast? I've got great options for you! Check out these gaming products:",
        products: products.length > 0 ? products : undefined
      };
    }

    if (lowercaseMessage.includes("deal") || lowercaseMessage.includes("sale") || lowercaseMessage.includes("discount")) {
      const products = PRODUCTS.filter(p => p.originalPrice).slice(0, 3);
      return {
        content: "🔥 Hot deals alert! Here are some products with amazing discounts right now:",
        products: products.length > 0 ? products : undefined
      };
    }

    if (lowercaseMessage.includes("trending") || lowercaseMessage.includes("popular") || lowercaseMessage.includes("best")) {
      const products = PRODUCTS.sort((a, b) => b.rating - a.rating).slice(0, 3);
      return {
        content: "Here are our top-rated trending products that customers love:",
        products
      };
    }

    if (lowercaseMessage.includes("track") || lowercaseMessage.includes("order") || lowercaseMessage.includes("shipping")) {
      return {
        content: "I'd be happy to help track your order! Please provide your order number (e.g., ORD-XXXX) and I'll look it up for you. You can also check all your orders in your profile page."
      };
    }

    if (lowercaseMessage.includes("compare")) {
      return {
        content: "Great idea to compare! You can add products to compare by clicking the compare icon on any product. Visit the Compare page to see detailed side-by-side comparisons of specs, prices, and reviews."
      };
    }

    if (lowercaseMessage.includes("hello") || lowercaseMessage.includes("hi") || lowercaseMessage.includes("hey")) {
      return {
        content: "Hey there! 👋 Great to chat with you! I'm here to help you find the perfect products. What are you shopping for today?"
      };
    }

    if (lowercaseMessage.includes("thank")) {
      return {
        content: "You're welcome! 😊 Is there anything else I can help you with? Feel free to ask about products, deals, or anything else!"
      };
    }

    const products = searchProducts(userMessage);
    if (products.length > 0) {
      return {
        content: `I found some products matching "${userMessage}":`,
        products
      };
    }

    return {
      content: "I'd be happy to help! Could you tell me more about what you're looking for? I can help you find products, compare options, check deals, or answer questions about our store."
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
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = generateResponse(input);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.content,
        products: response.products,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 500);
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
            className="absolute bottom-20 right-0 w-[360px] h-[550px] bg-gradient-to-b from-[#0f0f15] to-[#0a0a0f] backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-purple-500/10 flex flex-col overflow-hidden"
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
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300">GPT-4</span>
                    </div>
                    <div className="text-xs text-green-400 flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      Online • Ready to help
                    </div>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-white/50 hover:text-white hover:bg-white/10" 
                  onClick={() => setIsOpen(false)}
                  data-testid="close-chat"
                >
                  <X className="w-5 h-5" />
                </Button>
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
                  className="text-white/40 hover:text-white h-9 w-9 hover:bg-white/10"
                >
                  <Image className="w-4 h-4" />
                </Button>
                <div className="flex-1 relative">
                  <Input 
                    placeholder="Ask about products, deals, orders..." 
                    className="bg-white/5 border-white/10 text-sm h-10 pr-10 focus-visible:ring-purple-500 placeholder:text-white/30"
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
