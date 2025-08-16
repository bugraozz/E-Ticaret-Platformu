import { Suspense } from "react";
import { ProductsGrid } from "@/components/product/product-grid";
import { ProductFilters } from "@/components/product/product-filters";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products - ModernShop",
  description:
    "Browse our complete collection of premium products. Filter by category, price, and rating to find exactly what you need.",
  keywords: "products, electronics, jewelry, clothing, shopping, e-commerce",
};

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold mb-2">All Products</h1>
        <p className="text-muted-foreground">Discover our complete collection of premium products</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <ProductFilters />
        </div>
        <div className="lg:col-span-3">
          <Suspense fallback={<ProductsGridSkeleton />}>
            <ProductsGrid />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

function ProductsGridSkeleton() {
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
  );
}
