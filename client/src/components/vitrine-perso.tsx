import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/components/motion";
import { useHalo } from "@/components/cursor";
import type { Project } from "@/content/profile";

/**
 * Vitrine des projets personnels.
 *
 * Écrite le 16/09/2026 d'après le pattern « Portfolio Grid » du skill
 * `ui-ux-pro-max` : *Visuals first. Filter by category.* Le filtre se justifie
 * ici parce que les trois projets sont de NATURES différentes — embarqué, web,
 * design — et que c'est précisément ce qu'un recruteur cherche à trier. Sur
 * trois projets de même nature, il n'aurait servi à rien.
 *
 * Ce qui a été écarté du même pattern :
 *   « Masonry »          → trois cartes ne font pas une maçonnerie ; une grille
 *                          régulière se lit mieux et ne saute pas au chargement.
 *   « Accent: Minimal »  → Youri a demandé de la couleur le 16/09. Chaque nature
 *                          porte donc sa teinte, mais elles restent très pâles
 *                          (7:1 tenu sur tous les textes).
 *   « Filter by category » avec « Tous » présélectionné : sans cela, un visiteur
 *                          qui ne touche à rien verrait une vitrine amputée.
 *
 * La catégorie se DÉDUIT des tags déjà présents dans `profile.ts`. Rien à
 * saisir en double : si Youri retague un projet, le filtre suit.
 */

type Nature = "Embarqué" | "Web" | "Design";

/** La nature se lit dans les tags existants, par ordre de priorité. */
function natureDe(p: Project): Nature {
  const tags = p.tags.map((t) => t.toLowerCase());
  if (tags.some((t) => /esp32|stm32|rfid|électronique|electronique|embarqué|embarque|c\+\+/.test(t))) {
    return "Embarqué";
  }
  if (tags.some((t) => /web|dashboard|automatisation|n8n/.test(t))) return "Web";
  return "Design";
}

/** Chaque nature a sa teinte. Le code couleur reste celui des afficheurs. */
const TEINTES: Record<Nature, { classe: string; jeton: string }> = {
  Embarqué: { classe: "teinte-cyan", jeton: "hsl(var(--efis))" },
  Web: { classe: "teinte-actif", jeton: "hsl(var(--actif))" },
  Design: { classe: "teinte-acquis", jeton: "hsl(var(--acquis))" },
};

/** Un projet en cours est une cible suivie ; un projet livré est acquis. */
const tonDuStatut = (s?: string) =>
  s && /en (développement|developpement|cours)/i.test(s) ? "actif" : "acquis";

