import { useState } from "react";
import { Check, ImageIcon } from "lucide-react";
import { useInclinaison } from "@/components/motion";
import { useHalo } from "@/components/cursor";
import { Board3D } from "@/components/board-3d";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { Project } from "@/content/profile";

const b = import.meta.env.BASE_URL;
/** Les photos de projet se déposent dans client/public/projets/. */
const photo = (file: string) => `${b}projets/${file}`;

/** Nombre de tags visibles sur la vignette avant le chip « +N ». */
const VISIBLE_TAGS = 3;

/**
 * Étiquette. Les tons `actif` et `acquis` reprennent le code des afficheurs :
 * magenta pour ce qui est en cours, vert pour ce qui est livré. Le fond de ces
 * deux tons reste OPAQUE — une teinte translucide poserait le texte sur une
 * couleur imprévisible (la photo du projet, dessous) et ruinerait le contraste.
 */
function Chip({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: "default" | "solid" | "actif" | "acquis";
}) {
  const styles = {
    solid: "border-transparent bg-foreground/88 text-background backdrop-blur",
    actif: "border-[hsl(var(--actif))]/30 bg-background text-[hsl(var(--actif))]",
    acquis: "border-[hsl(var(--acquis))]/30 bg-background text-[hsl(var(--acquis))]",
    default: "border-border bg-background text-muted-foreground",
  }[tone];
  return <span className={`type-data rounded-[3px] border px-2.5 py-1 text-[0.8125rem] ${styles}`}>{children}</span>;
}

/** Un projet encore ouvert est une cible suivie ; un projet livré est acquis. */
const tonDuStatut = (statut: string) =>
  /en (d\u00e9veloppement|cours)/i.test(statut) ? ("actif" as const) : ("acquis" as const);

/**
 * Visuel de la vignette : la photo si elle existe, sinon un repli propre.
 * Le repli n'est pas une erreur affichée — c'est un état de la carte, pensé
 * pour rester présentable tant que la photo du projet n'a pas été prise.
 */
function ProjectMedia({ project, rounded = false }: { project: Project; rounded?: boolean }) {
  const [failed, setFailed] = useState(false);
  const Icon = project.icon;
  const src = project.cover ? photo(project.cover) : null;

  if (src && !failed) {
    return (
      <img
        src={src}
        alt={`Projet ${project.title}`}
        onError={() => setFailed(true)}
        loading="lazy"
        decoding="async"
        className={`h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] ${rounded ? "rounded-2xl" : ""}`}
      />
    );
  }

  return (
    <div
      className={`bg-blueprint flex h-full w-full flex-col items-center justify-center gap-2 ${rounded ? "rounded-2xl" : ""}`}
    >
      <Icon
        /* Relief : l'icône se décolle vers l'avant. `translateZ` n'a d'effet
           que parce que la carte porte déjà une perspective (useInclinaison)
           et que la chaîne de parents est en `preserve-3d`. */
        className="h-14 w-14 text-primary/70 transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:[transform:translateZ(30px)_scale(1.08)]"
        strokeWidth={1.25}
      />
    </div>
  );
}

/* ── Vignette ─────────────────────────────────────────────────────────────── */

