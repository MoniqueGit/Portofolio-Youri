import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Jauge de force — le moment interactif du site.
 *
 * POURQUOI CETTE FORME. Le brief d'origine demandait un compteur 7-segments
 * néon sur fond noir. Ici le même rôle est tenu par un INSTRUMENT À AIGUILLE :
 * c'est le seul objet qui appartienne en même temps aux deux mondes du site —
 * une borne d'arcade mesure une force, un cockpit aussi. L'aiguille dépasse
 * puis se stabilise, comme un vrai appareil de mesure, et un repère ambre
 * retient la valeur maximale (peak hold) : c'est une fonction réelle des
 * dynamomètres, pas une décoration.
 *
 * POURQUOI FOND SOMBRE ICI. Un instrument est sombre — c'est ce qui rend son
 * aiguille lisible. Le cadran est un composant encastré dans la page ; le
 * papier, lui, reste clair partout (règle de vidéoprojection).
 *
 * PERFORMANCE. Rien ne passe par React pendant l'animation : l'aiguille est une
 * `rotate` écrite au `ref`, le chiffre un `textContent`. Zéro rendu par image,
 * zéro propriété non compositée. Voir la section Performance de CLAUDE.md.
 */

const MAX = 1000;

/** Rayon de l'arc gradué, dans le repère du viewBox. */
const ARC = 104;

/** 0 point ⇒ aiguille à gauche (−90°), 1000 ⇒ à droite (+90°). */
const angleOf = (score: number) => -90 + (Math.min(score, MAX) / MAX) * 180;

const fmt = (n: number) => Math.round(n).toLocaleString("fr-FR");

/**
 * Étalonnage. `v` est une vitesse en pourcentage de la largeur de piste par
 * milliseconde : la normaliser rend le score comparable entre un écran de
 * portable et un téléphone, là où des pixels par milliseconde donneraient
 * l'avantage au grand écran.
 */
const PLEINE_ECHELLE = 0.95;
/** Une pichenette valable doit parcourir au moins ce ratio de la piste. */
const COURSE_MINI = 0.08;
/** Durée de charge au clavier pour atteindre le maximum. */
const CHARGE_MS = 700;

type Etat = "attente" | "charge" | "mesure";

