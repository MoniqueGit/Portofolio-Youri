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

// Préfixe automatique pour les assets public/ selon l'environnement (dev vs gh-pages)
const b = import.meta.env.BASE_URL;
const PHOTOS = {
  profil:     `${b}photo-profil.jpg`,
  reserviste: `${b}photo-reserviste.jpg`,
};
import {
  Cpu, Shield, Code, Send, Download, User, Briefcase,
  GraduationCap, ChevronRight, Terminal, Wrench, Globe,
  Linkedin, Mail, Phone, MapPin, ExternalLink, Zap, Mountain, Dumbbell, Laptop,
  Wifi, LayoutDashboard, Shirt
} from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Nom requis"),
  email: z.string().email("Format invalide"),
  message: z.string().min(10, "Message trop court"),
});

// ── Motion Variants ──────────────────────────────────────────────────────────
const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

// Reusable animated accent line under section titles
function AccentLine({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      className="h-[2px] bg-primary/40"
      initial={{ width: 0 }}
      whileInView={{ width: 48 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}

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

          {/* Tag line — slides in first */}
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <motion.div
              className="h-[1px] bg-primary"
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
            <span className="font-mono text-[10px] tracking-[0.4em] text-primary uppercase">
              Systèmes Embarqués // Électronique // Défense
            </span>
          </motion.div>

          {/* H1 — large staggered entrance */}
          <motion.h1
            className="text-6xl md:text-9xl font-display font-bold tracking-tighter mb-4 leading-[0.9]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            YOURI <br />
            <span className="text-primary/60 italic font-light">FIGUIÉ</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="font-mono text-xs text-muted-foreground mb-6 tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            Étudiant BUT1 GEII · Alternance 2026–2028 · Montpellier
          </motion.p>

          {/* Description — slides from left */}
          <motion.p
            className="text-xl md:text-2xl text-white/75 max-w-2xl font-light leading-relaxed mb-12 border-l border-white/10 pl-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            En formation en Génie Électrique et Informatique Industrielle, je cherche une alternance
            pour mêler théorie et pratique dans les systèmes embarqués, l'électronique et la robotique.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/80 text-white font-bold tracking-wider rounded-none px-10 h-14 flex items-center gap-3 border border-white/10 group"
                asChild
              >
                <a href="/cv-youri-figuie.pdf" download="CV_Youri_Figuie.pdf">
                  <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300" />
                  TÉLÉCHARGER MON CV
                </a>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Button
                variant="outline"
                size="lg"
                className="border-white/20 text-white hover:bg-white/5 rounded-none px-10 h-14 flex items-center gap-3 group"
                asChild
              >
                <a href="https://linkedin.com/in/youri-fg/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" /> LINKEDIN
                </a>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Button
                variant="outline"
                size="lg"
                className="border-white/20 text-white hover:bg-white/5 rounded-none px-10 h-14 flex items-center gap-3 group"
                asChild
              >
                <a href="#contact">
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" /> PRENDRE CONTACT
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* HUD Decoration — fades in last, blinking cursor */}
        <motion.div
          className="absolute bottom-20 right-20 hidden xl:block"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <div className="font-mono text-[10px] text-primary/55 space-y-2">
            <div className="flex justify-between gap-8">
              <span>STATUT</span>
              <span className="text-primary cursor-blink">RECHERCHE ACTIVE</span>
            </div>
            <div className="flex justify-between gap-8"><span>CIBLE</span><span>ALTERNANCE 2026–2028</span></div>
            <div className="flex justify-between gap-8"><span>LOCALISATION</span><span>MONTPELLIER 34</span></div>
          </div>
        </motion.div>
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
            <motion.div className="sticky top-32" variants={fadeInLeft}>
              <div className="flex items-center gap-4 mb-6">
                <User className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-display font-bold uppercase tracking-widest">Qui suis-je ?</h2>
              </div>
              <AccentLine delay={0.3} />
            </motion.div>

            <div className="space-y-8">
              <motion.div className="flex flex-col sm:flex-row gap-6 items-start" variants={fadeInUp}>
                <div className="shrink-0 w-32 h-40 border border-white/15 overflow-hidden bg-white/5 relative group/photo">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <User className="w-10 h-10 text-white/10" />
                  </div>
                  <img
                    src={PHOTOS.profil}
                    alt="Youri Figuié"
                    className="w-full h-full object-cover relative z-10 transition-transform duration-500 group-hover/photo:scale-105"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>
                <p className="text-xl text-white/80 leading-relaxed font-light">
                  Technicien supérieur en formation en <strong className="text-white">Génie Électrique et Informatique Industrielle</strong> à l'IUT de Montpellier, je souhaite me spécialiser dans les <strong className="text-white">systèmes embarqués</strong>. Je recherche activement une alternance afin de mêler théorie et pratique en entreprise.
                </p>
              </motion.div>

              <motion.div className="grid sm:grid-cols-2 gap-6" variants={stagger}>
                {[
                  {
                    title: "Qualités",
                    items: [
                      { icon: <ChevronRight className="w-3 h-3 text-primary/70 shrink-0" />, text: "Rigoureux & Curieux" },
                      { icon: <ChevronRight className="w-3 h-3 text-primary/70 shrink-0" />, text: "En quête d'apprentissage constant" },
                    ],
                  },
                  {
                    title: "Langues",
                    items: [
                      { icon: <ChevronRight className="w-3 h-3 text-primary/70 shrink-0" />, text: "Français — Natif" },
                      { icon: <ChevronRight className="w-3 h-3 text-primary/70 shrink-0" />, text: "Anglais — B2 Technique" },
                    ],
                  },
                  {
                    title: "Centres d'intérêt",
                    items: [
                      { icon: <Mountain className="w-3 h-3 text-primary/70 shrink-0" />, text: "Bivouac / Randonnée" },
                      { icon: <Dumbbell className="w-3 h-3 text-primary/70 shrink-0" />, text: "Musculation" },
                      { icon: <Laptop className="w-3 h-3 text-primary/70 shrink-0" />, text: "Nouvelles technologies" },
                    ],
                  },
                  {
                    title: "Infos",
                    items: [
                      { icon: <MapPin className="w-3 h-3 text-primary/70 shrink-0" />, text: "Prades-Le-Lez (34)" },
                      { icon: <ChevronRight className="w-3 h-3 text-primary/70 shrink-0" />, text: "19 ans · Permis B" },
                      { icon: <ChevronRight className="w-3 h-3 text-primary/70 shrink-0" />, text: "Alternance 2026–2028" },
                    ],
                  },
                ].map((card) => (
                  <motion.div
                    key={card.title}
                    className="p-6 border border-white/10 bg-white/5 rounded-sm relative overflow-hidden group/card"
                    variants={scaleIn}
                    whileHover={{ y: -2, transition: { duration: 0.2 } }}
                  >
                    <div className="absolute inset-x-0 bottom-0 h-[1px] bg-primary/0 group-hover/card:bg-primary/25 transition-colors duration-300" />
                    <h3 className="font-mono text-xs text-primary mb-3 uppercase tracking-widest">{card.title}</h3>
                    <ul className="space-y-2 text-sm text-white/80">
                      {card.items.map((item, j) => (
                        <li key={j} className="flex items-center gap-2">{item.icon} {item.text}</li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* ─── ALTERNANCE ─── */}
        <motion.section
          id="alternance"
          className="container max-w-5xl mx-auto px-8 scroll-mt-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">
            <motion.div className="sticky top-32" variants={fadeInLeft}>
              <div className="flex items-center gap-4 mb-6">
                <Briefcase className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-display font-bold uppercase tracking-widest">Alternance</h2>
              </div>
              <AccentLine delay={0.3} />
              <p className="font-mono text-[10px] text-primary/60 uppercase tracking-widest mt-4">2026 — 2028</p>
            </motion.div>

            <div className="space-y-8">
              <motion.p className="text-xl text-white/80 leading-relaxed font-light" variants={fadeInUp}>
                L'alternance représente pour moi la meilleure façon d'apprendre : <strong className="text-white">confronter la théorie à la réalité professionnelle</strong>, prendre de vraies responsabilités et progresser dans un cadre professionnel structuré.
              </motion.p>

              <motion.div className="grid sm:grid-cols-2 gap-4" variants={stagger}>
                {[
                  {
                    title: "Goût du travail",
                    text: "J'aime produire quelque chose de concret. L'idée de contribuer à de vrais projets techniques, avec des enjeux réels, me motive davantage que n'importe quel cours magistral.",
                  },
                  {
                    title: "Indépendance",
                    text: "L'alternance me permet d'avancer vers l'autonomie financière et professionnelle. C'est une démarche active, pas subie — je veux construire ma place dans le monde professionnel.",
                  },
                ].map((card) => (
                  <motion.div
                    key={card.title}
                    className="p-6 border border-white/10 bg-white/5 rounded-sm relative overflow-hidden group/card"
                    variants={scaleIn}
                    whileHover={{ y: -2, transition: { duration: 0.2 } }}
                  >
                    <div className="absolute inset-x-0 bottom-0 h-[1px] bg-primary/0 group-hover/card:bg-primary/25 transition-colors duration-300" />
                    <h3 className="font-mono text-xs text-primary mb-3 uppercase tracking-widest">{card.title}</h3>
                    <p className="text-sm text-white/75 leading-relaxed">{card.text}</p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div className="border border-white/10 bg-white/5 p-6" variants={fadeInUp}>
                <h3 className="font-mono text-xs text-primary uppercase tracking-widest mb-5">Missions visées — Technicien Supérieur</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "R&D systèmes embarqués",
                    "Conception & test électronique",
                    "Développement firmware C / C++",
                    "Intégration capteurs / signaux",
                    "Robotique & automatisation",
                    "Validation & prototypage",
                  ].map(m => (
                    <motion.div key={m} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                      <Badge variant="outline" className="rounded-none border-white/15 text-xs text-white/80 py-1 hover:border-primary/30 hover:text-white transition-colors cursor-default">{m}</Badge>
                    </motion.div>
                  ))}
                </div>
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
            <motion.div className="sticky top-32" variants={fadeInLeft}>
              <div className="flex items-center gap-4 mb-6">
                <Briefcase className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-display font-bold uppercase tracking-widest">Expériences</h2>
              </div>
              <AccentLine delay={0.3} />
            </motion.div>

            <div className="space-y-12">
              {[
                {
                  role: "Réserviste Opérationnel",
                  company: "ARMÉE DE TERRE — 3e RPIMa · Carcassonne",
                  date: "2025 — Présent",
                  photo: PHOTOS.reserviste as string | undefined,
                  tags: ["Défense", "Discipline", "Engagement"],
                  bullets: [
                    "Engagement opérationnel au sein du 3e RPIMa avec application stricte des procédures et protocoles militaires",
                    "Développement de la réactivité et de la prise de décision rapide sous contrainte physique et temporelle",
                    "Travail en cohésion d'équipe dans des missions à hautes exigences : fiabilité, rigueur et engagement collectif",
                    "Acquisition de réflexes directement transposables en milieu industriel : discipline, sang-froid et respect des consignes de sécurité",
                  ],
                },
                {
                  role: "Hôte de Caisse Polyvalent",
                  company: "LOG'IN SOLUTIONS · Prades-Le-Lez",
                  date: "2024",
                  photo: undefined,
                  tags: ["Service client", "Rigueur", "Polyvalence"],
                  bullets: [
                    "Gestion autonome et rigoureuse des opérations de caisse : précision comptable et respect des procédures internes",
                    "Accueil et orientation des clients avec aisance relationnelle et sens du service",
                    "Polyvalence opérationnelle : adaptation aux différents postes et besoins de l'équipe selon les flux d'activité",
                  ],
                },
                {
                  role: "Figurant",
                  company: "FRANCE TÉLÉVISIONS — « Karma - Trop jeunes pour se taire »",
                  date: "2025 — 2026",
                  photo: undefined,
                  tags: ["Travail en équipe", "Adaptabilité", "Professionnel"],
                  bullets: [
                    "Participation à un tournage professionnel long format en interaction avec des équipes techniques et artistiques structurées",
                    "Adaptation immédiate aux directives de production dans un environnement à contraintes multiples (délais, organisation plateau)",
                    "Collaboration efficace avec des équipes pluridisciplinaires : réalisateurs, techniciens de plateau et comédiens",
                  ],
                },
              ].map((exp, i) => (
                <motion.div key={i} className="group border-b border-white/5 pb-12 last:border-0 relative" variants={fadeInUp}>
                  {/* Left border reveal on hover */}
                  <div className="absolute left-0 top-0 w-[2px] h-0 bg-primary group-hover:h-full transition-all duration-500" />
                  <div className={`pl-5 ${exp.photo ? "flex gap-6 items-start" : ""}`}>
                    <div className="flex-1">
                      <div className="flex justify-between items-baseline mb-3 flex-wrap gap-2">
                        <h3 className="text-2xl font-bold group-hover:text-primary transition-colors duration-300">{exp.role}</h3>
                        <span className="font-mono text-xs text-muted-foreground">{exp.date}</span>
                      </div>
                      <div className="text-primary font-mono text-xs mb-6 tracking-widest">{exp.company}</div>
                      <ul className="space-y-2 mb-6">
                        {exp.bullets.map((b, j) => (
                          <li key={j} className="flex items-start gap-3 text-sm text-white/80">
                            <ChevronRight className="w-3 h-3 text-primary/60 mt-0.5 shrink-0" />
                            {b}
                          </li>
                        ))}
                      </ul>
                      <div className="flex gap-2 flex-wrap">
                        {exp.tags.map(t => (
                          <Badge key={t} variant="outline" className="rounded-none border-white/10 text-[10px] hover:border-primary/30 transition-colors">{t}</Badge>
                        ))}
                      </div>
                    </div>
                    {exp.photo && (
                      <div className="shrink-0 w-44 h-52 border border-white/10 overflow-hidden hidden sm:block bg-white/5 relative group/photo">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <User className="w-6 h-6 text-white/10" />
                        </div>
                        <img
                          src={exp.photo}
                          alt={exp.role}
                          className="w-full h-full object-cover relative z-10 transition-transform duration-500 group-hover/photo:scale-105"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                      </div>
                    )}
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
            <motion.div className="sticky top-32" variants={fadeInLeft}>
              <div className="flex items-center gap-4 mb-6">
                <GraduationCap className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-display font-bold uppercase tracking-widest">Formations</h2>
              </div>
              <AccentLine delay={0.3} />
            </motion.div>

            <div className="space-y-6">
              {[
                {
                  degree: "BUT Génie Électrique et Informatique Industrielle",
                  school: "IUT Montpellier",
                  period: "2025 — Présent",
                  detail: "Spécialisation systèmes embarqués et électronique industrielle.",
                  modules: ["Programmation systèmes (C / Python)", "Électronique analogique & numérique", "Automatisme industriel", "Traitement du signal"],
                },
                {
                  degree: "Baccalauréat Général — Mathématiques & NSI",
                  school: "Lycée Jean Jaurès",
                  period: "2022 — 2025",
                  detail: "Mention Assez Bien.",
                  modules: [] as string[],
                },
              ].map((edu, i) => (
                <motion.div
                  key={i}
                  className="p-8 border border-white/5 bg-white/5 relative group"
                  variants={scaleIn}
                  whileHover={{ y: -2, transition: { duration: 0.2 } }}
                >
                  <div className="absolute top-0 left-0 w-[2px] h-0 bg-primary group-hover:h-full transition-all duration-500" />
                  <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                    <h3 className="text-xl font-bold">{edu.degree}</h3>
                    <span className="font-mono text-xs text-muted-foreground">{edu.period}</span>
                  </div>
                  <div className="text-primary font-mono text-xs mb-3 uppercase tracking-[0.2em]">{edu.school}</div>
                  <p className="text-sm text-white/70">{edu.detail}</p>
                  {edu.modules.length > 0 && (
                    <div className="mt-4">
                      <span className="font-mono text-[10px] text-primary/70 uppercase tracking-widest mb-2 block">Matières clés</span>
                      <ul className="grid grid-cols-2 gap-y-1.5 gap-x-4">
                        {edu.modules.map(m => (
                          <li key={m} className="flex items-center gap-2 text-xs text-white/75">
                            <ChevronRight className="w-2.5 h-2.5 text-primary/60 shrink-0" /> {m}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
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
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <span className="font-mono text-[10px] text-primary tracking-[0.4em] uppercase mb-4 block">Capabilities Matrix</span>
            <h2 className="text-4xl font-display font-bold uppercase">Compétences</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {[
              {
                icon: <Code className="w-4 h-4 text-primary" />,
                label: "Programmation",
                skills: [
                  { name: "Python", desc: "scripts, automatisation, traitement de données" },
                  { name: "C / C++", desc: "bases orientées systèmes embarqués" },
                  { name: "HTML", desc: "bases web techniques" },
                ],
              },
              {
                icon: <Cpu className="w-4 h-4 text-primary" />,
                label: "Électronique",
                skills: [
                  { name: "Analogique & numérique", desc: "bases théoriques et pratiques" },
                  { name: "Lecture de schémas", desc: "schémas électriques et PCB" },
                  { name: "Capteurs / Signaux", desc: "acquisition et traitement" },
                  { name: "Logique embarquée", desc: "STM32, ESP32, soudure" },
                ],
              },
              {
                icon: <Wrench className="w-4 h-4 text-primary" />,
                label: "Outils",
                skills: [
                  { name: "n8n", desc: "automatisation de workflows" },
                  { name: "Git", desc: "versionning, environnement dev" },
                  { name: "Windows / Linux", desc: "environnements de travail" },
                ],
              },
              {
                icon: <Terminal className="w-4 h-4 text-primary" />,
                label: "Logiciels",
                skills: [
                  { name: "QElectrotech", desc: "schémas électriques" },
                  { name: "Control Expert", desc: "automatisme Schneider (PLC)" },
                  { name: "Quartus", desc: "conception logique numérique" },
                ],
              },
            ].map((cat) => (
              <motion.div
                key={cat.label}
                className="p-6 border border-white/10 bg-white/5 relative overflow-hidden group"
                variants={scaleIn}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
              >
                {/* Top highlight on hover */}
                <div className="absolute inset-x-0 top-0 h-[1px] bg-primary/0 group-hover:bg-primary/35 transition-colors duration-300" />
                <div className="flex items-center gap-3 mb-6">
                  {cat.icon}
                  <h3 className="font-mono text-[11px] text-primary uppercase tracking-widest">{cat.label}</h3>
                </div>
                <ul className="space-y-4">
                  {cat.skills.map(s => (
                    <li key={s.name} className="group/skill">
                      <span className="text-sm text-white/90 font-medium group-hover/skill:text-white transition-colors duration-200">{s.name}</span>
                      <p className="text-xs text-white/55 mt-0.5 leading-relaxed">{s.desc}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Savoir-être */}
          <motion.div className="border border-white/5 bg-white/5 p-4 flex flex-wrap gap-3 items-center" variants={fadeInUp}>
            <div className="flex items-center gap-2 shrink-0">
              <Shield className="w-3.5 h-3.5 text-primary" />
              <span className="font-mono text-[10px] text-primary uppercase tracking-widest">Savoir-être</span>
            </div>
            <div className="h-4 w-[1px] bg-white/10 hidden sm:block" />
            {["Rigueur", "Travail en équipe", "Curiosité & autonomie", "Adaptabilité", "Permis B"].map(q => (
              <motion.div key={q} whileHover={{ scale: 1.05 }}>
                <Badge variant="outline" className="rounded-none border-white/15 text-xs text-white/75 hover:text-white hover:border-primary/30 transition-colors cursor-default">{q}</Badge>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* ─── PROJETS ACADÉMIQUES ─── */}
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
                icon: <Zap className="w-10 h-10 text-primary/40 group-hover:text-primary/70 transition-colors duration-300" />,
                desc: "Conception d'un circuit électronique complet : intégration des composants, tests de fonctionnement et correction de bugs électroniques.",
                tags: ["Électronique", "PCB", "Hardware"],
                delay: 0,
              },
              {
                title: "Carte STM32",
                icon: <Cpu className="w-10 h-10 text-primary/40 group-hover:text-primary/70 transition-colors duration-300" />,
                desc: "Assemblage et soudure d'une carte STM32, contrôle des connexions et validation du fonctionnement en langage C (STMicroelectronics).",
                tags: ["STM32", "C", "Embarqué"],
                delay: 0.6,
              },
              {
                title: "Robot Suiveur de Ligne",
                icon: <Terminal className="w-10 h-10 text-primary/40 group-hover:text-primary/70 transition-colors duration-300" />,
                desc: "Conception d'un robot analogique avec capteurs de ligne, réglages électroniques fins et tests prototype jusqu'à validation finale.",
                tags: ["Robotique", "Capteurs", "Analogique"],
                delay: 1.2,
              },
            ].map((project, i) => (
              <motion.div
                key={i}
                className="border border-white/10 bg-white/5 rounded-none overflow-hidden group hover:border-primary/40 transition-all duration-300"
                variants={scaleIn}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
              >
                <div className="h-40 bg-secondary/50 flex items-center justify-center border-b border-white/5">
                  {/* Icon floats in a loop */}
                  <motion.div
                    animate={{ y: [0, -7, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: project.delay }}
                  >
                    {project.icon}
                  </motion.div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">{project.title}</h3>
                  <p className="text-sm text-white/70 leading-relaxed mb-4">{project.desc}</p>
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

        {/* ─── PROJETS PERSO ─── */}
        <motion.section
          id="perso"
          className="container max-w-6xl mx-auto px-8 scroll-mt-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div className="flex items-center justify-between mb-16" variants={fadeInUp}>
            <h2 className="text-4xl font-display font-bold uppercase tracking-tight">Projets Personnels</h2>
            <div className="h-[1px] flex-1 mx-8 bg-white/5" />
            <span className="font-mono text-[10px] text-primary/60 uppercase tracking-widest shrink-0">Initiative propre</span>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Locker Room RFID",
                icon: <Wifi className="w-10 h-10 text-primary/40 group-hover:text-primary/70 transition-colors duration-300" />,
                status: "Réalisé",
                desc: "Système de casier électronique sécurisé par badge RFID. Conçu autour d'une ESP32 programmée en C++, avec gestion des accès, lecture des tags et retour d'état via LED.",
                tags: ["ESP32", "C++", "RFID", "Électronique"],
                delay: 0,
              },
              {
                title: "Atlas",
                icon: <LayoutDashboard className="w-10 h-10 text-primary/40 group-hover:text-primary/70 transition-colors duration-300" />,
                status: "En développement",
                desc: "Solution tout-en-un pour gérants de locations BNB : automatisation des tâches récurrentes (messages, check-in, calendrier) et dashboard centralisé de suivi des réservations.",
                tags: ["Automatisation", "Dashboard", "n8n", "Web"],
                delay: 0.5,
              },
              {
                title: "NLMB — Collection",
                icon: <Shirt className="w-10 h-10 text-primary/40 group-hover:text-primary/70 transition-colors duration-300" />,
                status: "Réalisé",
                desc: "Création d'une collection de t-shirts pour mon équipe sous le nom NLMB : conception du design, choix des supports, coordination de la production et distribution.",
                tags: ["Design", "Entrepreneuriat", "Team"],
                delay: 1,
              },
            ].map((project, i) => (
              <motion.div
                key={i}
                className="border border-white/10 bg-white/5 rounded-none overflow-hidden group hover:border-primary/40 transition-all duration-300"
                variants={scaleIn}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
              >
                <div className="h-40 bg-secondary/50 flex items-center justify-center border-b border-white/5 relative">
                  <motion.div
                    animate={{ y: [0, -7, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: project.delay }}
                  >
                    {project.icon}
                  </motion.div>
                  <span className={`absolute top-3 right-3 font-mono text-[9px] uppercase tracking-widest px-2 py-1 border ${project.status === "En développement" ? "border-yellow-500/40 text-yellow-400/80 animate-pulse-status" : "border-primary/40 text-primary/80"}`}>
                    {project.status}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">{project.title}</h3>
                  <p className="text-sm text-white/70 leading-relaxed mb-4">{project.desc}</p>
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
                title: "Des bases concrètes, dès la première année",
                desc: "En BUT GEII, j'ai déjà conçu des circuits, soudé des cartes STM32 et fabriqué un robot suiveur de ligne. J'arrive avec de la pratique réelle, pas uniquement de la théorie.",
              },
              {
                num: "02.",
                title: "Engagement et rigueur acquis sur le terrain",
                desc: "Réserviste au 3e RPIMa, j'ai appris à respecter les procédures, rester calme sous pression et être fiable dans un cadre exigeant. Ce sont des réflexes qui s'appliquent partout.",
              },
              {
                num: "03.",
                title: "Curiosité qui ne s'arrête pas au cours",
                desc: "Système RFID en C++, automatisation n8n, dashboard Atlas : j'explore en dehors des cours, parce que ça m'intéresse vraiment. L'apprentissage est un moteur, pas une contrainte.",
              },
              {
                num: "04.",
                title: "Un cap défini, une motivation sincère",
                desc: "Je sais dans quelle direction je veux aller — les systèmes embarqués, l'électronique, la défense. Ce n'est pas une certitude, c'est une orientation claire que j'assume et que je construis chaque jour.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="space-y-3 group/why p-4 border border-transparent hover:border-white/5 hover:bg-white/[0.02] transition-all duration-300 rounded-sm"
                variants={fadeInUp}
                whileHover={{ x: 4, transition: { duration: 0.2 } }}
              >
                <h3 className="text-xl font-bold flex items-center gap-3">
                  <span className="text-primary font-mono text-sm shrink-0">{item.num}</span>
                  <span className="group-hover/why:text-primary transition-colors duration-300">{item.title}</span>
                </h3>
                <p className="text-white/70 font-light leading-relaxed text-sm">{item.desc}</p>
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
            <p className="text-white/65 font-light mb-8">Canal de communication direct.</p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {[
                {
                  href: "mailto:youri.figuie@etu.umontpellier.fr",
                  icon: <Mail className="w-3 h-3" />,
                  label: "youri.figuie@etu.umontpellier.fr",
                  external: false,
                },
                {
                  href: "tel:0647209158",
                  icon: <Phone className="w-3 h-3" />,
                  label: "06 47 20 91 58",
                  external: false,
                },
                {
                  href: "https://linkedin.com/in/youri-fg/",
                  icon: <Linkedin className="w-3 h-3" />,
                  label: "linkedin.com/in/youri-fg",
                  external: true,
                },
              ].map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-2 text-xs font-mono text-white/65 hover:text-primary transition-all duration-200 border border-white/10 px-4 py-2 hover:border-primary/30 group"
                  whileHover={{ y: -2, transition: { duration: 0.2 } }}
                >
                  <span className="group-hover:scale-110 transition-transform duration-200">{link.icon}</span>
                  {link.label}
                  {link.external && <ExternalLink className="w-2.5 h-2.5 opacity-50" />}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="bg-background border border-white/10 rounded-none p-8 relative overflow-hidden"
            variants={scaleIn}
          >
            <div className="absolute top-0 left-0 w-full h-[1px] bg-primary/50" />
            <p className="text-xs font-mono text-white/50 mb-6 text-center uppercase tracking-widest">— ou via le formulaire —</p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-mono text-white/60 uppercase">Identité</FormLabel>
                        <FormControl>
                          <Input placeholder="VOTRE NOM" {...field} className="rounded-none border-white/10 bg-white/5 focus:border-primary h-12 text-white/90 placeholder:text-white/30" />
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
                        <FormLabel className="text-[10px] font-mono text-white/60 uppercase">Email</FormLabel>
                        <FormControl>
                          <Input placeholder="VOTRE EMAIL" {...field} className="rounded-none border-white/10 bg-white/5 focus:border-primary h-12 text-white/90 placeholder:text-white/30" />
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
                      <FormLabel className="text-[10px] font-mono text-white/60 uppercase">Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="VOTRE MESSAGE..." {...field} className="rounded-none border-white/10 bg-white/5 focus:border-primary min-h-[150px] resize-none text-white/90 placeholder:text-white/30" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/80 text-white font-bold tracking-widest rounded-none h-14">
                    TRANSMETTRE
                  </Button>
                </motion.div>
              </form>
            </Form>
          </motion.div>
        </motion.section>

      </div>
    </Layout>
  );
}
