"use client"

import type React from "react"

import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, X, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export type ProjectDetail = {
  id: number
  title: string
  description: string
  fullDescription?: string
  challenges?: string[]
  solutions?: string[]
  features?: string[]
  image: string
  logo: string
  screenshots?: string[]
  tags: string[]
  color: string
  demoUrl?: string
  githubUrl?: string
  year?: string
}

interface ProjectDetailModalProps {
  project: ProjectDetail | null
  isOpen: boolean
  onClose: () => void
  onViewDetails?: (url: string) => void
}

export function ProjectDetailModal({ project, isOpen, onClose, onViewDetails }: ProjectDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!project) return null

  const screenshots = project.screenshots || []
  const hasMultipleImages = screenshots.length > 0

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % (screenshots.length + 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? screenshots.length : prev - 1))
  }

  const currentImage = currentImageIndex === 0 ? project.image : screenshots[currentImageIndex - 1]

  const handleDetailsClick = (e: React.MouseEvent, url: string) => {
    if (url.startsWith("/") && onViewDetails) {
      e.preventDefault()
      onViewDetails(url)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl w-[90vw] max-h-[90vh] overflow-y-auto bg-black/80 backdrop-blur-lg border-primary/20 text-white p-0">
        <div className="sticky top-0 z-10 flex justify-end p-2 bg-gradient-to-b from-black/80 to-transparent">
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/10">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Image Section */}
          <div className="relative overflow-hidden rounded-lg aspect-video bg-black/50 group">
            <Image src={currentImage || "/placeholder.svg"} alt={project.title} fill className="object-cover" />

            {hasMultipleImages && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                  {[project.image, ...screenshots].map((_, idx) => (
                    <div
                      key={idx}
                      className={`w-2 h-2 rounded-full ${idx === currentImageIndex ? "bg-white" : "bg-white/30"}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Content Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <Image
                  src={project.logo || "/placeholder.svg"}
                  alt={`${project.title} logo`}
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <DialogTitle className="text-2xl font-bold">{project.title}</DialogTitle>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="bg-white/10 border-white/20 text-white">
                  {tag}
                </Badge>
              ))}
              {project.year && (
                <Badge variant="outline" className="bg-white/20 border-white/30 text-white">
                  {project.year}
                </Badge>
              )}
            </div>

            <DialogDescription className="text-white/80">
              {project.fullDescription || project.description}
            </DialogDescription>

            {(project.challenges?.length || project.features?.length) && (
              <div className="space-y-4 mt-6">
                {project.features?.length && (
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Fonctionnalités</h4>
                    <ul className="list-disc pl-5 space-y-1 text-white/80">
                      {project.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.challenges?.length && (
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Défis & Solutions</h4>
                    <ul className="list-disc pl-5 space-y-1 text-white/80">
                      {project.challenges.map((challenge, index) => (
                        <li key={index}>
                          {challenge}
                          {project.solutions?.[index] && (
                            <span className="block text-primary/80 mt-1">Solution: {project.solutions[index]}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-4 pt-4">
              {project.demoUrl && (
                <Button
                  variant="default"
                  className="group"
                  onClick={(e) => project.demoUrl && handleDetailsClick(e, project.demoUrl)}
                >
                  {project.demoUrl.startsWith("/") ? (
                    <Link href={project.demoUrl}>
                      <span className="flex items-center">
                        <ArrowUpRight className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        Voir les détails
                      </span>
                    </Link>
                  ) : (
                    <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                      <span className="flex items-center">
                        <ExternalLink className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        {project.title === "Site web professionnel" ? "Voir les détails" : "Voir la démo"}
                      </span>
                    </Link>
                  )}
                </Button>
              )}

              {project.githubUrl && (
                <Button asChild variant="outline" className="group">
                  <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                    Voir le code
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
