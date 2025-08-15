import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, DM_Sans } from "next/font/google"
import "../globals.css"
import { Providers } from "../providers"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
})

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

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>) {
  return (
    <html lang={locale || "en"} className={`${spaceGrotesk.variable} ${dmSans.variable}`}>
      <body className="antialiased">
  <Providers>{children}</Providers>
      </body>
    </html>
  )
}
