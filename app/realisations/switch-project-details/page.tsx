"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PlanetBackground3D } from "@/components/PlanetBackground3D"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, CheckCircle2, FileCode, Server, Shield, Terminal, Clock, Network } from "lucide-react"
import Link from "next/link"

export default function SwitchProjectDetailsPage() {
  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden">
      <PlanetBackground3D planetType="neptune" />
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
                <div className="relative h-48 w-full bg-gradient-to-r from-[#1a365d] to-[#1a365d]/80">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Network className="h-24 w-24 text-blue-400/70" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <Network className="h-6 w-6 text-blue-500" />
                    </div>
                    <h1 className="text-xl font-bold text-white">Configuration Switch</h1>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-2 mb-6">
                    <Badge variant="outline" className="bg-white/20 border-white/30 text-white">
                      2023
                    </Badge>
                    <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                      Réseau
                    </Badge>
                    <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                      Configuration
                    </Badge>
                    <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                      Matériel
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
                        <p className="text-sm text-white/70">Switch Cisco, Câble console, PuTTY, Windows</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <FileCode className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium text-white">Technologies</h3>
                        <p className="text-sm text-white/70">CLI Cisco, Adressage IP, VLAN, Ports en cascade</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium text-white">Sécurité</h3>
                        <p className="text-sm text-white/70">
                          Mots de passe d'accès, Désactivation des ports inutilisés, Filtrage MAC
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
                        Augmentation du nombre de postes connectés au réseau
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-white/80">Configuration sécurisée et documentée</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-white/80">Intégration réussie avec l'infrastructure existante</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-white/80">Temps d'arrêt minimal pendant l'installation</span>
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
                      Au début de mon alternance, j'ai rejoint l'équipe HelpDesk. J'ai eu l'opportunité de configurer un
                      switch suite à un manque de ports disponibles pour connecter de nouveaux postes. Pour cela, j'ai
                      utilisé un câble console et le logiciel PuTTY pour la configuration.
                    </p>
                    <p>
                      Ce projet m'a permis de mettre en pratique mes connaissances théoriques en réseau et d'acquérir
                      une expérience concrète dans la configuration de matériel réseau. L'objectif était d'étendre
                      l'infrastructure réseau existante tout en maintenant la sécurité et la performance du réseau.
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
                        <Terminal className="h-5 w-5 mr-2 text-primary" />
                        Première configuration matérielle
                      </h3>
                      <p className="text-white/80 mb-3">
                        C'était ma première expérience de configuration d'un switch, ce qui a nécessité une
                        compréhension rapide des concepts de réseau et de l'interface en ligne de commande.
                      </p>
                      <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                        <h4 className="text-primary font-medium mb-2">Solution mise en œuvre</h4>
                        <p className="text-sm text-white/70">
                          J'ai consulté la documentation technique du switch et suivi des tutoriels en ligne pour me
                          familiariser avec l'interface CLI. J'ai également demandé conseil à des collègues plus
                          expérimentés pour valider ma compréhension des commandes et des concepts avant de procéder à
                          la configuration.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <Network className="h-5 w-5 mr-2 text-primary" />
                        Intégration avec l'infrastructure existante
                      </h3>
                      <p className="text-white/80 mb-3">
                        Assurer que le nouveau switch s'intègre parfaitement dans le réseau existant sans perturber les
                        services était un défi important.
                      </p>
                      <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                        <h4 className="text-primary font-medium mb-2">Solution mise en œuvre</h4>
                        <p className="text-sm text-white/70">
                          J'ai d'abord documenté la configuration du réseau existant, puis planifié l'intégration du
                          nouveau switch en veillant à ce qu'il soit sur le même sous-réseau. J'ai configuré l'adressage
                          IP et les paramètres réseau pour assurer une communication fluide avec les équipements
                          existants.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <Clock className="h-5 w-5 mr-2 text-primary" />
                        Minimisation des temps d'arrêt
                      </h3>
                      <p className="text-white/80 mb-3">
                        Effectuer la configuration et l'installation avec un impact minimal sur les utilisateurs du
                        réseau était essentiel pour maintenir la productivité.
                      </p>
                      <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                        <h4 className="text-primary font-medium mb-2">Solution mise en œuvre</h4>
                        <p className="text-sm text-white/70">
                          J'ai planifié l'installation pendant une période de faible activité et préparé la
                          configuration à l'avance. J'ai également testé la configuration dans un environnement isolé
                          avant de la déployer en production, ce qui a permis de réduire le temps d'intervention et de
                          minimiser les perturbations.
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
                        Évaluation du nombre de ports nécessaires, identification des contraintes techniques et
                        vérification de la compatibilité avec l'infrastructure existante.
                      </p>
                    </div>

                    <div className="relative pl-8 pb-8 border-l border-white/20 last:border-0">
                      <div className="absolute top-0 left-0 w-6 h-6 -translate-x-3 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold">2</span>
                      </div>
                      <h3 className="text-lg font-semibold">Connexion au switch</h3>
                      <p className="text-white/80 mt-1">
                        Utilisation d'un câble console pour se connecter physiquement au switch, puis configuration du
                        logiciel PuTTY pour établir une connexion série et accéder à l'interface de ligne de commande.
                      </p>
                    </div>

                    <div className="relative pl-8 pb-8 border-l border-white/20 last:border-0">
                      <div className="absolute top-0 left-0 w-6 h-6 -translate-x-3 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold">3</span>
                      </div>
                      <h3 className="text-lg font-semibold">Configuration IP</h3>
                      <p className="text-white/80 mt-1">
                        Attribution d'une adresse IP privée statique au nouveau switch, en veillant à ce qu'il soit sur
                        le même sous-réseau que le premier, afin d'assurer la transmission des données.
                      </p>
                    </div>

                    <div className="relative pl-8 pb-8 border-l border-white/20 last:border-0">
                      <div className="absolute top-0 left-0 w-6 h-6 -translate-x-3 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold">4</span>
                      </div>
                      <h3 className="text-lg font-semibold">Configuration en cascade</h3>
                      <p className="text-white/80 mt-1">
                        Configuration d'un port de chaque switch en mode cascade (partage de la liaison Ethernet) pour
                        permettre la communication entre les deux équipements et l'extension du réseau.
                      </p>
                    </div>

                    <div className="relative pl-8 border-l-0">
                      <div className="absolute top-0 left-0 w-6 h-6 -translate-x-3 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold">5</span>
                      </div>
                      <h3 className="text-lg font-semibold">Sauvegarde et documentation</h3>
                      <p className="text-white/80 mt-1">
                        Sauvegarde de la configuration pour éviter toute perte en cas de coupure de courant, et
                        documentation détaillée des paramètres et des choix techniques pour faciliter la maintenance
                        future.
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
                        <Terminal className="mr-2 h-5 w-5 text-blue-400" />
                        Interface CLI
                      </h3>
                      <ul className="space-y-1 text-sm text-white/70 list-disc pl-5">
                        <li>Utilisation de PuTTY pour la connexion série</li>
                        <li>Configuration via l'interface en ligne de commande</li>
                        <li>Apprentissage des commandes Cisco spécifiques</li>
                      </ul>
                    </div>

                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2 flex items-center">
                        <Network className="mr-2 h-5 w-5 text-green-400" />
                        Adressage IP
                      </h3>
                      <ul className="space-y-1 text-sm text-white/70 list-disc pl-5">
                        <li>Configuration d'une adresse IP statique</li>
                        <li>Vérification du sous-réseau et du masque</li>
                        <li>Test de connectivité avec les équipements existants</li>
                        <li>Configuration de la passerelle par défaut</li>
                      </ul>
                    </div>

                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2 flex items-center">
                        <Server className="mr-2 h-5 w-5 text-purple-400" />
                        Configuration des ports
                      </h3>
                      <ul className="space-y-1 text-sm text-white/70 list-disc pl-5">
                        <li>Paramétrage des ports en mode cascade</li>
                        <li>Configuration de la vitesse et du mode duplex</li>
                        <li>Désactivation des ports non utilisés</li>
                        <li>Vérification de l'état des connexions</li>
                      </ul>
                    </div>

                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2 flex items-center">
                        <Shield className="mr-2 h-5 w-5 text-orange-400" />
                        Sécurisation
                      </h3>
                      <ul className="space-y-1 text-sm text-white/70 list-disc pl-5">
                        <li>Configuration des mots de passe d'accès</li>
                        <li>Désactivation des services inutiles</li>
                        <li>Mise en place de restrictions d'accès</li>
                        <li>Documentation des paramètres de sécurité</li>
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
                      <h3 className="font-semibold text-primary mb-2">Configuration matérielle</h3>
                      <p className="text-sm text-white/70">
                        Maîtrise de la configuration de matériel réseau via une interface en ligne de commande
                      </p>
                    </div>
                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2">Adressage réseau</h3>
                      <p className="text-sm text-white/70">
                        Compréhension approfondie de l'adressage IP, des sous-réseaux et de la configuration réseau
                      </p>
                    </div>
                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2">Dépannage</h3>
                      <p className="text-sm text-white/70">
                        Capacité à diagnostiquer et résoudre des problèmes de connectivité réseau
                      </p>
                    </div>
                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2">Documentation technique</h3>
                      <p className="text-sm text-white/70">
                        Création de documentation claire et précise pour faciliter la maintenance future
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-primary/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Conclusion</h2>
                  <p className="text-white/80 mb-4">
                    Ce projet m'a permis de mettre en pratique mes connaissances théoriques en réseau et d'acquérir une
                    expérience concrète dans la configuration de matériel réseau. J'ai pu comprendre l'importance d'une
                    configuration précise et d'une documentation rigoureuse pour assurer le bon fonctionnement de
                    l'infrastructure réseau d'une entreprise.
                  </p>
                  <p className="text-white/80">
                    L'extension du réseau a été réalisée avec succès, permettant de connecter de nouveaux postes tout en
                    maintenant la performance et la sécurité du réseau. Cette expérience m'a également permis de
                    développer mon autonomie et ma capacité à résoudre des problèmes techniques dans un environnement
                    professionnel.
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
