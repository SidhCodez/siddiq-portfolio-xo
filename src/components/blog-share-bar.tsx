"use client";

import * as React from "react";
import { ShareNetwork, Check, Copy, XLogo, LinkedinLogo } from "@phosphor-icons/react";

interface BlogShareBarProps {
  postTitle: string;
  postSlug: string;
}

export function BlogShareBar({ postTitle, postSlug }: BlogShareBarProps) {
  const [copied, setCopied] = React.useState(false);

  const getUrl = () => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}/blog/${postSlug}`;
    }
    return `https://siddiq.dev/blog/${postSlug}`;
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(getUrl());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: postTitle,
          url: getUrl(),
        });
      } catch (err) {
        // Fallback or user canceled
      }
    } else {
      handleCopyLink();
    }
  };

  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    postTitle
  )}&url=${encodeURIComponent(getUrl())}`;

  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    getUrl()
  )}`;

  return (
    <div className="flex flex-wrap items-center gap-3 pt-2">
      {/* Primary Copy Link Button */}
      <button
        type="button"
        onClick={handleCopyLink}
        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[2px] border border-border-surface bg-surface text-ink hover:border-accent transition-colors text-xs font-inter font-medium active:scale-95"
      >
        {copied ? (
          <>
            <Check size={14} weight="bold" className="text-accent" />
            <span className="text-accent font-semibold">LINK COPIED TO CLIPBOARD</span>
          </>
        ) : (
          <>
            <Copy size={14} />
            <span>COPY SHAREABLE LINK</span>
          </>
        )}
      </button>

      {/* Native Web Share API if supported */}
      <button
        type="button"
        onClick={handleNativeShare}
        aria-label="Share article"
        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-[2px] border border-border-surface bg-surface text-muted hover:text-ink hover:border-accent transition-colors text-xs font-inter font-medium active:scale-95"
      >
        <ShareNetwork size={14} />
        <span>SHARE</span>
      </button>

      {/* Share to X */}
      <a
        href={twitterShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share this essay on X"
        className="p-2 rounded-[2px] border border-border-surface bg-surface text-muted hover:text-ink hover:border-accent transition-colors"
      >
        <XLogo size={14} />
      </a>

      {/* Share to LinkedIn */}
      <a
        href={linkedInShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share this essay on LinkedIn"
        className="p-2 rounded-[2px] border border-border-surface bg-surface text-muted hover:text-ink hover:border-accent transition-colors"
      >
        <LinkedinLogo size={14} />
      </a>
    </div>
  );
}
