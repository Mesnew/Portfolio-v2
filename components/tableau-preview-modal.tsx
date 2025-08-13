"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { FileDown, ExternalLink } from "lucide-react"
import Link from "next/link"

interface TableauPreviewModalProps {
  isOpen: boolean
  onClose: () => void
}

export function TableauPreviewModal({ isOpen, onClose }: TableauPreviewModalProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "text">("preview")

  // Fermer le modal avec la touche Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl w-[90vw] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>Tableau de synthèse des réalisations professionnelles</DialogTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveTab("preview")}
              className={activeTab === "preview" ? "bg-primary text-primary-foreground" : ""}
            >
              Aperçu
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveTab("text")}
              className={activeTab === "text" ? "bg-primary text-primary-foreground" : ""}
            >
              Version texte
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/assets/tableau.pdf" target="_blank" download>
                <FileDown className="h-4 w-4 mr-1" />
                Télécharger
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/assets/tableau.pdf" target="_blank">
                <ExternalLink className="h-4 w-4 mr-1" />
                Ouvrir
              </Link>
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-grow overflow-auto">
          {activeTab === "preview" ? (
            <div className="relative w-full h-[70vh]">
              <iframe
                src="/assets/tableau.pdf"
                className="w-full h-full border-0"
                title="Aperçu du tableau de synthèse"
              />
            </div>
          ) : (
            <div className="p-6 space-y-6 text-sm">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold">BTS SERVICES INFORMATIQUES AUX ORGANISATIONS SESSION 2024</h1>
                <p className="text-xl mt-2">Tableau de synthèse des réalisations professionnelles</p>
                <div className="mt-4 grid grid-cols-2 gap-4 max-w-2xl mx-auto">
                  <div className="text-left">
                    <p>
                      <strong>NOM et prénom :</strong> GIRAUD Lilyan
                    </p>
                    <p>
                      <strong>Centre de formation :</strong>
                    </p>
                  </div>
                  <div className="text-left">
                    <p>
                      <strong>N° candidat :</strong>
                    </p>
                    <p>
                      <strong>Option :</strong> ☐ SISR ☑ SLAM
                    </p>
                  </div>
                </div>
                <p className="mt-2">
                  <strong>Adresse URL du portfolio :</strong>{" "}
                  <a
                    href="https://portfolio.mesnew.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    https://portfolio.mesnew.fr
                  </a>
                </p>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <div className="bg-primary/10 p-4">
                  <h2 className="text-lg font-bold">Compétences mises en œuvre</h2>
                </div>

                <div className="p-4 space-y-6">
                  <div>
                    <h3 className="font-bold mb-2">Gérer le patrimoine informatique</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Recenser et identifier les ressources numériques</li>
                      <li>Exploiter des référentiels, normes et standards adoptés par le prestataire informatique</li>
                      <li>Mettre en place et vérifier les niveaux d'habilitation associés à un service</li>
                      <li>Vérifier les conditions de la continuité d'un service informatique</li>
                      <li>Gérer des sauvegardes</li>
                      <li>Vérifier le respect des règles d'utilisation des ressources numériques</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-bold mb-2">
                      Répondre aux incidents et aux demandes d'assistance et d'évolution
                    </h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Collecter, suivre et orienter des demandes</li>
                      <li>Traiter des demandes concernant les services réseau et système, applicatifs</li>
                      <li>Traiter des demandes concernant les applications</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-bold mb-2">Développer la présence en ligne de l'organisation</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        Participer à la valorisation de l'image de l'organisation sur les médias numériques en tenant
                        compte du cadre juridique et des enjeux économiques
                      </li>
                      <li>Référencer les services en ligne de l'organisation et mesurer leur visibilité</li>
                      <li>Participer à l'évolution d'un site Web exploitant les données de l'organisation</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-bold mb-2">Travailler en mode projet</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Analyser les objectifs et les modalités d'organisation d'un projet</li>
                      <li>Planifier les activités</li>
                      <li>Évaluer les indicateurs de suivi d'un projet et analyser les écarts</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-bold mb-2">Mettre à disposition des utilisateurs un service informatique</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Réaliser les tests d'intégration et d'acceptation d'un service</li>
                      <li>Déployer un service</li>
                      <li>Accompagner les utilisateurs dans la mise en place d'un service</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-bold mb-2">Organiser son développement professionnel</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Mettre en place son environnement d'apprentissage personnel</li>
                      <li>Mettre en œuvre des outils et stratégies de veille informationnelle</li>
                      <li>Gérer son identité professionnelle</li>
                      <li>Développer son projet professionnel</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden mt-8">
                <div className="bg-primary/10 p-4">
                  <h2 className="text-lg font-bold">Réalisations en cours de formation</h2>
                </div>
                <div className="p-4">
                  <ul className="space-y-2">
                    <li>
                      <strong>Projet Picasso</strong> - création d'un site web{" "}
                      <span className="text-muted-foreground">(mai-24)</span>
                    </li>
                    <li>
                      <strong>Projet HP3L</strong> - site web + hébergement pour l'entreprise HP3L{" "}
                      <span className="text-muted-foreground">(nov-23)</span>
                    </li>
                    <li>
                      <strong>Projet SLAM</strong> - Création Calculatrice en C#{" "}
                      <span className="text-muted-foreground">(janv-24)</span>
                    </li>
                    <li>
                      <strong>Projet SLAM</strong> - Création d'une application de banque en C#{" "}
                      <span className="text-muted-foreground">(févr-24)</span>
                    </li>
                    <li>
                      <strong>Projet SLAM</strong> - Création d'une application météo via une API publique{" "}
                      <span className="text-muted-foreground">(déc-24)</span>
                    </li>
                    <li>
                      <strong>Projet SLAM</strong> - Création d'une application avec une API publique au choix{" "}
                      <span className="text-muted-foreground">(déc-24)</span>
                    </li>
                    <li>
                      <strong>Projet Atelier pro</strong> - Création d'un site web WordPress{" "}
                      <span className="text-muted-foreground">(oct-23)</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <div className="bg-primary/10 p-4">
                  <h2 className="text-lg font-bold">Réalisations en milieu professionnel en cours de première année</h2>
                </div>
                <div className="p-4">
                  <ul className="space-y-2">
                    <li>
                      <strong>Installation + configuation de GLPI</strong>{" "}
                      <span className="text-muted-foreground">(sept-23)</span>
                    </li>
                    <li>
                      <strong>Configuration d'un switch</strong> <span className="text-muted-foreground">(nov-23)</span>
                    </li>
                    <li>
                      <strong>Configuration d'un serveur AWS + hébergement</strong>{" "}
                      <span className="text-muted-foreground">(mai-24)</span>
                    </li>
                    <li>
                      <strong>Versionning avec GitLab</strong> <span className="text-muted-foreground">(juin-24)</span>
                    </li>
                    <li>
                      <strong>Documentations en Markdown via StackEdit</strong>{" "}
                      <span className="text-muted-foreground">(avr-24)</span>
                    </li>
                    <li>
                      <strong>Création d'un site à partir d'un template (Docusaurus)</strong>{" "}
                      <span className="text-muted-foreground">(mai-24)</span>
                    </li>
                    <li>
                      <strong>Création d'une API en js</strong> <span className="text-muted-foreground">(nov-24)</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <div className="bg-primary/10 p-4">
                  <h2 className="text-lg font-bold">Réalisations en milieu professionnel en cours de seconde année</h2>
                </div>
                <div className="p-4">
                  <ul className="space-y-2">
                    <li>
                      <strong>Utilisation avancé de GitLab</strong>{" "}
                      <span className="text-muted-foreground">(oct-24)</span>
                    </li>
                    <li>
                      <strong>Automatisation extraction de données SQL</strong>{" "}
                      <span className="text-muted-foreground">(mars-25)</span>
                    </li>
                    <li>
                      <strong>Création d'API + documentation</strong>{" "}
                      <span className="text-muted-foreground">(nov-24)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
