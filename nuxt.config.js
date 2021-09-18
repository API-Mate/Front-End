/*!

=========================================================
* API Mate - v1.0.0
=========================================================

* Github: https://github.com/API-Mate
* Copyright Ali Tabesh (https://alitabesh.ir)

* Coded by Ali Tabesh (https://alitabesh.ir)

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

const pkg = require("./package");
console.log("ENV", process.env.NODE_ENV);
const { default: isDemo } = require("./plugins/isDemo");

module.exports = {
  env: {
    apiUrl: process.env.API_BASE_URL,
    baseUrl: process.env.BASE_URL,
    isDemo: process.env.IS_DEMO,
    apiKey: process.env.API_KEY,
  },
  server: {
    port: 4000 // default: 3000
  },
  mode: "spa",
  router: {
    base: "/",
    linkExactActiveClass: "active"
  },
  meta: {
    ogType: false,
    ogDescription: false,
    author: false,
    ogTitle: false,
    description: false,
    viewport: false,
    charset: false,
   },
  /*
   ** Headers of the page
   */
  head: {
    title: "API Mate",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "API Mate. Manage social media easier"
      },
      {
        name: "keywords",
        content:
          "api mate, social network"
      },
      {
        itemprop: "name",
        content: "API Mate"
      },
      {
        itemprop: "description",
        content:
          "API Mate, Manage social media easier."
      },
      {
        itemprop: "image",
        content:
          "https://s3.amazonaws.com/creativetim_bucket/products/350/original/opt_ad_nuxt_laravel_thumbnail.jpg"
      },
      {
        name: "twitter:card",
        content: "product"
      },
      {
        name: "twitter:site",
        content: "@api-mate"
      },
      {
        name: "twitter:title",
        content: "API Mate"
      },
      {
        name: "twitter:description",
        content:
          "API Mate, Manage social media easier"
      },
      {
        name: "twitter:creator",
        content: "@api-mate"
      },
      {
        name: "twitter:image",
        content:
          "https://s3.amazonaws.com/creativetim_bucket/products/350/original/opt_ad_nuxt_laravel_thumbnail.jpg"
      },
      {
        property: "fb:app_id",
        content: "655968634437471"
      },
      {
        property: "og:title",
        content: "API Mate"
      },
      {
        property: "og:type",
        content: "article"
      },
      {
        property: "og:url",
        content:
          "https://github.com/API-Mate"
      },
      {
        property: "og:image",
        content:
          "https://s3.amazonaws.com/creativetim_bucket/products/350/original/opt_ad_nuxt_laravel_thumbnail.jpg"
      },
      {
        property: "og:description",
        content:
          "API Mate, Manage social media easier"
      },
      {
        property: "og:site_name",
        content: "API Mate"
      }
    ],
    link: [
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700"
      },
      {
        rel: "stylesheet",
        href: "https://use.fontawesome.com/releases/v5.6.3/css/all.css",
        integrity:
          "sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/",
        crossorigin: "anonymous"
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },

  /*
   ** Global CSS
   */
  css: [
    "assets/css/nucleo/css/nucleo.css",
    "assets/sass/argon.scss",
    "~assets/css/style.css"
  ],

  router: {
    middleware: ['auth']
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "~/plugins/dashboard/dashboard-plugin",
    { src: "~/plugins/dashboard/world-map", ssr: false },
    "~/plugins/dashboard/JsonApi.js",
    "~/plugins/isDemo.js",
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/pwa",
    "@nuxtjs/auth",
    "@nuxtjs/toast"
  ],
  /*
   ** Auth module configuration
   ** See https://auth.nuxtjs.org/schemes/local.html#options
   */
  auth: {
    strategies: {
      local: {
        _scheme: "~/util/authCustomStrategy.js",
        endpoints: {
          login: {
            url: "authentication-function",
            method: "post",
            propertyName: "token"
          },
          //logout: { url: "/logout", method: "post" },
          user: {
            url: "/data-function",
            method: "post",
            propertyName: false
          }
        }
      },
      redirect: {
        login: "/login",
        logout: "/",
        callback: "/login",
        home: "/dashboard"
      }
    }
  },

  /*
   ** Notification toast module configuration
   ** See https://github.com/nuxt-community/modules/tree/master/packages/toast?ref=madewithvuejs.com
   */
  toast: {
    position: "top-right",
    duration: 5000,
    keepOnHover: true,
    fullWidth: false,
    fitToScreen: true,
    className: "vue-toast-custom",
    closeOnSwipe: true,
    register: [
      // Register custom toasts
      // @todo add custom messages as they come : login failed, register failed etc
      {
        name: "my-error",
        message: "Oops...Something went wrong",
        options: {
          type: "error"
        }
      }
    ]
  },

  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: process.env.API_BASE_URL,
    headers: {
      common: {
        Accept: "application/json",
        //"content-type": "application/json"
      },
      post: {
        "content-type": "application/json"
      },
      patch: {
        "content-type": "application/json"
      },
      delete: {
        "content-type": "application/json"
      }
    }
  },

  /*
   ** Build configuration
   */
  build: {
    transpile: ["vee-validate/dist/rules"],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
    extractCSS: process.env.NODE_ENV === "production",
    babel: {
      plugins: [
        [
          "component",
          {
            libraryName: "element-ui",
            styleLibraryName: "theme-chalk"
          }
        ]
      ]
    }
  }
};
