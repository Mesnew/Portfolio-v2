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
  Code,
  Shield,
  Calculator,
  Cpu,
  Terminal,
  Workflow,
  Lightbulb,
  Bug,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function CalculatriceProjectDetailsPage() {
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
                <div className="relative h-48 w-full bg-gradient-to-r from-[#68217a] to-[#68217a]/80">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Calculator className="h-24 w-24 text-white/70" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <Calculator className="h-6 w-6 text-[#68217a]" />
                    </div>
                    <h1 className="text-xl font-bold text-white">Calculatrice en C#</h1>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-2 mb-6">
                    <Badge variant="outline" className="bg-white/20 border-white/30 text-white">
                      2022
                    </Badge>
                    <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                      C#
                    </Badge>
                    <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                      .NET
                    </Badge>
                    <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                      WPF
                    </Badge>
                    <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                      Desktop
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Code className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium text-white">Environnement</h3>
                        <p className="text-sm text-white/70">Visual Studio Community, .NET Framework, Windows</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <FileCode className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium text-white">Technologies</h3>
                        <p className="text-sm text-white/70">C#, XAML, Windows Presentation Foundation (WPF)</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Cpu className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium text-white">Fonctionnalités</h3>
                        <p className="text-sm text-white/70">
                          Opérations mathématiques de base, interface utilisateur intuitive
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-primary/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Aperçu du projet</h3>
                  <div className="bg-black/30 p-4 rounded-lg mb-4">
                    <Image
                      src="/images/calculatrice.png"
                      alt="Calculatrice C#"
                      width={400}
                      height={500}
                      className="object-contain rounded-md w-full"
                    />
                    <p className="text-center mt-2 text-sm text-white/60">
                      Interface de la calculatrice développée en C#
                    </p>
                  </div>

                  <h3 className="text-lg font-semibold mb-4">Compétences acquises</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-white/80">Maîtrise des bases de la programmation en C#</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-white/80">Développement d'interfaces avec WPF et XAML</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-white/80">Gestion des événements et interactions utilisateur</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-white/80">Débogage et résolution de problèmes</span>
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
                      Dans le cadre de mon cursus scolaire, mon premier projet en option développement était de réaliser
                      une calculatrice fonctionnelle en C#. Nous avons utilisé Visual Studio Community pour développer
                      cette application. Le langage C# est principalement utilisé pour les applications Framework
                      (Windows) ou Core (Windows, Linux, MacOS).
                    </p>
                    <p>
                      Ce projet m'a permis de me familiariser avec les concepts fondamentaux de la programmation
                      orientée objet en C# et de développer une interface utilisateur interactive avec Windows
                      Presentation Foundation (WPF). J'ai également appris à gérer les événements utilisateur et à
                      implémenter des fonctionnalités de calcul mathématique.
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
                        <Bug className="h-5 w-5 mr-2 text-primary" />
                        Stockage des valeurs
                      </h3>
                      <p className="text-white/80 mb-3">
                        Débutant dans ce langage de programmation, j'ai rencontré des difficultés. Lorsque je saisissais
                        un chiffre ou un nombre avec une opération puis un second chiffre ou nombre, le calcul ne
                        s'effectuait pas. C'était comme si ma première valeur n'était pas stockée et donc rien ne se
                        passait.
                      </p>
                      <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                        <h4 className="text-primary font-medium mb-2">Solution mise en œuvre</h4>
                        <p className="text-sm text-white/70">
                          J'ai demandé de l'aide à mon enseignant pour tenter de corriger ce problème. Nous avons
                          identifié que je ne stockais pas correctement les valeurs dans des variables. Après avoir revu
                          la logique de mon code et implémenté un système de stockage approprié, la calculatrice a
                          commencé à fonctionner correctement.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <Lightbulb className="h-5 w-5 mr-2 text-primary" />
                        Interface utilisateur
                      </h3>
                      <p className="text-white/80 mb-3">
                        La création d'une interface utilisateur intuitive et fonctionnelle avec WPF représentait un défi
                        pour moi qui débutais avec cette technologie.
                      </p>
                      <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                        <h4 className="text-primary font-medium mb-2">Solution mise en œuvre</h4>
                        <p className="text-sm text-white/70">
                          J'ai étudié les principes de base de XAML et WPF pour comprendre comment structurer
                          l'interface. J'ai utilisé une grille pour organiser les boutons de manière structurée et
                          intuitive. J'ai également appris à lier les événements de clic aux fonctions de calcul pour
                          créer une expérience utilisateur fluide.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-primary/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Développement</h2>
                  <div className="space-y-4">
                    <div className="relative pl-8 pb-8 border-l border-white/20 last:border-0">
                      <div className="absolute top-0 left-0 w-6 h-6 -translate-x-3 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold">1</span>
                      </div>
                      <h3 className="text-lg font-semibold">Analyse des besoins</h3>
                      <p className="text-white/80 mt-1">
                        Identification des fonctionnalités requises pour la calculatrice : opérations mathématiques de
                        base, interface utilisateur claire, gestion des erreurs.
                      </p>
                    </div>

                    <div className="relative pl-8 pb-8 border-l border-white/20 last:border-0">
                      <div className="absolute top-0 left-0 w-6 h-6 -translate-x-3 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold">2</span>
                      </div>
                      <h3 className="text-lg font-semibold">Conception de l'interface</h3>
                      <p className="text-white/80 mt-1">
                        Création de l'interface utilisateur avec WPF, organisation des boutons numériques et d'opération
                        dans une grille, conception de la zone d'affichage des résultats.
                      </p>
                    </div>

                    <div className="relative pl-8 pb-8 border-l border-white/20 last:border-0">
                      <div className="absolute top-0 left-0 w-6 h-6 -translate-x-3 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold">3</span>
                      </div>
                      <h3 className="text-lg font-semibold">Implémentation de la logique</h3>
                      <p className="text-white/80 mt-1">
                        Développement des fonctions pour effectuer les opérations mathématiques, gestion des événements
                        de clic sur les boutons, stockage des valeurs saisies et des opérations.
                      </p>
                    </div>

                    <div className="relative pl-8 border-l-0">
                      <div className="absolute top-0 left-0 w-6 h-6 -translate-x-3 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold">4</span>
                      </div>
                      <h3 className="text-lg font-semibold">Tests et débogage</h3>
                      <p className="text-white/80 mt-1">
                        Vérification du fonctionnement de chaque opération, identification et correction des bugs,
                        notamment le problème de stockage des valeurs, tests de l'interface utilisateur.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-primary/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Aspects techniques</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2 flex items-center">
                        <Code className="mr-2 h-5 w-5 text-blue-400" />
                        Interface WPF
                      </h3>
                      <ul className="space-y-1 text-sm text-white/70 list-disc pl-5">
                        <li>Utilisation de XAML pour définir l'interface utilisateur</li>
                        <li>Organisation des boutons dans une grille</li>
                        <li>Création d'une zone d'affichage pour les résultats</li>
                        <li>Stylisation des boutons et de l'interface</li>
                      </ul>
                    </div>

                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2 flex items-center">
                        <Terminal className="mr-2 h-5 w-5 text-green-400" />
                        Logique de calcul
                      </h3>
                      <ul className="space-y-1 text-sm text-white/70 list-disc pl-5">
                        <li>Implémentation des opérations mathématiques de base</li>
                        <li>Stockage des valeurs saisies et des opérations</li>
                        <li>Gestion des cas particuliers (division par zéro)</li>
                        <li>Affichage des résultats de calcul</li>
                      </ul>
                    </div>

                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2 flex items-center">
                        <Workflow className="mr-2 h-5 w-5 text-purple-400" />
                        Gestion des événements
                      </h3>
                      <ul className="space-y-1 text-sm text-white/70 list-disc pl-5">
                        <li>Implémentation des gestionnaires d'événements pour les clics</li>
                        <li>Liaison des boutons aux fonctions de calcul</li>
                        <li>Gestion des interactions utilisateur</li>
                        <li>Réponse aux actions de l'utilisateur</li>
                      </ul>
                    </div>

                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2 flex items-center">
                        <Shield className="mr-2 h-5 w-5 text-orange-400" />
                        Gestion des erreurs
                      </h3>
                      <ul className="space-y-1 text-sm text-white/70 list-disc pl-5">
                        <li>Validation des entrées utilisateur</li>
                        <li>Gestion des erreurs de calcul</li>
                        <li>Prévention des crashs de l'application</li>
                        <li>Feedback utilisateur en cas d'erreur</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-primary/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Compétences développées</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2">Programmation C#</h3>
                      <p className="text-sm text-white/70">
                        Maîtrise des bases du langage C#, des types de données, des structures de contrôle et des
                        fonctions
                      </p>
                    </div>
                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2">Développement WPF</h3>
                      <p className="text-sm text-white/70">
                        Création d'interfaces utilisateur avec XAML, gestion de la disposition et des styles
                      </p>
                    </div>
                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2">Gestion des événements</h3>
                      <p className="text-sm text-white/70">
                        Implémentation de gestionnaires d'événements pour répondre aux actions de l'utilisateur
                      </p>
                    </div>
                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2">Débogage</h3>
                      <p className="text-sm text-white/70">
                        Utilisation des outils de débogage de Visual Studio pour identifier et corriger les erreurs
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-primary/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Conclusion</h2>
                  <p className="text-white/80 mb-4">
                    Ce projet de calculatrice en C# a été ma première expérience significative avec ce langage de
                    programmation. Malgré les difficultés rencontrées, j'ai pu développer une application fonctionnelle
                    qui m'a permis d'acquérir des compétences fondamentales en programmation C# et en développement
                    d'interfaces utilisateur avec WPF.
                  </p>
                  <p className="text-white/80">
                    Cette expérience a constitué une base solide pour mes projets ultérieurs en développement
                    d'applications. J'ai appris l'importance de bien structurer mon code, de gérer correctement les
                    données et de créer des interfaces utilisateur intuitives. Ces compétences se sont avérées
                    précieuses dans mes projets suivants et continuent de m'être utiles dans mon parcours de
                    développeur.
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

