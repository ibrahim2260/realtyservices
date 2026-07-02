"use client";

import Link from "next/link";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "signal" | "ghost" | "ghost-ink";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  magnetic?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  asChild?: boolean;
}

interface LinkButtonProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  variant?: Variant;
  size?: Size;
  external?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const variantClass: Record<Variant, string> = {
  signal: "btn-signal",
  ghost: "btn-ghost",
  "ghost-ink": "btn-ghost-ink",
};

const sizeClass: Record<Size, string> = {
  sm: "btn-sm",
  md: "",
  lg: "btn-lg",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "signal",
      size = "md",
      className,
      children,
      icon,
      iconPosition = "right",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn("btn", variantClass[variant], sizeClass[size], className)}
        {...props}
      >
        {icon && iconPosition === "left" && (
          <span className="flex-shrink-0">{icon}</span>
        )}
        {children}
        {icon && iconPosition === "right" && (
          <span className="flex-shrink-0">{icon}</span>
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

export function LinkButton({
  href,
  variant = "signal",
  size = "md",
  className,
  children,
  external,
  icon,
  iconPosition = "right",
  ...props
}: LinkButtonProps) {
  const classes = cn("btn", variantClass[variant], sizeClass[size], className);

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {icon && iconPosition === "left" && (
          <span className="flex-shrink-0">{icon}</span>
        )}
        {children}
        {icon && iconPosition === "right" && (
          <span className="flex-shrink-0">{icon}</span>
        )}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {icon && iconPosition === "left" && (
        <span className="flex-shrink-0">{icon}</span>
      )}
      {children}
      {icon && iconPosition === "right" && (
        <span className="flex-shrink-0">{icon}</span>
      )}
    </Link>
  );
}

/** Arrow icon used in CTAs */
export function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      className={cn("w-4 h-4", className)}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
