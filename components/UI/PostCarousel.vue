<template>
  <hooper :settings="hooperSettings" class="height-carousel" v-if="type == 'post'">
    <slide v-for="(post,index) in items" :key="index">
      <div class="row no-gutters">
        <div class="col-12 col-md-10 col-lg-8 mx-auto">
          <img :src="post.url" :alt="post.alt" class="img-fluid" />
        </div>
        <div class="col-12 col-lg-4 my-auto p-5 text-container">
          <div class="text-center height-content">
              <h2 class="text-white">{{ post.title }}</h2>
              <p class="text-white">{{ post.date | formatDate }}</p>
              <nuxt-link :to="{ name: 'post-slug', params: { slug: post.slug } }" class="text-danger">More info</nuxt-link>
          </div>
        </div>
      </div>
    </slide>
    <hooper-navigation slot="hooper-addons"></hooper-navigation>
    <hooper-pagination slot="hooper-addons"></hooper-pagination>
  </hooper>

  <hooper :settings="hooperSettings" style="height:800px" :hoverPause="false" v-else>
    <slide v-for="(post,index) in items" :key="index">
        <img :src="post.url" :alt="post.alt" class="img-fluid" />
    </slide>
  </hooper>
</template>

<script>
import { Hooper, Slide, Navigation as HooperNavigation, Pagination as HooperPagination, } from 'hooper';
import 'hooper/dist/hooper.css';
import moment from "moment";

export default {
  name: 'LatestCarousel',
  components: {
    Hooper,
    HooperNavigation,
    HooperPagination,
    Slide
  },
  props: {
      items:{
          type: Array,
          default: () => [],
      },
      type:{
          type: String,
          default: 'default',
      }
  },
  data() {
    return {
      hooperSettings: {
        itemsToShow: 1,
        centerMode: true,
        infiniteScroll: true,
        mouseDrag: false,
        wheelControl: false,
        shortDrag: false,
        autoPlay: true,
        transition: 500,
      }
    };
  },
  filters: {
    formatDate(val) {
      if (!val) {
        return "-";
      }
      let date = val;
      return moment(date).format("Do MMM YYYY");
    },
  },
};
</script>

<style lang="css" scoped>
  .height-carousel {
    height: 900px !important;
  }
  .height-content {
    height: 500px;
  }
  .text-container {
    background-color: rgba(0, 0, 0, 0.7);
  }

  @media (min-width: 768px) {
     .height-carousel {
      height: 850px !important;
    }
  }
  @media (min-width: 992px) {
     .height-carousel {
      height: 500px !important;
    }
    .row {
      background-color: rgba(0, 0, 0, 0.7);
    }
    .text-container {
      background-color: transparent;
    }
    .height-content {
      height: auto;
    }
  }
  @media (min-width: 1440px) {
     .height-carousel {
      height: 800px !important;
    }
  }
  @media (min-width: 1960px) {
     .height-carousel {
      height: 1000px !important;
    }
  }
</style>
