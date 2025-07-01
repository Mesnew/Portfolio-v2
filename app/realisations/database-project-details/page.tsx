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
  Database,
  Terminal,
  Code,
  Workflow,
  DockIcon as Docker,
  HardDrive,
  RefreshCw,
  Settings,
} from "lucide-react"
import Link from "next/link"

export default function DatabaseProjectDetailsPage() {
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
                <div className="relative h-48 w-full bg-gradient-to-br from-blue-500/20 to-cyan-600/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Database className="h-24 w-24 text-blue-500/70" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <Docker className="h-6 w-6 text-blue-600" />
                    </div>
                    <h1 className="text-xl font-bold text-white">Dockerisation de Bases de Données</h1>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-2 mb-6">
                    <Badge variant="outline" className="bg-primary/20 border-primary/30 text-primary-foreground">
                      2023
                    </Badge>
                    <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                      Docker
                    </Badge>
                    <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                      SQL Server
                    </Badge>
                    <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                      Automatisation
                    </Badge>
                    <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                      Shell
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Docker className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium text-white">Environnement</h3>
                        <p className="text-sm text-white/70">Docker, MS SQL Server, Linux, DBeaver</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <FileCode className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium text-white">Technologies</h3>
                        <p className="text-sm text-white/70">Dockerfile, Shell scripting, SQL, Docker Compose</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Database className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium text-white">Bases de données</h3>
                        <p className="text-sm text-white/70">
                          MS SQL Server, Restauration de fichiers .bak, Gestion des volumes
                        </p>
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
                        Configuration rapide et homogène de l'environnement de développement
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-white/80">
                        Automatisation complète de la restauration des bases de données
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-white/80">
                        Portabilité de l'environnement entre différentes machines
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-white/80">Simplification du déploiement en production</span>
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
                      Ce projet avait pour objectif d'automatiser la configuration et la gestion d'une base de données
                      MS SQL Server à l'aide de Docker. J'ai travaillé sur la mise en place d'une solution dockerisée
                      intégrant des scripts pour importer automatiquement des fichiers de sauvegarde .bak à partir d'un
                      script restore_db.sh.
                    </p>
                    <p>
                      Cette approche permet de créer rapidement un environnement de développement complet avec des bases
                      de données pré-configurées, facilitant ainsi le travail des développeurs et assurant une cohérence
                      entre les différents environnements. La solution développée permet également de simplifier le
                      déploiement en production.
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
                        <Docker className="h-5 w-5 mr-2 text-primary" />
                        Configuration de l'image Docker
                      </h3>
                      <p className="text-white/80 mb-3">
                        Personnaliser l'image MS SQL Server pour inclure tous les outils nécessaires et configurer
                        correctement l'environnement pour la restauration des bases de données.
                      </p>
                      <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                        <h4 className="text-primary font-medium mb-2">Solution mise en œuvre</h4>
                        <p className="text-sm text-white/70">
                          J'ai créé un Dockerfile personnalisé basé sur l'image officielle de MS SQL Server, en ajoutant
                          les outils nécessaires comme sqlcmd. J'ai également configuré les variables d'environnement
                          requises pour l'initialisation du serveur SQL et défini les permissions appropriées pour les
                          fichiers et répertoires.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <HardDrive className="h-5 w-5 mr-2 text-primary" />
                        Gestion des volumes et persistance des données
                      </h3>
                      <p className="text-white/80 mb-3">
                        Assurer la persistance des données même après la suppression des conteneurs et gérer
                        efficacement les volumes Docker.
                      </p>
                      <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                        <h4 className="text-primary font-medium mb-2">Solution mise en œuvre</h4>
                        <p className="text-sm text-white/70">
                          J'ai configuré des volumes Docker pour stocker les fichiers de base de données (.mdf et .ldf)
                          en dehors du conteneur. Cela permet de conserver les données même si le conteneur est supprimé
                          ou recréé. J'ai également mis en place une stratégie de sauvegarde automatique pour sécuriser
                          davantage les données.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <Terminal className="h-5 w-5 mr-2 text-primary" />
                        Automatisation de la restauration des bases
                      </h3>
                      <p className="text-white/80 mb-3">
                        Créer un script qui restaure automatiquement les bases de données à partir des fichiers .bak
                        lors du démarrage du conteneur.
                      </p>
                      <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                        <h4 className="text-primary font-medium mb-2">Solution mise en œuvre</h4>
                        <p className="text-sm text-white/70">
                          J'ai développé un script shell (restore_db.sh) qui s'exécute au démarrage du conteneur. Ce
                          script vérifie d'abord si les bases de données existent déjà, puis utilise sqlcmd pour
                          exécuter les commandes T-SQL nécessaires à la restauration des fichiers .bak. Le script gère
                          également les erreurs et fournit des logs détaillés pour faciliter le débogage.
                        </p>
                        <div className="mt-3 bg-black/30 p-3 rounded-md border border-white/10">
                          <code className="text-xs text-white/90 block whitespace-pre overflow-x-auto">
                            {`#!/bin/bash
# Script pour restaurer automatiquement les bases de données
# à partir des fichiers .bak

# Attendre que SQL Server soit prêt
sleep 30s

# Vérifier si les bases existent déjà
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P $SA_PASSWORD -Q "SELECT name FROM sys.databases" | grep -q "WS_TEST"
if [ $? -ne 0 ]; then
  echo "Restauration de la base WS_TEST..."
  /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P $SA_PASSWORD -Q "RESTORE DATABASE WS_TEST FROM DISK = '/var/opt/mssql/backup/ws_test.bak' WITH MOVE 'WS_TEST' TO '/var/opt/mssql/data/ws_test.mdf', MOVE 'WS_TEST_log' TO '/var/opt/mssql/data/ws_test_log.ldf'"
  echo "Base WS_TEST restaurée avec succès."
fi

# Répéter pour WS_PROD
...`}
                          </code>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-primary/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Étapes principales du projet</h2>
                  <div className="space-y-4">
                    <div className="relative pl-8 pb-8 border-l border-white/20 last:border-0">
                      <div className="absolute top-0 left-0 w-6 h-6 -translate-x-3 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold">1</span>
                      </div>
                      <h3 className="text-lg font-semibold">Création du Dockerfile</h3>
                      <p className="text-white/80 mt-1">
                        J'ai commencé par créer un Dockerfile personnalisé basé sur l'image officielle de MS SQL Server.
                        J'ai ajouté les outils nécessaires comme sqlcmd et configuré les variables d'environnement
                        requises. J'ai également préparé le conteneur pour recevoir les fichiers .bak et les scripts de
                        restauration.
                      </p>
                      <div className="mt-3 bg-black/30 p-3 rounded-md border border-white/10">
                        <code className="text-xs text-white/90 block whitespace-pre overflow-x-auto">
                          {`FROM mcr.microsoft.com/mssql/server:2019-latest

# Créer les répertoires nécessaires
RUN mkdir -p /var/opt/mssql/backup

# Copier les fichiers de sauvegarde et les scripts
COPY ./backup/*.bak /var/opt/mssql/backup/
COPY ./scripts/restore_db.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/restore_db.sh

# Définir les variables d'environnement
ENV ACCEPT_EULA=Y
ENV MSSQL_PID=Developer

# Exposer le port SQL Server
EXPOSE 1433

# Exécuter le script de restauration après le démarrage de SQL Server
CMD /bin/bash -c "/opt/mssql/bin/sqlservr & /usr/local/bin/restore_db.sh"`}
                        </code>
                      </div>
                    </div>

                    <div className="relative pl-8 pb-8 border-l border-white/20 last:border-0">
                      <div className="absolute top-0 left-0 w-6 h-6 -translate-x-3 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold">2</span>
                      </div>
                      <h3 className="text-lg font-semibold">Configuration des volumes Docker</h3>
                      <p className="text-white/80 mt-1">
                        J'ai configuré des volumes Docker pour persister les données des bases de données. Cela permet
                        de conserver les données même après la suppression des conteneurs. J'ai défini les volumes dans
                        un fichier docker-compose.yml pour faciliter le déploiement.
                      </p>
                      <div className="mt-3 bg-black/30 p-3 rounded-md border border-white/10">
                        <code className="text-xs text-white/90 block whitespace-pre overflow-x-auto">
                          {`version: '3.8'
services:
  sqlserver:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "1433:1433"
    environment:
      - SA_PASSWORD=YourStrongPassword123!
      - ACCEPT_EULA=Y
    volumes:
      - sqlserver-data:/var/opt/mssql/data
      - sqlserver-log:/var/opt/mssql/log
      - sqlserver-backup:/var/opt/mssql/backup
    restart: unless-stopped

volumes:
  sqlserver-data:
  sqlserver-log:
  sqlserver-backup:`}
                        </code>
                      </div>
                    </div>

                    <div className="relative pl-8 pb-8 border-l border-white/20 last:border-0">
                      <div className="absolute top-0 left-0 w-6 h-6 -translate-x-3 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold">3</span>
                      </div>
                      <h3 className="text-lg font-semibold">Développement du script de restauration</h3>
                      <p className="text-white/80 mt-1">
                        J'ai créé un script shell (restore_db.sh) pour automatiser la restauration des bases de données
                        WS_TEST et WS_PROD à partir des fichiers .bak. Le script vérifie d'abord si les bases existent
                        déjà pour éviter les restaurations inutiles.
                      </p>
                    </div>

                    <div className="relative pl-8 pb-8 border-l border-white/20 last:border-0">
                      <div className="absolute top-0 left-0 w-6 h-6 -translate-x-3 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold">4</span>
                      </div>
                      <h3 className="text-lg font-semibold">Construction et déploiement</h3>
                      <p className="text-white/80 mt-1">
                        J'ai construit l'image Docker et déployé le conteneur en utilisant docker-compose. Cette
                        approche permet de gérer facilement l'ensemble de la configuration et de démarrer rapidement
                        l'environnement complet.
                      </p>
                      <div className="mt-3 bg-black/30 p-3 rounded-md border border-white/10">
                        <code className="text-xs text-white/90 block whitespace-pre overflow-x-auto">
                          {`# Construction et démarrage des conteneurs
docker-compose up -d --build

# Vérification des logs pour s'assurer que la restauration s'est bien déroulée
docker-compose logs -f`}
                        </code>
                      </div>
                    </div>

                    <div className="relative pl-8 border-l-0">
                      <div className="absolute top-0 left-0 w-6 h-6 -translate-x-3 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold">5</span>
                      </div>
                      <h3 className="text-lg font-semibold">Tests et validation</h3>
                      <p className="text-white/80 mt-1">
                        J'ai testé la solution en vérifiant que les bases de données étaient correctement restaurées et
                        accessibles. J'ai utilisé DBeaver pour me connecter aux bases et exécuter des requêtes SQL pour
                        valider leur fonctionnement.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-primary/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Avantages de la dockerisation des bases de données</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2 flex items-center">
                        <Settings className="mr-2 h-5 w-5 text-blue-400" />
                        Configuration homogène
                      </h3>
                      <p className="text-sm text-white/70">
                        Tous les développeurs travaillent avec exactement la même configuration de base de données, ce
                        qui élimine les problèmes liés aux différences d'environnement.
                      </p>
                    </div>

                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2 flex items-center">
                        <Workflow className="mr-2 h-5 w-5 text-green-400" />
                        Automatisation complète
                      </h3>
                      <p className="text-sm text-white/70">
                        Le processus de configuration et de restauration des bases de données est entièrement
                        automatisé, ce qui réduit les erreurs humaines et accélère la mise en place des environnements.
                      </p>
                    </div>

                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2 flex items-center">
                        <Code className="mr-2 h-5 w-5 text-purple-400" />
                        Infrastructure as Code
                      </h3>
                      <p className="text-sm text-white/70">
                        La configuration de la base de données est définie dans des fichiers (Dockerfile,
                        docker-compose.yml), ce qui permet de la versionner et de la gérer comme du code.
                      </p>
                    </div>

                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2 flex items-center">
                        <RefreshCw className="mr-2 h-5 w-5 text-orange-400" />
                        Isolation et portabilité
                      </h3>
                      <p className="text-sm text-white/70">
                        Les bases de données sont isolées dans des conteneurs, ce qui facilite leur déploiement sur
                        différentes machines et environnements sans conflits avec d'autres applications.
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
                      <h3 className="font-semibold text-primary mb-2">Docker et conteneurisation</h3>
                      <p className="text-sm text-white/70">
                        Création d'images Docker personnalisées, gestion des volumes et configuration des conteneurs
                        pour des applications spécifiques
                      </p>
                    </div>
                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2">Administration SQL Server</h3>
                      <p className="text-sm text-white/70">
                        Configuration de SQL Server, restauration de bases de données et gestion des fichiers de
                        sauvegarde
                      </p>
                    </div>
                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2">Shell scripting</h3>
                      <p className="text-sm text-white/70">
                        Développement de scripts shell pour automatiser des tâches complexes et gérer les erreurs
                      </p>
                    </div>
                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2">DevOps et automatisation</h3>
                      <p className="text-sm text-white/70">
                        Mise en place de processus automatisés pour simplifier le déploiement et la gestion des
                        environnements
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-primary/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Conclusion</h2>
                  <p className="text-white/80 mb-4">
                    La dockerisation des bases de données MS SQL Server a permis de créer une solution robuste et
                    automatisée pour la gestion des environnements de développement. Grâce à cette approche, la
                    configuration des bases de données est devenue plus rapide, plus fiable et plus cohérente entre les
                    différents environnements.
                  </p>
                  <p className="text-white/80">
                    Ce projet m'a permis d'approfondir mes connaissances en Docker, en administration SQL Server et en
                    scripting, tout en développant des compétences précieuses en DevOps et en automatisation. La
                    solution mise en place est maintenant utilisée par l'équipe de développement, ce qui a
                    considérablement amélioré leur productivité et réduit les problèmes liés aux différences
                    d'environnement.
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

