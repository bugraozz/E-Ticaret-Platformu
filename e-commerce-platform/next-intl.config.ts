import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  if (!locale) throw new Error('Missing locale');
  return {
    messages: (await import(`./src/messages/${locale}.json`)).default,
    locale
  };
});
