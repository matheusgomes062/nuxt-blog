// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/content', '@nuxt/test-utils/module'],
  css: ['/assets/css/main.css'],
  ssr: true,
  experimental: {
      payloadExtraction: false
  },
  router: {
      options: {
          strict: false
      }
  },
  sourcemap: false,
  content: {
    // Configuring code highlighting
    // https://content.nuxtjs.org/api/configuration
    highlight: {
        theme: 'github-dark',
        // Define languages you expect to use
        preload: ['java','javascript']
    },
    markdown: {
        // Configuring external link processing
        // https://github.com/rehypejs/rehype-external-links
        rehypePlugins: [
            [
                'rehype-external-links',
                {
                    target: '_blank',
                    rel: 'noopener noreferer'
                }
            ]
        ]
    }
  }
})