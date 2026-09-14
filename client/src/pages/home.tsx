import { useRef, useState } from "react";
import { Link } from "wouter";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, ArrowUpRight, Check, Download, Linkedin, Loader2 } from "lucide-react";

import { Layout } from "@/components/layout";
import { useAimant } from "@/components/cursor";
import { Parallax, EASE } from "@/components/motion";
import { ProjectCard, ProjectDossier, ProjectFeature, ProjectStack } from "@/components/project-card";
import { HeroBackdrop } from "@/components/backdrop";
import { EngagementCard } from "@/components/engagement-card";
import { Board3D } from "@/components/board-3d";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  about, academicProjects, contactLinks, education, experiences,
  highlights, personalProjects, profile, skillGroups, softSkills,
  type Project,
} from "@/content/profile";
import { collins } from "@/content/collins";

const b = import.meta.env.BASE_URL;
const FORMSPREE_ENDPOINT = "https://formspree.io/f/meelwjkk";

const contactSchema = z.object({
  name: z.string().min(2, "Indiquez votre nom."),
  email: z.string().email("Adresse e-mail invalide."),
  message: z.string().min(10, "Message un peu court (10 caractères minimum)."),
});

/* ── Briques ──────────────────────────────────────────────────────────────── */

/**
 * Section. Le filet supérieur porte une graduation cyan à gauche : un repère
 * de position, comme les cotes en marge d'un plan. C'est une information de
 * structure, pas une décoration.
 */
/**
 * `decor` pose une carte 3D dans la section, cantonnée aux zones sans texte :
 * à DROITE, elle tient dans la gouttière libre à côté de l'en-tête (celui-ci
 * est limité à `max-w-3xl`) ; à GAUCHE, elle est repoussée dans la marge de
 * page et sous le contenu — une première version débordait derrière le
 * libellé « Savoir-être », ce que la règle de vidéoprojection interdit. Elle déborde du cadre — d'où `overflow-x-clip`, choisi
 * plutôt que `overflow-hidden` : `clip` ne crée PAS de conteneur de
 * défilement, donc la pile de projets en `position: sticky` continue de coller.
 */
function Section({
  id,
  children,
  className = "",
  decor,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  decor?: "droite" | "gauche";
}) {
  return (
    <section id={id} className={`relative scroll-mt-20 overflow-x-clip px-5 sm:px-8 ${className}`}>
      {decor === "droite" && (
        <Board3D className="pointer-events-none absolute -right-52 -top-12 hidden h-[32rem] w-[32rem] opacity-[0.55] lg:block" />
      )}
      {decor === "gauche" && (
        <Board3D className="pointer-events-none absolute -bottom-72 -left-[23rem] hidden h-[34rem] w-[34rem] opacity-[0.55] lg:block" />
      )}
      <div className="mx-auto max-w-6xl">
        <div className="relative border-t border-border py-20 sm:py-28">
          <span className="absolute left-0 top-0 h-[3px] w-10 bg-[hsl(var(--efis))]" aria-hidden="true" />
          {children}
        </div>
      </div>
    </section>
  );
}

/**
 * En-tête de section. Le titre MONTE derrière un cache à l'arrivée à l'écran —
 * le même geste que le nom dans le hero, pas un fondu-glissé générique. Une
 * seule fois, et seulement sur le titre : le texte courant, lui, est là tout
 * de suite, parce qu'il doit pouvoir être lu et projeté sans attendre.
 */
function SectionHeader({ title, lead }: { title: string; lead?: string }) {
  const hote = useRef<HTMLDivElement>(null);
  const vu = useInView(hote, { once: true, margin: "0px 0px -14% 0px" });

  return (
    <div ref={hote} className="max-w-3xl">
      <h2 className="type-title text-balance">
        <span className="po-ligne">
          <span
            style={{
              animation: vu ? "po-monte .95s var(--ease-out-expo) both" : "none",
              transform: vu ? undefined : "translateY(110%)",
            }}
          >
            {title}
          </span>
        </span>
      </h2>
      {lead && <p className="type-lead mt-5 text-muted-foreground text-pretty">{lead}</p>}
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="type-data rounded-[3px] border border-border bg-background px-2.5 py-1 text-[0.8125rem] text-muted-foreground">
      {children}
    </span>
  );
}

