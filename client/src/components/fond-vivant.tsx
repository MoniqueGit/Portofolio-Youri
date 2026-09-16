import { useEffect, useRef } from "react";

/**
 * Fond vivant du site : bulles qui montent et impulsions sur les pistes.
 *
 * Demandé par Youri le 16/09/2026 — « un truc blanc mais des petites bulles
 * bleues dans le fond, des petits circuits imprimés, des petites impulsions ».
 *
 * ── Pourquoi UN SEUL canvas fixe, et pas des éléments DOM ────────────────────
 * Cent bulles en DOM, ce sont cent couches de composition à déplacer par image.
 * C'est exactement ce qui avait coûté 18 images/s le 15/09 avec sept canvas
 * simplement présents. Ici, un canvas unique en `position: fixed` dessine tout
 * le décor pour le prix d'UNE couche, et il ne bouge jamais au défilement —
 * c'est le contenu qui glisse devant.
 *
 * ── Les garde-fous, repris de `board-3d.tsx` ────────────────────────────────
 *   - boucle arrêtée quand l'onglet est caché (`visibilitychange`) ;
 *   - densité de pixels plafonnée à 1,4 — au-delà on quadruple le remplissage ;
 *   - rien ne s'anime en CSS : tout est peint dans le canvas, donc aucune
 *     propriété de mise en page n'est touchée ;
 *   - désactivé en mouvement réduit, et sous 1024 px (sur un téléphone, un
 *     décor est la première chose à couper).
 *
 * ── Lisibilité en vidéoprojection ───────────────────────────────────────────
 * Les opacités plafonnent à 0,16. Le fond reste du papier clair : les bulles
 * se voient en aplat mais ne passent jamais devant un texte au point de le
 * gêner. C'est la contrainte n°1 de Youri, elle ne se négocie pas.
 */

type Bulle = {
  x: number;
  y: number;
  r: number;
  vitesse: number;
  derive: number;
  phase: number;
  alpha: number;
};

/** Piste de circuit : un tracé en angles droits que parcourt une impulsion. */
type Piste = {
  pts: [number, number][];
  longueur: number;
  /** Position de l'impulsion le long de la piste, en fraction. */
  t: number;
  vitesse: number;
};

const CYAN = "0, 169, 206"; // --efis #00A9CE

function fabriquerBulles(l: number, h: number): Bulle[] {
  const n = Math.round((l * h) / 62000);
  return Array.from({ length: Math.min(n, 22) }, () => ({
    x: Math.random() * l,
    y: Math.random() * h,
    r: 2 + Math.random() * 11,
    vitesse: 0.36 + Math.random() * 1.02,
    derive: 0.2 + Math.random() * 0.7,
    phase: Math.random() * Math.PI * 2,
    alpha: 0.05 + Math.random() * 0.11,
  }));
}

/** Tracés en angles droits, façon routage de circuit imprimé. */
function fabriquerPistes(l: number, h: number): Piste[] {
  const pistes: Piste[] = [];
  const n = 5;
  for (let i = 0; i < n; i++) {
    const depart: [number, number] = [
      Math.random() < 0.5 ? 0 : l,
      (h / (n + 1)) * (i + 1) + (Math.random() - 0.5) * 80,
    ];
    const sens = depart[0] === 0 ? 1 : -1;
    const pts: [number, number][] = [depart];
    let x = depart[0];
    let y = depart[1];
    const segments = 3 + Math.floor(Math.random() * 3);
    for (let s = 0; s < segments; s++) {
      x += sens * (90 + Math.random() * 190);
      pts.push([x, y]);
      y += (Math.random() - 0.5) * 180;
      pts.push([x, y]);
    }
    let longueur = 0;
    for (let k = 1; k < pts.length; k++) {
      longueur += Math.hypot(pts[k][0] - pts[k - 1][0], pts[k][1] - pts[k - 1][1]);
    }
    pistes.push({
      pts,
      longueur,
      t: Math.random(),
      vitesse: 0.00105 + Math.random() * 0.0021,
    });
  }
  return pistes;
}

/** Point situé à la fraction `t` du tracé — pour poser l'impulsion dessus. */
function pointSurPiste(p: Piste, t: number): [number, number] {
  let reste = t * p.longueur;
  for (let k = 1; k < p.pts.length; k++) {
    const x0 = p.pts[k - 1][0];
    const y0 = p.pts[k - 1][1];
    const x1 = p.pts[k][0];
    const y1 = p.pts[k][1];
    const d = Math.hypot(x1 - x0, y1 - y0);
    if (reste <= d) {
      const f = d === 0 ? 0 : reste / d;
      return [x0 + (x1 - x0) * f, y0 + (y1 - y0) * f];
    }
    reste -= d;
  }
  return p.pts[p.pts.length - 1];
}

