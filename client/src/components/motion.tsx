import { useEffect, useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";

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
  const hote = useRef<HTMLSpanElement>(null);
  const chiffre = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(hote, { once: true, margin: "0px 0px -8% 0px" });

  const format = (n: number) =>
    n.toLocaleString("fr-FR", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });

  useEffect(() => {
    const el = chiffre.current;
    if (!el) return;

    if (reduced) {
      el.textContent = format(value);
      return;
    }
    if (!inView) return;

    /*
     * On écrit directement dans le DOM plutôt que de passer par un state React.
     * Un `setState` par image, c'est un rendu React complet soixante fois par
     * seconde pour changer trois caractères — du travail sur le fil principal,
     * exactement ce qui fait tomber les images.
     */
    const duree = 1100;
    const debut = performance.now();
    let frame = 0;

    const pas = (now: number) => {
      const t = Math.min((now - debut) / duree, 1);
      const adouci = 1 - Math.pow(1 - t, 4);
      el.textContent = format(value * adouci);
      if (t < 1) frame = requestAnimationFrame(pas);
    };

    frame = requestAnimationFrame(pas);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduced, value, decimals]);

  /*
   * La valeur finale est portée par `aria-label` et le compteur masqué aux
   * technologies d'assistance : un lecteur d'écran doit entendre « 30,2 », pas
   * le défilement des valeurs intermédiaires.
   */
  return (
    <span ref={hote} className={className} aria-label={format(value)} role="text">
      <span ref={chiffre} aria-hidden="true">
        {reduced ? format(value) : format(0)}
      </span>
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
  /*
   * Interpolation directe, sans ressort : un `useSpring` entretient sa propre
   * boucle d'animation en continu, même quand le scroll est à l'arrêt.
   * Ici la valeur est strictement liée à la position de scroll — rien ne
   * tourne quand rien ne bouge.
   */
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduced ? undefined : { y, willChange: "transform" }}>
        {children}
      </motion.div>
    </div>
  );
}

/**
 * Inclinaison 3D au survol : la carte s'oriente vers le pointeur.
 *
 * Le rectangle est mesuré à l'ENTRÉE du pointeur et gardé en mémoire : le
 * relire à chaque mouvement forcerait un recalcul de mise en page par image.
 * L'angle est volontairement faible — au-delà de ~8°, l'effet cesse d'être une
 * réaction et devient un tour de passe-passe.
 */
export function useInclinaison<T extends HTMLElement>(angle = 5.5) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let boite: DOMRect | null = null;
    let tx = 0, ty = 0, cx = 0, cy = 0, frame = 0;

    const boucle = () => {
      const dx = tx - cx;
      const dy = ty - cy;
      cx += dx * 0.16;
      cy += dy * 0.16;
      el.style.transform = `perspective(900px) rotateY(${cx.toFixed(2)}deg) rotateX(${cy.toFixed(2)}deg)`;
      frame = Math.abs(dx) > 0.02 || Math.abs(dy) > 0.02 ? requestAnimationFrame(boucle) : 0;
    };
    const relancer = () => {
      if (!frame) frame = requestAnimationFrame(boucle);
    };

    const onEnter = () => { boite = el.getBoundingClientRect(); };
    const onMove = (e: PointerEvent) => {
      if (!boite) boite = el.getBoundingClientRect();
      tx = ((e.clientX - boite.left) / boite.width - 0.5) * 2 * angle;
      ty = -((e.clientY - boite.top) / boite.height - 0.5) * 2 * angle;
      relancer();
    };
    const onLeave = () => {
      boite = null;
      tx = 0;
      ty = 0;
      relancer();
    };

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [angle]);

  return ref;
}
