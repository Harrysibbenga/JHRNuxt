<template>
  <div>
    <footer class="bg-secondary bottom">
      <div class="container">
        <div class="row pt-3">
          <div class="col-12 col-md-6 col-lg-4 text-center my-auto">
            <img src="../../assets/jhr.png" alt="JHR logo" class="img-fluid mb-4" width="300px" />
             <div class="py-3"></div>
            <div class="d-flex flex-row px-5 pb-3 justify-content-center">
              <div class="p-2">
                <a href="https://twitter.com/JHRdevelopments" target="_blank">
                  <img
                    src="../../assets/facebook-square-brands-white.png"
                    class="img-fluid"
                    width="35px"
                  />
                </a>
              </div>
              <div class="p-2">
                <a href="https://www.instagram.com/jhr.developments/" target="_blank">
                  <span>
                    <img
                      src="../../assets/instagram-square-brands-white.png"
                      class="img-fluid"
                      width="35px"
                    />
                  </span>
                </a>
              </div>
              <div class="p-2">
                <a href="https://www.facebook.com/jhrdevelopments" target="_blank">
                  <img
                    src="../../assets/twitter-square-brands-white.png"
                    class="img-fluid"
                    width="35px"
                  />
                </a>
              </div>
            </div>
          </div>
          <div class="text-center pt-2 pb-4 col-12 col-md-6 col-lg-4">
            <h3 class="text-white">Contact</h3>
            <p class="text-white">
              Steven Hunter
              <br />JHR Developments
              <br />Hunter Park
              <br />Callywhite Lane
              <br />Dronfield
              <br />Derbyshire
              <br />S18 2XR
              <br />
            </p>
            <p class="text-white">
              <span class="text-white">Phone:</span> 07803 669 894
            </p>

            <p class="text-white">
              <span class="text-white">Email:</span>
              <a
                class="text-white"
                href="mailto:Steven@JHRdevelopments.com"
              >Steven@JHRdevelopments.com</a>
            </p>
          </div>
          <div class="col-12 col-lg-4 my-auto">
      <div class="footer-copyright py-2 px-5 bg-secondary">
        <mdb-container class="d-flex flex-center flex-lg-column justify-content-around">
          <div class="text-white text-center">
            <p>Powered by</p>
            <img :src="require('../../assets/Torquelogo.png')" alt="Torque motorsport logo" />
          </div>
          <div class="py-3"></div>
          <div class="text-white text-center">
            &copy; 2020 Copyright:
            <a
              href="http://www.torquetogether.com/"
              target="_blank"
              class="text-white"
            >Torque Motorsport Ltd</a>
          </div>

        </mdb-container>
      </div>
          </div>
        </div>
      </div>

    </footer>
  </div>
</template>

<script>
import { mdbContainer } from "mdbvue";
export default {
  name: "Footer",
  components: {
    mdbContainer,
  },
};
</script>

<style scoped lang="scss">
.d-flex {
  img:hover {
    transform: scale(1.2);
  }
  img {
    transition: all 0.5s ease-in-out;
  }
}
p {
  line-height: 2rem;
}
a:hover {
  color: red !important;
}
</style>
