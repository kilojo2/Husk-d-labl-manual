"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";

interface ImageViewerProps {
  src: string | StaticImageData;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function ImageViewer({ src, alt, width, height, className = "" }: ImageViewerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, close]);

  return (
    <>
      <figure
        className={`my-6 overflow-hidden rounded-lg border border-border cursor-pointer transition-opacity hover:opacity-90 ${className}`}
        onClick={open}
      >
        <Image
          src={src}
          alt={alt}
          width={width ?? 800}
          height={height ?? 450}
          className="w-full h-auto"
        />
      </figure>

      {/* Lightbox overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={close}
        >
          <button
            onClick={close}
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
            aria-label="Close"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <Image
            src={src}
            alt={alt}
            width={width ?? 800}
            height={height ?? 450}
            className="max-h-[90vh] w-auto max-w-[90vw] rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
