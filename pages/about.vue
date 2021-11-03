<template>
  <div>
    <Header></Header>
    <div id="about" class="container-fluid">
      <div class="row">
        <div class="col-12 col-md-6 offset-md-3 offset-lg-0 col-lg-4 p-5 px-md-0 py-md-5 p-lg-5">
          <img :src="about.url" class="img-fluid" :alt="about.alt" />
        </div>
        <div class="col-12 col-lg-8 px-md-5 p-lg-5">
          <div class="pb-5">
            <div class="col-12 pt-3 text-justify" v-html="about.content"></div>
          </div>
          <contact-modal></contact-modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LayoutDefault from "@/layouts/default"

export default {
  computed: {
    about() {
      return this.$store.getters["about/getContent"];
    },
  },
  created() {
    this.$emit('update:layout', LayoutDefault);
  },
};
</script>
