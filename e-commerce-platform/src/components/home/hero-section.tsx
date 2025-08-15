import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ShoppingBag } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-background via-card to-muted/30 py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="font-heading text-4xl lg:text-6xl font-bold tracking-tight">
              Premium Shopping
              <span className="block text-primary">Experience</span>
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover curated products from top brands with fast delivery, exceptional customer service, and unbeatable
              prices.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" className="text-lg px-8">
                <ShoppingBag className="h-5 w-5 mr-2" />
                Shop Now
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <Link href="/categories">
              <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                Browse Categories
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12">
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-primary">1000+</div>
              <div className="text-sm text-muted-foreground">Premium Products</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">Customer Support</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-primary">Free</div>
              <div className="text-sm text-muted-foreground">Fast Delivery</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
