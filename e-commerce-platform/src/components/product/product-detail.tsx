"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Star, ShoppingCart, Heart, Share2, Minus, Plus } from "lucide-react"
import { useAppDispatch } from "@/lib/hooks"
import { addToCart } from "@/lib/features/cart/cartSlice"
import { useTranslations } from "next-intl"
import type { Product } from "@/lib/features/products/productsSlice"
// import { toast } from "@/hooks/use-toast"

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const dispatch = useAppDispatch()
  const [quantity, setQuantity] = useState(1)
  const t = useTranslations("productDetail")
  const tProduct = useTranslations("product")

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(
        addToCart({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          category: product.category,
        }),
      )
    }
    alert(`${quantity}x ${product.title} ${tProduct("addedToCartDescription")}`)
  }

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1))

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="space-y-4">
          <Card className="overflow-hidden">
            <CardContent className="p-8">
              <div className="aspect-square relative">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div className="space-y-4">
            <Badge variant="secondary" className="w-fit">
              {product.category}
            </Badge>

            <h1 className="font-heading text-3xl font-bold">{product.title}</h1>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating.rate) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating.rate} ({t("reviews", {count: product.rating.count})})
              </span>
            </div>

            <div className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</div>
          </div>

          <div className="space-y-4">
            <h3 className="font-heading text-lg font-semibold">{t("description")}</h3>
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="font-medium">{t("quantity")}</span>
              <div className="flex items-center border rounded-lg">
                <Button variant="ghost" size="icon" onClick={decrementQuantity} className="h-10 w-10">
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                <Button variant="ghost" size="icon" onClick={incrementQuantity} className="h-10 w-10">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={handleAddToCart} size="lg" className="flex-1">
                <ShoppingCart className="h-5 w-5 mr-2" />
                {tProduct("addToCart")}
              </Button>

              <Button variant="outline" size="lg">
                <Heart className="h-5 w-5 mr-2" />
                {t("wishlist")}
              </Button>

              <Button variant="outline" size="lg">
                <Share2 className="h-5 w-5 mr-2" />
                {t("share")}
              </Button>
            </div>
          </div>

          {/* Product Features */}
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{t("features.freeShipping")}</span>
                  <span className="font-medium">✓</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{t("features.returns")}</span>
                  <span className="font-medium">✓</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{t("features.warranty")}</span>
                  <span className="font-medium">{t("features.warrantyValue")}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{t("features.inStock")}</span>
                  <span className="font-medium text-green-600">✓</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
