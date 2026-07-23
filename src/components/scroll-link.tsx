"use client";

import Link from "next/link";

/**
 * Anchor link that always scrolls to its target, even when the URL hash
 * already matches (a plain #hash link is a no-op the second time). The hash
 * is never written to the URL, so every click scrolls.
 */
export function ScrollLink({
  href,
  onClick,
  ...props
}: React.ComponentProps<typeof Link> & { href: string }) {
  return (
    <Link
      href={href}
      onClick={(e) => {
        if (href.startsWith("#")) {
          e.preventDefault();
          document
            .getElementById(href.slice(1))
            ?.scrollIntoView({ behavior: "smooth" });
        }
        onClick?.(e);
      }}
      {...props}
    />
  );
}
