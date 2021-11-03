<template>
<div>
  <head-header></head-header>
  <Nuxt/>
  <head-footer></head-footer>
</div>
</template>

<script>
export default {
   created() {
    this.$store.dispatch("posts/setPosts");
    this.$store.dispatch("drivers/setDrivers");
    this.$store.dispatch("f3uae/setFixtures");
    this.$store.dispatch("f4uae/setFixtures");
    this.$store.dispatch("gb3/setFixtures");
    this.$store.dispatch("gb4/setFixtures");
    this.$store.dispatch("circuits/setCircuits");
    this.$store.dispatch("images/setImages");
    this.$store.dispatch("carousel/setImages");
    this.$store.dispatch("about/setContent");
    this.$store.dispatch("sim/setContent");
    this.$store.dispatch("f3uaePg/setContent");
    this.$store.dispatch("f4uaePg/setContent");
    this.$store.dispatch("gb3Pg/setContent");
    this.$store.dispatch("gb4Pg/setContent");
  },
}
</script>
