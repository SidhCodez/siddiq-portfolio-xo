import type { Metadata } from "next";
import { MaintenanceView } from "@/components/maintenance-view";

export const metadata: Metadata = {
  title: "Building what's next — Siddiq",
  description:
    "Portfolio temporarily unavailable. I'm currently working behind the scenes on a few improvements to my portfolio.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function MaintenancePage() {
  return <MaintenanceView />;
}
