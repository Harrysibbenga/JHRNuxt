<template>
  <div>
    <Header></Header>

    <div id="drivers">
      <div class="container-fluid">
        <div class="row overflow-hidden">
          <div class="col-12 p-0" v-for="(driver, index) in drivers" :key="index">
            <nuxt-link :to="{ name: 'driver-id', params: { id: driver.id } }">
              <div class="view overlay zoom">
                <img :src="driver.headline.url" :alt="driver.headline.alt" class="img-fluid" />
                <div
                  class="mask rgba-black-strong d-flex flex-column justify-content-end pb-4 pl-4"
                >
                  <h2 class="text-white">{{ driver.firstName }} {{ driver.lastName }}</h2>
                </div>
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Drivers",
  computed: {
    drivers() {
      return this.$store.getters["drivers/getDrivers"];
    },
  },
};
</script>

<style lang="css" scoped>
a {
  cursor: pointer;
}
</style>
