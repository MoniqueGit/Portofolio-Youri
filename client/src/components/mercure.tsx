import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Fond « mercure liquide » — nappe métallique qui coule lentement.
 *
 * Demandé par Youri le 28/09/2026 d'après une référence 21st.dev, en
 * remplacement de l'essai Vanta WAVES abandonné le même jour. Sa consigne :
 * garder la DA et les animations du site, changer seulement le fond.
 *
 * ── Pourquoi PAS de bibliothèque ────────────────────────────────────────────
 * La référence passe par Three.js ou OGL. Un effet de mercure est pourtant un
 * simple FRAGMENT SHADER sur un rectangle plein écran : il n'y a ni géométrie,
 * ni caméra, ni scène à gérer. Tout ce qu'une bibliothèque apporterait ici,
 * c'est son propre poids. Le shader ci-dessous fait ~2 ko, contre 613 ko pour
 * Three.js — mesuré le 28/09/2026 pendant l'essai Vanta. C'est la même raison
 * qui avait fait écrire `board-3d.tsx` à la main.
 *
 * ── Pourquoi un mercure CLAIR ───────────────────────────────────────────────
 * La référence est sombre. Le site est clair, et ce n'est pas un goût : la page
 * doit se lire en vidéoprojection, au fond d'une salle. Vanta l'a prouvé par
 * l'absurde le 28/09 — « Youri Figuié » y tombait à 1,18:1 de contraste, pour
 * un plancher de 7:1.
 *
 * Le mercure est donc rendu dans une bande de luminance ÉTROITE autour du
 * papier du site : de l'argent pâle veiné de cyan EFIS, jamais de noir. Un
 * vrai mercure est d'ailleurs argenté, pas noir — la référence sombre était
 * une mise en scène, pas le métal.
 *
 * ── Comment la nappe est faite ──────────────────────────────────────────────
 * Le domaine des coordonnées est replié sur lui-même par une série de sinus de
 * fréquences croissantes (`domain warping`). Chaque tour tord le plan un peu
 * plus fin que le précédent, ce qui donne ces coulées qui s'étirent sans jamais
 * se répéter. La couleur finale lit l'inclinaison locale de la nappe : là où
 * elle est pentue, le métal capte la lumière et s'éclaircit — c'est ce qui
 * fait lire du VOLUME sur une surface plate.
 *
 * ── Les garde-fous, repris de `board-3d.tsx` ────────────────────────────────
 * Ils ne sont pas optionnels : le site a mesuré qu'un canvas simplement PRÉSENT
 * coûtait 18 images/s.
 *   - le canvas n'est MONTÉ qu'à l'approche de l'écran, et démonté ensuite ;
 *   - la boucle s'arrête quand l'onglet est caché ou le décor hors champ ;
 *   - densité de pixels plafonnée à 1,4 ;
 *   - mouvement réduit : une image fixe est rendue, puis plus rien ne tourne.
 */

const VERTEX = `
attribute vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

/*
 * `lowp` ne suffit pas : les dégradés du métal se rendraient en bandes
 * franches sur les puces mobiles. `mediump` est le bon compromis ici.
 */
const FRAGMENT = `
precision mediump float;

uniform vec2  uTaille;
uniform float uTemps;
uniform vec2  uSouris;
uniform vec4  uTexte;   /* zone occupée par le texte, en 0..1 : x0,y0,x1,y1 */

/* Repli du domaine : chaque tour tord le plan à une fréquence plus fine.
   Six tours suffisent — au-delà, le grain passe sous le pixel et on paie des
   calculs qui ne se voient pas.

   ⚠ Une seule évaluation par pixel. La première version en faisait TROIS pour
   calculer la pente par différences finies : trois fois le coût du shader
   pour une information que le déplacement porte déjà. */
vec2 nappe(vec2 p, float t) {
  for (float i = 1.0; i < 7.0; i++) {
    p.x += 0.34 / i * cos(i * 2.3 * p.y + t * 0.33 + uSouris.x * 2.0);
    p.y += 0.34 / i * cos(i * 1.9 * p.x + t * 0.27 + uSouris.y * 2.0);
  }
  return p;
}

