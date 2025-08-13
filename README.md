# Portfolio Website

Un portfolio moderne développé avec Next.js 15, TypeScript et Tailwind CSS.

## 🚀 Technologies utilisées

- **Next.js 15** - Framework React avec App Router
- **TypeScript** - Typage statique pour JavaScript
- **Tailwind CSS** - Framework CSS utilitaire
- **Framer Motion** - Animations et transitions
- **Lucide React** - Icônes modernes
- **Radix UI** - Composants UI accessibles

## 🛠️ Installation et développement

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Installation
\`\`\`bash
# Cloner le repository
git clone <votre-repo-url>
cd portfolio-website

# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev
\`\`\`

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

## 📦 Scripts disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Construit l'application pour la production
- `npm run start` - Lance l'application en mode production
- `npm run lint` - Vérifie le code avec ESLint
- `npm run type-check` - Vérifie les types TypeScript

## 🚀 Déploiement

### Sur un VPS avec PM2 et Caddy

1. **Cloner le projet sur le serveur :**
\`\`\`bash
git clone <votre-repo-url> /var/www/portfolio
cd /var/www/portfolio
\`\`\`

2. **Installer les dépendances :**
\`\`\`bash
npm ci --production=false
\`\`\`

3. **Construire l'application :**
\`\`\`bash
npm run build
\`\`\`

4. **Démarrer avec PM2 :**
\`\`\`bash
pm2 start npm --name "portfolio" -- start
pm2 save
\`\`\`

5. **Configuration Caddy :**
\`\`\`
portfolio.mesnew.fr {
    reverse_proxy localhost:3000
}
\`\`\`

## 📁 Structure du projet

\`\`\`
├── app/                    # Pages et layouts (App Router)
│   ├── a-propos/          # Page À propos
│   ├── contact/           # Page Contact
│   ├── cv/                # Page CV
│   ├── realisations/      # Page Réalisations
│   └── layout.tsx         # Layout principal
├── components/            # Composants réutilisables
│   ├── ui/               # Composants UI de base
│   └── ...               # Composants spécifiques
├── lib/                  # Utilitaires et helpers
├── public/               # Assets statiques
└── styles/               # Styles globaux
\`\`\`

## 🎨 Fonctionnalités

- ✅ Design responsive
- ✅ Animations fluides
- ✅ Thème sombre/clair
- ✅ Optimisation SEO
- ✅ Composants 3D interactifs
- ✅ Formulaire de contact
- ✅ Prévisualisation CV/Tableau
- ✅ Navigation fluide

## 📧 Contact

Pour toute question concernant ce projet, n'hésitez pas à me contacter via le formulaire sur le site.
\`\`\`

Créons un script de déploiement pour le serveur :
