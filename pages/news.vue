<template>
  <div>
    <Header></Header>
    <div id="news">
      <div class="container-fluid">
        <div class="row d-flex flex-row py-5 flex-center">
            <button class="btn" :class="{ active: isActive == 'all' }" @click="filter('all')">All</button>
            <button
              v-for="(year, index) in years"
              :key="index"
              class="btn"
              :class="{ active: isActive == year }"
              @click="filter(year)"
            >{{year}}</button>
        </div>
        <transition name="fade">
          <div class="row" v-if="transition">
            <div
              class="col-12 col-md-6 col-lg-4 p-0"
              v-for="(post, index) in paginatedData"
              :key="index"
            >
              <div class="view overlay zoom">
                <img :src="post.url" :alt="post.alt" class="img-fluid" @load="getImage(post.imgId)" />
                <div
                  class="mask rgba-black-strong d-flex flex-column justify-content-end pb-4 pl-4"
                >
                  <h2 class="text-white">{{ post.title }}</h2>
                  <p class="text-white">{{ post.date | formatDate }}</p>
                  <nuxt-link :to="{ name: 'post-slug', params: { slug: post.slug } }" class="text-danger">More info</nuxt-link>
                </div>
              </div>
            </div>
            <div class="col-12 text-center">
              <mdb-btn :class="{ 'd-none': pageNumber == 0 }" @click="prevPage" color="primary">
                <mdb-icon icon="angle-double-left" />
              </mdb-btn>
              <mdb-btn
                :class="{ 'd-none': pageNumber >= pageCount - 1 }"
                @click="nextPage"
                color="primary"
              >
                <mdb-icon icon="angle-double-right" />
              </mdb-btn>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mdbIcon, mdbBtn } from "mdbvue";
import moment from "moment";
import { imageCollection } from "@/services/firebase";

export default {
  name: "News",
  components: {
    mdbIcon,
    mdbBtn,
  },
  filters: {
    formatDate(val) {
      if (!val) {
        return "-";
      }
      const date = val;
      return moment(date).format("Do MMM YYYY");
    },
  },
  props: {
    size: {
      type: Number,
      required: false,
      default: 6,
    },
  },
  data() {
    return {
      isActive: null,
      pageNumber: 0,
      postsVw: [],
      transition: false,
      post: {
        img: "",
        alt: "",
      },
    };
  },
  computed: {
    posts: {
      get () {
        return this.postsVw;
      },
      set (newValue) {
        return newValue;
      },
    },
    years() {
      const allPosts = this.$store.getters["posts/getPublishedPosts"];
      const years = [...new Set(allPosts.map((item) => item.year))];
      return years;
    },
    pageCount() {
      const l = this.posts.length;
        const s = this.size;
      return Math.ceil(l / s);
    },
    paginatedData() {
      const start = this.pageNumber * this.size;
        const end = start + this.size;
      return this.posts.slice(start, end);
    },
  },
  created() {
    this.isActive = "all";
  },
  mounted() {
    setTimeout(() => {
      this.postsVw = this.$store.getters["posts/getPublishedPosts"];
      this.transition = true;
    }, 500);
  },
  methods: {
    filter(value) {
      if (value === "all") {
        this.isActive = "all";
        this.transition = false;
        this.pageNumber = 0;
        setTimeout(() => {
          this.postsVw = this.$store.getters["posts/getPublishedPosts"];
          this.transition = true;
        }, 500);
      } else {
        this.isActive = value;
        this.$store.dispatch("posts/setPostsByYear", value);
        this.transition = false;
        this.pageNumber = 0;
        setTimeout(() => {
          this.postsVw = this.$store.getters["posts/getPostsByYear"];
          this.transition = true;
        }, 500);
        console.log(this.posts);
      }
    },
    getImage(id) {
      imageCollection
        .doc(id)
        .get()
        .then((doc) => {
          this.post.img = doc.data().url;
          this.post.alt = doc.data().alt;
        });
    },
    nextPage() {
      this.pageNumber++;
    },
    prevPage() {
      this.pageNumber--;
    },
  },
};
</script>

<style scoped>
.active {
  background-color: black;
  color: white;
}
</style>
