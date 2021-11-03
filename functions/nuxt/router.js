import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _1ae8b9e7 = () => interopDefault(import('../pages/dashboard.vue' /* webpackChunkName: "pages/dashboard" */))
const _7d45f72a = () => interopDefault(import('../pages/dashboard/index.vue' /* webpackChunkName: "pages/dashboard/index" */))
const _0b27d216 = () => interopDefault(import('../pages/dashboard/calendar.vue' /* webpackChunkName: "pages/dashboard/calendar" */))
const _9b2c54ac = () => interopDefault(import('../pages/dashboard/gallery.vue' /* webpackChunkName: "pages/dashboard/gallery" */))
const _43a5f4ad = () => interopDefault(import('../pages/dashboard/gallery/index.vue' /* webpackChunkName: "pages/dashboard/gallery/index" */))
const _601d2e1f = () => interopDefault(import('../pages/dashboard/gallery/circuits.vue' /* webpackChunkName: "pages/dashboard/gallery/circuits" */))
const _b0658fe6 = () => interopDefault(import('../pages/dashboard/gallery/videos.vue' /* webpackChunkName: "pages/dashboard/gallery/videos" */))
const _39bc15c8 = () => interopDefault(import('../pages/dashboard/pages.vue' /* webpackChunkName: "pages/dashboard/pages" */))
const _7a11369f = () => interopDefault(import('../pages/dashboard/pages/index.vue' /* webpackChunkName: "pages/dashboard/pages/index" */))
const _2ad4291a = () => interopDefault(import('../pages/dashboard/pages/marketing.vue' /* webpackChunkName: "pages/dashboard/pages/marketing" */))
const _29c7a4b1 = () => interopDefault(import('../pages/dashboard/pages/media.vue' /* webpackChunkName: "pages/dashboard/pages/media" */))
const _130ca56e = () => interopDefault(import('../pages/dashboard/pages/partners.vue' /* webpackChunkName: "pages/dashboard/pages/partners" */))
const _25d5e1ab = () => interopDefault(import('../pages/dashboard/posts.vue' /* webpackChunkName: "pages/dashboard/posts" */))
const _3d1ce481 = () => interopDefault(import('../pages/dashboard/profile.vue' /* webpackChunkName: "pages/dashboard/profile" */))
const _064a335a = () => interopDefault(import('../pages/dashboard/video.vue' /* webpackChunkName: "pages/dashboard/video" */))
const _1a97764a = () => interopDefault(import('../pages/f3.vue' /* webpackChunkName: "pages/f3" */))
const _4b31cddc = () => interopDefault(import('../pages/fanclub.vue' /* webpackChunkName: "pages/fanclub" */))
const _02c9e1bc = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _2a378079 = () => interopDefault(import('../pages/marketing.vue' /* webpackChunkName: "pages/marketing" */))
const _2e4ea692 = () => interopDefault(import('../pages/media.vue' /* webpackChunkName: "pages/media" */))
const _3a48e760 = () => interopDefault(import('../pages/news.vue' /* webpackChunkName: "pages/news" */))
const _9bfd50b0 = () => interopDefault(import('../pages/partners.vue' /* webpackChunkName: "pages/partners" */))
const _7305393c = () => interopDefault(import('../pages/profile.vue' /* webpackChunkName: "pages/profile" */))
const _2002e718 = () => interopDefault(import('../pages/post/_slug.vue' /* webpackChunkName: "pages/post/_slug" */))
const _39223ea5 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/dashboard",
    component: _1ae8b9e7,
    children: [{
      path: "",
      component: _7d45f72a,
      name: "dashboard"
    }, {
      path: "calendar",
      component: _0b27d216,
      name: "dashboard-calendar"
    }, {
      path: "gallery",
      component: _9b2c54ac,
      children: [{
        path: "",
        component: _43a5f4ad,
        name: "dashboard-gallery"
      }, {
        path: "circuits",
        component: _601d2e1f,
        name: "dashboard-gallery-circuits"
      }, {
        path: "videos",
        component: _b0658fe6,
        name: "dashboard-gallery-videos"
      }]
    }, {
      path: "pages",
      component: _39bc15c8,
      children: [{
        path: "",
        component: _7a11369f,
        name: "dashboard-pages"
      }, {
        path: "marketing",
        component: _2ad4291a,
        name: "dashboard-pages-marketing"
      }, {
        path: "media",
        component: _29c7a4b1,
        name: "dashboard-pages-media"
      }, {
        path: "partners",
        component: _130ca56e,
        name: "dashboard-pages-partners"
      }]
    }, {
      path: "posts",
      component: _25d5e1ab,
      name: "dashboard-posts"
    }, {
      path: "profile",
      component: _3d1ce481,
      name: "dashboard-profile"
    }, {
      path: "video",
      component: _064a335a,
      name: "dashboard-video"
    }]
  }, {
    path: "/f3",
    component: _1a97764a,
    name: "f3"
  }, {
    path: "/fanclub",
    component: _4b31cddc,
    name: "fanclub"
  }, {
    path: "/login",
    component: _02c9e1bc,
    name: "login"
  }, {
    path: "/marketing",
    component: _2a378079,
    name: "marketing"
  }, {
    path: "/media",
    component: _2e4ea692,
    name: "media"
  }, {
    path: "/news",
    component: _3a48e760,
    name: "news"
  }, {
    path: "/partners",
    component: _9bfd50b0,
    name: "partners"
  }, {
    path: "/profile",
    component: _7305393c,
    name: "profile"
  }, {
    path: "/post/:slug?",
    component: _2002e718,
    name: "post-slug"
  }, {
    path: "/",
    component: _39223ea5,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
