"use client"
import React, { CSSProperties, ComponentPropsWithoutRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface ShimmerButtonProps extends ComponentPropsWithoutRef<"button"> {
  shimmerColor?: string;
  shimmerDuration?: string;
  borderRadius?: string;
  className?: string;
  children?: React.ReactNode;
}

export const ShimmerButton = React.forwardRef<
  HTMLButtonElement,
  ShimmerButtonProps
>(
  (
    {
      shimmerColor = "#ffffff",
      shimmerDuration = "3s",
      borderRadius = "100px",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [isClicked, setIsClicked] = useState(false);

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    return (
      <button
        ref={ref}
        {...props}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => setIsClicked(false)}
        style={
          {
            "--shimmer-color": shimmerColor,
            "--shimmer-speed": shimmerDuration,
            "--radius": borderRadius,
          } as CSSProperties
        }
        className={cn(
          "relative inline-flex items-center justify-center px-6 py-3 font-semibold text-white",
          "bg-black rounded-[var(--radius)] overflow-hidden",
          "transition-transform duration-300 active:translate-y-px",
          "border border-transparent",
          className
        )}
      >
        {/* Meteor-like border effect on click */}
        <div
          className={cn(
            "absolute inset-[-2px] z-[-1] rounded-[var(--radius)]",
            isClicked
              ? "animate-meteor-shine opacity-100" // Show the meteor shine effect when clicked
              : "opacity-0"
          )}
          style={{
            background: `conic-gradient(from 0deg, transparent, var(--shimmer-color), transparent 60%)`,
            padding: "2px",
            transition: "opacity 0.3s ease-in-out",
          }}
        />

        {/* Button content */}
        <span className="relative z-10">{children}</span>
      </button>
    );
  }
);

ShimmerButton.displayName = "ShimmerButton";
