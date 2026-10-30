import * as React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactSection } from "@/components/sections/contact-section";

vi.mock("@/components/scroll-reveal", () => ({
  ScrollReveal: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

async function fillForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/full name/i), "Eleanor Vance");
  await user.type(screen.getByLabelText(/^email address/i), "eleanor@example.com");
  await user.type(
    screen.getByLabelText(/inquiry details/i),
    "I would like to discuss a frontend architecture role."
  );
}

describe("ContactSection", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it("posts the inquiry and shows a success state, then resets", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const user = userEvent.setup();
    render(<ContactSection />);

    await fillForm(user);
    await user.click(
      screen.getByRole("button", { name: /transmit inquiry/i })
    );

    expect(
      await screen.findByText(/inquiry transmitted successfully/i)
    ).toBeInTheDocument();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/contact",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
    );

    expect(screen.getByLabelText(/full name/i)).toHaveValue("");
    expect(screen.getByLabelText(/^email address/i)).toHaveValue("");
    expect(screen.getByLabelText(/inquiry details/i)).toHaveValue("");
  });

  it("surfaces the server error message when delivery fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({
          ok: false,
          error: "The message could not be delivered right now.",
        }),
      })
    );

    const user = userEvent.setup();
    render(<ContactSection />);

    await fillForm(user);
    await user.click(
      screen.getByRole("button", { name: /transmit inquiry/i })
    );

    expect(
      await screen.findByText(/could not be delivered right now/i)
    ).toBeInTheDocument();
  });

  it("blocks whitespace-only submissions without calling the API", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const user = userEvent.setup();
    render(<ContactSection />);

    await user.type(screen.getByLabelText(/full name/i), "   ");
    await user.type(screen.getByLabelText(/^email address/i), "eleanor@example.com");
    await user.type(screen.getByLabelText(/inquiry details/i), "    ");
    await user.click(
      screen.getByRole("button", { name: /transmit inquiry/i })
    );

    expect(
      await screen.findByText(/ensure all fields are filled/i)
    ).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
