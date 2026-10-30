import * as React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import KineticGrid from "@/components/ui/kinetic-grid";
import { HeroSection } from "@/components/sections/hero-section";

function createFakeContext() {
  const gradient = { addColorStop: vi.fn() };

  return {
    setTransform: vi.fn(),
    clearRect: vi.fn(),
    fillRect: vi.fn(),
    beginPath: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    arc: vi.fn(),
    fill: vi.fn(),
    stroke: vi.fn(),
    createRadialGradient: vi.fn(() => gradient),
    createPattern: vi.fn(() => ({}) as CanvasPattern),
    fillStyle: "",
    strokeStyle: "",
    lineWidth: 0,
    lineCap: "butt",
  };
}

describe("KineticGrid", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the canvas behind its children", () => {
    const context = createFakeContext();
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(
      () => context as unknown as CanvasRenderingContext2D,
    );

    const { container } = render(
      <KineticGrid>
        <p>Hero content</p>
      </KineticGrid>,
    );

    expect(screen.getByText("Hero content")).toBeInTheDocument();

    const canvas = container.querySelector("canvas");
    expect(canvas).not.toBeNull();
    expect(canvas).toHaveAttribute("aria-hidden", "true");
    expect(canvas?.className).toContain("kinetic-grid-canvas");

    // The grid is painted at least once on mount.
    expect(context.clearRect).toHaveBeenCalled();
    expect(context.createRadialGradient).toBeDefined();
  });

  it("accepts pointer input without throwing", () => {
    const context = createFakeContext();
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(
      () => context as unknown as CanvasRenderingContext2D,
    );

    const { container } = render(
      <KineticGrid>
        <span>Interactive</span>
      </KineticGrid>,
    );

    const wrapper = container.firstElementChild as HTMLElement;

    expect(() => {
      fireEvent.pointerMove(wrapper, { clientX: 120, clientY: 80 });
      fireEvent.pointerDown(wrapper, { clientX: 120, clientY: 80 });
      fireEvent.pointerLeave(wrapper);
    }).not.toThrow();
  });

  it("paints a static frame when reduced motion is preferred", () => {
    vi.spyOn(window, "matchMedia").mockImplementation(
      (query: string) =>
        ({
          matches: query.includes("prefers-reduced-motion"),
          media: query,
          onchange: null,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          addListener: vi.fn(),
          removeListener: vi.fn(),
          dispatchEvent: vi.fn(),
        }) as unknown as MediaQueryList,
    );

    const context = createFakeContext();
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(
      () => context as unknown as CanvasRenderingContext2D,
    );

    render(
      <KineticGrid>
        <span>Still</span>
      </KineticGrid>,
    );

    expect(context.clearRect).toHaveBeenCalled();
    expect(screen.getByText("Still")).toBeInTheDocument();
  });

  it("is mounted as the hero backdrop", () => {
    const context = createFakeContext();
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(
      () => context as unknown as CanvasRenderingContext2D,
    );

    const { container } = render(<HeroSection />);

    expect(
      screen.getByRole("heading", { level: 1, name: /quiet luxury/i }),
    ).toBeInTheDocument();
    expect(container.querySelector("#hero canvas")).not.toBeNull();
  });
});
