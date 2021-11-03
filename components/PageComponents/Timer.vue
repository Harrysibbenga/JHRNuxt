<template>
    <div class="timer-cont">
      <div class="d-flex flex-column flex-md-row flex-center">
        <div class="timer mt-1">
          <timer :deadline="upcomingF3Event" :race="'F3'"></timer>
        </div>
        <div class="timer mt-1">
          <timer :deadline="upcomingF4Event" :race="'F4'"></timer>
        </div>
      </div>
    </div>
</template>

<script>
import Timer from "../UI/Timer";
import moment from "moment";
export default {
     data() {
    return {
      f3Date: "",
      f4Date: "",
    };
  },
   components: {
    Timer,
  },
computed: {
    f3Fixtures() {
      return this.$store.getters["formula3/getFixtures"];
    },
    f4Fixtures() {
      return this.$store.getters["formula4/getFixtures"];
    },
    upcomingF3Event() {
      let now = new Date(new Date().toDateString());
      let ongoing = [];
      let results = "";
      this.f3Fixtures.forEach((fixture) => {
        if (moment(fixture.date).toDate() > now) {
          ongoing.push(fixture);
        } else if (moment(fixture.date).toDate() === now) {
          ongoing.push(fixture);
        }
      });
      if (ongoing[0] == undefined) {
        results = "";
      } else {
        results = ongoing[0].date;
      }
      return results;
    },
    upcomingF4Event() {
      let now = new Date(new Date().toDateString());
      let ongoing = [];
      let results = "";
      this.f4Fixtures.forEach((fixture) => {
        if (moment(fixture.date).toDate() > now) {
          fixture.ongoing = true;
          ongoing.push(fixture);
        }
      });
      if (ongoing[0] == undefined) {
        results = "";
      } else {
        results = ongoing[0].date;
      }
      return results;
    },
  },
};
</script>

<style lang="scss" scoped>
@media (min-width: 768px) {
  .timer-cont {
    position: absolute;
    top: 0;
    left: 50%;
    right: 50%;
    z-index: 2;
  }
}
</style>