function CartePerso({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const Icon = project.icon;
  const nature = natureDe(project);
  const teinte = TEINTES[nature];
  const { hote, halo } = useHalo<HTMLButtonElement>();
  const ton = tonDuStatut(project.status);

  return (
    /*
     * ⚠ PAS de `useInclinaison` ici, et c'est une decision mesuree.
     *
     * Le hook d'inclinaison ecrit une `transform` par image et relit le
     * rectangle de l'element. Mesure du 16/09/2026 sur ces trois cartes :
     * 29,4 img/s AVEC, 59,4 SANS — trente images par seconde, tres au-dela
     * du bruit de ±5 du banc. Ces cartes sont hautes et larges, et le
     * navigateur doit recomposer toute leur surface (fond teinte + ombre
     * coloree + canvas de fond) a chaque image.
     *
     * L'effet de profondeur est conserve autrement : la perspective est posee
     * en CSS et l'icone se decolle en `translateZ` au survol. Une transition
     * CSS ne tourne que pendant le survol, la ou la boucle tournait en
     * permanence sur les trois cartes a la fois.
     */
    <div className="h-full [perspective:900px]">
      <button
        ref={hote}
        type="button"
        onClick={onOpen}
        aria-label={`Ouvrir le dossier du projet ${project.title}`}
        className={`bloc relief ${teinte.classe} group relative flex h-full w-full flex-col overflow-hidden p-7 text-left transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] [transform-style:preserve-3d] hover:[transform:rotateX(2deg)_translateY(-3px)]`}
      >
        <span ref={halo} className="halo" aria-hidden="true" />
        <span
          className="trame-points pointer-events-none absolute right-6 top-6 hidden h-10 w-10 sm:block"
          aria-hidden="true"
        />

        {/* Filet de tête à la couleur de la nature : la teinte du fond et le
            filet disent la même chose, l'un en aplat, l'autre en trait. */}
        <span
          className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
          style={{ background: teinte.jeton }}
          aria-hidden="true"
        />

        <span className="radius-field inline-flex w-fit border border-border bg-surface/80 p-3 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:[transform:translateZ(26px)]">
          <Icon className="h-6 w-6" style={{ color: teinte.jeton }} strokeWidth={1.5} />
        </span>

        <h3 className="type-heading mt-7 text-balance">{project.title}</h3>
        <p className="mt-2 text-[1.0625rem] font-medium text-primary text-pretty">{project.summary}</p>
        <p className="mt-3.5 flex-1 text-[1.0625rem] leading-relaxed text-muted-foreground text-pretty">
          {project.desc}
        </p>

        <span className="mt-6 flex flex-wrap items-center gap-2">
          {project.status && (
            <span
              className={`type-data rounded-[3px] border bg-background px-2.5 py-1 text-[0.8125rem] ${
                ton === "actif"
                  ? "border-[hsl(var(--actif))]/30 text-[hsl(var(--actif))]"
                  : "border-[hsl(var(--acquis))]/30 text-[hsl(var(--acquis))]"
              }`}
            >
              {project.status}
            </span>
          )}
          <span className="type-data rounded-[3px] border border-border bg-background px-2.5 py-1 text-[0.8125rem] text-muted-foreground">
            {nature}
          </span>
          <span className="type-data ml-auto text-[0.9375rem] underline-offset-4 transition-colors duration-300 group-hover:text-primary group-hover:underline">
            Voir le dossier
          </span>
        </span>
      </button>
    </div>
  );
}

export function VitrinePerso({
  projects,
  onOpen,
}: {
  projects: Project[];
  onOpen: (p: Project) => void;
}) {
  const [filtre, setFiltre] = useState<Nature | "Tous">("Tous");
  const reduit = useReducedMotion();

  /** Seules les natures réellement présentes deviennent des filtres. */
  const natures = useMemo(() => {
    const vues = new Set(projects.map(natureDe));
    return (["Embarqué", "Web", "Design"] as Nature[]).filter((n) => vues.has(n));
  }, [projects]);

  const visibles = useMemo(
    () => (filtre === "Tous" ? projects : projects.filter((p) => natureDe(p) === filtre)),
    [projects, filtre],
  );

  return (
    <div>
      {/* Les filtres sont des COMMANDES : pilule, comme tout ce qui se presse. */}
      <div className="mt-10 flex flex-wrap gap-2.5" role="group" aria-label="Filtrer par nature de projet">
        {(["Tous", ...natures] as const).map((n) => {
          const actif = filtre === n;
          return (
            <button
              key={n}
              type="button"
              onClick={() => setFiltre(n)}
              aria-pressed={actif}
              className={`radius-control inline-flex min-h-[44px] items-center border px-4 text-[0.9375rem] font-semibold transition-colors duration-300 focus:rounded-full ${
                actif
                  ? "border-transparent bg-primary text-primary-foreground"
                  : "border-border bg-surface/80 text-muted-foreground hover:border-primary/45 hover:text-primary"
              }`}
            >
              {n}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3">
        {visibles.map((p, i) => (
          <motion.div
            key={p.slug}
            initial={reduit ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE, delay: Math.min(i * 0.06, 0.24) }}
            className="h-full"
          >
            <CartePerso project={p} onOpen={() => onOpen(p)} />
          </motion.div>
        ))}
      </div>

      {/* État vide : le skill le classe en « Empty States — ne jamais laisser
          un écran blanc ». Il ne devrait pas survenir, les filtres étant
          déduits des projets présents, mais il coûte trois lignes. */}
      {visibles.length === 0 && (
        <p className="bloc relief mt-8 p-7 text-[1.0625rem] text-muted-foreground">
          Aucun projet dans cette catégorie pour le moment.
        </p>
      )}
    </div>
  );
}
