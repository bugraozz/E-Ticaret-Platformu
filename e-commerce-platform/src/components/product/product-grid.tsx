"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { ProductCard } from "./product-card"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { fetchProducts, fetchCategories, setSelectedCategory } from "@/lib/features/products/productsSlice"

export function ProductsGrid() {
  const dispatch = useAppDispatch()
  const { filteredProducts, loading, error, products, selectedCategory } = useAppSelector((state) => state.products)
  const searchParams = useSearchParams()

  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(fetchCategories())
  }, [dispatch])

  // Apply category from query string once products are available
  useEffect(() => {
    const qp = searchParams?.get("category")
    if (!qp) return
    // Avoid redundant dispatches; wait until products are loaded
    if (products.length > 0 && qp !== selectedCategory) {
      dispatch(setSelectedCategory(qp))
    }
  }, [dispatch, searchParams, products.length, selectedCategory])

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-muted rounded-lg h-64 mb-4"></div>
            <div className="space-y-2">
              <div className="bg-muted rounded h-4 w-3/4"></div>
              <div className="bg-muted rounded h-4 w-1/2"></div>
              <div className="bg-muted rounded h-8 w-full"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">Error loading products: {error}</p>
      </div>
    )
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No products found matching your criteria.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Showing {filteredProducts.length} products</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
