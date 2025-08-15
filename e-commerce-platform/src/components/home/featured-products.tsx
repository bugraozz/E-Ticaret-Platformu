"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product/product-card"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { fetchProducts } from "@/lib/features/products/productsSlice"
import { ArrowRight } from "lucide-react"

export function FeaturedProducts() {
  const dispatch = useAppDispatch()
  const { products, loading } = useAppSelector((state) => state.products)

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts())
    }
  }, [dispatch, products.length])

  const featuredProducts = products.slice(0, 4)

  if (loading) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold mb-4">Featured Products</h2>
            <p className="text-muted-foreground">Discover our most popular items</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted rounded-lg h-64 mb-4"></div>
                <div className="space-y-2">
                  <div className="bg-muted rounded h-4 w-3/4"></div>
                  <div className="bg-muted rounded h-4 w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold mb-4">Featured Products</h2>
          <p className="text-muted-foreground">Discover our most popular items</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center">
          <Link href="/products">
            <Button variant="outline" size="lg">
              View All Products
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