/**
 * Bouton pilule. `internal` passe par wouter plutôt que par une ancre brute :
 * sur GitHub Pages le site est servi sous /Portofolio-Youri/, et un href="/collins"
 * écrit en dur pointerait à la racine du domaine.
 */
function PillLink({
  href,
  children,
  variant = "primary",
  icon: Icon,
  download,
  external,
  internal,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  icon?: typeof Download;
  download?: string;
  external?: boolean;
  internal?: boolean;
}) {
  const styles =
    variant === "primary"
      ? "bg-primary text-primary-foreground hover:bg-[hsl(var(--efis))] hover:text-[hsl(var(--panel))]"
      : "border border-border bg-surface text-foreground hover:border-primary/50";

  const cls = `radius-control inline-flex items-center justify-center gap-2 px-5 py-3 text-[1rem] font-semibold transition-colors duration-300 sm:px-6 sm:py-3.5 sm:text-[1.0625rem] ${styles}`;
  /* Le bouton vient au-devant du pointeur quand il l'approche. L'aimantation
     porte sur une enveloppe, pas sur le lien : wouter ne transmet pas de ref. */
  const aimant = useAimant<HTMLSpanElement>();
  const inner = (
    <>
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </>
  );

  if (internal) {
    return (
      <span ref={aimant} className="inline-flex">
        <Link href={href} className={cls}>
          {inner}
        </Link>
      </span>
    );
  }

  return (
    <span ref={aimant} className="inline-flex">
      <a
        href={href}
        download={download}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={cls}
      >
        {inner}
      </a>
    </span>
  );
}

/* ── Hero : la séquence d'allumage ────────────────────────────────────────── */

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 70]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[86svh] items-center overflow-hidden px-5 pb-14 pt-24 sm:px-8 sm:pb-20 sm:pt-32 lg:min-h-[92svh]"
    >
      <HeroBackdrop />

      <motion.div
        className="relative z-10 mx-auto w-full max-w-6xl"
        style={reduced ? undefined : { opacity, y }}
      >
        <div className="grid items-center gap-10 sm:gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-16">
          <div className="relative">
            {/* Réglette de repères : elle s'allume de haut en bas à l'ouverture */}
            <div
              className="rail po-rail absolute -left-6 top-1 hidden h-full w-[5px] lg:block"
              aria-hidden="true"
            />

            {/* Les deux lignes du nom montent l'une après l'autre derrière un
                cache, pendant que l'ensemble s'élargit. Le décalage fait lire
                « Youri » avant « Figuié » au lieu d'un bloc qui surgit. */}
            <h1 className="type-display po-resolve">
              <span className="po-ligne">
                <span>{profile.firstName}</span>
              </span>
              <span className="po-ligne">
                <span style={{ animationDelay: "0.11s" }}>{profile.lastName}</span>
              </span>
            </h1>

            {/* Ligne d'horizon : elle se trace, comme à la mise sous tension */}
            <div
              className="po-horizon mt-7 h-px w-full max-w-xl bg-[hsl(var(--efis))]"
              style={{ animationDelay: "0.1s" }}
            />

            <p
              className="type-lead po-fade mt-6 max-w-xl text-pretty text-muted-foreground sm:mt-7"
              style={{ animationDelay: "0.55s" }}
            >
              {profile.tagline}
            </p>

            <div className="po-fade mt-8 flex flex-wrap gap-3 sm:mt-10" style={{ animationDelay: "0.95s" }}>
              <PillLink href="/collins" internal>La page Collins Aerospace</PillLink>
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
            </div>
          </div>

          {/* Pas de `order-first` : sur mobile le nom doit être lu avant la photo,
              sinon les boutons tombent sous la ligne de flottaison. */}
          <div className="po-fade" style={{ animationDelay: "1.15s" }}>
            <Parallax distance={22} className="mx-auto max-w-[15rem] sm:max-w-[18rem] lg:max-w-none">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[6px] border border-border bg-subtle">
                <img
                  src={`${b}${profile.photo}`}
                  alt={`Portrait de ${profile.firstName} ${profile.lastName}`}
                  className="h-full w-full object-cover"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </Parallax>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ── Bandeau de repères ───────────────────────────────────────────────────── */

