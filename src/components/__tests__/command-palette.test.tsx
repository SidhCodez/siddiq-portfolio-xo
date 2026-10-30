import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CommandPalette } from "@/components/command-palette";

const push = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}));

vi.mock("next-themes", () => ({
  useTheme: () => ({ resolvedTheme: "dark", setTheme: vi.fn() }),
}));

const posts = [
  {
    slug: "test-essay",
    title: "Test Essay on Performance",
    subtitle: "A test subtitle",
    category: "PERFORMANCE",
    tags: ["Testing"],
  },
];

describe("CommandPalette", () => {
  beforeEach(() => {
    push.mockClear();
  });

  it("opens with Cmd+K and filters the project index", async () => {
    const user = userEvent.setup();
    render(<CommandPalette posts={posts} />);

    fireEvent.keyDown(document, { key: "k", metaKey: true });

    const input = await screen.findByPlaceholderText(/search pages/i);
    expect(input).toBeInTheDocument();

    await user.type(input, "wallet");
    expect(await screen.findByText("WalletGuard")).toBeInTheDocument();
  });

  it("opens when the navbar dispatches the custom event", async () => {
    render(<CommandPalette posts={posts} />);

    fireEvent(window, new Event("open-command-palette"));

    expect(
      await screen.findByPlaceholderText(/search pages/i)
    ).toBeInTheDocument();
  });
});
