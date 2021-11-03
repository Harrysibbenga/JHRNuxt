/* eslint-disable nuxt/no-cjs-in-config */
module.exports = {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s | Official Website',
    title: 'Max Marzorati',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Max Marzorati, aged 20 from Harrow, Middlesex, UK is making a real name for himself in the world of motorsport. In 2021, he is competing in the internationally acclaimed British Formula 3 Championship – famed for producing numerous future stars across Formula 1, Le Mans 24 Hours, Formula E and touring cars.',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        src: 'https://apps.elfsight.com/p/platform.js',
        defer: true,
        body: true,
      },
      {
        src: 'https://www.googletagmanager.com/gtag/js?id=UA-175244145-1',
        async: true,
      },
      {
        hid: 'gtag',
        type: 'text/javascript',
        charset: 'utf-8',
        innerHTML: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'UA-175244145-1')
        `,
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'bootstrap-css-only/css/bootstrap.min.css',
    'mdbvue/lib/css/mdb.min.css',
    'assets/css/_custom-styles.scss',
    'assets/css/_custom-variables.scss',
    '@fortawesome/fontawesome-free/css/all.css',
  ],

  vue: {
    config: {
      performance: true, // you probably should detect dev mode here
    },
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    dirs: [
      '~/components',
      {
        path: '~/components/Header-footer/',
        prefix: 'Head',
      },
      {
        path: '~/components/Dashboard/',
        prefix: 'Dashboard',
      },
      {
        path: '~/components/PageComponents/',
        prefix: 'Home',
      },
      {
        path: '~/components/UI/',
        prefix: 'Ui',
      },
    ],
  },

  ssr: true,

  router: {
    middleware: ['auth'],
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    '@nuxtjs/dotenv',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'bootstrap-vue/nuxt',
  ],

  bootstrapVue: {
    componentPlugins: ['NavbarPlugin'],
    icons: true,
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, ctx) {},
    transpile: ['mdbvue/lib/components', 'bootstrap-vue'],
  },
}
