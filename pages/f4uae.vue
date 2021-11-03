<template>
  <div>
    <Header></Header>
    <div id="about" class="container-fluid">
      <div class="row">
        <div class="col-12 col-lg-4 p-5 order-1 text-center">
          <h3 class="mx-5">Calendar</h3>
          <div class="d-flex flex-column px-5 pt-1">
            <div v-for="(fixture,index) in fixtures" :key="index">
              <p class="date">{{ fixture.date|formatDate }}</p>
              <h5 class="track">{{fixture.circuit.title}}</h5>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-8 bg-white p-md-5 order-0">
          <img :src="content.img_1.url" class="img-fluid" :alt="content.img_1.alt" />
          <div class="p-5">
            <div class="col-12 pt-3 text-justify" v-html="content.content"></div>
          </div>
          <div class="row">
            <div class="col-6">
              <img :src="content.img_2.url" class="img-fluid" :alt="content.img_2.alt" />
            </div>
            <div class="col-6">
              <img :src="content.img_3.url" class="img-fluid" :alt="content.img_3.alt" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { mdbSticky } from "mdbvue";
export default {
  directives: {
    sticky: mdbSticky,
  },
  filters: {
    formatDate(val) {
      if (!val) {
        return "-";
      }
      const date = val;
      return moment(date).format("Do MMM YYYY");
    },
  },
  computed: {
    fixtures() {
      return this.$store.getters["f4uae/getFixtures"];
    },
    content() {
      return this.$store.getters["f4uaePg/getContent"];
    },
  },
};
</script>
