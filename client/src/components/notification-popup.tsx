import { useState, useEffect, useCallback, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, Package, Sparkles, ShoppingBag, CheckCircle, ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/use-cart";

interface Notification {
  id: string;
  type: "offer" | "combo" | "cart" | "success";
  title: string;
  message: string;
  icon: ReactNode;
  color: string;
  time: string;
}

const promotionalTemplates: Omit<Notification, "id" | "time">[] = [
  {
    type: "offer",
    title: "Flash Sale!",
    message: "Get 30% off on all Health Items for the next 2 hours",
    icon: <Gift className="w-5 h-5" />,
    color: "from-pink-500 to-rose-500",
  },
  {
    type: "offer",
    title: "Weekend Special",
    message: "Free shipping on orders above ৳500",
    icon: <Sparkles className="w-5 h-5" />,
    color: "from-amber-500 to-orange-500",
  },
  {
    type: "combo",
    title: "New Combo Available!",
    message: "Hair Care Bundle - Save ৳250 when you buy together",
    icon: <ShoppingBag className="w-5 h-5" />,
    color: "from-purple-500 to-pink-500",
  },
  {
    type: "combo",
    title: "Limited Time Combo",
    message: "Skincare Essentials Pack now available at 25% off",
    icon: <Package className="w-5 h-5" />,
    color: "from-cyan-500 to-blue-500",
  },
  {
    type: "offer",
    title: "Member Exclusive",
    message: "Extra 10% off on your next purchase!",
    icon: <Sparkles className="w-5 h-5" />,
    color: "from-violet-500 to-purple-500",
  },
  {
    type: "offer",
    title: "Bundle & Save",
    message: "Buy 2 get 1 free on selected items",
    icon: <Gift className="w-5 h-5" />,
    color: "from-emerald-500 to-teal-500",
  },
];

interface NotificationPopupProps {
  showPromotional?: boolean;
}

export function NotificationPopup({ showPromotional = true }: NotificationPopupProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const { items } = useCart();
  const [lastItemCount, setLastItemCount] = useState(0);

  const generatePromotionalNotification = useCallback(() => {
    const template = promotionalTemplates[Math.floor(Math.random() * promotionalTemplates.length)];
    const id = `notification-${Date.now()}`;
    
    return {
      ...template,
      id,
      time: "Just now",
    };
  }, []);

  const dismissNotification = useCallback((id: string) => {
    setDismissed((prev) => new Set(Array.from(prev).concat(id)));
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
      setDismissed((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }, 300);
  }, []);

  useEffect(() => {
    const currentCount = items.reduce((total, item) => total + item.quantity, 0);
    
    if (currentCount > lastItemCount) {
      const lastAddedItem = items[items.length - 1];
      if (lastAddedItem) {
        const cartNotification: Notification = {
          id: `cart-${Date.now()}`,
          type: "cart",
          title: "Added to Cart!",
          message: `${lastAddedItem.product.name} has been added to your cart`,
          icon: <ShoppingCart className="w-5 h-5" />,
          color: "from-green-500 to-emerald-500",
          time: "Just now",
        };
        
        setNotifications((prev) => [...prev.slice(-1), cartNotification]);
        
        setTimeout(() => {
          dismissNotification(cartNotification.id);
        }, 4000);
      }
    }
    
    setLastItemCount(currentCount);
  }, [items, lastItemCount, dismissNotification]);

  useEffect(() => {
    if (!showPromotional) return;

    const showInitialNotification = setTimeout(() => {
      const notification = generatePromotionalNotification();
      setNotifications([notification]);
      
      setTimeout(() => {
        dismissNotification(notification.id);
      }, 6000);
    }, 5000);

    return () => clearTimeout(showInitialNotification);
  }, [generatePromotionalNotification, dismissNotification, showPromotional]);

  useEffect(() => {
    if (!showPromotional) return;

    const interval = setInterval(() => {
      if (notifications.filter(n => n.type !== "cart").length < 1) {
        const notification = generatePromotionalNotification();
        setNotifications((prev) => [...prev.slice(-1), notification]);
        
        setTimeout(() => {
          dismissNotification(notification.id);
        }, 6000);
      }
    }, 20000);

    return () => clearInterval(interval);
  }, [notifications.length, generatePromotionalNotification, dismissNotification, showPromotional]);

  return (
    <div className="fixed bottom-4 left-4 z-50 flex flex-col gap-3 max-w-sm">
      <AnimatePresence mode="popLayout">
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: -100, scale: 0.8 }}
            animate={{ 
              opacity: dismissed.has(notification.id) ? 0 : 1, 
              x: dismissed.has(notification.id) ? -100 : 0, 
              scale: 1 
            }}
            exit={{ opacity: 0, x: -100, scale: 0.8 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 25 
            }}
            className="relative bg-[#0f0f15]/95 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/50"
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${notification.color} opacity-10`} />
            
            <div className="relative p-4">
              <button
                onClick={() => dismissNotification(notification.id)}
                className="absolute top-2 right-2 p-1 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4 text-white/50 hover:text-white" />
              </button>
              
              <div className="flex items-start gap-3 pr-6">
                <div className={`flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${notification.color} flex items-center justify-center text-white shadow-lg`}>
                  {notification.icon}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h4 className="text-sm font-semibold text-white truncate">
                      {notification.title}
                    </h4>
                    {notification.type === "cart" && (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    )}
                  </div>
                  <p className="text-xs text-white/60 line-clamp-2">
                    {notification.message}
                  </p>
                  <p className="text-[10px] text-white/40 mt-1">
                    {notification.time}
                  </p>
                </div>
              </div>
            </div>
            
            <motion.div
              className={`h-0.5 bg-gradient-to-r ${notification.color}`}
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: notification.type === "cart" ? 4 : 6, ease: "linear" }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
