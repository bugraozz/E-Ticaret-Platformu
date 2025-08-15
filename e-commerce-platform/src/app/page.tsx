import { Suspense } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/home/hero-section"
import { FeaturedProducts } from "@/components/home/featured-products"
import { CategoriesSection } from "@/components/home/categories-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "ModernShop - Premium E-Commerce Experience",
  description:
    "Discover premium products with fast delivery and exceptional customer service. Shop electronics, jewelry, clothing and more.",
  keywords: "e-commerce, online shopping, electronics, jewelry, clothing, premium products",
  openGraph: {
    title: "ModernShop - Premium E-Commerce Experience",
    description: "Discover premium products with fast delivery and exceptional customer service.",
    type: "website",
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <HeroSection />

        <Suspense fallback={<div className="container mx-auto px-4 py-8">Loading featured products...</div>}>
          <FeaturedProducts />
        </Suspense>

        <CategoriesSection />
      </main>

      <Footer />
    </div>
  )
}
