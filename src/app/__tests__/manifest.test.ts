import { describe, expect, it } from "vitest";
import manifest from "@/app/manifest";

describe("web app manifest", () => {
  const data = manifest();

  it("declares an installable standalone app", () => {
    expect(data.name).toBeTruthy();
    expect(data.short_name).toBe("Siddiq");
    expect(data.start_url).toBe("/");
    expect(data.scope).toBe("/");
    expect(data.display).toBe("standalone");
    expect(data.theme_color).toBe("#0F0C0D");
    expect(data.background_color).toBe("#0F0C0D");
  });

  it("ships the required and maskable icon sizes", () => {
    const icons = data.icons ?? [];

    expect(
      icons.some((icon) => icon.sizes === "192x192" && icon.type === "image/png")
    ).toBe(true);
    expect(
      icons.some((icon) => icon.sizes === "512x512" && icon.type === "image/png")
    ).toBe(true);
    expect(icons.some((icon) => icon.purpose === "maskable")).toBe(true);
  });

  it("exposes project, essay, and contact shortcuts", () => {
    const urls = (data.shortcuts ?? []).map((shortcut) => shortcut.url);

    expect(urls).toContain("/projects");
    expect(urls).toContain("/blog");
    expect(urls).toContain("/#contact");
  });
});
