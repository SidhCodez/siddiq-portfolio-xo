import * as React from "react";
import Link from "next/link";
import { Quotes } from "@phosphor-icons/react/dist/ssr";
import type { MDXComponents } from "mdx/types";

function CodeBlock({ children }: { children?: React.ReactNode }) {
  const child = React.Children.toArray(children)[0];
  let language = "code";
  let code: React.ReactNode = children;

  if (
    React.isValidElement<{ className?: string; children?: React.ReactNode }>(child)
  ) {
    const className = child.props.className ?? "";
    if (className.startsWith("language-")) {
      language = className.replace("language-", "");
    }
    code = child.props.children;
  }

  return (
    <div className="my-8 rounded-[2px] border border-border-surface bg-bg overflow-hidden">
      <div className="px-4 py-2 border-b border-border-surface bg-surface flex items-center justify-between text-xs font-mono text-muted">
        <span>{language.toUpperCase()}</span>
        <span>ARCHITECTURE</span>
      </div>
      <pre className="p-4 text-xs font-mono text-ink overflow-x-auto leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function InlineCode({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const isBlock =
    typeof className === "string" && className.startsWith("language-");

  if (isBlock) {
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  }

  return (
    <code
      className="px-1.5 py-0.5 rounded-[2px] border border-border-surface bg-surface text-[0.85em] font-mono text-ink"
      {...props}
    >
      {children}
    </code>
  );
}

function MdxLink({
  href = "",
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isInternal = href.startsWith("/") || href.startsWith("#");
  const className =
    "text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent transition-colors";

  if (isInternal) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
      className={className}
    >
      {children}
    </a>
  );
}

export const mdxComponents: MDXComponents = {
  h2: ({ children, ...props }) => (
    <h2
      className="mt-12 mb-4 font-fraunces text-2xl sm:text-3xl text-ink font-semibold leading-tight scroll-mt-28"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      className="mt-8 mb-3 font-fraunces text-xl sm:text-2xl text-ink font-semibold leading-snug scroll-mt-28"
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p
      className="mt-4 first:mt-0 font-inter text-sm sm:text-base text-muted leading-relaxed"
      {...props}
    >
      {children}
    </p>
  ),
  a: MdxLink,
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-ink" {...props}>
      {children}
    </strong>
  ),
  ul: ({ children, ...props }) => (
    <ul
      className="my-4 space-y-2 pl-5 list-disc marker:text-accent font-inter text-sm sm:text-base text-muted leading-relaxed"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol
      className="my-4 space-y-2 pl-5 list-decimal marker:text-accent font-inter text-sm sm:text-base text-muted leading-relaxed"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="pl-1" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }) => (
    <figure className="my-8 p-6 rounded-[2px] border-l-2 border-accent bg-surface space-y-2 [&>p]:m-0 [&>p]:text-ink">
      <Quotes size={22} weight="fill" className="text-accent opacity-80" />
      <blockquote
        className="font-fraunces text-xl text-ink italic leading-snug"
        {...props}
      >
        {children}
      </blockquote>
    </figure>
  ),
  pre: CodeBlock,
  code: InlineCode,
  hr: () => <hr className="my-10 border-0 border-t border-border-surface" />,
  table: ({ children, ...props }) => (
    <div className="my-8 overflow-x-auto rounded-[2px] border border-border-surface">
      <table className="w-full text-left text-sm font-inter" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead className="bg-surface text-ink" {...props}>
      {children}
    </thead>
  ),
  th: ({ children, ...props }) => (
    <th
      className="px-4 py-2.5 font-inter text-[11px] font-bold uppercase tracking-eyebrow text-muted"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="px-4 py-2.5 border-t border-border-surface text-muted" {...props}>
      {children}
    </td>
  ),
};
