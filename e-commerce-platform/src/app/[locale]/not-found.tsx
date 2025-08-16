import Link from 'next/link'
import { getTranslations } from "next-intl/server";
import { Button } from '@/components/ui/button'

export default async function NotFound() {
  const t = await getTranslations("common");
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
        <h2 className="text-2xl font-semibold">{t("notFoundTitle", {default: "Page not found"})}</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          {t("notFoundDescription", {default: "The page you are looking for does not exist."})}
        </p>
        <Link href="/">
          <Button size="lg">
            Go to Homepage
          </Button>
        </Link>
      </div>
    </div>
  );
}
