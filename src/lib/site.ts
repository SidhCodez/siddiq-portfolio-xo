export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://siddiq-portfolio-xo.vercel.app"
).replace(/\/$/, "");

export const SITE_NAME = "Siddiq — Developer & Designer";

export const SITE_DESCRIPTION =
  "Personal portfolio of Siddiq. Specialized in high-performance frontend engineering, disciplined UI systems, and quiet digital craft.";

export const CONTACT_EMAIL = "siddiq080806@gmail.com";

export const AUTHOR = {
  name: "Siddiq",
  jobTitle: "Frontend Engineer & UI Architect",
  email: CONTACT_EMAIL,
  url: SITE_URL,
  github: "https://github.com/SidhCodez",
  linkedin: "https://www.linkedin.com/in/siddiq-dev/",
};

export const SOCIAL_LINKS = [
  { label: "GITHUB", href: AUTHOR.github },
  { label: "LINKEDIN", href: AUTHOR.linkedin },
  { label: "EMAIL", href: `mailto:${AUTHOR.email}` },
] as const;

export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
