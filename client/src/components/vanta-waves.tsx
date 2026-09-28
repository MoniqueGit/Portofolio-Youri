import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Fond animé Vanta WAVES — un ESSAI, éteint par défaut.
 *
 * Demandé par Youri le 28/09/2026 après avoir vu vantajs.com. Il est monté
 * derrière un INTERRUPTEUR (`?vanta=1` dans l'URL) et pas dans la page par
 * défaut, pour trois raisons qu'il faut connaître avant de le rendre permanent.
 *
 * ── 1. Le poids ─────────────────────────────────────────────────────────────
 * Vanta WAVES a besoin de Three.js. Le site n'en avait pas : sa 3D est écrite à
 * la main, 3 ko. Three.js r134 pèse à lui seul plus que TOUT le bundle actuel.
 * D'où l'`import()` dynamique ci-dessous : tant que le drapeau est absent, rien
 * n'est téléchargé, et le site reste exactement au poids qu'il a aujourd'hui.
 * C'est ce qui rend l'essai réversible — et c'est aussi ce qui le rend honnête,
 * puisque les chiffres se mesurent au lieu de se supposer.
 *
 * ── 2. Le fond ──────────────────────────────────────────────────────────────
 * WAVES est un plan ondulant ÉCLAIRÉ : il ne fonctionne que sur un fond sombre.
 * Le site est clair partout sauf `/collins`, et c'est la contrainte n°1 de
 * Youri — la page doit se lire en vidéoprojection, au fond d'une salle.
 *
 * ── 3. La vitesse ───────────────────────────────────────────────────────────
 * Le plan recalcule ses sommets À CHAQUE IMAGE, en plein écran. Le site a déjà
 * payé cher pour apprendre qu'un simple canvas PRÉSENT coûte des images par
 * seconde ; celui-ci dessine vraiment.
 *
 * Mouvement réduit : rien ne démarre du tout. Une houle continue est exactement
 * ce que ce réglage système demande d'éviter.
 */
export function VantaWaves({ actif }: { actif: boolean }) {
  const hote = useRef<HTMLDivElement>(null);
  const reduit = useReducedMotion();

  useEffect(() => {
    if (!actif || reduit || !hote.current) return;

    let effet: { destroy: () => void } | null = null;
    let annule = false;

    (async () => {
      /* Chargés à la demande : Vite en fait un morceau séparé, qui n'est
         téléchargé que si ce composant est réellement activé. */
      const THREE = await import("three");
      const { default: WAVES } = await import("vanta/dist/vanta.waves.min.js");
      if (annule || !hote.current) return;

      effet = WAVES({
        el: hote.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 1,
        scaleMobile: 1,
        /* Le bleu de nuit du réglage que Youri a envoyé. Le cyan EFIS du site
           sert de couleur de reflet : si l'essai est retenu, c'est le seul
           point qui rattache le fond à la DA. */
        color: 0x071c2f,
        shininess: 30,
        waveHeight: 15,
        waveSpeed: 1,
        zoom: 1,
      });
    })();

    return () => {
      annule = true;
      effet?.destroy();
    };
  }, [actif, reduit]);

  if (!actif) return null;

  return <div ref={hote} className="absolute inset-0 z-0" aria-hidden="true" />;
}

/** Lit `?vanta=1`. Hors essai, la fonction renvoie `false` et rien ne se charge. */
export function vantaDemande() {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).has("vanta");
}
