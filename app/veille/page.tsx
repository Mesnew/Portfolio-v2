import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PlanetBackground3D } from "@/components/PlanetBackground3D"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Rss,
  Users,
  Code,
  Lightbulb,
  ArrowRight,
  Globe,
  Headphones,
  Youtube,
  Bell,
  Twitter,
  Github,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function VeillePage() {
  const sources = [
    {
      name: "DevOps.com",
      url: "https://devops.com/",
      description: "Actualités, tendances et études de cas sur le DevOps.",
      logo: "/placeholder.svg?height=60&width=60",
      type: "Site spécialisé",
    },
    {
      name: "The New Stack",
      url: "https://thenewstack.io/",
      description: "Articles approfondis sur les outils et pratiques DevOps.",
      logo: "/placeholder.svg?height=60&width=60",
      type: "Blog",
    },
    {
      name: "Medium - DevOps",
      url: "https://medium.com/tag/devops",
      description: "Témoignages et retours d'expérience de professionnels.",
      logo: "/placeholder.svg?height=60&width=60",
      type: "Plateforme",
    },
    {
      name: "Reddit - r/devops",
      url: "https://www.reddit.com/r/devops/",
      description: "Discussions et conseils de la communauté DevOps.",
      logo: "/placeholder.svg?height=60&width=60",
      type: "Forum",
    },
  ]

  const conferences = [
    {
      name: "KubeCon + CloudNativeCon",
      description: "Focus sur Kubernetes et les technologies cloud-native.",
      url: "https://www.cncf.io/kubecon-cloudnativecon-events/",
    },
    {
      name: "DevOps Enterprise Summit",
      description: "Échanges sur les meilleures pratiques en entreprise.",
      url: "https://events.itrevolution.com/",
    },
    {
      name: "HashiConf",
      description: "Conférence dédiée aux outils HashiCorp (Terraform, Vault, Consul, etc.).",
      url: "https://hashiconf.com/",
    },
  ]

  const podcasts = [
    {
      name: "DevOps Paradox",
      description: "Analyse des tendances et des outils.",
      url: "https://www.devopsparadox.com/",
    },
    {
      name: "Ship It! (Changelog)",
      description: "Témoignages de professionnels du DevOps.",
      url: "https://changelog.com/shipit",
    },
  ]

  const youtubeChannels = [
    {
      name: "TechWorld with Nana",
      description: "Tutoriels sur Kubernetes, Terraform et CI/CD.",
      url: "https://www.youtube.com/c/TechWorldwithNana",
    },
    {
      name: "IBM Technology",
      description: "Explications sur l'automatisation et l'infrastructure.",
      url: "https://www.youtube.com/c/IBMTechnology",
    },
  ]

  const veilleTechnologique = [
    {
      name: "Google Alerts",
      description: 'Suivi des mots-clés "DevOps", "CI/CD", "Kubernetes".',
      icon: <Bell className="h-6 w-6 text-yellow-400" />,
    },
    {
      name: "Feedly",
      description: "Agrégateur de flux RSS pour centraliser mes sources.",
      icon: <Rss className="h-6 w-6 text-orange-400" />,
    },
    {
      name: "Twitter/X et LinkedIn",
      description: "Suivi d'experts comme Kelsey Hightower et Gene Kim.",
      icon: <Twitter className="h-6 w-6 text-blue-400" />,
    },
    {
      name: "GitHub Trends",
      description: "Découverte des projets DevOps les plus populaires.",
      icon: <Github className="h-6 w-6 text-purple-400" />,
    },
  ]

  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden">
      <PlanetBackground3D planetType="jupiter" />
      <div className="relative z-10 flex flex-col flex-grow">
        <Header />

        <div className="container mx-auto px-4 py-12 flex-grow">
          <div className="max-w-4xl mx-auto">
            {/* En-tête de la page */}
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 px-4 py-1 text-lg font-medium">
                Veille Technologique
              </Badge>
              <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                DevOps
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Une exploration continue des pratiques, outils et tendances qui transforment le déploiement et la
                livraison de logiciels.
              </p>
            </div>

            {/* Introduction au DevOps */}
            <Card className="mb-12 backdrop-blur-sm bg-black/30 border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl">Introduction au DevOps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Le DevOps est une approche qui vise à améliorer la collaboration entre les équipes de développement
                  (Dev) et d'exploitation (Ops) afin d'automatiser et d'optimiser le cycle de vie des applications. Il
                  repose sur des principes tels que l'intégration continue (CI), le déploiement continu (CD),
                  l'infrastructure en tant que code (IaC) et la culture de l'amélioration continue.
                </p>
                <p>
                  Grâce au DevOps, les entreprises peuvent accélérer la mise en production de leurs applications,
                  améliorer leur fiabilité et réduire les erreurs humaines.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="flex flex-col items-center p-4 bg-primary/10 rounded-lg">
                    <Code className="h-10 w-10 text-blue-400 mb-2" />
                    <h3 className="font-medium">Automatisation</h3>
                    <p className="text-sm text-center text-muted-foreground">
                      Pipelines CI/CD et Infrastructure as Code
                    </p>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-primary/10 rounded-lg">
                    <Users className="h-10 w-10 text-purple-400 mb-2" />
                    <h3 className="font-medium">Collaboration</h3>
                    <p className="text-sm text-center text-muted-foreground">GitOps et pratiques collaboratives</p>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-primary/10 rounded-lg">
                    <Lightbulb className="h-10 w-10 text-yellow-400 mb-2" />
                    <h3 className="font-medium">Innovation</h3>
                    <p className="text-sm text-center text-muted-foreground">
                      Conteneurisation et architectures cloud-native
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Comment je m'informe sur le DevOps */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6 flex items-center">
                <Rss className="mr-3 h-8 w-8 text-orange-500" />
                Comment je m'informe sur le DevOps
              </h2>
              <Card className="backdrop-blur-sm bg-black/30 border-primary/20 mb-8">
                <CardContent className="pt-6">
                  <p className="mb-6">
                    Pour rester à jour sur les évolutions du DevOps, j'adopte une veille technologique basée sur
                    plusieurs sources et outils :
                  </p>
                </CardContent>
              </Card>

              {/* Sites spécialisés et blogs */}
              <h3 className="text-2xl font-semibold mb-4 flex items-center">
                <Globe className="mr-2 h-6 w-6 text-blue-400" />
                Sites spécialisés et blogs
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {sources.map((source, index) => (
                  <Card
                    key={index}
                    className="backdrop-blur-sm bg-black/30 border-primary/20 hover:border-primary/50 transition-all"
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-center mb-4">
                        <div className="relative h-12 w-12 mr-4 bg-white rounded-full overflow-hidden">
                          <Image
                            src={source.logo || "/placeholder.svg"}
                            alt={source.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{source.name}</h3>
                          <Badge variant="outline" className="mt-1">
                            {source.type}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{source.description}</p>
                      <Button variant="link" asChild className="p-0">
                        <Link
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-blue-400"
                        >
                          Visiter <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Conférences et événements */}
              <h3 className="text-2xl font-semibold mb-4 flex items-center">
                <Users className="mr-2 h-6 w-6 text-purple-400" />
                Conférences et événements
              </h3>
              <Card className="backdrop-blur-sm bg-black/30 border-primary/20 mb-10">
                <CardContent className="pt-6">
                  <ul className="divide-y divide-primary/10">
                    {conferences.map((conference, index) => (
                      <li key={index} className="py-4 first:pt-0 last:pb-0">
                        <div className="flex justify-between items-start mb-1">
                          <Link
                            href={conference.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium hover:text-blue-400 transition-colors"
                          >
                            {conference.name}
                          </Link>
                        </div>
                        <p className="text-sm text-muted-foreground">{conference.description}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Podcasts et chaînes YouTube */}
              <h3 className="text-2xl font-semibold mb-4 flex items-center">
                <Headphones className="mr-2 h-6 w-6 text-green-400" />
                Podcasts et chaînes YouTube
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card className="backdrop-blur-sm bg-black/30 border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center">
                      <Headphones className="mr-2 h-5 w-5 text-green-400" />
                      Podcasts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {podcasts.map((podcast, index) => (
                        <li key={index} className="border-l-2 border-green-500 pl-4">
                          <Link
                            href={podcast.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium hover:text-green-400 transition-colors"
                          >
                            {podcast.name}
                          </Link>
                          <p className="text-sm text-muted-foreground">{podcast.description}</p>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="backdrop-blur-sm bg-black/30 border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center">
                      <Youtube className="mr-2 h-5 w-5 text-red-400" />
                      YouTube
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {youtubeChannels.map((channel, index) => (
                        <li key={index} className="border-l-2 border-red-500 pl-4">
                          <Link
                            href={channel.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium hover:text-red-400 transition-colors"
                          >
                            {channel.name}
                          </Link>
                          <p className="text-sm text-muted-foreground">{channel.description}</p>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Outils de veille technologique */}
              <h3 className="text-2xl font-semibold mb-4 flex items-center">
                <Bell className="mr-2 h-6 w-6 text-yellow-400" />
                Outils de veille technologique
              </h3>
              <Card className="backdrop-blur-sm bg-black/30 border-primary/20 mb-10">
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {veilleTechnologique.map((outil, index) => (
                      <div key={index} className="flex items-start">
                        <div className="bg-primary/10 p-2 rounded-full mr-4">{outil.icon}</div>
                        <div>
                          <h4 className="font-medium mb-1">{outil.name}</h4>
                          <p className="text-sm text-muted-foreground">{outil.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Conclusion */}
            <Card className="backdrop-blur-sm bg-black/30 border-primary/20 mb-8">
              <CardHeader>
                <CardTitle className="text-2xl">Conclusion</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  La veille technologique en DevOps est essentielle pour suivre l'évolution rapide des outils et des
                  bonnes pratiques. En combinant la lecture d'articles, la participation à des événements, l'écoute de
                  podcasts et l'utilisation d'outils de veille, je peux rester informé et améliorer mes compétences
                  continuellement.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <Footer />
      </div>
    </main>
  )
}
