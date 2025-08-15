"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart } from "lucide-react"
import { useAppDispatch } from "@/lib/hooks"
import { addToCart } from "@/lib/features/cart/cartSlice"
import type { Product } from "@/lib/features/products/productsSlice"
import { useTranslations } from "next-intl"
import { toast } from "@/hooks/use-toast"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch()
  const t = useTranslations("product")

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        category: product.category,
      }),
    )
    toast({
      title: t("addedToCart"),
      description: `${product.title} ${t("addedToCartDescription")}`,
    })
  }

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <Link href={`/products/${product.id}`}>
        <div className="aspect-square overflow-hidden bg-card">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            width={300}
            height={300}
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
      </Link>

      <CardContent className="p-4">
        <div className="space-y-2">
          <Badge variant="secondary" className="text-xs">
            {product.category}
          </Badge>

          <Link href={`/products/${product.id}`}>
            <h3 className="font-heading text-sm font-semibold line-clamp-2 hover:text-primary transition-colors">
              {product.title}
            </h3>
          </Link>

          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-muted-foreground">
              {product.rating.rate} ({product.rating.count})
            </span>
          </div>

          <p className="font-heading text-lg font-bold text-primary">${product.price.toFixed(2)}</p>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button onClick={handleAddToCart} className="w-full" size="sm">
          <ShoppingCart className="h-4 w-4 mr-2" />
          {t("addToCart")}
        </Button>
      </CardFooter>
    </Card>
  )
}
