<template>
  <div id="latest" class="py-2">
    <div class="container-md py-md-5">
      <div class="row no-gutters rgba-black-strong">
        <div class="col-12 col-md-5 col-lg-6 my-auto image">
          <img :src="post.url" :alt="post.alt" class="img-fluid" />
        </div>
        <div class="col-12 col-md-7 col-lg-6 m-auto p-5 pl-xl-0">
          <div class="text-center">
              <h2 class="pb-3 text-white">In-house race simulator</h2>
              <p class="text-white">{{ content }}</p>
              <nuxt-link to="/simulator" class="text-danger">More info</nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Latest",
  computed: {
    post() {
      return this.$store.getters["sim/getContent"]
    },
    content() {
      var html = this.post.content;
      var div = document.createElement("div");
      div.innerHTML = html;
      return this.truncateString(div.innerText, 250)
    }
  },
  methods: {
    truncateString(str, num) {
      if (str.length <= num) {
        return str
      }
      return str.slice(0, num) + '...'
    }
  }
};
</script>

<style scoped lang="css">
  @media screen and (max-width: 768px){
    .image {
      text-align: center;
    }
  }
</style>
