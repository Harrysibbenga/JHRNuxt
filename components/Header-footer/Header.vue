<template>
  <header id="header" class="mx-auto">
    <b-navbar toggleable="md" class="p-0 bg-white">
      <b-navbar-toggle target="navbar-toggle-collapse" class="ml-4">
        <template v-slot:default="{ expanded }">
          <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
          <b-icon v-else icon="chevron-bar-down"></b-icon>
        </template>
      </b-navbar-toggle>

      <b-navbar-brand to="/home" v-if="slideDown" class="d-md-none">
        <img src="../../assets/jhr.png" alt="JHR logo" class="img-fluid" width="200px" />
      </b-navbar-brand>

      <b-collapse id="navbar-toggle-collapse" is-nav class="d-md-flex justify-content-md-between">
        <transition name="slide-left">
          <b-navbar-nav class="d-md-flex justify-content-md-around text-center" v-if="slideLeft">
            <b-nav-item to="about" class="about">About</b-nav-item>

            <b-nav-item to="/news" class="news">News</b-nav-item>

            <b-nav-item to="/drivers" class="drivers">Drivers</b-nav-item>
          </b-navbar-nav>
        </transition>

        <transition name="slide">
          <b-navbar-brand to="/" v-if="slideDown" class="d-none d-md-block">
            <img src="../../assets/jhr.png" alt="JHR logo" class="img-fluid" width="200px" />
          </b-navbar-brand>
        </transition>

        <transition name="slide-right">
          <b-navbar-nav class="d-md-flex justify-content-md-around text-center" v-if="slideRight">
            <b-nav-item to="/simulator" class="simulator">Simulator</b-nav-item>

            <b-nav-item to="/gb3" class="f3">GB3</b-nav-item>

            <b-nav-item to="/f4" class="f4">F4</b-nav-item>
          </b-navbar-nav>
        </transition>

        <div class="w-100 bg-dark d-md-none">
          <div class="text-center pt-3">
            <img src="../../assets/jhr.png" alt="JHR logo" class="img-fluid" width="200px" />
            <p class="text-secondary">
              Steven Hunter
              <br />JHR Developments
              <br />Hunter Park
              <br />Callywhite Lane
              <br />Dronfield
              <br />Derbyshire
              <br />S18 2XR
              <br />
            </p>
            <p class="text-secondary">
              <span class="text-white">Phone:</span> 07803 669 894
            </p>

            <p class="text-secondary">
              <span class="text-white">Email:</span>
              <a
                class="text-secondary"
                href="mailto:Steven@JHRdevelopments.com"
              >Steven@JHRdevelopments.com</a>
            </p>
            <div class="container-fluid text-center">
              <div class="row mx-auto py-4">
                <div class="col-4">
                <a href="https://twitter.com/JHRdevelopments" target="_blank">
                  <img
                    src="../../assets/facebook-square-brands-white.png"
                    class="img-fluid"
                    width="35px"
                  />
                </a>
              </div>
              <div class="col-4">
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
              <div class="col-4">
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
          </div>
        </div>
      </b-collapse>
    </b-navbar>
  </header>
</template>

<script>
export default {
  data() {
    return {
      slideDown: false,
      slideLeft: false,
      slideRight: false,
    };
  },
  name: "Header",
  methods: {},
  mounted() {
    this.slideDown = true;
    this.slideLeft = true;
    this.slideRight = true;
  },
};
</script>

<style scoped lang="scss">
.col-4 {
  img:hover {
    background-color: red;
    transform: scale(1.2);
  }
  img {
    transition: all 0.5s ease-in-out;
  }
}

.nuxt-link-active {
  color: red !important;
}

ul {
  li a {
    font-size: 1.2rem;
    padding: 1rem 0;
    font-weight: 700;
  }
}

@media (max-width: 767px) {
  #navbar-toggle-collapse {
    border-top: 0.25rem solid #6e6e6d;
    background-color: #e4e4e4;
  }
}

@media (min-width: 768px) {
  #navbar-toggle-collapse {
    width: 100%;
    ul {
      width: 50%;
    }
  }
}
// slide-down
.slide-enter-active {
  transition: all 1.5s ease;
}
.slide-leave-active {
  transition: all 1.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-enter, .slide-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(-100px);
  opacity: 0;
}
// slide-left
.slide-left-enter-active {
  transition: all 2s ease;
}
.slide-left-leave-active {
  transition: all 2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-left-enter, .slide-left-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(100px);
  opacity: 0;
}
// slide-right
.slide-right-enter-active {
  transition: all 2s ease;
}
.slide-right-leave-active {
  transition: all 2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-right-enter, .slide-right-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(-100px);
  opacity: 0;
}
</style>
