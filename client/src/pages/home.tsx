import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowDown, ArrowRight, ArrowUpRight, Check, Download,
  Linkedin, Loader2, type LucideIcon,
} from "lucide-react";

import { Layout } from "@/components/layout";
import { Reveal, RevealGroup, RevealItem, Parallax, EASE } from "@/components/motion";
import { ProjectCard, ProjectDossier } from "@/components/project-card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  about, academicProjects, alternance, contactLinks, education, experiences,
  highlights, personalProjects, profile, skillGroups, softSkills, whyMe,
  type Project,
} from "@/content/profile";

// Préfixe des assets de public/ (dev « / » vs GitHub Pages « /Portofolio-Youri/ »)
const b = import.meta.env.BASE_URL;
const FORMSPREE_ENDPOINT = "https://formspree.io/f/meelwjkk";

const contactSchema = z.object({
  name: z.string().min(2, "Indiquez votre nom."),
  email: z.string().email("Adresse e-mail invalide."),
  message: z.string().min(10, "Message un peu court (10 caractères minimum)."),
});

/* ── Briques de mise en page ──────────────────────────────────────────────── */

function SectionHeader({
  eyebrow,
  title,
  lead,
  className = "",
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  className?: string;
}) {
  return (
    <Reveal className={`max-w-3xl ${className}`}>
      <p className="type-eyebrow text-primary">{eyebrow}</p>
      <h2 className="type-title mt-4 text-balance">{title}</h2>
      {lead && <p className="type-lead mt-5 text-muted-foreground text-pretty">{lead}</p>}
    </Reveal>
  );
}

function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-20 px-5 py-24 sm:px-8 sm:py-32 lg:py-40 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
      {children}
    </span>
  );
}

/** Bouton pilule : la seule interaction « qui bouge » du site, volontairement discrète. */
function PillLink({
  href,
  children,
  variant = "primary",
  icon: Icon,
  download,
  external,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  icon?: LucideIcon;
  download?: string;
  external?: boolean;
}) {
  const reduced = useReducedMotion();
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-medium transition-colors duration-300";
  const styles =
    variant === "primary"
      ? "bg-primary text-primary-foreground hover:bg-primary/90"
      : "border border-border bg-surface text-foreground hover:bg-subtle";

  return (
    <motion.a
      href={href}
      download={download}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`${base} ${styles}`}
      whileHover={reduced ? undefined : { scale: 1.02 }}
      whileTap={reduced ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.25, ease: EASE }}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </motion.a>
  );
}

