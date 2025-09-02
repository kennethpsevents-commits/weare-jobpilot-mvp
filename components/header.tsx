"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { useTranslations } from "next-intl"
import { LanguageSwitcher } from "./language-switcher"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const t = useTranslations("navigation")

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
            JP
          </div>
          <span className="text-xl font-bold text-foreground">JobPilot</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            {t("home")}
          </Link>
          <Link href="/vacatures" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            {t("jobs")}
          </Link>
          <Link
            href="/ai-matching"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            {t("aiMatching")}
          </Link>
          <Link href="/werkgevers" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            {t("forEmployers")}
          </Link>
          <Link href="/over-ons" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            {t("aboutUs")}
          </Link>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center space-x-4">
          <LanguageSwitcher />
          <Button variant="outline" size="sm">
            {t("login")}
          </Button>
          <Button size="sm">{t("postJob")}</Button>
        </div>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container mx-auto px-4 py-4 space-y-4">
            <Link href="/" className="block text-sm font-medium text-foreground hover:text-primary">
              {t("home")}
            </Link>
            <Link href="/vacatures" className="block text-sm font-medium text-foreground hover:text-primary">
              {t("jobs")}
            </Link>
            <Link href="/ai-matching" className="block text-sm font-medium text-foreground hover:text-primary">
              {t("aiMatching")}
            </Link>
            <Link href="/werkgevers" className="block text-sm font-medium text-foreground hover:text-primary">
              {t("forEmployers")}
            </Link>
            <Link href="/over-ons" className="block text-sm font-medium text-foreground hover:text-primary">
              {t("aboutUs")}
            </Link>
            <div className="pt-4 space-y-2">
              <LanguageSwitcher />
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                {t("login")}
              </Button>
              <Button size="sm" className="w-full">
                {t("postJob")}
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
