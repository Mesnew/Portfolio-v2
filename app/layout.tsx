// app/layout.tsx
import type { Metadata } from "next/types"
import { Inter } from "next/font/google"
import "./globals.css"
import { SpaceNavIndicator } from "@/components/space-nav-indicator"
import { CosmicCursor } from "@/components/cosmic-cursor"
import React, { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Mon Portfolio",
    description: "Portfolio professionnel avec mes projets et mon parcours",
    generator: "v0.dev",
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="fr" className="dark">
        <head>
            {/* Matomo – tracking script */}
            <script
                dangerouslySetInnerHTML={{
                    __html: `
              var _paq = window._paq = window._paq || [];
              _paq.push(['trackPageView']);
              _paq.push(['enableLinkTracking']);
              (function() {
                var u = "https://analytics.mesnew.fr/";
                _paq.push(['setTrackerUrl', u + 'matomo.php']);
                _paq.push(['setSiteId', '1']); // <-- remplace par ton siteId si différent
                var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
                g.async = true; g.src = u + 'matomo.js'; s.parentNode.insertBefore(g, s);
              })();
            `,
                }}
            />
        </head>
        <body className={inter.className}>
        <Suspense fallback={null}>
            <React.Fragment>{children}</React.Fragment>
            <SpaceNavIndicator />
            <CosmicCursor />
        </Suspense>
        </body>
        </html>
    )
}
