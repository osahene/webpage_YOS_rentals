// components/ImageOptimizer.tsx
"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

interface OptimizedImageProps extends Omit<ImageProps, "onLoad"> {
  lowQualitySrc?: string;
}

export default function OptimizedImage({
  src,
  lowQualitySrc,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative overflow-hidden">
      {/* Low-quality placeholder */}
      {lowQualitySrc && !isLoaded && (
        <Image
          src={lowQualitySrc}
          {...props}
          alt={`${props.alt || ""} placeholder`}
          className="absolute inset-0 blur-sm scale-110"
          fill
          sizes="20vw"
        />
      )}

      {/* Main image */}
      <Image
        src={src}
        {...props}
        alt={props.alt || ""}
        onLoad={() => setIsLoaded(true)}
        className={`transition-opacity duration-500 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } ${props.className || ""}`}
      />
    </div>
  );
}
