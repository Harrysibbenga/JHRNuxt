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
    this.$store.dispatch("videoSection/setVideo");
    this.$store.dispatch("videos/setVideos");
    this.$store.dispatch("posts/setPosts");
    this.$store.dispatch("profile/setProfile");
    this.$store.dispatch("media/setMedia");
    this.$store.dispatch("calendar/setFixtures");
    this.$store.dispatch("circuits/setCircuits");
    this.$store.dispatch("images/setImages");
    this.$store.dispatch("fanclub/setContent");
    this.$store.dispatch("partners/setContent");
    this.$store.dispatch("marketing/setContent");
  },
}
</script>
