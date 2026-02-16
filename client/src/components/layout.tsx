import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { href: "/", label: "HOME" },
    { href: "#mission", label: "MISSION" },
    { href: "#arsenal", label: "ARSENAL" },
    { href: "#operations", label: "OPERATIONS" },
    { href: "#comms", label: "COMMS" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
      {/* Top HUD Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-md h-16 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="font-mono text-xs text-primary tracking-widest">SYSTEM ONLINE</span>
          <span className="font-mono text-xs text-muted-foreground hidden sm:block">
            {time.toLocaleTimeString([], { hour12: false })} UTC
          </span>
        </div>

        <nav className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={cn(
                "text-xs font-mono tracking-widest hover:text-primary transition-colors relative group",
                location === item.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              <span className="opacity-0 group-hover:opacity-100 absolute -left-3 text-primary">&gt;</span>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 font-mono text-xs text-primary border border-primary/30 px-3 py-1 rounded bg-primary/5">
          <span>SECURE_CONN</span>
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16 pb-20 relative overflow-hidden">
        {/* Decorative Grid Lines */}
        <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
          <div className="absolute top-[20%] left-0 w-full h-[1px] bg-primary/20" />
          <div className="absolute top-[80%] left-0 w-full h-[1px] bg-primary/20" />
          <div className="absolute left-[10%] top-0 w-[1px] h-full bg-primary/20" />
          <div className="absolute right-[10%] top-0 w-[1px] h-full bg-primary/20" />
        </div>
        
        <div className="relative z-10">
          {children}
        </div>
      </main>

      {/* Bottom HUD Footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-background/90 h-10 flex items-center justify-between px-6 text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
        <div>
          COORDINATES: 48.8566° N, 2.3522° E
        </div>
        <div className="flex gap-4">
          <span>VERSION 2.4.0</span>
          <span className="text-primary">ALL SYSTEMS NOMINAL</span>
        </div>
      </footer>
    </div>
  );
}