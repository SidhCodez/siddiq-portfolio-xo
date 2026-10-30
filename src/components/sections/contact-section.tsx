"use client";

import * as React from "react";
import {
  CheckCircle,
  WarningCircle,
  Copy,
  Check,
  ArrowUpRight,
} from "@phosphor-icons/react";
import { ScrollReveal } from "@/components/scroll-reveal";

export function ContactSection() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    message: "",
    website: "",
  });

  const [status, setStatus] = React.useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = React.useState("");
  const [copied, setCopied] = React.useState(false);

  const directEmail = "siddiq080806@gmail.com";

  const updateField = (
    field: "name" | "email" | "message" | "website",
    value: string
  ) => {
    setFormData((current) => ({ ...current, [field]: value }));
    if (status === "success" || status === "error") {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(directEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage("Please ensure all fields are filled before submitting.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;

      if (!response.ok || !result?.ok) {
        setErrorMessage(
          result?.error ??
            "The inquiry could not be sent. Please try again or email me directly."
        );
        setStatus("error");
        return;
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "", website: "" });
    } catch {
      setErrorMessage(
        "A network error occurred. Please check your connection and try again."
      );
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-36 px-4 sm:px-6 lg:px-8 border-t border-border-surface">
      <div className="max-w-[1360px] mx-auto space-y-16">
        {/* Section Header with Scroll Reveal */}
        <ScrollReveal yOffset={16}>
          <div className="space-y-4 max-w-3xl">
            <div className="font-inter text-[11px] font-bold uppercase tracking-eyebrow text-accent">
              05 — INITIATE CONTACT
            </div>
            <h2 className="font-fraunces text-3xl sm:text-4xl text-ink font-semibold">
              Start a conversation.
            </h2>
            <p className="font-inter text-sm sm:text-base text-muted leading-relaxed">
              Whether inquiring regarding full-time engineering opportunities, design systems
              architecture, or contract product execution, drop a note below.
            </p>
          </div>
        </ScrollReveal>

        {/* Contact Enclosure with Scroll Reveal */}
        <ScrollReveal delay={0.1} yOffset={22}>
          <div className="rounded-[3px] border border-border-surface bg-surface overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Column: Direct Inquiries Context */}
              <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between space-y-8 border-b lg:border-b-0 lg:border-r border-border-surface">
                <div className="space-y-6">
                  <span className="font-inter text-[11px] font-bold uppercase tracking-eyebrow text-accent">
                    DIRECT CHANNEL
                  </span>

                  <div className="space-y-2">
                    <h3 className="font-fraunces text-2xl text-ink font-semibold">
                      Calm & deliberate.
                    </h3>
                    <p className="font-inter text-sm text-muted leading-relaxed">
                      Direct communications are monitored personally. I typically respond within
                      24 to 48 hours to all qualified inquiries.
                    </p>
                  </div>

                  <div className="p-4 rounded-[2px] border border-border-surface bg-bg space-y-2">
                    <span className="font-inter text-xs text-muted block">DIRECT EMAIL:</span>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm text-ink select-all">
                        {directEmail}
                      </span>
                      <button
                        type="button"
                        onClick={handleCopy}
                        aria-label="Copy direct email address"
                        className="p-1.5 rounded-[2px] border border-border-surface bg-surface text-ink hover:text-accent transition-colors"
                      >
                        {copied ? (
                          <Check size={14} className="text-accent" />
                        ) : (
                          <Copy size={14} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Availability Notice */}
                <div className="p-4 rounded-[2px] bg-bg border border-border-surface flex items-center gap-3">
                  <span className="w-2 h-2 rounded-[1px] bg-accent" />
                  <span className="font-inter text-xs text-ink font-medium">
                    CURRENT CAPACITY: OPEN FOR FULL-TIME APPOINTMENTS
                  </span>
                </div>
              </div>

              {/* Right Column: Contact Form */}
              <div className="lg:col-span-7 p-8 sm:p-12">
                <form onSubmit={handleSubmit} className="relative space-y-6">
                  {/* Honeypot: hidden from humans and assistive tech, catches bots */}
                  <div
                    aria-hidden="true"
                    className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden"
                  >
                    <label htmlFor="contact-website">Website</label>
                    <input
                      id="contact-website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.website}
                      onChange={(e) =>
                        updateField("website", e.target.value)
                      }
                    />
                  </div>

                  {/* Name Input */}
                  <div className="space-y-2">
                    <label
                      htmlFor="contact-name"
                      className="block font-inter text-[11px] font-bold uppercase tracking-eyebrow text-ink"
                    >
                      FULL NAME <span className="text-accent">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      placeholder="e.g. Eleanor Vance"
                      className="w-full min-h-[44px] px-4 py-3 rounded-[2px] border border-border-surface bg-bg text-ink placeholder:text-muted/60 font-inter text-sm transition-all focus:outline-none focus:border-accent"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label
                      htmlFor="contact-email"
                      className="block font-inter text-[11px] font-bold uppercase tracking-eyebrow text-ink"
                    >
                      EMAIL ADDRESS <span className="text-accent">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      placeholder="e.g. eleanor@vance-holdings.com"
                      className="w-full min-h-[44px] px-4 py-3 rounded-[2px] border border-border-surface bg-bg text-ink placeholder:text-muted/60 font-inter text-sm transition-all focus:outline-none focus:border-accent"
                    />
                  </div>

                  {/* Message Textarea */}
                  <div className="space-y-2">
                    <label
                      htmlFor="contact-message"
                      className="block font-inter text-[11px] font-bold uppercase tracking-eyebrow text-ink"
                    >
                      INQUIRY DETAILS <span className="text-accent">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => updateField("message", e.target.value)}
                      placeholder="Describe your timeline, scope, or position specifications..."
                      className="w-full px-4 py-3 rounded-[2px] border border-border-surface bg-bg text-ink placeholder:text-muted/60 font-inter text-sm transition-all focus:outline-none focus:border-accent resize-none"
                    />
                  </div>

                  {/* Status Alerts */}
                  {status === "success" && (
                    <div className="p-4 rounded-[2px] bg-surface border border-accent text-accent flex items-center gap-3 font-inter text-xs">
                      <CheckCircle size={18} weight="fill" />
                      <span>Inquiry transmitted successfully. Siddiq will be in touch shortly.</span>
                    </div>
                  )}

                  {status === "error" && (
                    <div className="p-4 rounded-[2px] bg-surface border border-red-500/40 text-red-400 flex items-center gap-3 font-inter text-xs">
                      <WarningCircle size={18} weight="fill" />
                      <span>
                        {errorMessage ||
                          "Please ensure all fields are filled before submitting."}
                      </span>
                    </div>
                  )}

                  {/* Submit Action using Primary Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="btn-primary"
                    >
                      <span>{status === "submitting" ? "TRANSMITTING..." : "TRANSMIT INQUIRY"}</span>
                      <ArrowUpRight size={14} weight="bold" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
