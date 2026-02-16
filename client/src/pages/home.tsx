import { motion } from "framer-motion";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import heroBg from "@/assets/hero-bg.png";
import { Cpu, Terminal, Shield, Crosshair, Code, Radio, Server, Anchor, Send, FileText, Download, Hexagon } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name identifier required"),
  email: z.string().email("Invalid frequency"),
  message: z.string().min(10, "Transmission too short"),
});

export default function Home() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(data: z.infer<typeof contactSchema>) {
    toast({
      title: "TRANSMISSION SENT",
      description: "Encrypted message received. Stand by for response.",
    });
    form.reset();
  }

  const skills = [
    { name: "C / C++", level: 90, icon: <Code className="w-4 h-4" /> },
    { name: "Embedded Systems (STM32, ESP32)", level: 85, icon: <Cpu className="w-4 h-4" /> },
    { name: "Python / Scripting", level: 80, icon: <Terminal className="w-4 h-4" /> },
    { name: "RTOS", level: 70, icon: <Server className="w-4 h-4" /> },
    { name: "Communication Protocols (I2C, SPI, UART, CAN)", level: 85, icon: <Radio className="w-4 h-4" /> },
    { name: "Linux / Bash", level: 75, icon: <Shield className="w-4 h-4" /> },
  ];

  const projects = [
    {
      title: "AUTONOMOUS DRONE FLIGHT CONTROLLER",
      category: "AERIAL DEFENSE",
      status: "COMPLETED",
      description: "Developed a custom PID flight controller on STM32 using FreeRTOS. Implemented sensor fusion (IMU + Barometer) for stable hovering and waypoint navigation.",
      tags: ["STM32", "C++", "FreeRTOS", "Control Theory"],
    },
    {
      title: "SECURE RADIO TELEMETRY LINK",
      category: "COMMUNICATIONS",
      status: "PROTOTYPE",
      description: "Designed a long-range encrypted LoRa telemetry system for UAVs. Features AES-256 encryption and adaptive frequency hopping.",
      tags: ["LoRa", "Python", "Encryption", "Hardware Design"],
    },
    {
      title: "COMPUTER VISION TARGET TRACKING",
      category: "SURVEILLANCE",
      status: "ACTIVE",
      description: "Real-time object detection and tracking system using OpenCV and Raspberry Pi. Optimized for low-latency edge computing scenarios.",
      tags: ["OpenCV", "Python", "Linux", "Edge AI"],
    },
  ];

  return (
    <Layout>
      {/* HERO SECTION */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden border-b border-primary/20">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBg} 
            alt="Drone Blueprint" 
            className="w-full h-full object-cover opacity-20 filter saturate-0 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-background/50 to-background" />
        </div>

        <div className="container px-4 z-10 flex flex-col items-start max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="border-l-2 border-primary pl-6 mb-8"
          >
            <h2 className="text-primary font-mono text-sm tracking-[0.3em] mb-2">IDENTIFICATION: CANDIDATE</h2>
            <h1 className="text-5xl md:text-7xl font-sans font-bold tracking-tighter text-white mb-4">
              ALEXANDRE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/50">DURAND</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl">
              Spécialiste Systèmes Embarqués & Défense
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex gap-4"
          >
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-background font-bold tracking-widest rounded-none border border-primary/50 relative overflow-hidden group">
              <span className="relative z-10 flex items-center gap-2">
                <Download className="w-4 h-4" />
                DOWNLOAD CV
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Button>
            <Button variant="outline" size="lg" className="border-primary/50 text-primary hover:bg-primary/10 rounded-none tracking-widest" asChild>
              <a href="#operations">VIEW OPERATIONS</a>
            </Button>
          </motion.div>
        </div>

        {/* HUD Elements */}
        <div className="absolute bottom-10 right-10 hidden md:block text-right">
          <div className="text-xs font-mono text-primary/60 mb-1">SYSTEM STATUS</div>
          <div className="flex gap-1 justify-end">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-2 h-6 bg-primary/40 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
          </div>
        </div>
      </section>

      {/* MISSION BRIEFING (About) */}
      <section id="mission" className="py-24 bg-secondary/5 relative">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-12">
            <Crosshair className="w-8 h-8 text-primary animate-spin-slow" />
            <h2 className="text-3xl font-bold tracking-tight">MISSION BRIEFING</h2>
            <div className="h-[1px] bg-primary/30 flex-1" />
          </div>

          <div className="grid md:grid-cols-[2fr_1fr] gap-12">
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-white font-mono text-sm block mb-2 text-primary">// OBJECTIVE</strong>
                Étudiant en <span className="text-white font-medium">BUT GEII (Génie Électrique et Informatique Industrielle)</span>, je recherche une alternance pour mettre à profit mes compétences en développement bas niveau et électronique embarquée.
              </p>
              <p>
                <strong className="text-white font-mono text-sm block mb-2 text-primary">// SPECIALIZATION</strong>
                Passionné par l'aéronautique et le secteur de la défense, je me forme activement sur les architectures <span className="text-white">ARM Cortex-M</span>, les RTOS et les protocoles de communication sécurisés. Mon but est de concevoir des systèmes fiables, performants et résilients.
              </p>
              <p className="font-mono text-sm text-primary/80 border border-primary/20 p-4 bg-primary/5 inline-block">
                {">"} READY FOR DEPLOYMENT: SEPTEMBER 2026
              </p>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 border border-primary/30 border-dashed" />
              <div className="bg-background/50 p-6 h-full backdrop-blur-sm relative z-10 border border-white/5">
                <h3 className="font-mono text-xs text-primary mb-4 border-b border-primary/20 pb-2">SOFT SKILLS_MATRIX</h3>
                <ul className="space-y-3 font-mono text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Hexagon className="w-3 h-3 text-primary fill-primary/20" /> Rigueur & Précision
                  </li>
                  <li className="flex items-center gap-2">
                    <Hexagon className="w-3 h-3 text-primary fill-primary/20" /> Travail d'Équipe
                  </li>
                  <li className="flex items-center gap-2">
                    <Hexagon className="w-3 h-3 text-primary fill-primary/20" /> Résolution de Problèmes
                  </li>
                  <li className="flex items-center gap-2">
                    <Hexagon className="w-3 h-3 text-primary fill-primary/20" /> Veille Technologique
                  </li>
                  <li className="flex items-center gap-2">
                    <Hexagon className="w-3 h-3 text-primary fill-primary/20" /> Adaptabilité
                  </li>
                </ul>
              </div>
              {/* Decorative corners */}
              <div className="absolute top-0 left-0 w-2 h-2 border-l-2 border-t-2 border-primary" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-r-2 border-b-2 border-primary" />
            </div>
          </div>
        </div>
      </section>

      {/* ARSENAL (Skills) */}
      <section id="arsenal" className="py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10" />
        
        <div className="container max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-16 justify-end">
            <div className="h-[1px] bg-primary/30 flex-1" />
            <h2 className="text-3xl font-bold tracking-tight text-right">TECHNICAL ARSENAL</h2>
            <Shield className="w-8 h-8 text-primary" />
          </div>

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
            {skills.map((skill, index) => (
              <motion.div 
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="flex justify-between items-center mb-2 font-mono text-sm">
                  <span className="flex items-center gap-2 text-white group-hover:text-primary transition-colors">
                    {skill.icon}
                    {skill.name}
                  </span>
                  <span className="text-primary opacity-60">{skill.level}%</span>
                </div>
                <div className="h-2 bg-secondary relative overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="absolute top-0 left-0 h-full bg-primary"
                  />
                  {/* Stripes pattern on progress bar */}
                  <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,transparent_25%,#000_25%,#000_50%,transparent_50%,transparent_75%,#000_75%,#000_100%)] bg-[length:4px_4px]" />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
             {/* Tech badges */}
             {["Altium Designer", "MATLAB / Simulink", "Git / GitHub", "Docker", "VS Code", "Oscilloscope", "Soldering", "3D Printing"].map((tech) => (
               <div key={tech} className="border border-white/5 bg-white/5 p-3 text-center text-xs font-mono text-muted-foreground hover:bg-white/10 hover:text-primary transition-colors cursor-default">
                 {tech}
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* OPERATIONS (Projects) */}
      <section id="operations" className="py-24 bg-secondary/5">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-12">
            <Terminal className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold tracking-tight">OPERATION LOGS</h2>
            <div className="h-[1px] bg-primary/30 flex-1" />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <Card className="bg-card border-white/10 h-full hover:border-primary/50 transition-colors group relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline" className="text-[10px] border-primary/30 text-primary rounded-sm px-2 py-0.5 font-mono">
                        {project.category}
                      </Badge>
                      <span className="text-[10px] font-mono text-muted-foreground">{project.status}</span>
                    </div>
                    <CardTitle className="font-sans text-lg font-bold text-white group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-mono bg-secondary px-2 py-1 text-secondary-foreground rounded-sm">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  
                  {/* Tech decoration */}
                  <div className="absolute bottom-2 right-2 opacity-10">
                    <Cpu className="w-12 h-12" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMS (Contact) */}
      <section id="comms" className="py-24 relative">
        <div className="container max-w-2xl mx-auto px-6">
          <Card className="bg-background/80 backdrop-blur border-primary/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
            
            <CardHeader className="text-center relative z-10">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/20">
                <Send className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold font-sans">ESTABLISH UPLINK</CardTitle>
              <p className="text-muted-foreground font-mono text-xs mt-2">SECURE CHANNEL // ENCRYPTION: ACTIVE</p>
            </CardHeader>

            <CardContent className="relative z-10">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-mono text-xs uppercase text-primary">Identity</FormLabel>
                          <FormControl>
                            <Input placeholder="CODENAME / NAME" {...field} className="bg-secondary/50 border-white/10 font-mono text-sm focus:border-primary/50 rounded-sm" />
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
                          <FormLabel className="font-mono text-xs uppercase text-primary">Frequency (Email)</FormLabel>
                          <FormControl>
                            <Input placeholder="NAME@DOMAIN.COM" {...field} className="bg-secondary/50 border-white/10 font-mono text-sm focus:border-primary/50 rounded-sm" />
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
                        <FormLabel className="font-mono text-xs uppercase text-primary">Transmission Payload</FormLabel>
                        <FormControl>
                          <Textarea placeholder="ENTER MESSAGE CONTENT..." {...field} className="bg-secondary/50 border-white/10 font-mono text-sm focus:border-primary/50 min-h-[120px] rounded-sm resize-none" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-background font-bold tracking-widest rounded-sm h-12">
                    TRANSMIT DATA
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}