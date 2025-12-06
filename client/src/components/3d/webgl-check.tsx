import { Component, ReactNode, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Box, Sparkles } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class WebGLErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.log('WebGL Error:', error.message);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <Default3DFallback />;
    }
    return this.props.children;
  }
}

const productImages = [
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80",
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80",
  "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=200&q=80",
  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&q=80",
];

export function Default3DFallback({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full h-full min-h-[300px] bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 rounded-2xl overflow-hidden ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="relative"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {productImages.map((img, i) => (
            <motion.div
              key={i}
              className="absolute w-16 h-16 rounded-xl overflow-hidden"
              style={{
                left: `${Math.cos(i * Math.PI / 2) * 60}px`,
                top: `${Math.sin(i * Math.PI / 2) * 60}px`,
                border: '2px solid rgba(168, 85, 247, 0.3)',
                boxShadow: '0 4px 20px rgba(168, 85, 247, 0.2)',
              }}
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                delay: i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </motion.div>
          ))}
          <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 backdrop-blur-xl border border-white/10 flex items-center justify-center overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80" 
              alt="" 
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>
      
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Sparkles className="w-4 h-4 text-purple-400" />
        <span className="text-sm text-white/60">Featured Products</span>
      </motion.div>
    </div>
  );
}

export function useWebGLSupport(): boolean {
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setHasWebGL(!!gl);
    } catch (e) {
      setHasWebGL(false);
    }
  }, []);

  return hasWebGL;
}
