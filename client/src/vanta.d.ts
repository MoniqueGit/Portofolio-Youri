/**
 * Vanta ne livre pas de types. Déclaration minimale pour l'essai WAVES du
 * 28/09/2026 : juste ce que `vanta-waves.tsx` appelle réellement, pas une
 * réécriture de l'API complète.
 */
declare module "vanta/dist/vanta.waves.min.js" {
  const WAVES: (options: Record<string, unknown>) => { destroy: () => void };
  export default WAVES;
}
