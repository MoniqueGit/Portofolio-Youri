import { type CSSProperties } from "react";
import { Board3D } from "@/components/board-3d";

/**
 * Arrière-plan : réseau de pistes de circuit imprimé.
 *
 * ─── Leçon de performance, mesurée ───────────────────────────────────────────
 * La première version masquait ce calque en CSS (`mask-composite`) ET le
 * déplaçait en parallaxe au scroll. Résultat mesuré : 27 images/s au lieu de 60.
 * Un masque sur une couche qui bouge oblige le navigateur à tout recomposer à
 * chaque image.
 *
 * Correctif : plus aucun masque, plus aucune parallaxe ici. Les pistes sont
 * simplement DESSINÉES là où il n'y a pas de texte. La géométrie remplace le
 * masque, et ça ne coûte rien puisque c'est calculé une fois pour toutes.
 *
 * Seules `transform` et `opacity` s'animent sur le compositeur ; tout le reste
 * passe par le fil principal. Toute animation ajoutée ici doit s'y tenir.
 * ────────────────────────────────────────────────────────────────────────────
 */

/**
 * Tracés façon routage PCB. Ils occupent uniquement le bandeau haut (y < 200),
 * la colonne de droite (x > 780) et le bandeau bas (y > 700) : les trois zones
 * où le texte du hero ne va jamais.
 */
const TRACES = [
  "M -40 88 H 236 L 276 128 V 196",
  "M 1240 58 H 980 L 940 98 V 178 H 724",
  "M 1240 296 H 1024 L 984 336 V 468",
  "M 1240 556 H 1064 L 1024 596 V 712 H 884",
  "M -40 764 H 296 L 336 724 H 616",
  "M 604 880 V 792 L 644 752 H 908 L 948 792 V 880",
];

/** Pastilles de connexion, posées sur les coudes. Elles n'animent que l'opacité. */
const PADS: [number, number, number][] = [
  [276, 128, 0],
  [940, 98, 1.4],
  [984, 336, 2.8],
  [1024, 596, 0.7],
  [336, 724, 2.1],
  [644, 752, 3.5],
  [948, 792, 1.9],
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
      {TRACES.map((d) => (
        <path key={d} d={d} className="trace-static" />
      ))}
      {PADS.map(([cx, cy, delay]) => (
        <circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r={3.5}
          className="trace-pad"
          style={{ animationDelay: `${delay}s` } as CSSProperties}
        />
      ))}
    </svg>
  );
}

/**
 * Fond du hero : les pistes plates, plus la même carte vue en volume.
 *
 * Toujours aucun masque ni parallaxe ici — la leçon du 14/09 tient. La carte
 * 3D est volontairement débordante à droite : un objet coupé par le bord se
 * lit comme un cadrage, là où un objet entier et centré ferait vignette.
 *
 * Masqué sous 1024 px : sur un téléphone, un décor est la première chose à
 * couper, et c'est là que la fluidité compte le plus.
 */
export function HeroBackdrop() {
  return (
    <div className="backdrop-layer hidden lg:block" aria-hidden="true">
      <CircuitTraces />
      <Board3D className="absolute -bottom-[22rem] -left-[18rem] h-[46rem] w-[46rem]" />
    </div>
  );
}
