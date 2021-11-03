<template>
  <div class="container-fluid" style="height: 1000px">
    <div class="row background">
        <div class="d-flex flex-column text-center flex-center col-12 mt-5">
          <h2 class="text-light">Keep up to date with our latest content</h2>
          <button class="btn btn-secondary" @click="open()">Subscribe</button>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "MailingList",
  methods: {
    open() {
      this.$store.dispatch("global/setModal", true);
    },
  },
};
</script>

<style lang="css" scoped>
  .background {
    background: url('../../assets/l4_Pulling-01.jpg');
    background-size: cover;
    height: 100%;
  }
</style>