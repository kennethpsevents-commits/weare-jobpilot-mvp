import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { NextIntlClientProvider } from "next-intl"
import { getLocale, getMessages } from "next-intl/server"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "JobPilot - Vind je droomjob met AI",
  description:
    "JobPilot is de slimste job aggregator van Nederland. Vind vacatures die perfect bij je passen met onze AI-powered matching technologie.",
  generator: "JobPilot",
  keywords: ["vacatures", "jobs", "werk", "carrière", "AI matching", "Nederland"],
  authors: [{ name: "JobPilot Team" }],
  openGraph: {
    title: "JobPilot - Vind je droomjob met AI",
    description: "De slimste job aggregator van Nederland met AI-powered matching",
    url: "https://www.wearejobpilot.com",
    siteName: "JobPilot",
    type: "website",
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body className={`${inter.variable} font-sans antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <Suspense fallback={null}>{children}</Suspense>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  )
}
