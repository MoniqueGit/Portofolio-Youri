import { motion } from "framer-motion";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import heroBg from "@/assets/hero-bg.png";
import { Cpu, Shield, Code, Radio, Server, Send, Download, User, Briefcase, GraduationCap, Lightbulb, CheckCircle2, ChevronRight, Terminal, Box, Rocket, Globe, Database } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Nom requis"),
  email: z.string().email("Format invalide"),
  message: z.string().min(10, "Message trop court"),
});

export default function Home() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  function onSubmit() {
    toast({ title: "TRANSMISSION RÉUSSIE", description: "Communication établie avec succès." });
    form.reset();
  }

  return (
    <Layout>
      {/* HERO SECTION - MAXIMIZED IMPACT */}
      <section className="relative min-h-[95vh] flex items-center px-8 md:px-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBg} 
            alt="Technical Background" 
            className="w-full h-full object-cover opacity-10 grayscale brightness-50 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
        </div>

        <div className="container relative z-10 max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <Badge className="bg-primary/20 text-primary border-primary/30 rounded-full px-4 py-1 font-mono text-[10px] tracking-widest animate-pulse">
                SÉCURITÉ DÉFENSE // SYSTÈMES CRITIQUES
              </Badge>
              <div className="h-[1px] w-12 bg-white/10" />
            </div>
            <h1 className="text-7xl md:text-[10rem] font-display font-bold tracking-tighter mb-8 leading-[0.85]">
              ALEXANDRE <br />
              <span className="text-primary italic font-light drop-shadow-[0_0_15px_rgba(39,63,48,0.5)]">DURAND</span>
            </h1>
            <p className="text-xl md:text-3xl text-muted-foreground max-w-3xl font-light leading-relaxed mb-12 border-l-2 border-primary pl-8 py-2">
              Architecte de <span className="text-white font-medium">systèmes embarqués autonomes</span> et technologies de défense. <br />
              <span className="text-lg opacity-80 mt-2 block">Candidat alternant BUT GEII — Opérationnel Septembre 2026.</span>
            </p>
            <div className="flex flex-wrap gap-8 items-center">
              <Button size="lg" className="bg-primary hover:bg-primary/80 text-white font-bold tracking-wider rounded-none px-12 h-20 text-lg flex items-center gap-4 border border-white/10 shadow-2xl transition-all hover:scale-105 group">
                <Download className="w-6 h-6 group-hover:-translate-y-1 transition-transform" /> TÉLÉCHARGER CV PDF
              </Button>
              <div className="flex flex-col">
                <span className="font-mono text-[10px] text-primary/60 mb-2 tracking-[0.3em]">DIRECT UPLINK</span>
                <a href="#contact" className="text-white hover:text-primary transition-colors font-display text-xl border-b border-primary/30 pb-1 flex items-center gap-2 group">
                  PRENDRE CONTACT <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* HUD Decoration */}
        <div className="absolute bottom-20 left-20 hidden lg:block opacity-40">
          <div className="font-mono text-[10px] text-primary space-y-1">
            <div>[LAT: 48.8566 N]</div>
            <div>[LNG: 2.3522 E]</div>
            <div>[SEC_LEVEL: ALPHA]</div>
          </div>
        </div>
      </section>

      {/* STRATEGIC DIFFERENTIATION */}
      <section className="py-32 bg-primary/5 relative overflow-hidden">
        <div className="container max-w-6xl mx-auto px-8 relative z-10">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="space-y-4 p-8 glass-panel border-primary/20">
              <Rocket className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-bold uppercase tracking-tight">Vision Innovation</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Anticiper les ruptures technologiques dans les drones et la robotique autonome pour garantir un avantage tactique.</p>
            </div>
            <div className="space-y-4 p-8 glass-panel border-primary/20">
              <Globe className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-bold uppercase tracking-tight">Souveraineté</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Développement de solutions "Made in France" critiques pour l'indépendance stratégique nationale.</p>
            </div>
            <div className="space-y-4 p-8 glass-panel border-primary/20">
              <Database className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-bold uppercase tracking-tight">Data Integrity</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Sécurisation absolue des flux de données et des protocoles de communication embarqués.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="space-y-32 py-32">
        {/* QUI SUIS-JE - PERSUASIVE COPY */}
        <section id="about" className="container max-w-5xl mx-auto px-8 scroll-mt-24">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">
            <div className="sticky top-32">
              <div className="flex items-center gap-4 mb-6">
                <User className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-display font-bold uppercase tracking-widest">Profil Stratégique</h2>
              </div>
              <div className="h-[2px] w-12 bg-primary/30" />
            </div>
            <div className="space-y-8">
              <div className="text-2xl text-white leading-relaxed font-light">
                À la croisée de l'<strong>ingénierie</strong>, du <strong>business</strong> et de la <strong>géopolitique</strong>, je conçois les systèmes qui définiront les standards de demain.
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Actuellement en BUT GEII, j'ai développé une rigueur d'exécution propre aux secteurs de la défense. Ma capacité à comprendre les besoins opérationnels complexes me permet de traduire des visions stratégiques en réalités matérielles et logicielles.
              </p>
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="p-8 border border-primary/20 bg-primary/5 rounded-none relative">
                   <div className="text-primary font-mono text-xs mb-2">ENGAGEMENT</div>
                   <p className="text-sm">Rigueur militaire appliquée au développement logiciel.</p>
                </div>
                <div className="p-8 border border-white/10 bg-white/5 rounded-none">
                   <div className="text-white/60 font-mono text-xs mb-2">CURIOSITÉ</div>
                   <p className="text-sm">Veille constante sur les ruptures technologiques mondiales.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EXPÉRIENCES - OUTCOME FOCUSED */}
        <section id="exp" className="container max-w-5xl mx-auto px-8 scroll-mt-24">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">
            <div className="sticky top-32">
              <div className="flex items-center gap-4 mb-6">
                <Briefcase className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-display font-bold uppercase tracking-widest">Déploiements</h2>
              </div>
              <div className="h-[2px] w-12 bg-primary/30" />
            </div>
            <div className="space-y-12">
              {[
                { 
                  role: "Concepteur Systèmes Embarqués", 
                  company: "TECH-DEFENSE SOLUTIONS", 
                  date: "STAGIAIRE // 2025", 
                  tags: ["STM32", "C++", "Optimisation"],
                  desc: "Réduction de 15% de la latence de traitement des capteurs sur un module de navigation autonome. Mise en oeuvre de protocoles de communication robustes." 
                },
                { 
                  role: "Lead Tech Prototype Drone", 
                  company: "AERO-LAB INNOVATION", 
                  date: "PROJET COLLAB // 2024", 
                  tags: ["LoRa", "AES-256", "Robotique"],
                  desc: "Développement d'un système de télémétrie chiffrée. Portée accrue de 20% par optimisation RF et traitement du signal." 
                }
              ].map((exp, i) => (
                <div key={i} className="group border-b border-white/5 pb-12 last:border-0 hover:bg-white/[0.02] transition-colors p-6 -mx-6">
                  <div className="flex justify-between items-baseline mb-4">
                    <h3 className="text-3xl font-bold group-hover:text-primary transition-colors">{exp.role}</h3>
                    <span className="font-mono text-xs text-primary">{exp.date}</span>
                  </div>
                  <div className="text-white/60 font-mono text-xs mb-6 tracking-widest">{exp.company}</div>
                  <p className="text-muted-foreground leading-relaxed mb-8 text-lg">{exp.desc}</p>
                  <div className="flex gap-3">
                    {exp.tags.map(t => <Badge key={t} variant="outline" className="rounded-none border-primary/30 text-primary text-[10px] uppercase font-mono">{t}</Badge>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COMPÉTENCES - IMPACT GRID */}
        <section id="skills" className="container max-w-6xl mx-auto px-8 scroll-mt-24">
          <div className="text-center mb-20">
            <span className="font-mono text-[10px] text-primary tracking-[0.4em] uppercase mb-4 block">Power Matrix</span>
            <h2 className="text-5xl font-display font-bold uppercase">Expertise Technique</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Languages", icon: <Code className="w-5 h-5" />, list: ["C / C++ (High Perf)", "Python (Scripting)", "VHDL (FPGA)", "Assembly"] },
              { title: "Embedded", icon: <Cpu className="w-5 h-5" />, list: ["STM32 ecosystem", "FreeRTOS", "UART / CAN / SPI", "PCB Architecture"] },
              { title: "Robotics", icon: <Box className="w-5 h-5" />, list: ["PID Control", "Sensor Fusion", "Edge AI (OpenCV)", "UAV Dynamics"] },
              { title: "Strategic", icon: <Shield className="w-5 h-5" />, list: ["Systems Thinking", "Technical Leadership", "Agile Defense", "Risk Analysis"] }
            ].map((cat, i) => (
              <div key={i} className="p-10 border border-white/5 bg-white/5 hover:border-primary/50 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 -rotate-45 translate-x-8 -translate-y-8" />
                <div className="text-primary mb-8 group-hover:scale-110 transition-transform inline-block">{cat.icon}</div>
                <h3 className="font-display font-bold text-xl mb-8 uppercase tracking-wider">{cat.title}</h3>
                <ul className="space-y-4">
                  {cat.list.map(item => (
                    <li key={item} className="flex items-center gap-4 text-sm text-muted-foreground group-hover:text-white transition-colors">
                      <div className="w-1.5 h-[1px] bg-primary" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* WHY CHOOSE ME - HIGH CONVERSION */}
        <section id="why" className="container max-w-6xl mx-auto px-8 py-40 bg-primary/10 border-y border-primary/20 scroll-mt-24">
          <div className="text-center mb-24">
            <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-8 animate-bounce-slow" />
            <h2 className="text-5xl font-display font-bold mb-6 uppercase tracking-widest">Pourquoi me recruter ?</h2>
            <p className="text-muted-foreground font-light max-w-2xl mx-auto text-xl">Une proposition de valeur unique pour votre département R&D.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 text-left">
            {[
              { t: "Hybride Tech-Business", d: "Compréhension fine des enjeux commerciaux et stratégiques derrière chaque solution technique." },
              { t: "Culture de la Performance", d: "Une obsession pour l'optimisation et la fiabilité des systèmes en conditions réelles." },
              { t: "Esprit d'Équipe", d: "Intégration rapide en milieu agile et capacité à collaborer sur des projets transverses." },
              { t: "Ambition Défense", d: "Alignement total avec les valeurs d'excellence et de souveraineté du secteur." }
            ].map((item, i) => (
              <div key={i} className="space-y-4 border-l border-primary/20 pl-6 hover:border-primary transition-colors">
                <h3 className="text-lg font-bold uppercase">{item.t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT - FINAL CALL TO ACTION */}
        <section id="contact" className="container max-w-2xl mx-auto px-8 scroll-mt-24">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-display font-bold mb-4 uppercase">Let's Connect</h2>
            <p className="text-muted-foreground font-light text-xl">Disponible pour entretien immédiat concernant une alternance Septembre 2026.</p>
          </div>
          <Card className="bg-background border-white/10 rounded-none p-12 relative overflow-hidden shadow-[0_0_50px_rgba(39,63,48,0.2)]">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-mono text-primary uppercase tracking-widest">Identité</FormLabel>
                        <FormControl>
                          <Input placeholder="VOTRE NOM" {...field} className="rounded-none border-white/10 bg-white/5 focus:border-primary h-14 text-lg" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-mono text-primary uppercase tracking-widest">Canal</FormLabel>
                        <FormControl>
                          <Input placeholder="EMAIL" {...field} className="rounded-none border-white/10 bg-white/5 focus:border-primary h-14 text-lg" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-mono text-primary uppercase tracking-widest">Message Stratégique</FormLabel>
                      <FormControl>
                        <Textarea placeholder="VOTRE MESSAGE..." {...field} className="rounded-none border-white/10 bg-white/5 focus:border-primary min-h-[180px] resize-none text-lg" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-primary hover:bg-primary/80 text-white font-bold tracking-[0.2em] rounded-none h-20 text-xl border border-white/10">
                  ÉTABLIR LA CONNEXION
                </Button>
              </form>
            </Form>
          </Card>
        </section>
      </div>
    </Layout>
  );
}