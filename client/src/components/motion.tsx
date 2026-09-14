import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";

/**
 * Courbe d'accélération unique du site.
 * Un démarrage franc puis une décélération longue : c'est ce qui donne
 * la sensation « ça glisse » des pages produit d'Apple, par opposition
 * au `ease-in-out` par défaut qui paraît mou.
 */
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Apparition de base : courte distance, léger flou, jamais de rebond. */
export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: EASE },
  },
};

export const staggerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "article" | "header" | "footer";
};

/**
 * Révèle son contenu une seule fois, quand il entre dans le viewport.
 * `margin` négatif : l'animation démarre un peu avant que l'élément
 * soit réellement visible, pour qu'elle soit finie quand l'œil arrive dessus.
 */
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const reduced = useReducedMotion();
  const Tag = motion[as];

  if (reduced) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-12% 0px -8% 0px" }}
      variants={{
        hidden: revealVariants.hidden,
        visible: {
          ...(revealVariants.visible as object),
          transition: { duration: 0.85, ease: EASE, delay },
        },
      }}
    >
      {children}
    </Tag>
  );
}

/** Conteneur qui décale l'apparition de ses enfants `RevealItem`. */
export function RevealGroup({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "ul";
}) {
  const reduced = useReducedMotion();
  const Tag = motion[as];

  if (reduced) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px -6% 0px" }}
      variants={staggerVariants}
    >
      {children}
    </Tag>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const reduced = useReducedMotion();
  const Tag = motion[as];

  if (reduced) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Tag className={className} variants={revealVariants}>
      {children}
    </Tag>
  );
}

/**
 * Parallaxe verticale pilotée par le scroll.
 * `distance` reste volontairement faible (quelques dizaines de pixels) :
 * au-delà, l'effet se voit et devient gadget.
 */
export function Parallax({
  children,
  className,
  distance = 40,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const raw = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const y = useSpring(raw, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduced ? undefined : { y }}>{children}</motion.div>
    </div>
  );
}
