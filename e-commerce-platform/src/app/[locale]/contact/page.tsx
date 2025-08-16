import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Mail, Clock, MessageCircle, Headphones } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us - ModernShop",
  description: "Get in touch with our customer support team. We're here to help with your shopping experience.",
};

interface ContactPageProps {
  params: { locale: string };
}

export default async function ContactPage({ params: { locale } }: ContactPageProps) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="font-heading text-4xl lg:text-5xl font-bold mb-6">
          {t("title", { default: "Contact Us" })}
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          {t("description", { 
            default: "Have questions or need assistance? Our friendly customer support team is here to help you with any inquiries about our products or services."
          })}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Headphones className="h-6 w-6 mr-3 text-primary" />
                {t("support.title", { default: "Customer Support" })}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start space-x-4">
                <Phone className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="font-medium">
                    {t("support.phone.label", { default: "Phone Support" })}
                  </p>
                  <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  <Badge variant="secondary" className="mt-1">
                    {t("support.phone.badge", { default: "24/7 Available" })}
                  </Badge>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Mail className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="font-medium">
                    {t("support.email.label", { default: "Email Support" })}
                  </p>
                  <p className="text-muted-foreground">support@modernshop.com</p>
                  <Badge variant="secondary" className="mt-1">
                    {t("support.email.badge", { default: "Response within 2 hours" })}
                  </Badge>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <MessageCircle className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="font-medium">
                    {t("support.chat.label", { default: "Live Chat" })}
                  </p>
                  <p className="text-muted-foreground">
                    {t("support.chat.description", { default: "Chat with our support team" })}
                  </p>
                  <Button className="mt-2" size="sm">
                    {t("support.chat.button", { default: "Start Chat" })}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Office Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-6 w-6 mr-3 text-primary" />
                {t("office.title", { default: "Office Location" })}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-medium mb-2">
                  {t("office.address.title", { default: "Headquarters" })}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  123 Commerce Street<br />
                  Suite 456<br />
                  New York, NY 10001<br />
                  United States
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-primary" />
                <div>
                  <p className="font-medium">
                    {t("office.hours.title", { default: "Business Hours" })}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t("office.hours.weekdays", { default: "Mon - Fri: 9:00 AM - 6:00 PM EST" })}<br />
                    {t("office.hours.weekend", { default: "Sat - Sun: 10:00 AM - 4:00 PM EST" })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle>
              {t("form.title", { default: "Send us a Message" })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t("form.firstName", { default: "First Name" })}
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder={t("form.firstNamePlaceholder", { default: "Enter your first name" })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t("form.lastName", { default: "Last Name" })}
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder={t("form.lastNamePlaceholder", { default: "Enter your last name" })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {t("form.email", { default: "Email Address" })}
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder={t("form.emailPlaceholder", { default: "Enter your email address" })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {t("form.subject", { default: "Subject" })}
                </label>
                <select className="w-full px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="">{t("form.subjectSelect", { default: "Select a subject" })}</option>
                  <option value="general">{t("form.subjects.general", { default: "General Inquiry" })}</option>
                  <option value="order">{t("form.subjects.order", { default: "Order Support" })}</option>
                  <option value="technical">{t("form.subjects.technical", { default: "Technical Issue" })}</option>
                  <option value="refund">{t("form.subjects.refund", { default: "Refund Request" })}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {t("form.message", { default: "Message" })}
                </label>
                <textarea
                  rows={5}
                  className="w-full px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder={t("form.messagePlaceholder", { default: "Tell us how we can help you..." })}
                />
              </div>

              <Button type="submit" className="w-full" size="lg">
                {t("form.submit", { default: "Send Message" })}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <div className="mt-16">
        <h2 className="font-heading text-3xl font-bold text-center mb-12">
          {t("faq.title", { default: "Frequently Asked Questions" })}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">
                {t("faq.shipping.question", { default: "What are your shipping options?" })}
              </h3>
              <p className="text-muted-foreground text-sm">
                {t("faq.shipping.answer", { 
                  default: "We offer free standard shipping on orders over $50, with express and overnight options available."
                })}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">
                {t("faq.returns.question", { default: "What is your return policy?" })}
              </h3>
              <p className="text-muted-foreground text-sm">
                {t("faq.returns.answer", { 
                  default: "We accept returns within 30 days of purchase for a full refund, provided items are in original condition."
                })}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">
                {t("faq.payment.question", { default: "What payment methods do you accept?" })}
              </h3>
              <p className="text-muted-foreground text-sm">
                {t("faq.payment.answer", { 
                  default: "We accept all major credit cards, PayPal, Apple Pay, and Google Pay for secure transactions."
                })}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">
                {t("faq.tracking.question", { default: "How can I track my order?" })}
              </h3>
              <p className="text-muted-foreground text-sm">
                {t("faq.tracking.answer", { 
                  default: "You'll receive a tracking number via email once your order ships, allowing you to monitor delivery progress."
                })}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "tr" }];
}
