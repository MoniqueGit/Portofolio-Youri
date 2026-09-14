import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Readout } from "@/components/motion";
import { CircuitTraces } from "@/components/backdrop";
import { Board3D } from "@/components/board-3d";
import { collins, alternance } from "@/content/collins";
import { profile } from "@/content/profile";

const b = import.meta.env.BASE_URL;

/**
 * Page dédiée à Collins Aerospace.
 *
 * C'est le seul panneau sombre du site : toute l'audace visuelle est dépensée
 * ici, le reste des pages reste sur papier clair pour la vidéoprojection.
 * Le registre est celui d'un afficheur de cockpit — relevés chiffrés qui se
 * stabilisent, filets cyan, chasse resserrée sur les données.
 */

/** Logo de l'entreprise, ou repli typographique tant qu'il n'est pas fourni. */
function Wordmark() {
  const [failed, setFailed] = useState(false);

  if (collins.logo && !failed) {
    return (
      <img
        src={`${b}collins/${collins.logo}`}
        alt={collins.name}
        onError={() => setFailed(true)}
        className="h-10 w-auto sm:h-12"
      />
    );
  }

  return (
    <p className="text-2xl font-bold tracking-[-0.03em] [font-stretch:112%] sm:text-3xl">
      {collins.name}
    </p>
  );
}

export default function Collins() {
  const renseignee = alternance.missions.length > 0;

  return (
    <div className="panel min-h-screen">
      {/* Barre de retour — la page a sa propre identité, pas le bandeau clair */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[hsl(var(--panel))]/96 backdrop-blur-[3px]">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5 sm:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[0.9375rem] text-white/70 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            {profile.firstName} {profile.lastName}
          </Link>
          <a
            href={collins.site}
            target="_blank"
            rel="noopener noreferrer"
            className="type-data inline-flex items-center gap-1.5 text-[0.9375rem] text-white/55 transition-colors hover:text-white"
          >
            collinsaerospace.com
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </header>

      <main className="relative overflow-hidden">
        {/* Pistes cyan, cantonnées à la marge droite */}
        <div
          className="backdrop-layer on-panel hidden lg:block"
          aria-hidden="true"
        >
          <CircuitTraces />
          {/* Le panneau sombre est le seul endroit du site où un décor peut
              vraiment respirer : la marge droite y est libre sur toute la
              hauteur du bandeau d'ouverture. */}
          <Board3D tone="panneau" className="absolute -right-40 top-0 h-[42rem] w-[42rem]" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
          {/* ── Ouverture : allumage du panneau ─────────────────────────── */}
          <div className="po-fade">
            <Wordmark />
          </div>

          <div
            className="po-horizon mt-8 h-px bg-[hsl(var(--efis))]"
            style={{ animationDelay: "0.2s" }}
          />

          <h1 className="type-title po-fade mt-8 max-w-3xl text-balance" style={{ animationDelay: "0.35s" }}>
            Là où je passe la moitié de mon année.
          </h1>

          <p
            className="type-lead po-fade mt-6 max-w-2xl text-pretty text-white/72"
            style={{ animationDelay: "0.5s" }}
          >
            {collins.intro}
          </p>

          {/* ── Relevés chiffrés ────────────────────────────────────────── */}
          <section className="mt-16 border-t border-white/12 sm:mt-20">
            <div className="grid gap-px bg-white/12 sm:grid-cols-3">
              {collins.figures.map((f) => (
                <div key={f.label} className="bg-[hsl(var(--panel))] px-1 py-8 sm:px-6">
                  <p className="type-readout text-[hsl(var(--efis))]">
                    <Readout value={f.value} decimals={f.decimals} />
                    <span className="ml-1 text-[0.5em] align-baseline">{f.unit}</span>
                  </p>
                  <p className="mt-3 text-[1.0625rem] font-semibold">{f.label}</p>
                  <p className="type-data mt-1 text-[0.9375rem] text-white/55">{f.note}</p>
                </div>
              ))}
            </div>
            <p className="type-data mt-6 text-[0.9375rem] text-white/45">
              Source :{" "}
              <a
                href={collins.source.href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-white/30 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
              >
                {collins.source.label}
              </a>
            </p>
          </section>

          {/* ── Repères chronologiques — ici la numérotation est légitime ── */}
          <section className="mt-20 sm:mt-28">
            <h2 className="type-heading">Comment l'entreprise s'est formée</h2>
            <ol className="mt-8 space-y-0">
              {collins.timeline.map((t) => (
                <li
                  key={t.year}
                  className="grid gap-2 border-t border-white/12 py-6 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-8"
                >
                  <span className="type-data text-[1.0625rem] font-bold text-[hsl(var(--efis))]">{t.year}</span>
                  <p className="max-w-2xl text-pretty text-white/78">{t.text}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* ── Domaines ────────────────────────────────────────────────── */}
          <section className="mt-20 sm:mt-28">
            <h2 className="type-heading">Ce qu'ils fabriquent</h2>
            <div className="mt-8 grid gap-px bg-white/12 sm:grid-cols-2">
              {collins.domains.map((d) => (
                <div key={d.title} className="bg-[hsl(var(--panel))] p-6 sm:p-7">
                  <h3 className="text-[1.0625rem] font-bold">{d.title}</h3>
                  <p className="mt-2 text-[1.0625rem] leading-relaxed text-white/68 text-pretty">{d.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Le groupe ───────────────────────────────────────────────── */}
          <section className="mt-20 sm:mt-28">
            <h2 className="type-heading">L'échelle du groupe</h2>
            <p className="mt-6 max-w-2xl text-pretty text-white/78">
              {collins.parentFacts.text} Le groupe compte {collins.parentFacts.employees} et a réalisé{" "}
              {collins.parentFacts.sales}.
            </p>
          </section>

          {/* ── Ma mission ──────────────────────────────────────────────── */}
          <section className="mt-20 sm:mt-28">
            <h2 className="type-heading">Ce que j'y fais</h2>

            <p className="mt-5 text-[1.0625rem] text-white/60">
              <span className="font-semibold text-white">{alternance.role}</span>
              {alternance.team && `, ${alternance.team}`}
              {alternance.location && `, site de ${alternance.location}`}. Depuis {alternance.start}.
            </p>

            {renseignee ? (
              <>
                <ul className="mt-8 space-y-0">
                  {alternance.missions.map((m) => (
                    <li key={m} className="border-t border-white/12 py-5">
                      <p className="max-w-2xl text-pretty text-white/78">{m}</p>
                    </li>
                  ))}
                </ul>
                {alternance.takeaways.length > 0 && (
                  <>
                    <h3 className="type-label mt-12 text-white/55">Ce que ça m'apporte</h3>
                    <ul className="mt-4 space-y-3">
                      {alternance.takeaways.map((t) => (
                        <li key={t} className="flex gap-3 text-white/78">
                          <span className="mt-[0.7rem] h-1 w-1 shrink-0 bg-[hsl(var(--efis))]" />
                          <span className="max-w-2xl text-pretty">{t}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </>
            ) : (
              /* Pas de missions fabriquées : un tuteur d'alternance lit cette page. */
              <p className="mt-8 max-w-2xl border-l-2 border-[hsl(var(--caution))] pl-5 text-white/68">
                Le détail de mes missions arrive prochainement.
              </p>
            )}
          </section>

          <div className="mt-20 border-t border-white/12 pt-8 sm:mt-28">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[1.0625rem] text-white/70 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour au portfolio
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
