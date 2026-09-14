import { useEffect } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Reticule } from "@/components/cursor";
import { EASE } from "@/components/motion";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Collins from "@/pages/collins";

// Strips trailing slash so wouter base matches both dev ("/") and gh-pages ("/Portofolio-Youri")
const base = import.meta.env.BASE_URL.replace(/\/$/, "");

/**
 * Passage d'une page à l'autre.
 *
 * Un fondu court, pas un rideau : la transition doit masquer le remplacement
 * du contenu, pas se faire remarquer. `mode="wait"` évite que les deux pages
 * se superposent — sinon la barre de défilement saute pendant le croisement.
 * Seule l'opacité est animée : c'est la propriété la moins chère qui existe.
 */
function Pages() {
  const [location] = useLocation();

  /*
   * Une nouvelle page se lit depuis le haut — wouter ne le fait pas seul.
   * On coupe aussi la restauration automatique du navigateur : elle se
   * déclenchait APRÈS ce remontage et reposait la page à une hauteur
   * arbitraire, le contenu n'ayant pas encore sa taille finale.
   */
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  /* Le réticule est monté hors des pages : il ne peut pas hériter du fond.
     On lui signale donc ici la seule page sombre du site. */
  useEffect(() => {
    const html = document.documentElement;
    if (location === "/collins") html.dataset.panneau = "1";
    else delete html.dataset.panneau;
  }, [location]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22, ease: EASE }}
      >
        <Switch location={location}>
          <Route path="/" component={Home} />
          <Route path="/collins" component={Collins} />
          <Route component={NotFound} />
        </Switch>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Reticule />
        <WouterRouter base={base}>
          <Pages />
        </WouterRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
