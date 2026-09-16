import { useInclinaison } from "@/components/motion";
import { useHalo } from "@/components/cursor";
import { academicProjects } from "@/content/profile";

/**
 * Chaîne de test d'une carte électronique.
 *
 * Écrite d'après un brief externe (15/09/2026) qui demandait un « schéma de
 * nœuds interactif avec pulsing dots ». L'INTENTION est bonne — un enchaînement
 * d'étapes se lit mieux en schéma qu'en liste. Le SUJET du brief ne l'était pas :
 * il proposait un workflow n8n, or n8n est un outil listé dans les compétences,
 * pas un projet réalisé. Aucun workflow n'existe dans les données, et en inventer
 * un revenait à gonfler une ligne d'outil en projet sur un site que lit un tuteur.
 *
 * Le sujet retenu est donc réel et vérifiable : les trois étapes du projet
 * « Carte STM32 », reprises TELLES QUELLES de ses `highlights` dans `profile.ts`.
 * Rien n'est rédigé ici — si Youri corrige son projet, le schéma suit.
 *
 * Ce qui a été remplacé par rapport au brief, et pourquoi :
 *
 *   `stroke-dashoffset` sur les liens → sur la liste MESURÉE des propriétés qui
 *                                        passent par le fil principal. C'est
 *                                        précisément ce qui a été retiré le 14/09.
 *   pulsing dots inventés             → `.trace-pad` / `pad-breathe`, l'idiome
 *                                        qui existe déjà ici, en `opacity` seule
 *   bleu canard #0f766e               → 5,0:1 sur le papier, sous le plancher
 *                                        de 7:1. Les jetons du site tiennent 7,4+
 *   spotlight en `background`         → `useHalo`, déplacé en `transform`
 */

/** Le projet dont on trace la chaîne. Le schéma suit la donnée, pas l'inverse. */
const PROJET = academicProjects.find((p) => p.slug === "carte-stm32");

/**
 * Le code couleur des afficheurs porte ici une information que les données
 * avaient déjà sans l'afficher : dans une chaîne ordonnée, ce qui précède est
 * ACQUIS (vert) et la dernière étape est la CIBLE suivie (magenta). Rien à
 * saisir en double dans `profile.ts` — la position dans la liste suffit.
 */
const ton = (i: number, total: number) =>
  i === total - 1
    ? { trait: "hsl(var(--actif))", libelle: "text-[hsl(var(--actif))]" }
    : { trait: "hsl(var(--acquis))", libelle: "text-[hsl(var(--acquis))]" };

export function ChaineTest() {
  const incline = useInclinaison<HTMLDivElement>();
  const { hote, halo } = useHalo<HTMLDivElement>();

  if (!PROJET) return null;
  const etapes = PROJET.highlights;

  return (
    <div ref={incline} className="h-full [transform-style:preserve-3d]">
      <div
        ref={hote}
        className="bloc group relative flex h-full flex-col overflow-hidden p-7 [transform-style:preserve-3d] transition-[border-color] duration-300 hover:border-primary/45 sm:p-9"
      >
        <span ref={halo} className="halo" aria-hidden="true" />
        <span className="trame-points pointer-events-none absolute right-6 top-7 hidden h-12 w-12 sm:block" aria-hidden="true" />

        <h3 className="type-heading text-balance">De la soudure à la validation</h3>
        <p className="mt-2.5 text-[1.0625rem] font-medium text-primary text-pretty">
          Les trois étapes de la carte STM32, dans l'ordre où elles se font.
        </p>

        {/*
          Le schéma est décoratif pour un lecteur d'écran : la même chaîne est
          donnée juste en dessous en texte, dans le bon ordre. Un lecteur
          d'écran entend une liste ordonnée, pas une description de dessin.
        */}
        <svg
          viewBox="0 0 320 64"
          className="mt-8 w-full max-w-md"
          aria-hidden="true"
          focusable="false"
        >
          {etapes.map((_, i) => {
            const x = 32 + i * 128;
            const { trait } = ton(i, etapes.length);
            return (
              <g key={i}>
                {/* Liaison vers l'étape suivante — trait statique, jamais animé. */}
                {i < etapes.length - 1 && (
                  <path className="trace-static" d={`M ${x + 14} 32 H ${x + 114}`} />
                )}
                {/*
                  Le disque reste PLEINEMENT opaque : sur un code couleur d'état,
                  un nœud à demi éteint se lit « étape non faite » et contredirait
                  le vert. C'est l'anneau extérieur qui respire — il signale
                  l'activité sans jamais mettre en doute l'état de l'étape.
                */}
                <circle cx={x} cy={32} r={9} fill={trait} />
                <circle
                  className="trace-pad"
                  cx={x}
                  cy={32}
                  r={13.5}
                  fill="none"
                  stroke={trait}
                  strokeWidth={1.25}
                  style={{ animationDelay: `${i * 1.1}s` }}
                />
              </g>
            );
          })}
        </svg>

        <ol className="mt-7 flex flex-col gap-3">
          {etapes.map((etape, i) => {
            const { libelle } = ton(i, etapes.length);
            return (
              <li key={etape} className="flex gap-3 text-[1.0625rem] leading-relaxed">
                <span className={`type-data shrink-0 font-semibold ${libelle}`}>{i + 1}</span>
                <span className="text-muted-foreground text-pretty">{etape}</span>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
