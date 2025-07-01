"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SpaceBackground3D } from "@/components/SpaceBackground3D"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, GraduationCap, Briefcase } from "lucide-react"
import { GlassCard } from "@/components/glass-card"

export default function CVPage() {
  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden">
      <SpaceBackground3D />
      <div className="relative z-10 flex flex-col flex-grow">
        <Header />

        <div className="container mx-auto px-4 flex-grow">
          <section className="py-12">
            <h1 className="text-4xl font-bold mb-8 text-center">Mon CV</h1>

            <div className="grid gap-8 max-w-4xl mx-auto">
              <GlassCard glowColor="rgba(0, 200, 255, 0.15)">
                <CardHeader>
                  <CardTitle className="flex items-center text-primary">
                    <GraduationCap className="mr-2" />
                    Formation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[
                    {
                      period: "2020 - 2023",
                      title: "Master en Développement Web",
                      institution: "Université de Paris",
                      description:
                        "Formation complète en développement web front-end et back-end, avec spécialisation en React et Node.js.",
                    },
                    {
                      period: "2017 - 2020",
                      title: "Licence en Informatique",
                      institution: "Université de Lyon",
                      description: "Fondamentaux de l'informatique, algorithmique, et programmation.",
                    },
                  ].map((item, index) => (
                    <div key={index} className="border-l-2 border-primary pl-4 space-y-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-2 h-4 w-4 text-primary" />
                        {item.period}
                      </div>
                      <h3 className="text-lg font-semibold text-primary">{item.title}</h3>
                      <p>{item.institution}</p>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  ))}
                </CardContent>
              </GlassCard>

              <GlassCard glowColor="rgba(0, 200, 255, 0.15)">
                <CardHeader>
                  <CardTitle className="flex items-center text-primary">
                    <Briefcase className="mr-2" />
                    Expérience Professionnelle
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[
                    {
                      period: "2023 - Présent",
                      title: "Développeur Full Stack",
                      company: "Entreprise Tech",
                      description:
                        "Développement d'applications web avec React, Next.js, et Node.js. Mise en place d'architectures cloud sur AWS.",
                    },
                    {
                      period: "2021 - 2023",
                      title: "Développeur Front-end",
                      company: "Agence Web",
                      description:
                        "Création d'interfaces utilisateur réactives et accessibles avec React et TypeScript.",
                    },
                  ].map((item, index) => (
                    <div key={index} className="border-l-2 border-primary pl-4 space-y-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-2 h-4 w-4 text-primary" />
                        {item.period}
                      </div>
                      <h3 className="text-lg font-semibold text-primary">{item.title}</h3>
                      <p>{item.company}</p>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  ))}
                </CardContent>
              </GlassCard>

              <GlassCard glowColor="rgba(0, 200, 255, 0.15)">
                <CardHeader>
                  <CardTitle className="text-primary">Compétences</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Langages de programmation",
                        skills: ["JavaScript", "TypeScript", "HTML", "CSS", "Python"],
                      },
                      {
                        title: "Frameworks & Bibliothèques",
                        skills: ["React", "Next.js", "Node.js", "Express", "Tailwind CSS"],
                      },
                      {
                        title: "Outils & Plateformes",
                        skills: ["Git", "GitHub", "Docker", "AWS", "Vercel"],
                      },
                    ].map((category, index) => (
                      <div key={index}>
                        <h3 className="font-medium mb-2 text-primary">{category.title}</h3>
                        <div className="flex flex-wrap gap-2">
                          {category.skills.map((skill, skillIndex) => (
                            <div key={skillIndex}>
                              <Badge className="bg-primary/20 hover:bg-primary/30 text-white">{skill}</Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </GlassCard>
            </div>
          </section>
        </div>

        <Footer />
      </div>
    </main>
  )
}

