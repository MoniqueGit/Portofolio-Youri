import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Arrière-plans animés.
 *
 * Parti pris : plutôt que des particules génériques, un réseau de pistes de
 * circuit imprimé parcouru par des impulsions. Le motif dit quelque chose du
 * métier de Youri (électronique, embarqué) au lieu de décorer pour décorer.
 *
 * Contraintes respectées partout :
 *  - lent (10 à 60 s par cycle) ;
 *  - très peu contrasté, masqué là où il y a du texte ;
 *  - `aria-hidden` et `pointer-events: none` ;
 *  - keyframes CSS uniquement, donc aucun travail JS par frame.
 */

/** Tracés façon routage PCB : segments orthogonaux et chanfreins à 45°. */
const TRACES = [
  { d: "M -40 120 H 210 L 258 168 V 340 H 470 L 510 380 H 760", dur: 15, delay: 0 },
  { d: "M -40 520 H 150 L 196 474 V 250 H 430", dur: 18, delay: 2.5 },
  { d: "M 1240 90 H 1010 L 964 136 V 300 H 780 L 738 342 V 520", dur: 16, delay: 1.2 },
  { d: "M 1240 430 H 1080 L 1036 474 V 620 H 860", dur: 13, delay: 4 },
  { d: "M 300 840 V 660 L 344 616 H 560 L 604 660 V 840", dur: 20, delay: 3.2 },
  { d: "M 940 840 V 700 L 984 656 H 1180", dur: 17, delay: 5.5 },
];

/** Pastilles de connexion, posées sur les extrémités et les coudes des pistes. */
const PADS = [
  { cx: 258, cy: 168, delay: 0 },
  { cx: 510, cy: 380, delay: 1.4 },
  { cx: 196, cy: 474, delay: 2.8 },
  { cx: 964, cy: 136, delay: 0.7 },
  { cx: 738, cy: 342, delay: 2.1 },
  { cx: 1036, cy: 474, delay: 3.5 },
  { cx: 344, cy: 616, delay: 1.9 },
  { cx: 604, cy: 660, delay: 4.2 },
  { cx: 984, cy: 656, delay: 3.1 },
];

export function CircuitTraces({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 840"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      className={`h-full w-full ${className}`}
    >
      {/* Couche statique : ce qui reste visible si l'utilisateur a coupé les animations. */}
      {TRACES.map((t) => (
        <path key={`s-${t.d}`} d={t.d} className="trace-static" />
      ))}

      {/* Couche animée : une impulsion parcourt chaque piste, décalée dans le temps
          pour qu'aucune ne parte en même temps qu'une autre. */}
      {TRACES.map((t) => (
        <path
          key={`p-${t.d}`}
          d={t.d}
          className="trace-pulse"
          style={{ animationDuration: `${t.dur}s`, animationDelay: `${t.delay}s` }}
        />
      ))}

      {PADS.map((p) => (
        <circle
          key={`${p.cx}-${p.cy}`}
          cx={p.cx}
          cy={p.cy}
          r={3.5}
          className="trace-pad"
          style={{ animationDelay: `${p.delay}s` }}
        />
      ))}
    </svg>
  );
}

/** Nappes de couleur très diffuses, en dérive lente. Donne de la profondeur. */
export function Aurora({ intensity = 1 }: { intensity?: number }) {
  const blobs = [
    {
      color: "hsl(214 95% 55%)",
      opacity: 0.1 * intensity,
      style: { top: "-18%", right: "-8%", width: "46rem", height: "34rem" },
      animation: "drift-a 46s ease-in-out infinite",
    },
    {
      color: "hsl(250 60% 60%)",
      opacity: 0.08 * intensity,
      style: { top: "18%", left: "-14%", width: "40rem", height: "32rem" },
      animation: "drift-b 62s ease-in-out infinite",
    },
    {
      color: "hsl(190 80% 52%)",
      opacity: 0.07 * intensity,
      style: { bottom: "-22%", left: "34%", width: "38rem", height: "28rem" },
      animation: "drift-c 54s ease-in-out infinite",
    },
  ];

  return (
    <>
      {blobs.map((b) => (
        <div
          key={b.animation}
          className="aurora-blob"
          style={{
            ...b.style,
            background: b.color,
            opacity: b.opacity,
            animation: b.animation,
          }}
        />
      ))}
    </>
  );
}

/**
 * Fond du hero : nappes + pistes, avec une parallaxe légère au scroll.
 * Le fond descend moins vite que le contenu — l'écart crée la profondeur.
 */
export function HeroBackdrop() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <div ref={ref} className="backdrop-layer" aria-hidden="true">
      <motion.div className="absolute inset-0" style={reduced ? undefined : { y, opacity }}>
        <Aurora />
        <div className="backdrop-fade absolute inset-0">
          <CircuitTraces />
        </div>
      </motion.div>
    </div>
  );
}

/** Fond du bandeau sombre : mêmes pistes, contraste inversé. */
export function InkBackdrop() {
  return (
    <div className="backdrop-layer on-ink rounded-[2rem]" aria-hidden="true">
      <div className="absolute inset-0 opacity-90 [mask-image:linear-gradient(to_left,black_0%,black_20%,transparent_58%)]">
        <CircuitTraces />
      </div>
    </div>
  );
}

/** Fond de la section contact : nappes seules, encore plus discrètes. */
export function SoftBackdrop() {
  return (
    <div className="backdrop-layer" aria-hidden="true">
      <Aurora intensity={0.7} />
    </div>
  );
}
