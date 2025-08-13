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
  GitBranch,
  GitMerge,
  Workflow,
  Rocket,
  RefreshCw,
  Zap,
} from "lucide-react"
import Link from "next/link"

export default function CICDProjectDetailsPage() {
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
                    <Workflow className="h-24 w-24 text-purple-500/70" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <Rocket className="h-6 w-6 text-purple-600" />
                    </div>
                    <h1 className="text-xl font-bold text-white">CI/CD avec GitLab</h1>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-2 mb-6">
                    <Badge variant="outline" className="bg-primary/20 border-primary/30 text-primary-foreground">
                      2023
                    </Badge>
                    <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                      CI/CD
                    </Badge>
                    <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                      GitLab
                    </Badge>
                    <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                      Automatisation
                    </Badge>
                    <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                      DevOps
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <GitBranch className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium text-white">Environnement</h3>
                        <p className="text-sm text-white/70">GitLab, CI/CD, Docusaurus, Linux</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <FileCode className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium text-white">Technologies</h3>
                        <p className="text-sm text-white/70">YAML, Shell, Git, JavaScript</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Workflow className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium text-white">Automatisation</h3>
                        <p className="text-sm text-white/70">Pipelines, Jobs, Stages, Déploiement continu</p>
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
                      <span className="text-sm text-white/80">Déploiement automatisé à chaque modification</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-white/80">
                        Réduction des erreurs humaines dans le processus de déploiement
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-white/80">
                        Gain de temps considérable pour l'avancement du projet
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-white/80">Amélioration des connaissances en DevOps et GitLab</span>
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
                      Après avoir finalisé mon projet d'hébergement de site web, j'ai entrepris l'automatisation du
                      déploiement avec GitLab CI/CD. Cette solution me permet d'éviter l'utilisation répétitive de
                      lignes de commande pour mettre à jour mon site à chaque modification effectuée sur une de mes
                      pages.
                    </p>
                    <p>
                      Ce projet représente un gain de temps considérable pour l'avancement de mon travail, tout en
                      enrichissant mes connaissances sur GitLab et les pratiques DevOps modernes. J'ai pu explorer en
                      profondeur les fonctionnalités de GitLab, notamment le commit de fichiers/dossiers pour la
                      sauvegarde du projet, le partage avec d'autres collaborateurs, et surtout l'automatisation des
                      tâches répétitives.
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
                        Configuration du fichier YAML
                      </h3>
                      <p className="text-white/80 mb-3">
                        Créer et configurer correctement le fichier .gitlab-ci.yml pour définir les étapes du pipeline
                        CI/CD.
                      </p>
                      <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                        <h4 className="text-primary font-medium mb-2">Solution mise en œuvre</h4>
                        <p className="text-sm text-white/70">
                          J'ai étudié la documentation de GitLab CI/CD et analysé des exemples de configurations pour
                          comprendre la structure du fichier YAML. J'ai ensuite créé un fichier .gitlab-ci.yml adapté à
                          mon projet Docusaurus, en définissant les stages appropriés (build, test, deploy) et les jobs
                          correspondants.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <Server className="h-5 w-5 mr-2 text-primary" />
                        Configuration des runners
                      </h3>
                      <p className="text-white/80 mb-3">
                        Configurer les runners GitLab pour exécuter les jobs définis dans le pipeline CI/CD.
                      </p>
                      <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                        <h4 className="text-primary font-medium mb-2">Solution mise en œuvre</h4>
                        <p className="text-sm text-white/70">
                          J'ai utilisé les runners partagés fournis par GitLab.com pour exécuter mes jobs. J'ai
                          configuré les tags appropriés dans mon fichier .gitlab-ci.yml pour s'assurer que les jobs sont
                          exécutés sur les runners disposant des capacités nécessaires pour mon projet.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <Shield className="h-5 w-5 mr-2 text-primary" />
                        Gestion des secrets et variables d'environnement
                      </h3>
                      <p className="text-white/80 mb-3">
                        Sécuriser les informations sensibles (comme les clés d'accès) tout en les rendant disponibles
                        pour le pipeline CI/CD.
                      </p>
                      <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                        <h4 className="text-primary font-medium mb-2">Solution mise en œuvre</h4>
                        <p className="text-sm text-white/70">
                          J'ai utilisé les variables CI/CD de GitLab pour stocker les informations sensibles. Ces
                          variables sont masquées dans les logs et peuvent être configurées au niveau du projet ou du
                          groupe. J'ai défini les variables nécessaires pour l'authentification et la configuration de
                          mon environnement de déploiement.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-primary/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Fonctionnement de l'automatisation avec GitLab CI/CD</h2>
                  <div className="space-y-4">
                    <div className="relative pl-8 pb-8 border-l border-white/20 last:border-0">
                      <div className="absolute top-0 left-0 w-6 h-6 -translate-x-3 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold">1</span>
                      </div>
                      <h3 className="text-lg font-semibold">Création du fichier .gitlab-ci.yml</h3>
                      <p className="text-white/80 mt-1">
                        Le fichier .gitlab-ci.yml contient des instructions pour GitLab sur les tâches à exécuter.
                        Chaque tâche est définie sous forme de job, et les jobs sont regroupés en stages. Par exemple,
                        vous pouvez avoir des stages comme build, test, et deploy.
                      </p>
                      <div className="mt-3 bg-black/30 p-3 rounded-md border border-white/10">
                        <code className="text-xs text-white/90 block whitespace-pre overflow-x-auto">
                          {`stages:
  - build
  - test
  - deploy

build-job:
  stage: build
  script:
    - npm install
    - npm run build
  artifacts:
    paths:
      - build/`}
                        </code>
                      </div>
                    </div>

                    <div className="relative pl-8 pb-8 border-l border-white/20 last:border-0">
                      <div className="absolute top-0 left-0 w-6 h-6 -translate-x-3 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold">2</span>
                      </div>
                      <h3 className="text-lg font-semibold">Définition des stages et des jobs</h3>
                      <p className="text-white/80 mt-1">
                        <strong>Stages :</strong> Ils définissent les étapes principales du processus CI/CD. Par
                        exemple, build pour compiler le projet, test pour exécuter les tests, et deploy pour déployer
                        l'application.
                      </p>
                      <p className="text-white/80 mt-2">
                        <strong>Jobs :</strong> Ils définissent les actions spécifiques à exécuter dans chaque stage.
                        Chaque job peut contenir des scripts shell qui s'exécutent dans l'ordre défini.
                      </p>
                    </div>

                    <div className="relative pl-8 pb-8 border-l border-white/20 last:border-0">
                      <div className="absolute top-0 left-0 w-6 h-6 -translate-x-3 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold">3</span>
                      </div>
                      <h3 className="text-lg font-semibold">Déclenchement des pipelines</h3>
                      <p className="text-white/80 mt-1">
                        Chaque fois qu'un commit est poussé dans le dépôt, GitLab déclenche automatiquement un pipeline
                        CI/CD. Le pipeline passe par chaque stage et exécute les jobs définis dans le fichier
                        .gitlab-ci.yml.
                      </p>
                    </div>

                    <div className="relative pl-8 pb-8 border-l border-white/20 last:border-0">
                      <div className="absolute top-0 left-0 w-6 h-6 -translate-x-3 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold">4</span>
                      </div>
                      <h3 className="text-lg font-semibold">Exécution des scripts</h3>
                      <p className="text-white/80 mt-1">
                        Les scripts définis dans chaque job sont exécutés. Par exemple, dans le job build, le script
                        installe les dépendances et compile le projet. Dans le job test, les tests unitaires sont
                        exécutés pour vérifier que le code fonctionne correctement. Enfin, dans le job deploy, le site
                        est déployé.
                      </p>
                    </div>

                    <div className="relative pl-8 border-l-0">
                      <div className="absolute top-0 left-0 w-6 h-6 -translate-x-3 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold">5</span>
                      </div>
                      <h3 className="text-lg font-semibold">Conditions et restrictions</h3>
                      <p className="text-white/80 mt-1">
                        Vous pouvez spécifier des conditions pour les jobs. Par exemple, le job deploy peut être
                        configuré pour s'exécuter uniquement sur la branche main. Cela permet de contrôler finement
                        quand et comment chaque job doit être exécuté.
                      </p>
                      <div className="mt-3 bg-black/30 p-3 rounded-md border border-white/10">
                        <code className="text-xs text-white/90 block whitespace-pre overflow-x-auto">
                          {`deploy-job:
  stage: deploy
  script:
    - npm run deploy
  only:
    - main  # Ce job ne s'exécute que sur la branche main`}
                        </code>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-primary/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Avantages de l'utilisation de GitLab CI/CD</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2 flex items-center">
                        <Zap className="mr-2 h-5 w-5 text-yellow-400" />
                        Automatisation
                      </h3>
                      <p className="text-sm text-white/70">
                        Plus besoin d'exécuter manuellement les commandes pour construire, tester et déployer votre
                        site. Le processus est entièrement automatisé, ce qui permet de gagner un temps précieux.
                      </p>
                    </div>

                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2 flex items-center">
                        <Shield className="mr-2 h-5 w-5 text-green-400" />
                        Consistance
                      </h3>
                      <p className="text-sm text-white/70">
                        Les mêmes étapes sont suivies à chaque déploiement, réduisant ainsi les risques d'erreurs
                        humaines. Chaque déploiement est identique, ce qui garantit la fiabilité du processus.
                      </p>
                    </div>

                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2 flex items-center">
                        <RefreshCw className="mr-2 h-5 w-5 text-blue-400" />
                        Intégration continue
                      </h3>
                      <p className="text-sm text-white/70">
                        Chaque modification est immédiatement testée et déployée, assurant une livraison continue et
                        rapide des mises à jour. Cela permet de détecter et de corriger rapidement les problèmes.
                      </p>
                    </div>

                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2 flex items-center">
                        <GitMerge className="mr-2 h-5 w-5 text-purple-400" />
                        Collaboration
                      </h3>
                      <p className="text-sm text-white/70">
                        Le fichier .gitlab-ci.yml peut être partagé avec l'équipe, permettant à tous les membres de
                        suivre le même processus CI/CD. Cela facilite la collaboration et standardise les pratiques.
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
                      <h3 className="font-semibold text-primary mb-2">Configuration de pipelines CI/CD</h3>
                      <p className="text-sm text-white/70">
                        Maîtrise de la création et configuration de pipelines d'intégration et de déploiement continus
                      </p>
                    </div>
                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2">Scripting YAML</h3>
                      <p className="text-sm text-white/70">
                        Création et modification de fichiers de configuration YAML pour définir les workflows
                        d'automatisation
                      </p>
                    </div>
                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2">Gestion des environnements</h3>
                      <p className="text-sm text-white/70">
                        Configuration des variables d'environnement et gestion des secrets dans un contexte CI/CD
                      </p>
                    </div>
                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2">Pratiques DevOps</h3>
                      <p className="text-sm text-white/70">
                        Application des principes DevOps pour améliorer l'efficacité du développement et du déploiement
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-primary/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Conclusion</h2>
                  <p className="text-white/80 mb-4">
                    L'utilisation de GitLab CI/CD pour l'automatisation de mon site Docusaurus m'a permis de gagner en
                    efficacité et en qualité dans le déploiement de mes mises à jour. Cette expérience m'a non seulement
                    fait économiser un temps précieux, mais m'a également permis d'approfondir mes compétences en
                    DevOps.
                  </p>
                  <p className="text-white/80">
                    Les connaissances acquises lors de ce projet sont directement applicables à d'autres projets de
                    développement et constituent une base solide pour des pratiques d'automatisation plus avancées. La
                    maîtrise des outils CI/CD comme GitLab est devenue essentielle dans le domaine du développement
                    logiciel moderne, et ce projet m'a permis de renforcer cette compétence clé pour ma carrière en
                    DevOps.
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
