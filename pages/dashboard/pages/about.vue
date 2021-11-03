<template>
  <div>
    <mdb-container>
      <mdb-row>
        <mdb-col class="text-center pt-2">
          <img v-if="about.url" :src="about.url" :alt="about.alt" class="img-fluid" />

          <img v-else :src="defaultImage" alt="Placeholder image" class="img-fluid" />
        </mdb-col>
      </mdb-row>

      <form @submit.prevent="submitForm" class="pt-2 row">
        <div class="md-form col-12 p-0 text-center">
          <mdb-btn color="primary" class="ml-3" inline @click="newImage">About Image</mdb-btn>
        </div>

        <mdb-col>
          <app-editor2 :content.sync="about.content"></app-editor2>
          <mdb-btn color="primary" type="submit">Update Content</mdb-btn>
        </mdb-col>
      </form>
    </mdb-container>

    <transition name="fade">
      <div
        v-if="msg.message != ''"
        :class="`bg-${msg.type}`"
        class="pl-5 mt-4 text-white text-center"
      >
        <p>{{ msg.message }}</p>
      </div>
    </transition>

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
  </div>
</template>

<script>
import { imageCollection, aboutPage } from "../../../firebase";
import {
  mdbBtn,
  mdbContainer,
  mdbCol,
  mdbRow,
  mdbModalHeader,
  mdbModalTitle,
  mdbModalBody,
  mdbModalFooter,
  mdbModal,
  mdbInput,
} from "mdbvue";
export default {
  data() {
    return {
      about: {
        url: "",
        content: "",
        alt: "",
        imgId: "",
      },
      msg: {
        message: "",
        type: "",
      },
      existsModal: false,
      uploadImage: false,
      file: "",
      img: {
        id: "",
        content: "",
        alt: "",
      },
      type: "",
      defaultImage:
        "https://firebasestorage.googleapis.com/v0/b/jhr-developments-c5bba.appspot.com/o/images%2Fimg-placeholder.png?alt=media&token=7d9c5978-d45d-4049-91d9-ceb235823db7",
    };
  },
  components: {
    mdbBtn,
    mdbContainer,
    mdbCol,
    mdbRow,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter,
    mdbModal,
    mdbInput,
  },
  computed: {
    aboutContent() {
      return this.$store.getters["about/getContent"];
    },
    uploadMsg() {
      return this.$store.getters["images/getMsg"];
    },
    updatedImage() {
      return this.$store.getters["images/getImage"];
    },
  },
  methods: {
    reset() {
      this.about = this.aboutContent;
      this.file = "";
      this.img = {
        id: "",
        content: "",
        alt: "",
      };
      this.type = "";
    },
    updateContent() {
      aboutPage
        .doc(this.about.id)
        .update({
          alt: this.about.alt,
          url: this.about.url,
          content: this.about.content,
          imgId: this.about.imgId,
        })
        .then(() => {
          this.reset();
          this.msg = {
            type: "success",
            message: "Content updated",
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
      this.updateContent();
    },
    newImage() {
      this.uploadImage = true;
      this.type = "new";
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
      if (this.type == "new") {
        let payload = {};
        payload.file = this.file;
        payload.alt = this.img.alt;
        this.$store.dispatch("images/uploadImage", payload);
        setTimeout(() => {
          this.img.content = this.updatedImage;
          this.about.imgId = this.img.content.id;
          this.about.url = this.img.content.url;
          this.about.alt = this.img.alt;
          this.uploadImage = false;
          this.type = "";
          this.file = "";
        }, 2000);
      }
    },
    closeImageUpload() {
      this.uploadImage = false;
      this.type = "";
      this.file = "";
      this.img.alt = "";
    },
    confirmUse() {
      if (this.type == "new") {
        this.about.imgId = this.img.id;
        this.existsModal = false;
        this.about.url = this.img.content.url;
        this.about.alt = this.img.content.alt;
        this.type = "";
        this.file = "";
        this.img.alt = "";
      }
    },
    declineUse() {
      this.existsModal = false;
      this.img.content = "";
      this.img.id = "";
      this.type = "";
      this.file = "";
      this.img.alt = "";
    },
  },
  created() {
    setTimeout(() => {
      this.about = this.aboutContent;
    }, 2000);
  },
};
</script>