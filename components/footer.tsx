import Link from "next/link"
import { FileText, BarChart2, Github, Linkedin, GitBranch, Lock, BookOpen, Mail } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative py-16 border-t mt-auto w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-500/30 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-purple-500/30 blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-cyan-500/30 blur-3xl"></div>
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Documents */}
          <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10 shadow-xl">
            <h3 className="text-xl font-bold mb-6 flex items-center text-white">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/20 mr-3">
                <FileText className="h-5 w-5 text-blue-400" />
              </span>
              Documents
            </h3>
            <ul className="space-y-4 pl-4">
              <li>
                <Link
                  href="/cv.pdf"
                  className="group text-white/80 hover:text-white transition-colors flex items-center"
                >
                  <div className="relative">
                    <div className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 w-2 h-2 rounded-full bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <FileText className="mr-3 h-5 w-5 text-blue-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="group-hover:translate-x-1 transition-transform">Télécharger mon CV</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/excel.xlsx"
                  className="group text-white/80 hover:text-white transition-colors flex items-center"
                >
                  <div className="relative">
                    <div className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 w-2 h-2 rounded-full bg-green-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <BarChart2 className="mr-3 h-5 w-5 text-green-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="group-hover:translate-x-1 transition-transform">Télécharger mon Excel</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Me contacter */}
          <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10 shadow-xl">
            <h3 className="text-xl font-bold mb-6 flex items-center text-white">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-500/20 mr-3">
                <Mail className="h-5 w-5 text-purple-400" />
              </span>
              Me contacter
            </h3>
            <ul className="space-y-4 pl-4">
              <li>
                <Link
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group text-white/80 hover:text-white transition-colors flex items-center"
                >
                  <div className="relative">
                    <div className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 w-2 h-2 rounded-full bg-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <Github className="mr-3 h-5 w-5 text-gray-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="group-hover:translate-x-1 transition-transform">GitHub</span>
                </Link>
              </li>
              <li>
                <Link
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group text-white/80 hover:text-white transition-colors flex items-center"
                >
                  <div className="relative">
                    <div className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 w-2 h-2 rounded-full bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <Linkedin className="mr-3 h-5 w-5 text-blue-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="group-hover:translate-x-1 transition-transform">LinkedIn</span>
                </Link>
              </li>
              <li>
                <Link
                  href="https://gitlab.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group text-white/80 hover:text-white transition-colors flex items-center"
                >
                  <div className="relative">
                    <div className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 w-2 h-2 rounded-full bg-orange-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <GitBranch className="mr-3 h-5 w-5 text-orange-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="group-hover:translate-x-1 transition-transform">GitLab</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Autres */}
          <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10 shadow-xl">
            <h3 className="text-xl font-bold mb-6 flex items-center text-white">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-500/20 mr-3">
                <Lock className="h-5 w-5 text-amber-400" />
              </span>
              Autres
            </h3>
            <ul className="space-y-4 pl-4">
              <li>
                <Link
                  href="/projet-secret"
                  className="group text-white/80 hover:text-white transition-colors flex items-center"
                >
                  <div className="relative">
                    <div className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 w-2 h-2 rounded-full bg-red-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <Lock className="mr-3 h-5 w-5 text-red-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="group-hover:translate-x-1 transition-transform">Projet secret</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/ressources"
                  className="group text-white/80 hover:text-white transition-colors flex items-center"
                >
                  <div className="relative">
                    <div className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <BookOpen className="mr-3 h-5 w-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="group-hover:translate-x-1 transition-transform">Mes ressources</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-white/10 text-center">
          <div className="inline-block px-6 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
            <p className="text-white/70">© {currentYear} Lilyan Giraud</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