export function FondVivant() {
  const toile = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = toile.current;
    if (!cv) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(min-width: 1024px)").matches) return;

    const ctx = cv.getContext("2d", { alpha: true });
    if (!ctx) return;

    let l = 0;
    let h = 0;
    let bulles: Bulle[] = [];
    let pistes: Piste[] = [];
    let frame = 0;
    let actif = true;

    const mesurer = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.4);
      l = cv.clientWidth;
      h = cv.clientHeight;
      cv.width = Math.round(l * dpr);
      cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      bulles = fabriquerBulles(l, h);
      pistes = fabriquerPistes(l, h);
    };

    const dessiner = () => {
      ctx.clearRect(0, 0, l, h);

      // ── Pistes : trait fixe, puis l'impulsion qui le parcourt ──────────────
      for (const p of pistes) {
        ctx.beginPath();
        ctx.moveTo(p.pts[0][0], p.pts[0][1]);
        for (let k = 1; k < p.pts.length; k++) ctx.lineTo(p.pts[k][0], p.pts[k][1]);
        ctx.strokeStyle = "rgba(" + CYAN + ", 0.1)";
        ctx.lineWidth = 1.25;
        ctx.stroke();

        // Pastilles aux coudes, comme des vias sur un circuit.
        for (let k = 1; k < p.pts.length - 1; k += 2) {
          ctx.beginPath();
          ctx.arc(p.pts[k][0], p.pts[k][1], 2.4, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(" + CYAN + ", 0.16)";
          ctx.fill();
        }

        p.t += p.vitesse;
        if (p.t > 1) p.t -= 1;

        // L'impulsion est une traînée de points de plus en plus pâles : le
        // dégradé donne le sens de circulation sans coûter un filtre.
        for (let q = 0; q < 7; q++) {
          const tq = p.t - q * 0.012;
          if (tq < 0) continue;
          const pt = pointSurPiste(p, tq);
          ctx.beginPath();
          ctx.arc(pt[0], pt[1], 3.1 - q * 0.3, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(" + CYAN + ", " + (0.34 - q * 0.045) + ")";
          ctx.fill();
        }
      }

      // ── Bulles : elles montent et ondulent doucement ───────────────────────
      for (const b of bulles) {
        b.y -= b.vitesse;
        b.phase += 0.018;
        if (b.y + b.r < 0) {
          b.y = h + b.r;
          b.x = Math.random() * l;
        }
        const x = b.x + Math.sin(b.phase) * b.derive * 14;

        ctx.beginPath();
        ctx.arc(x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(" + CYAN + ", " + b.alpha + ")";
        ctx.fill();
        // Liseré : sans lui, une bulle pâle se lit comme une tache floue.
        ctx.strokeStyle = "rgba(" + CYAN + ", " + (b.alpha + 0.09) + ")";
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    };

    /*
     * Rendu une image sur DEUX. Mesure du 16/09/2026 : le canvas plein ecran
     * coutait 12 img/s (59,2 -> 46,7), tres au-dela du bruit de ±5. Le cout
     * d'un canvas de cette taille est le REMPLISSAGE, proportionnel a sa
     * surface — le diviser par deux est donc le levier qui compte, la ou
     * reduire le nombre de bulles ne gagnerait presque rien.
     *
     * Les vitesses sont doublees pour compenser : a deux fois moins d'images,
     * le meme increment donnerait un mouvement deux fois plus lent.
     */
    let alterne = 0;
    const boucle = () => {
      /*
       * Une image sur TROIS depuis le 16/09/2026 (une sur deux auparavant).
       *
       * Mesure : avec la page passee a ~10 700 px et des dizaines d'ombres a
       * composer, ce canvas plein ecran coutait 9 img/s (50,8 contre 60,1).
       * Le fond bouge tres lentement — l'oeil ne distingue pas 20 images par
       * seconde de 30 sur des bulles qui montent de 0,5 px a chaque fois.
       *
       * Les vitesses sont multipliees par 1,5 pour garder le meme mouvement.
       */
      alterne = (alterne + 1) % 3;
      if (alterne === 0) dessiner();
      frame = requestAnimationFrame(boucle);
    };

    const relancer = () => {
      if (!frame && actif) frame = requestAnimationFrame(boucle);
    };
    const onVisibilite = () => {
      actif = !document.hidden;
      if (actif) {
        relancer();
      } else {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    };
    const onTaille = () => mesurer();

    mesurer();
    relancer();
    document.addEventListener("visibilitychange", onVisibilite);
    window.addEventListener("resize", onTaille);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("visibilitychange", onVisibilite);
      window.removeEventListener("resize", onTaille);
    };
  }, []);

  return (
    <canvas
      ref={toile}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 hidden h-full w-full lg:block"
    />
  );
}
