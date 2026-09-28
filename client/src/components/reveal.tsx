import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { EASE } from "@/components/motion";

/**
 * Révélation à l'entrée dans l'écran.
 *
 * ⚠ Ce composant assouplit une règle du projet, en connaissance de cause.
 * Le fondu-glissé sur chaque section est le « tic n°7 » relevé par l'audit
 * `frontend-design`, et il a été écarté jusqu'ici pour une raison précise :
 * en vidéoprojection, le texte doit être lisible d'emblée, sans attendre une
 * animation. Youri a demandé le 16/09/2026 d'essayer le site avec, quitte à
 * revenir en arrière.
 *
 * Les garde-fous qui rendent la chose supportable :
 *
 *   - décalage COURT (14 px) et durée courte : ça se lit comme une mise au
 *     point, pas comme un rideau qui s'ouvre ;
 *   - `once: true` — jamais rejoué, donc le texte ne disparaît pas quand on
 *     remonte la page ;
 *   - marge négative faible : l'élément est révélé AVANT d'être au centre,
 *     donc il est déjà lisible quand le regard y arrive ;
 *   - mouvement réduit : rien ne bouge, l'état final est rendu directement ;
 *   - `transform` et `opacity` seules — la règle de performance, elle, ne se
 *     négocie pas.
 *
 * Le `stagger` est volontairement plafonné : au-delà de ~8 enfants, les
 * derniers arrivent en retard et l'effet se voit comme une file d'attente.
 */
export function Reveal({
  children,
  delai = 0,
  className = "",
}: {
  children: ReactNode;
  delai?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const vu = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  const reduit = useReducedMotion();

  if (reduit) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 14 }}
      animate={vu ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
      transition={{ duration: 0.5, ease: EASE, delay: Math.min(delai, 0.4) }}
    >
      {children}
    </motion.div>
  );
}

/** Enveloppe une liste : chaque enfant entre avec un léger décalage. */
export function RevealGroup({
  children,
  className = "",
  pas = 0.07,
}: {
  children: ReactNode[];
  className?: string;
  pas?: number;
}) {
  return (
    <div className={className}>
      {children.map((enfant, i) => (
        <Reveal key={i} delai={i * pas}>
          {enfant}
        </Reveal>
      ))}
    </div>
  );
}
