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
  Code,
  Globe,
  BookOpen,
  Terminal,
  RefreshCw,
  Layers,
} from "lucide-react"
import Link from "next/link"

export default function SwaggerProjectDetailsPage() {
  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden">
      <PlanetBackground3D planetType="uranus" />
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
                <div className="relative h-48 w-full bg-gradient-to-br from-green-500/20 to-teal-600/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Code className="h-24 w-24 text-green-500/70" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <Globe className="h-6 w-6 text-green-600" />
                    </div>
                    <h1 className="text-xl font-bold text-white">API Swagger Documentée</h1>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-2 mb-6">
                    <Badge variant="outline" className="bg-primary/20 border-primary/30 text-primary-foreground">
                      2023
                    </Badge>
                    <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                      API REST
                    </Badge>
                    <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                      Swagger
                    </Badge>
                    <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                      Node.js
                    </Badge>
                    <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                      Docker
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Globe className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium text-white">Environnement</h3>
                        <p className="text-sm text-white/70">Node.js, Express, Docker, MS SQL Server</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <FileCode className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium text-white">Technologies</h3>
                        <p className="text-sm text-white/70">JavaScript, Swagger UI Express, mssql, Postman</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Database className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium text-white">Base de données</h3>
                        <p className="text-sm text-white/70">MS SQL Server, Requêtes SQL, Connexion sécurisée</p>
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
                        Documentation interactive et claire des endpoints de l'API
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-white/80">
                        Simplification de l'utilisation de l'API pour les développeurs
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-white/80">Tests facilités grâce à l'interface Swagger</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-white/80">
                        Maintenance simplifiée de l'API et de sa documentation
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
                      Dans ce projet, j'ai conçu une API REST permettant de récupérer des informations à partir d'une
                      base de données MS SQL Server dockerisée. L'objectif principal était de créer une interface
                      programmatique robuste et bien documentée pour faciliter l'accès aux données pour les
                      développeurs.
                    </p>
                    <p>
                      La documentation a été réalisée avec Swagger pour décrire chaque endpoint de manière claire et
                      précise. Cette approche permet non seulement de documenter l'API, mais aussi de la tester
                      directement via l'interface utilisateur générée par Swagger, ce qui simplifie considérablement le
                      développement et l'intégration.
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
                        Intégration avec MS SQL Server
                      </h3>
                      <p className="text-white/80 mb-3">
                        Établir une connexion fiable et sécurisée entre l'API Node.js et la base de données MS SQL
                        Server dockerisée, tout en gérant efficacement les requêtes et les transactions.
                      </p>
                      <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                        <h4 className="text-primary font-medium mb-2">Solution mise en œuvre</h4>
                        <p className="text-sm text-white/70">
                          J'ai utilisé le package mssql pour Node.js, qui offre une interface robuste pour interagir
                          avec MS SQL Server. J'ai mis en place un pool de connexions pour optimiser les performances et
                          configuré des paramètres de sécurité appropriés. J'ai également créé des fonctions
                          d'abstraction pour simplifier l'exécution des requêtes SQL et la gestion des erreurs.
                        </p>
                        <div className="mt-3 bg-black/30 p-3 rounded-md border border-white/10">
                          <code className="text-xs text-white/90 block whitespace-pre overflow-x-auto">
                            {`// Configuration du pool de connexions SQL
const pool = new sql.ConnectionPool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
});

// Fonction d'abstraction pour exécuter des requêtes
async function executeQuery(query, params = []) {
  try {
    const poolConnection = await pool.connect();
    const result = await poolConnection.request()
      .input('param1', sql.VarChar, params[0])
      .query(query);
    poolConnection.release();
    return result.recordset;
  } catch (err) {
    console.error('SQL error', err);
    throw new Error('Database query failed');
  }
}`}
                          </code>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <BookOpen className="h-5 w-5 mr-2 text-primary" />
                        Documentation Swagger complète
                      </h3>
                      <p className="text-white/80 mb-3">
                        Créer une documentation Swagger complète et précise pour tous les endpoints de l'API, avec des
                        exemples de requêtes et de réponses pour chaque cas d'utilisation.
                      </p>
                      <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                        <h4 className="text-primary font-medium mb-2">Solution mise en œuvre</h4>
                        <p className="text-sm text-white/70">
                          J'ai utilisé swagger-jsdoc pour générer la documentation à partir de commentaires JSDoc dans
                          le code, et swagger-ui-express pour créer l'interface utilisateur interactive. J'ai documenté
                          chaque endpoint avec des descriptions détaillées, des paramètres, des exemples de requêtes et
                          de réponses, ainsi que des codes d'erreur possibles.
                        </p>
                        <div className="mt-3 bg-black/30 p-3 rounded-md border border-white/10">
                          <code className="text-xs text-white/90 block whitespace-pre overflow-x-auto">
                            {`/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Récupère la liste des utilisateurs
 *     description: Retourne une liste paginée de tous les utilisateurs
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Numéro de page pour la pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Nombre d'éléments par page
 *     responses:
 *       200:
 *         description: Liste des utilisateurs récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                 total:
 *                   type: integer
 *       500:
 *         description: Erreur serveur
 */
router.get('/users', async (req, res) => {
  // Implémentation de la route
});`}
                          </code>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <Terminal className="h-5 w-5 mr-2 text-primary" />
                        Déploiement dans un conteneur Docker
                      </h3>
                      <p className="text-white/80 mb-3">
                        Configurer l'API pour qu'elle fonctionne correctement dans un environnement Docker, en
                        s'assurant qu'elle puisse communiquer avec la base de données MS SQL Server également
                        conteneurisée.
                      </p>
                      <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                        <h4 className="text-primary font-medium mb-2">Solution mise en œuvre</h4>
                        <p className="text-sm text-white/70">
                          J'ai créé un Dockerfile optimisé pour l'API Node.js, en utilisant une image de base légère
                          (node:14-alpine) et en configurant les variables d'environnement nécessaires. J'ai également
                          mis en place un fichier docker-compose.yml pour orchestrer l'API et la base de données, en
                          définissant les réseaux appropriés pour permettre la communication entre les conteneurs.
                        </p>
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
                      <h3 className="text-lg font-semibold">Configuration de l'API</h3>
                      <p className="text-white/80 mt-1">
                        J'ai commencé par mettre en place l'architecture de base de l'API avec Node.js et Express. J'ai
                        créé les routes et les contrôleurs nécessaires pour gérer les différentes fonctionnalités, en
                        suivant les principes REST. J'ai également configuré la connexion à la base de données MS SQL
                        Server à l'aide du package mssql.
                      </p>
                      <div className="mt-3 bg-black/30 p-3 rounded-md border border-white/10">
                        <code className="text-xs text-white/90 block whitespace-pre overflow-x-auto">
                          {`// Structure du projet
├── src/
│   ├── controllers/
│   │   ├── userController.js
│   │   ├── productController.js
│   │   └── orderController.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── productRoutes.js
│   │   └── orderRoutes.js
│   ├── models/
│   │   ├── userModel.js
│   │   ├── productModel.js
│   │   └── orderModel.js
│   ├── config/
│   │   ├── database.js
│   │   └── swagger.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   └── app.js
├── package.json
└── Dockerfile`}
                        </code>
                      </div>
                    </div>

                    <div className="relative pl-8 pb-8 border-l border-white/20 last:border-0">
                      <div className="absolute top-0 left-0 w-6 h-6 -translate-x-3 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold">2</span>
                      </div>
                      <h3 className="text-lg font-semibold">Implémentation des endpoints</h3>
                      <p className="text-white/80 mt-1">
                        J'ai développé les différents endpoints de l'API pour permettre la récupération, la création, la
                        modification et la suppression des données. J'ai mis en place une validation des entrées pour
                        garantir l'intégrité des données et une gestion appropriée des erreurs pour améliorer
                        l'expérience des développeurs.
                      </p>
                      <div className="mt-3 bg-black/30 p-3 rounded-md border border-white/10">
                        <code className="text-xs text-white/90 block whitespace-pre overflow-x-auto">
                          {`// Exemple d'un contrôleur pour les utilisateurs
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validation de l'ID
    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({ 
        error: 'ID utilisateur invalide' 
      });
    }
    
    // Récupération de l'utilisateur depuis la base de données
    const user = await userModel.findById(id);
    
    if (!user) {
      return res.status(404).json({ 
        error: 'Utilisateur non trouvé' 
      });
    }
    
    return res.status(200).json(user);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur:', error);
    return res.status(500).json({ 
      error: 'Erreur serveur lors de la récupération de l\'utilisateur' 
    });
  }
};`}
                        </code>
                      </div>
                    </div>

                    <div className="relative pl-8 pb-8 border-l border-white/20 last:border-0">
                      <div className="absolute top-0 left-0 w-6 h-6 -translate-x-3 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold">3</span>
                      </div>
                      <h3 className="text-lg font-semibold">Documentation avec Swagger</h3>
                      <p className="text-white/80 mt-1">
                        J'ai intégré Swagger à l'API en utilisant swagger-jsdoc et swagger-ui-express. J'ai documenté
                        chaque endpoint avec des commentaires JSDoc détaillés, incluant des descriptions, des
                        paramètres, des exemples de requêtes et de réponses, ainsi que des codes d'erreur possibles.
                      </p>
                      <div className="mt-3 bg-black/30 p-3 rounded-md border border-white/10">
                        <code className="text-xs text-white/90 block whitespace-pre overflow-x-auto">
                          {`// Configuration de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Documentation de l\'API REST',
      contact: {
        name: 'Lilyan Giraud',
        email: 'contact@example.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Serveur de développement'
      }
    ]
  },
  apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));`}
                        </code>
                      </div>
                    </div>

                    <div className="relative pl-8 pb-8 border-l border-white/20 last:border-0">
                      <div className="absolute top-0 left-0 w-6 h-6 -translate-x-3 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold">4</span>
                      </div>
                      <h3 className="text-lg font-semibold">Conteneurisation avec Docker</h3>
                      <p className="text-white/80 mt-1">
                        J'ai créé un Dockerfile pour l'API et configuré un fichier docker-compose.yml pour orchestrer
                        l'API et la base de données MS SQL Server. J'ai défini les réseaux appropriés pour permettre la
                        communication entre les conteneurs et configuré les variables d'environnement nécessaires.
                      </p>
                    </div>

                    <div className="relative pl-8 border-l-0">
                      <div className="absolute top-0 left-0 w-6 h-6 -translate-x-3 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold">5</span>
                      </div>
                      <h3 className="text-lg font-semibold">Tests et validation</h3>
                      <p className="text-white/80 mt-1">
                        J'ai testé l'API en utilisant Postman pour vérifier le bon fonctionnement de chaque endpoint.
                        J'ai également utilisé l'interface Swagger générée pour tester l'API directement depuis la
                        documentation. J'ai validé que toutes les fonctionnalités répondaient aux exigences et que la
                        documentation était claire et précise.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-primary/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Avantages de Swagger pour la documentation d'API</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2 flex items-center">
                        <BookOpen className="mr-2 h-5 w-5 text-green-400" />
                        Documentation interactive
                      </h3>
                      <p className="text-sm text-white/70">
                        Swagger génère une interface utilisateur interactive qui permet aux développeurs de comprendre
                        facilement l'API et de tester directement les endpoints sans outils supplémentaires.
                      </p>
                    </div>

                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2 flex items-center">
                        <Code className="mr-2 h-5 w-5 text-blue-400" />
                        Génération de code client
                      </h3>
                      <p className="text-sm text-white/70">
                        À partir de la spécification Swagger, il est possible de générer automatiquement du code client
                        dans différents langages, ce qui facilite l'intégration de l'API dans diverses applications.
                      </p>
                    </div>

                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2 flex items-center">
                        <Layers className="mr-2 h-5 w-5 text-purple-400" />
                        Standardisation
                      </h3>
                      <p className="text-sm text-white/70">
                        Swagger utilise la spécification OpenAPI, un standard de l'industrie pour la documentation des
                        API REST, ce qui garantit une documentation cohérente et compréhensible par tous.
                      </p>
                    </div>

                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2 flex items-center">
                        <RefreshCw className="mr-2 h-5 w-5 text-orange-400" />
                        Maintenance simplifiée
                      </h3>
                      <p className="text-sm text-white/70">
                        La documentation est générée à partir de commentaires dans le code, ce qui facilite sa
                        maintenance et garantit qu'elle reste synchronisée avec l'implémentation de l'API.
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
                      <h3 className="font-semibold text-primary mb-2">Développement d'API REST</h3>
                      <p className="text-sm text-white/70">
                        Conception et implémentation d'API RESTful suivant les bonnes pratiques et les standards de
                        l'industrie
                      </p>
                    </div>
                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2">Documentation avec Swagger</h3>
                      <p className="text-sm text-white/70">
                        Utilisation de swagger-jsdoc et swagger-ui-express pour créer une documentation interactive et
                        complète
                      </p>
                    </div>
                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2">Intégration de bases de données</h3>
                      <p className="text-sm text-white/70">
                        Configuration et utilisation de MS SQL Server avec Node.js, gestion des connexions et des
                        requêtes
                      </p>
                    </div>
                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h3 className="font-semibold text-primary mb-2">Conteneurisation avec Docker</h3>
                      <p className="text-sm text-white/70">
                        Création de conteneurs Docker pour des applications Node.js et des bases de données,
                        orchestration avec docker-compose
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-primary/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Conclusion</h2>
                  <p className="text-white/80 mb-4">
                    La création d'une API REST documentée avec Swagger a permis de mettre en place une interface
                    programmatique robuste et facile à utiliser pour accéder aux données stockées dans une base de
                    données MS SQL Server. La documentation interactive générée par Swagger facilite grandement la
                    compréhension et l'utilisation de l'API par les développeurs.
                  </p>
                  <p className="text-white/80">
                    Ce projet m'a permis d'approfondir mes compétences en développement backend, en gestion de bases de
                    données et en documentation d'API. J'ai également acquis une expérience précieuse dans la
                    conteneurisation d'applications avec Docker, ce qui est essentiel pour le déploiement moderne
                    d'applications. Les connaissances et compétences acquises lors de ce projet sont directement
                    applicables à d'autres projets de développement d'API et contribuent à ma croissance en tant que
                    développeur.
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

