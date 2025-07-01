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
  Database,
  Code,
  Shield,
  Clock,
  Ticket,
  Settings,
  HelpCircle,
} from "lucide-react"
import Link from "next/link"

export default function GlpiProjectDetailsPage() {
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
                <div className="relative h-48 w-full bg-gradient-to-br from-purple-500/20 to-indigo-600/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Ticket className="h-24 w-24 text-purple-500/70" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <HelpCircle className="h-6 w-6 text-purple-600" />
                    </div>
                    <h1 className="text-xl font-bold text-white">Installation de GLPI</h1>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-2 mb-6">
                    <Badge variant="outline" className="bg-primary/20 border-primary/30 text-primary-foreground">
                      2022
                    </Badge>
                    <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                      Ticketing
                    </Badge>
                    <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                      Linux
                    </Badge>
                    <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                      Debian
                    </Badge>
                    <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                      SSH
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Server className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium text-white">Environnement</h3>
                        <p className="text-sm text-white/70">VM Debian, SSH, Ligne de commande Linux</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <FileCode className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium text-white">Technologies</h3>
                        <p className="text-sm text-white/70">GLPI, PHP, MySQL, Apache</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium text-white">Objectifs</h3>
                        <p className="text-sm text-white/70">
                          Modernisation de l'interface, renforcement de la sécurité
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
                        Interface modernisée et plus intuitive pour les utilisateurs
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-white/80">Sécurité renforcée du système de ticketing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-white/80">
                        Meilleure gestion des incidents et demandes informatiques
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-white/80">Suivi plus efficace des actifs informatiques</span>
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
                      Lors de mon premier stage chez Nicomatic, j'ai été chargé d'installer une nouvelle version de GLPI
                      (Gestionnaire Libre de Parc Informatique) pour moderniser l'interface existante et renforcer la
                      sécurité du système de ticketing de l'entreprise. GLPI est une solution open source de gestion de
                      parc informatique et de service d'assistance qui permet de gérer l'inventaire des actifs
                      informatiques et de traiter les demandes d'assistance des utilisateurs.
                    </p>
                    <p>
                      Ce projet nécessitait une VM Debian, un logiciel pour se connecter via SSH (Secure Shell) et des
                      connaissances de l'environnement Linux en ligne de commande. L'objectif était de mettre en place
                      une solution robuste et sécurisée qui répondrait aux besoins de l'entreprise en matière de gestion
                      des incidents et de suivi des actifs informatiques.
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
                        <Server className="h-5 w-5 mr-2 text-primary" />
                        Configuration de l'environnement serveur
                      </h3>
                      <p className="text-white/80 mb-3">
                        Préparer et configurer correctement l'environnement serveur Debian pour accueillir GLPI, en
                        s'assurant que toutes les dépendances nécessaires sont installées et configurées.
                      </p>
                      <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                        <h4 className="text-primary font-medium mb-2">Solution mise en œuvre</h4>
                        <p className="text-sm text-white/70">
                          J'ai installé et configuré les packages nécessaires (Apache, PHP, MySQL) sur la VM Debian.
                          J'ai veillé à ce que les versions des packages soient compatibles avec la version de GLPI à
                          installer. J'ai également configuré les paramètres de sécurité de base pour le serveur web et
                          la base de données.
                        </p>
                        <div className="mt-3 bg-black/30 p-3 rounded-md border border-white/10">
                          <code className="text-xs text-white/90 block whitespace-pre overflow-x-auto">
                            {`# Installation des dépendances
sudo apt update
sudo apt install apache2 php php-mysql php-curl php-gd php-intl php-pear php-imagick php-imap php-memcache php-pspell php-tidy php-xmlrpc php-mbstring php-ldap php-zip php-bz2 php-xml mariadb-server

# Configuration de MySQL
sudo mysql_secure_installation

# Création de la base de données pour GLPI
sudo mysql -u root -p
CREATE DATABASE glpidb;
CREATE USER 'glpiuser'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON glpidb.* TO 'glpiuser'@'localhost';
FLUSH PRIVILEGES;
EXIT;`}
                          </code>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <Code className="h-5 w-5 mr-2 text-primary" />
                        Installation et configuration de GLPI
                      </h3>
                      <p className="text-white/80 mb-3">
                        Télécharger, installer et configurer correctement GLPI pour qu'il fonctionne avec
                        l'environnement serveur préparé, en s'assurant que toutes les fonctionnalités sont
                        opérationnelles.
                      </p>
                      <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                        <h4 className="text-primary font-medium mb-2">Solution mise en œuvre</h4>
                        <p className="text-sm text-white/70">
                          J'ai téléchargé la dernière version stable de GLPI depuis le site officiel. J'ai extrait les
                          fichiers dans le répertoire du serveur web et configuré les permissions appropriées. J'ai
                          ensuite suivi l'assistant d'installation web pour configurer la connexion à la base de données
                          et les paramètres initiaux.
                        </p>
                        <div className="mt-3 bg-black/30 p-3 rounded-md border border-white/10">
                          <code className="text-xs text-white/90 block whitespace-pre overflow-x-auto">
                            {`# Téléchargement de GLPI
cd /tmp
wget https://github.com/glpi-project/glpi/releases/download/10.0.0/glpi-10.0.0.tgz

# Extraction des fichiers
tar -xzvf glpi-10.0.0.tgz

# Déplacement des fichiers vers le répertoire du serveur web
sudo mv glpi /var/www/html/

# Configuration des permissions
sudo chown -R www-data:www-data /var/www/html/glpi
sudo chmod -R 755 /var/www/html/glpi

# Création du fichier de configuration Apache pour GLPI
sudo nano /etc/apache2/sites-available/glpi.conf

# Activation du site et redémarrage d'Apache
sudo a2ensite glpi.conf
sudo systemctl restart apache2`}
                          </code>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <Shield className="h-5 w-5 mr-2 text-primary" />
                        Sécurisation de l'installation
                      </h3>
                      <p className="text-white/80 mb-3">
                        Mettre en place des mesures de sécurité pour protéger l'installation de GLPI contre les accès
                        non autorisés et les vulnérabilités potentielles.
                      </p>
                      <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                        <h4 className="text-primary font-medium mb-2">Solution mise en œuvre</h4>
                        <p className="text-sm text-white/70">
                          J'ai configuré un pare-feu avec UFW pour limiter l'accès au serveur. J'ai mis en place HTTPS
                          avec Let's Encrypt pour sécuriser les communications. J'ai également configuré des politiques
                          de mot de passe strictes et supprimé le répertoire d'installation après la configuration
                          initiale.
                        </p>
                        <div className="mt-3 bg-black/30 p-3 rounded-md border border-white/10">
                          <code className="text-xs text-white/90 block whitespace-pre overflow-x-auto">
                            {`# Installation et configuration du pare-feu UFW
sudo apt install ufw
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable

# Installation de Let's Encrypt pour HTTPS
sudo apt install certbot python3-certbot-apache
sudo certbot --apache -d glpi.example.com

# Suppression du répertoire d'installation
sudo rm -rf /var/www/html/glpi/install

# Configuration des permissions après installation
sudo find /var/www/html/glpi -type d -exec chmod 755 {} \\;
sudo find /var/www/html/glpi -type f -exec chmod 644 {} \\;`}
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
                      <h3 className="text-lg font-semibold">Préparation de l'environnement</h3>
                      <p className="text-white/80 mt-1">
                        J'ai commencé par préparer la VM Debian qui allait héberger GLPI. Cela impliquait la mise à jour
                        du système, l'installation des packages nécessaires (Apache, PHP, MySQL) et la configuration
                        initiale du serveur web et de la base de données.
                      </p>
                      <div className="mt-3 bg-black/30 p-3 rounded-md border border-white/10">
                        <code className="text-xs text-white/90 block whitespace-pre overflow-x-auto">
                          {`# Mise à jour du système
sudo apt update
sudo apt upgrade

# Installation des packages nécessaires
sudo apt install apache2 php php-mysql php-curl php-gd php-intl php-pear php-imagick php-imap php-memcache php-pspell php-tidy php-xmlrpc php-mbstring php-ldap php-zip php-bz2 php-xml mariadb-server`}
                        </code>
                      </div>
                    </div>

                    <div className="relative pl-8 pb-8 border-l border-white/20 last:border-0">
                      <div className="absolute top-0 left-0 w-6 h-6 -translate-x-3 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold">2</span>
                      </div>
                      <h3 className="text-lg font-semibold">Configuration de la base de données</h3>
                      <p className="text-white/80 mt-1">
                        J'ai configuré la base de données MySQL qui allait stocker les données de GLPI. Cela comprenait
                        la création d'une base de données dédiée, d'un utilisateur avec les privilèges appropriés et la
                        sécurisation de l'installation MySQL.
                      </p>
                      <div className="mt-3 bg-black/30 p-3 rounded-md border border-white/10">
                        <code className="text-xs text-white/90 block whitespace-pre overflow-x-auto">
                          {`# Sécurisation de l'installation MySQL
sudo mysql_secure_installation

# Création de la base de données et de l'utilisateur
sudo mysql -u root -p
CREATE DATABASE glpidb;
CREATE USER 'glpiuser'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON glpidb.* TO 'glpiuser'@'localhost';
FLUSH PRIVILEGES;
EXIT;`}
                        </code>
                      </div>
                    </div>

                    <div className="relative pl-8 pb-8 border-l border-white/20 last:border-0">
                      <div className="absolute top-0 left-0 w-6 h-6 -translate-x-3 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold">3</span>
                      </div>
                      <h3 className="text-lg font-semibold">Installation de GLPI</h3>
                      <p className="text-white/80 mt-1">
                        J'ai téléchargé la dernière version stable de GLPI depuis le site officiel, extrait les fichiers
                        dans le répertoire du serveur web et configuré les permissions appropriées pour que le serveur
                        web puisse accéder aux fichiers.
                      </p>
                      <div className="mt-3 bg-black/30 p-3 rounded-md border border-white/10">
                        <code className="text-xs text-white/90 block whitespace-pre overflow-x-auto">
                          {`# Téléchargement de GLPI
cd /tmp
wget https://github.com/glpi-project/glpi/releases/download/10.0.0/glpi-10.0.0.tgz

# Extraction des fichiers
tar -xzvf glpi-10.0.0.tgz

# Déplacement des fichiers vers le répertoire du serveur web
sudo mv glpi /var/www/html/

# Configuration des permissions
sudo chown -R www-data:www-data /var/www/html/glpi
sudo chmod -R 755 /var/www/html/glpi`}
                        </code>
                      </div>
                    </div>

                    <div className="relative pl-8 pb-8 border-l border-white/20 last:border-0">
                      <div className="absolute top-0 left-0 w-6 h-6 -translate-x-3 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold">4</span>
                      </div>
                      <h3 className="text-lg font-semibold">Configuration de GLPI</h3>
                      <p className="text-white/80 mt-1">
                        J'ai accédé à l'interface web d'installation de GLPI et suivi l'assistant pour configurer la
                        connexion à la base de données, créer le compte administrateur et définir les paramètres
                        initiaux du système.
                      </p>
                      <p className="text-white/80 mt-1">
                        Cette étape comprenait également la configuration des paramètres de l'application, tels que les
                        notifications par e-mail, les règles d'inventaire et les droits d'accès des utilisateurs.
                      </p>
                    </div>

                    <div className="relative pl-8 border-l-0">
                      <div className="absolute top-0 left-0 w-6 h-6 -translate-x-3 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold">5</span>
                      </div>
                      <h3 className="text-lg font-semibold">Sécurisation et finalisation</h3>
                      <p className="text-white/80 mt-1">
                        J'ai mis en place des mesures de sécurité pour protéger l'installation de GLPI, notamment la
                        configuration d'un pare-feu, la mise en place de HTTPS avec Let's Encrypt, la configuration de
                        politiques de mot de passe strictes et la suppression du répertoire d'installation.
                      </p>
                      <p className="text-white/80 mt-1">
                        J'ai également effectué des tests pour vérifier que toutes les fonctionnalités de GLPI
                        fonctionnaient correctement et que le système était prêt à être utilisé par les équipes
                        informatiques de Nicomatic.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-primary/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Glossaire des commandes Linux utilisées</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-white/20">
                          <th className="py-2 px-4 text-left text-white font-semibold">Commande</th>
                          <th className="py-2 px-4 text-left text-white font-semibold">Explication</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-white/10">
                          <td className="py-2 px-4 text-white/90 font-mono text-sm">cd</td>
                          <td className="py-2 px-4 text-white/70">
                            Change le répertoire courant dans l'arborescence des fichiers de l'utilisateur.
                          </td>
                        </tr>
                        <tr className="border-b border-white/10">
                          <td className="py-2 px-4 text-white/90 font-mono text-sm">mkdir</td>
                          <td className="py-2 px-4 text-white/70">
                            Crée un nouveau répertoire (dossier) à l'emplacement spécifié.
                          </td>
                        </tr>
                        <tr className="border-b border-white/10">
                          <td className="py-2 px-4 text-white/90 font-mono text-sm">rm (-r)</td>
                          <td className="py-2 px-4 text-white/70">
                            Supprime un fichier (rm) ou un répertoire et son contenu de manière récursive (rm -r).
                          </td>
                        </tr>
                        <tr className="border-b border-white/10">
                          <td className="py-2 px-4 text-white/90 font-mono text-sm">wget</td>
                          <td className="py-2 px-4 text-white/70">
                            Télécharge des fichiers depuis le web à l'adresse URL spécifiée.
                          </td>
                        </tr>
                        <tr className="border-b border-white/10">
                          <td className="py-2 px-4 text-white/90 font-mono text-sm">mv</td>
                          <td className="py-2 px-4 text-white/70">Déplace ou renomme des fichiers ou répertoires.</td>
                        </tr>
                        <tr className="border-b border-white/10">
                          <td className="py-2 px-4 text-white/90 font-mono text-sm">tar -xzvf</td>
                          <td className="py-2 px-4 text-white/70">
                            Extrait un fichier tarball (-x) compressé avec gzip (-z), en affichant le détail du
                            processus (-v), à partir du fichier spécifié (-f).
                          </td>
                        </tr>
                        <tr className="border-b border-white/10">
                          <td className="py-2 px-4 text-white/90 font-mono text-sm">sudo</td>
                          <td className="py-2 px-4 text-white/70">
                            Exécute une commande avec les privilèges de superutilisateur (root).
                          </td>
                        </tr>
                        <tr className="border-b border-white/10">
                          <td className="py-2 px-4 text-white/90 font-mono text-sm">sudo su</td>
                          <td className="py-2 px-4 text-white/70">
                            Change l'utilisateur courant pour le superutilisateur (root), en utilisant sudo pour obtenir
                            les permissions nécessaires.
                          </td>
                        </tr>
                        <tr className="border-b border-white/10">
                          <td className="py-2 px-4 text-white/90 font-mono text-sm">nano</td>
                          <td className="py-2 px-4 text-white/70">
                            Ouvre l'éditeur de texte Nano dans le terminal pour créer ou modifier des fichiers de texte.
                          </td>
                        </tr>
                        <tr className="border-b border-white/10">
                          <td className="py-2 px-4 text-white/90 font-mono text-sm">ls (-l)</td>
                          <td className="py-2 px-4 text-white/70">
                            Liste les fichiers et répertoires dans le répertoire courant (ls), avec l'option -l
                            affichant les détails en format long (permissions, propriétaire, taille et date de dernière
                            modification).
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-primary/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Avantages de GLPI pour la gestion informatique</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2 flex items-center">
                        <Ticket className="mr-2 h-5 w-5 text-purple-400" />
                        Gestion des tickets
                      </h3>
                      <p className="text-sm text-white/70">
                        GLPI offre un système complet de gestion des tickets qui permet de suivre les demandes
                        d'assistance, d'attribuer des tâches aux techniciens et de suivre la résolution des problèmes.
                      </p>
                    </div>

                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2 flex items-center">
                        <Database className="mr-2 h-5 w-5 text-blue-400" />
                        Inventaire des actifs
                      </h3>
                      <p className="text-sm text-white/70">
                        GLPI permet de gérer l'inventaire complet des actifs informatiques, y compris les ordinateurs,
                        les périphériques, les logiciels et les licences, facilitant ainsi la gestion du parc
                        informatique.
                      </p>
                    </div>

                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2 flex items-center">
                        <Settings className="mr-2 h-5 w-5 text-green-400" />
                        Gestion des configurations
                      </h3>
                      <p className="text-sm text-white/70">
                        GLPI permet de gérer les configurations des équipements informatiques, facilitant ainsi la
                        maintenance et le dépannage des systèmes. Il permet également de documenter les configurations
                        pour une meilleure traçabilité.
                      </p>
                    </div>

                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2 flex items-center">
                        <Clock className="mr-2 h-5 w-5 text-orange-400" />
                        Gestion des SLA
                      </h3>
                      <p className="text-sm text-white/70">
                        GLPI permet de définir et de suivre des accords de niveau de service (SLA), garantissant ainsi
                        que les incidents sont traités dans les délais convenus et que les priorités sont respectées.
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
                      <h3 className="font-semibold text-primary mb-2">Administration Linux</h3>
                      <p className="text-sm text-white/70">
                        Maîtrise des commandes Linux, gestion des utilisateurs et des permissions, configuration des
                        services système
                      </p>
                    </div>
                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2">Configuration de serveurs web</h3>
                      <p className="text-sm text-white/70">
                        Installation et configuration d'Apache, PHP et MySQL, optimisation des performances,
                        sécurisation des services
                      </p>
                    </div>
                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2">Sécurité informatique</h3>
                      <p className="text-sm text-white/70">
                        Configuration de pare-feu, mise en place de HTTPS, gestion des certificats SSL, sécurisation des
                        accès
                      </p>
                    </div>
                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2">Gestion de projet IT</h3>
                      <p className="text-sm text-white/70">
                        Planification et exécution d'un projet d'installation de logiciel, documentation des procédures,
                        tests et validation
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-primary/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Conclusion</h2>
                  <p className="text-white/80 mb-4">
                    L'installation de GLPI chez Nicomatic a permis de moderniser l'interface du système de ticketing et
                    de renforcer sa sécurité. Ce projet m'a permis d'acquérir une expérience précieuse en administration
                    Linux, en configuration de serveurs web et en sécurité informatique.
                  </p>
                  <p className="text-white/80">
                    Les compétences acquises lors de ce projet sont directement applicables à d'autres projets
                    d'installation et de configuration de logiciels sur des serveurs Linux. La maîtrise des commandes
                    Linux et la compréhension des principes de sécurité informatique sont des atouts précieux pour ma
                    carrière dans le domaine de l'informatique.
                  </p>
                </CardContent>
              </Card>

              <div className="flex justify-center mt-8">
                <Button asChild variant="outline" className="bg-black/30 border-white/20 text-white hover:bg-white/10">
                  <Link href="/realisations" className="bg-black/30 border-white/20 text-white hover:bg-white/10">
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

