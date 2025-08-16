import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/product/product-detail";
import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

interface ProductPageProps {
  params: {
    locale: string;
    id: string;
  };
}

async function getProduct(id: string) {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(params.id);
  if (!product) return { title: "Product Not Found - ModernShop" };
  return {
    title: `${product.title} - ModernShop`,
    description: product.description,
    openGraph: { title: product.title, description: product.description, images: [product.image], type: "website" },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  // Set request locale for static generation
  unstable_setRequestLocale(params.locale);
  
  const product = await getProduct(params.id);
  if (!product) notFound();
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<ProductDetailSkeleton />}>
        <ProductDetail product={product} />
      </Suspense>
    </div>
  );
}

function ProductDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="animate-pulse">
          <div className="bg-muted rounded-lg h-96 mb-4"></div>
        </div>
        <div className="animate-pulse space-y-4">
          <div className="bg-muted rounded h-8 w-3/4"></div>
          <div className="bg-muted rounded h-4 w-1/2"></div>
          <div className="bg-muted rounded h-6 w-1/4"></div>
          <div className="bg-muted rounded h-20 w-full"></div>
          <div className="bg-muted rounded h-12 w-full"></div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const products = await res.json();
    const locales = ['en', 'tr'];
    
    const params = [];
    for (const locale of locales) {
      for (const product of products.slice(0, 10)) {
        params.push({
          locale,
          id: product.id.toString()
        });
      }
    }
    return params;
  } catch {
    return [];
  }
}