export function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const extra = project.tags.length - VISIBLE_TAGS;
  /* La carte s'oriente vers le pointeur. Le survol « animé sur chaque carte »
     était écarté comme tic générique ; ici c'est une demande explicite de
     Youri (15/09/2026), et l'inclinaison RÉPOND au pointeur au lieu de
     rejouer une apparition. */
  const incline = useInclinaison<HTMLDivElement>();
  const { hote, halo } = useHalo<HTMLButtonElement>();

  return (
    <div ref={incline} className="h-full [transform-style:preserve-3d]">
      {/* Toute la carte est le bouton : une seule cible, cohérente au clavier. */}
      <button
        ref={hote}
        type="button"
        onClick={onOpen}
        aria-label={`Ouvrir le dossier du projet ${project.title}`}
        className="bloc group relative flex h-full w-full flex-col overflow-hidden text-left [transform-style:preserve-3d] transition-[border-color,box-shadow] duration-300 hover:border-primary/45 hover:shadow-[inset_0_2px_0_0_hsl(var(--efis))]"
      >
        <span ref={halo} className="halo" aria-hidden="true" />
        <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden border-b border-border">
          <ProjectMedia project={project} />
          <span className="absolute right-4 top-4">
            <Chip tone="solid">{project.origin}</Chip>
          </span>
          {project.status && (
            <span className="absolute left-4 top-4">
              <Chip tone={tonDuStatut(project.status)}>{project.status}</Chip>
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="type-heading text-balance">{project.title}</h3>
          <p className="mt-2 text-[1.0625rem] font-medium text-primary">{project.summary}</p>
          <p className="mt-3 line-clamp-3 flex-1 text-[1.0625rem] leading-relaxed text-muted-foreground">
            {project.desc}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.slice(0, VISIBLE_TAGS).map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
            {extra > 0 && <Chip>+{extra}</Chip>}
          </div>
        </div>

        {/* Pas de flèche accolée au libellé : la carte entière est cliquable,
            le soulignement au survol suffit à l'annoncer. */}
        <div className="border-t border-border px-6 py-4 text-[0.9375rem] font-medium">
          <span className="underline-offset-4 transition-colors duration-300 group-hover:text-primary group-hover:underline">
            Voir le dossier
          </span>
        </div>
      </button>
    </div>
  );
}

/* ── Dossier ──────────────────────────────────────────────────────────────── */

export function ProjectDossier({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  return (
    <Dialog open={project !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[88vh] max-w-3xl overflow-y-auto rounded-lg border-border bg-background p-0">
        {project && (
          <article className="group">
            {/* Sans photo, le bandeau reste compact : pas de grand vide au-dessus du texte.
                Le badge est à gauche pour laisser le coin droit au bouton de fermeture. */}
            <div
              className={`relative w-full overflow-hidden border-b border-border ${
                project.cover ? "aspect-[16/9]" : "h-32"
              }`}
            >
              <ProjectMedia project={project} />
              <span className="absolute left-4 top-4">
                <Chip tone="solid">{project.origin}</Chip>
              </span>
            </div>

            <div className="p-7 sm:p-9">
              <DialogTitle className="type-title text-balance !text-[clamp(1.6rem,3vw,2.25rem)]">
                {project.title}
              </DialogTitle>
              <p className="mt-3 text-[1.0625rem] text-muted-foreground">{project.context}</p>

              <p className="mt-6 text-[1.0625rem] leading-relaxed text-pretty">{project.desc}</p>

              <div className="my-8 h-px w-full bg-border" />

              <p className="type-label text-muted-foreground">Ce que j'ai fait</p>
              <ul className="mt-4 space-y-2.5">
                {project.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-[1.0625rem] leading-relaxed text-muted-foreground">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-pretty">{h}</span>
                  </li>
                ))}
              </ul>

              <p className="type-label mt-8 text-muted-foreground">Technologies et méthodes</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
                {project.status && <Chip tone={tonDuStatut(project.status)}>{project.status}</Chip>}
              </div>

              {project.gallery && project.gallery.length > 0 && (
                <>
                  <p className="type-label mt-8 text-muted-foreground">Photos</p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {project.gallery.map((g) => (
                      <img
                        key={g}
                        src={photo(g)}
                        alt={`${project.title} — photo`}
                        loading="lazy"
                        decoding="async"
                        className="aspect-[4/3] w-full rounded border border-border object-cover"
                      />
                    ))}
                  </div>
                </>
              )}

              {!project.cover && (
                <p className="mt-8 flex items-center gap-2 rounded bg-subtle px-4 py-3 text-[0.9375rem] text-muted-foreground">
                  <ImageIcon className="h-4 w-4 shrink-0" />
                  Photos du projet à venir.
                </p>
              )}
            </div>
          </article>
        )}
      </DialogContent>
    </Dialog>
  );
}

/* ── Pile de cartes ───────────────────────────────────────────────────────── */

/**
 * Les projets se superposent au défilement, la carte suivante recouvrant la
 * précédente.
 *
 * TOUT EST EN CSS : `position: sticky` avec un `top` qui descend d'un cran à
 * chaque carte. Aucun JavaScript ne tourne pendant le défilement — là où une
 * bibliothèque de « pin » recalcule des positions à chaque image. C'est la
 * version la moins chère de l'effet, et la seule qui tienne 60 images/s.
 *
 * Réservé aux grands écrans : empiler des cartes hautes sur un téléphone
 * revient à cacher le contenu. En dessous, la grille reprend la main.
 */
export function ProjectStack({
  projects,
  onOpen,
}: {
  projects: Project[];
  onOpen: (p: Project) => void;
}) {
  return (
    <div className="mt-14 hidden lg:block">
      {projects.map((project, i) => (
        <div
          key={project.slug}
          className="sticky"
          style={{
            top: `${76 + i * 26}px`,
            zIndex: i + 1,
            marginBottom: i === projects.length - 1 ? 0 : "30vh",
          }}
        >
          <button
            type="button"
            onClick={() => onOpen(project)}
            aria-label={`Ouvrir le dossier du projet ${project.title}`}
            className="bloc group grid w-full grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] overflow-hidden text-left shadow-[0_-10px_28px_-20px_rgba(16,23,26,0.35)] transition-[border-color,box-shadow] duration-300 hover:border-primary/45"
          >
            <div className="relative aspect-[4/3] w-full border-r border-border">
              <ProjectMedia project={project} />
              <span className="absolute left-4 top-4">
                <Chip tone="solid">{project.origin}</Chip>
              </span>
            </div>

            <div className="flex flex-col justify-center p-9 xl:p-11">
              <h3 className="type-heading text-balance">{project.title}</h3>
              <p className="mt-2.5 text-[1.0625rem] font-medium text-primary">{project.summary}</p>
              <p className="mt-4 max-w-xl text-[1.0625rem] leading-relaxed text-muted-foreground text-pretty">
                {project.desc}
              </p>

              <div className="mt-7 flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </div>

              <span className="mt-8 text-[0.9375rem] font-medium underline-offset-4 transition-colors duration-300 group-hover:text-primary group-hover:underline">
                Voir le dossier
              </span>
            </div>
          </button>
        </div>
      ))}

      {/*
        `sticky` cesse d'agir au bas du parent : sans réserve, la dernière carte
        arriverait sans jamais se figer. Réserve volontairement COURTE — au-delà,
        elle se voit comme un grand vide entre la pile et la section suivante.
      */}
      <div className="h-[12vh]" aria-hidden="true" />
    </div>
  );
}

/* ── Dossier technique mis en avant ───────────────────────────────────────── */

/**
 * Carte détaillée d'un projet, pour celui qu'on veut faire lire en premier.
 *
 * Écrite d'après un brief externe (15/09/2026) dont la « charte à respecter
 * impérativement » n'était pas celle de ce site. Ce qui a été repris : la
 * STRUCTURE demandée — zone visuelle avec grille technique et deux étiquettes,
 * puis titre, sous-titre d'accent, paragraphe, tags techniques, bouton pleine
 * largeur. Ce qui a été remplacé, et pourquoi :
 *
 *   Inter                  → Archivo, la famille du site (Inter est proscrite)
 *   #f1f5f9 / #0f172a      → jetons `--background` / `--foreground`
 *   teal-700 / blue-700    → `--primary` #04607A, déjà un bleu canard profond
 *   `rounded-2xl`          → 6 px : ici le rayon encode l'interaction, et une
 *                            surface de contenu ne se presse pas
 *   `shadow-sm`            → aucune ombre : la hiérarchie se lit au filet
 *   badges `text-xs` 12 px → 13 px, plancher de lisibilité en vidéoprojection
 *   « … complet → »        → sans flèche : elle n'est justifiée que pour un
 *                            changement de page, or ceci ouvre un panneau
 *
 * Le « visuel 3D » demandé n'est pas une image : c'est la carte électronique
 * filaire du site, qui tourne réellement.
 */
export function ProjectFeature({
  project,
  onOpen,
  vertical = false,
}: {
  project: Project;
  onOpen: () => void;
  /** Tuile haute d'une grille bento : le visuel passe au-dessus et ABSORBE la
      hauteur restante, pour que la tuile s'aligne sur les deux cartes voisines
      sans laisser un grand vide sous le texte. */
  vertical?: boolean;
}) {
  return (
    <article
      className={
        vertical
          ? "bloc flex h-full flex-col overflow-hidden"
          : "bloc overflow-hidden lg:grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]"
      }
    >
      <div
        className={
          vertical
            ? "relative h-[20rem] shrink-0 border-b border-border"
            : "relative aspect-[16/10] border-b border-border lg:aspect-auto lg:min-h-[22rem] lg:border-b-0 lg:border-r"
        }
      >
        <div className="bg-blueprint absolute inset-0" aria-hidden="true" />
        <Board3D className="absolute inset-0" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {project.status && <Chip tone={tonDuStatut(project.status)}>{project.status}</Chip>}
          <Chip tone="solid">{project.origin}</Chip>
        </div>
      </div>

      <div className="flex flex-col p-7 sm:p-9">
        <h3 className="type-title !text-[clamp(1.5rem,2.6vw,2rem)] text-balance">{project.title}</h3>
        <p className="mt-3 text-[1.0625rem] font-medium text-primary">{project.summary}</p>
        <p className="mt-4 max-w-xl flex-1 text-[1.0625rem] leading-relaxed text-muted-foreground text-pretty">
          {project.desc}
        </p>

        <div className="mt-7 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <Chip key={t}>{t}</Chip>
          ))}
        </div>

        {/* Pleine largeur et en pilule : c'est une commande, on la presse. */}
        <button
          type="button"
          onClick={onOpen}
          className="radius-control mt-8 w-full bg-primary px-6 py-3.5 text-[1.0625rem] font-semibold text-primary-foreground transition-colors duration-300 hover:bg-[hsl(var(--efis))] hover:text-[hsl(var(--panel))]"
        >
          Voir le dossier technique
        </button>
      </div>
    </article>
  );
}

