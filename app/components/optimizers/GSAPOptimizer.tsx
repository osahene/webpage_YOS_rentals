// hooks/useOptimizedGSAP.ts
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register once
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function useOptimizedGSAP() {
  const context = useRef<gsap.Context | null>(null);

  useEffect(() => {
    context.current = gsap.context(() => {});

    // Optimize GSAP globally
    gsap.config({
      nullTargetWarn: false,
    });

    // Kill all animations on unmount
    return () => {
      context.current?.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return context;
}


