import { HeroSection } from "@/components/home/hero-section";
import { FeaturedProducts } from "@/components/home/featured-products";
import { CategoriesSection } from "@/components/home/categories-section";

export default function HomePage() {
	return (
		<>
			<HeroSection />
			<FeaturedProducts />
			<CategoriesSection />
		</>
	);
}

