import { Suspense, lazy, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

// Lazy load Spline for better performance
const Spline = lazy(() => import('@splinetool/react-spline'));

const SplineScene = ({ 
  className = '', 
  style = {}, 
  interactive = true,
  autoRotate = true 
}) => {
  const splineRef = useRef();

  const onLoad = useCallback((spline) => {
    splineRef.current = spline;
    
    console.log('Spline scene loaded:', spline);
    
    // Try to start any animations
    try {
      if (spline.play) {
        spline.play();
        console.log('Animations started');
      }
      
      // Enable auto-rotation if specified
      if (autoRotate && spline.setOrbitControls) {
        spline.setOrbitControls({
          autoRotate: true,
          autoRotateSpeed: 0.5
        });
      }
      
      // Try to trigger any events that might start animations
      if (spline.emitEvent) {
        spline.emitEvent('mouseDown');
        setTimeout(() => {
          spline.emitEvent('mouseUp');
        }, 100);
      }
    } catch (error) {
      console.error('Error starting Spline animations:', error);
    }
  }, [autoRotate]);

  const onMouseDown = useCallback((e) => {
    if (splineRef.current && splineRef.current.emitEvent) {
      splineRef.current.emitEvent('mouseDown', e);
    }
  }, []);

  return (
    <div 
      className={`relative ${className}`} 
      style={{
        ...style,
        animation: autoRotate ? 'splineFloat 20s ease-in-out infinite' : 'none'
      }}
      onMouseDown={interactive ? onMouseDown : undefined}
    >
      <style>{`
        @keyframes splineFloat {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.02); }
        }
      `}</style>
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center bg-neutral-900/50">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full"
            />
          </div>
        }
      >
        <Spline
          scene="https://prod.spline.design/EAgGRLAM4Y1Hdjxa/scene.splinecode"
          onLoad={onLoad}
          style={{ 
            width: '100%', 
            height: '100%',
            pointerEvents: interactive ? 'auto' : 'none',
            touchAction: interactive ? 'auto' : 'none'
          }}
        />
      </Suspense>
    </div>
  );
};

export default SplineScene;
