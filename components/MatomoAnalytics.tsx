"use client"

import { useEffect } from "react"
import Script from "next/script"

interface MatomoAnalyticsProps {
    url?: string
    siteId?: string
}

export function MatomoAnalytics({
                                    url = process.env.NEXT_PUBLIC_MATOMO_URL,
                                    siteId = process.env.NEXT_PUBLIC_MATOMO_SITE_ID,
                                }: MatomoAnalyticsProps) {
    useEffect(() => {
        if (!url || !siteId) {
            console.warn("[Matomo] URL ou Site ID manquant dans les variables d'environnement")
            return
        }

        // Initialize Matomo tracking
        window._paq = window._paq || []
        window._paq.push(["trackPageView"])
        window._paq.push(["enableLinkTracking"])
        window._paq.push(["setTrackerUrl", `${url}/analytics.php`])
        window._paq.push(["setSiteId", siteId])

        // Track page changes for SPA
        const handleRouteChange = () => {
            window._paq?.push(["setCustomUrl", window.location.href])
            window._paq?.push(["trackPageView"])
        }

        // Listen for navigation changes
        window.addEventListener("popstate", handleRouteChange)

        return () => {
            window.removeEventListener("popstate", handleRouteChange)
        }
    }, [url, siteId])

    if (!url || !siteId) {
        return null
    }

    return (
        <Script
            id="matomo-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
                __html: `
          var _paq = window._paq = window._paq || [];
          _paq.push(['trackPageView']);
          _paq.push(['enableLinkTracking']);
          (function() {
            var u="${url}/";
            _paq.push(['setTrackerUrl', u+'analytics.php']);
            _paq.push(['setSiteId', '${siteId}']);
            var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
            g.async=true; g.src=u+'stats.js'; s.parentNode.insertBefore(g,s);
          })();
        `,
            }}
        />
    )
}

// Extend Window interface for TypeScript
declare global {
    interface Window {
        _paq?: any[]
    }
}