/*
 * ── Les gouttes qui fusionnent ────────────────────────────────────────────
 * Demande de Youri du 28/09/2026 : les gouttes de chrome de la référence.
 *
 * Ce sont des METABALLS. Chaque goutte émet un champ qui décroît comme
 * l'inverse du carré de la distance ; on additionne les champs et on prend
 * la surface où la somme franchit un seuil. Quand deux gouttes approchent,
 * leurs champs s'additionnent AVANT le seuil : la surface se referme sur
 * les deux d'un seul tenant. La fusion n'est donc pas un effet qu'on
 * programme, c'est une conséquence de l'addition — d'où son naturel.
 *
 * Six gouttes. La boucle est bornée par une constante parce que GLSL ES 1.0
 * exige un nombre de tours connu à la compilation ; et six suffisent pour
 * que des paires se rencontrent sans que le champ devienne une bouillie.
 *
 * Les positions sont calculées ICI, à partir du temps, plutôt que passées en
 * uniformes : deux sinus par goutte coûtent moins qu'un tableau à téléverser
 * à chaque image, et rien n'a à être tenu à jour côté JavaScript.
 */
float gouttes(vec2 p, float t) {
  float champ = 0.0;
  for (int i = 0; i < 6; i++) {
    float f = float(i);
    /* Dérives volontairement non harmoniques (0,17 / 0,23 …) : avec des
       vitesses en rapport simple, les gouttes se recroiseraient toujours au
       même endroit et le motif se mettrait à battre. */
    /*
     * Les gouttes vivent dans les DEUX BANDES LIBRES du hero — au-dessus du
     * contenu et en dessous — et traversent toute la largeur.
     *
     * Première version : elles dérivaient au centre, donc les trois quarts
     * passaient derrière le portrait, qui est opaque. On ne voyait presque
     * rien. Le décor de ce site occupe les gouttières libres ; les gouttes ne
     * font pas exception. La garde du bloc de texte les efface de toute façon
     * à gauche, mais mieux vaut ne pas les y envoyer.
     */
    float bande = mix(-0.80, 0.60, step(0.5, mod(f, 2.0)));
    vec2 c = vec2(
      sin(t * (0.17 + f * 0.031) + f * 2.4) * 1.45,
      bande + cos(t * (0.23 - f * 0.024) + f * 1.7) * 0.13
    );
    /* La souris pousse les gouttes au lieu de les attirer : une goutte de
       métal qui fuit le doigt se lit comme de la matière, une qui le suit
       se lit comme un curseur. */
    c += uSouris * 0.35;
    /*
     * ⚠ Le rayon décide de TOUT, et 0,20 était une erreur : avec six gouttes,
     * le champ dépassait le seuil sur la quasi-totalité de l'écran et les
     * gouttes fusionnaient en une seule nappe blanche couvrant le hero. Le
     * champ décroît en 1/d², donc doubler le rayon quadruple la portée — il
     * faut rester bien en dessous de la distance qui sépare deux gouttes,
     * sinon elles sont TOUJOURS fusionnées et on ne voit plus la fusion.
     */
    float r = 0.145 + 0.04 * sin(f * 1.9);
    vec2 d = p - c;
    champ += (r * r) / (dot(d, d) + 0.0012);
  }
  return champ;
}

