"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  type HTMLMotionProps,
} from "framer-motion";
import { cn } from "@/lib/utils";
import {
  getRevealVariants,
  motionViewport,
  staggerContainerVariants,
  type ScrollRevealVariant,
} from "@/lib/motion";

type ScrollRevealProps = HTMLMotionProps<"div"> & {
  variant?: ScrollRevealVariant;
  delay?: number;
  className?: string;
  as?: "div" | "section";
};

export function ScrollReveal({
  children,
  variant = "fade-up",
  delay = 0,
  className,
  as = "div",
  ...props
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, motionViewport);
  const reducedMotion = useReducedMotion();
  const Component = as === "section" ? motion.section : motion.div;
  const variants = getRevealVariants(variant, !!reducedMotion);

  return (
    <Component
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{ delay }}
      className={cn("min-w-0 max-w-full", className)}
      {...props}
    >
      {children}
    </Component>
  );
}

type ScrollRevealStaggerProps = HTMLMotionProps<"div"> & {
  className?: string;
  stagger?: number;
  delayChildren?: number;
};

export function ScrollRevealStagger({
  children,
  className,
  stagger = 0.12,
  delayChildren = 0.05,
  ...props
}: ScrollRevealStaggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, motionViewport);
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainerVariants(!!reducedMotion, stagger, delayChildren)}
      className={cn("min-w-0 max-w-full", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

type ScrollRevealItemProps = HTMLMotionProps<"div"> & {
  variant?: ScrollRevealVariant;
  className?: string;
};

export function ScrollRevealItem({
  children,
  variant = "fade-up",
  className,
  ...props
}: ScrollRevealItemProps) {
  const reducedMotion = useReducedMotion();
  const variants = getRevealVariants(variant, !!reducedMotion);

  return (
    <motion.div
      variants={variants}
      className={cn("min-w-0 max-w-full", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

type HeroRevealProps = HTMLMotionProps<"div"> & {
  variant?: ScrollRevealVariant;
  className?: string;
  delay?: number;
};

export function HeroReveal({
  children,
  variant = "fade-up",
  className,
  delay = 0,
  ...props
}: HeroRevealProps) {
  const reducedMotion = useReducedMotion();
  const variants = getRevealVariants(variant, !!reducedMotion);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ delay }}
      className={cn("min-w-0 max-w-full", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

type HeroStaggerProps = HTMLMotionProps<"div"> & {
  className?: string;
  stagger?: number;
};

export function HeroStagger({
  children,
  className,
  stagger = 0.1,
  ...props
}: HeroStaggerProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainerVariants(!!reducedMotion, stagger)}
      className={cn("min-w-0 max-w-full", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function HeroRevealItem({
  children,
  variant = "fade-up",
  className,
  ...props
}: ScrollRevealItemProps) {
  const reducedMotion = useReducedMotion();
  const variants = getRevealVariants(variant, !!reducedMotion);

  return (
    <motion.div
      variants={variants}
      className={cn("min-w-0 max-w-full", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
