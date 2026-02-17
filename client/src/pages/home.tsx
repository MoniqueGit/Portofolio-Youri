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
import { Cpu, Shield, Code, Radio, Server, Send, Download, User, Briefcase, GraduationCap, Lightbulb, CheckCircle2, ChevronRight, Terminal, Box } from "lucide-react";

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
      {/* HERO SECTION - RESTRUCTURED */}
      <section className="relative min-h-[90vh] flex items-center px-8 md:px-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBg} 
            alt="Technical Background" 
            className="w-full h-full object-cover opacity-10 grayscale brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
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
            <h1 className="text-6xl md:text-9xl font-display font-bold tracking-tighter mb-8 leading-[0.9]">
              ALEXANDRE <br />
              <span className="text-primary/60 italic font-light">DURAND</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl font-light leading-relaxed mb-12 border-l border-white/10 pl-8">
              Conception de systèmes critiques et robotique avancée. Étudiant en BUT GEII à la recherche d'une alternance stratégique.
            </p>
            <div className="flex flex-wrap gap-6">
              <Button size="lg" className="bg-primary hover:bg-primary/80 text-white font-bold tracking-wider rounded-none px-12 h-16 flex items-center gap-3 border border-white/10 group">
                <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform" /> TÉLÉCHARGER MON CV PDF
              </Button>
              <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/5 rounded-none px-12 h-16 flex items-center gap-3" asChild>
                <a href="#contact">
                  <Send className="w-5 h-5" /> PRENDRE CONTACT
                </a>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* HUD Decoration */}
        <div className="absolute bottom-20 right-20 hidden xl:block">
          <div className="font-mono text-[10px] text-primary/40 space-y-2">
            <div className="flex justify-between gap-8"><span>STATUS</span> <span className="text-primary">NOMINAL</span></div>
            <div className="flex justify-between gap-8"><span>LOAD_FACTOR</span> <span>0.24</span></div>
            <div className="flex justify-between gap-8"><span>LATENCY</span> <span>12ms</span></div>
          </div>
        </div>
      </section>

      {/* SECTION WRAPPER FOR EXTENSIBILITY */}
      <div className="space-y-32 py-32">
        
        {/* QUI SUIS-JE */}
        <section id="about" className="container max-w-5xl mx-auto px-8 scroll-mt-24">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">
            <div className="sticky top-32">
              <div className="flex items-center gap-4 mb-6">
                <User className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-display font-bold uppercase tracking-widest">Qui suis-je ?</h2>
              </div>
              <div className="h-[2px] w-12 bg-primary/30" />
            </div>
            <div className="space-y-8">
              <div className="text-xl text-muted-foreground leading-relaxed font-light">
                Passionné par les technologies de pointe, j'évolue à l'intersection du <strong>business</strong>, de la <strong>défense</strong> et de la <strong>robotique</strong>. Mon parcours en BUT GEII m'a permis de forger une expertise technique tout en gardant une vision globale des enjeux industriels.
              </div>
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="p-6 border border-white/5 bg-white/5 rounded-sm">
                  <h3 className="font-mono text-xs text-primary mb-3 uppercase tracking-widest">Vision</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">Innover pour la sécurité et l'autonomie technologique de demain.</p>
                </div>
                <div className="p-6 border border-white/5 bg-white/5 rounded-sm">
                  <h3 className="font-mono text-xs text-primary mb-3 uppercase tracking-widest">Engagement</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">Rigueur absolue dans le développement de systèmes critiques.</p>
                </div>
              </div>
              {/* Espacement pour futur contenu */}
              <div className="pt-8 opacity-40 italic text-sm">Plus d'informations à venir sur mon parcours personnel...</div>
            </div>
          </div>
        </section>

        {/* EXPÉRIENCES PROFESSIONNELLES */}
        <section id="exp" className="container max-w-5xl mx-auto px-8 scroll-mt-24">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">
            <div className="sticky top-32">
              <div className="flex items-center gap-4 mb-6">
                <Briefcase className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-display font-bold uppercase tracking-widest">Expériences</h2>
              </div>
              <div className="h-[2px] w-12 bg-primary/30" />
            </div>
            <div className="space-y-12">
              {[
                { 
                  role: "Stagiaire Développeur Embarqué", 
                  company: "TECH-DEFENSE SOLUTIONS", 
                  date: "2025", 
                  tags: ["STM32", "C++", "Défense"],
                  desc: "Mise en place d'unités de traitement pour capteurs haute précision. Collaboration étroite avec les ingénieurs systèmes." 
                },
                { 
                  role: "Projet R&D Drone", 
                  company: "AERO-LAB INNOVATION", 
                  date: "2024", 
                  tags: ["LoRa", "Python", "Robotique"],
                  desc: "Développement d'un module de communication longue portée avec cryptage de données temps réel." 
                }
              ].map((exp, i) => (
                <div key={i} className="group border-b border-white/5 pb-12 last:border-0">
                  <div className="flex justify-between items-baseline mb-4">
                    <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">{exp.role}</h3>
                    <span className="font-mono text-xs text-muted-foreground">{exp.date}</span>
                  </div>
                  <div className="text-primary font-mono text-xs mb-6 tracking-widest">{exp.company}</div>
                  <p className="text-muted-foreground leading-relaxed mb-6">{exp.desc}</p>
                  <div className="flex gap-2">
                    {exp.tags.map(t => <Badge key={t} variant="outline" className="rounded-none border-white/10 text-[10px]">{t}</Badge>)}
                  </div>
                </div>
              ))}
              {/* Slot pour futur contenu */}
              <div className="h-24 border border-dashed border-white/10 flex items-center justify-center text-muted-foreground/30 text-xs font-mono">
                [ EMPLACEMENT LIBRE : NOUVELLES MISSIONS À VENIR ]
              </div>
            </div>
          </div>
        </section>

        {/* FORMATIONS */}
        <section id="edu" className="container max-w-5xl mx-auto px-8 scroll-mt-24">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">
            <div className="sticky top-32">
              <div className="flex items-center gap-4 mb-6">
                <GraduationCap className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-display font-bold uppercase tracking-widest">Formations</h2>
              </div>
              <div className="h-[2px] w-12 bg-primary/30" />
            </div>
            <div className="space-y-8">
              <div className="p-8 border border-white/5 bg-white/5 relative group">
                <div className="absolute top-0 left-0 w-[2px] h-0 bg-primary group-hover:h-full transition-all duration-500" />
                <h3 className="text-2xl font-bold mb-2">BUT GEII</h3>
                <div className="text-primary font-mono text-xs mb-6 uppercase tracking-[0.2em]">Génie Électrique et Informatique Industrielle</div>
                <p className="text-muted-foreground leading-relaxed">IUT de Ville d'Avray - Université Paris Nanterre. Spécialisation en électronique de puissance et systèmes embarqués autonomes.</p>
              </div>
              <div className="h-32 border border-dashed border-white/10 flex items-center justify-center text-muted-foreground/30 text-xs font-mono">
                [ EMPLACEMENT LIBRE : CERTIFICATIONS & FORMATIONS COMPLÉMENTAIRES ]
              </div>
            </div>
          </div>
        </section>

        {/* COMPÉTENCES - Grid Style */}
        <section id="skills" className="container max-w-6xl mx-auto px-8 scroll-mt-24">
          <div className="text-center mb-20">
            <span className="font-mono text-[10px] text-primary tracking-[0.4em] uppercase mb-4 block">Capabilities Matrix</span>
            <h2 className="text-4xl font-display font-bold uppercase">Compétences</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Languages", icon: <Code className="w-5 h-5" />, list: ["C / C++", "Python", "Assembly", "VHDL"] },
              { title: "Embedded", icon: <Cpu className="w-5 h-5" />, list: ["STM32", "FPGA", "RTOS", "UART/CAN"] },
              { title: "Robotics", icon: <Box className="w-5 h-5" />, list: ["Control Systems", "Lidar/IMU", "OpenCV", "ROS"] },
              { title: "Professional", icon: <Shield className="w-5 h-5" />, list: ["Agile", "Git", "Security", "Strategy"] }
            ].map((cat, i) => (
              <div key={i} className="p-8 border border-white/5 bg-white/5 hover:border-primary/30 transition-all group">
                <div className="text-primary mb-6 group-hover:scale-110 transition-transform inline-block">{cat.icon}</div>
                <h3 className="font-display font-bold text-lg mb-6 uppercase tracking-wider">{cat.title}</h3>
                <ul className="space-y-3">
                  {cat.list.map(item => (
                    <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground group-hover:text-white transition-colors">
                      <ChevronRight className="w-3 h-3 text-primary/40" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* PROJETS */}
        <section id="projects" className="container max-w-6xl mx-auto px-8 scroll-mt-24">
          <div className="flex items-center justify-between mb-16">
            <h2 className="text-4xl font-display font-bold uppercase tracking-tight">Projets</h2>
            <div className="h-[1px] flex-1 mx-8 bg-white/5" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, i) => (
              <Card key={i} className="bg-white/5 border-white/10 rounded-none overflow-hidden group hover:border-primary/50 transition-all">
                 <div className="h-48 bg-secondary/50 flex items-center justify-center border-b border-white/5">
                   <Terminal className="w-12 h-12 text-primary/20 group-hover:text-primary/40 transition-colors" />
                 </div>
                 <CardHeader>
                   <CardTitle className="text-xl group-hover:text-primary transition-colors">PROJET_{i+1}</CardTitle>
                 </CardHeader>
                 <CardContent>
                   <p className="text-sm text-muted-foreground italic mb-4">Documentation technique en cours de rédaction...</p>
                   <div className="flex gap-2">
                     <Badge variant="secondary" className="rounded-none text-[8px]">EMBEDDED</Badge>
                     <Badge variant="secondary" className="rounded-none text-[8px]">ROBOTICS</Badge>
                   </div>
                 </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* POURQUOI ME CHOISIR ? */}
        <section id="why" className="container max-w-4xl mx-auto px-8 py-32 bg-primary/5 border-y border-primary/10 scroll-mt-24 text-center">
          <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-8" />
          <h2 className="text-4xl font-display font-bold mb-12 uppercase tracking-widest">Pourquoi me choisir ?</h2>
          <div className="grid md:grid-cols-2 gap-12 text-left">
            <div className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-3"><span className="text-primary">01.</span> Expertise Technique</h3>
              <p className="text-muted-foreground font-light leading-relaxed">Une base solide en GEII couplée à une curiosité insatiable pour les systèmes complexes et les nouvelles technologies.</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-3"><span className="text-primary">02.</span> Vision Stratégique</h3>
              <p className="text-muted-foreground font-light leading-relaxed">Je ne code pas seulement, je cherche à comprendre l'impact business et sécuritaire de chaque ligne de code.</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-3"><span className="text-primary">03.</span> Adaptabilité</h3>
              <p className="text-muted-foreground font-light leading-relaxed">Capable de passer du développement bas-niveau à la gestion de projet en environnement agile.</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-3"><span className="text-primary">04.</span> Passion Défense</h3>
              <p className="text-muted-foreground font-light leading-relaxed">Une motivation intrinsèque pour les enjeux de souveraineté et les technologies de défense de pointe.</p>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="container max-w-2xl mx-auto px-8 scroll-mt-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4 uppercase">Uplink</h2>
            <p className="text-muted-foreground font-light">Canal de communication sécurisé.</p>
          </div>
          <Card className="bg-background border-white/10 rounded-none p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-primary/50" />
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-mono text-muted-foreground uppercase">Identité</FormLabel>
                        <FormControl>
                          <Input placeholder="VOTRE NOM" {...field} className="rounded-none border-white/10 bg-white/5 focus:border-primary h-12" />
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
                        <FormLabel className="text-[10px] font-mono text-muted-foreground uppercase">Contact</FormLabel>
                        <FormControl>
                          <Input placeholder="EMAIL" {...field} className="rounded-none border-white/10 bg-white/5 focus:border-primary h-12" />
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
                      <FormLabel className="text-[10px] font-mono text-muted-foreground uppercase">Payload</FormLabel>
                      <FormControl>
                        <Textarea placeholder="VOTRE MESSAGE..." {...field} className="rounded-none border-white/10 bg-white/5 focus:border-primary min-h-[150px] resize-none" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-primary hover:bg-primary/80 text-white font-bold tracking-widest rounded-none h-14">
                  TRANSMETTRE
                </Button>
              </form>
            </Form>
          </Card>
        </section>

      </div>
    </Layout>
  );
}