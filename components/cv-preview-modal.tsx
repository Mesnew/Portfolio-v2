"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { FileDown, ExternalLink } from "lucide-react"
import Link from "next/link"

interface CVPreviewModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CVPreviewModal({ isOpen, onClose }: CVPreviewModalProps) {
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
          <DialogTitle>Mon CV</DialogTitle>
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
              <Link href="/assets/cv.pdf" target="_blank" download>
                <FileDown className="h-4 w-4 mr-1" />
                Télécharger
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/assets/cv.pdf" target="_blank">
                <ExternalLink className="h-4 w-4 mr-1" />
                Ouvrir
              </Link>
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-grow overflow-auto">
          {activeTab === "preview" ? (
            <div className="relative w-full h-[70vh]">
              <iframe src="/assets/cv.pdf" className="w-full h-full border-0" title="Aperçu du CV" />
            </div>
          ) : (
            <div className="p-6 space-y-6 text-sm">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold">Lilyan Giraud</h1>
                <p className="text-muted-foreground">Apprenti en développement full-stack</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold border-b pb-2 mb-3">À propos de moi</h2>
                    <p>
                      Développeur en alternance spécialisé en backend, frontend et DevOps, passionné par l'optimisation
                      des performances et l'automatisation via CI/CD. Je cherche à développer mes compétences techniques
                      et à contribuer à des projets innovants dans des environnements dynamiques.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold border-b pb-2 mb-3">Expérience Professionnelle</h2>

                    <div className="mb-4">
                      <h3 className="font-medium">Alternant Développeur Backend, Frontend & DevOps</h3>
                      <p className="text-muted-foreground">Sept. 2023 - Aujourd'hui | Établissement Saint Michel</p>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Développement et maintenance d'applications web et API</li>
                        <li>Mise en place et gestion des pipelines CI/CD (GitLab CI/CD)</li>
                        <li>Automatisation du déploiement avec Docker et Bash</li>
                        <li>Gestion et maintenance de bases de données PostgreSQL et SQL Server</li>
                        <li>Documentation technique et suivi des bonnes pratiques DevOps</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-medium">Stage Développement Informatique</h3>
                      <p className="text-muted-foreground">Nov. 2022 - Avril 2023 | Nicomatic</p>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Gestion et mise à jour de GLPI et base de données associée</li>
                        <li>Installation d'un environnement de dev Linux</li>
                        <li>Déploiement et intégration d'un agent OCS Inventory</li>
                        <li>Rédaction de documentations techniques détaillées</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold border-b pb-2 mb-3">Contact</h2>
                    <ul className="space-y-2">
                      <li>lilyangiraud@gmail.com</li>
                      <li>07 88 05 79 77</li>
                      <li>219 Avenue du Saleve</li>
                      <li>portfolio.mesnew.fr</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold border-b pb-2 mb-3">Formation</h2>
                    <div className="mb-2">
                      <p className="font-medium">BTS SIO SLAM</p>
                      <p className="text-muted-foreground">Établissement Saint Michel</p>
                      <p className="text-muted-foreground">2023 - 2025</p>
                    </div>
                    <div>
                      <p className="font-medium">Bac Pro SN RISC</p>
                      <p className="text-muted-foreground">Lycée Saint Vincent de Paul</p>
                      <p className="text-muted-foreground">2020 - 2023</p>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold border-b pb-2 mb-3">Compétences</h2>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Backend : C#, Php, Python</li>
                      <li>Frontend : JavaScript, HTML, CSS</li>
                      <li>Bases de données : PostgreSQL, SQL Server</li>
                      <li>CI/CD & DevOps : GitLab CI/CD, Docker, Bash</li>
                      <li>Outils : GitHub, DBeaver, Notion</li>
                      <li>Développement embarqués : Arduino Raspberry</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold border-b pb-2 mb-3">Langues</h2>
                    <ul className="space-y-1">
                      <li>Français (Natif)</li>
                      <li>Anglais (B2)</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold border-b pb-2 mb-3">Soft Skills & Qualités</h2>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Résolution de problèmes</li>
                      <li>Esprit d'équipe</li>
                      <li>Adaptabilité</li>
                      <li>Autonomie</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold border-b pb-2 mb-3">Informations Complémentaires</h2>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Permis B</li>
                      <li>Mobilité – Haute-Savoie</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

