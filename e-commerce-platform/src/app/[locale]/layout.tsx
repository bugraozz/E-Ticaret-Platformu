import type React from "react"
import type { Metadata } from "next"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, unstable_setRequestLocale } from "next-intl/server"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

// Fonts and globals are applied in the root layout

export const metadata: Metadata = {
  title: "Modern E-Commerce | Premium Shopping Experience",
  description:
    "Discover premium products with our modern e-commerce platform. Multi-language support, fast delivery, and exceptional customer service.",
  keywords: "e-commerce, online shopping, premium products, fast delivery",
  authors: [{ name: "E-Commerce Team" }],
  creator: "Modern E-Commerce Platform",
  publisher: "E-Commerce Inc.",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://modern-ecommerce.vercel.app",
    title: "Modern E-Commerce | Premium Shopping Experience",
    description: "Discover premium products with our modern e-commerce platform.",
    siteName: "Modern E-Commerce",
  },
  twitter: {
    card: "summary_large_image",
    title: "Modern E-Commerce | Premium Shopping Experience",
    description: "Discover premium products with our modern e-commerce platform.",
  },
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>) {
  // Ensure the request locale is set for this segment
  unstable_setRequestLocale(locale)
  const messages = await getMessages();
  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </NextIntlClientProvider>
  )
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "tr" }];
}
