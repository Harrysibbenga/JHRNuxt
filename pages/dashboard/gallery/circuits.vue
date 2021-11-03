<template>
  <div>
    <div class="container text-center">
      <mdb-btn color="primary" class="ml-0" @click="addCircuitModel = true">Add new circuit</mdb-btn>
    </div>
    <mdb-container fluid class="p-0 pt-5">
      <mdb-row>
        <mdb-col class="col-4" v-for="(circuit, index) in circuitList" :key="index">
          <img :src="circuit.url" :alt="circuit.alt" class="img-fluid" />
          <p>name: {{ circuit.title }}</p>
          <p>alt: {{ circuit.alt }}</p>
          <div class="text-center">
            <a @click="deleteItem(circuit)">
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

    <!-- addCircuitModel  -->
    <mdb-modal
      top
      position="top"
      fullHeight
      direction="top"
      :show="addCircuitModel"
      @close="cancelAdd"
    >
      <mdb-modal-header>
        <mdb-modal-title>Add circuit</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <form @submit.prevent class="p-2">
          <mdb-col class="text-center pt-2">
            <img v-if="circuit.url" :src="circuit.url" :alt="circuit.alt" class="img-fluid" />

            <img v-else :src="defaultImage" alt="Placeholder image" class="img-fluid" />
          </mdb-col>

          <mdb-btn color="primary" class="ml-3" inline @click="newImage">Circuit Image</mdb-btn>

          <div class="md-form">
            <mdb-input label="Title" inline v-model.trim="circuit.title" />
          </div>
        </form>
      </mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn color="secondary" @click.native="cancelAdd">Close</mdb-btn>
        <mdb-btn color="primary" @click="saveCircuit">Save</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>

    <!-- deleteModal -->
    <mdb-modal
      frame
      position="top"
      direction="top"
      :show="deleteModal"
      @close="deleteModal = false"
    >
      <mdb-modal-body class="text-center">
        <span
          class="text-danger"
        >Are you sure you want to delete this circuit ? ( any documents that use this circuit will need to be changed )</span>
        {{ toDeleteItem.title }}
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
  </div>
</template>

<script>
import { imageCollection, circuitsCollection } from "@/services/firebase";
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
export default {
  data() {
    return {
      toDeleteItem: {
        id: "",
        title: "",
        alt: "",
        url: "",
      },
      circuit: {
        id: "",
        url: "",
        title: "",
        alt: "",
      },
      deleteModal: false,
      uploadImage: false,
      existsModal: false,
      file: "",
      msg: {
        message: "",
        type: "",
      },
      img: {
        id: "",
        alt: "",
        content: {},
      },
      addCircuitModel: false,
      defaultImage:
        "https://firebasestorage.googleapis.com/v0/b/jhr-developments-c5bba.appspot.com/o/images%2Fimg-placeholder.png?alt=media&token=7d9c5978-d45d-4049-91d9-ceb235823db7",
    };
  },
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
  computed: {
    circuitList() {
      return this.$store.getters["circuits/getCircuits"];
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
      this.file = "";
      this.img = {
        id: "",
        content: "",
        alt: "",
      };
      this.circuit = {
        id: "",
        imgId: "",
        url: "",
        title: "",
        alt: "",
      };
    },
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
              this.existsModal = true;
              this.uploadImage = false;
              this.img.content = doc.data();
              this.img.id = doc.id;
              return;
            }
          });
        });
    },
    deleteItem(item) {
      this.deleteModal = true;
      this.toDeleteItem = {
        id: item.id,
        title: item.title,
        alt: item.alt,
        url: item.url,
      };
    },
    cancelDelete() {
      this.toDeleteItem = {
        id: "",
        title: "",
        alt: "",
        url: "",
      };
      this.deleteModal = false;
    },
    confirmDelete() {
      circuitsCollection
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
      let payload = {};
      payload.file = this.file;
      payload.alt = this.img.alt;
      this.$store.dispatch("images/uploadImage", payload);
      setTimeout(() => {
        this.img.content = this.updatedImage;
        this.circuit.imgId = this.img.content.id;
        this.circuit.url = this.img.content.url;
        this.circuit.alt = this.img.content.alt;
        this.uploadImage = false;
        this.file = "";
        this.img.alt = "";
      }, 2000);
    },
    closeImageUpload() {
      this.uploadImage = false;
      this.file = "";
      this.img.alt = "";
    },
    addCircuit() {
      circuitsCollection
        .add({
          url: this.circuit.url,
          imgId: this.circuit.imgId,
          alt: this.circuit.alt,
          title: this.circuit.title,
          createdOn: new Date(),
        })
        .then(() => {
          this.msg = {
            type: "success",
            message: "Circuit added",
          };
          this.reset();
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
    cancelAdd() {
      this.addCircuitModel = false;
      this.reset();
    },
    confirmUse() {
      this.circuit.imgId = this.img.id;
      this.existsModal = false;
      this.circuit.url = this.img.content.url;
      this.circuit.alt = this.img.content.alt;
      this.file = "";
      this.img.alt = "";
    },
    declineUse() {
      this.existsModal = false;
      this.img.content = "";
      this.img.id = "";
      this.type = "";
      this.file = "";
      this.img.alt = "";
    },
    saveCircuit() {
      this.addCircuit();
      this.addCircuitModel = false;
    },
  },
};
</script>
