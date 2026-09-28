import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useAnimationFrame,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { EASE } from "@/components/motion";

/**
 * Titre du hero dont les lettres RÉPONDENT au pointeur.
 *
 * Porté le 16/09/2026 d'un composant 21st.dev (« Quordix Work Hero »,
 * physique magnétique des lettres). Ce qui a été REPRIS : la mécanique —
 * chaque lettre mesure sa distance au pointeur et se déplace d'une fraction
 * du vecteur, amortie par un ressort. Elle est en Framer Motion, déjà dans la
 * stack, donc rien à installer.
 *
 * Ce qui a été REMPLACÉ, et pourquoi :
 *
 *   Space Grotesk        → Archivo. La police du site, et elle est VARIABLE :
 *                          c'est ce qui rend l'effet de chasse possible.
 *   orange #f97316       → le cyan profond du site. L'orange n'existe pas
 *                          dans la charte, et l'ambre y est réservé à un
 *                          vrai état d'attention.
 *   `fontWeight` animé   → `transform` seule. Leur version animait la graisse
 *   + willChange dessus    par image AVEC `will-change: font-weight` : deux
 *                          erreurs mesurées ici le 14/09 — la graisse passe
 *                          par le fil principal, et un `will-change` permanent
 *                          crée une couche par élément.
 *   anneaux en orbite    → retirés. Le site a déjà un décor, et c'est une
 *                          carte électronique — le métier de Youri — plutôt
 *                          qu'un motif d'agence.
 *   halo orange flou     → retiré : `filter: blur(48px)` sur une couche de
 *                          60vh, c'est exactement le coût qu'on a chassé.
 *
 * L'effet est désactivé au doigt et en mouvement réduit : il RÉPOND à un
 * pointeur fin, il ne rejoue pas une apparition.
 */

type Lettre = {
  centre: { x: number; y: number };
  x: ReturnType<typeof useSpring>;
  y: ReturnType<typeof useSpring>;
  echelle: ReturnType<typeof useSpring>;
};

const RESSORT = { stiffness: 150, damping: 15, mass: 0.1 };
/** Au-delà, la lettre ne bouge plus. En deçà, elle suit une fraction du vecteur. */
const RAYON = 220;
const FORCE = 0.32;

function LettreMagnetique({
  char,
  inscrire,
}: {
  char: string;
  inscrire: (l: Lettre) => () => void;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useSpring(0, RESSORT);
  const y = useSpring(0, RESSORT);
  const echelle = useSpring(1, RESSORT);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const lettre: Lettre = { centre: { x: 0, y: 0 }, x, y, echelle };

    /* Le centre est mesuré une fois puis au redimensionnement seulement :
       un getBoundingClientRect par image force un recalcul de mise en page. */
    const mesurer = () => {
      const r = el.getBoundingClientRect();
      lettre.centre = {
        x: r.left + r.width / 2 + window.scrollX,
        y: r.top + r.height / 2 + window.scrollY,
      };
    };
    mesurer();
    window.addEventListener("resize", mesurer);
    const retirer = inscrire(lettre);
    return () => {
      window.removeEventListener("resize", mesurer);
      retirer();
    };
  }, [inscrire, x, y, echelle]);

  /* L'espace ne se déplace pas : il n'a pas de boîte à animer. */
  if (char === " ") return <span>&nbsp;</span>;

  return (
    <motion.span
      ref={ref}
      style={{ x, y, scale: echelle, display: "inline-block" }}
    >
      {char}
    </motion.span>
  );
}

export function HeroMagnetique({ lignes }: { lignes: string[] }) {
  const hote = useRef<HTMLHeadingElement>(null);
  const vu = useInView(hote, { amount: 0.1 });
  const reduit = useReducedMotion();

  const souris = { x: useMotionValue(-9999), y: useMotionValue(-9999) };
  const lettres = useRef<Set<Lettre>>(new Set());

  const inscrire = useRef((l: Lettre) => {
    lettres.current.add(l);
    return () => lettres.current.delete(l);
  }).current;

  useEffect(() => {
    if (reduit) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      souris.x.set(e.pageX);
      souris.y.set(e.pageY);
    };
    const onLeave = () => {
      souris.x.set(-9999);
      souris.y.set(-9999);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [reduit, souris.x, souris.y]);

  useAnimationFrame(() => {
    if (!vu || reduit) return;
    const mx = souris.x.get();
    const my = souris.y.get();

    lettres.current.forEach((l) => {
      if (!l.centre.x) return;
      const dx = mx - l.centre.x;
      const dy = my - l.centre.y;
      const d = Math.hypot(dx, dy);

      if (d < RAYON) {
        const p = (RAYON - d) / RAYON;
        l.x.set(dx * p * FORCE);
        l.y.set(dy * p * FORCE);
        l.echelle.set(1 + p * 0.12);
      } else {
        l.x.set(0);
        l.y.set(0);
        l.echelle.set(1);
      }
    });
  });

  return (
    <h1 ref={hote} className="type-display">
      {lignes.map((ligne, i) => (
        /* Le cache de `.po-ligne` reste : la montée à l'allumage est le geste
           signature du site, l'aimantation vient seulement s'y ajouter. */
        <span key={ligne} className="po-ligne">
          <motion.span
            className="block"
            initial={reduit ? undefined : { y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.95, ease: EASE, delay: i * 0.11 }}
          >
            {reduit
              ? ligne
              : ligne.split("").map((char, j) => (
                  <LettreMagnetique key={`${i}-${j}`} char={char} inscrire={inscrire} />
                ))}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}