export function ForceGauge() {
  const aiguille = useRef<SVGGElement>(null);
  const repere = useRef<SVGGElement>(null);
  const chiffre = useRef<HTMLSpanElement>(null);
  const piste = useRef<HTMLDivElement>(null);
  const palet = useRef<HTMLDivElement>(null);

  const frame = useRef(0);
  const score = useRef(0);
  const record = useRef(0);
  const echantillons = useRef<{ x: number; t: number }[]>([]);
  const course = useRef(0);

  const [etat, setEtat] = useState<Etat>("attente");
  const [invalide, setInvalide] = useState(false);
  const [joue, setJoue] = useState(false);
  const [recordAffiche, setRecordAffiche] = useState(0);

  const reduit = useRef(false);
  useEffect(() => {
    reduit.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return () => cancelAnimationFrame(frame.current);
  }, []);

  const poserPalet = (dx: number) => {
    const el = palet.current;
    if (el) el.style.transform = `translate3d(${dx}px, 0, 0)`;
  };

  /** Amène l'aiguille sur `cible` avec le dépassement puis la stabilisation d'un vrai cadran. */
  const lancer = useCallback((cible: number) => {
    cancelAnimationFrame(frame.current);
    const depart = score.current;
    score.current = cible;

    const appliquer = (valeur: number) => {
      aiguille.current?.setAttribute("transform", `rotate(${angleOf(valeur)} 160 160)`);
      if (chiffre.current) chiffre.current.textContent = fmt(Math.max(valeur, 0));
    };

    if (reduit.current) {
      appliquer(cible);
      return;
    }

    const duree = 950;
    const debut = performance.now();

    const pas = (now: number) => {
      const t = Math.min((now - debut) / duree, 1);
      /*
       * Oscillation amortie : l'aiguille dépasse la valeur puis revient. C'est
       * la signature mécanique d'un appareil à aiguille — sans elle, le
       * mouvement ressemble à une barre de progression.
       */
      const valeur =
        t >= 1 ? cible : cible - (cible - depart) * Math.exp(-5.2 * t) * Math.cos(8.5 * t);
      appliquer(valeur);
      if (t < 1) frame.current = requestAnimationFrame(pas);
    };
    frame.current = requestAnimationFrame(pas);
  }, []);

  const enregistrer = useCallback(
    (valeur: number) => {
      const v = Math.max(0, Math.min(Math.round(valeur), MAX));
      setJoue(true);
      setInvalide(false);
      lancer(v);
      if (v > record.current) {
        record.current = v;
        setRecordAffiche(v);
        repere.current?.setAttribute("transform", `rotate(${angleOf(v)} 160 160)`);
      }
    },
    [lancer],
  );

  /* ── Pichenette au doigt ou à la souris ──────────────────────────────── */

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (etat === "charge") return;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    echantillons.current = [{ x: e.clientX, t: performance.now() }];
    course.current = 0;
    setEtat("charge");
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (etat !== "charge") return;
    const ech = echantillons.current;
    const depart = ech[0];
    if (!depart) return;

    const dx = e.clientX - depart.x;
    course.current = Math.max(course.current, Math.abs(dx));

    const largeur = piste.current?.clientWidth ?? 1;
    const paletLargeur = palet.current?.clientWidth ?? 0;
    poserPalet(Math.max(0, Math.min(dx, largeur - paletLargeur - 8)));

    ech.push({ x: e.clientX, t: performance.now() });
    if (ech.length > 10) ech.splice(1, ech.length - 10);
  };

  const onPointerUp = () => {
    if (etat !== "charge") return;
    setEtat("mesure");
    poserPalet(0);

    const ech = echantillons.current;
    const largeur = piste.current?.clientWidth ?? 1;
    const dernier = ech[ech.length - 1];
    const fenetre = ech.filter((s) => dernier && dernier.t - s.t <= 90);
    const premier = fenetre[0] ?? ech[0];

    if (!dernier || !premier || course.current < largeur * COURSE_MINI) {
      // Une mesure trop courte n'est pas un zéro : c'est une mesure invalide.
      setJoue(true);
      setInvalide(true);
      lancer(0);
      setEtat("attente");
      return;
    }

    const dt = Math.max(dernier.t - premier.t, 8);
    const vitesse = (Math.abs(dernier.x - premier.x) / dt / largeur) * 100;
    enregistrer((vitesse / PLEINE_ECHELLE) * MAX);
    setEtat("attente");
  };

  /* ── Charge au clavier : maintenir pour armer, relâcher pour envoyer ──── */

  const debutCharge = useRef(0);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== " " && e.key !== "Enter") return;
    e.preventDefault();
    if (etat === "charge") return;
    debutCharge.current = performance.now();
    setEtat("charge");

    const avancer = () => {
      const t = Math.min((performance.now() - debutCharge.current) / CHARGE_MS, 1);
      const largeur = piste.current?.clientWidth ?? 0;
      const paletLargeur = palet.current?.clientWidth ?? 0;
      poserPalet(t * Math.max(0, largeur - paletLargeur - 8));
      if (debutCharge.current) frame.current = requestAnimationFrame(avancer);
    };
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(avancer);
  };

  const onKeyUp = (e: React.KeyboardEvent) => {
    if (e.key !== " " && e.key !== "Enter") return;
    if (!debutCharge.current) return;
    const t = Math.min((performance.now() - debutCharge.current) / CHARGE_MS, 1);
    debutCharge.current = 0;
    cancelAnimationFrame(frame.current);
    poserPalet(0);
    setEtat("attente");
    enregistrer(t * MAX);
  };

  /* ── Cadran ──────────────────────────────────────────────────────────── */

  const graduations = Array.from({ length: 11 }, (_, i) => {
    const deg = 180 - i * 18;
    const rad = (deg * Math.PI) / 180;
    const majeure = i % 5 === 0;
    const r1 = majeure ? 86 : 94;
    return {
      i,
      x1: 160 + r1 * Math.cos(rad),
      y1: 160 - r1 * Math.sin(rad),
      x2: 160 + ARC * Math.cos(rad),
      y2: 160 - ARC * Math.sin(rad),
      majeure,
      /* Les chiffres sont à l'EXTÉRIEUR de l'arc : à l'intérieur, l'aiguille
         leur passait dessus dès qu'elle approchait de la graduation. */
      lx: 160 + 133 * Math.cos(rad),
      ly: 160 - 133 * Math.sin(rad),
    };
  });

  return (
    <div className="panel overflow-hidden rounded-lg border border-white/10">
      <div className="px-5 pt-5 sm:px-7 sm:pt-7">
        <div className="flex items-baseline justify-between gap-4">
          <p className="type-label text-white/55">Force mesurée</p>
          <p className="type-data text-[0.875rem] text-white/40">Simulation</p>
        </div>

        <svg
          viewBox="0 0 320 186"
          className="mx-auto mt-2 block w-full max-w-[22rem]"
          aria-hidden="true"
        >
          {/* Arc du cadran */}
          <path
            d="M 56 160 A 104 104 0 0 1 264 160"
            fill="none"
            stroke="hsl(var(--efis) / 0.28)"
            strokeWidth="1.5"
          />
          {graduations.map((g) => (
            <line
              key={g.i}
              x1={g.x1}
              y1={g.y1}
              x2={g.x2}
              y2={g.y2}
              stroke={g.majeure ? "hsl(var(--efis) / 0.75)" : "hsl(var(--efis) / 0.3)"}
              strokeWidth={g.majeure ? 2 : 1}
            />
          ))}
          {graduations
            .filter((g) => g.majeure)
            .map((g) => (
              <text
                key={`l${g.i}`}
                x={g.lx}
                y={g.ly + 5}
                textAnchor="middle"
                className="type-data"
                fill="rgba(255,255,255,0.5)"
                fontSize="13"
                fontWeight="600"
              >
                {g.i * 100}
              </text>
            ))}

          {/* Repère de maximum — l'ambre marque ici une valeur atteinte, sa
              fonction d'origine sur un instrument. */}
          <g
            ref={repere}
            transform={`rotate(${angleOf(0)} 160 160)`}
            style={{ opacity: recordAffiche > 0 ? 1 : 0, transition: "opacity .3s" }}
          >
            <rect x="157.5" y="41" width="5" height="12" rx="1" fill="hsl(var(--caution))" />
          </g>

          {/* Aiguille */}
          <g ref={aiguille} transform={`rotate(${angleOf(0)} 160 160)`}>
            <polygon points="156,160 164,160 161,68 159,68" fill="hsl(var(--efis))" />
          </g>
          <circle cx="160" cy="160" r="8" fill="hsl(var(--panel))" stroke="hsl(var(--efis))" strokeWidth="2" />
        </svg>

        <div className="-mt-2 text-center">
          <p className="type-readout text-white" aria-live="polite">
            <span ref={chiffre}>0</span>
            <span className="ml-1.5 align-baseline text-[0.34em] text-white/45">pts</span>
          </p>
          <p className="type-data mt-2 h-5 text-[0.9375rem] text-[hsl(var(--caution))]">
            {invalide
              ? "Mesure invalide — course trop courte"
              : recordAffiche > 0
                ? `Maximum ${fmt(recordAffiche)}`
                : ""}
          </p>
        </div>
      </div>

      {/* ── Piste de lancement ────────────────────────────────────────────── */}
      <div className="border-t border-white/10 p-5 sm:p-7">
        <div
          ref={piste}
          role="button"
          tabIndex={0}
          aria-label="Piste de lancement. Faites glisser rapidement vers la droite, ou maintenez la barre d'espace puis relâchez, pour envoyer une pichenette."
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          style={{ touchAction: "none" }}
          className="radius-control relative flex h-16 w-full cursor-grab select-none items-center overflow-hidden border border-white/12 bg-white/[0.04] px-2 active:cursor-grabbing"
        >
          <div
            ref={palet}
            className="radius-control pointer-events-none h-11 w-11 shrink-0 bg-[hsl(var(--efis))]"
            style={{
              transition: etat === "charge" ? "none" : "transform .45s cubic-bezier(0.16,1,0.3,1)",
              willChange: "transform",
            }}
          />
          <span className="type-data pointer-events-none ml-4 text-[0.9375rem] text-white/45">
            {joue ? "Recommencez" : "Envoyez une pichenette"}
          </span>
        </div>
        <p className="type-data mt-3 text-[0.9375rem] text-white/40">
          Glissez vite vers la droite. Au clavier : maintenez Espace, relâchez.
        </p>
      </div>
    </div>
  );
}
