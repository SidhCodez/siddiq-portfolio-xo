/**
 * Portfolio Maintenance Mode Configuration
 *
 * Maintenance mode is ACTIVE by default on this branch (`feature/portfolio-maintenance-mode`).
 *
 * How to control maintenance mode:
 * 1. Environment Variable:
 *    - To disable: set `NEXT_PUBLIC_MAINTENANCE_MODE="false"` in `.env.local` or hosting provider environment variables.
 *    - To force-enable: set `NEXT_PUBLIC_MAINTENANCE_MODE="true"`.
 *
 * 2. Code Toggle:
 *    - Toggle `DEFAULT_MAINTENANCE_ENABLED` below between `true` and `false`.
 */

export const DEFAULT_MAINTENANCE_ENABLED = true;

export function isMaintenanceModeEnabled(): boolean {
  const envVal = process.env.NEXT_PUBLIC_MAINTENANCE_MODE;
  if (envVal === "false" || envVal === "0") {
    return false;
  }
  if (envVal === "true" || envVal === "1") {
    return true;
  }
  return DEFAULT_MAINTENANCE_ENABLED;
}

export const MAINTENANCE_CONTENT = {
  eyebrow: "PORTFOLIO TEMPORARILY UNAVAILABLE",
  heading: "Building what's next.",
  description: [
    "I'm currently working behind the scenes on a few improvements to my portfolio. The site is temporarily paused while I refine things and build what's next.",
    "My work will be back online once the updates are ready. In the meantime, feel free to connect with me through the links below.",
  ],
  status: "Currently under development",
  closing: "Thanks for stopping by. See you on the other side.",
  contacts: [
    {
      id: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/siddiq-dev/",
      username: "in/siddiq-dev",
      ariaLabel: "Connect with Siddiq on LinkedIn (opens in a new tab)",
    },
    {
      id: "github",
      label: "GitHub",
      href: "https://github.com/SidhCodez",
      username: "SidhCodez",
      ariaLabel: "Visit Siddiq's GitHub profile (opens in a new tab)",
    },
    {
      id: "email",
      label: "Email",
      href: "mailto:siddiq080806@gmail.com",
      username: "siddiq080806@gmail.com",
      ariaLabel: "Send an email to Siddiq at siddiq080806@gmail.com",
    },
  ],
} as const;
