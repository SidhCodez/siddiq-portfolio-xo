import * as React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";

import { OrbitalGallery, ORBITAL_IMAGES } from "@/components/ui/orbital-gallery";

const originalResizeObserver = globalThis.ResizeObserver;
import { HeroSection } from "@/components/sections/hero-section";

/** Report a fixed box to the layer as soon as it is observed. */
function stubMeasure(width = 1200, height = 800) {
  class MeasuredResizeObserver {
    private readonly callback: ResizeObserverCallback;

    constructor(callback: ResizeObserverCallback) {
      this.callback = callback;
    }

    observe = vi.fn((target: Element) => {
      this.callback(
        [
          {
            target,
            contentRect: { width, height } as DOMRectReadOnly,
          } as ResizeObserverEntry,
        ],
        this as unknown as ResizeObserver,
      );
    });

    unobserve = vi.fn();
    disconnect = vi.fn();
  }

  vi.stubGlobal("ResizeObserver", MeasuredResizeObserver);
}

describe("OrbitalGallery", () => {
  afterEach(() => {
    vi.stubGlobal("ResizeObserver", originalResizeObserver);
    vi.restoreAllMocks();
  });

  it("renders a decorative, non-interactive layer of photos", () => {
    stubMeasure();

    const { container } = render(<OrbitalGallery />);
    const layer = container.firstElementChild as HTMLElement;

    expect(layer).toHaveAttribute("aria-hidden", "true");
    expect(layer.className).toContain("orbital-gallery");
    expect(layer.className).toContain("pointer-events-none");
    expect(container.querySelectorAll("img")).toHaveLength(ORBITAL_IMAGES.length);
    expect(container.querySelector("img")).toHaveAttribute("alt", "");
  });

  it("places frames on the measured ellipse", () => {
    const width = 1200;
    const height = 800;
    stubMeasure(width, height);

    const images = ORBITAL_IMAGES.slice(0, 4);
    const { container } = render(
      <OrbitalGallery images={images} radiusX={0.5} radiusY={0.25} />,
    );

    const layer = container.firstElementChild as HTMLElement;
    const frames = [...layer.children] as HTMLElement[];
    expect(frames).toHaveLength(images.length);

    const offset = (index: number) => {
      const match = frames[index].style.transform.match(
        /translate3d\((-?[\d.e-]+)px, (-?[\d.e-]+)px/,
      );
      expect(match).not.toBeNull();
      return { x: Number(match?.[1]), y: Number(match?.[2]) };
    };

    // 0deg: full radius on x, nothing on y.
    expect(offset(0).x).toBeCloseTo(width * 0.5, 5);
    expect(offset(0).y).toBeCloseTo(0, 5);

    // 90deg: nothing on x, full radius on y.
    expect(offset(1).x).toBeCloseTo(0, 5);
    expect(offset(1).y).toBeCloseTo(height * 0.25, 5);

    // 180deg and 270deg are mirrored on the same ellipse.
    expect(offset(2).x).toBeCloseTo(-width * 0.5, 5);
    expect(offset(2).y).toBeCloseTo(0, 5);
    expect(offset(3).y).toBeCloseTo(-height * 0.25, 5);
  });

  it("is mounted as the hero backdrop", () => {
    stubMeasure();

    // The hero also mounts the canvas grid; jsdom has no 2D context.
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(
      () =>
        new Proxy(
          {},
          {
            get: () => () => ({ addColorStop: vi.fn() }),
            set: () => true,
          },
        ) as unknown as CanvasRenderingContext2D,
    );

    const { container } = render(<HeroSection />);
    const gallery = container.querySelector("#hero .orbital-gallery");

    expect(gallery).not.toBeNull();
    expect(gallery).toHaveAttribute("aria-hidden", "true");
  });
});
