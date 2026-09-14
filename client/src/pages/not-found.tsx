import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  const home = import.meta.env.BASE_URL;

  return (
    <div className="bg-halo flex min-h-screen w-full items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="type-eyebrow text-primary">Erreur 404</p>
        <h1 className="type-title mt-4 text-balance">Cette page n'existe pas.</h1>
        <p className="mt-5 text-[1.0625rem] text-muted-foreground">
          Le lien est peut-être erroné ou la page a été déplacée.
        </p>
        <a
          href={home}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-[1.0625rem] font-medium text-primary-foreground transition-colors duration-300 hover:bg-primary/90"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour à l'accueil
        </a>
      </div>
    </div>
  );
}
