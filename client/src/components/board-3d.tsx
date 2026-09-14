import { useEffect, useRef, useState } from "react";

/**
 * Carte électronique filaire, en 3D réelle.
 *
 * POURQUOI PAS THREE.JS. Une bibliothèque 3D pèse ~600 ko pour un décor. Ici
 * la scène tient en quelques dizaines d'arêtes : la rotation et la projection
 * perspective sont écrites à la main, pour environ 3 ko. C'est la même 3D —
 * matrice de rotation, division par la profondeur — sans le poids.
 *
 * POURQUOI UNE CARTE. Le décor du site, ce sont déjà des pistes de circuit
 * imprimé. Les faire passer en volume, avec des composants qui se dressent
 * dessus, prolonge ce vocabulaire au lieu d'ajouter un décor générique. Et
 * c'est le métier de Youri.
 *
 * PERFORMANCE. La scène est rendue une image sur deux (la rotation est lente,
 * personne ne voit la différence), la boucle s'arrête quand l'onglet est caché
 * ou le décor hors écran, et la densité de pixels est plafonnée. En mouvement
 * réduit, une seule image est dessinée puis plus rien ne tourne.
 */

type Vec = [number, number, number];

/** Contour de la carte, dans le plan y = 0. */
const CONTOUR: Vec[] = [
  [-1, 0, -1.35],
  [1, 0, -1.35],
  [1, 0, 1.35],
  [-1, 0, 1.35],
];

/** Routage : des pistes à angles coupés, comme sur une vraie carte. */
const PISTES: Vec[][] = [
  [[-1, 0, -0.9], [0.08, 0, -0.9], [0.34, 0, -0.64], [0.34, 0, -0.12]],
  [[1, 0, 0.2], [0.2, 0, 0.2], [-0.06, 0, 0.46], [-0.62, 0, 0.46]],
  [[-1, 0, 0.92], [-0.3, 0, 0.92], [-0.04, 0, 1.18], [0.7, 0, 1.18]],
  [[-0.72, 0, -1.35], [-0.72, 0, -0.62], [-0.46, 0, -0.36], [-0.46, 0, 0.16]],
  [[0.62, 0, -1.35], [0.62, 0, -1.02], [0.86, 0, -0.78], [0.86, 0, 0.52]],
  [[-1, 0, -0.28], [-0.58, 0, -0.28], [-0.34, 0, -0.04], [-0.34, 0, 0.8]],
];

/** Pastilles de connexion. */
const PASTILLES: Vec[] = [
  [0.34, 0, -0.12], [-0.62, 0, 0.46], [0.7, 0, 1.18],
  [-0.46, 0, 0.16], [0.86, 0, 0.52], [-0.34, 0, 0.8],
];

/** Composants posés sur la carte : [x0, z0, x1, z1, hauteur]. */
const COMPOSANTS: [number, number, number, number, number][] = [
  [-0.56, -0.46, 0.06, 0.06, 0.17],
  [0.44, 0.6, 0.82, 0.96, 0.1],
  [-0.86, 0.6, -0.56, 0.8, 0.07],
  [0.14, -1.16, 0.52, -0.96, 0.13],
  [-0.9, -1.2, -0.78, -0.5, 0.06],
];

/** Distance de la caméra, et focale. Ensemble, elles règlent la fuite. */
const CAMERA = 3.5;
const FOCALE = 1.9;

/** Inclinaison fixe : on regarde la carte de trois quarts, par le dessus. */
const ASSIETTE = -0.62;