/* ── Hero ─────────────────────────────────────────────────────────────────── */

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Le contenu du hero s'efface et recule pendant qu'on quitte l'écran :
  // c'est ce qui donne l'impression de « profondeur » des pages produit.
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.97]);
  const style = reduced ? undefined : { opacity, y, scale };

  return (
    <section
      id="top"
      ref={ref}
      className="bg-halo relative flex min-h-[92svh] items-center px-5 pb-20 pt-28 sm:px-8 sm:pt-32"
    >
      <motion.div className="mx-auto w-full max-w-6xl" style={style}>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          <div>
            <motion.p
              className="type-eyebrow text-balance text-primary"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
            >
              Systèmes embarqués · Électronique · Défense
            </motion.p>

            <motion.h1
              className="type-display mt-5"
              initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, ease: EASE, delay: 0.1 }}
            >
              {profile.firstName}
              <br />
              {profile.lastName}
            </motion.h1>

            <motion.p
              className="type-lead mt-7 max-w-xl text-pretty text-muted-foreground"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
            >
              {profile.tagline}
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.38 }}
            >
              <PillLink href="#contact" icon={ArrowRight}>
                Me contacter
              </PillLink>
              <PillLink
                href={`${b}${profile.cvFile}`}
                download="CV_Youri_Figuie.pdf"
                variant="secondary"
                icon={Download}
              >
                Télécharger le CV
              </PillLink>
              <PillLink href={profile.linkedin} external variant="secondary" icon={Linkedin}>
                LinkedIn
              </PillLink>
            </motion.div>
          </div>

          {/* Portrait — léger décalage en parallaxe pendant le scroll.
              Sur mobile il passe APRÈS le titre : le nom doit être la première
              chose lue, pas une photo qui remplit l'écran. */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.15 }}
          >
            <Parallax distance={22} className="mx-auto max-w-[15rem] sm:max-w-[18rem] lg:max-w-none">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-border/70 bg-subtle shadow-[0_24px_70px_-30px_hsl(240_10%_10%/0.35)]">
                <img
                  src={`${b}${profile.photo}`}
                  alt={`Portrait de ${profile.firstName} ${profile.lastName}`}
                  className="h-full w-full object-cover"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </Parallax>
          </motion.div>
        </div>

        <motion.a
          href="#profil"
          className="mt-16 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <motion.span
            animate={reduced ? undefined : { y: [0, 5, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="h-4 w-4" />
          </motion.span>
          Découvrir le parcours
        </motion.a>
      </motion.div>
    </section>
  );
}

/* ── Bandeau de repères ───────────────────────────────────────────────────── */

function Highlights() {
  return (
    <section className="border-y border-border bg-surface">
      <RevealGroup className="mx-auto grid max-w-6xl grid-cols-2 gap-px bg-border/70 sm:grid-cols-4">
        {highlights.map((h) => (
          <RevealItem key={h.label} className="bg-surface px-5 py-8 sm:px-6 sm:py-10">
            <p className="text-lg font-semibold tracking-[-0.02em] sm:text-xl">{h.value}</p>
            <p className="mt-1.5 text-sm text-muted-foreground">{h.label}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}

/* ── Profil ───────────────────────────────────────────────────────────────── */

function About() {
  return (
    <Section id="profil">
      <SectionHeader eyebrow="Profil" title="Apprendre en faisant, pas seulement en écoutant." lead={about.intro} />

      <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {about.facts.map((fact) => (
          <RevealItem
            key={fact.label}
            className="surface-card surface-card-hover p-6 hover:-translate-y-1"
          >
            <p className="type-eyebrow text-muted-foreground">{fact.label}</p>
            <ul className="mt-4 space-y-2.5">
              {fact.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[15px] leading-snug">
                  <span className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}

/* ── Parcours : expériences + formation ───────────────────────────────────── */

function Journey() {
  return (
    <Section id="parcours" className="bg-surface border-y border-border">
      <SectionHeader
        eyebrow="Parcours"
        title="Expériences"
        lead="Trois environnements très différents, un même fil conducteur : faire ce qui est demandé, correctement, avec l'équipe."
      />

      <div className="mt-14 space-y-px">
        {experiences.map((exp, i) => (
          <Reveal key={exp.role} delay={i * 0.05}>
            <article className="group grid gap-6 border-t border-border py-10 lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-12">
              <p className="text-sm text-muted-foreground lg:pt-1">{exp.period}</p>
              <div>
                <h3 className="type-heading">{exp.role}</h3>
                <p className="mt-1.5 text-[15px] text-primary">{exp.company}</p>
                <ul className="mt-6 space-y-3">
                  {exp.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-[15px] leading-relaxed text-muted-foreground">
                      <span className="mt-[0.6rem] h-1 w-1 shrink-0 rounded-full bg-border" />
                      <span className="text-pretty">{bullet}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-2">
                  {exp.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <SectionHeader eyebrow="Formation" title="Diplômes" className="mt-24 sm:mt-32" />

      <RevealGroup className="mt-12 grid gap-4 lg:grid-cols-2">
        {education.map((edu) => (
          <RevealItem key={edu.degree} className="surface-card surface-card-hover p-8 hover:-translate-y-1">
            <p className="text-sm text-muted-foreground">{edu.period}</p>
            <h3 className="type-heading mt-2 text-balance">{edu.degree}</h3>
            <p className="mt-2 text-[15px] text-primary">{edu.school}</p>
            <p className="mt-4 text-[15px] text-muted-foreground">{edu.detail}</p>
            {edu.modules.length > 0 && (
              <>
                <div className="my-6 h-px w-full bg-border" />
                <p className="type-eyebrow text-muted-foreground">Matières clés</p>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {edu.modules.map((m) => (
                    <li key={m} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                      {m}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}

/* ── Compétences ──────────────────────────────────────────────────────────── */

function Skills() {
  return (
    <Section id="competences">
      <SectionHeader
        eyebrow="Compétences"
        title="Ce que je sais faire aujourd'hui."
        lead="Des acquis de première année de BUT, complétés par ce que j'explore de mon côté. Ni plus, ni moins."
      />

      <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group) => (
          <RevealItem
            key={group.label}
            className="surface-card surface-card-hover group p-7 hover:-translate-y-1"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/8 text-primary transition-transform duration-500 group-hover:scale-105">
              <group.icon className="h-5 w-5" />
            </span>
            <h3 className="mt-5 text-base font-semibold tracking-[-0.02em]">{group.label}</h3>
            <ul className="mt-5 space-y-4">
              {group.skills.map((s) => (
                <li key={s.name}>
                  <p className="text-[15px] font-medium leading-snug">{s.name}</p>
                  <p className="mt-0.5 text-sm leading-snug text-muted-foreground">{s.desc}</p>
                </li>
              ))}
            </ul>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal className="mt-4">
        <div className="surface-card flex flex-wrap items-center gap-x-3 gap-y-2 p-6">
          <span className="type-eyebrow mr-2 text-muted-foreground">Savoir-être</span>
          {softSkills.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

/* ── Projets ──────────────────────────────────────────────────────────────── */

function Projects() {
  // Un seul dossier ouvert à la fois, partagé par les deux grilles.
  const [openProject, setOpenProject] = useState<Project | null>(null);

  return (
    <Section id="projets" className="bg-surface border-y border-border">
      <SectionHeader
        eyebrow="Projets académiques"
        title="Ce que j'ai conçu, soudé et débogué."
        lead="Les projets menés dans le cadre du BUT GEII, de la conception du circuit à la validation du prototype. Ouvrez un dossier pour le détail."
      />

      <RevealGroup className="mt-14 grid items-stretch gap-5 md:grid-cols-3">
        {academicProjects.map((p) => (
          <ProjectCard key={p.slug} project={p} onOpen={() => setOpenProject(p)} />
        ))}
      </RevealGroup>

      <SectionHeader
        eyebrow="Projets personnels"
        title="Et ce que je fais en dehors des cours."
        lead="Des projets lancés de ma propre initiative, parce que la curiosité ne s'arrête pas à la fin du TD."
        className="mt-24 sm:mt-32"
      />

      <RevealGroup className="mt-14 grid items-stretch gap-5 md:grid-cols-3">
        {personalProjects.map((p) => (
          <ProjectCard key={p.slug} project={p} onOpen={() => setOpenProject(p)} />
        ))}
      </RevealGroup>

      <ProjectDossier project={openProject} onClose={() => setOpenProject(null)} />
    </Section>
  );
}

/* ── Alternance ───────────────────────────────────────────────────────────── */

function Alternance() {
  return (
    <Section id="alternance">
      <SectionHeader eyebrow="Alternance 2026 — 2028" title="Pourquoi je cherche une alternance." lead={alternance.intro} />

      <RevealGroup className="mt-14 grid gap-4 lg:grid-cols-2">
        {alternance.arguments.map((arg) => (
          <RevealItem key={arg.title} className="surface-card surface-card-hover p-8 hover:-translate-y-1">
            <h3 className="type-heading text-balance">{arg.title}</h3>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground text-pretty">{arg.text}</p>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal className="mt-4">
        <div className="surface-card p-8">
          <p className="type-eyebrow text-muted-foreground">Missions visées — technicien supérieur</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {alternance.missions.map((m) => (
              <Tag key={m}>{m}</Tag>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

/* ── Pourquoi moi — bandeau sombre pour rompre le rythme ──────────────────── */

function WhyMe() {
  return (
    <section className="px-5 pb-24 sm:px-8 sm:pb-32">
      <Reveal className="mx-auto max-w-6xl">
        <div className="rounded-[2rem] bg-ink px-6 py-20 text-ink-foreground sm:px-12 lg:px-16 lg:py-28">
          <p className="type-eyebrow text-primary-foreground/60">Pourquoi me choisir</p>
          <h2 className="type-title mt-4 max-w-2xl text-balance">
            Quatre raisons, et aucune n'est du remplissage.
          </h2>

          <RevealGroup className="mt-14 grid gap-x-12 gap-y-12 sm:grid-cols-2">
            {whyMe.map((item) => (
              <RevealItem key={item.num}>
                <p className="text-sm tabular-nums text-ink-foreground/45">{item.num}</p>
                <h3 className="mt-3 text-xl font-semibold tracking-[-0.025em] text-balance">{item.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-foreground/65 text-pretty">{item.desc}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Reveal>
    </section>
  );
}

/* ── Contact ──────────────────────────────────────────────────────────────── */

function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  async function onSubmit(values: z.infer<typeof contactSchema>) {
    setIsSubmitting(true);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Envoi refusé");
      setSubmitted(true);
      form.reset();
      toast({ title: "Message envoyé", description: "Je reviens vers vous sous 48 h." });
    } catch {
      toast({
        title: "L'envoi a échoué",
        description: `Écrivez-moi directement à ${profile.email}.`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const fieldClass =
    "h-12 rounded-xl border-border bg-surface text-[15px] placeholder:text-muted-foreground/60 focus-visible:ring-2 focus-visible:ring-primary/30";

  return (
    <Section id="contact" className="bg-surface border-t border-border">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <div>
          <SectionHeader
            eyebrow="Contact"
            title="Parlons de votre alternance."
            lead="Une question, une offre, un besoin de précisions sur mon profil ? Je réponds sous 48 h."
          />

          <RevealGroup className="mt-10 space-y-1">
            {contactLinks.map((link) => {
              const Icon = link.icon;
              const content = (
                <>
                  <Icon className="h-4 w-4 shrink-0 text-primary" />
                  <span className="text-[15px]">{link.label}</span>
                  {link.external && <ArrowUpRight className="ml-auto h-4 w-4 text-muted-foreground" />}
                </>
              );
              return (
                <RevealItem key={link.label}>
                  {link.href ? (
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-3 rounded-xl px-3 py-3 transition-colors duration-300 hover:bg-subtle"
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="flex items-center gap-3 px-3 py-3 text-muted-foreground">{content}</div>
                  )}
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>

        <Reveal delay={0.1}>
          <div className="surface-card p-7 sm:p-9">
            {submitted ? (
              <motion.div
                className="flex flex-col items-center justify-center gap-4 py-16 text-center"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check className="h-5 w-5" />
                </span>
                <p className="type-heading">Message envoyé</p>
                <p className="max-w-xs text-[15px] text-muted-foreground">
                  Merci, je reviens vers vous sous 48 h.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-sm text-primary underline-offset-4 hover:underline"
                >
                  Écrire un autre message
                </button>
              </motion.div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Nom</FormLabel>
                          <FormControl>
                            <Input placeholder="Votre nom" autoComplete="name" className={fieldClass} {...field} />
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
                          <FormLabel className="text-sm font-medium">Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="vous@entreprise.fr"
                              autoComplete="email"
                              className={fieldClass}
                              {...field}
                            />
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
                        <FormLabel className="text-sm font-medium">Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Votre message…"
                            className="min-h-40 resize-none rounded-xl border-border bg-surface text-[15px] placeholder:text-muted-foreground/60 focus-visible:ring-2 focus-visible:ring-primary/30"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary text-[15px] font-medium text-primary-foreground transition-colors duration-300 hover:bg-primary/90 disabled:opacity-60"
                    whileTap={{ scale: 0.99 }}
                    transition={{ duration: 0.2, ease: EASE }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Envoi en cours…
                      </>
                    ) : (
                      <>
                        Envoyer le message
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </motion.button>
                </form>
              </Form>
            )}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────────── */

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Highlights />
      <About />
      <Journey />
      <Skills />
      <Projects />
      <Alternance />
      <WhyMe />
      <Contact />
    </Layout>
  );
}
