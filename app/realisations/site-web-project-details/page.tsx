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
  Server,
  Shield,
  Globe,
  Clock,
  Code,
  Layout,
  Layers,
  PenTool,
  GitBranch,
} from "lucide-react"
import Link from "next/link"

export default function SiteWebProjectDetailsPage() {
  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden">
      <PlanetBackground3D planetType="jupiter" />
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
                <div className="relative h-48 w-full bg-gradient-to-r from-[#2b3137] to-[#3a8fb7]/80">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Globe className="h-24 w-24 text-teal-500/70" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <Globe className="h-6 w-6 text-teal-500" />
                    </div>
                    <h1 className="text-xl font-bold text-white">Site web professionnel</h1>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-2 mb-6">
                    <Badge variant="outline" className="bg-white/20 border-white/30 text-white">
                      2023
                    </Badge>
                    <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                      JavaScript
                    </Badge>
                    <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                      React
                    </Badge>
                    <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                      Docusaurus
                    </Badge>
                    <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                      Markdown
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Server className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium text-white">Environnement</h3>
                        <p className="text-sm text-white/70">Node.js, npm, Git, GitHub Pages</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <FileCode className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium text-white">Technologies</h3>
                        <p className="text-sm text-white/70">JavaScript, React, CSS, Markdown, MDX</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium text-white">Déploiement</h3>
                        <p className="text-sm text-white/70">GitHub Pages, GitLab CI/CD, Netlify</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-primary/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Résultats obtenus</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-white/80">Site web professionnel fonctionnel et responsive</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-white/80">Chronologie interactive du parcours professionnel</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-white/80">Maîtrise des bases de Docusaurus et React</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-white/80">Déploiement automatisé via GitLab CI/CD</span>
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
                      Pour débuter mon premier projet en entreprise, mon tuteur m'a assigné la tâche de créer un site
                      web à la fois personnel et professionnel pour une utilisation future. Je me suis renseigné pour
                      trouver des outils adaptés à la réalisation de ce site et j'ai découvert Docusaurus, qui fournit
                      des templates de sites web permettant de partir sur une base solide.
                    </p>
                    <p>
                      Docusaurus s'est révélé être un excellent outil pour les développeurs débutants car il combine une
                      interface graphique intuitive avec des langages de programmation comme JavaScript et React. Cette
                      combinaison m'a permis d'apprendre progressivement tout en construisant un site fonctionnel et
                      professionnel.
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
                        <FileCode className="h-5 w-5 mr-2 text-primary" />
                        Modification des fichiers JavaScript
                      </h3>
                      <p className="text-white/80 mb-3">
                        Du côté du développement, il était relativement facile de comprendre comment modifier le site
                        web. Cependant, la tâche la plus complexe était de modifier ou créer des fichiers en JavaScript.
                      </p>
                      <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                        <h4 className="text-primary font-medium mb-2">Solution mise en œuvre</h4>
                        <p className="text-sm text-white/70">
                          J'ai adopté une approche progressive, en commençant par de petites modifications des fichiers
                          existants pour comprendre leur structure. J'ai ensuite consulté la documentation officielle de
                          Docusaurus et des tutoriels en ligne pour approfondir mes connaissances. Cette méthode m'a
                          permis de gagner en confiance et de maîtriser progressivement la création et la modification
                          de fichiers JavaScript.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <Clock className="h-5 w-5 mr-2 text-primary" />
                        Création d'une chronologie interactive
                      </h3>
                      <p className="text-white/80 mb-3">
                        Je voulais ajouter une page contenant une chronologie de mon parcours professionnel. Cela m'a
                        pris beaucoup de temps en raison du nombre de fichiers requis et des lignes de code nécessaires.
                      </p>
                      <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                        <h4 className="text-primary font-medium mb-2">Solution mise en œuvre</h4>
                        <p className="text-sm text-white/70">
                          Pour créer une chronologie qui ne soit pas basique, j'ai décidé d'ajouter une touche de
                          modernité et de dynamisme. J'ai recherché des composants React compatibles avec Docusaurus et
                          j'ai finalement opté pour une bibliothèque de chronologie personnalisable. J'ai ensuite adapté
                          le code pour l'intégrer à mon site, en ajoutant des animations et des interactions pour
                          améliorer l'expérience utilisateur.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <Layout className="h-5 w-5 mr-2 text-primary" />
                        Personnalisation du thème
                      </h3>
                      <p className="text-white/80 mb-3">
                        Bien que Docusaurus fournisse des templates, je souhaitais personnaliser l'apparence pour créer
                        un site unique qui reflète mon identité professionnelle.
                      </p>
                      <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                        <h4 className="text-primary font-medium mb-2">Solution mise en œuvre</h4>
                        <p className="text-sm text-white/70">
                          J'ai exploré les options de personnalisation offertes par Docusaurus, en modifiant les
                          fichiers CSS et en créant des composants React personnalisés. J'ai également utilisé les
                          variables CSS pour définir une palette de couleurs cohérente à travers le site. Cette approche
                          m'a permis de conserver la structure solide du template tout en créant une identité visuelle
                          unique.
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
                      <h3 className="text-lg font-semibold">Recherche et choix de l'outil</h3>
                      <p className="text-white/80 mt-1">
                        Exploration des différentes solutions pour créer un site web professionnel, comparaison des
                        avantages et inconvénients, et sélection de Docusaurus comme outil principal.
                      </p>
                    </div>

                    <div className="relative pl-8 pb-8 border-l border-white/20 last:border-0">
                      <div className="absolute top-0 left-0 w-6 h-6 -translate-x-3 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold">2</span>
                      </div>
                      <h3 className="text-lg font-semibold">Installation et configuration</h3>
                      <p className="text-white/80 mt-1">
                        Mise en place de l'environnement de développement, installation de Node.js et npm,
                        initialisation du projet Docusaurus et configuration des paramètres de base.
                      </p>
                    </div>

                    <div className="relative pl-8 pb-8 border-l border-white/20 last:border-0">
                      <div className="absolute top-0 left-0 w-6 h-6 -translate-x-3 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold">3</span>
                      </div>
                      <h3 className="text-lg font-semibold">Création du contenu</h3>
                      <p className="text-white/80 mt-1">
                        Rédaction des pages en Markdown, organisation de la structure du site, création des sections
                        principales et intégration des médias (images, icônes).
                      </p>
                    </div>

                    <div className="relative pl-8 pb-8 border-l border-white/20 last:border-0">
                      <div className="absolute top-0 left-0 w-6 h-6 -translate-x-3 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold">4</span>
                      </div>
                      <h3 className="text-lg font-semibold">Personnalisation et développement</h3>
                      <p className="text-white/80 mt-1">
                        Modification du thème, création de composants personnalisés, développement de la chronologie
                        interactive et adaptation du design pour refléter mon identité professionnelle.
                      </p>
                    </div>

                    <div className="relative pl-8 border-l-0">
                      <div className="absolute top-0 left-0 w-6 h-6 -translate-x-3 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold">5</span>
                      </div>
                      <h3 className="text-lg font-semibold">Déploiement et intégration continue</h3>
                      <p className="text-white/80 mt-1">
                        Configuration du déploiement sur GitHub Pages, mise en place d'un pipeline CI/CD avec GitLab
                        pour automatiser les mises à jour, et tests de compatibilité sur différents appareils.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-primary/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Solutions techniques</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2 flex items-center">
                        <Layers className="mr-2 h-5 w-5 text-blue-400" />
                        Templates Docusaurus
                      </h3>
                      <ul className="space-y-1 text-sm text-white/70 list-disc pl-5">
                        <li>Utilisation des templates prédéfinis comme base solide</li>
                        <li>Adaptation de la structure pour mes besoins spécifiques</li>
                        <li>Configuration du système de navigation</li>
                        <li>Personnalisation des composants de base</li>
                      </ul>
                    </div>

                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2 flex items-center">
                        <PenTool className="mr-2 h-5 w-5 text-green-400" />
                        Contenu et Markdown
                      </h3>
                      <ul className="space-y-1 text-sm text-white/70 list-disc pl-5">
                        <li>Rédaction du contenu en Markdown et MDX</li>
                        <li>Organisation des pages et de la documentation</li>
                        <li>Intégration de composants React dans le contenu</li>
                        <li>Utilisation de métadonnées pour le référencement</li>
                      </ul>
                    </div>

                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2 flex items-center">
                        <Code className="mr-2 h-5 w-5 text-purple-400" />
                        Développement JavaScript
                      </h3>
                      <ul className="space-y-1 text-sm text-white/70 list-disc pl-5">
                        <li>Création de composants React personnalisés</li>
                        <li>Modification des fichiers de configuration</li>
                        <li>Implémentation de la chronologie interactive</li>
                        <li>Ajout d'animations et d'interactions</li>
                      </ul>
                    </div>

                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2 flex items-center">
                        <GitBranch className="mr-2 h-5 w-5 text-orange-400" />
                        Déploiement et CI/CD
                      </h3>
                      <ul className="space-y-1 text-sm text-white/70 list-disc pl-5">
                        <li>Configuration du déploiement sur GitHub Pages</li>
                        <li>Mise en place d'un pipeline GitLab CI/CD</li>
                        <li>Automatisation des tests et du déploiement</li>
                        <li>Gestion des versions et des mises à jour</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-primary/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Compétences acquises</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2">Développement web</h3>
                      <p className="text-sm text-white/70">
                        Maîtrise des bases de JavaScript, React et CSS pour la création d'interfaces web modernes
                      </p>
                    </div>
                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2">Docusaurus</h3>
                      <p className="text-sm text-white/70">
                        Configuration et personnalisation de Docusaurus pour créer des sites web documentaires
                      </p>
                    </div>
                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2">Gestion de projet</h3>
                      <p className="text-sm text-white/70">
                        Organisation du travail, planification des tâches et résolution de problèmes techniques
                      </p>
                    </div>
                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2">Déploiement</h3>
                      <p className="text-sm text-white/70">
                        Configuration de l'intégration continue et du déploiement automatisé avec GitLab CI/CD
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-primary/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Conclusion</h2>
                  <p className="text-white/80 mb-4">
                    Ce projet m'a permis de créer un site web professionnel fonctionnel tout en développant mes
                    compétences en développement web. Docusaurus s'est révélé être un excellent choix pour débuter,
                    offrant un équilibre parfait entre simplicité d'utilisation et possibilités de personnalisation
                    avancées.
                  </p>
                  <p className="text-white/80">
                    La création de la chronologie interactive a été particulièrement enrichissante, me permettant
                    d'approfondir mes connaissances en JavaScript et React. Ce projet a également renforcé ma capacité à
                    rechercher des solutions, à résoudre des problèmes techniques et à mettre en œuvre des
                    fonctionnalités complexes de manière progressive.
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
