import { CartContent } from "@/components/cart/cart-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopping Cart - ModernShop",
  description: "Review your selected items and proceed to checkout.",
};

export default function CartPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold mb-2">Shopping Cart</h1>
        <p className="text-muted-foreground">Review your items and proceed to checkout</p>
      </div>
      <CartContent />
    </div>
  );
}
