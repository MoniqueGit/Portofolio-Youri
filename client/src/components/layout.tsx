import { useEffect, useState } from "react";
import { Link } from "wouter";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems, profile } from "@/content/profile";
import { EASE } from "@/components/motion";

const b = import.meta.env.BASE_URL;

export function Layout({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);

  const { scrollY, scrollYProgress } = useScroll();
  // Ressort léger : la barre de progression suit le scroll sans le copier au pixel.
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.3 });

  // La barre ne devient opaque qu'une fois le hero dépassé.
  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 24);
    // Tant qu'on est en haut de page, aucun onglet ne doit être allumé.
    if (v < 120) setActiveSection("");
  });

  // Section active : on retient la dernière section franchie sous le header.
  useEffect(() => {
    const ids = navItems.map((n) => n.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActiveSection(`#${visible.target.id}`);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: 0 },
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Verrouille le scroll derrière le menu mobile.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Échap ferme le menu mobile.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const goTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", href);
      setActiveSection(href);
    }
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-foreground focus:px-4 focus:py-2 focus:text-[0.9375rem] focus:text-background"
      >
        Aller au contenu
      </a>

      {/* ── Barre de navigation ─────────────────────────────────────────── */}
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled
            // Fond quasi opaque plutôt qu'un gros flou : `backdrop-filter` repeint la
            // zone derrière la barre à chaque image de scroll.
            ? "border-b border-border bg-background/95 backdrop-blur-[3px]"
            : "border-b border-transparent bg-background/0",
        )}
      >
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
          <a
            href="#top"
            onClick={(e) => goTo(e, "#top")}
            className="shrink-0 text-[1.0625rem] font-bold tracking-[-0.025em] [font-stretch:106%]"
          >
            {profile.firstName} {profile.lastName}
          </a>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Navigation principale">
            {navItems.map((item) => {
              const active = activeSection === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => goTo(e, item.href)}
                  aria-current={active ? "true" : undefined}
                  className={cn(
                    "relative px-3 py-1.5 text-[0.9375rem] font-medium transition-colors duration-300",
                    active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {/* La pastille se déplace d'un onglet à l'autre au lieu d'apparaître */}
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-x-0 -bottom-px -z-10 h-[2px] bg-[hsl(var(--efis))]"
                      transition={{ duration: 0.45, ease: EASE }}
                    />
                  )}
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={`${b}${profile.cvFile}`}
              download="CV_Youri_Figuie.pdf"
              className="radius-control hidden border border-border bg-surface px-4 py-2 text-[0.9375rem] font-semibold text-foreground transition-colors duration-300 hover:border-primary/50 sm:inline-flex"
            >
              Mon CV
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={menuOpen}
              className="radius-control flex h-9 w-9 items-center justify-center border border-border text-foreground transition-colors duration-300 hover:border-primary/50 md:hidden"
            >
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Fil de progression de lecture */}
        <motion.div
          className="h-px origin-left bg-[hsl(var(--efis))]"
          style={{ scaleX: progress, opacity: scrolled ? 1 : 0 }}
        />
      </header>

      {/* ── Menu mobile ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <nav className="flex h-full flex-col justify-center gap-1 px-8 pb-16">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => goTo(e, item.href)}
                  className="border-b border-border/70 py-5 text-3xl font-semibold tracking-[-0.03em]"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.5, ease: EASE }}
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.a
                href={`${b}${profile.cvFile}`}
                download="CV_Youri_Figuie.pdf"
                className="radius-control mt-8 inline-flex items-center justify-center bg-primary px-6 py-4 text-base font-semibold text-primary-foreground"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5, ease: EASE }}
              >
                Télécharger mon CV
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main id="contenu">{children}</main>

      {/* ── Pied de page ────────────────────────────────────────────────── */}
      <footer className="border-t border-border bg-subtle/60">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xl font-bold tracking-[-0.028em] [font-stretch:108%]">
                {profile.firstName} {profile.lastName}
              </p>
              <p className="mt-1 max-w-sm text-[0.9375rem] text-muted-foreground">
                Alternant chez Collins Aerospace, en BUT GEII à l'IUT de Montpellier.
              </p>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-[0.9375rem]">
              <a
                href={`mailto:${profile.email}`}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Email
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                LinkedIn
              </a>
              <a
                href={`${b}${profile.cvFile}`}
                download="CV_Youri_Figuie.pdf"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                CV (PDF)
              </a>
              <Link href="/collins" className="text-muted-foreground transition-colors hover:text-foreground">
                Collins Aerospace
              </Link>
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 text-[0.8125rem] text-muted-foreground sm:flex-row sm:justify-between">
            <span>© {new Date().getFullYear()} {profile.firstName} {profile.lastName}</span>
            <span>{profile.location}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
