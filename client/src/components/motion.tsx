import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

/**
 * Courbe unique du site : démarrage franc, décélération longue. C'est ce qui
 * donne la sensation d'une masse qui se pose, par opposition au `ease-in-out`
 * par défaut qui paraît mou.
 */
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * Relevé chiffré qui se stabilise en entrant à l'écran.
 *
 * Ce n'est pas une apparition décorative : le mouvement MONTRE la valeur qui
 * arrive, exactement comme un afficheur qui se cale après sa mise sous tension.
 * C'est le seul mouvement non déclenché par l'utilisateur en dehors de la
 * séquence d'allumage, et il ne joue qu'une fois.
 */
export function Readout({
  value,
  decimals = 0,
  className = "",
}: {
  value: number;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  // Déclenche dès que le relevé entre dans le viewport : au-delà, on lisait
  // encore « 0 » alors que le bloc était déjà à l'écran.
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  const [shown, setShown] = useState(reduced ? value : 0);

  useEffect(() => {
    if (!inView || reduced) {
      if (reduced) setShown(value);
      return;
    }
    const duration = 1100;
    const start = performance.now();
    let frame = 0;

    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // Même courbe que le reste du site, calculée à la main : la valeur
      // balaye vite puis se pose, comme une aiguille.
      const eased = 1 - Math.pow(1 - t, 4);
      setShown(value * eased);
      if (t < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, value]);

  const format = (n: number) =>
    n.toLocaleString("fr-FR", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });

  /*
   * La valeur finale est portée par `aria-label` et le compteur est masqué aux
   * technologies d'assistance : un lecteur d'écran doit entendre « 30,2 », pas
   * « 0 » ni le défilement des valeurs intermédiaires.
   */
  return (
    <span ref={ref} className={className} aria-label={format(value)} role="text">
      <span aria-hidden="true">{format(shown)}</span>
    </span>
  );
}

/**
 * Parallaxe verticale pilotée par le scroll. Distance volontairement faible :
 * au-delà de quelques dizaines de pixels, l'effet se voit et devient gadget.
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
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const raw = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const y = useSpring(raw, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduced ? undefined : { y }}>{children}</motion.div>
    </div>
  );
}
