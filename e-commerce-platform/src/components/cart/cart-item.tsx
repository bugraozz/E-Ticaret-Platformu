"use client"

import Image from "next/image"
import Link from "next/link"
import { useLocale } from "next-intl"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Minus, Plus, Trash2 } from "lucide-react"
import { useAppDispatch } from "@/lib/hooks"
import { updateQuantity, removeFromCart, type CartItem as CartItemType } from "@/lib/features/cart/cartSlice"

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const dispatch = useAppDispatch()
  const locale = useLocale()

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      dispatch(removeFromCart(item.id))
    } else {
      dispatch(updateQuantity({ id: item.id, quantity: newQuantity }))
    }
  }

  const handleRemove = () => {
    dispatch(removeFromCart(item.id))
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Product Image */}
          <Link href={`/${locale}/products/${item.id}`} className="flex-shrink-0">
            <div className="w-24 h-24 bg-card rounded-lg overflow-hidden">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                width={96}
                height={96}
                className="w-full h-full object-contain p-2"
              />
            </div>
          </Link>

          {/* Product Info */}
          <div className="flex-1 space-y-2">
            <Link
              href={`/${locale}/products/${item.id}`}
              className="font-medium hover:text-primary transition-colors line-clamp-2"
            >
              {item.title}
            </Link>
            <p className="text-sm text-muted-foreground capitalize">{item.category}</p>
            <p className="font-semibold text-lg">${item.price.toFixed(2)}</p>
          </div>

          {/* Quantity Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center border rounded-lg">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleQuantityChange(item.quantity - 1)}
                className="h-8 w-8"
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="px-3 py-1 min-w-[2.5rem] text-center text-sm">{item.quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleQuantityChange(item.quantity + 1)}
                className="h-8 w-8"
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRemove}
                className="h-8 w-8 text-destructive hover:text-destructive"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
