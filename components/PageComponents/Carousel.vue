<template>
  <div id="carousel-section">
    <UiCarousel
      :items="posts"
      :type="'post'"
    ></UiCarousel>
  </div>
</template>

<script>
import UiCarousel from '@/components/UI/PostCarousel'

export default {
  name: "Carousel",
  components: {
    UiCarousel,
  },
  computed: {
    posts() {
      return this.$store.getters["posts/getPosts"].slice(0, 4);
    },
  },
};
</script>

