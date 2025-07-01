"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PlanetBackground3D } from "@/components/PlanetBackground3D"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, CheckCircle2, FileCode, Server, Shield, Workflow } from "lucide-react"
import Link from "next/link"

export default function GPOProjectDetailsPage() {
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
                <div className="relative h-48 w-full bg-gradient-to-br from-blue-500/20 to-cyan-600/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img src="/images/logos/ocs.png" alt="OCS Logo" className="h-24 w-24 object-contain" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <img src="/images/logos/ocs.png" alt="OCS Logo" className="h-6 w-6 object-contain" />
                    </div>
                    <h1 className="text-xl font-bold text-white">Déploiement d'agents via GPO</h1>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-2 mb-6">
                    <Badge variant="outline" className="bg-white/20 border-white/30 text-white">
                      2022
                    </Badge>
                    <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                      Automatisation
                    </Badge>
                    <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                      PowerShell
                    </Badge>
                    <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                      Active Directory
                    </Badge>
                    <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                      GPO
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Server className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium text-white">Environnement</h3>
                        <p className="text-sm text-white/70">Windows Server, Active Directory, GLPI, OCS Inventory</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <FileCode className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium text-white">Technologies</h3>
                        <p className="text-sm text-white/70">GPO, PowerShell, MSI Packaging, Scripts d'installation</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium text-white">Sécurité</h3>
                        <p className="text-sm text-white/70">
                          Inventaire automatisé, Suivi des postes, Déploiement sécurisé
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
                        Déploiement automatisé sur l'ensemble du parc informatique
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-white/80">Inventaire complet et à jour des postes dans GLPI</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-white/80">
                        Réduction significative du temps d'installation manuelle
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-white/80">
                        Amélioration de la sécurité par un meilleur suivi des postes
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
                      Dans le cadre de l'installation de GLPI, j'ai été chargé de déployer un agent OCS sur chaque poste
                      de l'entreprise pour qu'il soit référencé dans GLPI. Ce projet avait pour objectif de garder une
                      trace des postes connectés et de renforcer la sécurité du parc informatique.
                    </p>
                    <p>
                      L'automatisation de ce déploiement devait se faire via une GPO (Group Policy Object) sur le
                      serveur Active Directory de l'entreprise, permettant ainsi une installation silencieuse et
                      automatique sur l'ensemble des postes sans intervention manuelle.
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
                        <Workflow className="h-5 w-5 mr-2 text-primary" />
                        Transformation d'exécutable
                      </h3>
                      <p className="text-white/80 mb-3">
                        Le principal défi était de transformer l'agent OCS (.exe) en un package déployable via GPO. Les
                        fichiers .exe standards ne peuvent pas être déployés automatiquement comme les fichiers .msi.
                      </p>
                      <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                        <h4 className="text-primary font-medium mb-2">Solution mise en œuvre</h4>
                        <p className="text-sm text-white/70">
                          J'ai utilisé un packager pour transformer l'agent OCS en un package avec les mêmes
                          caractéristiques qu'un fichier .msi. Dans le packager, j'ai configuré l'agent Windows puis
                          ajouté une ligne de commande pour forcer une installation silencieuse.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <Server className="h-5 w-5 mr-2 text-primary" />
                        Configuration de la GPO
                      </h3>
                      <p className="text-white/80 mb-3">
                        La configuration correcte de la GPO pour assurer que l'agent s'installe au démarrage des postes
                        sans intervention utilisateur représentait un défi important.
                      </p>
                      <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                        <h4 className="text-primary font-medium mb-2">Solution mise en œuvre</h4>
                        <p className="text-sm text-white/70">
                          J'ai créé une GPO dédiée au déploiement de l'agent OCS et configuré le package dans la
                          catégorie "script au démarrage". J'ai également ajouté le script d'installation silencieuse
                          dans la GPO. Pour appliquer immédiatement les changements, j'ai utilisé la commande "gpupdate
                          /force" dans l'invite de commande.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <Shield className="h-5 w-5 mr-2 text-primary" />
                        Installation silencieuse
                      </h3>
                      <p className="text-white/80 mb-3">
                        Assurer que l'installation se fasse de manière totalement silencieuse, sans aucune intervention
                        de l'utilisateur et sans perturber son travail était essentiel.
                      </p>
                      <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                        <h4 className="text-primary font-medium mb-2">Solution mise en œuvre</h4>
                        <p className="text-sm text-white/70">
                          J'ai développé un script d'installation qui s'exécute en arrière-plan avec des paramètres
                          silencieux. Ce script vérifie également si l'agent est déjà installé pour éviter les
                          installations en double et optimiser les performances.
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
                      <h3 className="text-lg font-semibold">Recherche et préparation</h3>
                      <p className="text-white/80 mt-1">
                        Identification de l'exécutable de l'agent OCS et recherche des outils de packaging appropriés
                        pour la transformation en format déployable via GPO.
                      </p>
                    </div>

                    <div className="relative pl-8 pb-8 border-l border-white/20 last:border-0">
                      <div className="absolute top-0 left-0 w-6 h-6 -translate-x-3 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold">2</span>
                      </div>
                      <h3 className="text-lg font-semibold">Transformation de l'exécutable</h3>
                      <p className="text-white/80 mt-1">
                        Installation d'un packager, configuration avec l'agent Windows, et ajout d'une ligne de commande
                        pour forcer l'installation silencieuse, créant ainsi un package déployable.
                      </p>
                    </div>

                    <div className="relative pl-8 pb-8 border-l border-white/20 last:border-0">
                      <div className="absolute top-0 left-0 w-6 h-6 -translate-x-3 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold">3</span>
                      </div>
                      <h3 className="text-lg font-semibold">Configuration de la GPO</h3>
                      <p className="text-white/80 mt-1">
                        Accès au serveur Active Directory, création d'une nouvelle GPO dédiée au déploiement de l'agent
                        OCS, et ajout du package dans la catégorie "script au démarrage".
                      </p>
                    </div>

                    <div className="relative pl-8 pb-8 border-l border-white/20 last:border-0">
                      <div className="absolute top-0 left-0 w-6 h-6 -translate-x-3 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold">4</span>
                      </div>
                      <h3 className="text-lg font-semibold">Mise à jour et déploiement</h3>
                      <p className="text-white/80 mt-1">
                        Exécution de la commande "gpupdate /force" pour appliquer immédiatement les nouvelles stratégies
                        et vérification du déploiement sur les postes après redémarrage.
                      </p>
                    </div>

                    <div className="relative pl-8 border-l-0">
                      <div className="absolute top-0 left-0 w-6 h-6 -translate-x-3 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold">5</span>
                      </div>
                      <h3 className="text-lg font-semibold">Validation et suivi</h3>
                      <p className="text-white/80 mt-1">
                        Vérification dans GLPI que tous les postes sont correctement référencés après installation de
                        l'agent OCS, et mise en place d'un suivi pour les nouveaux postes.
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
                      <h3 className="font-semibold text-primary mb-2">Administration Active Directory</h3>
                      <p className="text-sm text-white/70">
                        Configuration avancée des GPO et déploiement de logiciels via stratégies de groupe
                      </p>
                    </div>
                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2">Packaging d'applications</h3>
                      <p className="text-sm text-white/70">
                        Transformation d'exécutables en packages déployables automatiquement
                      </p>
                    </div>
                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2">Scripting PowerShell</h3>
                      <p className="text-sm text-white/70">
                        Création de scripts d'installation silencieuse et d'automatisation
                      </p>
                    </div>
                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2">Gestion d'inventaire IT</h3>
                      <p className="text-sm text-white/70">
                        Configuration et utilisation de GLPI et OCS Inventory pour le suivi du parc informatique
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-primary/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Conclusion</h2>
                  <p className="text-white/80 mb-4">
                    Ce projet de déploiement d'agents OCS via GPO a permis d'automatiser entièrement l'installation sur
                    tous les postes de l'entreprise, assurant ainsi un inventaire complet et à jour dans GLPI. Cette
                    solution a considérablement amélioré la gestion du parc informatique et renforcé la sécurité en
                    permettant un suivi précis de tous les postes connectés.
                  </p>
                  <p className="text-white/80">
                    Les compétences acquises en matière d'administration Active Directory, de packaging d'applications
                    et de scripting sont directement applicables à d'autres projets d'automatisation et de déploiement,
                    contribuant à une gestion plus efficace de l'infrastructure IT.
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

