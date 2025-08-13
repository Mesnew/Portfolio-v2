"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PlanetBackground3D } from "@/components/PlanetBackground3D"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  Server,
  Shield,
  GitBranch,
  Book,
  BookOpen,
  FolderTree,
  Users,
  Clock,
  Lightbulb,
} from "lucide-react"
import Link from "next/link"

export default function DocumentationProjectDetailsPage() {
  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden">
      <PlanetBackground3D planetType="venus" />
      <div className="relative z-10 flex flex-col flex-grow">
        <Header />

        <div className="container mx-auto px-4 py-8 flex-grow">
          <Link
            href="/realisations"
            className="inline-flex items-center text-sm text-white/70 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux réalisations
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="bg-black/40 border-primary/20 backdrop-blur-sm overflow-hidden">
                <div className="relative h-48 w-full bg-gradient-to-br from-purple-500/20 to-pink-600/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Book className="h-24 w-24 text-purple-500/70" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-purple-600" />
                    </div>
                    <h1 className="text-xl font-bold text-white">Documentation technique</h1>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-2 mb-6">
                    <Badge variant="outline" className="bg-primary/20 border-primary/30 text-primary-foreground">
                      2023
                    </Badge>
                    <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                      Markdown
                    </Badge>
                    <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                      GitLab
                    </Badge>
                    <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                      DevOps
                    </Badge>
                    <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                      Procédures
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <FolderTree className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium text-white">Organisation</h3>
                        <p className="text-sm text-white/70">LOCAL et PROD, procédures détaillées</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <FileText className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium text-white">Format</h3>
                        <p className="text-sm text-white/70">Markdown, GitLab Wiki, Procédures</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium text-white">Public cible</h3>
                        <p className="text-sm text-white/70">Équipe DevOps, Développeurs, Administrateurs système</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-primary/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Avantages obtenus</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-white/80">Clarté et transparence des processus</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-white/80">Gain de temps lors de l'installation de logiciels</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-white/80">Facilitation de la collaboration en équipe</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-white/80">Continuité des opérations assurée</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-black/40 border-primary/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Présentation du projet</h2>
                  <div className="prose prose-invert max-w-none">
                    <p>
                      Tout au long de ce projet, j'ai effectué des documentations que j'ai déposées dans un dépôt GitLab
                      nicomatic. Cette documentation est conçue pour aider l'équipe DevOps à comprendre comment mon
                      infrastructure est faite, et principalement permettre un gain de temps lors de l'installation de
                      logiciels et d'outils.
                    </p>
                    <p>
                      J'ai organisé mes documentations en deux sections principales : LOCAL et PROD, chacune contenant
                      des guides et des procédures spécifiques pour configurer et gérer l'infrastructure dans les
                      environnements respectifs. Cette approche structurée garantit que les informations sont facilement
                      accessibles et pertinentes pour les différents contextes d'utilisation.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-primary/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Structure de la documentation</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <Server className="h-5 w-5 mr-2 text-primary" />
                        Section LOCAL
                      </h3>
                      <p className="text-white/80 mb-3">
                        La section LOCAL contient des guides et des procédures pour configurer et gérer l'infrastructure
                        en environnement local. Ces documents couvrent divers aspects essentiels au développement.
                      </p>
                      <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                        <h4 className="text-primary font-medium mb-2">Documents inclus</h4>
                        <ul className="space-y-2 text-sm text-white/70">
                          <li className="flex items-start gap-2">
                            <FileText className="h-4 w-4 text-white/50 mt-0.5" />
                            <span>environment-dev-local.md</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <FileText className="h-4 w-4 text-white/50 mt-0.5" />
                            <span>procedure-creation-cle-ssh-on-ubuntu-wsl.md</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <FileText className="h-4 w-4 text-white/50 mt-0.5" />
                            <span>procedure-installation-docker-on-ubuntu-wsl.md</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <FileText className="h-4 w-4 text-white/50 mt-0.5" />
                            <span>procedure-installation-git-on-ubuntu-wsl.md</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <FileText className="h-4 w-4 text-white/50 mt-0.5" />
                            <span>procedure-installation-ssh-on-ubuntu-wsl.md</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <Server className="h-5 w-5 mr-2 text-primary" />
                        Section PROD
                      </h3>
                      <p className="text-white/80 mb-3">
                        La section PROD contient des documentations spécifiques à l'environnement de production. Ces
                        documents sont essentiels pour garantir que le déploiement et la gestion des services en
                        production se déroulent sans encombre.
                      </p>
                      <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                        <h4 className="text-primary font-medium mb-2">Documents inclus</h4>
                        <ul className="space-y-2 text-sm text-white/70">
                          <li className="flex items-start gap-2">
                            <FileText className="h-4 w-4 text-white/50 mt-0.5" />
                            <span>procedure-automatisation-GitLab-CI-CD.md</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <FileText className="h-4 w-4 text-white/50 mt-0.5" />
                            <span>procedure-configuration-GitLab.md</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <FileText className="h-4 w-4 text-white/50 mt-0.5" />
                            <span>procedure-hebergement-website-on-aws.md</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <FileText className="h-4 w-4 text-white/50 mt-0.5" />
                            <span>procedure-start-project.md</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <FileText className="h-4 w-4 text-white/50 mt-0.5" />
                            <span>procedure-troubleshooting-docusaurus.md</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-primary/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Défis techniques</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <FolderTree className="h-5 w-5 mr-2 text-primary" />
                        Organisation de l'information
                      </h3>
                      <p className="text-white/80 mb-3">
                        Structurer la documentation de manière logique et accessible pour différents publics et cas
                        d'usage.
                      </p>
                      <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                        <h4 className="text-primary font-medium mb-2">Solution mise en œuvre</h4>
                        <p className="text-sm text-white/70">
                          J'ai adopté une structure à deux niveaux (LOCAL et PROD) pour séparer clairement les
                          environnements, puis organisé les documents par thématique et cas d'usage. Chaque document
                          suit un format standardisé avec des sections claires pour faciliter la navigation.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <BookOpen className="h-5 w-5 mr-2 text-primary" />
                        Niveau de détail approprié
                      </h3>
                      <p className="text-white/80 mb-3">
                        Trouver le bon équilibre entre des instructions détaillées et une documentation concise et
                        utilisable.
                      </p>
                      <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                        <h4 className="text-primary font-medium mb-2">Solution mise en œuvre</h4>
                        <p className="text-sm text-white/70">
                          J'ai utilisé une approche par étapes numérotées pour les procédures, avec des explications
                          claires à chaque étape. Pour les concepts plus complexes, j'ai ajouté des sections
                          d'explication supplémentaires et des exemples concrets. J'ai également inclus des captures
                          d'écran pour les étapes critiques.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <GitBranch className="h-5 w-5 mr-2 text-primary" />
                        Intégration avec GitLab
                      </h3>
                      <p className="text-white/80 mb-3">
                        Assurer que la documentation reste accessible, à jour et bien intégrée avec les projets GitLab.
                      </p>
                      <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                        <h4 className="text-primary font-medium mb-2">Solution mise en œuvre</h4>
                        <p className="text-sm text-white/70">
                          J'ai utilisé le format Markdown pour tous les documents, ce qui permet une excellente
                          compatibilité avec GitLab. J'ai également mis en place des liens entre les documents et les
                          projets concernés, et organisé le dépôt de documentation avec une structure de dossiers claire
                          reflétant les sections LOCAL et PROD.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-primary/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Avantages de la documentation</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2 flex items-center">
                        <Lightbulb className="mr-2 h-5 w-5 text-yellow-400" />
                        Clarté et transparence
                      </h3>
                      <p className="text-sm text-white/70">
                        La documentation aide à clarifier le fonctionnement de l'infrastructure et des processus,
                        rendant les opérations plus transparentes pour l'équipe DevOps.
                      </p>
                    </div>

                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2 flex items-center">
                        <Clock className="mr-2 h-5 w-5 text-blue-400" />
                        Gain de temps
                      </h3>
                      <p className="text-sm text-white/70">
                        En fournissant des instructions claires et détaillées, la documentation permet de gagner du
                        temps lors de l'installation de nouveaux logiciels et outils, ainsi que lors de la résolution
                        des problèmes.
                      </p>
                    </div>

                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2 flex items-center">
                        <Users className="mr-2 h-5 w-5 text-green-400" />
                        Facilitation de la collaboration
                      </h3>
                      <p className="text-sm text-white/70">
                        La documentation facilite la collaboration entre les membres de l'équipe en leur fournissant un
                        référentiel commun de connaissances et de procédures.
                      </p>
                    </div>

                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2 flex items-center">
                        <Shield className="mr-2 h-5 w-5 text-purple-400" />
                        Continuité des opérations
                      </h3>
                      <p className="text-sm text-white/70">
                        En cas de changement de personnel, la documentation assure la continuité des opérations en
                        permettant aux nouveaux membres de l'équipe de se familiariser rapidement avec l'infrastructure
                        et les processus.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-primary/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Compétences acquises</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2">Rédaction technique</h3>
                      <p className="text-sm text-white/70">
                        Capacité à rédiger des instructions claires, précises et faciles à suivre pour différents
                        publics techniques
                      </p>
                    </div>
                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2">Markdown</h3>
                      <p className="text-sm text-white/70">
                        Maîtrise du langage de balisage Markdown pour créer des documents bien structurés et formatés
                      </p>
                    </div>
                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2">Gestion de la documentation</h3>
                      <p className="text-sm text-white/70">
                        Organisation et maintenance d'un système de documentation cohérent et à jour
                      </p>
                    </div>
                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2">GitLab Wiki et dépôts</h3>
                      <p className="text-sm text-white/70">
                        Utilisation efficace des fonctionnalités de GitLab pour héberger et partager la documentation
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-primary/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Conclusion</h2>
                  <p className="text-white/80 mb-4">
                    La création et le dépôt de la documentation dans GitLab ont permis d'assurer une meilleure
                    compréhension et une gestion plus efficace de l'infrastructure, tout en améliorant la collaboration
                    au sein de l'équipe DevOps. Cette documentation sert non seulement de référence pour les opérations
                    actuelles, mais aussi de base solide pour les futurs développements et améliorations.
                  </p>
                  <p className="text-white/80">
                    En investissant du temps dans la création d'une documentation de qualité, j'ai contribué à la
                    résilience et à l'efficacité de l'équipe, tout en développant des compétences précieuses en
                    communication technique et en gestion des connaissances. Ces compétences sont transférables à
                    d'autres projets et contextes professionnels, renforçant ainsi ma valeur en tant que professionnel
                    de l'informatique.
                  </p>
                </CardContent>
              </Card>

              <div className="flex justify-center mt-8">
                <Button asChild variant="outline" className="bg-black/30 border-white/20 text-white hover:bg-white/10">
                  <Link href="/realisations">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Retour aux réalisations
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </main>
  )
}
