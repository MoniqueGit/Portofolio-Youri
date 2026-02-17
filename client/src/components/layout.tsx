import { useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Activity, User, Briefcase, GraduationCap, Zap, Lightbulb, CheckCircle2, Download, Send, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { href: "#about", label: "QUI SUIS-JE", icon: <User className="w-3 h-3" /> },
    { href: "#exp", label: "EXPÉRIENCES", icon: <Briefcase className="w-3 h-3" /> },
    { href: "#edu", label: "FORMATIONS", icon: <GraduationCap className="w-3 h-3" /> },
    { href: "#skills", label: "COMPÉTENCES", icon: <Zap className="w-3 h-3" /> },
    { href: "#projects", label: "PROJETS", icon: <Lightbulb className="w-3 h-3" /> },
    { href: "#why", label: "POURQUOI MOI", icon: <CheckCircle2 className="w-3 h-3" /> },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", href);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/40">
      {/* Enhanced Navigation with strategic CTA buttons */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl h-20 flex items-center justify-between px-6 lg:px-12">
        <div className="flex items-center gap-4">
          <Activity className="w-4 h-4 text-primary" />
          <span className="font-display font-bold text-sm tracking-widest hidden xl:block uppercase">YOURI FIGUIÉ</span>
        </div>

        {/* Anchor Navigation */}
        <nav className="hidden lg:flex gap-4 xl:gap-6 bg-white/5 border border-white/5 rounded-full px-6 py-2">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              className={cn(
                "flex items-center gap-2 text-[9px] font-mono tracking-widest text-muted-foreground hover:text-white transition-all duration-300 relative group py-1",
                location === item.href ? "text-white" : ""
              )}
            >
              {item.label}
              <span className={cn(
                "absolute -bottom-1 left-0 w-full h-[1px] bg-primary transition-transform duration-300 origin-left",
                location === item.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              )} />
            </a>
          ))}
        </nav>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="hidden sm:flex border-white/10 text-white hover:bg-white/5 rounded-none font-mono text-[9px] tracking-widest h-9 px-4 gap-2" asChild>
            <a href="https://linkedin.com/in/youri-fg/" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-3 h-3 text-primary" /> LINKEDIN
            </a>
          </Button>
          <Button size="sm" className="bg-primary hover:bg-primary/80 text-white rounded-none font-mono text-[9px] tracking-widest h-9 px-4 gap-2" asChild>
            <a href="#contact" onClick={(e) => scrollToSection(e, "#contact")}>
              <Send className="w-3 h-3" /> CONTACT
            </a>
          </Button>
          <div className="h-6 w-[1px] bg-white/10 hidden md:block mx-2" />
          <div className="flex flex-col items-end hidden md:flex">
            <span className="font-mono text-[9px] text-primary leading-none uppercase tracking-tighter">SECURE_LINK</span>
            <span className="font-mono text-[9px] text-muted-foreground leading-none mt-1">
              {time.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 pb-12 relative overflow-hidden">
        {children}
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-white/5 bg-background h-12 flex items-center justify-between px-8 text-[9px] font-mono text-muted-foreground/60 tracking-[0.2em] uppercase">
        <div className="flex gap-6">
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