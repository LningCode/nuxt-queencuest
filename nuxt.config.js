const esm = require("esm")(module)
const config = esm('./config')
const { port, host } = config.default.server

module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'saear',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#F56C6C' },
  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/Font-Awesome-3.2.1/css/font-awesome.min.css',
    '@/assets/css/main.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/components',
    '@/plugins/proto',
    '@/plugins/element-ui',
    '@/plugins/intercept/axios',
    { src: '@/plugins/intercept/route', ssr: true },
    { src: '@/plugins/slideVerify', ssr: false }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/axios',
    'cookie-universal-nuxt'
  ],
  styleResources: {
    scss: [
      '@/assets/style/variables.scss', // 全局 scss 变量
      '@/assets/style/mixins.scss' // 全局 scss 混合
    ]
  },
  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  server: { port, host },
  dir: {
    public: 'public'
  },
  telemetry: false
}
