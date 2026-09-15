import { useEffect, useRef } from "react";

/**
 * Réticule de visée et aimantation des commandes.
 *
 * POURQUOI UN RÉTICULE. Le brief demandait un « curseur personnalisé avec
 * mix-blend-mode ». Une pastille floue serait le curseur de n'importe quel
 * site de studio ; sur une planche de bord, le pointeur est un RÉTICULE —
 * un cercle et un point de visée. Même effet de premium, mais qui appartient
 * au vocabulaire du site.
 *
 * POURQUOI `mix-blend-mode: difference`. Ce n'est pas un effet gratuit : le
 * site a une page claire et une page sombre. En différence, le même réticule
 * blanc s'inverse tout seul et reste lisible sur les deux. Une couleur fixe
 * aurait disparu sur l'une des deux.
 *
 * PERFORMANCE. Une seule `transform` écrite au `ref`, et surtout : la boucle
 * S'ARRÊTE dès que le réticule a rejoint le pointeur. Un lissage qui tourne en
 * permanence, c'est l'erreur du `useSpring` corrigée précédemment.
 */

const INTERACTIF = 'a, button, [role="button"], input, textarea, select, summary, label';

/** Le lissage : plus la valeur est basse, plus le réticule traîne. */
const SUIVI = 0.24;

export function Reticule() {
  const hote = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = hote.current;
    if (!el) return;

    // Pas de réticule au doigt (il n'y a pas de survol) ni en mouvement réduit.
    const fin = window.matchMedia("(pointer: fine)");
    const reduit = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fin.matches || reduit.matches) return;

    document.documentElement.classList.add("reticule-actif");

    let x = 0, y = 0, cx = 0, cy = 0, frame = 0, place = false;

    const boucle = () => {
      const dx = x - cx;
      const dy = y - cy;
      cx += dx * SUIVI;
      cy += dy * SUIVI;
      el.style.transform = `translate3d(${cx.toFixed(1)}px, ${cy.toFixed(1)}px, 0) translate(-50%, -50%)`;
      // On rend la main dès que le réticule a rattrapé le pointeur.
      frame = Math.abs(dx) > 0.3 || Math.abs(dy) > 0.3 ? requestAnimationFrame(boucle) : 0;
    };

    const relancer = () => {
      if (!frame) frame = requestAnimationFrame(boucle);
    };

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!place) {
        // Première apparition : on se pose sans traîner depuis le coin.
        cx = x;
        cy = y;
        place = true;
        el.dataset.vu = "1";
      }
      relancer();
    };

    const onOver = (e: PointerEvent) => {
      if ((e.target as Element)?.closest?.(INTERACTIF)) el.dataset.vise = "1";
    };
    const onOut = (e: PointerEvent) => {
      if ((e.target as Element)?.closest?.(INTERACTIF)) delete el.dataset.vise;
    };
    const onQuitte = () => delete el.dataset.vu;
    const onRevient = () => { if (place) el.dataset.vu = "1"; };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerout", onOut, { passive: true });
    document.addEventListener("pointerdown", () => (el.dataset.presse = "1"), { passive: true });
    document.addEventListener("pointerup", () => delete el.dataset.presse, { passive: true });
    document.documentElement.addEventListener("pointerleave", onQuitte);
    document.documentElement.addEventListener("pointerenter", onRevient);

    return () => {
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove("reticule-actif");
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      document.documentElement.removeEventListener("pointerleave", onQuitte);
      document.documentElement.removeEventListener("pointerenter", onRevient);
    };
  }, []);

  return (
    <div ref={hote} className="reticule" aria-hidden="true">
      <span className="reticule-anneau" />
      <span className="reticule-point" />
    </div>
  );
}

/**
 * Aimantation : la commande vient au-devant du pointeur quand il l'approche.
 *
 * Le rectangle de l'élément est mesuré UNE FOIS à l'entrée du pointeur, pas à
 * chaque mouvement : un `getBoundingClientRect()` par image force le navigateur
 * à recalculer la mise en page, ce qui est exactement ce qu'on cherche à éviter.
 */
export function useAimant<T extends HTMLElement>(force = 0.25, course = 14) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let boite: DOMRect | null = null;
    let tx = 0, ty = 0, cx = 0, cy = 0, frame = 0;

    const boucle = () => {
      const dx = tx - cx;
      const dy = ty - cy;
      cx += dx * 0.2;
      cy += dy * 0.2;
      el.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`;
      frame = Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1 ? requestAnimationFrame(boucle) : 0;
    };
    const relancer = () => {
      if (!frame) frame = requestAnimationFrame(boucle);
    };

    const onEnter = () => { boite = el.getBoundingClientRect(); };
    /* La course est BORNÉE. Sans butée, un bouton large se décale de 40 px au
       survol de son bord : il fuit le pointeur au lieu de venir à lui. */
    const borne = (v: number) => Math.max(-course, Math.min(course, v));

    const onMove = (e: PointerEvent) => {
      if (!boite) boite = el.getBoundingClientRect();
      tx = borne((e.clientX - (boite.left + boite.width / 2)) * force);
      ty = borne((e.clientY - (boite.top + boite.height / 2)) * force);
      relancer();
    };
    const onLeave = () => {
      boite = null;
      tx = 0;
      ty = 0;
      relancer();
    };

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [force, course]);

  return ref;
}

/**
 * Halo qui suit le pointeur à l'intérieur d'une carte.
 *
 * Demandé le 15/09/2026. Implémenté en `transform` sur un calque enfant, et
 * NON en déplaçant un `background-position` ou en réécrivant un dégradé : une
 * position de fond se repeint à chaque image sur le fil principal, alors qu'une
 * translation est prise en charge par le compositeur.
 *
 * Pas de boucle d'animation non plus — `pointermove` ne déclenche au plus qu'un
 * événement par image, et on n'y fait qu'une seule écriture.
 */
export function useHalo<T extends HTMLElement>() {
  const hote = useRef<T>(null);
  const halo = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = hote.current;
    const h = halo.current;
    if (!el || !h) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Rectangle mesuré à l'entrée, pas à chaque mouvement : un
    // `getBoundingClientRect()` par image force un recalcul de mise en page.
    let boite: DOMRect | null = null;

    const onEnter = () => { boite = el.getBoundingClientRect(); };
    const onMove = (e: PointerEvent) => {
      if (!boite) boite = el.getBoundingClientRect();
      h.style.transform = `translate3d(${Math.round(e.clientX - boite.left)}px, ${Math.round(e.clientY - boite.top)}px, 0)`;
    };
    const onLeave = () => { boite = null; };

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return { hote, halo };
}
