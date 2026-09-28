import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { useHalo } from "@/components/cursor";
import type { Experience } from "@/content/profile";

/**
 * Carte d'une expérience professionnelle.
 *
 * Écrite le 16/09/2026 : les expériences étaient une liste plate séparée par
 * des filets, seule section de la page à ne pas avoir reçu de relief.
 *
 * ── Ce que le skill `ui-ux-pro-max` a apporté ───────────────────────────────
 * « Hover vs Tap », sévérité HIGH : *Hover effects don't work on touch
 * devices.* Rien d'essentiel ne dépend donc du survol — la période, le rôle,
 * l'entreprise, les missions et le lien sont tous visibles d'emblée. Le halo
 * et le filet de tête sont des agréments, pas des porteurs d'information.
 *
 * ── Ce qui n'a PAS été pris du même skill ───────────────────────────────────
 * Le pattern « timeline » avec pastilles numérotées : une chronologie
 * d'emplois n'est pas une séquence d'étapes, et les marqueurs 01/02/03 sont
 * le tic n°2 relevé par l'audit. La période suffit à ordonner.
 *
 * ── La couleur porte l'information ──────────────────────────────────────────
 * Une expérience en cours passe en magenta — la cible suivie sur un afficheur.
 * L'état se déduit de `period.startsWith("Depuis")`, comme partout ailleurs
 * sur le site : rien à saisir en double dans `profile.ts`.
 *
 * ── Pas de `useInclinaison` ici ─────────────────────────────────────────────
 * Mesuré le 16/09/2026 sur la vitrine des projets : le hook d'inclinaison
 * coûtait 30 images/s sur des cartes larges (29,4 contre 59,4). Ces cartes-ci
 * sont encore plus larges. La profondeur se fait en CSS, au survol seulement.
 */
export function CarteExperience({ exp }: { exp: Experience }) {
  const enCours = exp.period.startsWith("Depuis");
  const { hote, halo } = useHalo<HTMLElement>();
  const teinte = enCours ? "hsl(var(--actif))" : "hsl(var(--efis))";

  return (
    <article
      ref={hote}
      className={`bloc relief group relative overflow-hidden p-6 sm:p-8 ${
        enCours ? "teinte-actif" : ""
      }`}
    >
      <span ref={halo} className="halo" aria-hidden="true" />

      {/* Filet de tête à la couleur de l'état, révélé au survol. */}
      <span
        className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
        style={{ background: teinte }}
        aria-hidden="true"
      />

      {/*
        La période passe AU-DESSUS du titre sous `lg`, en colonne à gauche
        au-delà. Une colonne fixe de 11rem sur un téléphone écraserait le
        titre sur deux caractères de large.
      */}
      <div className="grid gap-4 lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-10">
        <div className="lg:pt-1">
          <p
            className={`type-data text-[0.9375rem] ${
              enCours ? "font-semibold text-[hsl(var(--actif))]" : "text-muted-foreground"
            }`}
          >
            {exp.period}
          </p>
          {enCours && (
            /* Voyant : un état en cours se signale, comme sur un panneau.
               Il double la couleur du texte, il ne la remplace pas — la
               couleur seule ne doit jamais porter une information. */
            <span className="mt-2 hidden items-center gap-1.5 lg:inline-flex">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: teinte }}
                aria-hidden="true"
              />
              <span className="type-data text-[0.8125rem] text-muted-foreground">En poste</span>
            </span>
          )}
        </div>

        <div>
          <h3 className="type-heading text-balance">{exp.role}</h3>
          <p className="type-data mt-1.5 text-[1.0625rem] text-primary text-pretty">{exp.company}</p>

          {exp.bullets.length > 0 && (
            <ul className="mt-5 space-y-3">
              {exp.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3 leading-relaxed text-muted-foreground">
                  <span
                    className="mt-[0.7rem] h-1 w-1 shrink-0"
                    style={{ background: teinte, opacity: 0.55 }}
                    aria-hidden="true"
                  />
                  <span className="text-pretty">{bullet}</span>
                </li>
              ))}
            </ul>
          )}

          {exp.href && (
            <Link
              href={exp.href}
              className="mt-4 inline-flex min-h-[44px] items-center gap-2 font-semibold text-primary underline-offset-4 hover:underline"
            >
              {exp.hrefLabel}
              {/* La flèche est justifiée : elle mène à une autre page. */}
              <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
            </Link>
          )}

          <div className="mt-6 flex flex-wrap gap-2">
            {exp.tags.map((t) => (
              <span
                key={t}
                className="type-data rounded-[3px] border border-border bg-background/70 px-2.5 py-1 text-[0.8125rem] text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
