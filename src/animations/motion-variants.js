const EASE = [0.16, 1, 0.3, 1];
const EASE_QUART = [0.76, 0, 0.24, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE },
  },
};

export const fadeUpSmall = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export const stagger = (delayChildren = 0.1, staggerChildren = 0.08) => ({
  hidden: {},
  visible: {
    transition: { delayChildren, staggerChildren },
  },
});

export const staggerFast = stagger(0.05, 0.05);

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: EASE },
  },
};

export const slideRight = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: EASE },
  },
};

export const lineGrow = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1, ease: EASE_QUART },
  },
};

export const verticalLineGrow = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 1, ease: EASE_QUART },
  },
};

export const viewportOnce = { once: true, amount: 0.25 };
export const viewportLoose = { once: true, amount: 0.15 };

export { EASE, EASE_QUART };
