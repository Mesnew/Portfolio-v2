# 🚀 Portfolio Spatial - Lilyan Giraud

Un portfolio interactif et immersif avec un thème spatial, développé avec Next.js et Three.js.

## 📋 Table des matières

- [Aperçu](#aperçu)
- [Fonctionnalités](#fonctionnalités)
- [Technologies utilisées](#technologies-utilisées)
- [Structure du projet](#structure-du-projet)
- [Installation](#installation)
- [Déploiement](#déploiement)
- [Projets inclus](#projets-inclus)
- [Auteur](#auteur)

## 🌟 Aperçu

Ce portfolio présente un univers spatial interactif où chaque section est représentée par une planète du système solaire. Les visiteurs peuvent naviguer dans cet environnement 3D pour découvrir mes compétences, réalisations et projets.

### 🎯 Objectifs du projet
- Créer une expérience utilisateur unique et mémorable
- Démontrer mes compétences en développement web moderne
- Présenter mes projets de manière interactive
- Offrir des outils pratiques dans le laboratoire

## ✨ Fonctionnalités

### 🏠 Page d'accueil
- **Système solaire 3D interactif** avec navigation planétaire
- **Animation d'introduction** avec effet de chargement
- **Navigation intuitive** vers les différentes sections

### 👨‍💻 À propos
- **Présentation personnelle** avec parcours détaillé
- **Compétences techniques** organisées par catégories
- **Timeline interactive** du parcours professionnel
- **CV téléchargeable** et tableau de synthèse
- **Animations au scroll** pour une expérience fluide

### 🛠️ Réalisations
- **Galerie de projets** avec filtres et recherche
- **Modales détaillées** pour chaque projet
- **Technologies utilisées** et défis relevés
- **Liens vers démos** et code source
- **Animations de cartes** au survol

### 🧪 Laboratoire
- **Dé 3D interactif** avec physique réaliste
- **Canvas de dessin** avec outils avancés
- **Calculateur de hash** (SHA-256, SHA-1, Base64)
- **Analyseur de texte** avec métriques NLP
- **Générateur QR Code** personnalisable
- **Outils utilitaires** (générateur aléatoire, horloge mondiale)

### 📚 Veille technologique
- **Articles techniques** et tendances
- **Ressources utiles** pour développeurs
- **Analyses de technologies** émergentes

### 📞 Contact
- **Formulaire de contact** fonctionnel
- **Carte interactive** avec localisation
- **Informations de contact** complètes

## 🛠️ Technologies utilisées

### Frontend
- **Next.js 15** - Framework React avec App Router
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS utilitaire
- **Three.js** - Rendu 3D et animations
- **React Three Fiber** - Intégration React/Three.js
- **Framer Motion** - Animations fluides

### UI/UX
- **shadcn/ui** - Composants UI modernes
- **Lucide React** - Icônes vectorielles
- **Radix UI** - Composants accessibles
- **React Hook Form** - Gestion de formulaires

### Outils de développement
- **ESLint** - Linting du code
- **Prettier** - Formatage automatique
- **PostCSS** - Traitement CSS

### Déploiement
- **Vercel** - Hébergement et déploiement
- **PM2** - Gestionnaire de processus
- **Nginx** - Serveur web et proxy inverse
- **SSL/TLS** - Certificats de sécurité

## 📁 Structure du projet

\`\`\`
portfolio/
├── app/                          # Pages Next.js (App Router)
│   ├── page.tsx                 # Page d'accueil avec système solaire
│   ├── a-propos/                # Page à propos
│   ├── realisations/            # Galerie de projets
│   ├── laboratoire/             # Outils interactifs
│   ├── veille/                  # Veille technologique
│   ├── contact/                 # Page de contact
│   └── layout.tsx               # Layout principal
├── components/                   # Composants réutilisables
│   ├── ui/                      # Composants UI (shadcn)
│   ├── 3d/                      # Composants Three.js
│   ├── forms/                   # Composants de formulaires
│   └── layout/                  # Composants de mise en page
├── lib/                         # Utilitaires et helpers
├── public/                      # Assets statiques
├── styles/                      # Styles globaux
└── scripts/                     # Scripts de déploiement
\`\`\`

## 🚀 Installation

### Prérequis
- Node.js 18+
- npm ou yarn
- Git

### Installation locale

1. **Cloner le repository**
   \`\`\`bash
   git clone https://github.com/votre-username/portfolio-spatial.git
   cd portfolio-spatial
   \`\`\`

2. **Installer les dépendances**
   \`\`\`bash
   npm install
# ou
yarn install
\`\`\`

3. **Lancer en mode développement**
   \`\`\`bash
   npm run dev
# ou
yarn dev
\`\`\`

4. **Ouvrir dans le navigateur**
   \`\`\`
   http://localhost:3000
   \`\`\`

### Variables d'environnement

Créer un fichier \`.env.local\` :
\`\`\`env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_CONTACT_EMAIL=votre-email@example.com
\`\`\`

## 🌐 Déploiement

### Déploiement automatique (Vercel)
1. Connecter le repository à Vercel
2. Configurer les variables d'environnement
3. Déploiement automatique à chaque push

### Déploiement manuel (VPS)
\`\`\`bash
# Build de production
npm run build

# Démarrage avec PM2
pm2 start ecosystem.config.js

# Configuration Nginx
sudo cp nginx.conf /etc/nginx/sites-available/portfolio
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo systemctl reload nginx
\`\`\`

## 📊 Projets inclus

### 🌤️ Site Météo (meteo.mesnew.fr)
- **API Météo-France** intégrée
- **Interface moderne** avec graphiques
- **Recherche par ville** et géolocalisation
- **Données en temps réel**

### 💼 Projets professionnels
- **Configuration AWS** - Infrastructure cloud
- **Déploiement CI/CD** - Automatisation GitLab
- **Base de données** - PostgreSQL et Docker
- **API Swagger** - Documentation interactive
- **GLPI** - Système de ticketing
- **Applications C#** - Calculatrice et gestion bancaire

## 📈 Performances

- **Lighthouse Score** : 95+ sur tous les critères
- **Core Web Vitals** optimisés
- **SEO** optimisé avec métadonnées
- **Accessibilité** WCAG 2.1 AA
- **Progressive Web App** ready

## 🔧 Scripts disponibles

\`\`\`bash
npm run dev          # Développement
npm run build        # Build de production  
npm run start        # Démarrage production
npm run lint         # Vérification du code
npm run type-check   # Vérification TypeScript
\`\`\`

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créer une branche feature (\`git checkout -b feature/AmazingFeature\`)
3. Commit les changements (\`git commit -m 'Add AmazingFeature'\`)
4. Push vers la branche (\`git push origin feature/AmazingFeature\`)
5. Ouvrir une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier \`LICENSE\` pour plus de détails.

## 👨‍💻 Auteur

**Lilyan Giraud**
- 🎓 BTS SIO option SLAM (2023-2025)
- 🏢 Apprenti DevOps chez Nicomatic
- 📧 Email : lilyangiraud@gmail.com
- 🌐 Portfolio : [portfolio.mesnew.fr](https://portfolio.mesnew.fr)
- 🌤️ Projet météo : [meteo.mesnew.fr](https://meteo.mesnew.fr)

## 🙏 Remerciements

- **Nicomatic** pour l'opportunité d'apprentissage
- **Saint Michel Annecy** pour la formation BTS SIO
- **Communauté open source** pour les outils utilisés
- **Three.js** pour les possibilités 3D incroyables

---

⭐ **N'hésitez pas à mettre une étoile si ce projet vous plaît !**

*Dernière mise à jour : Janvier 2025*
