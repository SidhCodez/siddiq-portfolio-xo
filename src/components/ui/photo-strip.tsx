"use client";

import * as React from "react";
import Image from "next/image";
import { useInView, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";
import { ORBITAL_IMAGES } from "@/components/ui/orbital-gallery";

export interface PhotoStripProps {
  /** Image URLs shown in the strip. */
  images?: readonly string[];
  /** Seconds for one full pass of the strip. */
  duration?: number;
  className?: string;
}

/**
 * Mobile counterpart to the orbital gallery: a slow, full-bleed strip of the
 * same photography that sits between sections so it never crosses the copy.
 *
 * Decorative only, pauses off-screen, and shows a static row when the visitor
 * prefers reduced motion.
 */
export function PhotoStrip({
  images = ORBITAL_IMAGES.slice(0, 8),
  duration = 38,
  className,
}: PhotoStripProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, { margin: "150px" });

  // Duplicate the set so the loop wraps without a gap.
  const loop = reduceMotion ? images : [...images, ...images];

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        "photo-strip relative w-full overflow-hidden border-y border-border-surface/50 py-5",
        className,
      )}
    >
      <div
        className="photo-strip-track flex w-max items-center gap-3"
        style={
          {
            "--strip-duration": `${duration}s`,
            animationPlayState: inView ? "running" : "paused",
          } as React.CSSProperties
        }
      >
        {loop.map((src, index) => (
          <div
            key={`${src}-${index}`}
            className="aspect-video w-[clamp(112px,26vw,180px)] shrink-0 overflow-hidden border border-border-surface/70 bg-surface shadow-[0_12px_30px_-14px_rgba(0,0,0,0.7)] grayscale"
          >
            <Image
              src={src}
              alt=""
              width={480}
              height={270}
              draggable={false}
              sizes="(min-width: 640px) 180px, 26vw"
              className="h-full w-full object-cover brightness-110"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PhotoStrip;
