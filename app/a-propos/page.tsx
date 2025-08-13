"use client"

import type React from "react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PlanetBackground3D } from "@/components/PlanetBackground3D"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building, GraduationCap, Briefcase, Eye, Table } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import {
  Code,
  Database,
  Globe,
  Server,
  Layers,
  Cpu,
  PenTool,
  Terminal,
  Braces,
  FileCode,
  Palette,
  Layout,
  GitBranch,
  Settings,
  Cloud,
  Lock,
  Workflow,
  Smartphone,
} from "lucide-react"
import { CVPreviewModal } from "@/components/cv-preview-modal"
import { TableauPreviewModal } from "@/components/tableau-preview-modal"

interface AnimatedElements {
  [key: string]: boolean
}

interface SkillItemProps {
  skill: {
    name: string
    level: number
    icon: React.ReactNode
    color: string
  }
}

export default function AboutPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const [isCVModalOpen, setIsCVModalOpen] = useState(false)
  const [isTableauModalOpen, setIsTableauModalOpen] = useState(false)
  const [animatedElements, setAnimatedElements] = useState<AnimatedElements>({})
  // Nouvel état pour suivre les compétences déjà animées
  const [animatedSkills, setAnimatedSkills] = useState<{ [key: string]: boolean }>({})

  const experiences = [
    {
      title: "BTS SIO option SLAM",
      period: "2023-2025",
      company: "Saint Michel à Annecy",
      type: "Alternance",
      icon: <GraduationCap className="h-8 w-8" />,
      color: "bg-blue-500",
    },
    {
      title: "Bac PRO SN RISC",
      period: "Diplômé en juin 2023",
      company: "Lycée Saint Vincent de Paul",
      location: "Collonges sous Salève",
      icon: <GraduationCap className="h-8 w-8" />,
      color: "bg-green-500",
    },
    {
      title: "Stage - Nicomatic",
      period: "2022-2023",
      company: "Nicomatic",
      type: "Première & Terminale",
      icon: <Briefcase className="h-8 w-8" />,
      color: "bg-purple-500",
      link: "https://www.nicomatic.com/fr",
    },
    {
      title: "Stage - A.I.D",
      period: "2021-2022",
      company: "A.I.D Technologique",
      type: "Première",
      icon: <Briefcase className="h-8 w-8" />,
      color: "bg-amber-500",
      link: "https://aid-tech.fr",
    },
    {
      title: "Stage - Xefi Informatique",
      period: "2021",
      company: "Xefi Informatique",
      type: "Seconde",
      icon: <Briefcase className="h-8 w-8" />,
      color: "bg-red-500",
      link: "https://www.xefi.com/",
    },
  ]

  const skillCategories = [
    {
      name: "Frontend",
      icon: <Code className="h-6 w-6" />,
      color: "from-blue-500/20 to-purple-500/20",
      blurColor: "from-blue-500/10 to-purple-500/10",
      iconBg: "text-blue-500",
      bgIcon: <Globe className="w-24 h-24" />,
      skills: [
        { name: "React / Next.js", level: 85, icon: <Layout className="h-4 w-4" />, color: "bg-blue-500" },
        { name: "HTML / CSS", level: 90, icon: <Code className="h-4 w-4" />, color: "bg-blue-400" },
        { name: "JavaScript", level: 80, icon: <Braces className="h-4 w-4" />, color: "bg-yellow-400" },
        { name: "TypeScript", level: 75, icon: <FileCode className="h-4 w-4" />, color: "bg-blue-600" },
        { name: "Tailwind CSS", level: 85, icon: <Palette className="h-4 w-4" />, color: "bg-cyan-500" },
      ],
    },
    {
      name: "Backend",
      icon: <Database className="h-6 w-6" />,
      color: "from-green-500/20 to-emerald-500/20",
      blurColor: "from-green-500/10 to-emerald-500/10",
      iconBg: "text-green-500",
      bgIcon: <Server className="w-24 h-24" />,
      skills: [
        { name: "Node.js", level: 75, icon: <Server className="h-4 w-4" />, color: "bg-green-500" },
        { name: "PHP", level: 70, icon: <FileCode className="h-4 w-4" />, color: "bg-purple-600" },
        { name: "SQL / Bases de données", level: 65, icon: <Database className="h-4 w-4" />, color: "bg-green-600" },
        { name: "API REST", level: 70, icon: <Globe className="h-4 w-4" />, color: "bg-green-400" },
      ],
    },
    {
      name: "DevOps & Outils",
      icon: <Terminal className="h-6 w-6" />,
      color: "from-amber-500/20 to-orange-500/20",
      blurColor: "from-amber-500/10 to-orange-500/10",
      iconBg: "text-amber-500",
      bgIcon: <Cpu className="w-24 h-24" />,
      skills: [
        { name: "Git / GitHub", level: 80, icon: <GitBranch className="h-4 w-4" />, color: "bg-amber-500" },
        { name: "Docker", level: 65, icon: <Cloud className="h-4 w-4" />, color: "bg-blue-600" },
        { name: "CI/CD", level: 60, icon: <Settings className="h-4 w-4" />, color: "bg-amber-600" },
        { name: "Linux", level: 70, icon: <Terminal className="h-4 w-4" />, color: "bg-amber-400" },
      ],
    },
    {
      name: "Conception",
      icon: <PenTool className="h-6 w-6" />,
      color: "from-purple-500/20 to-pink-500/20",
      blurColor: "from-purple-500/10 to-pink-500/10",
      iconBg: "text-purple-500",
      bgIcon: <Layers className="w-24 h-24" />,
      skills: [
        { name: "UI/UX Design", level: 75, icon: <Palette className="h-4 w-4" />, color: "bg-purple-500" },
        { name: "Responsive Design", level: 85, icon: <Smartphone className="h-4 w-4" />, color: "bg-purple-400" },
        { name: "Méthodes Agiles", level: 70, icon: <Workflow className="h-4 w-4" />, color: "bg-purple-600" },
        { name: "Cybersécurité", level: 65, icon: <Lock className="h-4 w-4" />, color: "bg-red-500" },
      ],
    },
  ]

  // Références pour les éléments à animer
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)
  const experiencesRef = useRef<HTMLDivElement>(null)
  const companyRef = useRef<HTMLDivElement>(null)

  // Observer pour les animations au scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setAnimatedElements((prev) => ({ ...prev, [entry.target.id]: true }))
          }
        })
      },
      { threshold: 0.1 },
    )

    // Observer tous les éléments avec des refs
    if (titleRef.current) {
      titleRef.current.id = "title"
      observer.observe(titleRef.current)
    }
    if (subtitleRef.current) {
      subtitleRef.current.id = "subtitle"
      observer.observe(subtitleRef.current)
    }
    if (buttonsRef.current) {
      buttonsRef.current.id = "buttons"
      observer.observe(buttonsRef.current)
    }
    if (skillsRef.current) {
      skillsRef.current.id = "skills"
      observer.observe(skillsRef.current)
    }
    if (experiencesRef.current) {
      experiencesRef.current.id = "experiences"
      observer.observe(experiencesRef.current)
    }
    if (companyRef.current) {
      companyRef.current.id = "company"
      observer.observe(companyRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Composant SkillItem optimisé pour éviter les réanimations
  const SkillItem = ({ skill }: SkillItemProps) => {
    const skillRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            // Marquer cette compétence comme animée une seule fois
            setAnimatedSkills((prev) => ({
              ...prev,
              [skill.name]: true,
            }))
          }
        },
        { threshold: 0.1 },
      )

      if (skillRef.current) {
        observer.observe(skillRef.current)
      }

      return () => observer.disconnect()
    }, [skill.name])

    // Vérifier si cette compétence a déjà été animée
    const isAnimated = animatedSkills[skill.name] || false

    return (
      <div
        ref={skillRef}
        className="flex items-center space-x-3 mb-3 group"
        onMouseEnter={() => setHoveredSkill(skill.name)}
        onMouseLeave={() => setHoveredSkill(null)}
      >
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full ${skill.color} bg-opacity-20 flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
        >
          {skill.icon}
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">{skill.name}</span>
            <span className="text-xs text-muted-foreground">{skill.level}%</span>
          </div>
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full ${skill.color} rounded-full transition-all duration-1000 ease-out`}
              style={{
                width: isAnimated ? `${skill.level}%` : "0%",
                // Désactiver la transition après l'animation initiale
                transitionProperty: isAnimated ? "none" : "width",
              }}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden">
      <PlanetBackground3D planetType="mercury" />
      <div className="relative z-10 flex flex-col flex-grow">
        <Header />

        <div className="container mx-auto px-4 flex-grow py-12">
          <div
            className={`text-center mb-16 transition-all duration-700 ${
              animatedElements["title"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            ref={titleRef}
          >
            <h1 className="text-5xl font-bold mb-6">Lilyan Giraud</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto" ref={subtitleRef}>
              20 ans, passionné par l'informatique
            </p>

            <div
              className={`mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 ${
                animatedElements["buttons"] ? "opacity-100 scale-100" : "opacity-0 scale-90"
              }`}
              ref={buttonsRef}
            >
              <Button size="lg" className="rounded-full px-8 py-6 text-lg" onClick={() => setIsCVModalOpen(true)}>
                <Eye className="mr-2 h-5 w-5" />
                Voir mon CV
              </Button>

              <Button
                size="lg"
                className="rounded-full px-8 py-6 text-lg bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => setIsTableauModalOpen(true)}
              >
                <Table className="mr-2 h-5 w-5" />
                Tableau de synthèse
              </Button>
            </div>
          </div>

          <div
            className={`mb-16 transition-all duration-700 ${animatedElements["skills"] ? "opacity-100" : "opacity-0"}`}
            ref={skillsRef}
          >
            <h2 className="text-3xl font-bold mb-8 text-center">Mes Compétences</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skillCategories.map((category, index) => (
                <div
                  key={index}
                  className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${category.color} p-1 transition-all duration-300 hover:scale-[1.01]`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.blurColor} blur-xl`} />
                  <div className="relative bg-background/80 backdrop-blur-sm rounded-lg p-6 h-full">
                    <div className="absolute -right-4 -top-4 opacity-10">{category.bgIcon}</div>
                    <h3 className="text-xl font-bold mb-6 flex items-center">
                      <span className={`mr-2 ${category.iconBg}`}>{category.icon}</span>
                      {category.name}
                    </h3>
                    <div className="space-y-1">
                      {category.skills.map((skill, skillIndex) => (
                        <SkillItem key={`${category.name}-${skill.name}`} skill={skill} />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`mb-16 transition-all duration-700 ${
              animatedElements["experiences"] ? "opacity-100" : "opacity-0"
            }`}
            ref={experiencesRef}
          >
            <h2 className="text-3xl font-bold mb-8 text-center">Mon Parcours</h2>

            {/* Timeline responsive */}
            <div className="relative mx-auto max-w-4xl">
              {/* Timeline center line - visible uniquement sur les écrans md et plus */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary/80 to-primary/20 rounded-full hidden md:block"></div>

              {/* Timeline center line - visible uniquement sur les écrans mobiles */}
              <div className="absolute left-8 top-0 h-full w-1 bg-gradient-to-b from-primary/80 to-primary/20 rounded-full md:hidden"></div>

              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className={`relative flex items-center mb-12 transition-all duration-500`}
                  style={{
                    opacity: animatedElements["experiences"] ? 1 : 0,
                    transform: `translateY(${animatedElements["experiences"] ? "0px" : "20px"})`,
                    transitionDelay: `${0.1 * index}s`,
                  }}
                >
                  {/* Timeline dot - desktop */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 z-10 hidden md:block">
                    <div className={`${exp.color} p-3 rounded-full shadow-lg border-4 border-background`}>
                      {exp.icon}
                    </div>
                  </div>

                  {/* Timeline dot - mobile */}
                  <div className="absolute left-8 transform -translate-x-1/2 z-10 md:hidden">
                    <div className={`${exp.color} p-3 rounded-full shadow-lg border-4 border-background`}>
                      {exp.icon}
                    </div>
                  </div>

                  {/* Content box - desktop: alternating left/right */}
                  <div
                    className={`
                      w-full pl-16 pr-4 md:w-5/12 md:pl-0 md:pr-0
                      ${index % 2 === 0 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"}
                    `}
                  >
                    <div
                      className={`relative p-6 rounded-xl bg-card border border-border shadow-md hover:shadow-lg transition-all duration-300 hover:border-primary`}
                      onMouseEnter={() => setHoveredCard(index)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      {/* Decorative elements - desktop */}
                      <div
                        className={`absolute -z-10 ${index % 2 === 0 ? "-right-3" : "-left-3"} top-1/2 transform -translate-y-1/2 w-6 h-6 rotate-45 bg-card border border-border ${index % 2 === 0 ? "border-r-0 border-t-0" : "border-l-0 border-b-0"} hidden md:block`}
                      ></div>

                      {/* Decorative elements - mobile */}
                      <div
                        className={`absolute -z-10 -left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 rotate-45 bg-card border border-border border-l-0 border-b-0 md:hidden`}
                      ></div>

                      <div
                        className={`absolute -right-4 -top-4 w-32 h-32 rounded-full opacity-5 ${exp.color} transition-all duration-500 ${hoveredCard === index ? "scale-150" : "scale-100"}`}
                      ></div>

                      {/* Content */}
                      <div className="flex flex-col">
                        <h3 className="text-xl font-bold">{exp.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{exp.period}</p>
                        <p className="font-medium">{exp.company}</p>
                        {exp.location && <p className="text-sm text-muted-foreground">{exp.location}</p>}
                        {exp.type && <p className="text-sm">{exp.type}</p>}

                        {exp.link && (
                          <div
                            className={`mt-4 transition-all duration-300 ${hoveredCard === index ? "opacity-100" : "opacity-70"}`}
                          >
                            <Button variant="outline" size="sm" asChild>
                              <Link href={exp.link} target="_blank" rel="noopener noreferrer">
                                Visiter le site
                              </Link>
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`transition-all duration-700 ${
              animatedElements["company"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            ref={companyRef}
          >
            <Card className="overflow-hidden border-2 hover:border-primary transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-primary text-primary-foreground">
                    <Building className="h-6 w-6" />
                  </div>
                  <CardTitle>Ma Société Actuelle</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  <a
                    href="https://www.nicomatic.com/fr"
                    className="text-primary hover:underline font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Nicomatic
                  </a>{" "}
                  possède un service informatique se divisant en plusieurs parties, qui sont : l'
                  <strong>équipe IT</strong>, les <strong>Devs/DevOps</strong> et l'équipe{" "}
                  <strong>cybersécurité</strong>.
                </p>
                <p>
                  J'ai rejoint il y a peu la partie Dev/DevOps en tant qu'<strong>apprenti</strong>. L'équipe DevOps se
                  compose de deux personnes, mon tuteur et moi-même (apprenti).
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <Footer />
      </div>

      <CVPreviewModal isOpen={isCVModalOpen} onClose={() => setIsCVModalOpen(false)} />
      <TableauPreviewModal isOpen={isTableauModalOpen} onClose={() => setIsTableauModalOpen(false)} />
    </main>
  )
}
