import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Target, Award, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us - ModernShop",
  description: "Learn about our mission, values, and commitment to providing exceptional shopping experiences.",
};

interface AboutPageProps {
  params: { locale: string };
}

export default async function AboutPage({ params: { locale } }: AboutPageProps) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("about");

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="font-heading text-4xl lg:text-5xl font-bold mb-6">
          {t("title", { default: "About ModernShop" })}
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          {t("description", { 
            default: "We're passionate about bringing you the finest products from around the world, with a commitment to quality, sustainability, and exceptional customer service."
          })}
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <Card className="overflow-hidden">
          <CardContent className="p-8">
            <div className="flex items-center mb-4">
              <Target className="h-8 w-8 text-primary mr-3" />
              <h2 className="font-heading text-2xl font-bold">
                {t("mission.title", { default: "Our Mission" })}
              </h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {t("mission.description", {
                default: "To revolutionize online shopping by curating exceptional products and delivering unparalleled customer experiences that exceed expectations every single time."
              })}
            </p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardContent className="p-8">
            <div className="flex items-center mb-4">
              <Heart className="h-8 w-8 text-primary mr-3" />
              <h2 className="font-heading text-2xl font-bold">
                {t("vision.title", { default: "Our Vision" })}
              </h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {t("vision.description", {
                default: "To become the world's most trusted e-commerce platform, where quality meets convenience and every purchase contributes to a better tomorrow."
              })}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Values */}
      <div className="mb-16">
        <h2 className="font-heading text-3xl font-bold text-center mb-12">
          {t("values.title", { default: "Our Values" })}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-heading text-lg font-semibold mb-2">
              {t("values.quality.title", { default: "Quality First" })}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t("values.quality.description", { default: "We never compromise on quality" })}
            </p>
          </div>

          <div className="text-center">
            <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-heading text-lg font-semibold mb-2">
              {t("values.customer.title", { default: "Customer-Centric" })}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t("values.customer.description", { default: "Your satisfaction is our priority" })}
            </p>
          </div>

          <div className="text-center">
            <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-heading text-lg font-semibold mb-2">
              {t("values.sustainability.title", { default: "Sustainability" })}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t("values.sustainability.description", { default: "Caring for our planet" })}
            </p>
          </div>

          <div className="text-center">
            <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Target className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-heading text-lg font-semibold mb-2">
              {t("values.innovation.title", { default: "Innovation" })}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t("values.innovation.description", { default: "Always pushing boundaries" })}
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-muted/30 rounded-2xl p-8 lg:p-12">
        <h2 className="font-heading text-3xl font-bold text-center mb-12">
          {t("stats.title", { default: "Our Impact" })}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-primary mb-2">50K+</div>
            <p className="text-muted-foreground">
              {t("stats.customers", { default: "Happy Customers" })}
            </p>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">1M+</div>
            <p className="text-muted-foreground">
              {t("stats.orders", { default: "Orders Delivered" })}
            </p>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">99%</div>
            <p className="text-muted-foreground">
              {t("stats.satisfaction", { default: "Satisfaction Rate" })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "tr" }];
}
