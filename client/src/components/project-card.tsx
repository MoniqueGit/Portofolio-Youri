import { useState } from "react";
import { Check, ImageIcon } from "lucide-react";
import { useInclinaison } from "@/components/motion";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { Project } from "@/content/profile";

const b = import.meta.env.BASE_URL;
/** Les photos de projet se déposent dans client/public/projets/. */
const photo = (file: string) => `${b}projets/${file}`;

/** Nombre de tags visibles sur la vignette avant le chip « +N ». */
const VISIBLE_TAGS = 3;

function Chip({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "solid" }) {
  const styles =
    tone === "solid"
      ? "border-transparent bg-foreground/88 text-background backdrop-blur"
      : "border-border bg-background text-muted-foreground";
  return <span className={`type-data rounded-[3px] border px-2.5 py-1 text-[0.8125rem] ${styles}`}>{children}</span>;
}

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
        className="h-10 w-10 text-primary/70 transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
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

  return (
    <div ref={incline} className="h-full [transform-style:preserve-3d]">
      {/* Toute la carte est le bouton : une seule cible, cohérente au clavier. */}
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Ouvrir le dossier du projet ${project.title}`}
        className="bloc group flex h-full w-full flex-col overflow-hidden text-left transition-[border-color,box-shadow] duration-300 hover:border-primary/45 hover:shadow-[inset_0_2px_0_0_hsl(var(--efis))]"
      >
        <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden border-b border-border">
          <ProjectMedia project={project} />
          <span className="absolute right-4 top-4">
            <Chip tone="solid">{project.origin}</Chip>
          </span>
          {project.status && (
            <span className="absolute left-4 top-4">
              <Chip>{project.status}</Chip>
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
                {project.status && <Chip>{project.status}</Chip>}
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
