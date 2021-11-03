<template>
  <div>
    <mdb-container>
      <mdb-row>
        <form @submit.prevent="submitForm">
          <mdb-col class="text-center pt-2">
            <video
              v-if="section.videoId"
              class="video-fluid z-depth-1"
              autoplay
              loop
              muted
            >
              <source :src="section.url" type="video/mp4" />
            </video>
          </mdb-col>
          <mdb-btn color="primary" class="ml-3" inline @click="newVideo"
            >Change video</mdb-btn
          >
          <mdb-btn @click.native="selectVideo">Select video</mdb-btn>
          <mdb-btn color="primary" type="submit">Confirm</mdb-btn>
        </form>
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

    <!-- existsModal -->
    <mdb-modal size="md" :show="existsModal" @close="existsModal = false">
      <mdb-modal-header>
        <mdb-modal-title>Video exists with that name</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <div class="row col-12 col-md-6 col-lg-4 py-3">
          <p>Would you like to use this one ?</p>
        </div>
        <video
          v-if="video.content.url"
          class="video-fluid z-depth-1"
          autoplay
          loop
          muted
        >
          <source :src="video.content.url" type="video/mp4" />
        </video>
      </mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn color="secondary" size="sm" @click.native="declineUse"
          >No</mdb-btn
        >
        <mdb-btn color="primary" size="sm" @click="confirmUse">Yes</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>

    <!-- uploadVideo -->
    <mdb-modal size="md" :show="uploadVideo" @close="closeVideoUpload">
      <mdb-modal-header>
        <mdb-modal-title>Upload Video</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <div class="row">
          <div class="col-12">
            <div class="md-form">
              <mdb-input v-model.trim="video.alt" label="Description" inline />
            </div>
          </div>
          <div class="col-12">
            <div class="input-group">
              <div class="input-group-prepend">
                <span id="videoInput" class="input-group-text">Upload</span>
              </div>
              <div class="custom-file">
                <input
                  id="VideoInput"
                  ref="VideoInput"
                  type="file"
                  class="custom-file-input"
                  aria-describedby="VideoInput"
                  accept="Video/jpeg Video/png"
                  @change="checkFile($event)"
                />
                <label
                  v-if="file.name"
                  class="custom-file-label"
                  for="inputGroupFile01"
                  >{{ file.name }}</label
                >
                <label v-else class="custom-file-label" for="inputGroupFile01"
                  >Video</label
                >
              </div>
            </div>
          </div>
        </div>
      </mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn color="secondary" size="sm" @click.native="closeVideoUpload"
          >Close</mdb-btn
        >
        <mdb-btn
          color="primary"
          size="sm"
          :disabled="video.alt == ''"
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

    <mdb-modal
            top
            position="top"
            full-height
            direction="top"
            :show="selectVideoModel"
            @close="selectVideoModel = false"
        >
        <mdb-modal-header>
            <mdb-modal-title>Select video</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body>
            <div class="container-fluid">
            <div class="row">
                <div v-for="(vid, index) in videoList" :key="index" class="col-4 p-0">
                <div class="custom-control custom-radio d-flex flex-center flex-column py-3">
                    <video class="video-fluid z-depth-1" autoplay loop muted>
                      <source :src="vid.url" type="video/mp4" />
                    </video>
                    <input
                      :id="vid.id"
                      type="radio"
                      class="custom-control-input"
                      @click="selectedVideo(vid)"
                    />
                    <label class="custom-control-label" :for="vid.id">
                    {{
                    vid.alt
                    }}
                    </label>
                </div>
                </div>
            </div>
            </div>
        </mdb-modal-body>
        <mdb-modal-footer>
            <mdb-btn color="secondary" @click.native="selectVideoModel = false">Close</mdb-btn>
            <mdb-btn color="primary" @click="saveSelection">Confirm</mdb-btn>
        </mdb-modal-footer>
        </mdb-modal>
  </div>
</template>

