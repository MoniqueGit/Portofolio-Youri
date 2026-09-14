import { useRef } from "react";
import { Link } from "wouter";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { useInView } from "framer-motion";
import { ForceGauge } from "@/components/force-gauge";
import { pichenette, chaine, specs, faits, ressources } from "@/content/pichenette";
import { profile } from "@/content/profile";

/**
 * Page dédiée au projet « Pichenette Game ».
 *
 * Le brief d'origine (généré par un autre modèle) demandait un site à part :
 * fond charbon, néons rouge/orange, Space Grotesk, glassmorphism, GSAP,
 * Three.js et Lenis. Rien de tout cela n'est repris — ce sont les valeurs par
 * défaut d'un générateur, elles contrediraient la DA « planche de bord » ET la
 * contrainte de lisibilité en vidéoprojection. Ce qui EST repris, c'est
 * l'intention : une page qui donne envie d'essayer la machine.
 *
 * Elle est donc tenue par une seule idée forte — l'instrument de mesure
 * jouable en tête de page — et reste sobre partout ailleurs.
 */

/** Valeur non renseignée : affichée en attente, jamais remplacée par une
    spécification plausible. Un enseignant lit cette page. */
function AFaire({ children = "À renseigner" }: { children?: string }) {
  return (
    <span className="type-data text-[0.9375rem] text-[hsl(var(--caution))]">{children}</span>
  );
}

/**
 * Révélation de la chaîne de mesure.
 *
 * Seule apparition déclenchée au défilement de la page, et elle porte du sens :
 * les étages s'allument DANS L'ORDRE du signal, de l'impact vers l'affichage.
 * Ailleurs, le mouvement répond à une action — ici il montre une propagation.
 */
function Chaine() {
  const hote = useRef<HTMLOListElement>(null);
  const vu = useInView(hote, { once: true, margin: "0px 0px -12% 0px" });
  /*
   * Tant qu'aucun composant n'est connu, on n'affiche pas quatre « à renseigner »
   * d'affilée : la section dit déjà que le détail arrive. Dès qu'un seul est
   * rempli, la ligne réapparaît partout — l'ambre signale alors ce qui manque.
   */
  const amorcee = chaine.some((e) => e.composant);

  return (
    <ol ref={hote} className="mt-12 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
      {chaine.map((e, i) => (
        <li
          key={e.stage}
          className="flex flex-col bg-background p-6"
          style={{
            opacity: vu ? undefined : 0,
            animation: vu ? `po-fade .7s var(--ease-out-expo) ${i * 0.12}s both` : undefined,
          }}
        >
          <div className="flex items-baseline gap-3">
            {/* La numérotation est légitime : c'est une séquence, pas une liste. */}
            <span className="type-data text-[0.9375rem] font-bold text-primary">{i + 1}</span>
            <h3 className="text-[1.0625rem] font-bold tracking-[-0.02em]">{e.stage}</h3>
          </div>
          <p className="mt-3 flex-1 text-[1.0625rem] leading-relaxed text-muted-foreground text-pretty">
            {e.role}
          </p>
          {amorcee && (
            <p className="mt-4 border-t border-border pt-3">
              {e.composant ? (
                <span className="type-data text-[0.9375rem] font-semibold">{e.composant}</span>
              ) : (
                <AFaire />
              )}
            </p>
          )}
        </li>
      ))}
    </ol>
  );
}

