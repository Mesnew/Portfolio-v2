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
  Shield,
  Database,
  CreditCard,
  Workflow,
  Users,
  Layers,
  Code,
  Lock,
  BarChart3,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function BanqueProjectDetailsPage() {
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
                <div className="relative h-48 w-full bg-gradient-to-r from-[#2c3e50] to-[#4ca1af]/80">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <CreditCard className="h-24 w-24 text-blue-400/70" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <CreditCard className="h-6 w-6 text-blue-500" />
                    </div>
                    <h1 className="text-xl font-bold text-white">Gestion de banque en C#</h1>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-2 mb-6">
                    <Badge variant="outline" className="bg-white/20 border-white/30 text-white">
                      2023
                    </Badge>
                    <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                      C#
                    </Badge>
                    <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                      .NET
                    </Badge>
                    <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                      SQL
                    </Badge>
                    <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                      MVVM
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Code className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium text-white">Environnement</h3>
                        <p className="text-sm text-white/70">Visual Studio, .NET Framework, SQL Server</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Layers className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium text-white">Architecture</h3>
                        <p className="text-sm text-white/70">MVVM (Model-View-ViewModel), Services, Repositories</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium text-white">Sécurité</h3>
                        <p className="text-sm text-white/70">
                          Authentification, Chiffrement des données, Validation des entrées
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg shadow-lg">
                      <Image
                        src="/images/banque-login.png"
                        alt="Interface de connexion de l'application bancaire"
                        width={500}
                        height={400}
                        className="object-contain rounded-md w-full"
                      />
                      <p className="text-center mt-2 text-sm text-white/80">Interface de connexion</p>
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
                      <span className="text-sm text-white/80">Interface utilisateur intuitive et responsive</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-white/80">Architecture MVVM bien structurée et maintenable</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-white/80">Système de base de données sécurisé et performant</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-white/80">Gestion efficace des transactions bancaires</span>
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
                      Dans le cadre de mon cursus scolaire, nous avons pour objectif de créer une application bancaire
                      en C#. Pour ce faire, j'ai intégré un groupe composé de 3 personnes, chacune ayant des rôles
                      spécifiques : gestion de l'UI, gestion du MVVM, et gestion de la base de données.
                    </p>
                    <p>
                      Ce projet vise à développer une application complète permettant de gérer des comptes bancaires,
                      d'effectuer des transactions et de sécuriser les données des utilisateurs. L'application est
                      construite selon le modèle d'architecture MVVM pour assurer une séparation claire des
                      responsabilités et faciliter la maintenance du code.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-primary/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Répartition des rôles</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <Code className="h-5 w-5 mr-2 text-primary" />
                        Gestion de l'UI (Interface Utilisateur)
                      </h3>
                      <p className="text-white/80 mb-3">
                        Responsable de l'interface utilisateur de l'application et de ses fonctionnalités.
                      </p>
                      <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                        <h4 className="text-primary font-medium mb-2">Responsabilités</h4>
                        <p className="text-sm text-white/70">
                          Ce rôle comprend le design et l'ergonomie, les interactions utilisateur et le prototypage de
                          l'interface pour une expérience utilisateur optimale. Il s'agit de créer des écrans intuitifs
                          et esthétiques qui permettent aux utilisateurs de naviguer facilement dans l'application et
                          d'effectuer leurs opérations bancaires.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <Layers className="h-5 w-5 mr-2 text-primary" />
                        Gestion du MVVM (Model-View-ViewModel)
                      </h3>
                      <p className="text-white/80 mb-3">
                        Structurer les fichiers du projet pour une meilleure compréhension et organisation.
                      </p>
                      <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                        <h4 className="text-primary font-medium mb-2">Responsabilités</h4>
                        <p className="text-sm text-white/70">
                          Ce rôle implique la mise en place de l'architecture MVVM pour séparer les responsabilités de
                          l'application, l'organisation des fichiers et l'utilisation du binding de données. Il s'agit
                          de créer une structure de code claire et maintenable qui facilite le développement
                          collaboratif et les évolutions futures.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <Database className="h-5 w-5 mr-2 text-primary" />
                        Gestion de la base de données
                      </h3>
                      <p className="text-white/80 mb-3">
                        Développement de la partie backend pour assurer le bon fonctionnement de l'application.
                      </p>
                      <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                        <h4 className="text-primary font-medium mb-2">Responsabilités</h4>
                        <p className="text-sm text-white/70">
                          Ce rôle comprend la conception de la base de données, le développement des services backend et
                          l'implémentation de mesures de sécurité pour protéger les données. Il s'agit de créer une
                          infrastructure de données robuste qui permet de stocker et de gérer efficacement les
                          informations des clients et les transactions bancaires.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-primary/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Architecture du projet</h2>
                  <p className="mb-4">
                    Notre application bancaire suit le modèle d'architecture MVVM (Model-View-ViewModel) qui permet une
                    séparation claire des responsabilités et facilite la maintenance du code.
                  </p>

                  <div className="space-y-4">
                    <div className="relative pl-8 pb-8 border-l border-white/20 last:border-0">
                      <div className="absolute top-0 left-0 w-6 h-6 -translate-x-3 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold">1</span>
                      </div>
                      <h3 className="text-lg font-semibold">Couche Modèle (Model)</h3>
                      <p className="text-white/80 mt-1">
                        Contient les classes de données qui représentent les entités de notre application bancaire
                        (Compte, Client, Transaction, etc.) et la logique métier associée.
                      </p>
                    </div>

                    <div className="relative pl-8 pb-8 border-l border-white/20 last:border-0">
                      <div className="absolute top-0 left-0 w-6 h-6 -translate-x-3 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold">2</span>
                      </div>
                      <h3 className="text-lg font-semibold">Couche Vue (View)</h3>
                      <p className="text-white/80 mt-1">
                        Comprend les interfaces utilisateur (fenêtres, pages, contrôles) qui affichent les données et
                        permettent l'interaction avec l'utilisateur.
                      </p>
                    </div>

                    <div className="relative pl-8 pb-8 border-l border-white/20 last:border-0">
                      <div className="absolute top-0 left-0 w-6 h-6 -translate-x-3 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold">3</span>
                      </div>
                      <h3 className="text-lg font-semibold">Couche ViewModel</h3>
                      <p className="text-white/80 mt-1">
                        Sert d'intermédiaire entre le Modèle et la Vue, exposant les données et les commandes que la Vue
                        peut utiliser pour l'affichage et l'interaction.
                      </p>
                    </div>

                    <div className="relative pl-8 border-l-0">
                      <div className="absolute top-0 left-0 w-6 h-6 -translate-x-3 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold">4</span>
                      </div>
                      <h3 className="text-lg font-semibold">Couche Services</h3>
                      <p className="text-white/80 mt-1">
                        Gère la communication avec la base de données et les opérations CRUD (Create, Read, Update,
                        Delete) nécessaires au fonctionnement de l'application.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-primary/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Fonctionnalités prévues</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2 flex items-center">
                        <Users className="mr-2 h-5 w-5 text-blue-400" />
                        Gestion des comptes utilisateurs
                      </h3>
                      <ul className="space-y-1 text-sm text-white/70 list-disc pl-5">
                        <li>Création et modification de comptes clients</li>
                        <li>Gestion des différents niveaux d'accès</li>
                        <li>Profils utilisateurs personnalisables</li>
                        <li>Historique des activités du compte</li>
                      </ul>
                    </div>

                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2 flex items-center">
                        <Workflow className="mr-2 h-5 w-5 text-green-400" />
                        Transactions bancaires
                      </h3>
                      <ul className="space-y-1 text-sm text-white/70 list-disc pl-5">
                        <li>Dépôt et retrait d'argent</li>
                        <li>Transfert entre comptes</li>
                        <li>Historique détaillé des transactions</li>
                        <li>Notifications de transactions</li>
                      </ul>
                    </div>

                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2 flex items-center">
                        <Lock className="mr-2 h-5 w-5 text-purple-400" />
                        Sécurité
                      </h3>
                      <ul className="space-y-1 text-sm text-white/70 list-disc pl-5">
                        <li>Authentification sécurisée</li>
                        <li>Chiffrement des données sensibles</li>
                        <li>Gestion des autorisations</li>
                        <li>Protection contre les accès non autorisés</li>
                      </ul>
                    </div>

                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2 flex items-center">
                        <BarChart3 className="mr-2 h-5 w-5 text-orange-400" />
                        Rapports et statistiques
                      </h3>
                      <ul className="space-y-1 text-sm text-white/70 list-disc pl-5">
                        <li>Visualisation des dépenses</li>
                        <li>Rapports de transactions</li>
                        <li>Statistiques de compte</li>
                        <li>Exportation de données</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-primary/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">État d'avancement du projet</h2>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Phase actuelle</h4>
                      <p className="mb-4">
                        Actuellement, le projet est en cours de développement. Nous travaillons en étroite collaboration
                        pour intégrer les différentes parties de l'application et assurer une cohésion entre l'interface
                        utilisateur, l'architecture MVVM et la base de données.
                      </p>

                      <div className="w-full bg-white/10 rounded-full h-4 mb-1">
                        <div className="bg-white/40 h-4 rounded-full" style={{ width: "65%" }}></div>
                      </div>
                      <p className="text-sm text-white/70 text-right">65% complété</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                        <h5 className="font-semibold text-primary mb-2">Interface utilisateur</h5>
                        <div className="w-full bg-white/10 rounded-full h-3 mb-1">
                          <div className="bg-white/40 h-3 rounded-full" style={{ width: "80%" }}></div>
                        </div>
                        <p className="text-sm text-white/70">80% complété</p>
                        <ul className="mt-2 space-y-1 text-sm text-white/70">
                          <li>✓ Écran de connexion</li>
                          <li>✓ Dashboard principal</li>
                          <li>⟳ Écrans de transaction</li>
                          <li>⟳ Profil utilisateur</li>
                        </ul>
                      </div>

                      <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                        <h5 className="font-semibold text-primary mb-2">Architecture MVVM</h5>
                        <div className="w-full bg-white/10 rounded-full h-3 mb-1">
                          <div className="bg-white/40 h-3 rounded-full" style={{ width: "70%" }}></div>
                        </div>
                        <p className="text-sm text-white/70">70% complété</p>
                        <ul className="mt-2 space-y-1 text-sm text-white/70">
                          <li>✓ Structure des fichiers</li>
                          <li>✓ Modèles de données</li>
                          <li>✓ ViewModels principaux</li>
                          <li>⟳ Binding et commandes</li>
                        </ul>
                      </div>

                      <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                        <h5 className="font-semibold text-primary mb-2">Base de données</h5>
                        <div className="w-full bg-white/10 rounded-full h-3 mb-1">
                          <div className="bg-white/40 h-3 rounded-full" style={{ width: "50%" }}></div>
                        </div>
                        <p className="text-sm text-white/70">50% complété</p>
                        <ul className="mt-2 space-y-1 text-sm text-white/70">
                          <li>✓ Schéma de la base</li>
                          <li>✓ Connexion à la DB</li>
                          <li>⟳ Opérations CRUD</li>
                          <li>⟳ Sécurisation des données</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-primary/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Compétences acquises</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2">Développement C#</h3>
                      <p className="text-sm text-white/70">
                        Maîtrise approfondie du langage C# et du framework .NET pour le développement d'applications
                        desktop
                      </p>
                    </div>
                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2">Architecture MVVM</h3>
                      <p className="text-sm text-white/70">
                        Conception et implémentation d'applications suivant le pattern MVVM pour une meilleure
                        séparation des responsabilités
                      </p>
                    </div>
                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2">Gestion de base de données</h3>
                      <p className="text-sm text-white/70">
                        Conception de schémas de base de données et développement d'opérations CRUD efficaces
                      </p>
                    </div>
                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2">Travail d'équipe</h3>
                      <p className="text-sm text-white/70">
                        Collaboration efficace au sein d'une équipe de développement avec des rôles spécifiques
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-primary/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Objectifs finaux</h2>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="bg-white/20 p-2 rounded-full mt-1">
                        <span className="block h-2 w-2 rounded-full bg-white"></span>
                      </div>
                      <p>
                        <span className="font-semibold">Fonctionnalité complète :</span> Créer une application bancaire
                        fonctionnelle qui permet aux utilisateurs de gérer leurs comptes, effectuer des transactions, et
                        visualiser leurs historiques financiers.
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-white/20 p-2 rounded-full mt-1">
                        <span className="block h-2 w-2 rounded-full bg-white"></span>
                      </div>
                      <p>
                        <span className="font-semibold">Expérience utilisateur :</span> Offrir une interface utilisateur
                        intuitive et agréable qui facilite l'utilisation de l'application.
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-white/20 p-2 rounded-full mt-1">
                        <span className="block h-2 w-2 rounded-full bg-white"></span>
                      </div>
                      <p>
                        <span className="font-semibold">Sécurité :</span> Assurer la sécurité des données des
                        utilisateurs grâce à des pratiques de développement sécurisées.
                      </p>
                    </li>
                  </ul>
                  <p className="mt-4 text-white/80">
                    Ce projet nous permet de mettre en pratique nos connaissances en développement logiciel et de
                    travailler en équipe pour créer une application complexe et utile. Nous visons à livrer une
                    application de haute qualité qui répond aux besoins des utilisateurs tout en respectant les
                    meilleures pratiques de développement.
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
