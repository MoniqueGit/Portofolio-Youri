import { useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Activity, User, Briefcase, GraduationCap, Zap, Lightbulb, CheckCircle2, Send, Linkedin, Target, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [time, setTime] = useState(new Date());
  const [activeSection, setActiveSection] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);

  // Clock
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const sectionIds = ["about", "alternance", "exp", "edu", "skills", "projects", "why"];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(`#${id}`);
        },
        { threshold: 0.25, rootMargin: "-80px 0px -40% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navItems = [
    { href: "#about",      label: "QUI SUIS-JE",  icon: <User className="w-3.5 h-3.5" /> },
    { href: "#alternance", label: "ALTERNANCE",    icon: <Target className="w-3.5 h-3.5" /> },
    { href: "#exp",        label: "EXPÉRIENCES",   icon: <Briefcase className="w-3.5 h-3.5" /> },
    { href: "#edu",        label: "FORMATIONS",    icon: <GraduationCap className="w-3.5 h-3.5" /> },
    { href: "#skills",     label: "COMPÉTENCES",   icon: <Zap className="w-3.5 h-3.5" /> },
    { href: "#projects",   label: "PROJETS",       icon: <Lightbulb className="w-3.5 h-3.5" /> },
    { href: "#why",        label: "POURQUOI MOI",  icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", href);
      setActiveSection(href);
    }
    setMenuOpen(false);
  };

  const isActive = (href: string) => activeSection === href || location === href;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/40">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl h-16 md:h-20 flex items-center justify-between px-4 md:px-6 lg:px-12">
        <div className="flex items-center gap-3">
          <Activity className="w-4 h-4 text-primary" />
          <span className="font-display font-bold text-sm tracking-widest hidden sm:block uppercase">YOURI FIGUIÉ</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-4 xl:gap-6 bg-white/5 border border-white/5 rounded-full px-6 py-2">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              className={cn(
                "flex items-center gap-2 text-[9px] font-mono tracking-widest transition-all duration-300 relative group py-1",
                isActive(item.href)
                  ? "text-white"
                  : "text-muted-foreground hover:text-white"
              )}
            >
              {item.label}
              <span className={cn(
                "absolute -bottom-1 left-0 w-full h-[1px] bg-primary transition-transform duration-300 origin-left",
                isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              )} />
            </a>
          ))}
        </nav>

        {/* Right: CTA + Status + Hamburger */}
        <div className="flex items-center gap-2 md:gap-3">
          <Button
            variant="outline"
            size="sm"
            className="hidden sm:flex border-white/10 text-white hover:bg-white/5 rounded-none font-mono text-[9px] tracking-widest h-9 px-4 gap-2 group"
            asChild
          >
            <a href="https://linkedin.com/in/youri-fg/" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-3 h-3 text-primary group-hover:scale-110 transition-transform duration-200" /> LINKEDIN
            </a>
          </Button>
          <Button
            size="sm"
            className="hidden sm:flex bg-primary hover:bg-primary/80 text-white rounded-none font-mono text-[9px] tracking-widest h-9 px-4 gap-2 group"
            asChild
          >
            <a href="#contact" onClick={(e) => scrollToSection(e, "#contact")}>
              <Send className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-200" /> CONTACT
            </a>
          </Button>

          <div className="h-6 w-[1px] bg-white/10 hidden md:block mx-1" />

          {/* Status indicator */}
          <div className="flex-col items-end hidden md:flex">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-status" />
              <span className="font-mono text-[9px] text-primary leading-none uppercase tracking-tighter">SECURE_LINK</span>
            </div>
            <span className="font-mono text-[9px] text-muted-foreground leading-none">
              {time.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>

          {/* Hamburger — mobile only */}
          <button
            className="lg:hidden flex items-center justify-center w-9 h-9 border border-white/10 text-white/70 hover:text-white hover:border-white/20 transition-colors"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Menu"
          >
            {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-background/97 backdrop-blur-xl flex flex-col pt-16 md:pt-20"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Scan line decoration */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-primary/40" />

            <div className="flex flex-col h-full px-8 py-10 justify-between">
              {/* Nav links */}
              <nav className="flex flex-col gap-1">
                {navItems.map((item, i) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href)}
                    className={cn(
                      "flex items-center gap-4 py-4 border-b border-white/5 group transition-all duration-200",
                      isActive(item.href) ? "text-white" : "text-white/50 hover:text-white"
                    )}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className={cn("text-primary transition-colors", isActive(item.href) ? "text-primary" : "text-primary/40 group-hover:text-primary")}>
                      {item.icon}
                    </span>
                    <span className="font-mono text-sm tracking-widest">{item.label}</span>
                    {isActive(item.href) && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                    )}
                  </motion.a>
                ))}
              </nav>

              {/* Bottom CTAs */}
              <motion.div
                className="flex flex-col gap-3"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                <a
                  href="https://linkedin.com/in/youri-fg/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 h-12 border border-white/10 text-white/70 hover:text-white hover:border-white/20 font-mono text-xs tracking-widest transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-primary" /> LINKEDIN
                </a>
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, "#contact")}
                  className="flex items-center justify-center gap-2 h-12 bg-primary hover:bg-primary/80 text-white font-mono text-xs tracking-widest transition-colors"
                >
                  <Send className="w-4 h-4" /> PRENDRE CONTACT
                </a>
                <div className="text-center mt-2">
                  <span className="font-mono text-[9px] text-muted-foreground/50 tracking-widest uppercase">
                    {time.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })} · SECURE_LINK
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="pt-16 md:pt-20 pb-12 relative overflow-hidden">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-background min-h-[48px] flex flex-wrap items-center justify-between px-4 md:px-8 py-3 gap-2 text-[9px] font-mono text-muted-foreground/60 tracking-[0.2em] uppercase">
        <div className="flex flex-wrap gap-4">
          <span>BUT GEII // IUT MONTPELLIER</span>
          <span>© 2026 YOURI FIGUIÉ</span>
        </div>
        <div className="flex items-center gap-2">
          <a href="https://linkedin.com/in/youri-fg/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
            LINKEDIN
          </a>
          <span className="opacity-30">·</span>
          <a href="mailto:youri.figuie@etu.umontpellier.fr" className="hover:text-primary transition-colors">
            EMAIL
          </a>
        </div>
      </footer>
    </div>
  );
}