/** Rendu effectif. Monté uniquement quand le décor approche de l'écran. */
function Toile({ tone }: { tone: "clair" | "panneau" }) {
  const toile = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = toile.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const teinte = getComputedStyle(document.documentElement)
      .getPropertyValue(tone === "panneau" ? "--efis" : "--primary")
      .trim();

    let l = 0, h = 0, dpr = 1;
    const mesurer = () => {
      const r = cv.getBoundingClientRect();
      // Densité plafonnée : au-delà, on quadruple le coût pour un décor.
      dpr = Math.min(window.devicePixelRatio || 1, 1.4);
      l = Math.max(1, Math.round(r.width));
      h = Math.max(1, Math.round(r.height));
      cv.width = Math.round(l * dpr);
      cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    mesurer();

    let angle = 0.5;
    let visePx = 0, visePy = 0, px = 0, py = 0;
    let frame = 0, alterne = 0, visible = true, actif = true;

    /** Rotation autour de Y puis basculement autour de X. */
    const tourner = ([x, y, z]: Vec, a: number, t: number): Vec => {
      const ca = Math.cos(a), sa = Math.sin(a);
      const x1 = x * ca + z * sa;
      const z1 = -x * sa + z * ca;
      const ct = Math.cos(t), st = Math.sin(t);
      return [x1, y * ct - z1 * st, y * st + z1 * ct];
    };

    const dessiner = () => {
      ctx.clearRect(0, 0, l, h);

      const echelle = Math.min(l, h) * 0.52;
      const cx = l / 2;
      const cy = h / 2;
      const a = angle + px * 0.22;
      const t = ASSIETTE + py * 0.16;

      /** Projection perspective : on divise par la profondeur. */
      const projeter = (p: Vec) => {
        const [x, y, z] = tourner(p, a, t);
        const zc = z + CAMERA;
        const f = (FOCALE / zc) * echelle;
        return { x: cx + x * f, y: cy - y * f, z: zc };
      };

      /* L'opacité décroît avec la profondeur : c'est ce qui donne le volume,
         bien plus que la perspective elle-même. */
      const voile = (z: number, base: number) => {
        const t2 = Math.min(Math.max((z - (CAMERA - 1.5)) / 3, 0), 1);
        return base * (1 - t2 * 0.55);
      };

      const trait = (a1: Vec, b1: Vec, base: number, epaisseur: number) => {
        const p1 = projeter(a1);
        const p2 = projeter(b1);
        ctx.globalAlpha = voile((p1.z + p2.z) / 2, base);
        ctx.lineWidth = epaisseur;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      };

      ctx.strokeStyle = `hsl(${teinte})`;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Contour de la carte
      for (let i = 0; i < CONTOUR.length; i++) {
        trait(CONTOUR[i], CONTOUR[(i + 1) % CONTOUR.length], 0.8, 1.4);
      }

      // Pistes
      for (const piste of PISTES) {
        for (let i = 0; i < piste.length - 1; i++) trait(piste[i], piste[i + 1], 0.52, 1.1);
      }

      // Composants : face supérieure et arêtes verticales
      for (const [x0, z0, x1, z1, ht] of COMPOSANTS) {
        const bas: Vec[] = [[x0, 0, z0], [x1, 0, z0], [x1, 0, z1], [x0, 0, z1]];
        const haut: Vec[] = bas.map(([x, , z]) => [x, ht, z] as Vec);
        for (let i = 0; i < 4; i++) {
          trait(haut[i], haut[(i + 1) % 4], 0.85, 1.3);
          trait(bas[i], haut[i], 0.62, 1.1);
        }
      }

      // Pastilles
      ctx.fillStyle = `hsl(${teinte})`;
      for (const p of PASTILLES) {
        const q = projeter(p);
        ctx.globalAlpha = voile(q.z, 0.9);
        ctx.beginPath();
        ctx.arc(q.x, q.y, Math.max(1.4, (FOCALE / q.z) * echelle * 0.018), 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
    };

    const boucle = () => {
      if (!actif || !visible) { frame = 0; return; }
      alterne = (alterne + 1) % 2;
      /* Une image sur deux. Descendre à une sur trois et baisser la densité de
         pixels a été essayé le 15/09/2026 : aucun gain mesurable (55,5 contre
         55,7), pour un tracé moins net et un mouvement plus saccadé. Le coût
         résiduel n'est pas le dessin, c'est la couche de composition. */
      if (alterne === 0) {
        angle += 0.0034;
        px += (visePx - px) * 0.05;
        py += (visePy - py) * 0.05;
        dessiner();
      }
      frame = requestAnimationFrame(boucle);
    };

    const relancer = () => {
      if (!frame && actif && visible) frame = requestAnimationFrame(boucle);
    };

    dessiner();

    if (!reduit) {
      const obs = new IntersectionObserver(
        ([e]) => { visible = e.isIntersecting; visible ? relancer() : cancelAnimationFrame((frame = 0)); },
        { threshold: 0 },
      );
      obs.observe(cv);

      const onVisibilite = () => {
        actif = !document.hidden;
        actif ? relancer() : cancelAnimationFrame((frame = 0));
      };
      const onPointeur = (e: PointerEvent) => {
        visePx = (e.clientX / window.innerWidth - 0.5) * 2;
        visePy = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      const onTaille = () => { mesurer(); dessiner(); };

      document.addEventListener("visibilitychange", onVisibilite);
      window.addEventListener("pointermove", onPointeur, { passive: true });
      window.addEventListener("resize", onTaille);
      relancer();

      return () => {
        cancelAnimationFrame(frame);
        obs.disconnect();
        document.removeEventListener("visibilitychange", onVisibilite);
        window.removeEventListener("pointermove", onPointeur);
        window.removeEventListener("resize", onTaille);
      };
    }

    const onTaille = () => { mesurer(); dessiner(); };
    window.addEventListener("resize", onTaille);
    return () => window.removeEventListener("resize", onTaille);
  }, [tone]);

  return <canvas ref={toile} className="h-full w-full" />;
}

/**
 * Enveloppe du décor.
 *
 * Le canvas n'est MONTÉ que lorsqu'il approche de l'écran, et démonté sinon.
 *
 * Ce n'est pas la même chose qu'arrêter la boucle de dessin : un canvas existant
 * reste une couche de composition que le navigateur doit déplacer à chaque image
 * de défilement, qu'on y dessine ou non. Mesuré le 15/09/2026 : sept décors
 * simplement PRÉSENTS faisaient tomber l'accueil de 60 à 42 images/s, alors
 * qu'un seul ou deux étaient visibles. En ne montant que ceux qui approchent,
 * il n'existe jamais plus de deux couches à la fois.
 */
export function Board3D({
  tone = "clair",
  className = "",
}: {
  tone?: "clair" | "panneau";
  className?: string;
}) {
  const hote = useRef<HTMLDivElement>(null);
  const [proche, setProche] = useState(false);

  useEffect(() => {
    const el = hote.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setProche(e.isIntersecting), {
      // Marge généreuse : le décor est prêt avant d'entrer dans le cadre.
      rootMargin: "400px 0px",
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={hote} aria-hidden="true" className={className}>
      {proche && <Toile tone={tone} />}
    </div>
  );
}
