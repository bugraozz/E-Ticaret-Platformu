"use client"

import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CartItem } from "./cart-item"
import { useAppSelector } from "@/lib/hooks"
import { ShoppingBag, ArrowLeft } from "lucide-react"

export function CartContent() {
  const { items, total, itemCount } = useAppSelector((state) => state.cart)
  const t = useTranslations("cart")
  const locale = useLocale()

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
        <h2 className="font-heading text-2xl font-bold mb-2">{t("emptyTitle")}</h2>
        <p className="text-muted-foreground mb-8">{t("emptySubtitle")}</p>
        <Link href={`/${locale}/products`}>
          <Button size="lg">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t("continueShopping")}
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Cart Items */}
      <div className="lg:col-span-2 space-y-4">
        <h2 className="font-heading text-xl font-semibold">{t("cartItems", {count: itemCount})}</h2>

        <div className="space-y-4">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-1">
        <Card className="sticky top-4">
          <CardHeader>
            <CardTitle>{t("orderSummary")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>{t("subtotal", {count: itemCount})}</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>{t("shipping")}</span>
                <span className="text-green-600">{t("shippingFree")}</span>
              </div>
              <div className="flex justify-between">
                <span>{t("tax")}</span>
                <span>${(total * 0.08).toFixed(2)}</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between font-semibold text-lg">
                  <span>{t("total")}</span>
                  <span>${(total * 1.08).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Button className="w-full" size="lg">
              {t("checkout")}
            </Button>

            <Link href={`/${locale}/products`}>
              <Button variant="outline" className="w-full bg-transparent">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t("continueShopping")}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
