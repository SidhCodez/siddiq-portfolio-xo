interface JsonLdProps {
  data: Record<string, unknown>;
}

/**
 * Renders schema.org structured data.
 * `<` is escaped so user-controlled strings can never terminate the script tag.
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