<script>
import moment from "moment";
import {
  mdbInput,
  mdbBtn,
  mdbContainer,
  mdbCol,
  mdbModalHeader,
  mdbModalTitle,
  mdbModalBody,
  mdbModalFooter,
  mdbModal,
  mdbRow,
} from "mdbvue";
import { videoCollection, videoSection } from "@/services/firebase";
export default {
  components: {
    mdbInput,
    mdbBtn,
    mdbContainer,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter,
    mdbModal,
    mdbCol,
    mdbRow,
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
  data() {
    return {
      section: {
        alt: "",
        url: "",
        videoId: "",
        id: "",
        name: "",
      },
      msg: {
        message: "",
        type: "",
      },
      existsModal: false,
      uploadVideo: false,
      updatedVideo: null,
      selectVideoModel: false,
      file: "",
      video: {
        id: "",
        content: "",
        alt: "",
      },
      type: "",
      defaultImage:
        "https://firebasestorage.googleapis.com/v0/b/jhr-developments-c5bba.appspot.com/o/images%2Fimg-placeholder.png?alt=media&token=7d9c5978-d45d-4049-91d9-ceb235823db7",
    };
  },
  computed: {
    videoContent() {
      return this.$store.getters["videoSection/getVideo"][0];
    },
    videoList() {
      return this.$store.getters['videos/getVideos']
    },
    uploadMsg() {
      return this.$store.getters["videos/getMsg"];
    },
  },
  created() {
    setTimeout(() => {
      this.section = {
        id: this.videoContent.id,
        url: this.videoContent.url,
        alt: this.videoContent.alt,
        videoId: this.videoContent.videoId,
      };
    }, 1500);
  },
  methods: {
    reset() {
      this.section = {
        id: this.videoContent.id,
        url: this.videoContent.url,
        alt: this.videoContent.alt,
        videoId: this.videoContent.videoId,
      };
      this.file = "";
      this.video = {
        id: "",
        content: "",
        alt: "",
      };
      this.type = ''
    },
    updateContent() {
      videoSection
        .doc(this.section.id)
        .update({
          videoId: this.section.videoId,
          url: this.section.url,
          alt: this.section.alt,
          createdOn: new Date(),
        })
        .then(() => {
          this.reset()
          this.msg = {
            type: "success",
            message: "Video updated",
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
    newVideo() {
      this.uploadVideo = true;
    },
    checkFile(event) {
      this.file = event.target.files[0];
      videoCollection
        .where("name", "==", this.file.name)
        .get()
        .then((docs) => {
          docs.forEach((doc) => {
            if (doc.exists) {
              this.existsModal = true;
              this.uploadVideo = false;
              this.video.content = doc.data();
              this.video.id = doc.id;

            }
          });
        });
    },
    saveFile() {
      const payload = {};
      payload.file = this.file;
      payload.alt = this.video.alt;
      this.$store
        .dispatch("videos/uploadVideo", payload)
        .then((video) => {
          this.video.content = video;
          this.section.videoId = this.video.content.id;
          this.section.url = this.video.content.url;
          this.section.alt = this.video.alt;
        })
        .then(() => {
          this.$store.dispatch("global/setLoading", false);
          this.file = "";
          this.video.alt = "";
          setTimeout(() => {
            this.uploadVideo = false;
          }, 2000);
        });
    },
    closeVideoUpload() {
      this.uploadVideo = false;
      this.type = "";
      this.file = "";
      this.video.alt = "";
    },
    confirmUse() {
      this.section.videoId = this.video.id;
      this.existsModal = false;
      this.section.url = this.video.content.url;
      this.section.alt = this.video.content.alt;
      this.type = "";
      this.file = "";
      this.video.alt = "";
    },
    declineUse() {
      this.existsModal = false;
      this.video.content = "";
      this.video.id = "";
      this.type = "";
      this.file = "";
      this.video.alt = "";
    },
    submitForm() {
      this.updateContent();
    },
    selectVideo() {
      this.selectVideoModel = true;
    },
    selectedVideo(video){
      this.section.videoId = video.id;
      this.section.url = video.url;
      this.section.alt = video.alt;
    },
    saveSelection(){
      this.selectVideoModel = false;
      this.updateContent();
    },
  },
};
</script>
