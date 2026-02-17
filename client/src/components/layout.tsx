import { useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Shield, Radio, Activity, User, Briefcase, GraduationCap, Zap, Lightbulb, CheckCircle2 } from "lucide-react";

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

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/40">
      {/* Refined Navigation with requested buttons */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl h-16 flex items-center justify-between px-6 lg:px-12">
        <div className="flex items-center gap-4">
          <Activity className="w-4 h-4 text-primary" />
          <span className="font-display font-bold text-sm tracking-widest hidden sm:block">AD.SYSTEMS</span>
        </div>

        <nav className="hidden lg:flex gap-6">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-2 text-[10px] font-mono tracking-widest text-muted-foreground hover:text-white transition-all duration-300 relative group py-2",
                location === item.href ? "text-white" : ""
              )}
            >
              <span className="text-primary/50 group-hover:text-primary transition-colors">{item.icon}</span>
              {item.label}
              <span className={cn(
                "absolute bottom-0 left-0 w-full h-[1px] bg-primary transition-transform duration-300 origin-left",
                location === item.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              )} />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] text-muted-foreground hidden sm:block mr-2">
            {time.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' })}
          </span>
          <div className="flex items-center gap-2">
             <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
             <span className="font-mono text-[10px] text-primary uppercase tracking-tighter">SECURE</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16 pb-12 relative overflow-hidden">
        {children}
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-white/5 bg-background h-12 flex items-center justify-between px-8 text-[9px] font-mono text-muted-foreground/60 tracking-[0.2em] uppercase">
        <div className="flex gap-6">
          <span>GEN-5 // STEALTH_OS</span>
          <span>© 2026 ALEXANDRE DURAND</span>
        </div>
        <div className="flex items-center gap-2">
          <span>PARIS_NODE_01</span>
        </div>
      </footer>
    </div>
  );
}