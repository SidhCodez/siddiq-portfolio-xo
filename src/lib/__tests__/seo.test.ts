import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import { SITE_URL } from "@/lib/site";

describe("SEO route generated data", () => {
  it("includes static, project, and essay routes in the sitemap", () => {
    const urls = sitemap().map((entry) => entry.url);

    expect(urls).toContain(SITE_URL);
    expect(urls).toContain(`${SITE_URL}/projects`);
    expect(urls).toContain(`${SITE_URL}/blog`);
    expect(urls).toContain(`${SITE_URL}/projects/skillbridge`);
    expect(urls).toContain(
      `${SITE_URL}/blog/the-architecture-of-quiet-luxury`
    );
  });

  it("points robots at the sitemap and blocks API routes", () => {
    const result = robots();

    expect(result.sitemap).toBe(`${SITE_URL}/sitemap.xml`);

    const primaryRule = Array.isArray(result.rules)
      ? result.rules[0]
      : result.rules;
    expect(primaryRule?.disallow).toContain("/api/");
    expect(primaryRule?.disallow).toContain("/offline");
  });
});
