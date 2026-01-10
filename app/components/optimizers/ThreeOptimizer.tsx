"use client";

import { Suspense, useRef, useEffect, ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload, AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";
import { CanvasProps } from "@react-three/fiber";

interface ThreeOptimizerProps extends CanvasProps {
  children: ReactNode;
}

export default function ThreeOptimizer({ children, ...props }: ThreeOptimizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    // Early cleanup
    return () => {
      if (canvas) {
        const gl =
          canvas.getContext("webgl2") ||
          canvas.getContext("webgl");
        if (gl) {
          gl.getExtension("WEBGL_lose_context")?.loseContext();
        }
      }
    };
  }, []);

  return (
    <Canvas
      ref={canvasRef}
      gl={{
        antialias: false,
        alpha: false,
        powerPreference: "high-performance",
        stencil: false,
        depth: false,
      }}
      dpr={[1, 2]}
      performance={{ min: 0.5 }}
      {...props}
    >
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
      <Preload all />
      <Suspense fallback={null}>{children}</Suspense>
    </Canvas>
  );
}
