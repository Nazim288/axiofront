"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const FALLBACK_SRC = "/icons/axio.png";

interface LogoGifProps {
  className?: string;
  fallbackWidth?: number;
  fallbackHeight?: number;
}

export function LogoGif({
  className,
  fallbackWidth = 170,
  fallbackHeight = 40,
}: LogoGifProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <Image
        src={FALLBACK_SRC}
        alt="Logo"
        width={fallbackWidth}
        height={fallbackHeight}
        className={className}
      />
    );
  }

  return (
    <video
      src="/gifs/logo.mp4"
      autoPlay
      loop
      muted
      playsInline
      disablePictureInPicture
      aria-label="Logo"
      onError={() => setHasError(true)}
      className={cn("object-contain pointer-events-none", className)}
    />
  );
}
