"use client";

import * as React from "react";
import Image from "next/image";
import { useInView, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

/**
 * Placeholder photography, deliberately interchangeable: swap these for project
 * shots when the real assets land. Any URL allowed by `next.config.ts` works.
 */
export const ORBITAL_IMAGES = [
  "https://picsum.photos/seed/siddiq-orbit-01/480/270?grayscale",
  "https://picsum.photos/seed/siddiq-orbit-02/480/270?grayscale",
  "https://picsum.photos/seed/siddiq-orbit-03/480/270?grayscale",
  "https://picsum.photos/seed/siddiq-orbit-04/480/270?grayscale",
  "https://picsum.photos/seed/siddiq-orbit-05/480/270?grayscale",
  "https://picsum.photos/seed/siddiq-orbit-06/480/270?grayscale",
  "https://picsum.photos/seed/siddiq-orbit-07/480/270?grayscale",
  "https://picsum.photos/seed/siddiq-orbit-08/480/270?grayscale",
  "https://picsum.photos/seed/siddiq-orbit-09/480/270?grayscale",
  "https://picsum.photos/seed/siddiq-orbit-10/480/270?grayscale",
] as const;

export interface OrbitalGalleryProps {
  /** Image URLs arranged evenly around the orbit. */
  images?: readonly string[];
  /** Seconds for one full revolution. */
  duration?: number;
  /** Horizontal radius as a fraction of the layer width. */
  radiusX?: number;
  /** Vertical radius as a fraction of the layer height. */
  radiusY?: number;
  /** Layer opacity, so the ring can sit under copy without hurting contrast. */
  opacity?: number;
  /** Desaturate the photos to keep the palette quiet. */
  monochrome?: boolean;
  className?: string;
}

interface Size {
  width: number;
  height: number;
}

/**
 * Slow orbital gallery: photographs ride an ellipse around the hero, keeping
 * their frames upright while the ring turns.
 *
 * Adaptations from the reference implementation:
 * - the ellipse is wide and flat, so the photos sweep the empty bands above and
 *   below the copy instead of crossing it;
 * - positions are driven by one rAF loop writing transforms, which keeps the
 *   ellipse stable (rotating a container would turn a non-circular ellipse into
 *   a circle sweep and clip at the hero edges);
 * - decorative only (`aria-hidden`), pauses off-screen, and holds still when
 *   the visitor prefers reduced motion.
 */
export function OrbitalGallery({
  images = ORBITAL_IMAGES,
  duration = 52,
  radiusX = 0.70,
  radiusY = 0.44,
  opacity = 0.58,
  monochrome = true,
  className,
}: OrbitalGalleryProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const itemRefs = React.useRef<Array<HTMLDivElement | null>>([]);
  const [size, setSize] = React.useState<Size>({ width: 0, height: 0 });
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, { margin: "200px" });
  const spin = !reduceMotion && inView;

  const rx = size.width * radiusX;
  const ry = size.height * radiusY;

  React.useEffect(() => {
    const layer = ref.current;
    if (!layer) return;

    const observer = new ResizeObserver((entries) => {
      const box = entries[0]?.contentRect;
      if (box) setSize({ width: box.width, height: box.height });
    });

    observer.observe(layer);
    return () => observer.disconnect();
  }, []);

  const place = React.useCallback(
    (offset: number) => {
      images.forEach((_, index) => {
        const item = itemRefs.current[index];
        if (!item) return;

        const angle = (index / images.length) * Math.PI * 2 + offset;
        const x = Math.cos(angle) * rx;
        const y = Math.sin(angle) * ry;
        item.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0)`;
      });
    },
    [images, rx, ry],
  );

  // Draw the first frame as soon as the layer has been measured.
  React.useEffect(() => {
    if (rx > 0 && ry > 0) place(0);
  }, [place, rx, ry]);

  React.useEffect(() => {
    if (!spin || rx <= 0 || ry <= 0) return;

    const period = duration * 1000;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      place(((now - start) / period) * Math.PI * 2);
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [spin, duration, place, rx, ry]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        "orbital-gallery pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
      style={
        {
          opacity,
          // Exposed for debugging and visual tests; layout is driven by rAF.
          "--orbit-rx": `${rx}px`,
          "--orbit-ry": `${ry}px`,
        } as React.CSSProperties
      }
    >
      {images.map((src, index) => (
        <div
          key={`${src}-${index}`}
          ref={(node) => {
            itemRefs.current[index] = node;
          }}
          className="absolute left-1/2 top-1/2"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <div
            className={cn(
              "orbital-gallery-frame aspect-video w-[clamp(138px,13.5vw,232px)] overflow-hidden border border-border-surface/70 bg-surface shadow-[0_18px_45px_-12px_rgba(0,0,0,0.65)]",
              monochrome && "grayscale",
            )}
          >
            <Image
              src={src}
              alt=""
              width={480}
              height={270}
              draggable={false}
              sizes="(min-width: 1760px) 220px, 12.5vw"
              className="h-full w-full object-cover brightness-110"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrbitalGallery;
