"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useAppSelector } from "@/lib/hooks"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Menu, Search, Globe } from "lucide-react"
import { useTranslations, useLocale } from "next-intl"
import { usePathname, useRouter } from "next/navigation"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
  const { itemCount } = useAppSelector((state) => state.cart)
  const t = useTranslations("header")
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const langRef = useRef<HTMLDivElement | null>(null)

  const switchLocale = (nextLocale: string) => {
    // Remove current locale prefix from the pathname and push with the new one
    const rest = (pathname || "/").replace(/^\/(en|tr)(?=\/|$)/, "") || "/"
    router.push(`/${nextLocale}${rest === "/" ? "" : rest}`)
    setIsOpen(false)
    setLangOpen(false)
  }

  // Close language menu on outside click
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!langRef.current) return
      if (!langRef.current.contains(e.target as Node)) setLangOpen(false)
    }
    document.addEventListener("mousedown", onDocClick)
    return () => document.removeEventListener("mousedown", onDocClick)
  }, [])

  const navigation = [
    { name: t("home"), href: `/${locale}` },
    { name: t("products"), href: `/${locale}/products` },
    { name: t("categories"), href: `/${locale}/categories` },
    { name: t("about"), href: `/${locale}/about` },
    { name: t("contact"), href: `/${locale}/contact` },
  ]

  return (
  <header className="sticky top-0 z-[9999] isolate w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pointer-events-auto">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">E</span>
            </div>
            <span className="font-heading text-xl font-bold">ModernShop</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Search className="h-5 w-5" />
            </Button>

            {/* Language Switcher (custom popover) */}
            <div ref={langRef} className="relative">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Language"
                className="relative z-[70]"
                onClick={() => setLangOpen((v) => !v)}
              >
                <Globe className="h-5 w-5" />
              </Button>
              {langOpen && (
                <div className="absolute right-0 mt-2 z-[10000] min-w-[10rem] rounded-md border bg-popover p-1 text-popover-foreground shadow-md">
                  <button
                    className="w-full rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent hover:text-accent-foreground"
                    onClick={() => switchLocale("en")}
                  >
                    🇺🇸 English
                  </button>
                  <button
                    className="w-full rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent hover:text-accent-foreground"
                    onClick={() => switchLocale("tr")}
                  >
                    🇹🇷 Türkçe
                  </button>
                </div>
              )}
            </div>

            {/* Cart */}
            <Link href={`/${locale}/cart`}>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
