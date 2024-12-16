"use client";

import React from "react";
import Image from "next/image";

interface LoaderProps {
  isFullHeight?: boolean;
  imageSize?: number;
}

const Loader: React.FC<LoaderProps> = ({
  isFullHeight = false,
  imageSize = 43,
}) => {
  return (
    <div
      className={`flex justify-center items-center ${
        isFullHeight ? "h-screen" : ""
      }`}
    >
      <div className="animate-spin">
        <Image
          src="/icons/logo.svg"
          alt="Loading..."
          width={imageSize}
          height={imageSize}
        />
      </div>
    </div>
  );
};

export default Loader;
