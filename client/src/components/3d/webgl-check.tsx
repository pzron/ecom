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

export function Default3DFallback({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full h-full min-h-[300px] bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 rounded-2xl overflow-hidden ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="relative"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-16 h-16 rounded-xl"
              style={{
                left: `${Math.cos(i * Math.PI / 2) * 60}px`,
                top: `${Math.sin(i * Math.PI / 2) * 60}px`,
                background: `linear-gradient(135deg, ${['#a855f7', '#ec4899', '#06b6d4', '#f59e0b'][i]}40, transparent)`,
                border: '1px solid rgba(255,255,255,0.1)',
              }}
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 45, 0],
              }}
              transition={{
                duration: 3,
                delay: i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
          <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 backdrop-blur-xl border border-white/10 flex items-center justify-center">
            <Box className="w-8 h-8 text-purple-300" />
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
        <span className="text-sm text-white/60">3D Preview</span>
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
