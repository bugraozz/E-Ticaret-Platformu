import { CartContent } from "@/components/cart/cart-content";
import type { Metadata } from "next";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Shopping Cart - ModernShop",
  description: "Review your selected items and proceed to checkout.",
};

interface CartPageProps {
  params: { locale: string };
}

export default async function CartPage({ params: { locale } }: CartPageProps) {
  // Set request locale for static generation
  unstable_setRequestLocale(locale);
  
  const t = await getTranslations("cart");
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold mb-2">{t("pageTitle")}</h1>
        <p className="text-muted-foreground">{t("pageSubtitle")}</p>
      </div>
      <CartContent />
    </div>
  );
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "tr" }];
}
