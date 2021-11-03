<template>
  <div>
    <div class="container text-center">
      <mdb-btn color="primary" class="ml-0" inline @click="newImage"
        >Add new image</mdb-btn
      >
    </div>
    <mdb-container fluid class="p-0 pt-5">
      <mdb-row>
        <mdb-col v-for="(image, index) in imageList" :key="index" class="col-4">
          <img :src="image.url" :alt="image.alt" class="img-fluid" />
          <p>name: {{ image.name }}</p>
          <p>alt: {{ image.alt }}</p>
          <div class="text-center">
            <a @click="deleteItem(image)">
              <mdb-icon icon="trash-alt" />
            </a>
          </div>
        </mdb-col>
      </mdb-row>
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

    <!-- deleteModal -->
    <mdb-modal
      frame
      position="top"
      direction="top"
      :show="deleteModal"
      @close="deleteModal = false"
    >
      <mdb-modal-body class="text-center">
        <span class="text-danger"
          >Are you sure you want to delete this image ? ( any documents that use
          this image will need to be changed )</span
        >
        {{ toDeleteItem.name }}
        <mdb-btn color="primary" @click.native="cancelDelete">Close</mdb-btn>
        <mdb-btn color="secondary" @click="confirmDelete">Delete</mdb-btn>
      </mdb-modal-body>
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
              <mdb-input v-model.trim="img.alt" label="Description" inline />
            </div>
          </div>
          <div class="col-12">
            <div class="input-group">
              <div class="input-group-prepend">
                <span id="imageInput" class="input-group-text">Upload</span>
              </div>
              <div class="custom-file">
                <input
                  id="imageInput"
                  ref="imageInput"
                  type="file"
                  class="custom-file-input"
                  aria-describedby="imageInput"
                  accept="image/jpeg image/png"
                  @change="checkFile($event)"
                />
                <label
                  v-if="file.name"
                  class="custom-file-label"
                  for="inputGroupFile01"
                  >{{ file.name }}</label
                >
                <label v-else class="custom-file-label" for="inputGroupFile01"
                  >Image</label
                >
              </div>
            </div>
          </div>
        </div>
      </mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn color="secondary" size="sm" @click.native="closeImageUpload"
          >Close</mdb-btn
        >
        <mdb-btn
          color="primary"
          size="sm"
          :disabled="img.alt == ''"
          @click="saveFile(type)"
          >Save</mdb-btn
        >
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
import {
  mdbInput,
  mdbBtn,
  mdbContainer,
  mdbIcon,
  mdbCol,
  mdbModalHeader,
  mdbModalTitle,
  mdbModalBody,
  mdbModalFooter,
  mdbModal,
  mdbRow,
} from "mdbvue";
import { imageCollection } from "@/services/firebase";
export default {
  components: {
    mdbInput,
    mdbBtn,
    mdbContainer,
    mdbIcon,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter,
    mdbModal,
    mdbCol,
    mdbRow,
  },
  data() {
    return {
      toDeleteItem: {
        id: "",
        name: "",
        alt: "",
        url: "",
      },
      deleteModal: false,
      uploadImage: false,
      file: "",
      msg: {
        message: "",
        type: "",
      },
      img: {
        alt: "",
      },
    };
  },
  computed: {
    imageList() {
      return this.$store.getters["images/getImages"];
    },
    uploadMsg() {
      return this.$store.getters["images/getMsg"];
    },
  },
  methods: {
    newImage() {
      this.uploadImage = true;
    },
    checkFile(event) {
      this.file = event.target.files[0];
      imageCollection
        .where("name", "==", this.file.name)
        .get()
        .then((docs) => {
          docs.forEach((doc) => {
            if (doc.exists) {
              const msg = {
                type: "warning",
                message: "Image with this name already exists",
              };
              this.$store.commit("images/setMsg", msg);
              this.file = "";

            }
          });
        });
    },
    deleteItem(item) {
      this.deleteModal = true;
      this.toDeleteItem = {
        id: item.id,
        name: item.name,
        alt: item.alt,
        url: item.url,
      };
    },
    cancelDelete() {
      this.toDeleteItem = {
        id: "",
        name: "",
        alt: "",
        url: "",
      };
      this.deleteModal = false;
    },
    confirmDelete() {
      imageCollection
        .doc(this.toDeleteItem.id)
        .delete()
        .then(() => {
          this.deleteModal = false;
          this.msg = {
            type: "danger",
            message: "Image deleted",
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
    saveFile() {
      const payload = {};
      payload.file = this.file;
      payload.alt = this.img.alt;
      this.$store.dispatch("images/uploadImage", payload).then(() => {
        this.$store.dispatch("global/setLoading", false);
        this.file = "";
        this.img.alt = "";
        setTimeout(() => {
          this.uploadImage = false;
        }, 3000);
      });
    },
    closeImageUpload() {
      this.uploadImage = false;
      this.file = "";
      this.img.alt = "";
    },
  },
};
</script>
