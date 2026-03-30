import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const SplineSceneAlternative = ({ className = '', style = {} }) => {
  const canvasRef = useRef(null);
  const viewerRef = useRef(null);

  useEffect(() => {
    let viewer = null;

    const loadSpline = async () => {
      try {
        // Dynamically import Spline viewer
        const { Application } = await import('@splinetool/runtime');
        
        if (canvasRef.current && !viewerRef.current) {
          viewer = new Application(canvasRef.current);
          viewerRef.current = viewer;
          
          // Load the scene
          await viewer.load('https://prod.spline.design/EAgGRLAM4Y1Hdjxa/scene.splinecode');
          
          // Start animations
          if (viewer.play) {
            viewer.play();
          }
        }
      } catch (error) {
        console.error('Error loading Spline scene:', error);
      }
    };

    loadSpline();

    // Cleanup
    return () => {
      if (viewerRef.current) {
        viewerRef.current = null;
      }
    };
  }, []);

  return (
    <div className={`relative ${className}`} style={style}>
      <canvas 
        ref={canvasRef}
        style={{ 
          width: '100%', 
          height: '100%',
          display: 'block'
        }}
      />
    </div>
  );
};

export default SplineSceneAlternative;
