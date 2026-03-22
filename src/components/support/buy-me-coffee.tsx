"use client";

const BMC_USERNAME = process.env.NEXT_PUBLIC_BMC_USERNAME || "";

interface BuyMeCoffeeProps {
  variant?: "inline" | "button";
}

export function BuyMeCoffee({ variant = "button" }: BuyMeCoffeeProps) {
  if (!BMC_USERNAME) return null;

  const url = `https://buymeacoffee.com/${BMC_USERNAME}`;

  if (variant === "inline") {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-primary transition-colors"
      >
        ☕ Support FenerIndex
      </a>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
    >
      <span>☕</span>
      <span>Support FenerIndex</span>
    </a>
  );
}