export default function Pichenette() {
  const liens = ressources.filter((r) => r.href);
  const ficheAmorcee = specs.some((sp) => sp.valeur);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-[3px]">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5 sm:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[0.9375rem] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {profile.firstName} {profile.lastName}
          </Link>
          <span className="type-data text-[0.9375rem] text-muted-foreground">
            {pichenette.origin}
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
        {/* ── Ouverture : le titre d'abord, l'instrument ensuite ──────────── */}
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-16">
          <div>
            <div className="po-horizon h-px w-16 bg-[hsl(var(--efis))]" />
            <h1 className="type-title po-fade mt-7 text-balance" style={{ animationDelay: "0.1s" }}>
              {pichenette.summary}
            </h1>
            <p
              className="type-lead po-fade mt-6 max-w-xl text-muted-foreground text-pretty"
              style={{ animationDelay: "0.25s" }}
            >
              {pichenette.intro}
            </p>
            <p
              className="po-fade mt-7 text-[1.0625rem] text-muted-foreground"
              style={{ animationDelay: "0.4s" }}
            >
              {pichenette.context}
              {pichenette.team && ` ${pichenette.team}.`}
            </p>
          </div>

          {/* L'instrument est jouable : c'est la démonstration, pas une image
              de la machine. Tant qu'il n'y a pas de photo du vrai prototype,
              mieux vaut faire essayer le PRINCIPE que montrer un faux rendu. */}
          <div className="po-fade" style={{ animationDelay: "0.55s" }}>
            <ForceGauge />
          </div>
        </div>

        {/* ── La chaîne de mesure ─────────────────────────────────────────── */}
        <section className="relative mt-24 border-t border-border pt-16 sm:mt-32">
          <span className="absolute left-0 top-0 h-[3px] w-10 bg-[hsl(var(--efis))]" aria-hidden="true" />
          <h2 className="type-title max-w-2xl text-balance">
            Ce qu'il se passe entre le doigt et le score.
          </h2>
          <p className="type-lead mt-5 max-w-2xl text-muted-foreground text-pretty">
            Quatre étages, toujours les mêmes dans un système de mesure : capter, conditionner,
            traiter, afficher. Le détail des composants retenus arrive ici.
          </p>
          <Chaine />
        </section>

        {/* ── Fiche technique ─────────────────────────────────────────────── */}
        <section className="relative mt-24 border-t border-border pt-16 sm:mt-32">
          <span className="absolute left-0 top-0 h-[3px] w-10 bg-[hsl(var(--efis))]" aria-hidden="true" />
          <h2 className="type-title max-w-2xl text-balance">La fiche technique.</h2>
          {!ficheAmorcee ? (
            /* Une mention calme vaut mieux que six alertes ambre : le message
               est le même, sans faire lire « inachevé » à un visiteur. */
            <p className="mt-8 max-w-2xl border-l-2 border-[hsl(var(--caution))] pl-5 text-pretty text-muted-foreground">
              Microcontrôleur, capteur de force, affichage, alimentation, carte électronique et
              structure mécanique seront détaillés ici une fois le montage arrêté.
            </p>
          ) : (
          <dl className="mt-12 grid gap-px bg-border sm:grid-cols-2">
            {specs.map((s) => (
              <div
                key={s.label}
                className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 bg-background px-1 py-5 sm:px-6"
              >
                <dt className="text-[1.0625rem] font-semibold">{s.label}</dt>
                <dd className="type-data text-[1.0625rem] text-muted-foreground">
                  {s.valeur || <AFaire />}
                </dd>
              </div>
            ))}
          </dl>
          )}
        </section>

        {/* ── Ce que j'ai fait — masqué tant que rien n'est renseigné ─────── */}
        {faits.length > 0 && (
          <section className="relative mt-24 border-t border-border pt-16 sm:mt-32">
            <span className="absolute left-0 top-0 h-[3px] w-10 bg-[hsl(var(--efis))]" aria-hidden="true" />
            <h2 className="type-title max-w-2xl text-balance">Ce que j'ai fait sur ce projet.</h2>
            <ul className="mt-10 space-y-0">
              {faits.map((f) => (
                <li key={f} className="border-t border-border py-5">
                  <p className="max-w-2xl text-pretty text-muted-foreground">{f}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {liens.length > 0 && (
          <section className="mt-24 border-t border-border pt-10 sm:mt-32">
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {liens.map((r) => (
                <a
                  key={r.label}
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[1.0625rem] font-semibold transition-colors hover:text-primary"
                >
                  {r.label}
                  <ExternalLink className="h-4 w-4" />
                </a>
              ))}
            </div>
          </section>
        )}

        <div className="mt-20 border-t border-border pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[1.0625rem] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour au portfolio
          </Link>
        </div>
      </main>
    </div>
  );
}
