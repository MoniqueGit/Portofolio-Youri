// Produit l'edition d'equipe a partir de la source unique index.html :
// meme application, sans connecteur ni appel a Claude : aucune capacite a
// declarer, donc l'artifact reste partageable librement.
// Usage : node build-partage.mjs
import { readFileSync, writeFileSync } from "node:fs";

const src = readFileSync(new URL("./index.html", import.meta.url), "utf8");

const swaps = [
  ["<title>Atelier Dossier</title>", "<title>Atelier Dossier Équipe</title>"],
  ["const AVEC_DRIVE = true;", "const AVEC_DRIVE = false;"],
  ["const AVEC_IA = true;", "const AVEC_IA = false;"],
  ['const NOM_APP = "Atelier Dossier";', 'const NOM_APP = "Atelier Dossier Équipe";'],
];

let out = src;
for (const [from, to] of swaps) {
  if (!out.includes(from)) throw new Error("Motif introuvable dans index.html : " + from);
  out = out.replace(from, to);
}

writeFileSync(new URL("./partage.html", import.meta.url), out);
console.log("partage.html écrit — " + out.length + " octets");
