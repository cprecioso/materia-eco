// @ts-check

/** @type {import("next/dist/next-server/server/config-shared").NextConfig} */
module.exports = {
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
  },
  images: { domains: ["www.datocms-assets.com"] },
  future: {
    webpack5: true,
  },
}
