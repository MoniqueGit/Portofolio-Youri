import { Link } from "wouter";
import { Download, Mail } from "lucide-react";
import { engagement, profile } from "@/content/profile";

const b = import.meta.env.BASE_URL;

/**
 * Carte « Expérience militaire et engagement ».
 *
 * Écrite d'après un brief externe (15/09/2026) qui contenait QUATRE erreurs de
 * fond, toutes corrigées ici — un tuteur d'alternance et un enseignant lisent
 * cette page :
 *   « Grade : Sergent »   → inventé. Un grade militaire ne se suppose pas.
 *   « Sapeur de Combat »  → inventé. Aucune spécialité n'est renseignée.
 *   « Depuis 2026 »       → faux, c'est 2025. 2026 est l'entrée chez Collins.
 *   « Blagnac, France »   → faux, c'est Carcassonne. Blagnac est le site Collins.
 * Les deux dernières venaient d'une confusion entre l'alternance et la réserve.
 *
 * Écarté aussi : le « logo / asset 3D de réserviste ». Afficher l'insigne d'une
 * unité ou l'emblème de l'Armée de Terre n'est pas à faire sans autorisation, et
 * il n'existe de toute façon aucun visuel à poser ici.
 *
 * Charte : `rounded-2xl`, `shadow-sm` et les pilules noires en 12 px du brief
 * sont remplacés par les règles du site — rayon 6 px pour une surface de
 * contenu, aucune ombre, étiquettes à 13 px minimum.
 */

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-border py-3.5 first:border-t-0 first:pt-0">
      <dt className="type-label text-muted-foreground">{label}</dt>
      <dd className="type-data mt-1 text-[1.0625rem] font-semibold">{value}</dd>
    </div>
  );
}

export function EngagementCard() {
  /* Les lignes non renseignées ne s'affichent pas : mieux vaut une fiche courte
     qu'une fiche plausible. */
  const meta = [
    { label: "Unité", value: `${engagement.unit}, ${engagement.location}` },
    { label: "Armée", value: engagement.branch },
    { label: "Statut", value: engagement.statut },
    ...(engagement.grade ? [{ label: "Grade", value: engagement.grade }] : []),
    ...(engagement.specialite ? [{ label: "Spécialité", value: engagement.specialite }] : []),
  ];

  /*
   * `bloc-live` : le filet cyan en tête est la façon dont ce design system
   * marque un bloc mis en avant — pas une ombre portée. L'utilitaire existait
   * depuis la refonte sans avoir jamais servi.
   */
  return (
    <section
      className="bloc bloc-live relative mt-24 overflow-hidden sm:mt-28"
      aria-labelledby="engagement-titre"
    >
      {/* Grille technique STRICTEMENT cantonnée à la marge haute : elle s'arrête
          exactement là où commence le titre. Un motif derrière du texte coûte la
          lisibilité en vidéoprojection, et c'est non négociable ici. */}
      <div className="bg-blueprint absolute inset-x-0 top-0 h-7 opacity-70 sm:h-10" aria-hidden="true" />

      <div className="relative p-7 sm:p-10">
        <h3 id="engagement-titre" className="type-title text-balance">
          Expérience militaire et engagement
        </h3>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)] lg:gap-14">
          <div>
            <p className="type-heading">{engagement.role}</p>
            <p className="type-data mt-2 text-[1.0625rem] text-primary">
              {engagement.branch}, {engagement.unit}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {/* Étiquettes franches et non des pilules : ce sont des libellés,
                  on ne les presse pas. */}
              {[engagement.unit, engagement.statut, ...engagement.tags].map((t) => (
                <span
                  key={t}
                  className="type-data rounded-[3px] border border-border bg-background px-2.5 py-1 text-[0.8125rem] text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>

            <ul className="mt-7 space-y-3.5">
              {engagement.apports.map((a) => (
                <li key={a} className="flex gap-3 leading-relaxed text-muted-foreground">
                  <span className="mt-[0.7rem] h-1 w-1 shrink-0 bg-[hsl(var(--efis))]" />
                  <span className="max-w-2xl text-pretty">{a}</span>
                </li>
              ))}
            </ul>
          </div>

          <dl className="lg:border-l lg:border-border lg:pl-10">
            {meta.map((m) => (
              <Meta key={m.label} label={m.label} value={m.value} />
            ))}
          </dl>
        </div>

        {/* Actions : les deux mènent quelque part de réel. Le brief proposait
            « Voir les certifications » — il n'en existe aucune à montrer. */}
        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-8 sm:flex-row sm:items-center">
          <Link
            href="/#contact"
            className="radius-control inline-flex items-center justify-center gap-2 bg-primary px-6 py-3.5 text-[1.0625rem] font-semibold text-primary-foreground transition-colors duration-300 hover:bg-[hsl(var(--efis))] hover:text-[hsl(var(--panel))]"
          >
            <Mail className="h-4 w-4" />
            Me contacter
          </Link>
          <a
            href={`${b}${profile.cvFile}`}
            download="CV_Youri_Figuie.pdf"
            className="radius-control inline-flex items-center justify-center gap-2 border border-border bg-surface px-6 py-3.5 text-[1.0625rem] font-semibold transition-colors duration-300 hover:border-primary/50"
          >
            <Download className="h-4 w-4" />
            Télécharger le CV
          </a>

          {/* Pas de « A · B » au point médian : c'est un tic relevé par l'audit.
              Deux informations, deux emplacements. */}
          <p className="type-data text-[0.9375rem] text-muted-foreground sm:ml-auto sm:text-right">
            <span className="font-semibold text-[hsl(var(--actif))]">{engagement.since}</span>
            <span className="mt-0.5 block">{engagement.location}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
