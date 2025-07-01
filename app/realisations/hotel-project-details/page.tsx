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
  Database,
  Globe,
  Terminal,
  Hotel,
  Calendar,
  Users,
} from "lucide-react"
import Link from "next/link"

export default function HotelProjectDetailsPage() {
  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden">
      <PlanetBackground3D planetType="saturn" />
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
                <div className="relative h-48 w-full bg-gradient-to-r from-[#336699] to-[#336699]/80">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Hotel className="h-24 w-24 text-teal-500/70" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <Hotel className="h-6 w-6 text-teal-500" />
                    </div>
                    <h1 className="text-xl font-bold text-white">Réservation d'hôtel</h1>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-2 mb-6">
                    <Badge variant="outline" className="bg-white/20 border-white/30 text-white">
                      2023
                    </Badge>
                    <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                      PostgreSQL
                    </Badge>
                    <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                      PHP
                    </Badge>
                    <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                      Bootstrap
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Database className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium text-white">Base de données</h3>
                        <p className="text-sm text-white/70">PostgreSQL, Entity Framework Core, Migrations</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <FileCode className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium text-white">Technologies</h3>
                        <p className="text-sm text-white/70">C#, ASP.NET Core, MVVM, Bootstrap</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium text-white">Sécurité</h3>
                        <p className="text-sm text-white/70">
                          Authentification, Autorisation, Hachage des mots de passe
                        </p>
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
                      <span className="text-sm text-white/80">
                        Système de réservation fonctionnel avec vérification de disponibilité
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-white/80">
                        Interface utilisateur intuitive pour la recherche de chambres
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-white/80">
                        Système d'authentification sécurisé avec différents niveaux d'accès
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-white/80">
                        Base de données optimisée pour les requêtes de disponibilité
                      </span>
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
                      Ce projet a consisté à développer une application complète de gestion de réservation d'hôtel
                      utilisant une base de données PostgreSQL. L'objectif était de créer un système permettant aux
                      utilisateurs de consulter les chambres disponibles, de réserver une chambre pour une date donnée,
                      et de gérer leurs réservations.
                    </p>
                    <p>
                      L'application dispose également d'un système d'authentification avec différents niveaux d'accès,
                      permettant aux administrateurs de gérer les chambres, les réservations et les utilisateurs, tandis
                      que les clients peuvent uniquement consulter et gérer leurs propres réservations.
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
                        <Database className="h-5 w-5 mr-2 text-primary" />
                        Conception de la base de données
                      </h3>
                      <p className="text-white/80 mb-3">
                        La conception d'une base de données efficace pour gérer les réservations et éviter les conflits
                        de disponibilité était un défi majeur.
                      </p>
                      <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                        <h4 className="text-primary font-medium mb-2">Solution mise en œuvre</h4>
                        <p className="text-sm text-white/70">
                          J'ai conçu un schéma de base de données avec des relations claires entre les chambres, les
                          clients et les réservations. J'ai implémenté des contraintes d'intégrité pour garantir la
                          cohérence des données et des index pour optimiser les requêtes de disponibilité. J'ai
                          également utilisé des triggers PostgreSQL pour automatiser certaines vérifications.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <Calendar className="h-5 w-5 mr-2 text-primary" />
                        Système de réservation
                      </h3>
                      <p className="text-white/80 mb-3">
                        La mise en place d'un système de réservation fiable qui vérifie la disponibilité en temps réel
                        et gère les conflits était complexe.
                      </p>
                      <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                        <h4 className="text-primary font-medium mb-2">Solution mise en œuvre</h4>
                        <p className="text-sm text-white/70">
                          J'ai développé un algorithme qui vérifie les réservations existantes pour détecter les
                          chevauchements de dates. J'ai implémenté des transactions pour garantir l'intégrité des
                          données lors des réservations simultanées. Le système calcule également automatiquement le
                          prix total en fonction de la durée du séjour et du type de chambre.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <Shield className="h-5 w-5 mr-2 text-primary" />
                        Authentification et autorisation
                      </h3>
                      <p className="text-white/80 mb-3">
                        La mise en place d'un système d'authentification sécurisé avec différents niveaux d'accès était
                        essentielle pour protéger les données.
                      </p>
                      <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                        <h4 className="text-primary font-medium mb-2">Solution mise en œuvre</h4>
                        <p className="text-sm text-white/70">
                          J'ai utilisé ASP.NET Identity pour gérer l'authentification et l'autorisation. Les mots de
                          passe sont hachés et salés avant d'être stockés dans la base de données. J'ai défini
                          différents rôles (administrateur, employé, client) avec des permissions spécifiques pour
                          chaque fonctionnalité de l'application.
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
                      <h3 className="text-lg font-semibold">Analyse des besoins</h3>
                      <p className="text-white/80 mt-1">
                        Identification des fonctionnalités requises, des types d'utilisateurs et de leurs permissions,
                        ainsi que des contraintes techniques et fonctionnelles.
                      </p>
                    </div>

                    <div className="relative pl-8 pb-8 border-l border-white/20 last:border-0">
                      <div className="absolute top-0 left-0 w-6 h-6 -translate-x-3 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold">2</span>
                      </div>
                      <h3 className="text-lg font-semibold">Conception de la base de données</h3>
                      <p className="text-white/80 mt-1">
                        Création du schéma de base de données avec les tables, les relations, les contraintes et les
                        index nécessaires pour gérer efficacement les données de l'application.
                      </p>
                    </div>

                    <div className="relative pl-8 pb-8 border-l border-white/20 last:border-0">
                      <div className="absolute top-0 left-0 w-6 h-6 -translate-x-3 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold">3</span>
                      </div>
                      <h3 className="text-lg font-semibold">Développement du backend</h3>
                      <p className="text-white/80 mt-1">
                        Implémentation des modèles, des contrôleurs et des services pour gérer les opérations CRUD, les
                        réservations, l'authentification et l'autorisation.
                      </p>
                    </div>

                    <div className="relative pl-8 pb-8 border-l border-white/20 last:border-0">
                      <div className="absolute top-0 left-0 w-6 h-6 -translate-x-3 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold">4</span>
                      </div>
                      <h3 className="text-lg font-semibold">Création de l'interface utilisateur</h3>
                      <p className="text-white/80 mt-1">
                        Développement des vues pour la recherche de chambres, la réservation, la gestion des
                        réservations et l'administration du système.
                      </p>
                    </div>

                    <div className="relative pl-8 border-l-0">
                      <div className="absolute top-0 left-0 w-6 h-6 -translate-x-3 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold">5</span>
                      </div>
                      <h3 className="text-lg font-semibold">Tests et déploiement</h3>
                      <p className="text-white/80 mt-1">
                        Réalisation de tests unitaires et d'intégration pour valider le fonctionnement de l'application,
                        puis déploiement sur un serveur de production.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-primary/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Structure de la base de données</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2 flex items-center">
                        <Database className="mr-2 h-5 w-5 text-blue-400" />
                        Table Chambres
                      </h3>
                      <ul className="space-y-1 text-sm text-white/70 list-disc pl-5">
                        <li>id_chambre (PK)</li>
                        <li>numero</li>
                        <li>type</li>
                        <li>prix</li>
                        <li>description</li>
                        <li>statut</li>
                      </ul>
                    </div>

                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2 flex items-center">
                        <Users className="mr-2 h-5 w-5 text-green-400" />
                        Table Clients
                      </h3>
                      <ul className="space-y-1 text-sm text-white/70 list-disc pl-5">
                        <li>id_client (PK)</li>
                        <li>nom</li>
                        <li>prenom</li>
                        <li>email</li>
                        <li>telephone</li>
                        <li>adresse</li>
                      </ul>
                    </div>

                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2 flex items-center">
                        <Calendar className="mr-2 h-5 w-5 text-purple-400" />
                        Table Réservations
                      </h3>
                      <ul className="space-y-1 text-sm text-white/70 list-disc pl-5">
                        <li>id_reservation (PK)</li>
                        <li>id_chambre (FK)</li>
                        <li>id_client (FK)</li>
                        <li>date_debut</li>
                        <li>date_fin</li>
                        <li>statut</li>
                        <li>prix_total</li>
                      </ul>
                    </div>

                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2 flex items-center">
                        <Shield className="mr-2 h-5 w-5 text-orange-400" />
                        Table Utilisateurs
                      </h3>
                      <ul className="space-y-1 text-sm text-white/70 list-disc pl-5">
                        <li>id_utilisateur (PK)</li>
                        <li>nom_utilisateur</li>
                        <li>mot_de_passe</li>
                        <li>role</li>
                        <li>email</li>
                        <li>date_creation</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-primary/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Fonctionnalités principales</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2 flex items-center">
                        <Globe className="mr-2 h-5 w-5 text-blue-400" />
                        Recherche de chambres
                      </h3>
                      <p className="text-sm text-white/70">
                        Interface intuitive permettant aux utilisateurs de rechercher des chambres disponibles en
                        fonction de critères comme les dates, le type de chambre et le prix.
                      </p>
                    </div>
                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2 flex items-center">
                        <Calendar className="mr-2 h-5 w-5 text-green-400" />
                        Réservation en ligne
                      </h3>
                      <p className="text-sm text-white/70">
                        Processus de réservation simplifié avec vérification de disponibilité en temps réel et
                        confirmation immédiate.
                      </p>
                    </div>
                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2 flex items-center">
                        <Users className="mr-2 h-5 w-5 text-purple-400" />
                        Gestion des utilisateurs
                      </h3>
                      <p className="text-sm text-white/70">
                        Système d'authentification sécurisé avec différents niveaux d'accès pour les administrateurs,
                        les employés et les clients.
                      </p>
                    </div>
                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2 flex items-center">
                        <Terminal className="mr-2 h-5 w-5 text-orange-400" />
                        Administration
                      </h3>
                      <p className="text-sm text-white/70">
                        Interface d'administration complète permettant de gérer les chambres, les réservations, les
                        clients et les utilisateurs.
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
                      <h3 className="font-semibold text-primary mb-2">PostgreSQL</h3>
                      <p className="text-sm text-white/70">
                        Conception et optimisation de bases de données relationnelles, utilisation de fonctionnalités
                        avancées comme les triggers et les procédures stockées.
                      </p>
                    </div>
                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2">C# et ASP.NET Core</h3>
                      <p className="text-sm text-white/70">
                        Développement d'applications web avec le framework ASP.NET Core, utilisation du modèle MVVM et
                        des fonctionnalités avancées de C#.
                      </p>
                    </div>
                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2">Entity Framework Core</h3>
                      <p className="text-sm text-white/70">
                        Utilisation d'un ORM pour interagir avec la base de données, génération de modèles à partir de
                        la base de données existante, migrations de schéma.
                      </p>
                    </div>
                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2">Sécurité des applications</h3>
                      <p className="text-sm text-white/70">
                        Mise en place de mécanismes d'authentification et d'autorisation, protection contre les
                        vulnérabilités courantes, sécurisation des données sensibles.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-primary/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Conclusion</h2>
                  <p className="text-white/80 mb-4">
                    Ce projet de réservation d'hôtel m'a permis de mettre en pratique mes connaissances en développement
                    d'applications avec C# et en gestion de bases de données PostgreSQL. J'ai pu approfondir ma
                    compréhension du modèle MVVM et des techniques de scaffold pour générer des modèles à partir d'une
                    base de données existante.
                  </p>
                  <p className="text-white/80">
                    L'application développée offre une solution complète pour la gestion des réservations d'hôtel, avec
                    une interface utilisateur intuitive et des fonctionnalités avancées pour les administrateurs. Les
                    compétences acquises lors de ce projet sont directement applicables à d'autres projets de
                    développement d'applications web avec des bases de données relationnelles.
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

