// Fabrique la version autonome (document HTML complet) à partir du fragment
// d'artifact index.html. Sortie : deploy/index.html + deploy/api/claude.js
// Usage : node build-standalone.mjs
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from "node:fs";

const src = readFileSync(new URL("./index.html", import.meta.url), "utf8");
const i = src.indexOf('<div id="root">');
if (i < 0) throw new Error("marqueur <div id=\"root\"> introuvable dans index.html");

const doc = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="Generateur de dossiers scolaires et professionnels : consignes, plan editable, redaction section par section, export PDF A4.">
<style>:root{color-scheme:light}html,body{margin:0}img{max-width:100%}[hidden]{display:none!important}</style>
${src.slice(0, i)}</head>
<body>
${src.slice(i)}
</body>
</html>
`;

mkdirSync(new URL("./deploy/api", import.meta.url), { recursive: true });
writeFileSync(new URL("./deploy/index.html", import.meta.url), doc);
copyFileSync(new URL("./api/claude.js", import.meta.url), new URL("./deploy/api/claude.js", import.meta.url));
console.log("deploy/index.html écrit — " + doc.length + " octets");
