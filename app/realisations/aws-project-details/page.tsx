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
  Database,
  Globe,
  Terminal,
  Clock,
  Workflow,
  Cloud,
} from "lucide-react"
import Link from "next/link"

export default function AWSProjectDetailsPage() {
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
                <div className="relative h-48 w-full bg-gradient-to-r from-[#232f3e] to-[#232f3e]/80">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Cloud className="h-24 w-24 text-orange-500/70" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <Cloud className="h-6 w-6 text-orange-500" />
                    </div>
                    <h1 className="text-xl font-bold text-white">Configuration AWS</h1>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-2 mb-6">
                    <Badge variant="outline" className="bg-white/20 border-white/30 text-white">
                      2023
                    </Badge>
                    <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                      Cloud
                    </Badge>
                    <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                      DevOps
                    </Badge>
                    <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                      Sécurité
                    </Badge>
                    <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                      Infrastructure
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Server className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium text-white">Environnement</h3>
                        <p className="text-sm text-white/70">AWS EC2, S3, RDS, CloudFront, Certificate Manager</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <FileCode className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium text-white">Technologies</h3>
                        <p className="text-sm text-white/70">Linux, PowerShell, Bash, WordPress, HTTPS/SSL</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium text-white">Sécurité</h3>
                        <p className="text-sm text-white/70">
                          IAM, Groupes de sécurité, Certificats SSL, Politiques d'accès
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
                        Réduction de 40% des temps de chargement grâce à CloudFront
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-white/80">Optimisation des coûts d'exploitation de 30%</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-white/80">
                        Mise en place d'une infrastructure sécurisée et conforme
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-white/80">Automatisation des déploiements et des sauvegardes</span>
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
                      Ce projet a consisté à mettre en place une infrastructure complète sur AWS pour héberger des
                      applications web, notamment un site WordPress. L'objectif était de créer un environnement
                      sécurisé, performant et facilement maintenable, tout en optimisant les coûts d'exploitation.
                    </p>
                    <p>
                      Au-delà de la simple installation d'un serveur web, j'ai implémenté des bonnes pratiques DevOps
                      comme l'automatisation des déploiements, la sécurisation des accès et la mise en place de
                      sauvegardes régulières.
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
                        Certificat SSL
                      </h3>
                      <p className="text-white/80 mb-3">
                        L'implémentation d'un certificat SSL dans l'environnement AWS était un défi important pour
                        assurer la sécurité des connexions.
                      </p>
                      <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                        <h4 className="text-primary font-medium mb-2">Solution mise en œuvre</h4>
                        <p className="text-sm text-white/70">
                          J'ai utilisé AWS Certificate Manager pour générer et gérer les certificats, puis configuré les
                          paramètres nécessaires pour assurer une connexion HTTPS sécurisée pour le site web. J'ai
                          également mis en place une redirection automatique de HTTP vers HTTPS pour garantir que toutes
                          les connexions soient sécurisées.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <Clock className="h-5 w-5 mr-2 text-primary" />
                        Sécurisation
                      </h3>
                      <p className="text-white/80 mb-3">
                        La sécurisation de l'environnement AWS nécessitait une approche rigoureuse pour protéger les
                        données et les applications.
                      </p>
                      <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                        <h4 className="text-primary font-medium mb-2">Solution mise en œuvre</h4>
                        <p className="text-sm text-white/70">
                          J'ai mis en place des groupes de sécurité restrictifs, configuré des politiques IAM selon le
                          principe du moindre privilège, et implémenté des mécanismes de surveillance pour détecter
                          toute activité suspecte. J'ai également configuré des alertes automatiques pour être informé
                          de toute tentative d'accès non autorisée.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <Terminal className="h-5 w-5 mr-2 text-primary" />
                        Architecture
                      </h3>
                      <p className="text-white/80 mb-3">
                        Concevoir une architecture cloud évolutive et résiliente tout en maîtrisant les coûts
                        représentait un défi majeur.
                      </p>
                      <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                        <h4 className="text-primary font-medium mb-2">Solution mise en œuvre</h4>
                        <p className="text-sm text-white/70">
                          J'ai créé un schéma détaillé de l'infrastructure, documenté les flux de données et les
                          interactions entre les différents services. J'ai opté pour une architecture modulaire
                          permettant d'ajouter ou de modifier des composants sans affecter l'ensemble du système,
                          facilitant ainsi la maintenance et les futures évolutions.
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
                        Identification des exigences techniques et fonctionnelles, évaluation des contraintes de
                        sécurité et de performance, et définition des objectifs de coûts.
                      </p>
                    </div>

                    <div className="relative pl-8 pb-8 border-l border-white/20 last:border-0">
                      <div className="absolute top-0 left-0 w-6 h-6 -translate-x-3 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold">2</span>
                      </div>
                      <h3 className="text-lg font-semibold">Conception de l'architecture</h3>
                      <p className="text-white/80 mt-1">
                        Élaboration d'un schéma d'architecture cloud, sélection des services AWS appropriés (EC2, S3,
                        RDS), et planification des mécanismes de sécurité et de sauvegarde.
                      </p>
                    </div>

                    <div className="relative pl-8 pb-8 border-l border-white/20 last:border-0">
                      <div className="absolute top-0 left-0 w-6 h-6 -translate-x-3 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold">3</span>
                      </div>
                      <h3 className="text-lg font-semibold">Déploiement de l'infrastructure</h3>
                      <p className="text-white/80 mt-1">
                        Configuration des instances EC2, mise en place des buckets S3 pour le stockage statique,
                        configuration des bases de données RDS et mise en place de CloudFront pour la distribution de
                        contenu.
                      </p>
                    </div>

                    <div className="relative pl-8 pb-8 border-l border-white/20 last:border-0">
                      <div className="absolute top-0 left-0 w-6 h-6 -translate-x-3 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold">4</span>
                      </div>
                      <h3 className="text-lg font-semibold">Sécurisation et optimisation</h3>
                      <p className="text-white/80 mt-1">
                        Mise en place des certificats SSL, configuration des groupes de sécurité et des politiques IAM,
                        optimisation des performances et des coûts via des stratégies de mise à l'échelle automatique.
                      </p>
                    </div>

                    <div className="relative pl-8 border-l-0">
                      <div className="absolute top-0 left-0 w-6 h-6 -translate-x-3 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold">5</span>
                      </div>
                      <h3 className="text-lg font-semibold">Automatisation et surveillance</h3>
                      <p className="text-white/80 mt-1">
                        Mise en place de scripts d'automatisation pour les déploiements et les sauvegardes,
                        configuration des outils de surveillance et d'alerte pour assurer la disponibilité et la
                        performance.
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
                        <Server className="mr-2 h-5 w-5 text-blue-400" />
                        Accès clés SSH
                      </h3>
                      <ul className="space-y-1 text-sm text-white/70 list-disc pl-5">
                        <li>Génération et gestion sécurisée des paires de clés SSH</li>
                        <li>Configuration des autorisations d'accès aux instances</li>
                        <li>Rotation régulière des clés pour renforcer la sécurité</li>
                      </ul>
                    </div>

                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2 flex items-center">
                        <Database className="mr-2 h-5 w-5 text-green-400" />
                        EC2/S3
                      </h3>
                      <ul className="space-y-1 text-sm text-white/70 list-disc pl-5">
                        <li>Configuration d'instances EC2 pour l'hébergement web</li>
                        <li>Mise en place de buckets S3 pour le stockage statique</li>
                        <li>Intégration entre les services EC2 et S3</li>
                        <li>Gestion des sauvegardes automatisées</li>
                      </ul>
                    </div>

                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2 flex items-center">
                        <Globe className="mr-2 h-5 w-5 text-purple-400" />
                        Hébergement web
                      </h3>
                      <ul className="space-y-1 text-sm text-white/70 list-disc pl-5">
                        <li>Configuration d'un serveur web sur EC2</li>
                        <li>Mise en place de certificats SSL pour HTTPS</li>
                        <li>Configuration DNS et gestion des domaines</li>
                        <li>Optimisation des performances de chargement</li>
                      </ul>
                    </div>

                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2 flex items-center">
                        <Workflow className="mr-2 h-5 w-5 text-orange-400" />
                        Automatisation
                      </h3>
                      <ul className="space-y-1 text-sm text-white/70 list-disc pl-5">
                        <li>Scripts de déploiement automatisé</li>
                        <li>Configuration de sauvegardes programmées</li>
                        <li>Mise en place de systèmes de surveillance</li>
                        <li>Alertes en cas d'incidents ou de problèmes</li>
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
                      <h3 className="font-semibold text-primary mb-2">Services AWS</h3>
                      <p className="text-sm text-white/70">
                        Maîtrise approfondie des services EC2, S3, RDS, CloudFront et Certificate Manager
                      </p>
                    </div>
                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2">Sécurité cloud</h3>
                      <p className="text-sm text-white/70">
                        Configuration des groupes de sécurité, politiques IAM et gestion des certificats SSL
                      </p>
                    </div>
                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2">Automatisation DevOps</h3>
                      <p className="text-sm text-white/70">
                        Création de scripts d'automatisation pour les déploiements et les sauvegardes
                      </p>
                    </div>
                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2">Optimisation des coûts</h3>
                      <p className="text-sm text-white/70">
                        Stratégies d'optimisation des ressources cloud pour réduire les coûts d'exploitation
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-primary/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Conclusion</h2>
                  <p className="text-white/80 mb-4">
                    L'infrastructure mise en place a permis d'obtenir un environnement robuste et performant pour
                    l'hébergement d'applications web. Les temps de chargement ont été réduits de 40% grâce à
                    l'utilisation de CloudFront et les coûts d'exploitation ont été optimisés de 30% par rapport à la
                    solution précédente.
                  </p>
                  <p className="text-white/80">
                    La mise en place d'une stratégie de sauvegarde complète et l'automatisation des déploiements ont
                    également permis de réduire considérablement le temps consacré à la maintenance, tout en améliorant
                    la fiabilité du système. Ce projet a démontré l'importance d'une approche DevOps dans la gestion des
                    infrastructures cloud modernes.
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

