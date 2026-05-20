import type { Variants } from "framer-motion";

export const motionEase = [0.16, 1, 0.3, 1] as const;

export const motionViewport = {
  once: true,
  amount: 0.15,
  margin: "0px 0px -60px 0px",
} as const;

export type ScrollRevealVariant =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "scale-up"
  | "blur-up"
  | "fade";

const hiddenByVariant: Record<
  ScrollRevealVariant,
  { opacity: number; x?: number; y?: number; scale?: number; filter?: string }
> = {
  "fade-up": { opacity: 0, y: 48 },
  "fade-down": { opacity: 0, y: -48 },
  "fade-left": { opacity: 0, y: 40 },
  "fade-right": { opacity: 0, y: 40 },
  "scale-up": { opacity: 0, scale: 0.92, y: 24 },
  "blur-up": { opacity: 0, y: 40, filter: "blur(12px)" },
  fade: { opacity: 0 },
};

export function getRevealVariants(
  variant: ScrollRevealVariant,
  reducedMotion: boolean,
): Variants {
  if (reducedMotion) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.2 } },
    };
  }

  const hidden = hiddenByVariant[variant];
  const visible = {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.75,
      ease: motionEase,
    },
  };

  return { hidden, visible };
}

export const scrollRevealVariants: ScrollRevealVariant[] = [
  "fade-up",
  "fade-left",
  "fade-right",
  "scale-up",
  "blur-up",
];

export function getScrollVariant(index: number): ScrollRevealVariant {
  return scrollRevealVariants[index % scrollRevealVariants.length];
}

export const staggerContainerVariants = (
  reducedMotion: boolean,
  stagger = 0.12,
  delayChildren = 0.05,
): Variants => ({
  hidden: {},
  visible: reducedMotion
    ? {}
    : {
        transition: {
          staggerChildren: stagger,
          delayChildren,
        },
      },
});

export const surveyQuestionEntrance = (
  reducedMotion: boolean,
): Variants =>
  reducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.2 } },
      }
    : {
        hidden: { opacity: 0, y: 28 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: motionEase },
        },
      };

export const surveyCirclesContainer = (
  reducedMotion: boolean,
): Variants => ({
  hidden: {},
  visible: reducedMotion
    ? {}
    : {
        transition: {
          staggerChildren: 0.045,
          delayChildren: 0.12,
        },
      },
});

export const surveyCircleItem = (reducedMotion: boolean): Variants =>
  reducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.15 } },
      }
    : {
        hidden: { opacity: 0, scale: 0.5, y: 8 },
        visible: {
          opacity: 1,
          scale: 1,
          y: 0,
          transition: {
            type: "spring",
            stiffness: 420,
            damping: 22,
          },
        },
      };

