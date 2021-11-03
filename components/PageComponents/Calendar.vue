<template>
  <div id="calendar" class="bg-dark">
    <div class="container bg-dark padding">
      <div class="row position-relative mb-5 pb-5">
        <Timer />
      </div>
      <div class="row py-5">
        <div class="col-12">
          <h4 class="text-white">F4 Calendar</h4>
          <UiCarousel :calendar="f4Check" />
        </div>
      </div>
      <div class="row py-5">
        <div class="col-12">
          <h4 class="text-white">GB3 Calendar</h4>
          <UiCarousel :calendar="f3Check" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import UiCarousel from "@/components/UI/Carousel";
import Timer from "@/components/PageComponents/Timer";

export default {
  name: "Calendar",
  components: {
    UiCarousel,
    Timer,
  },
  computed: {
    f4Fixtures() {
      return this.$store.getters["formula4/getFixtures"];
    },
    f3Fixtures() {
      return this.$store.getters["formula3/getFixtures"];
    },
    f3Check() {
      let now = new Date(new Date().toDateString());
      let sorted = this.f3Fixtures;
      sorted.sort(function (a, b) {
        if (moment(a.date).toDate() >= now) {
          return a - b;
        }
      });
      return sorted;
    },
    f4Check() {
      let now = new Date(new Date().toDateString());
      let sorted = this.f4Fixtures;
      sorted.sort(function (a, b) {
        if (moment(a.date).toDate() >= now) {
          return a - b;
        }
      });
      return sorted;
    },
  },
  filters: {
    formatDate(val) {
      if (!val) {
        return "-";
      }
      let date = val;
      return moment(date).format("Do MMM YYYY");
    },
  },
};
</script>

<style scoped lang="scss">
a {
  font-size: 1.2rem;
  padding: 1rem 0;
  font-weight: 700;
}

a:hover,
.nuxt-link-active {
  color: red !important;
}

.track {
  text-decoration: underline;
  font-size: 1rem;
}
.date {
  font-size: 1rem;
  font-weight: 400;
}
// .border.border-light.w-100.text-center {
//   z-index: 2;
// }
@media screen and (max-width: 767px) {
  .border {
    border: none !important;
  }
}
.padding {
  padding: 5rem;
}
</style>
