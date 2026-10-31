import * as React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";

import { PhotoStrip } from "@/components/ui/photo-strip";
import { ORBITAL_IMAGES } from "@/components/ui/orbital-gallery";

const reducedMotion = vi.hoisted(() => ({ value: false }));

// framer-motion caches the media query result for the whole test run, so drive
// the hook directly to exercise both states.
vi.mock("motion/react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("motion/react")>();
  return { ...actual, useReducedMotion: () => reducedMotion.value };
});

const images = ORBITAL_IMAGES.slice(0, 3);

describe("PhotoStrip", () => {
  afterEach(() => {
    reducedMotion.value = false;
    vi.restoreAllMocks();
  });

  it("renders a decorative strip with a duplicated loop", () => {
    const { container } = render(<PhotoStrip images={images} />);
    const strip = container.firstElementChild as HTMLElement;

    expect(strip).toHaveAttribute("aria-hidden", "true");
    expect(strip.className).toContain("photo-strip");
    // Each photo appears twice so the marquee wraps without a gap.
    expect(container.querySelectorAll("img")).toHaveLength(images.length * 2);
    expect(container.querySelector("img")).toHaveAttribute("alt", "");
    expect(
      (container.querySelector(".photo-strip-track") as HTMLElement).style
        .animationPlayState,
    ).toBe("paused");
  });

  it("shows a static single set when reduced motion is preferred", () => {
    reducedMotion.value = true;

    const { container } = render(<PhotoStrip images={images} />);

    expect(container.querySelectorAll("img")).toHaveLength(images.length);
  });
});
