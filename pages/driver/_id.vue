<template>
  <div>
    <div id="driver">
      <div class="container-fluid">
        <div class="row">
          <div class="col-6 d-flex flex-center p-0 my-auto">
            <img :src="driver.social.url" :alt="driver.social.alt" class="img-fluid" />
          </div>
          <div class="col-6 d-flex flex-column flex-center p-0 my-auto">
            <h3>
              {{driver.firstName}}
              {{driver.lastName}}
            </h3>
            <p>
              <b>DOB:</b>
              {{driver.dob}}
            </p>
            <p>
              <b>Lives:</b>
              {{driver.lives}}
            </p>
            <p>
              <b>Race number:</b>
              {{driver.raceNumber}}
            </p>
            <p class="text-center">
              <b>Sponsors:</b>
              {{driver.sponsors}}
            </p>
            <div class="social-icons">
              <a
                class="p-1"
                :href="driver.social.platforms.facebook"
                target="_blank"
                v-if="driver.social.platforms.facebook != ''"
              >
                <mdb-icon size="lg" fab icon="facebook-square" />
              </a>
              <a
                class="p-1"
                :href="driver.social.platforms.insta"
                target="_blank"
                v-if="driver.social.platforms.insta != ''"
              >
                <mdb-icon size="lg" fab icon="instagram" />
              </a>
              <a
                class="p-1"
                v-if="driver.social.platforms.twitter != ''"
                :href="driver.social.platforms.twitter"
                target="_blank"
              >
                <mdb-icon size="lg" fab icon="twitter-square" />
              </a>
              <a
                class="p-1"
                v-if="driver.social.platforms.website != ''"
                :href="driver.social.platforms.website"
                target="_blank"
              >
                <mdb-icon size="lg" icon="globe" />
              </a>
              <a
                class="p-1"
                v-if="driver.social.platforms.gplus != ''"
                :href="driver.social.platforms.gplus"
                target="_blank"
              >
                <mdb-icon size="lg" fab icon="google-plus-square" />
              </a>

              <a
                class="p-1"
                v-if="driver.social.platforms.twitch != ''"
                :href="driver.social.platforms.twitch"
                target="_blank"
              >
                <mdb-icon size="lg" fab icon="twitch" />
              </a>
              <a
                class="p-1"
                v-if="driver.social.platforms.pinterest != ''"
                :href="driver.social.platforms.pinterest"
                target="_blank"
              >
                <mdb-icon size="lg" fab icon="pinterest" />
              </a>
              <a
                class="p-1"
                v-if="driver.social.platforms.youtube != ''"
                :href="driver.social.platforms.youtube"
                target="_blank"
              >
                <mdb-icon size="lg" fab icon="youtube" />
              </a>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-6 d-flex flex-center my-auto p-5 p-0">
            <div v-html="driver.career.content"></div>
          </div>
          <div class="col-6 d-flex flex-center my-auto p-0">
            <img :src="driver.career.url" :alt="driver.career.alt" class="img-fluid" />
          </div>
        </div>
        <div class="row">
          <div class="col-6 d-flex flex-center p-0 my-auto">
            <img :src="driver.bio.url" :alt="driver.bio.alt" class="img-fluid" />
          </div>
          <div class="col-6 d-flex flex-center p-0 px-5 my-auto">
            <div v-html="driver.bio.content"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mdbIcon } from "mdbvue";

export default {
  name: "Driver",
  components: {
    mdbIcon,
  },
  data() {
    return {
      id: '',
    }
  },
  async fetch({ store, route }) {
    this.id = route.params.id;
    await store.dispatch("drivers/setDriver", this.id);
  },
  head() {
    const driver = this.$store.getters['drivers/getDriver']
    return {
      title: driver.firstname + " " + driver.lastname,
      meta: [
        {
          hid: 't-type',
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          hid: 'og-title',
          property: 'og:title',
          content: driver.firstname + " " + driver.lastname,
        },
        {
          hid: 'og-desc',
          property: 'og:description',
          content: driver.firstname + " " + driver.lastname + " Driver page",
        },
        {
          hid: 'og-url',
          property: 'og:url',
          content: 'https://jhrdevelopments.com/driver/' + this.id,
        },
        {
          hid: 'og-image',
          property: 'og:image',
          content: driver.social.url,
        },
        {
          hid: 'og-site_name',
          property: 'og:site_name',
          content: 'JHR Developments | Official Website',
        },
        { hid: 'og-type', property: 'og:type', content: 'post' },
        { name: 'robots', content: 'index,follow' },
        {
          hid: 'description',
          name: 'description',
          content: driver.firstname + " " + driver.lastname + " Driver page",
        },
      ],
    }
  },
  computed: {
    driver() {
      return this.$store.getters["drivers/getDriver"];
    },
  },
  created() {
    let id = this.$route.params.id;
    this.$store.dispatch("drivers/setDriver", id);
  },
  destroyed() {
    this.$store.commit("drivers/clearDriver");
  },
};
</script>
