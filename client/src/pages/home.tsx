import { motion } from "framer-motion";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import heroBg from "@/assets/hero-bg.png";
import {
  Cpu, Shield, Code, Send, Download, User, Briefcase,
  GraduationCap, ChevronRight, Terminal, Wrench, Globe,
  Linkedin, Mail, Phone, MapPin, ExternalLink, Zap, Mountain, Dumbbell, Laptop
} from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Nom requis"),
  email: z.string().email("Format invalide"),
  message: z.string().min(10, "Message trop court"),
});

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

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
      {/* ─── HERO ─── */}
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
              <span className="font-mono text-[10px] tracking-[0.4em] text-primary uppercase">
                Systèmes Embarqués // Électronique // Défense
              </span>
            </div>
            <h1 className="text-6xl md:text-9xl font-display font-bold tracking-tighter mb-4 leading-[0.9]">
              YOURI <br />
              <span className="text-primary/60 italic font-light">FIGUIÉ</span>
            </h1>
            <p className="font-mono text-xs text-muted-foreground mb-6 tracking-widest">
              Étudiant BUT1 GEII · Alternance 2026–2028 · Montpellier
            </p>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl font-light leading-relaxed mb-12 border-l border-white/10 pl-8">
              En formation en Génie Électrique et Informatique Industrielle, je cherche une alternance pour mêler théorie et pratique dans les systèmes embarqués, l'électronique et la robotique.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/80 text-white font-bold tracking-wider rounded-none px-10 h-14 flex items-center gap-3 border border-white/10 group"
                asChild
              >
                <a href="mailto:youri.figuie@etu.umontpellier.fr">
                  <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                  TÉLÉCHARGER MON CV
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/20 text-white hover:bg-white/5 rounded-none px-10 h-14 flex items-center gap-3"
                asChild
              >
                <a href="https://linkedin.com/in/youri-fg/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-5 h-5" /> LINKEDIN
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/20 text-white hover:bg-white/5 rounded-none px-10 h-14 flex items-center gap-3"
                asChild
              >
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
            <div className="flex justify-between gap-8"><span>STATUT</span><span className="text-primary">RECHERCHE ACTIVE</span></div>
            <div className="flex justify-between gap-8"><span>CIBLE</span><span>ALTERNANCE 2026–2028</span></div>
            <div className="flex justify-between gap-8"><span>LOCALISATION</span><span>MONTPELLIER 34</span></div>
          </div>
        </div>
      </section>

      {/* ─── SECTIONS ─── */}
      <div className="space-y-32 py-32">

        {/* ─── QUI SUIS-JE ─── */}
        <motion.section
          id="about"
          className="container max-w-5xl mx-auto px-8 scroll-mt-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">
            <motion.div className="sticky top-32" variants={fadeInUp}>
              <div className="flex items-center gap-4 mb-6">
                <User className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-display font-bold uppercase tracking-widest">Qui suis-je ?</h2>
              </div>
              <div className="h-[2px] w-12 bg-primary/30" />
            </motion.div>

            <div className="space-y-8">
              <motion.p className="text-xl text-muted-foreground leading-relaxed font-light" variants={fadeInUp}>
                Technicien supérieur en formation en <strong className="text-white">Génie Électrique et Informatique Industrielle</strong> à l'IUT de Montpellier, je souhaite me spécialiser dans les <strong className="text-white">systèmes embarqués</strong>. Je recherche activement une alternance afin de mêler théorie et pratique sur le terrain.
              </motion.p>

              <motion.div className="grid sm:grid-cols-2 gap-6" variants={stagger}>
                <motion.div className="p-6 border border-white/5 bg-white/5 rounded-sm" variants={fadeInUp}>
                  <h3 className="font-mono text-xs text-primary mb-3 uppercase tracking-widest">Qualités</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2"><ChevronRight className="w-3 h-3 text-primary/40" /> Rigoureux &amp; Curieux</li>
                    <li className="flex items-center gap-2"><ChevronRight className="w-3 h-3 text-primary/40" /> En quête d'apprentissage constant</li>
                  </ul>
                </motion.div>
                <motion.div className="p-6 border border-white/5 bg-white/5 rounded-sm" variants={fadeInUp}>
                  <h3 className="font-mono text-xs text-primary mb-3 uppercase tracking-widest">Langues</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2"><ChevronRight className="w-3 h-3 text-primary/40" /> Français — Natif</li>
                    <li className="flex items-center gap-2"><ChevronRight className="w-3 h-3 text-primary/40" /> Anglais — B2 Technique</li>
                  </ul>
                </motion.div>
                <motion.div className="p-6 border border-white/5 bg-white/5 rounded-sm" variants={fadeInUp}>
                  <h3 className="font-mono text-xs text-primary mb-3 uppercase tracking-widest">Centres d'intérêt</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2"><Mountain className="w-3 h-3 text-primary/40" /> Bivouac / Randonnée</li>
                    <li className="flex items-center gap-2"><Dumbbell className="w-3 h-3 text-primary/40" /> Musculation</li>
                    <li className="flex items-center gap-2"><Laptop className="w-3 h-3 text-primary/40" /> Nouvelles technologies</li>
                  </ul>
                </motion.div>
                <motion.div className="p-6 border border-white/5 bg-white/5 rounded-sm" variants={fadeInUp}>
                  <h3 className="font-mono text-xs text-primary mb-3 uppercase tracking-widest">Infos</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2"><MapPin className="w-3 h-3 text-primary/40" /> Prades-Le-Lez (34)</li>
                    <li className="flex items-center gap-2"><ChevronRight className="w-3 h-3 text-primary/40" /> 19 ans · Permis B</li>
                    <li className="flex items-center gap-2"><ChevronRight className="w-3 h-3 text-primary/40" /> Alternance 2026–2028</li>
                  </ul>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* ─── EXPÉRIENCES ─── */}
        <motion.section
          id="exp"
          className="container max-w-5xl mx-auto px-8 scroll-mt-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">
            <motion.div className="sticky top-32" variants={fadeInUp}>
              <div className="flex items-center gap-4 mb-6">
                <Briefcase className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-display font-bold uppercase tracking-widest">Expériences</h2>
              </div>
              <div className="h-[2px] w-12 bg-primary/30" />
            </motion.div>

            <div className="space-y-12">
              {[
                {
                  role: "Réserviste Opérationnel",
                  company: "ARMÉE DE TERRE — 3e RPIMa · Carcassonne",
                  date: "2025 — Présent",
                  tags: ["Défense", "Discipline", "Engagement"],
                  bullets: [
                    "Travail en environnement contraint et exigeant",
                    "Respect des procédures et consignes techniques",
                    "Réactivité et prise de décision sous pression",
                    "Cohésion d'équipe et fiabilité opérationnelle",
                  ],
                },
                {
                  role: "Figurant",
                  company: "FRANCE TÉLÉVISIONS — « Karma - Trop jeunes pour se taire »",
                  date: "2025 — 2026",
                  tags: ["Travail en équipe", "Adaptabilité", "Professionnel"],
                  bullets: [
                    "Adaptation rapide aux contraintes terrain",
                    "Travail en équipe pluridisciplinaire",
                    "Respect des consignes techniques et organisationnelles",
                  ],
                },
              ].map((exp, i) => (
                <motion.div key={i} className="group border-b border-white/5 pb-12 last:border-0" variants={fadeInUp}>
                  <div className="flex justify-between items-baseline mb-3 flex-wrap gap-2">
                    <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">{exp.role}</h3>
                    <span className="font-mono text-xs text-muted-foreground">{exp.date}</span>
                  </div>
                  <div className="text-primary font-mono text-xs mb-6 tracking-widest">{exp.company}</div>
                  <ul className="space-y-2 mb-6">
                    {exp.bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <ChevronRight className="w-3 h-3 text-primary/40 mt-0.5 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-2 flex-wrap">
                    {exp.tags.map(t => (
                      <Badge key={t} variant="outline" className="rounded-none border-white/10 text-[10px]">{t}</Badge>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ─── FORMATIONS ─── */}
        <motion.section
          id="edu"
          className="container max-w-5xl mx-auto px-8 scroll-mt-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">
            <motion.div className="sticky top-32" variants={fadeInUp}>
              <div className="flex items-center gap-4 mb-6">
                <GraduationCap className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-display font-bold uppercase tracking-widest">Formations</h2>
              </div>
              <div className="h-[2px] w-12 bg-primary/30" />
            </motion.div>

            <div className="space-y-6">
              {[
                {
                  degree: "BUT Génie Électrique et Informatique Industrielle",
                  school: "IUT Montpellier",
                  period: "2025 — Présent",
                  detail: "Spécialisation systèmes embarqués et électronique de puissance.",
                },
                {
                  degree: "Baccalauréat Général — Mathématiques & NSI",
                  school: "Lycée Jean Jaurès",
                  period: "2022 — 2025",
                  detail: "Mention Assez Bien.",
                },
              ].map((edu, i) => (
                <motion.div key={i} className="p-8 border border-white/5 bg-white/5 relative group" variants={fadeInUp}>
                  <div className="absolute top-0 left-0 w-[2px] h-0 bg-primary group-hover:h-full transition-all duration-500" />
                  <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                    <h3 className="text-xl font-bold">{edu.degree}</h3>
                    <span className="font-mono text-xs text-muted-foreground">{edu.period}</span>
                  </div>
                  <div className="text-primary font-mono text-xs mb-3 uppercase tracking-[0.2em]">{edu.school}</div>
                  <p className="text-sm text-muted-foreground">{edu.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ─── COMPÉTENCES ─── */}
        <motion.section
          id="skills"
          className="container max-w-6xl mx-auto px-8 scroll-mt-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div className="text-center mb-20" variants={fadeInUp}>
            <span className="font-mono text-[10px] text-primary tracking-[0.4em] uppercase mb-4 block">Capabilities Matrix</span>
            <h2 className="text-4xl font-display font-bold uppercase">Compétences</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: "Langages",
                icon: <Code className="w-5 h-5" />,
                list: ["C / C++", "Python", "HTML"],
              },
              {
                title: "Embarqué",
                icon: <Cpu className="w-5 h-5" />,
                list: ["STM32", "Électronique", "Soudure PCB"],
              },
              {
                title: "Outils",
                icon: <Wrench className="w-5 h-5" />,
                list: ["n8n (automation)", "Git", "Linux"],
              },
              {
                title: "Savoir-être",
                icon: <Shield className="w-5 h-5" />,
                list: ["Travail en équipe", "Rigueur", "Permis B"],
              },
            ].map((cat, i) => (
              <motion.div
                key={i}
                className="p-8 border border-white/5 bg-white/5 hover:border-primary/30 transition-all group"
                variants={fadeInUp}
              >
                <div className="text-primary mb-6 group-hover:scale-110 transition-transform inline-block">{cat.icon}</div>
                <h3 className="font-display font-bold text-lg mb-6 uppercase tracking-wider">{cat.title}</h3>
                <ul className="space-y-3">
                  {cat.list.map(item => (
                    <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground group-hover:text-white transition-colors">
                      <ChevronRight className="w-3 h-3 text-primary/40" /> {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ─── PROJETS ─── */}
        <motion.section
          id="projects"
          className="container max-w-6xl mx-auto px-8 scroll-mt-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div className="flex items-center justify-between mb-16" variants={fadeInUp}>
            <h2 className="text-4xl font-display font-bold uppercase tracking-tight">Projets Académiques</h2>
            <div className="h-[1px] flex-1 mx-8 bg-white/5" />
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Dé Électronique",
                icon: <Zap className="w-10 h-10 text-primary/30 group-hover:text-primary/60 transition-colors" />,
                desc: "Conception d'un circuit électronique complet : intégration des composants, tests de fonctionnement et correction de bugs électroniques.",
                tags: ["Électronique", "PCB", "Hardware"],
              },
              {
                title: "Carte STM32",
                icon: <Cpu className="w-10 h-10 text-primary/30 group-hover:text-primary/60 transition-colors" />,
                desc: "Assemblage et soudure d'une carte STM32, contrôle des connexions et validation du fonctionnement en langage C (STMicroelectronics).",
                tags: ["STM32", "C", "Embarqué"],
              },
              {
                title: "Robot Suiveur de Ligne",
                icon: <Terminal className="w-10 h-10 text-primary/30 group-hover:text-primary/60 transition-colors" />,
                desc: "Conception d'un robot analogique avec capteurs de ligne, réglages électroniques fins et tests prototype jusqu'à validation terrain.",
                tags: ["Robotique", "Capteurs", "Analogique"],
              },
            ].map((project, i) => (
              <motion.div
                key={i}
                className="border border-white/10 bg-white/5 rounded-none overflow-hidden group hover:border-primary/50 transition-all"
                variants={fadeInUp}
              >
                <div className="h-40 bg-secondary/50 flex items-center justify-center border-b border-white/5">
                  {project.icon}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{project.desc}</p>
                  <div className="flex gap-2 flex-wrap">
                    {project.tags.map(t => (
                      <Badge key={t} variant="secondary" className="rounded-none text-[10px]">{t}</Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ─── POURQUOI ME CHOISIR ─── */}
        <motion.section
          id="why"
          className="container max-w-4xl mx-auto px-8 py-24 bg-primary/5 border-y border-primary/10 scroll-mt-24 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeInUp}>
            <Globe className="w-10 h-10 text-primary mx-auto mb-8" />
            <h2 className="text-4xl font-display font-bold mb-12 uppercase tracking-widest">Pourquoi me choisir ?</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-10 text-left">
            {[
              {
                num: "01.",
                title: "Formation terrain dès le départ",
                desc: "BUT GEII à l'IUT Montpellier avec des projets concrets dès la première année : circuits, STM32, robotique. Pas que de la théorie.",
              },
              {
                num: "02.",
                title: "Discipline & rigueur militaire",
                desc: "Réserviste au 3e RPIMa : respect des procédures, réactivité sous pression, fiabilité. Des qualités rares à 19 ans.",
              },
              {
                num: "03.",
                title: "Curiosité et autonomie",
                desc: "Apprentissage autodidacte de l'automatisation n8n, maîtrise de Python et C++. Je ne m'arrête pas au programme de cours.",
              },
              {
                num: "04.",
                title: "Motivation claire",
                desc: "Défense, systèmes embarqués, robotique : pas une reconversion, une vocation. Je sais exactement où je veux aller.",
              },
            ].map((item, i) => (
              <motion.div key={i} className="space-y-3" variants={fadeInUp}>
                <h3 className="text-xl font-bold flex items-center gap-3">
                  <span className="text-primary font-mono text-sm">{item.num}</span> {item.title}
                </h3>
                <p className="text-muted-foreground font-light leading-relaxed text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ─── CONTACT ─── */}
        <motion.section
          id="contact"
          className="container max-w-2xl mx-auto px-8 scroll-mt-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div className="text-center mb-12" variants={fadeInUp}>
            <h2 className="text-4xl font-display font-bold mb-4 uppercase">Uplink</h2>
            <p className="text-muted-foreground font-light mb-8">Canal de communication direct.</p>

            {/* Liens de contact directs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <a
                href="mailto:youri.figuie@etu.umontpellier.fr"
                className="flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-primary transition-colors border border-white/10 px-4 py-2 hover:border-primary/30"
              >
                <Mail className="w-3 h-3" /> youri.figuie@etu.umontpellier.fr
              </a>
              <a
                href="tel:0647209158"
                className="flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-primary transition-colors border border-white/10 px-4 py-2 hover:border-primary/30"
              >
                <Phone className="w-3 h-3" /> 06 47 20 91 58
              </a>
              <a
                href="https://linkedin.com/in/youri-fg/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-primary transition-colors border border-white/10 px-4 py-2 hover:border-primary/30"
              >
                <Linkedin className="w-3 h-3" /> linkedin.com/in/youri-fg
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </motion.div>

          <motion.div
            className="bg-background border border-white/10 rounded-none p-8 relative overflow-hidden"
            variants={fadeInUp}
          >
            <div className="absolute top-0 left-0 w-full h-[1px] bg-primary/50" />
            <p className="text-xs font-mono text-muted-foreground mb-6 text-center uppercase tracking-widest">— ou via le formulaire —</p>
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
                        <FormLabel className="text-[10px] font-mono text-muted-foreground uppercase">Email</FormLabel>
                        <FormControl>
                          <Input placeholder="VOTRE EMAIL" {...field} className="rounded-none border-white/10 bg-white/5 focus:border-primary h-12" />
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
          </motion.div>
        </motion.section>

      </div>
    </Layout>
  );
}
