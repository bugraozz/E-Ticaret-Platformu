"use client"

"use client"

import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { ArrowRight, ShoppingBag } from "lucide-react"

export function HeroSection() {
  const locale = useLocale()
  const t = useTranslations("home")
  return (
    <section className="relative bg-gradient-to-br from-background via-card to-muted/30 py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="font-heading text-4xl lg:text-6xl font-bold tracking-tight">
              {t("heroTitle1")}
              <span className="block text-primary">{t("heroTitle2")}</span>
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("heroDescription")}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/products`}>
              <Button size="lg" className="text-lg px-8">
                <ShoppingBag className="h-5 w-5 mr-2" />
                {t("shopNow")}
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <Link href={`/${locale}/products`}>
              <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                {t("browseCategories")}
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12">
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-primary">{t("statsProductsCount")}</div>
              <div className="text-sm text-muted-foreground">{t("statsProductsLabel")}</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-primary">{t("statsSupportCount")}</div>
              <div className="text-sm text-muted-foreground">{t("statsSupportLabel")}</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-primary">{t("statsDeliveryCount")}</div>
              <div className="text-sm text-muted-foreground">{t("statsDeliveryLabel")}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