function Highlights() {
  return (
    <section className="border-y border-border bg-surface">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px bg-border sm:grid-cols-4">
        {highlights.map((h) => (
          <div key={h.label} className="bg-surface px-5 py-8 sm:px-6 sm:py-10">
            <p className="text-[1.0625rem] font-bold tracking-[-0.02em] [font-stretch:106%] sm:text-xl">
              {h.value}
            </p>
            <p className="type-data mt-1.5 text-[0.9375rem] text-muted-foreground">{h.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Profil ───────────────────────────────────────────────────────────────── */

function About() {
  return (
    <Section id="profil" decor="droite">
      <SectionHeader title="Apprendre en faisant, pas seulement en écoutant." lead={about.intro} />

      <div className="mt-14 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
        {about.facts.map((fact) => (
          <div key={fact.label} className="bg-background p-6">
            <p className="type-label text-muted-foreground">{fact.label}</p>
            <ul className="mt-4 space-y-2.5">
              {fact.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[1.0625rem] leading-snug">
                  <span className="mt-[0.6rem] h-1 w-1 shrink-0 bg-[hsl(var(--efis))]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ── Collins : l'aperçu qui renvoie vers la page dédiée ───────────────────── */

function CollinsTeaser() {
  return (
    <Section id="collins" decor="gauche">
      <SectionHeader
        title="Mon alternance chez Collins Aerospace."
        lead={collins.intro}
      />

      <div className="mt-12 grid gap-px bg-border sm:grid-cols-3">
        {collins.figures.map((f) => (
          <div key={f.label} className="bg-background px-1 py-7 sm:px-6">
            <p className="type-readout text-primary">
              {f.value.toLocaleString("fr-FR", {
                minimumFractionDigits: f.decimals,
                maximumFractionDigits: f.decimals,
              })}
              <span className="ml-1 text-[0.5em] align-baseline">{f.unit}</span>
            </p>
            <p className="type-data mt-3 text-[0.9375rem] text-muted-foreground">{f.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <Link
          href="/collins"
          className="group inline-flex items-center gap-2 border-b-2 border-[hsl(var(--efis))] pb-1 text-[1.0625rem] font-semibold transition-colors hover:text-primary"
        >
          L'entreprise, ses chiffres et ce que j'y fais
          <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
        </Link>
      </div>
    </Section>
  );
}

/* ── Parcours ─────────────────────────────────────────────────────────────── */

/**
 * « Depuis » est la seule chose à lire pour savoir si c'est en cours : la
 * donnée porte déjà l'information, la couleur ne fait que la rendre visible
 * d'un coup d'œil, y compris au fond d'une salle.
 */
const enCours = (periode: string) => periode.trimStart().startsWith("Depuis");

function Journey() {
  return (
    <Section id="parcours" className="bg-surface" decor="droite">
      <SectionHeader
        title="Expériences"
        lead="Des environnements très différents, un même fil conducteur : faire ce qui est demandé, correctement, avec l'équipe."
      />

      <div className="mt-14">
        {experiences.map((exp) => (
          <article
            key={exp.role + exp.company}
            className="grid gap-6 border-t border-border py-10 lg:grid-cols-[11rem_minmax(0,1fr)] lg:gap-12"
          >
            <p
              className={`type-data text-[0.9375rem] lg:pt-1.5 ${
                enCours(exp.period)
                  ? "font-semibold text-[hsl(var(--actif))]"
                  : "text-muted-foreground"
              }`}
            >
              {exp.period}
            </p>
            <div>
              <h3 className="type-heading">{exp.role}</h3>
              <p className="type-data mt-1.5 text-[1.0625rem] text-primary">{exp.company}</p>

              {exp.bullets.length > 0 && (
                <ul className="mt-6 space-y-3">
                  {exp.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 leading-relaxed text-muted-foreground">
                      <span className="mt-[0.7rem] h-1 w-1 shrink-0 bg-border" />
                      <span className="text-pretty">{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}

              {exp.href && (
                <Link
                  href={exp.href}
                  className="group mt-5 inline-flex items-center gap-2 font-semibold text-primary"
                >
                  {exp.hrefLabel}
                  <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
                </Link>
              )}

              <div className="mt-6 flex flex-wrap gap-2">
                {exp.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      <EngagementCard />

      <h2 className="type-title mt-24 text-balance sm:mt-28">Formation</h2>

      <div className="mt-12 grid gap-px bg-border lg:grid-cols-2">
        {education.map((edu) => (
          <div key={edu.degree} className="bg-surface p-8">
            <p
              className={`type-data text-[0.9375rem] ${
                enCours(edu.period)
                  ? "font-semibold text-[hsl(var(--actif))]"
                  : "text-muted-foreground"
              }`}
            >
              {edu.period}
            </p>
            <h3 className="type-heading mt-2 text-balance">{edu.degree}</h3>
            <p className="type-data mt-2 text-[1.0625rem] text-primary">{edu.school}</p>
            <p className="mt-4 text-muted-foreground">{edu.detail}</p>
            {edu.modules.length > 0 && (
              <>
                <div className="my-6 h-px w-full bg-border" />
                <p className="type-label text-muted-foreground">Matières clés</p>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {edu.modules.map((m) => (
                    <li
                      key={m}
                      className="flex items-start gap-2 text-[0.9375rem] text-muted-foreground"
                    >
                      <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-[hsl(var(--efis))]" />
                      {m}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ── Compétences ──────────────────────────────────────────────────────────── */

function Skills() {
  return (
    <Section id="competences" decor="gauche">
      <SectionHeader
        title="Ce que je sais faire aujourd'hui."
        lead="Des acquis de BUT, complétés par ce que j'explore de mon côté et par ce que j'apprends en entreprise. Ni plus, ni moins."
      />

      <div className="mt-14 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group) => (
          <div key={group.label} className="bg-background p-7">
            <group.icon className="h-5 w-5 text-[hsl(var(--efis))]" strokeWidth={1.75} />
            <h3 className="mt-5 text-[1.0625rem] font-bold tracking-[-0.02em]">{group.label}</h3>
            <ul className="mt-5 space-y-4">
              {group.skills.map((s) => (
                <li key={s.name}>
                  <p className="font-semibold leading-snug">{s.name}</p>
                  <p className="mt-0.5 text-[0.9375rem] leading-snug text-muted-foreground">{s.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="type-label mr-2 text-muted-foreground">Savoir-être</span>
        {softSkills.map((s) => (
          <Tag key={s}>{s}</Tag>
        ))}
      </div>
    </Section>
  );
}

/* ── Projets ──────────────────────────────────────────────────────────────── */

function Projects() {
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const [vedette, ...autresProjets] = personalProjects;

  return (
    <Section id="projets" className="bg-surface" decor="droite">
      <SectionHeader
        title="Ce que j'ai conçu, soudé et débogué."
        lead="Les projets menés dans le cadre du BUT GEII, de la conception du circuit à la validation du prototype. Ouvrez un dossier pour le détail."
      />

      <ProjectStack projects={academicProjects} onOpen={setOpenProject} />

      <div className="mt-14 grid items-stretch gap-5 md:grid-cols-3 lg:hidden">
        {academicProjects.map((p) => (
          <ProjectCard key={p.slug} project={p} onOpen={() => setOpenProject(p)} />
        ))}
      </div>

      <h2 className="type-title mt-24 text-balance sm:mt-28">Et ce que je fais en dehors des cours.</h2>
      <p className="type-lead mt-5 max-w-3xl text-muted-foreground text-pretty">
        Des projets lancés de ma propre initiative, parce que la curiosité ne s'arrête pas à la fin du TD.
      </p>

      {/* Un seul projet mis en avant — la carte détaillée perd tout son sens
          si les trois la portent. Les deux autres gardent la vignette. */}
      {vedette && (
        <div className="mt-14">
          <ProjectFeature project={vedette} onOpen={() => setOpenProject(vedette)} />
        </div>
      )}

      <div className="mt-5 grid items-stretch gap-5 md:grid-cols-2">
        {autresProjets.map((p) => (
          <ProjectCard key={p.slug} project={p} onOpen={() => setOpenProject(p)} />
        ))}
      </div>

      <ProjectDossier project={openProject} onClose={() => setOpenProject(null)} />
    </Section>
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
    "radius-field h-12 border-border bg-surface text-[1.0625rem] placeholder:text-muted-foreground/60 focus-visible:ring-2 focus-visible:ring-[hsl(var(--efis))]/40";

  return (
    <Section id="contact" decor="gauche">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <div>
          <SectionHeader
            title="Me contacter."
            lead="Une question sur mon parcours, un projet, une opportunité pour la suite ? Je réponds sous 48 h."
          />

          <div className="mt-10">
            {contactLinks.map((link) => {
              const Icon = link.icon;
              const content = (
                <>
                  <Icon className="h-4 w-4 shrink-0 text-[hsl(var(--efis))]" />
                  <span>{link.label}</span>
                  {link.external && <ArrowUpRight className="ml-auto h-4 w-4 text-muted-foreground" />}
                </>
              );
              return link.href ? (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-3 border-t border-border px-1 py-4 transition-colors duration-300 hover:text-primary"
                >
                  {content}
                </a>
              ) : (
                <div
                  key={link.label}
                  className="flex items-center gap-3 border-t border-border px-1 py-4 text-muted-foreground"
                >
                  {content}
                </div>
              );
            })}
          </div>
        </div>

        <div className="bloc p-7 sm:p-9">
          {submitted ? (
            <motion.div
              className="flex flex-col items-center justify-center gap-4 py-16 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <span className="radius-control flex h-12 w-12 items-center justify-center bg-[hsl(var(--efis))]/12 text-primary">
                <Check className="h-5 w-5" />
              </span>
              <p className="type-heading">Message envoyé</p>
              <p className="max-w-xs text-muted-foreground">Merci, je reviens vers vous sous 48 h.</p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-2 text-[0.9375rem] font-semibold text-primary underline-offset-4 hover:underline"
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
                        <FormLabel className="type-label">Nom</FormLabel>
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
                        <FormLabel className="type-label">Email</FormLabel>
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
                      <FormLabel className="type-label">Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Votre message…"
                          className="radius-field min-h-40 resize-none border-border bg-surface text-[1.0625rem] placeholder:text-muted-foreground/60 focus-visible:ring-2 focus-visible:ring-[hsl(var(--efis))]/40"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="radius-control inline-flex h-12 w-full items-center justify-center gap-2 bg-primary text-[1.0625rem] font-semibold text-primary-foreground transition-colors duration-300 hover:bg-[hsl(var(--efis))] hover:text-[hsl(var(--panel))] disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Envoi en cours…
                    </>
                  ) : (
                    "Envoyer le message"
                  )}
                </button>
              </form>
            </Form>
          )}
        </div>
      </div>
    </Section>
  );
}

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Highlights />
      <About />
      <CollinsTeaser />
      <Journey />
      <Skills />
      <Projects />
      <Contact />
    </Layout>
  );
}
