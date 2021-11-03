<template>
  <div>
    <form @submit.prevent="submitForm" class="pt-2 d-flex flex-column">
      <mdb-container>
        <mdb-row>
          <mdb-col class="col-12 text-center pb-3 pt-2">
            <h3 class="pb-3">Driver Images</h3>
            <mdb-container fluid>
              <mdb-row>
                <mdb-col class="col-3">
                  <img
                    v-if="headline.url"
                    :src="headline.url"
                    :alt="headline.alt"
                    class="img-fluid"
                  />

                  <img v-else :src="defaultImage" alt="Placeholder image" class="img-fluid" />
                  <mdb-btn @click="headlineImage(false)">Headline image</mdb-btn>
                </mdb-col>
                <mdb-col class="col-3">
                  <img v-if="social.url" :src="social.url" :alt="social.alt" class="img-fluid" />

                  <img v-else :src="defaultImage" alt="Placeholder image" class="img-fluid" />
                  <mdb-btn @click="socialImage(false)">Social image</mdb-btn>
                </mdb-col>
                <mdb-col class="col-3">
                  <img v-if="career.url" :src="career.url" :alt="career.alt" class="img-fluid" />

                  <img v-else :src="defaultImage" alt="Placeholder image" class="img-fluid" />
                  <mdb-btn @click="careerImage(false)">Career image</mdb-btn>
                </mdb-col>
                <mdb-col class="col-3">
                  <img v-if="bio.url" :src="bio.url" :alt="bio.alt" class="img-fluid" />

                  <img v-else :src="defaultImage" alt="Placeholder image" class="img-fluid" />
                  <mdb-btn @click="bioImage(false)">Bio image</mdb-btn>
                </mdb-col>
              </mdb-row>
            </mdb-container>
          </mdb-col>

          <mdb-col class="col-12">
            <div class="row">
              <div class="md-form col-6">
                <mdb-input label="First Name" inline v-model.trim="firstName" />
              </div>
              <div class="md-form col-6">
                <mdb-input label="Last Name" inline v-model.trim="lastName" />
              </div>
            </div>

            <div class="row">
              <div class="md-form col-6">
                <mdb-input label="Lives" inline v-model.trim="lives" />
              </div>
              <div class="md-form col-6">
                <mdb-input label="DOB" inline v-model.trim="dob" />
              </div>
            </div>

            <div class="row">
              <div class="md-form col-6">
                <mdb-input label="Race number" inline v-model.trim="raceNumber" />
              </div>
              <div class="md-form col-6">
                <mdb-input label="Sponsors" inline v-model.trim="sponsors" />
              </div>
            </div>
          </mdb-col>

          <mdb-col class="col-12 text-center pb-4">
            <mdb-popover trigger="click" :options="{placement: 'bottom'}">
              <span slot="header">Facebook link</span>
              <mdb-input slot="body" label="Facebook link" v-model="social.platforms.facebook"></mdb-input>
              <mdb-btn slot="reference">Facebook</mdb-btn>
            </mdb-popover>
            <mdb-popover trigger="click" :options="{placement: 'bottom'}">
              <span slot="header">insta link</span>
              <mdb-input slot="body" label="insta link" v-model="social.platforms.insta"></mdb-input>
              <mdb-btn slot="reference">insta</mdb-btn>
            </mdb-popover>
            <mdb-popover trigger="click" :options="{placement: 'bottom'}">
              <span slot="header">Twitter link</span>
              <mdb-input slot="body" label="Twitter link" v-model="social.platforms.twitter"></mdb-input>
              <mdb-btn slot="reference">Twitter</mdb-btn>
            </mdb-popover>
            <mdb-popover trigger="click" :options="{placement: 'bottom'}">
              <span slot="header">Google+ link</span>
              <mdb-input slot="body" label="Gplus link" v-model="social.platforms.gplus"></mdb-input>
              <mdb-btn slot="reference">Google+</mdb-btn>
            </mdb-popover>
            <mdb-popover trigger="click" :options="{placement: 'bottom'}">
              <span slot="header">Twitch link</span>
              <mdb-input slot="body" label="Twitch link" v-model="social.platforms.twitch"></mdb-input>
              <mdb-btn slot="reference">Twitch</mdb-btn>
            </mdb-popover>
            <mdb-popover trigger="click" :options="{placement: 'bottom'}">
              <span slot="header">Pinterest link</span>
              <mdb-input slot="body" label="Pinterest link" v-model="social.platforms.pinterest"></mdb-input>
              <mdb-btn slot="reference">Pinterest</mdb-btn>
            </mdb-popover>
            <mdb-popover trigger="click" :options="{placement: 'bottom'}">
              <span slot="header">Youtube link</span>
              <mdb-input slot="body" label="Youtube link" v-model="social.platforms.youtube"></mdb-input>
              <mdb-btn slot="reference">Youtube</mdb-btn>
            </mdb-popover>
          </mdb-col>

          <mdb-col class="col-6">
            <h3 class="text-center">Career Highlights</h3>
            <app-editor2 :content.sync="career.content"></app-editor2>
          </mdb-col>

          <mdb-col class="col-6">
            <h3 class="text-center">Bio</h3>
            <app-editor2 :content.sync="bio.content"></app-editor2>
          </mdb-col>
        </mdb-row>
        <mdb-col class="col-12 pt-3">
          <mdb-btn type="submit">Add Driver</mdb-btn>
        </mdb-col>
      </mdb-container>
    </form>

    <transition name="fade">
      <div
        v-if="msg.message != ''"
        :class="`bg-${msg.type}`"
        class="pl-5 mt-4 text-white text-center"
      >
        <p>{{ msg.message }}</p>
      </div>
    </transition>

    <mdb-container fluid class="pt-5">
      <mdb-row>
        <mdb-col>
          <table class="table">
            <thead class="black text-white">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">DOB</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(driver, index) in paginatedData" :key="index">
                <th scope="row">{{ driver.firstName }} {{ driver.lastName }}</th>
                <td>{{ driver.dob }}</td>
                <td>
                  <a @click="editDriver(driver)" class="mr-1">
                    <mdb-icon icon="edit" />
                  </a>
                  <a @click="deleteDriver(driver)" class="ml-1">
                    <mdb-icon icon="trash-alt" />
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </mdb-col>
        <mdb-col class="col-12 text-center">
          <mdb-btn :class="{ 'd-none': pageNumber == 0 }" @click="prevPage" color="primary">
            <mdb-icon icon="angle-double-left" />
          </mdb-btn>
          <mdb-btn
            :class="{ 'd-none': pageNumber >= pageCount - 1 }"
            @click="nextPage"
            color="primary"
          >
            <mdb-icon icon="angle-double-right" />
          </mdb-btn>
        </mdb-col>
      </mdb-row>
    </mdb-container>

    <!-- deleteModal -->
    <mdb-modal
      frame
      position="top"
      direction="top"
      :show="deleteModal"
      @close="deleteModal = false"
    >
      <mdb-modal-body class="text-center">
        <span class="text-danger">Are you sure you want to delete this driver</span>
        {{ toDeleteDriver.firstName }} {{ toDeleteDriver.lastName }}
        <mdb-btn color="secondary" @click.native="cancelDelete">Close</mdb-btn>
        <mdb-btn color="danger" @click="confirmDelete">Delete</mdb-btn>
      </mdb-modal-body>
    </mdb-modal>

    <!-- existsModal -->
    <mdb-modal size="md" :show="existsModal" @close="existsModal = false">
      <mdb-modal-header>
        <mdb-modal-title>Image exists with that name</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <div class="row col-12 col-md-6 col-lg-4 py-3">
          <p>Would you like to use this one ?</p>
        </div>
        <img :src="img.content.url" :alt="img.content.alt" class="img-fluid" />
      </mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn color="secondary" size="sm" @click.native="declineUse">No</mdb-btn>
        <mdb-btn color="primary" size="sm" @click="confirmUse">Yes</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>

    <!-- uploadImage -->
    <mdb-modal size="md" :show="uploadImage" @close="closeImageUpload">
      <mdb-modal-header>
        <mdb-modal-title>Upload image</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <div class="row">
          <div class="col-12">
            <div class="md-form">
              <mdb-input label="Description" inline v-model.trim="img.alt" />
            </div>
          </div>
          <div class="col-12">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text" id="imageInput">Upload</span>
              </div>
              <div class="custom-file">
                <input
                  type="file"
                  class="custom-file-input"
                  id="imageInput"
                  aria-describedby="imageInput"
                  @change="checkFile($event)"
                  ref="imageInput"
                  accept="image/jpeg image/png"
                />
                <label
                  class="custom-file-label"
                  for="inputGroupFile01"
                  v-if="file.name"
                >{{ file.name }}</label>
                <label class="custom-file-label" for="inputGroupFile01" v-else>Image</label>
              </div>
            </div>
          </div>
        </div>
      </mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn color="secondary" size="sm" @click.native="closeImageUpload">Close</mdb-btn>
        <mdb-btn color="primary" size="sm" :disabled="img.alt == ''" @click="saveFile(type)">Save</mdb-btn>
      </mdb-modal-footer>
      <transition name="fade">
        <div
          v-if="uploadMsg.message != ''"
          :class="`bg-${uploadMsg.type}`"
          class="text-white text-center"
        >
          <p>{{ uploadMsg.message }}</p>
        </div>
      </transition>
    </mdb-modal>
    <!-- edit modal  -->
    <mdb-modal top position="top" fullHeight direction="top" :show="editModal" @close="cancelEdit">
      <mdb-modal-header>
        <mdb-modal-title>{{ clickedDriver.firstName }} {{ clickedDriver.lastName }}</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <mdb-container fluid>
          <mdb-row>
            <mdb-col class="col-12 text-center pb-3 pt-2">
              <h3 class="pb-3">Driver Images</h3>
              <mdb-container fluid>
                <mdb-row>
                  <mdb-col class="col-3">
                    <img
                      :src="clickedDriver.headline.url"
                      :alt="clickedDriver.headline.alt"
                      class="img-fluid"
                    />
                    <mdb-btn @click="headlineImage(true)">Headline image</mdb-btn>
                  </mdb-col>
                  <mdb-col class="col-3">
                    <img
                      :src="clickedDriver.social.url"
                      :alt="clickedDriver.social.alt"
                      class="img-fluid"
                    />

                    <mdb-btn @click="socialImage(true)">Social image</mdb-btn>
                  </mdb-col>
                  <mdb-col class="col-3">
                    <img
                      :src="clickedDriver.career.url"
                      :alt="clickedDriver.career.alt"
                      class="img-fluid"
                    />

                    <mdb-btn @click="careerImage(true)">Career image</mdb-btn>
                  </mdb-col>
                  <mdb-col class="col-3">
                    <img
                      :src="clickedDriver.bio.url"
                      :alt="clickedDriver.bio.alt"
                      class="img-fluid"
                    />

                    <mdb-btn @click="bioImage(true)">Bio image</mdb-btn>
                  </mdb-col>
                </mdb-row>
              </mdb-container>
            </mdb-col>

            <mdb-col class="col-12">
              <div class="row">
                <div class="md-form col-6">
                  <mdb-input label="First Name" inline v-model.trim="clickedDriver.firstName" />
                </div>
                <div class="md-form col-6">
                  <mdb-input label="Last Name" inline v-model.trim="clickedDriver.lastName" />
                </div>
              </div>

              <div class="row">
                <div class="md-form col-6">
                  <mdb-input label="Lives" inline v-model.trim="clickedDriver.lives" />
                </div>
                <div class="md-form col-6">
                  <mdb-input label="DOB" inline v-model.trim="clickedDriver.dob" />
                </div>
              </div>

              <div class="row">
                <div class="md-form col-6">
                  <mdb-input label="Race number" inline v-model.trim="clickedDriver.raceNumber" />
                </div>
                <div class="md-form col-6">
                  <mdb-input label="Sponsors" inline v-model.trim="clickedDriver.sponsors" />
                </div>
              </div>
            </mdb-col>

            <mdb-col class="col-12 text-center pb-4">
              <mdb-popover trigger="click" :options="{placement: 'bottom'}">
                <span slot="header">Facebook link</span>
                <mdb-input
                  slot="body"
                  label="Facebook link"
                  v-model="clickedDriver.social.platforms.facebook"
                ></mdb-input>
                <mdb-btn slot="reference">Facebook</mdb-btn>
              </mdb-popover>
              <mdb-popover trigger="click" :options="{placement: 'bottom'}">
                <span slot="header">Instagram link</span>
                <mdb-input
                  slot="body"
                  label="Instagram link"
                  v-model="clickedDriver.social.platforms.insta"
                ></mdb-input>
                <mdb-btn slot="reference">Instagram</mdb-btn>
              </mdb-popover>
              <mdb-popover trigger="click" :options="{placement: 'bottom'}">
                <span slot="header">Twitter link</span>
                <mdb-input
                  slot="body"
                  label="Twitter link"
                  v-model="clickedDriver.social.platforms.twitter"
                ></mdb-input>
                <mdb-btn slot="reference">Twitter</mdb-btn>
              </mdb-popover>
              <mdb-popover trigger="click" :options="{placement: 'bottom'}">
                <span slot="header">Google+ link</span>
                <mdb-input
                  slot="body"
                  label="Gplus link"
                  v-model="clickedDriver.social.platforms.gplus"
                ></mdb-input>
                <mdb-btn slot="reference">Google+</mdb-btn>
              </mdb-popover>
              <mdb-popover trigger="click" :options="{placement: 'bottom'}">
                <span slot="header">Twitch link</span>
                <mdb-input
                  slot="body"
                  label="Twitch link"
                  v-model="clickedDriver.social.platforms.twitch"
                ></mdb-input>
                <mdb-btn slot="reference">Twitch</mdb-btn>
              </mdb-popover>
              <mdb-popover trigger="click" :options="{placement: 'bottom'}">
                <span slot="header">Pinterest link</span>
                <mdb-input
                  slot="body"
                  label="Pinterest link"
                  v-model="clickedDriver.social.platforms.pinterest"
                ></mdb-input>
                <mdb-btn slot="reference">Pinterest</mdb-btn>
              </mdb-popover>
              <mdb-popover trigger="click" :options="{placement: 'bottom'}">
                <span slot="header">Youtube link</span>
                <mdb-input
                  slot="body"
                  label="Youtube link"
                  v-model="clickedDriver.social.platforms.youtube"
                ></mdb-input>
                <mdb-btn slot="reference">Youtube</mdb-btn>
              </mdb-popover>
            </mdb-col>

            <mdb-col class="col-6">
              <h3 class="text-center">Career Highlights</h3>
              <app-editor2 :content.sync="clickedDriver.career.content"></app-editor2>
            </mdb-col>

            <mdb-col class="col-6">
              <h3 class="text-center">Bio</h3>
              <app-editor2 :content.sync="clickedDriver.bio.content"></app-editor2>
            </mdb-col>
          </mdb-row>
        </mdb-container>
      </mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn color="secondary" @click.native="cancelEdit">Close</mdb-btn>
        <mdb-btn color="primary" @click="saveEdit">Save changes</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>
  </div>
