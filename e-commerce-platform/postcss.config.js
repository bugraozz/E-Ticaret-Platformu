/** @type {import('postcss-load-config').Config} */
module.exports = {
  // Next.js expects plugin names or an object map; Tailwind v4 plugin is 'tailwindcss'
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
