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
  FileCode,
  Shield,
  Terminal,
  GitBranch,
  GitCommit,
  GitMerge,
  Globe,
  Users,
} from "lucide-react"
import Link from "next/link"

export default function GitLabProjectDetailsPage() {
  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden">
      <PlanetBackground3D planetType="mercury" />
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
                <div className="relative h-48 w-full bg-gradient-to-br from-orange-500/20 to-purple-600/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <GitBranch className="h-24 w-24 text-orange-500/70" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <GitMerge className="h-6 w-6 text-orange-600" />
                    </div>
                    <h1 className="text-xl font-bold text-white">Versioning GitLab</h1>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-2 mb-6">
                    <Badge variant="outline" className="bg-primary/20 border-primary/30 text-primary-foreground">
                      2023
                    </Badge>
                    <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                      Git
                    </Badge>
                    <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                      Collaboration
                    </Badge>
                    <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                      Docusaurus
                    </Badge>
                    <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                      Versioning
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <GitBranch className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium text-white">Environnement</h3>
                        <p className="text-sm text-white/70">GitLab, Git, Docusaurus, Terminal</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <FileCode className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium text-white">Technologies</h3>
                        <p className="text-sm text-white/70">Git, GitLab CI/CD, Markdown, JavaScript</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium text-white">Collaboration</h3>
                        <p className="text-sm text-white/70">Gestion des accès, Partage de code, Contrôle de version</p>
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
                      <span className="text-sm text-white/80">
                        Accessibilité du projet depuis n'importe quel appareil
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-white/80">Sauvegarde sécurisée du code source</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-white/80">Collaboration simplifiée avec le tuteur</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-white/80">Historique complet des modifications</span>
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
                      Pour mon projet Docusaurus, je souhaitais le partager avec mon tuteur et le conserver pour y
                      accéder de n'importe où en cas de besoin. J'ai donc décidé de le committer sur GitLab afin qu'il
                      soit facilement accessible.
                    </p>
                    <p>
                      Ce projet m'a permis de mettre en pratique mes connaissances en gestion de versions avec Git et
                      d'explorer les fonctionnalités de collaboration offertes par GitLab. J'ai configuré mon projet en
                      privé et accordé l'accès en ajoutant un membre à mon dépôt, assurant ainsi un partage sécurisé
                      avec mon tuteur.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-primary/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Défis techniques</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <Shield className="h-5 w-5 mr-2 text-primary" />
                        Configuration des accès
                      </h3>
                      <p className="text-white/80 mb-3">
                        Configurer correctement les permissions pour partager le projet uniquement avec mon tuteur tout
                        en maintenant la confidentialité du code.
                      </p>
                      <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                        <h4 className="text-primary font-medium mb-2">Solution mise en œuvre</h4>
                        <p className="text-sm text-white/70">
                          J'ai créé un dépôt privé sur GitLab et utilisé le système de gestion des membres pour ajouter
                          mon tuteur avec des permissions spécifiques. Cela a permis de partager le code de manière
                          sécurisée tout en gardant le contrôle sur qui peut y accéder.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <GitBranch className="h-5 w-5 mr-2 text-primary" />
                        Structure du dépôt
                      </h3>
                      <p className="text-white/80 mb-3">
                        Organiser correctement le dépôt pour faciliter la navigation et la compréhension du projet
                        Docusaurus.
                      </p>
                      <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                        <h4 className="text-primary font-medium mb-2">Solution mise en œuvre</h4>
                        <p className="text-sm text-white/70">
                          J'ai structuré le dépôt en suivant les bonnes pratiques de Docusaurus, avec une organisation
                          claire des dossiers pour la documentation, les composants et les configurations. J'ai
                          également créé un README détaillé pour faciliter la prise en main du projet.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <Terminal className="h-5 w-5 mr-2 text-primary" />
                        Commandes Git
                      </h3>
                      <p className="text-white/80 mb-3">
                        Maîtriser les commandes Git nécessaires pour initialiser, configurer et pousser le projet vers
                        GitLab.
                      </p>
                      <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                        <h4 className="text-primary font-medium mb-2">Solution mise en œuvre</h4>
                        <p className="text-sm text-white/70">
                          J'ai utilisé une série de commandes Git pour initialiser le dépôt local, ajouter les fichiers,
                          créer le commit initial, configurer le dépôt distant et pousser les changements. J'ai veillé à
                          spécifier correctement la branche de destination pour assurer un lien correct entre les dépôts
                          local et distant.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-primary/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Méthodologie et étapes</h2>
                  <div className="space-y-4">
                    <div className="relative pl-8 pb-8 border-l border-white/20 last:border-0">
                      <div className="absolute top-0 left-0 w-6 h-6 -translate-x-3 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold">1</span>
                      </div>
                      <h3 className="text-lg font-semibold">Création et configuration du dépôt</h3>
                      <p className="text-white/80 mt-1">
                        J'ai créé un nouveau dépôt sur GitLab et configuré sa visibilité en privé pour garantir que seul
                        mon tuteur et moi puissions y accéder. Ensuite, j'ai ajouté mon tuteur en tant que membre du
                        dépôt en définissant les permissions appropriées.
                      </p>
                    </div>

                    <div className="relative pl-8 pb-8 border-l border-white/20 last:border-0">
                      <div className="absolute top-0 left-0 w-6 h-6 -translate-x-3 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold">2</span>
                      </div>
                      <h3 className="text-lg font-semibold">Initialisation du dépôt local</h3>
                      <p className="text-white/80 mt-1">
                        Sur ma machine locale, j'ai initialisé un dépôt Git pour mon projet Docusaurus en utilisant la
                        commande :<code className="block bg-black/50 p-2 rounded mt-2 text-white">git init</code>
                      </p>
                    </div>

                    <div className="relative pl-8 pb-8 border-l border-white/20 last:border-0">
                      <div className="absolute top-0 left-0 w-6 h-6 -translate-x-3 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold">3</span>
                      </div>
                      <h3 className="text-lg font-semibold">Ajout des fichiers au dépôt</h3>
                      <p className="text-white/80 mt-1">
                        J'ai ajouté tous les fichiers de mon projet au dépôt local avec la commande :
                        <code className="block bg-black/50 p-2 rounded mt-2 text-white">git add .</code>
                      </p>
                    </div>

                    <div className="relative pl-8 pb-8 border-l border-white/20 last:border-0">
                      <div className="absolute top-0 left-0 w-6 h-6 -translate-x-3 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold">4</span>
                      </div>
                      <h3 className="text-lg font-semibold">Création du commit initial</h3>
                      <p className="text-white/80 mt-1">
                        J'ai créé le premier commit pour inclure tous les fichiers ajoutés :
                        <code className="block bg-black/50 p-2 rounded mt-2 text-white">
                          git commit -m "Initial commit"
                        </code>
                      </p>
                    </div>

                    <div className="relative pl-8 pb-8 border-l border-white/20 last:border-0">
                      <div className="absolute top-0 left-0 w-6 h-6 -translate-x-3 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold">5</span>
                      </div>
                      <h3 className="text-lg font-semibold">Lien avec le dépôt GitLab</h3>
                      <p className="text-white/80 mt-1">
                        Pour lier le dépôt local avec le dépôt distant sur GitLab, j'ai ajouté l'URL du dépôt GitLab
                        comme remote :
                        <code className="block bg-black/50 p-2 rounded mt-2 text-white">
                          git remote add origin https://gitlab.com/username/repository.git
                        </code>
                      </p>
                    </div>

                    <div className="relative pl-8 border-l-0">
                      <div className="absolute top-0 left-0 w-6 h-6 -translate-x-3 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold">6</span>
                      </div>
                      <h3 className="text-lg font-semibold">Pousser les changements vers GitLab</h3>
                      <p className="text-white/80 mt-1">
                        Enfin, j'ai poussé les changements vers la branche principale du dépôt GitLab :
                        <code className="block bg-black/50 p-2 rounded mt-2 text-white">git push -u origin main</code>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-primary/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Avantages du versionnage avec GitLab</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2 flex items-center">
                        <Globe className="mr-2 h-5 w-5 text-blue-400" />
                        Accessibilité
                      </h3>
                      <p className="text-sm text-white/70">
                        Le projet est disponible en ligne et accessible de n'importe où, permettant de travailler dessus
                        depuis différents endroits et appareils.
                      </p>
                    </div>

                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2 flex items-center">
                        <Shield className="mr-2 h-5 w-5 text-green-400" />
                        Sauvegarde
                      </h3>
                      <p className="text-sm text-white/70">
                        En cas de problème avec mon ordinateur local, je peux toujours récupérer la dernière version de
                        mon projet depuis GitLab.
                      </p>
                    </div>

                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2 flex items-center">
                        <Users className="mr-2 h-5 w-5 text-purple-400" />
                        Collaboration
                      </h3>
                      <p className="text-sm text-white/70">
                        Partager le projet avec d'autres personnes, comme mon tuteur, est facile et sécurisé grâce aux
                        fonctionnalités de gestion des accès de GitLab.
                      </p>
                    </div>

                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2 flex items-center">
                        <GitCommit className="mr-2 h-5 w-5 text-orange-400" />
                        Historique des modifications
                      </h3>
                      <p className="text-sm text-white/70">
                        Chaque commit conserve un historique des modifications, ce qui permet de suivre l'évolution du
                        projet et de revenir à des versions précédentes si nécessaire.
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
                      <h3 className="font-semibold text-primary mb-2">Gestion de versions avec Git</h3>
                      <p className="text-sm text-white/70">
                        Maîtrise des commandes Git essentielles pour initialiser, configurer et synchroniser des dépôts
                      </p>
                    </div>
                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2">Utilisation de GitLab</h3>
                      <p className="text-sm text-white/70">
                        Configuration des dépôts, gestion des accès et utilisation des fonctionnalités de collaboration
                      </p>
                    </div>
                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2">Bonnes pratiques de versionnage</h3>
                      <p className="text-sm text-white/70">
                        Organisation des commits, rédaction de messages descriptifs et structuration du dépôt
                      </p>
                    </div>
                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2">Sécurité et confidentialité</h3>
                      <p className="text-sm text-white/70">
                        Configuration des permissions et gestion des accès pour protéger le code source
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-primary/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Conclusion</h2>
                  <p className="text-white/80 mb-4">
                    L'utilisation de GitLab pour le versionnage de mon projet Docusaurus m'a permis de le partager
                    facilement avec mon tuteur et de le conserver en toute sécurité. Cette expérience m'a non seulement
                    permis d'améliorer mes compétences en gestion de versions avec Git, mais aussi de découvrir les
                    fonctionnalités de collaboration offertes par GitLab.
                  </p>
                  <p className="text-white/80">
                    Les compétences acquises lors de ce projet sont directement applicables à d'autres projets de
                    développement et constituent une base solide pour des pratiques de développement collaboratif plus
                    avancées. La maîtrise des outils de versionnage comme Git et GitLab est devenue essentielle dans le
                    domaine du développement logiciel, et ce projet m'a permis de renforcer cette compétence clé.
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
