// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  target: "static",
  head: {
    title: "Todo App",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Todo App with Nuxt V3",
      },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  css: [
    "@/assets/css/main.scss",
    '@fortawesome/fontawesome-svg-core/styles.css',
    "animate.css/animate.min.css",
  ],
  modules: ["@nuxtjs/tailwindcss"],
  runtimeConfig: {
    public: {
      url: process.env.NUXT_PUBLIC_API_BASE,
    },
  },
});
