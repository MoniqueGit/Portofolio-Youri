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
import { Cpu, Shield, Crosshair, Code, Radio, Server, Send, Download, ArrowUpRight, Zap, Target } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Invalid format"),
  message: z.string().min(10, "Message required"),
});

export default function Home() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  function onSubmit() {
    toast({ title: "MESSAGE SENT", description: "Communication established." });
    form.reset();
  }

  const capabilities = [
    { name: "Embedded Engineering", level: "Senior Grade", desc: "C/C++, STM32, RTOS specialized architecture.", icon: <Cpu className="w-5 h-5" /> },
    { name: "Defense Systems", level: "Specialist", desc: "UAV control systems and secure telemetry links.", icon: <Shield className="w-5 h-5" /> },
    { name: "Robotics & AI", level: "Expertise", desc: "Autonomous navigation and edge computer vision.", icon: <Zap className="w-5 h-5" /> },
    { name: "System Integration", level: "Core", desc: "Hardware-software bridging and protocol design.", icon: <Server className="w-5 h-5" /> },
  ];

  return (
    <Layout>
      {/* HERO - Minimalist & Powerful */}
      <section className="relative h-[80vh] flex items-center px-8 md:px-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBg} 
            alt="Technical Background" 
            className="w-full h-full object-cover opacity-10 grayscale brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        </div>

        <div className="container relative z-10 max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1px] w-8 bg-primary" />
              <span className="font-mono text-[10px] tracking-[0.4em] text-primary uppercase">Innovation & Engineering</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tight mb-8">
              ALEXANDRE <br />
              <span className="text-muted-foreground/40">DURAND</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl font-light leading-relaxed mb-10">
              Conception de systèmes embarqués critiques pour la défense, l'aéronautique et la robotique avancée.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-background font-bold tracking-wider rounded-none px-10">
                PROJET PORTFOLIO
              </Button>
              <Button variant="outline" size="lg" className="border-white/10 text-white hover:bg-white/5 rounded-none px-10">
                ME CONTACTER
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STRATEGY - Professional & Business focused */}
      <section id="strategy" className="py-32 border-y border-white/5">
        <div className="container max-w-6xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl font-display font-bold mb-8">STRATÉGIE DE DÉVELOPPEMENT</h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  Mon approche combine la rigueur de l'ingénierie électronique avec une vision stratégique du secteur de la défense. Je m'attache à transformer des besoins technologiques complexes en solutions embarquées fiables et souveraines.
                </p>
                <div className="grid grid-cols-2 gap-8 pt-6">
                  <div>
                    <div className="text-primary font-display text-3xl font-bold mb-1">01.</div>
                    <div className="text-white font-semibold text-sm mb-2">PRÉCISION</div>
                    <p className="text-xs">Optimisation bas niveau pour des performances maximales.</p>
                  </div>
                  <div>
                    <div className="text-primary font-display text-3xl font-bold mb-1">02.</div>
                    <div className="text-white font-semibold text-sm mb-2">RÉSILIENCE</div>
                    <p className="text-xs">Conception sécurisée pour environnements critiques.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="glass-panel p-10 relative group">
              <div className="absolute top-0 right-0 p-4">
                <Target className="w-10 h-10 text-primary/20 group-hover:text-primary/40 transition-colors" />
              </div>
              <h3 className="font-display font-bold text-xl mb-6">RECHERCHE D'ALTERNANCE</h3>
              <p className="text-sm text-muted-foreground mb-8">
                Disponible à partir de Septembre 2026 pour intégrer un département R&D spécialisé en systèmes autonomes ou technologies de défense.
              </p>
              <Button variant="link" className="text-primary p-0 h-auto font-mono text-xs tracking-widest flex items-center gap-2">
                VOIR MON PARCOURS <ArrowUpRight className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CAPABILITIES - Skills Grid */}
      <section id="capabilities" className="py-32">
        <div className="container max-w-6xl mx-auto px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div>
              <span className="font-mono text-[10px] text-primary tracking-[0.4em] uppercase mb-4 block">Core Arsenal</span>
              <h2 className="text-4xl font-display font-bold">COMPÉTENCES TECHNIQUES</h2>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="rounded-none border-white/5 bg-white/5 py-1 px-4 text-[10px] font-mono">HARDWARE</Badge>
              <Badge variant="outline" className="rounded-none border-white/5 bg-white/5 py-1 px-4 text-[10px] font-mono">SOFTWARE</Badge>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((cap, i) => (
              <motion.div
                key={cap.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group border border-white/5 p-8 hover:bg-white/5 transition-all duration-500"
              >
                <div className="w-12 h-12 border border-primary/20 flex items-center justify-center mb-6 group-hover:border-primary transition-colors">
                  <div className="text-primary">{cap.icon}</div>
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{cap.name}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {cap.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT - Corporate Terminal */}
      <section id="contact" className="py-32 bg-card/30">
        <div className="container max-w-4xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">REJOINDRE LE RÉSEAU</h2>
            <p className="text-muted-foreground font-light italic">Discussion stratégique ou opportunités de collaboration.</p>
          </div>

          <Card className="bg-background border-white/5 rounded-none p-8 md:p-12 relative overflow-hidden">
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
                      <FormLabel className="text-[10px] font-mono text-muted-foreground uppercase">Objet de la Communication</FormLabel>
                      <FormControl>
                        <Textarea placeholder="VOTRE MESSAGE..." {...field} className="rounded-none border-white/10 bg-white/5 focus:border-primary transition-colors min-h-[150px] resize-none" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-background font-bold tracking-widest rounded-none h-14">
                  ENVOYER LE MESSAGE
                </Button>
              </form>
            </Form>
          </Card>
        </div>
      </section>
    </Layout>
  );
}