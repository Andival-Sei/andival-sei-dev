"use client";

import { forwardRef, type HTMLAttributes, type MutableRefObject } from "react";
import { useReducedMotion } from "framer-motion";

import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

interface RevealProps extends HTMLAttributes<HTMLDivElement> {
  delay?: number;
}

export const Reveal = forwardRef<HTMLDivElement, RevealProps>(
  ({ className, children, delay = 0, style, ...rest }, forwardedRef) => {
    const shouldReduceMotion = useReducedMotion();
    const { ref, isInView } = useInView<HTMLDivElement>({
      threshold: 0.2,
    });

    const mergedRef = (node: HTMLDivElement | null) => {
      if (typeof forwardedRef === "function") {
        forwardedRef(node);
      } else if (forwardedRef) {
        (forwardedRef as MutableRefObject<HTMLDivElement | null>).current = node;
      }
      (ref as MutableRefObject<HTMLDivElement | null>).current = node;
    };

    const animationClass = shouldReduceMotion
      ? "opacity-100"
      : isInView
        ? "translate-y-0 opacity-100"
        : "translate-y-6 opacity-0";

    return (
      <div
        ref={mergedRef}
        className={cn(
          "transition-all duration-700 ease-out will-change-transform",
          animationClass,
          className
        )}
        style={{
          transitionDelay: shouldReduceMotion ? undefined : `${delay}ms`,
          ...(style ?? {}),
        }}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

Reveal.displayName = "Reveal";
