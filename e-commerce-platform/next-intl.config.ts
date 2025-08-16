import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

export default getRequestConfig(async ({ requestLocale }) => {
  // Validate that the incoming locale parameter is valid
  const locales = ['en', 'tr'];
  const locale = await requestLocale;
  
  if (!locale || !locales.includes(locale)) notFound();

  return {
    locale,
    messages: (await import(`./src/messages/${locale}.json`)).default
  };
});
