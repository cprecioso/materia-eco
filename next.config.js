// @ts-check

module.exports = /** @type {import("next/dist/next-server/server/config-shared").NextConfig} */ ({
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
  },
  future: {
    webpack5: true,
  },
})
