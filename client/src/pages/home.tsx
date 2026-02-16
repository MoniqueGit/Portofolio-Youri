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
import { Cpu, Shield, Crosshair, Code, Radio, Server, Send, Download, ArrowUpRight, Zap, Target, User, Briefcase, GraduationCap, Lightbulb, CheckCircle2 } from "lucide-react";

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
      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center px-8 md:px-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBg} 
            alt="Technical Background" 
            className="w-full h-full object-cover opacity-15 grayscale brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
        </div>

        <div className="container relative z-10 max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1px] w-12 bg-primary" />
              <span className="font-mono text-[10px] tracking-[0.4em] text-primary uppercase">Systèmes Embarqués // Défense</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tight mb-8">
              ALEXANDRE <br />
              <span className="text-primary/60 italic">DURAND</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl font-light leading-relaxed mb-12">
              Expertise en ingénierie électronique et développement bas niveau pour les technologies souveraines.
            </p>
            <div className="flex flex-wrap gap-6">
              <Button size="lg" className="bg-primary hover:bg-primary/80 text-white font-bold tracking-wider rounded-none px-10 h-14 flex items-center gap-3 border border-white/10 shadow-lg">
                <Download className="w-5 h-5" /> TÉLÉCHARGER MON CV PDF
              </Button>
              <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/5 rounded-none px-10 h-14 flex items-center gap-3" asChild>
                <a href="#contact">
                  <Send className="w-5 h-5" /> PRENDRE CONTACT
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* QUICK NAV - SECTION BUTTONS */}
      <section className="py-20 border-y border-white/5 bg-secondary/20">
        <div className="container max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { id: "about", label: "Qui suis-je ?", icon: <User className="w-4 h-4" /> },
              { id: "exp", label: "Expériences", icon: <Briefcase className="w-4 h-4" /> },
              { id: "edu", label: "Formations", icon: <GraduationCap className="w-4 h-4" /> },
              { id: "skills", label: "Compétences", icon: <Zap className="w-4 h-4" /> },
              { id: "projects", label: "Projets", icon: <Lightbulb className="w-4 h-4" /> },
              { id: "why", label: "Pourquoi moi ?", icon: <CheckCircle2 className="w-4 h-4" /> },
            ].map((item) => (
              <a 
                key={item.id} 
                href={`#${item.id}`}
                className="group p-4 border border-white/5 bg-white/5 hover:bg-primary/20 hover:border-primary/50 transition-all text-center flex flex-col items-center justify-center gap-3"
              >
                <div className="text-muted-foreground group-hover:text-primary transition-colors">
                  {item.icon}
                </div>
                <span className="font-mono text-[10px] tracking-widest uppercase">{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* QUI SUIS-JE */}
      <section id="about" className="py-32">
        <div className="container max-w-4xl mx-auto px-8">
          <div className="flex items-center gap-4 mb-12">
            <User className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-display font-bold uppercase tracking-tight">QUI SUIS-JE ?</h2>
          </div>
          <div className="text-lg text-muted-foreground leading-relaxed space-y-6">
            <p>
              Étudiant passionné par l'électronique et l'informatique industrielle, je me spécialise dans la conception de systèmes embarqués critiques. Mon intérêt pour la défense et la robotique me pousse à développer des solutions robustes et performantes.
            </p>
            <p className="border-l-2 border-primary pl-6 py-2 italic bg-primary/5 text-white/90">
              "Mon objectif est de contribuer au développement de technologies souveraines à haute valeur ajoutée."
            </p>
          </div>
        </div>
      </section>

      {/* EXPÉRIENCES */}
      <section id="exp" className="py-32 bg-secondary/10 border-y border-white/5">
        <div className="container max-w-4xl mx-auto px-8">
          <div className="flex items-center gap-4 mb-12">
            <Briefcase className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-display font-bold uppercase tracking-tight">EXPÉRIENCES PROFESSIONNELLES</h2>
          </div>
          <div className="space-y-12">
            {[
              { role: "Stagiaire Développeur Embarqué", company: "TECH-DEFENSE SOLUTIONS", date: "2025 (3 mois)", desc: "Optimisation d'algorithmes de filtrage pour capteurs IMU sur architecture ARM Cortex-M." },
              { role: "Projet Collaboration Industrielle", company: "AERO-LAB", date: "2024", desc: "Conception d'un prototype de transmission LoRa sécurisée pour télémétrie drone." }
            ].map((exp, i) => (
              <div key={i} className="relative pl-8 border-l border-white/10 group">
                <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-primary group-hover:scale-150 transition-transform" />
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-xl">{exp.role}</h3>
                  <span className="font-mono text-xs text-primary">{exp.date}</span>
                </div>
                <div className="text-sm font-mono text-muted-foreground mb-4">{exp.company}</div>
                <p className="text-muted-foreground">{exp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORMATIONS */}
      <section id="edu" className="py-32">
        <div className="container max-w-4xl mx-auto px-8">
          <div className="flex items-center gap-4 mb-12">
            <GraduationCap className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-display font-bold uppercase tracking-tight">FORMATIONS</h2>
          </div>
          <div className="grid gap-8">
            <div className="p-8 border border-white/5 bg-white/5">
              <h3 className="text-xl font-bold mb-2">BUT GEII</h3>
              <p className="text-primary font-mono text-sm mb-4">Génie Électrique et Informatique Industrielle</p>
              <p className="text-muted-foreground">IUT - Spécialisation Automatisme et Systèmes Embarqués.</p>
            </div>
          </div>
        </div>
      </section>

      {/* COMPÉTENCES */}
      <section id="skills" className="py-32 bg-secondary/10 border-y border-white/5">
        <div className="container max-w-6xl mx-auto px-8">
          <div className="flex items-center gap-4 mb-12">
            <Zap className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-display font-bold uppercase tracking-tight">COMPÉTENCES</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Languages", techs: ["C / C++", "Python", "Assembly", "VHDL"] },
              { title: "Hardwares", techs: ["STM32", "FPGA", "ESP32", "PCB Design"] },
              { title: "Technologies", techs: ["RTOS", "Linux Embedded", "CAN/I2C/SPI", "Git"] }
            ].map((cat, i) => (
              <Card key={i} className="bg-background border-white/5">
                <CardHeader>
                  <CardTitle className="text-sm font-mono uppercase tracking-widest text-primary">{cat.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {cat.techs.map(t => <Badge key={t} variant="secondary" className="rounded-none bg-white/5 border-white/10">{t}</Badge>)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PROJETS */}
      <section id="projects" className="py-32">
        <div className="container max-w-6xl mx-auto px-8">
          <div className="flex items-center gap-4 mb-12">
            <Lightbulb className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-display font-bold uppercase tracking-tight">PROJETS</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white/5 border-white/10 group hover:border-primary/50 transition-colors">
              <CardHeader>
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">Drone Flight Controller</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Implémentation d'un contrôleur PID sur STM32 pour stabilisation d'un quadri-rotor.</p>
                <Badge className="bg-primary/20 text-primary border-none">Académique</Badge>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10 group hover:border-primary/50 transition-colors">
              <CardHeader>
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">Système de Télémétrie Sécurisé</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Utilisation du protocole LoRa avec cryptage AES pour transmission de données critiques.</p>
                <Badge className="bg-accent/20 text-accent border-none">Personnel</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* POURQUOI MOI */}
      <section id="why" className="py-32 bg-primary/10 border-y border-white/10">
        <div className="container max-w-4xl mx-auto px-8 text-center">
          <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-8" />
          <h2 className="text-4xl font-display font-bold mb-8 uppercase">POURQUOI ME CHOISIR ?</h2>
          <div className="grid md:grid-cols-3 gap-12 text-left">
            <div>
              <h3 className="font-bold mb-4 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-primary rounded-full" /> DÉTERMINATION</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Capacité à m'investir pleinement dans des projets complexes et à apprendre rapidement.</p>
            </div>
            <div>
              <h3 className="font-bold mb-4 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-primary rounded-full" /> RIGUEUR</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Une approche structurée héritée de ma passion pour les systèmes critiques et la défense.</p>
            </div>
            <div>
              <h3 className="font-bold mb-4 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-primary rounded-full" /> PASSION</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Une veille constante sur les innovations en robotique et électronique de pointe.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-32 bg-card/30">
        <div className="container max-w-2xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4 uppercase">POINT DE CONTACT</h2>
            <p className="text-muted-foreground font-light">Établir une communication stratégique pour une alternance.</p>
          </div>

          <Card className="bg-background border-white/10 rounded-none p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 relative z-10">
                <div className="grid md:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-mono text-muted-foreground uppercase">Nom / Organisation</FormLabel>
                        <FormControl>
                          <Input placeholder="IDENTIFIANT" {...field} className="rounded-none border-white/10 bg-white/5 focus:border-primary transition-colors h-12" />
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
                        <FormLabel className="text-[10px] font-mono text-muted-foreground uppercase">Point de Contact</FormLabel>
                        <FormControl>
                          <Input placeholder="EMAIL" {...field} className="rounded-none border-white/10 bg-white/5 focus:border-primary transition-colors h-12" />
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
                      <FormLabel className="text-[10px] font-mono text-muted-foreground uppercase">Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="VOTRE MESSAGE..." {...field} className="rounded-none border-white/10 bg-white/5 focus:border-primary transition-colors min-h-[150px] resize-none" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-bold tracking-widest rounded-none h-14">
                  TRANSMETTRE
                </Button>
              </form>
            </Form>
          </Card>
        </div>
      </section>
    </Layout>
  );
}