void main() {
  vec2 uv01 = gl_FragCoord.xy / uTaille;
  /* Coordonnées centrées et isotropes : la nappe ne doit pas s'étirer avec le
     format de la fenêtre. */
  vec2 uv = (2.0 * gl_FragCoord.xy - uTaille) / min(uTaille.x, uTaille.y);

  vec2 n = nappe(uv, uTemps);

  /* De combien le point a été emporté : là où la nappe s'étire, le métal est
     pentu et capte la lumière. Gratuit, puisque n est déjà calculé.
     (Pas d'accent grave dans ce commentaire : il est DANS un template
     literal JavaScript, et le moindre backtick le refermerait.) */
  float flux = clamp(length(n - uv) * 1.15, 0.0, 1.0);

  /* Veinage. Ramené en 0..1 au lieu du 1/|sin| de la référence, qui part en
     blanc pur : invisible sur fond noir, criard sur du papier. */
  float veine = 0.5 + 0.5 * sin(n.x + n.y - uTemps * 0.2);

  float metal = mix(veine, flux, 0.5);

  /* Le reflet : une arête FINE et vive, pas un dégradé mou. C'est la finesse
     du liseré qui fait lire « chrome » plutôt que « nuage gris ». */
  float arete = pow(smoothstep(0.55, 1.0, metal), 3.0);

  /* Le métal va du plomb au reflet blanc. Cette amplitude n'est possible QUE
     parce que la zone de texte est épargnée plus bas : sans elle, le sous-titre
     gris tomberait à 5:1. C'est la protection qui achète le contraste du
     métal, pas l'inverse. */
  vec3 creux = vec3(0.569, 0.627, 0.671);   /* plomb */
  vec3 corps = vec3(0.855, 0.890, 0.910);   /* argent */
  vec3 couleur = mix(creux, corps, smoothstep(0.0, 0.72, metal));
  couleur = mix(couleur, vec3(1.0), arete);

  /* Un souffle de cyan EFIS dans les creux : c'est ce qui rattache le métal à
     la DA au lieu d'un gris interchangeable. Très faible — le cyan n'a que
     2,9:1 sur fond clair, il ne porte jamais d'information. */
  couleur = mix(couleur, vec3(0.796, 0.902, 0.937), (1.0 - metal) * 0.3);

  /*
   * ── Les gouttes, posées SUR la nappe ──────────────────────────────────────
   * Elles ne sont pas un calque de plus : même canvas, même shader, même
   * passe. Le hero anime déjà la nappe, deux cartes 3D et les lettres du nom ;
   * une couche supplémentaire aurait été un cinquième mouvement dans la même
   * vue, et un canvas de plus coûte des images par seconde même quand il ne
   * dessine pas — les deux erreurs déjà payées par ce site.
   */
  float champ = gouttes(uv, uTemps);

  /*
   * Le bord et la normale viennent des DÉRIVÉES à l'écran du champ. Elles
   * donnent un liseré d'épaisseur constante en pixels et une normale gratuite.
   *
   * ⚠ fwidth / dFdx ne font PAS partie du socle WebGL 1 : ce sont
   * OES_standard_derivatives, que le composant demande au contexte. Quand
   * l'extension manque, la branche de repli échantillonne le champ deux fois
   * plus loin — deux appels de plus, mais seulement sur les machines qui en
   * ont besoin, et le rendu reste correct au lieu de refuser de compiler.
   */
#ifdef DERIVEES
  float bord = fwidth(champ) * 1.6;
  vec2 grad = vec2(dFdx(champ), dFdy(champ));
#else
  float e = 1.6 / min(uTaille.x, uTaille.y);
  float cx = gouttes(uv + vec2(e, 0.0), uTemps);
  float cy = gouttes(uv + vec2(0.0, e), uTemps);
  vec2 grad = vec2(cx - champ, cy - champ);
  float bord = (abs(grad.x) + abs(grad.y)) * 1.6;
#endif
  /* Plancher sur la largeur du bord : smoothstep avec ses deux bornes
     égales n'est pas défini, et le champ est parfaitement plat au centre
     d'une grosse goutte. */
  bord = max(bord, 0.004);
  float dedans = smoothstep(1.0 - bord, 1.0 + bord, champ);

  /* Le gradient du champ pointe vers l'extérieur de la goutte : il sert de
     normale, et sa composante verticale donne le « haut/bas » du volume. */
  float pente = clamp(length(grad) * 0.1, 0.0, 1.0);
  vec2 nrm = normalize(grad + vec2(0.0001));

  /* Sombre en haut, clair en bas : la signature d'une sphère polie, qui
     renvoie le ciel par le haut et le sol par le bas. Même raisonnement que
     les billes de fond-vivant.tsx. */
  /*
   * L'écart du haut au bas est FRANC — 0,44 contre 0,99. C'est cet écart, et
   * lui seul, qui fait lire « chrome » plutôt que « rond gris » : une bille
   * pâle sur fond pâle n'a pas de matière. On peut se le permettre ici parce
   * que les gouttes vivent dans les bandes libres et que la garde les efface
   * dès qu'elles approchent du texte — c'est la protection qui achète le
   * contraste, exactement comme pour la nappe.
   */
  float haut = 0.5 - 0.5 * nrm.y;
  vec3 chrome = mix(vec3(0.988, 0.996, 1.0), vec3(0.435, 0.498, 0.553), haut);

  /* Le reflet serré, et le liseré de bord qui signe le métal poli. */
  chrome += pow(smoothstep(0.35, 1.0, 1.0 - haut), 5.0) * 0.5;
  chrome = mix(chrome, vec3(1.0), pente * 0.55);

  couleur = mix(couleur, clamp(chrome, 0.0, 1.0), dedans);

  /*
   * ── La zone de texte est ÉPARGNÉE, par géométrie ──────────────────────────
   * Le métal visible descend jusqu'à 0,70 de luminance. Sous le sous-titre en
   * gris, ça tomberait à 5:1 — le plancher du site est 7:1, et la page doit
   * se lire en vidéoprojection.
   *
   * Le rectangle est MESURÉ sur le vrai bloc de texte et passé en uniforme :
   * pas une zone devinée qui se décale au premier changement de maquette.
   * La marge de 0,10 fond le bord au lieu de le couper net.
   *
   * C'est fait ICI et pas avec un masque CSS : un masque sur une couche dont
   * les pixels changent à chaque image se recompose à chaque image — c'est ce
   * qui avait coûté 33 images/s au site le 14/09. Une multiplication dans le
   * shader est gratuite.
   */
  vec2 d = max(uTexte.xy - uv01, uv01 - uTexte.zw);
  float dehors = length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);

  /*
   * ⚠ La RAMPE est longue (0,34), et ce n'est pas un réglage cosmétique.
   * À 0,10, le rectangle épargné se voyait : une plaque pâle à bords nets
   * flottait sur le métal, et ça se lisait comme un bug, pas comme un décor.
   * Étalé sur un tiers de la largeur, le même dégradé devient une
   * composition — le métal fleurit dans les marges et s'efface là où le
   * contenu vit. C'est la règle que le site applique déjà à sa carte 3D :
   * le décor occupe la gouttière libre, il ne passe pas sous le texte.
   */
  float garde = smoothstep(0.0, 0.34, dehors);

  /* La barre de navigation est du texte, elle aussi, et elle n'a pas de fond
     opaque en haut de page. Palier franc puis rampe : sans le palier, le
     dégradé commençait dès le premier pixel et « Profil / Collins / Parcours »
     se retrouvait sur du métal. */
  garde *= smoothstep(0.055, 0.21, 1.0 - uv01.y);

  vec3 papier = vec3(0.953, 0.961, 0.965);
  couleur = mix(papier, couleur, garde);

  gl_FragColor = vec4(couleur, 1.0);
}
`;

function compiler(gl: WebGLRenderingContext, type: number, source: string) {
  const s = gl.createShader(type);
  if (!s) return null;
  gl.shaderSource(s, source);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    gl.deleteShader(s);
    return null;
  }
  return s;
}

export function Mercure({
  className = "",
  /** Sélecteur du bloc de texte à épargner. Absent ⇒ la nappe couvre tout. */
  epargne,
}: {
  className?: string;
  epargne?: string;
}) {
  const enveloppe = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [proche, setProche] = useState(false);
  const reduit = useReducedMotion();

  /* Montage à la demande. Un canvas qui existe est une couche que le
     navigateur déplace à chaque image de défilement, qu'il dessine ou non :
     sept d'entre eux avaient coûté 18 images/s au site. */
  useEffect(() => {
    const cible = enveloppe.current;
    if (!cible) return;
    const obs = new IntersectionObserver(
      ([e]) => setProche(e.isIntersecting),
      { rootMargin: "400px" },
    );
    obs.observe(cible);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!proche || !canvas.current) return;
    const cnv = canvas.current;
    const gl = cnv.getContext("webgl", { antialias: false, alpha: false, depth: false });
    /* Sans WebGL, on ne rend rien : le fond papier du site reste, et la page
       est complète sans le décor. Un fond est toujours un supplément. */
    if (!gl) return;

    /*
     * Les dérivées à l'écran (`fwidth`, `dFdx`) sont une EXTENSION en WebGL 1.
     * On la demande ; si le pilote la refuse, le shader est compilé sans le
     * `#define` et prend sa branche de repli. La directive `#extension` doit
     * précéder tout autre jeton, d'où le préfixe plutôt qu'une insertion.
     */
    const derivees = gl.getExtension("OES_standard_derivatives");
    const entete = derivees
      ? "#extension GL_OES_standard_derivatives : enable\n#define DERIVEES 1\n"
      : "";

    const vs = compiler(gl, gl.VERTEX_SHADER, VERTEX);
    const fs = compiler(gl, gl.FRAGMENT_SHADER, entete + FRAGMENT);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    /* Deux triangles couvrant l'écran. C'est toute la « géométrie » de la
       scène : le reste se passe dans le shader. */
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "position");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uTaille = gl.getUniformLocation(prog, "uTaille");
    const uTemps = gl.getUniformLocation(prog, "uTemps");
    const uSouris = gl.getUniformLocation(prog, "uSouris");
    const uTexte = gl.getUniformLocation(prog, "uTexte");

    const souris = { x: 0, y: 0, cx: 0, cy: 0 };

    /*
     * Le rectangle à épargner, mesuré sur le DOM et normalisé en 0..1 dans le
     * repère du canvas. L'axe Y est retourné : `gl_FragCoord` compte depuis le
     * BAS, le DOM depuis le haut.
     *
     * Recalculé au redimensionnement seulement — jamais par image. Le bloc de
     * texte ne bouge pas pendant qu'on regarde la page.
     */
    function mesurerTexte() {
      if (!epargne) {
        gl!.uniform4f(uTexte, 2, 2, 2, 2); /* hors champ ⇒ rien n'est épargné */
        return;
      }
      const bloc = document.querySelector(epargne);
      const base = cnv.getBoundingClientRect();
      if (!bloc || base.width === 0 || base.height === 0) {
        gl!.uniform4f(uTexte, 2, 2, 2, 2);
        return;
      }
      const r = bloc.getBoundingClientRect();
      /*
       * Le rectangle est ÉLARGI de 2 % avant d'être envoyé. Le fondu du shader
       * commence à son bord : sans cette marge, le dégradé mordait sur les
       * derniers caractères du sous-titre, mesuré à 6,57:1 au lieu des 7,04:1
       * que donne le papier nu. La marge repousse le dégradé hors du texte.
       */
      const m = 0.02;
      const x0 = (r.left - base.left) / base.width - m;
      const x1 = (r.right - base.left) / base.width + m;
      const yBas = 1 - (r.bottom - base.top) / base.height - m;
      const yHaut = 1 - (r.top - base.top) / base.height + m;
      gl!.uniform4f(uTexte, x0, yBas, x1, yHaut);
    }

    function dimensionner() {
      /*
       * Rendu à 0,6 pixel CSS, puis étiré par le navigateur.
       *
       * Un shader plein écran est limité par le REMPLISSAGE : son coût suit le
       * nombre de pixels, pas la complexité de la scène. Passer de 1,4 à 0,6
       * divise ce nombre par 5,4. Et contrairement à la carte 3D — dont les
       * arêtes fines se crénellent dès qu'on descend en résolution — une nappe
       * de métal n'est faite que de dégradés doux : l'interpolation du
       * navigateur les reconstitue sans qu'on voie la différence.
       */
      const d = Math.min(window.devicePixelRatio || 1, 1) * 0.6;
      const l = cnv.clientWidth;
      const h = cnv.clientHeight;
      if (l === 0 || h === 0) return;
      cnv.width = Math.round(l * d);
      cnv.height = Math.round(h * d);
      gl!.viewport(0, 0, cnv.width, cnv.height);
      gl!.uniform2f(uTaille, cnv.width, cnv.height);
      mesurerTexte();
    }
    dimensionner();

    const ro = new ResizeObserver(dimensionner);
    ro.observe(cnv);
    /*
     * ⚠ Le bloc de texte est observé LUI AUSSI, et pas seulement le canvas.
     * Sans ça, le rectangle épargné était mesuré une fois au montage, avant
     * que les polices ne soient arrivées : le texte se réajustait ensuite et
     * la protection restait sur l'ancienne position. Symptôme observé le
     * 28/09/2026 — le même sous-titre mesurait 7,04:1 puis 6,43:1 d'une
     * exécution à l'autre, sans qu'on ait rien changé autour.
     */
    const bloc = epargne ? document.querySelector(epargne) : null;
    if (bloc) ro.observe(bloc);

    function surSouris(e: PointerEvent) {
      const r = cnv.getBoundingClientRect();
      /* Normalisé en -0,5..0,5 : le shader s'en sert comme d'un décalage de
         phase, pas d'une position. La nappe RÉPOND au pointeur sans le
         suivre, ce qui évite l'effet « la page glisse sous la souris ». */
      souris.x = (e.clientX - r.left) / r.width - 0.5;
      souris.y = 0.5 - (e.clientY - r.top) / r.height;
    }

    let brut = 0;
    let image = 0;
    let debut = performance.now();

    function boucle(t: number) {
      brut = requestAnimationFrame(boucle);
      /* Une image sur deux, comme la carte 3D : la coulée est lente, la
         différence ne se voit pas et le coût est divisé par deux. */
      if (++image % 2) return;

      /* Le pointeur est interpolé ici, pas à chaque événement : un seul
         calcul par image rendue au lieu d'un par mouvement de souris. */
      souris.cx += (souris.x - souris.cx) * 0.045;
      souris.cy += (souris.y - souris.cy) * 0.045;

      gl!.uniform1f(uTemps, (t - debut) / 1000);
      gl!.uniform2f(uSouris, souris.cx, souris.cy);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
    }

    if (reduit) {
      /* Mouvement réduit : une seule image, figée. Le décor existe, il ne
         bouge pas. Une nappe qui coule en continu est exactement ce que ce
         réglage système demande d'éviter. */
      gl.uniform1f(uTemps, 2.4);
      gl.uniform2f(uSouris, 0, 0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    } else {
      window.addEventListener("pointermove", surSouris, { passive: true });
      brut = requestAnimationFrame(boucle);
    }

    function surVisibilite() {
      if (reduit) return;
      cancelAnimationFrame(brut);
      if (!document.hidden) {
        debut = performance.now() - 1000;
        brut = requestAnimationFrame(boucle);
      }
    }
    document.addEventListener("visibilitychange", surVisibilite);

    return () => {
      cancelAnimationFrame(brut);
      ro.disconnect();
      window.removeEventListener("pointermove", surSouris);
      document.removeEventListener("visibilitychange", surVisibilite);
      /* Rendre le contexte explicitement : un navigateur n'en garde qu'une
         poignée, et un contexte abandonné n'est pas collecté tout de suite. */
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [proche, reduit, epargne]);

  return (
    <div ref={enveloppe} className={className} aria-hidden="true">
      {proche && <canvas ref={canvas} className="h-full w-full" />}
    </div>
  );
}
