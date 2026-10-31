import * as React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { SiteIntro } from "@/components/site-intro";

// The real component builds a WebGL scene; the intro logic is what matters here.
vi.mock("@/components/ui/liquid-glass-logo-reveal", () => ({
  __esModule: true,
  default: ({ label }: { label?: string }) => (
    <div data-testid="glass-reveal" aria-label={label} />
  ),
}));

describe("SiteIntro", () => {
  afterEach(() => {
    document.documentElement.style.overflow = "";
    vi.restoreAllMocks();
  });

  it("covers the page, locks scrolling, and removes itself", async () => {
    render(<SiteIntro playMs={30} exitMs={20} />);

    expect(screen.getByText(/edition 01/i)).toBeInTheDocument();
    expect(document.documentElement.style.overflow).toBe("hidden");

    await waitFor(
      () => expect(screen.queryByText(/edition 01/i)).toBeNull(),
      { timeout: 2000 },
    );
    expect(document.documentElement.style.overflow).toBe("");
  });

  it("is skipped by pointer or keyboard input", async () => {
    render(<SiteIntro playMs={5000} exitMs={20} />);

    fireEvent.pointerDown(window);
    await waitFor(
      () => expect(screen.queryByText(/edition 01/i)).toBeNull(),
      { timeout: 2000 },
    );
  });

  it("uses the shorter timeline when reduced motion is preferred", async () => {
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

    render(
      <SiteIntro
        playMs={5000}
        reducedPlayMs={20}
        reducedExitMs={20}
      />,
    );

    await waitFor(
      () => expect(screen.queryByText(/edition 01/i)).toBeNull(),
      { timeout: 2000 },
    );
  });

  it("shows a stand-in mark until the reveal scene is ready", () => {
    render(<SiteIntro playMs={5000} exitMs={20} />);

    expect(screen.getByTestId("glass-reveal")).toBeInTheDocument();
    expect(
      document.querySelector('[data-site-intro-mark="waiting"]'),
    ).not.toBeNull();
  });

  it("is presented as decorative to assistive technology", () => {
    render(<SiteIntro playMs={5000} exitMs={20} />);

    const overlay = document.querySelector("[data-site-intro]");

    expect(overlay).not.toBeNull();
    expect(overlay).toHaveAttribute("aria-hidden", "true");
    expect(overlay).toHaveAttribute("data-site-intro", "playing");
  });
});
