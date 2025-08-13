"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PlanetBackground3D } from "@/components/PlanetBackground3D"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, Star } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { ProjectDetailModal, type ProjectDetail } from "@/components/project-detail-modal"
import { useRouter } from "next/navigation"

export default function RealisationsPage() {
  const router = useRouter()
  const [animatedItems, setAnimatedItems] = useState<Set<number>>(new Set())
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number.parseInt(entry.target.getAttribute("data-index") || "0")
            setAnimatedItems((prev) => new Set(prev).add(index))
          }
        })
      },
      { threshold: 0.1 },
    )

    document.querySelectorAll("[data-index]").forEach((el) => {
      observer.observe(el)
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  const isAnimated = (index: number) => animatedItems.has(index)

  const openProjectDetails = (project: ProjectDetail) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeProjectDetails = () => {
    setIsModalOpen(false)
  }

  const handleViewDetails = (url: string) => {
    closeProjectDetails()
    router.push(url)
  }

  const projects: ProjectDetail[] = [
    {
      id: 1,
      title: "Configuration AWS",
      description: "Configuration d'un serveur AWS pour un environnement de test",
      fullDescription:
        "J'ai mis en place et configuré un serveur AWS EC2 pour héberger un environnement de test complet. Ce projet a impliqué la configuration des groupes de sécurité, la mise en place d'un équilibreur de charge et l'automatisation du déploiement via des scripts.",
      challenges: [
        "Héberger un site avec un certificat SSL dans un environnement AWS",
        "Sécuriser l'environnement",
        "Créer schéma de l'architecture + comprendre celle ci",
      ],
      features: ["Accès clés SSH", "EC2/S3", "Hébergement web"],
      image: "/placeholder.svg?height=600&width=800",
      logo: "/images/logos/aws.png",
      screenshots: [
        "/placeholder.svg?height=600&width=800&text=AWS+Console",
        "/placeholder.svg?height=600&width=800&text=CloudFormation+Template",
      ],
      tags: ["Cloud", "AWS"],
      color: "#00A8FF",
      demoUrl: "/realisations/aws-project-details",
      githubUrl: "https://github.com",
      year: "2023",
    },
    {
      id: 2,
      title: "Déploiement d'agents via GPO",
      description: "Automatisation du déploiement d'agents OCS Inventory via GPO sur Active Directory",
      fullDescription:
        "Concernant mon projet d'installation de GLPI, je devais installer un agent OCS sur chaque poste de l'entreprise pour qu'il soit référencé dans GLPI. Cela nous permettrait de garder une trace des postes connectés et de renforcer la sécurité. Ce principe d'automatisation devait se faire via une GPO sur le serveur Active Directory de l'entreprise.",
      challenges: [
        "Transformer un exécutable .exe en package avec les mêmes caractéristiques qu'un fichier .msi",
        "Configurer correctement la GPO pour un déploiement automatique au démarrage",
        "Assurer une installation silencieuse sans intervention utilisateur",
      ],
      features: [
        "Déploiement automatisé sur tous les postes de l'entreprise",
        "Installation silencieuse sans intervention utilisateur",
        "Intégration avec GLPI pour le suivi des postes",
        "Mise à jour des stratégies via gpupdate /force",
      ],
      image: "/placeholder.svg?height=600&width=800",
      logo: "/images/logos/ocs.png",
      tags: ["Automatisation", "PowerShell", "Active Directory", "GPO"],
      color: "#00A8FF",
      demoUrl: "/realisations/gpo-project-details",
      githubUrl: "https://github.com",
      year: "2022",
    },
    {
      id: 3,
      title: "Versioning GitLab",
      description: "Mise en place de mon premier dépôt pour un projet collaboratif",
      fullDescription:
        "Pour mon projet Docusaurus, je souhaitais le partager avec mon tuteur et le conserver pour y accéder de n'importe où en cas de besoin. J'ai donc décidé de le committer sur GitLab afin qu'il soit facilement accessible.",
      challenges: [
        "Configurer correctement les permissions pour partager le projet",
        "Organiser le dépôt pour faciliter la navigation",
        "Maîtriser les commandes Git nécessaires",
      ],
      features: [
        "Accessibilité du projet depuis n'importe quel appareil",
        "Sauvegarde sécurisée du code source",
        "Collaboration simplifiée avec le tuteur",
        "Historique complet des modifications",
      ],
      image: "/placeholder.svg?height=600&width=800",
      logo: "/images/logos/gitlab.png",
      tags: ["Git", "Automatisation"],
      color: "#00A8FF",
      demoUrl: "/realisations/gitlab-project-details",
      githubUrl: "https://github.com",
      year: "2023",
    },
    {
      id: 4,
      title: "Documentation technique",
      description: "Création de documentation claire et détaillée pour mes projets",
      fullDescription:
        "Tout au long de ce projet, j'ai effectué des documentations que j'ai déposées dans un dépôt GitLab nicomatic. Cela pourra aider l'équipe DevOps à comprendre comment mon infrastructure est faite, et principalement permettre un gain de temps lors de l'installation de logiciels/outils.",
      challenges: [
        "Structurer la documentation de manière logique et accessible",
        "Trouver le bon équilibre entre détails et concision",
        "Intégrer efficacement la documentation avec GitLab",
      ],
      features: [
        "Documentation LOCAL pour l'environnement de développement",
        "Documentation PROD pour l'environnement de production",
        "Procédures détaillées pour l'installation et la configuration",
        "Guides de dépannage et de résolution de problèmes",
      ],
      image: "/placeholder.svg?height=600&width=800",
      logo: "/images/logos/markdown.png",
      tags: ["Markdown", "Documentation"],
      color: "#00A8FF",
      demoUrl: "/realisations/documentation-project-details",
      githubUrl: "https://github.com",
      year: "2023",
    },
    {
      id: 5,
      title: "CI/CD avec GitLab",
      description: "Automatisation des pipelines de déploiement avec GitLab CI/CD",
      fullDescription:
        "Après avoir finalisé mon projet d'hébergement de site web, j'ai entrepris l'automatisation du déploiement avec GitLab CI/CD. Cette solution me permet d'éviter l'utilisation répétitive de lignes de commande pour mettre à jour mon site à chaque modification effectuée sur une de mes pages.",
      challenges: [
        "Configuration du fichier YAML pour définir les étapes du pipeline",
        "Configuration des runners GitLab pour exécuter les jobs",
        "Gestion des secrets et variables d'environnement",
      ],
      features: [
        "Déploiement automatisé à chaque modification",
        "Réduction des erreurs humaines dans le processus",
        "Gain de temps considérable pour l'avancement du projet",
        "Intégration continue des modifications",
      ],
      image: "/placeholder.svg?height=600&width=800",
      logo: "/images/logos/gitlab.png",
      tags: ["Automatisation", "CI/CD"],
      color: "#00A8FF",
      demoUrl: "/realisations/cicd-project-details",
      githubUrl: "https://github.com",
      year: "2023",
    },
    {
      id: 6,
      title: "Gestion de database",
      description: "Restauration et configuration de bases SQL PostgreSQL",
      fullDescription:
        "J'ai travaillé sur la mise en place d'une base de données dockerisée intégrant des scripts pour importer automatiquement des fichiers de sauvegarde .bak à partir d'un script restore_db.sh. Cette solution a permis une configuration rapide et homogène de l'environnement de développement.",
      challenges: [
        "Configuration de l'image Docker pour MS SQL Server",
        "Gestion des volumes et persistance des données",
        "Automatisation de la restauration des bases",
      ],
      features: [
        "Configuration rapide et homogène de l'environnement",
        "Automatisation complète de la restauration des bases",
        "Portabilité entre différentes machines",
        "Simplification du déploiement en production",
      ],
      image: "/placeholder.svg?height=600&width=800",
      logo: "/images/logos/mysql.png",
      tags: ["SQL", "Docker"],
      color: "#00A8FF",
      demoUrl: "/realisations/database-project-details",
      githubUrl: "https://github.com",
      year: "2023",
    },
    {
      id: 7,
      title: "API Swagger",
      description: "Intégration et documentation complète d'une API avec Swagger",
      fullDescription:
        "Dans ce projet, j'ai conçu une API REST permettant de récupérer des informations à partir d'une base de données MS SQL Server dockerisée. La documentation a été réalisée avec Swagger pour décrire chaque endpoint de manière claire et précise.",
      challenges: [
        "Intégration avec MS SQL Server",
        "Documentation Swagger complète",
        "Déploiement dans un conteneur Docker",
      ],
      features: [
        "Documentation interactive des endpoints",
        "Simplification de l'utilisation de l'API",
        "Tests facilités via l'interface Swagger",
        "Maintenance simplifiée de l'API",
      ],
      image: "/placeholder.svg?height=600&width=800",
      logo: "/images/logos/swagger.jpg",
      tags: ["API", "Swagger"],
      color: "#00A8FF",
      demoUrl: "/realisations/swagger-project-details",
      githubUrl: "https://github.com",
      year: "2023",
    },
    {
      id: 8,
      title: "GLPI",
      description: "Installation de GLPI",
      fullDescription:
        "Lors de mon premier stage dans l'entreprise Nicomatic, j'ai été chargé d'installer une nouvelle version de GLPI pour moderniser l'interface existante et renforcer la sécurité du système de ticketing.",
      challenges: [
        "Configuration de l'environnement serveur",
        "Installation et configuration de GLPI",
        "Sécurisation de l'installation",
      ],
      features: [
        "Interface modernisée et plus intuitive",
        "Sécurité renforcée du système de ticketing",
        "Meilleure gestion des incidents",
        "Suivi efficace des actifs informatiques",
      ],
      image: "/placeholder.svg?height=600&width=800",
      logo: "/images/logos/glpi.png",
      tags: ["Ticketing", "Linux", "Debian"],
      color: "#00A8FF",
      demoUrl: "/realisations/glpi-project-details",
      githubUrl: "https://github.com",
      year: "2022",
    },
    {
      id: 9,
      title: "Switch",
      description: "Configuration d'un switch",
      image: "/placeholder.svg?height=600&width=800",
      logo: "/images/logos/switch.png",
      tags: ["Configuration", "Matériel"],
      color: "#00A8FF",
      demoUrl: "/realisations/switch-project-details",
      githubUrl: "https://github.com",
    },
    {
      id: 11,
      title: "Site web professionnel",
      description: "Création d'un site vitrine avec Docusaurus",
      image: "/placeholder.svg?height=600&width=800",
      logo: "/images/logos/javascript.jpg",
      tags: ["JavaScript", "React", "Docusaurus"],
      color: "#00A8FF",
      demoUrl: "/realisations/site-web-project-details",
      githubUrl: "https://github.com",
      year: "2023",
    },
    {
      id: 12,
      title: "Calculatrice en C#",
      description: "Développement d'une calculatrice avec une interface graphique",
      image: "/placeholder.svg?height=600&width=800",
      logo: "/images/logos/csharp.png",
      tags: ["C#", ".NET", "WPF"],
      color: "#00A8FF",
      demoUrl: "/realisations/calculatrice-project-details",
      githubUrl: "https://github.com",
      year: "2022",
    },
    {
      id: 13,
      title: "Gestion de banque en C#",
      description: "Développement d'une application de gestion bancaire",
      image: "/placeholder.svg?height=600&width=800",
      logo: "/images/logos/csharp.png",
      tags: ["C#", ".NET", "SQL"],
      color: "#00A8FF",
      demoUrl: "/realisations/banque-project-details",
      githubUrl: "https://github.com",
      year: "2022",
    },
    {
      id: 14,
      title: "Réservation d'hôtel",
      description: "Création d'une app de réservation de chambres d'hôtel",
      image: "/placeholder.svg?height=600&width=800",
      logo: "/images/logos/postgresql.png",
      tags: ["PostgreSQL", "PHP", "Bootstrap"],
      color: "#00A8FF",
      demoUrl: "/realisations/hotel-project-details",
      githubUrl: "https://github.com",
      year: "2021",
    },
  ]

  // Compléter les projets restants avec les données existantes
  const allProjects = projects

  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden">
      <PlanetBackground3D planetType="mars" />
      <div className="relative z-10 flex flex-col flex-grow">
        <Header />

        <div className="container mx-auto px-4 flex-grow">
          <section className="py-12">
            <h1 className="text-4xl font-bold mb-8 text-center">Mes Réalisations</h1>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
              Découvrez mes projets en développement web, infrastructure et logiciel. Chaque projet représente un défi
              unique et des compétences spécifiques.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allProjects.map((project, index) => (
                <div
                  key={index}
                  data-index={index}
                  className={`transform transition-all duration-700 ${
                    isAnimated(index) ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
                  }`}
                  onMouseEnter={() => setHoveredProject(index)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <Card
                    className={`relative overflow-hidden h-full border-0 shadow-lg transition-all duration-500 cursor-pointer group
                      ${
                        hoveredProject === index
                          ? "scale-105 shadow-xl shadow-blue-500/30 z-10"
                          : "scale-100 hover:shadow-md hover:shadow-blue-500/20"
                      }`}
                    onClick={() => openProjectDetails(project)}
                  >
                    {/* Fond avec dégradé et effet de particules */}
                    <div
                      className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700 z-0"
                      style={{
                        background: `linear-gradient(135deg, rgba(0,168,255,0.95) 0%, rgba(0,123,255,0.95) 100%)`,
                      }}
                    >
                      {/* Particules décoratives */}
                      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
                        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-white blur-2xl"></div>
                        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 rounded-full bg-white blur-2xl"></div>
                      </div>
                    </div>

                    {/* Effet de bordure brillante au survol */}
                    <div
                      className={`absolute inset-0 border-2 border-white/0 rounded-lg transition-all duration-500 z-0
                      ${hoveredProject === index ? "border-white/30 shadow-inner" : ""}`}
                    ></div>

                    {/* Contenu de la carte */}
                    <div className="relative z-10">
                      <CardHeader className="pb-2 flex flex-col items-center">
                        <div
                          className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-all duration-500
                          ${hoveredProject === index ? "bg-white shadow-lg shadow-blue-600/20" : "bg-white/90"}`}
                        >
                          <Image
                            src={project.logo || "/placeholder.svg"}
                            alt={project.title}
                            width={50}
                            height={50}
                            className={`object-contain transition-transform duration-500
                              ${hoveredProject === index ? "scale-110" : "scale-100"}`}
                          />
                        </div>
                        <CardTitle
                          className={`text-xl text-center font-bold text-white transition-all duration-300
                          ${hoveredProject === index ? "text-2xl" : "text-xl"}`}
                        >
                          {project.title}
                        </CardTitle>
                        <div
                          className={`h-1 bg-white/30 rounded-full mt-3 transition-all duration-500
                          ${hoveredProject === index ? "w-24 bg-white/60" : "w-16 bg-white/30"}`}
                        ></div>
                      </CardHeader>

                      <CardContent className="text-center px-6">
                        <p className="text-white/90 mb-4 text-sm">{project.description}</p>
                      </CardContent>

                      <CardFooter className="flex justify-center gap-2 flex-wrap pt-0 pb-12">
                        {project.tags.map((tag, tagIndex) => (
                          <Badge
                            key={tagIndex}
                            variant="outline"
                            className={`transition-all duration-300
                              ${
                                hoveredProject === index
                                  ? "bg-white/20 border-white/40 text-white"
                                  : "bg-white/10 border-white/20 text-white/90"
                              } 
                              text-xs backdrop-blur-sm`}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </CardFooter>
                    </div>

                    {/* Bouton "Voir détails" qui apparaît au survol */}
                    <div
                      className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-700/90 to-transparent 
                        py-3 px-4 flex justify-center items-center transition-all duration-500 z-20
                        ${hoveredProject === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                    >
                      <span className="text-white text-sm font-medium flex items-center">
                        Voir détails <ArrowUpRight className="ml-1 h-4 w-4" />
                      </span>
                    </div>

                    {/* Étoile décorative en haut à droite */}
                    <div
                      className={`absolute top-3 right-3 transition-all duration-500
                        ${hoveredProject === index ? "opacity-100 rotate-45" : "opacity-30 rotate-0"}`}
                    >
                      <Star className="h-4 w-4 text-white/70" />
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </section>
        </div>

        <Footer />
      </div>

      <ProjectDetailModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeProjectDetails}
        onViewDetails={handleViewDetails}
      />
    </main>
  )
}
