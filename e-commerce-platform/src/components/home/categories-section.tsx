"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { fetchCategories } from "@/lib/features/products/productsSlice"

const categoryImages = {
  "men's clothing": "/mens-fashion.png",
  "women's clothing": "/womens-fashion.png",
  jewelery: "/luxury-jewelry.png",
  electronics: "/modern-electronics.png",
}

export function CategoriesSection() {
  const dispatch = useAppDispatch()
  const { categories } = useAppSelector((state) => (state as any).products)

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
          <h2 className="font-heading text-3xl font-bold mb-4">Shop by Category</h2>
          <p className="text-muted-foreground">Find exactly what you're looking for</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayCategories.map((category: string) => (
            <Link key={category} href={`/products?category=${encodeURIComponent(category)}`}>
              <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-0">
                  <div className="aspect-[4/3] overflow-hidden bg-card">
                    <img
                      src={
                        categoryImages[category as keyof typeof categoryImages] ||
                        "/placeholder.svg?height=200&width=300&query=category"
                      }
                      alt={category}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="font-heading text-lg font-semibold capitalize group-hover:text-primary transition-colors">
                      {category}
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
