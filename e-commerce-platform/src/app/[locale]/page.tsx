import { HeroSection } from "@/components/home/hero-section";
import { FeaturedProducts } from "@/components/home/featured-products";
import { CategoriesSection } from "@/components/home/categories-section";
import { unstable_setRequestLocale } from "next-intl/server";

interface HomePageProps {
  params: { locale: string };
}

export default function HomePage({ params: { locale } }: HomePageProps) {
  // Set request locale for static generation
  unstable_setRequestLocale(locale);
  
	return (
		<>
			<HeroSection />
			<FeaturedProducts />
			<CategoriesSection />
		</>
	);
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "tr" }];
}