/* ── Tuile compacte de bento ──────────────────────────────────────────────── */

/**
 * Petite case d'une grille bento.
 *
 * La règle qui fait tenir un bento : **une petite tuile porte moins de
 * contenu**, pas le même contenu en plus petit. Celle-ci ne garde donc que
 * l'icône, le titre et la promesse d'une ligne — le paragraphe et les tags
 * vivent dans le dossier, qui s'ouvre au clic.
 *
 * La trame de points en coin vient de la référence envoyée par Youri : c'est
 * une marque de calage de plan technique, cohérente avec le reste de la DA.
 */
export function ProjectTile({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const Icon = project.icon;
  const incline = useInclinaison<HTMLDivElement>();
  const { hote, halo } = useHalo<HTMLButtonElement>();

  return (
    <div ref={incline} className="h-full [transform-style:preserve-3d]">
      <button
        ref={hote}
        type="button"
        onClick={onOpen}
        aria-label={`Ouvrir le dossier du projet ${project.title}`}
        className="bloc group relative flex h-full w-full flex-col overflow-hidden p-7 text-left [transform-style:preserve-3d] transition-[border-color,box-shadow] duration-300 hover:border-primary/45 hover:shadow-[inset_0_2px_0_0_hsl(var(--efis))]"
      >
        <span ref={halo} className="halo" aria-hidden="true" />
        <span className="trame-points pointer-events-none absolute right-6 top-7 h-12 w-12" aria-hidden="true" />

        <span className="radius-field inline-flex w-fit border border-border bg-subtle p-3 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:[transform:translateZ(26px)]">
          <Icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
        </span>

        <h3 className="type-heading mt-auto pt-10 text-balance">{project.title}</h3>
        <p className="mt-2 text-[1.0625rem] font-medium text-primary text-pretty">{project.summary}</p>

        <span className="mt-6 flex flex-wrap items-center gap-2">
          {project.status && <Chip tone={tonDuStatut(project.status)}>{project.status}</Chip>}
          <span className="type-data text-[0.9375rem] underline-offset-4 transition-colors duration-300 group-hover:text-primary group-hover:underline">
            Voir le dossier
          </span>
        </span>
      </button>
    </div>
  );
}
