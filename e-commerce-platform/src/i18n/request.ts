import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({locale}) => {
	const fallbackLocale = 'en';
	const resolved = locale || fallbackLocale;
	return {
		locale: resolved,
		messages: (await import(`../messages/${resolved}.json`)).default
	};
});
