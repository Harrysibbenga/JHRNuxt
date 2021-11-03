export const HeadFooter = () => import('../../components/Header-footer/Footer.vue' /* webpackChunkName: "components/head-footer" */).then(c => wrapFunctional(c.default || c))
export const HeadHeader = () => import('../../components/Header-footer/Header.vue' /* webpackChunkName: "components/head-header" */).then(c => wrapFunctional(c.default || c))
export const HomeCalendar = () => import('../../components/PageComponents/Calendar.vue' /* webpackChunkName: "components/home-calendar" */).then(c => wrapFunctional(c.default || c))
export const HomeContact = () => import('../../components/PageComponents/Contact.vue' /* webpackChunkName: "components/home-contact" */).then(c => wrapFunctional(c.default || c))
export const HomePromo = () => import('../../components/PageComponents/Promo.vue' /* webpackChunkName: "components/home-promo" */).then(c => wrapFunctional(c.default || c))
export const HomeSocial = () => import('../../components/PageComponents/Social.vue' /* webpackChunkName: "components/home-social" */).then(c => wrapFunctional(c.default || c))
export const HomeSocial2 = () => import('../../components/PageComponents/Social2.vue' /* webpackChunkName: "components/home-social2" */).then(c => wrapFunctional(c.default || c))
export const HomeStayConnected = () => import('../../components/PageComponents/StayConnected.vue' /* webpackChunkName: "components/home-stay-connected" */).then(c => wrapFunctional(c.default || c))
export const HomeVideo = () => import('../../components/PageComponents/Video.vue' /* webpackChunkName: "components/home-video" */).then(c => wrapFunctional(c.default || c))
export const UiLoader = () => import('../../components/UI/Loader.vue' /* webpackChunkName: "components/ui-loader" */).then(c => wrapFunctional(c.default || c))
export const UiMessage = () => import('../../components/UI/Message.vue' /* webpackChunkName: "components/ui-message" */).then(c => wrapFunctional(c.default || c))
export const UiSelectVideo = () => import('../../components/UI/SelectVideo.vue' /* webpackChunkName: "components/ui-select-video" */).then(c => wrapFunctional(c.default || c))
export const UiTimer = () => import('../../components/UI/Timer.vue' /* webpackChunkName: "components/ui-timer" */).then(c => wrapFunctional(c.default || c))
export const UiAppEditor2 = () => import('../../components/UI/appEditor2.vue' /* webpackChunkName: "components/ui-app-editor2" */).then(c => wrapFunctional(c.default || c))
export const UiImageUpload = () => import('../../components/UI/imageUpload.vue' /* webpackChunkName: "components/ui-image-upload" */).then(c => wrapFunctional(c.default || c))
export const UiNewsImage = () => import('../../components/UI/newsImage.vue' /* webpackChunkName: "components/ui-news-image" */).then(c => wrapFunctional(c.default || c))
export const UiPartners = () => import('../../components/UI/partners.vue' /* webpackChunkName: "components/ui-partners" */).then(c => wrapFunctional(c.default || c))
export const UiProfileImage = () => import('../../components/UI/profileImage.vue' /* webpackChunkName: "components/ui-profile-image" */).then(c => wrapFunctional(c.default || c))

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