</template>

<script>
import { driversCollection, imageCollection } from "../../../firebase";
import {
  mdbInput,
  mdbBtn,
  mdbContainer,
  mdbRow,
  mdbCol,
  mdbPopover,
  mdbIcon,
  mdbModalHeader,
  mdbModalTitle,
  mdbModalBody,
  mdbModalFooter,
  mdbModal,
} from "mdbvue";
export default {
  data() {
    return {
      bio: {
        url: "",
        alt: "",
        content: "",
        imgId: "",
      },
      firstName: "",
      lastName: "",
      lives: "",
      dob: "",
      raceNumber: "",
      sponsors: "",
      headline: {
        url: "",
        alt: "",
        imgId: "",
      },
      career: {
        url: "",
        alt: "",
        content: "",
        imgId: "",
      },
      social: {
        url: "",
        alt: "",
        imgId: "",
        platforms: {
          facebook: "",
          website: "",
          twitter: "",
          gplus: "",
          insta: "",
          twitch: "",
          pinterest: "",
          youtube: "",
        },
      },
      toDeleteDriver: {
        id: "",
        firstName: "",
        lastName: "",
      },
      clickedDriver: {
        id: "",
        bio: {
          url: "",
          alt: "",
          content: "",
          imgId: "",
        },
        firstName: "",
        lastName: "",
        lives: "",
        dob: "",
        raceNumber: "",
        sponsors: "",
        headline: {
          url: "",
          alt: "",
          imgId: "",
        },
        career: {
          url: "",
          alt: "",
          content: "",
          imgId: "",
        },
        social: {
          url: "",
          alt: "",
          imgId: "",
          platforms: {
            facebook: "",
            website: "",
            twitter: "",
            gplus: "",
            insta: "",
            twitch: "",
            pinterest: "",
            youtube: "",
          },
        },
      },
      img: {
        id: "",
        content: "",
        alt: "",
      },
      msg: "",
      edit: false,
      pageNumber: 0,
      file: "",
      defaultImage:
        "https://firebasestorage.googleapis.com/v0/b/jhr-developments-c5bba.appspot.com/o/images%2Fimg-placeholder.png?alt=media&token=7d9c5978-d45d-4049-91d9-ceb235823db7",
      existsModal: false,
      deleteModal: false,
      editModal: false,
      uploadImage: false,
    };
  },
  props: {
    size: {
      type: Number,
      required: false,
      default: 10,
    },
  },
  components: {
    mdbInput,
    mdbBtn,
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbPopover,
    mdbIcon,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter,
    mdbModal,
  },
  computed: {
    drivers() {
      return this.$store.getters["drivers/getDrivers"];
    },
    uploadMsg() {
      return this.$store.getters["images/getMsg"];
    },
    updatedImage() {
      return this.$store.getters["images/getImage"];
    },
    pageCount() {
      let l = this.drivers.length,
        s = this.size;
      return Math.ceil(l / s);
    },
    paginatedData() {
      const start = this.pageNumber * this.size,
        end = start + this.size;
      return this.drivers.slice(start, end);
    },
  },
  methods: {
    nextPage() {
      this.pageNumber++;
    },
    prevPage() {
      this.pageNumber--;
    },
    reset() {
      this.bio = {
        url: "",
        alt: "",
        content: "",
        imgId: "",
      };
      this.firstName = "";
      this.lastName = "";
      this.lives = "";
      this.dob = "";
      this.raceNumber = "";
      this.sponsors = "";
      this.headline = {
        url: "",
        alt: "",
        imgId: "",
      };
      this.career = {
        url: "",
        alt: "",
        content: "",
        imgId: "",
      };
      this.social = {
        url: "",
        alt: "",
        imgId: "",
      };
      this.social.platforms = {
        facebook: "",
        website: "",
        twitter: "",
        gplus: "",
        insta: "",
        twitch: "",
        pinterest: "",
        youtube: "",
      };
      this.file = "";
      this.img = {
        id: "",
        content: "",
        alt: "",
      };
    },
    addDriver() {
      if (this.headline.url == "") {
        this.headline.url = this.defaultImage;
        this.headline.alt = "Placeholder image";
        this.headline.imgId = "";
      }
      if (this.social.url == "") {
        this.social.url = this.defaultImage;
        this.social.alt = "Placeholder image";
        this.social.imgId = "";
      }
      if (this.bio.url == "") {
        this.bio.url = this.defaultImage;
        this.bio.alt = "Placeholder image";
        this.bio.imgId = "";
      }
      if (this.career.url == "") {
        this.career.url = this.defaultImage;
        this.career.alt = "Placeholder image";
        this.career.imgId = "";
      }
      driversCollection
        .add({
          bio: this.bio,
          firstName: this.firstName,
          lastName: this.lastName,
          lives: this.lives,
          dob: this.dob,
          raceNumber: this.raceNumber,
          sponsors: this.sponsors,
          headline: this.headline,
          career: this.career,
          social: this.social,
        })
        .then(() => {
          this.reset();
          this.msg = {
            type: "success",
            message: "Driver added",
          };
          setTimeout(() => {
            this.msg = {
              type: "",
              message: "",
            };
          }, 2000);
        })
        .catch((err) => {
          this.msg = {
            type: "warning",
            message: err.message,
          };
          setTimeout(() => {
            this.msg = {
              type: "",
              message: "",
            };
          }, 2000);
        });
    },
    submitForm() {
      if (this.dob == "" || this.firstName == "" || this.lastName == "") {
        this.msg = {
          type: "warning",
          message: "Missing information check the form is completely filled",
        };
        setTimeout(() => {
          this.msg = {
            type: "",
            message: "",
          };
        }, 2000);
      } else {
        this.addDriver();
      }
    },
    headlineImage(edit) {
      this.uploadImage = true;
      this.type = "headline";
      if (edit) {
        this.edit = true;
        this.editModal = false;
      }
    },
    socialImage(edit) {
      this.uploadImage = true;
      this.type = "social";
      if (edit) {
        this.edit = true;
        this.editModal = false;
      }
    },
    bioImage(edit) {
      this.uploadImage = true;
      this.type = "bio";
      if (edit) {
        this.edit = true;
        this.editModal = false;
      }
    },
    careerImage(edit) {
      this.uploadImage = true;
      this.type = "career";
      if (edit) {
        this.edit = true;
        this.editModal = false;
      }
    },
    checkFile(event) {
      this.file = event.target.files[0];
      imageCollection
        .where("name", "==", this.file.name)
        .get()
        .then((docs) => {
          docs.forEach((doc) => {
            if (doc.exists) {
              this.existsModal = true;
              this.uploadImage = false;
              this.img.content = doc.data();
              this.img.id = doc.id;
              return;
            }
          });
        });
    },
    saveFile() {
      if (this.type == "headline") {
        let payload = {};
        payload.file = this.file;
        payload.alt = this.img.alt;
        this.$store.dispatch("images/uploadImage", payload);
        if (this.edit) {
          setTimeout(() => {
            this.img.content = this.updatedImage;
            this.clickedDriver.headline.imgId = this.img.content.id;
            this.clickedDriver.headline.url = this.img.content.url;
            this.clickedDriver.headline.alt = this.img.content.alt;
            this.uploadImage = false;
            this.edit = false;
            this.type = "";
            this.file = "";
            this.editModal = true;
          }, 2000);
        } else {
          setTimeout(() => {
            this.img.content = this.updatedImage;
            this.headline.imgId = this.img.content.id;
            this.headline.url = this.img.content.url;
            this.headline.alt = this.img.content.alt;
            this.uploadImage = false;
            this.type = "";
            this.file = "";
          }, 2000);
        }
      } else if (this.type == "social") {
        let payload = {};
        payload.file = this.file;
        payload.alt = this.img.alt;
        this.img.alt = "";
        this.$store.dispatch("images/uploadImage", payload);
        if (this.edit) {
          setTimeout(() => {
            this.img.content = this.updatedImage;
            this.clickedDriver.social.imgId = this.img.content.id;
            this.clickedDriver.social.url = this.img.content.url;
            this.clickedDriver.social.alt = this.img.content.alt;
            this.uploadImage = false;
            this.type = "";
            this.edit = false;
            this.file = "";
            this.editModal = true;
          }, 2000);
        } else {
          setTimeout(() => {
            this.img.content = this.updatedImage;
            this.social.imgId = this.img.content.id;
            this.social.url = this.img.content.url;
            this.social.alt = this.img.content.alt;
            this.uploadImage = false;
            this.type = "";
            this.file = "";
            this.img.alt = "";
          }, 2000);
        }
      } else if (this.type == "bio") {
        let payload = {};
        payload.file = this.file;
        payload.alt = this.img.alt;
        this.img.alt = "";
        this.$store.dispatch("images/uploadImage", payload);
        if (this.edit) {
          setTimeout(() => {
            this.img.content = this.updatedImage;
            this.clickedDriver.bio.imgId = this.img.content.id;
            this.clickedDriver.bio.url = this.img.content.url;
            this.clickedDriver.bio.alt = this.img.content.alt;
            this.uploadImage = false;
            this.type = "";
            this.edit = false;
            this.file = "";
            this.editModal = true;
          }, 2000);
        } else {
          setTimeout(() => {
            this.img.content = this.updatedImage;
            this.bio.imgId = this.img.content.id;
            this.bio.url = this.img.content.url;
            this.bio.alt = this.img.content.alt;
            this.uploadImage = false;
            this.type = "";
            this.file = "";
            this.img.alt = "";
          }, 2000);
        }
      } else if (this.type == "career") {
        let payload = {};
        payload.file = this.file;
        payload.alt = this.img.alt;
        this.img.alt = "";
        this.$store.dispatch("images/uploadImage", payload);
        if (this.edit) {
          setTimeout(() => {
            this.img.content = this.updatedImage;
            this.clickedDriver.career.imgId = this.img.content.id;
            this.clickedDriver.career.url = this.img.content.url;
            this.clickedDriver.career.alt = this.img.content.alt;
            this.uploadImage = false;
            this.type = "";
            this.edit = false;
            this.file = "";
            this.editModal = true;
          }, 2000);
        } else {
          setTimeout(() => {
            this.img.content = this.updatedImage;
            this.career.imgId = this.img.content.id;
            this.career.url = this.img.content.url;
            this.career.alt = this.img.content.alt;
            this.uploadImage = false;
            this.type = "";
            this.file = "";
            this.img.alt = "";
          }, 2000);
        }
      }
    },
    closeImageUpload() {
      this.uploadImage = false;
      this.type = "";
      this.file = "";
      this.img.alt = "";
      if (this.edit) {
        this.editModal = true;
      }
    },
    confirmUse() {
      if (this.type == "headline") {
        if (this.edit) {
          this.clickedDriver.headline.imgId = this.img.id;
          this.existsModal = false;
          this.clickedDriver.headline.url = this.img.content.url;
          this.clickedDriver.headline.alt = this.img.content.alt;
          this.type = "";
          this.file = "";
          this.img.alt = "";
          this.editModal = true;
        } else {
          this.headline.imgId = this.img.id;
          this.existsModal = false;
          this.headline.url = this.img.content.url;
          this.headline.alt = this.img.content.alt;
          this.type = "";
          this.file = "";
          this.img.alt = "";
        }
      } else if (this.type == "social") {
        if (this.edit) {
          this.clickedDriver.social.imgId = this.img.id;
          this.existsModal = false;
          this.clickedDriver.social.url = this.img.content.url;
          this.clickedDriver.social.alt = this.img.content.alt;
          this.type = "";
          this.file = "";
          this.img.alt = "";
          this.editModal = true;
        } else {
          this.social.imgId = this.img.id;
          this.existsModal = false;
          this.social.url = this.img.content.url;
          this.social.alt = this.img.content.alt;
          this.type = "";
          this.file = "";
          this.img.alt = "";
        }
      } else if (this.type == "bio") {
        if (this.edit) {
          this.clickedDriver.bio.imgId = this.img.id;
          this.existsModal = false;
          this.clickedDriver.bio.url = this.img.content.url;
          this.clickedDriver.bio.alt = this.img.content.alt;
          this.type = "";
          this.file = "";
          this.img.alt = "";
          this.editModal = true;
        } else {
          this.bio.imgId = this.img.id;
          this.existsModal = false;
          this.bio.url = this.img.content.url;
          this.bio.alt = this.img.content.alt;
          this.type = "";
          this.file = "";
          this.img.alt = "";
        }
      } else if (this.type == "career") {
        if (this.edit) {
          this.clickedDriver.career.imgId = this.img.id;
          this.existsModal = false;
          this.clickedDriver.career.url = this.img.content.url;
          this.clickedDriver.career.alt = this.img.content.alt;
          this.type = "";
          this.file = "";
          this.img.alt = "";
          this.editModal = true;
        } else {
          this.career.imgId = this.img.id;
          this.existsModal = false;
          this.career.url = this.img.content.url;
          this.career.alt = this.img.content.alt;
          this.type = "";
          this.file = "";
          this.img.alt = "";
        }
      }
    },
    declineUse() {
      this.existsModal = false;
      this.img.content = "";
      this.img.id = "";
      this.type = "";
      this.file = "";
      this.img.alt = "";
      if (this.edit) {
        this.editModal = true;
      }
    },
    editDriver(driver) {
      this.clickedDriver = {
        id: driver.id,
        bio: {
          url: driver.bio.url,
          alt: driver.bio.alt,
          content: driver.bio.content,
          imgId: driver.bio.imgId,
        },
        firstName: driver.firstName,
        lastName: driver.lastName,
        lives: driver.lives,
        dob: driver.dob,
        raceNumber: driver.raceNumber,
        sponsors: driver.sponsors,
        headline: {
          url: driver.headline.url,
          alt: driver.headline.alt,
          imgId: driver.headline.imgId,
        },
        career: {
          url: driver.career.url,
          alt: driver.career.alt,
          content: driver.career.content,
          imgId: driver.career.imgId,
        },
        social: {
          url: driver.social.url,
          alt: driver.social.alt,
          imgId: driver.social.imgId,
          platforms: {
            facebook: driver.social.platforms.facebook,
            website: driver.social.platforms.website,
            twitter: driver.social.platforms.twitter,
            gplus: driver.social.platforms.gplus,
            insta: driver.social.platforms.insta,
            twitch: driver.social.platforms.twitch,
            pinterest: driver.social.platforms.pinterest,
            youtube: driver.social.platforms.youtube,
          },
        },
      };
      this.editModal = true;
    },
    cancelEdit() {
      this.clickedDriver = {
        id: "",
        bio: {
          url: "",
          alt: "",
          content: "",
          imgId: "",
        },
        firstName: "",
        lastName: "",
        lives: "",
        dob: "",
        raceNumber: "",
        sponsors: "",
        headline: {
          url: "",
          alt: "",
          imgId: "",
        },
        career: {
          url: "",
          alt: "",
          content: "",
          imgId: "",
        },
        social: {
          url: "",
          alt: "",
          content: "",
          imgId: "",
          platforms: {
            facebook: "",
            website: "",
            twitter: "",
            gplus: "",
            insta: "",
            twitch: "",
            pinterest: "",
            youtube: "",
          },
        },
      };
      this.editModal = false;
      this.edit = false;
    },
    saveEdit() {
      driversCollection
        .doc(this.clickedDriver.id)
        .update({
          bio: this.clickedDriver.bio,
          firstName: this.clickedDriver.firstName,
          lastName: this.clickedDriver.lastName,
          lives: this.clickedDriver.lives,
          dob: this.clickedDriver.dob,
          raceNumber: this.clickedDriver.raceNumber,
          sponsors: this.clickedDriver.sponsors,
          headline: this.clickedDriver.headline,
          career: this.clickedDriver.career,
          social: this.clickedDriver.social,
        })
        .then(() => {
          this.cancelEdit();
          this.msg = {
            type: "success",
            message: "Driver updated",
          };
          setTimeout(() => {
            this.msg = {
              type: "",
              message: "",
            };
          }, 2000);
        })
        .catch((err) => {
          this.editMsg = {
            type: "warning",
            message: err.message,
          };
          setTimeout(() => {
            this.editMsg = {
              type: "",
              message: "",
            };
          }, 2000);
        });
    },
    deleteDriver(driver) {
      this.deleteModal = true;
      this.toDeleteDriver.firstName = driver.firstName;
      this.toDeleteDriver.lastName = driver.lastName;
      this.toDeleteDriver.id = driver.id;
    },
    cancelDelete() {
      this.toDeleteDriver = {
        id: "",
        lastName: "",
        firstName: "",
      };
      this.deleteModal = false;
    },
    confirmDelete() {
      driversCollection
        .doc(this.toDeleteDriver.id)
        .delete()
        .then(() => {
          this.deleteModal = false;
          this.msg = {
            type: "danger",
            message: "Driver deleted",
          };
          setTimeout(() => {
            this.msg = {
              type: "",
              message: "",
            };
          }, 2000);
        })
        .catch((error) => {
          this.msg = {
            type: "warning",
            message: error.message,
          };
          setTimeout(() => {
            this.msg = {
              type: "",
              message: "",
            };
          }, 2000);
        });
    },
  },
};
</script>