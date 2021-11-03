<template>
  <div>
    <transition name="fade">
      <div v-if="showing" class="loading">
        <div class="position-relative d-flex flex-center">
          Loading
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
// import { Socket } from "vue-loading-spinner";
export default {
  // components: {
  //   Socket,
  // },
  props: {
    show: {
      type: Boolean,
      default: false
   },
  },
  data() {
    return {
      showing: false,
    };
  },
  computed: {
    getLoading() {
      return this.$store.getters["global/getLoading"];
    },
  },
  watch: {
    getLoading (val) {
      if (val) {
        console.log("start fired");
        this.start();
      } else {
        console.log("stop fired");
        this.stop();
      }
    },
  },
  methods: {
    showProgress(show) {
      this.showing = show;
    },
    start() {
      this.showProgress(true);
    },
    stop() {
      setTimeout(() => {
        this.showProgress(false);
      }, 250);
    },
  },
};
</script>

