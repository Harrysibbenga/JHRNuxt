<template>
  <div>
    <div class="container">
      <div class="my-4">
        <nuxt-link to="/">
          <mdb-icon icon="arrow-left" />&nbsp; Home
        </nuxt-link>
        <hr />
      </div>
      <b-nav tabs>
        <b-nav-item to="/dashboard/posts/">Posts</b-nav-item>
        <b-nav-item to="/dashboard/drivers/">Drivers</b-nav-item>
        <b-nav-item to="/dashboard/calendars/">Calendars</b-nav-item>
        <b-nav-item to="/dashboard/carousel/">Carousel</b-nav-item>
        <b-nav-item to="/dashboard/gallery/">Gallery</b-nav-item>
        <b-nav-item to="/dashboard/pages/">Pages</b-nav-item>
        <b-nav-item @click="logout">Logout</b-nav-item>
      </b-nav>
    </div>
    <nuxt-child class="pt-3"></nuxt-child>
  </div>
</template>

<script>
import { mdbIcon } from "mdbvue";
import { auth } from "@/services/firebase";

export default {
  components: {
    mdbIcon,
  },
  async fetch ({ store }) {
    await store.dispatch("videoSection/setVideo");
    await store.dispatch("videos/setVideos");
    await store.dispatch("posts/setPosts");
    await store.dispatch("profile/setProfile");
    await store.dispatch("media/setMedia");
    await store.dispatch("calendar/setFixtures");
    await store.dispatch("circuits/setCircuits");
    await store.dispatch("images/setImages");
    await store.dispatch("fanclub/setContent");
    await store.dispatch("partners/setContent");
    await store.dispatch("marketing/setContent");
  },
  methods: {
    logout() {
      auth.signOut().then(() => {
        this.$router.push("/");
      });
    },
  },
};
</script>

<style scoped>
.nav-link {
  color: black;
}
.nav-tabs {
  border-bottom: 0.25rem solid black;
}
.nav-tabs .nav-link:focus {
  border-color: black;
}
.nav-tabs .nav-link:hover {
  border-color: red;
}
a {
  color: black;
}
a:hover {
  color: red;
}
</style>
