import { useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Shield, Radio, Activity } from "lucide-react";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { href: "/", label: "OVERVIEW" },
    { href: "#strategy", label: "STRATEGY" },
    { href: "#capabilities", label: "CAPABILITIES" },
    { href: "#deployments", label: "DEPLOYMENTS" },
    { href: "#contact", label: "CONTACT" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      {/* Refined Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl h-14 flex items-center justify-between px-8">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" />
            <span className="font-display font-bold text-sm tracking-widest">AD.LABS</span>
          </div>
          <div className="h-4 w-[1px] bg-white/10 hidden sm:block" />
          <span className="font-mono text-[10px] text-muted-foreground hidden lg:block tracking-widest uppercase">
            EST. 2026 // GEN-5 SYSTEMS
          </span>
        </div>

        <nav className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={cn(
                "nav-link relative group",
                location === item.href ? "text-primary" : ""
              )}
            >
              {item.label}
              <span className={cn(
                "absolute -bottom-[21px] left-0 w-full h-[2px] bg-primary transition-transform duration-300 origin-left",
                location === item.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              )} />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <span className="font-mono text-[10px] text-muted-foreground">
            {time.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' })}
          </span>
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-white/5">
            <Shield className="w-3.5 h-3.5 text-primary/80" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-14 pb-12 relative overflow-hidden">
        {children}
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-white/5 bg-background h-12 flex items-center justify-between px-8 text-[9px] font-mono text-muted-foreground/60 tracking-[0.2em] uppercase">
        <div className="flex gap-6">
          <span>PARIS, FR // NODE_01</span>
          <span>© 2026 ALL RIGHTS RESERVED</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
          <span>CONNECTED</span>
        </div>
      </footer>
    </div>
  );
}