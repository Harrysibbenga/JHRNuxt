<template>
  <div>
    <Header></Header>
    <div id="post">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12 d-flex flex-center p-0">
            <img :src="post.url" :alt="post.alt" class="img-fluid" />
          </div>
        </div>
        <div class="row pb-5">
          <div class="col-12 mt-3 text-center">
            <h2 class="pt-3">{{post.title}}</h2>
          </div>
          <div class="col-12 text-center">
            <p>{{post.date | formatDate}}</p>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-12 pt-3 text-justify" v-html="post.content"></div>
        </div>
        <div class="row py-3" v-if="post.gallery.length > 0">
          <div class="col-4 py-2" v-for="(item, index) in post.gallery" :key="index">
            <img :src="item.url" :alt="item.alt" class="img-fluid">
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-12 py-3 text-justify bg-info text-white" v-html="post.quoteContent"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: 'Post',
  filters: {
    formatDate(val) {
      if (!val) {
        return "-";
      }
      const date = val;
      return moment(date).format("Do MMM YYYY");
    },
  },
  data() {
    return {
      slug: '',
      post: {},
      imgIndex: 0,
      visible: false,
      images: [],
    }
  },
  async fetch({ store, route }) {
    this.slug = route.params.slug
    await store.dispatch('posts/setPostSlug', this.slug).then((data) => {
      this.post = data
    })
  },
  head() {
    const post = this.$store.getters['posts/getPost']
    return {
      title: post.title,
      meta: [
        {
          hid: 't-type',
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          hid: 'og-title',
          property: 'og:title',
          content: post.title,
        },
        {
          hid: 'og-desc',
          property: 'og:description',
          content: post.excerpt,
        },
        {
          hid: 'og-url',
          property: 'og:url',
          content: 'https://jhrdevelopments.com/post/' + this.slug,
        },
        {
          hid: 'og-image',
          property: 'og:image',
          content: post.url,
        },
        {
          hid: 'og-site_name',
          property: 'og:site_name',
          content: 'JHR Developments | Official Website',
        },
        { hid: 'og-type', property: 'og:type', content: 'post' },
        { name: 'robots', content: 'index,follow' },
        {
          hid: 'description',
          name: 'description',
          content: post.excerpt,
        },
      ],
    }
  },
  created() {
    this.slug = this.$route.params.slug
    this.$store.dispatch('posts/setPostSlug', this.slug).then((data) => {
      this.post = data
    })
  },
  destroyed() {
    this.$store.commit('posts/clearPost')
  },
  methods: {
    showImg(index) {
      this.imgIndex = index
      this.visible = true
    },
    handleHide() {
      this.visible = false
    },
  },
}
</script>

<style scoped>
.active {
  background-color: #6e6e6d;
  color: white;
}
</style>
