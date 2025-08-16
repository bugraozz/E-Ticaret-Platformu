"use client"

import { useEffect } from "react"
import { useLocale, useTranslations } from "next-intl"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { fetchCategories } from "@/lib/features/products/productsSlice"

const categoryImages = {
  "men's clothing": "/categories/mens-clothing.svg",
  "women's clothing": "/categories/womens-clothing.svg",
  jewelery: "/categories/jewelery.svg",
  electronics: "/categories/electronics.svg",
} as const

export function CategoriesSection() {
  const dispatch = useAppDispatch()
  const { categories } = useAppSelector((state) => (state as any).products)
  const locale = useLocale()
  const t = useTranslations("home")
  const tc = useTranslations("categories")

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories())
    }
  }, [dispatch, categories.length])

  const displayCategories = categories.filter((cat: string) => cat !== "all")

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold mb-4">{t("shopByCategory")}</h2>
          <p className="text-muted-foreground">{t("shopByCategorySubtitle")}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayCategories.map((category: string) => (
            <Link key={category} href={`/${locale}/products?category=${encodeURIComponent(category)}`}>
              <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-0">
                  <div className="aspect-[4/3] overflow-hidden bg-card">
                    <img
                      src={
                        categoryImages[category as keyof typeof categoryImages] ||
                        "/categories/electronics.svg"
                      }
                      alt={category}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="font-heading text-lg font-semibold capitalize group-hover:text-primary transition-colors">
                      {tc(
                        category === "men's clothing"
                          ? "mensClothing"
                          : category === "women's clothing"
                          ? "womensClothing"
                          : (category as "electronics" | "jewelery")
                      )}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
