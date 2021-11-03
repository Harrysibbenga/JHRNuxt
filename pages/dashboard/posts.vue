<template>
  <div>
    <!-- create post  -->
    <mdb-container>
      <mdb-row>
        <mdb-col class="text-center pt-2" col="12">
          <img v-if="post.url" :src="post.url" :alt="img.alt" class="img-fluid" />

          <img v-else :src="defaultImage" alt="Placeholder image" class="img-fluid" />
        </mdb-col>

        <mdb-col col="12">
          <form @submit.prevent="submitForm" class="pt-2">
            <div class="row">
              <div class="md-form col-4 p-0">
                <mdb-btn color="primary" class="ml-3" inline @click="newImage">Headline Image</mdb-btn>
              </div>

              <div class="md-form col-md-6 col-lg-4">
                <mdb-input type="date" inline v-model.trim="post.date" />
              </div>
            </div>

            <div class="md-form">
              <mdb-input label="Title" inline v-model.trim="post.title" />
            </div>

            <div class="md-form">
              <mdb-input label="Excerpt" inline v-model.trim="post.excerpt" />
            </div>

            <mdb-row>
              <h3>Gallery images</h3>
              <mdb-col col="12">
                <ui-multi-upload :images.sync="post.gallery"></ui-multi-upload>
              </mdb-col>
              <mdb-row v-if="post.gallery.length > 0">
                <mdb-col v-for="(item, index) in post.gallery" :key="index" col="4">
                  <img :src="item.url" :alt="item.alt"  class="img-fluid">
                  <mdb-btn @click="removeImage(index, post.gallery)">Delete</mdb-btn>
                </mdb-col>
              </mdb-row>
            </mdb-row>

            <mdb-row class="pt-3">
              <h3>Post content</h3>
              <mdb-col col="12">
                <ui-app-editor2 :content.sync="post.content"></ui-app-editor2>
              </mdb-col>
            </mdb-row>

             <mdb-row class="pt-3">
              <h3>Quotes</h3>
              <mdb-col col="12">
                <ui-app-editor2 :content.sync="post.quoteContent"></ui-app-editor2>
              </mdb-col>
              <mdb-col col="12">
                <mdb-btn color="primary" type="submit">Add Post</mdb-btn>
              </mdb-col>
            </mdb-row>

            <mdb-row>
              <h2>Schedule post</h2>

              <helpers-scheduling :publish-date.sync="post.published"></helpers-scheduling>
            </mdb-row>
          </form>
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

    <mdb-container fluid class="p-0 pt-5">
      <mdb-row>
        <mdb-col>
          <table class="table">
            <thead class="black text-white">
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Date</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(post, index) in paginatedData" :key="index">
                <th scope="row">{{ post.title }}</th>
                <td>{{ post.date | formatDate }}</td>
                <td>
                  <a @click="editPost(post)" class="mr-1">
                    <mdb-icon icon="edit" />
                  </a>
                  <a @click="deletePost(post)" class="ml-1">
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

    <!-- editModel  -->
    <mdb-modal top position="top" fullHeight direction="top" :show="editModal" @close="cancelEdit">
      <mdb-modal-header>
        <mdb-modal-title>{{ clickedPost.title }}</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <form @submit.prevent class="p-2">
          <img v-if="clickedPost.url" :src="clickedPost.url" class="img-fluid" />

          <mdb-btn @click="changeImage" color="primary">Change image</mdb-btn>

          <div class="md-form col-md-6 col-lg-4 p-0">
            <mdb-input type="date" inline v-model.trim="clickedPost.date" />
          </div>

          <div class="md-form">
            <mdb-input label="Title" inline v-model.trim="clickedPost.title" />
          </div>

          <div class="md-form">
            <mdb-input label="Excerpt" inline v-model.trim="clickedPost.excerpt" />
          </div>

          <div class="md-form">
            <mdb-row>

            </mdb-row>
              <h3>Gallery images</h3>
              <mdb-col col="12">
                <ui-multi-upload :images.sync="clickedPost.gallery"></ui-multi-upload>
              </mdb-col>
              <mdb-row v-if="clickedPost.gallery.length > 0">
                <mdb-col v-for="(item, index) in clickedPost.gallery" :key="index" col="12">
                  <img :src="item.url" :alt="item.alt"  class="img-fluid">
                  <mdb-btn @click="removeImage(index, clickedPost.gallery)">Delete</mdb-btn>
                </mdb-col>
              </mdb-row>
            </div>

            <div class="md-form">
              <h3>Post content</h3>
              <ui-app-editor2 :content.sync="clickedPost.content"></ui-app-editor2>
            </div>

             <div class="md-form">
              <h3>Quotes</h3>
              <ui-app-editor2 :content.sync="clickedPost.quoteContent"></ui-app-editor2>
            </div>

            <mdb-row>
              <h2>Schedule post</h2>

              <helpers-scheduling :publish-date.sync="post.published"></helpers-scheduling>
            </mdb-row>
        </form>
      </mdb-modal-body>
      <mdb-container>
        <transition name="fade">
          <div
            v-if="editMsg.message != ''"
            :class="`bg-${editMsg.type}`"
            class="pl-5 mt-2 text-white text-center"
          >
            <p>{{ editMsg.message }}</p>
          </div>
        </transition>
      </mdb-container>
      <mdb-modal-footer>
        <mdb-btn color="secondary" @click.native="cancelEdit">Close</mdb-btn>
        <mdb-btn color="primary" @click="saveEdit">Save changes</mdb-btn>
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
        <span class="text-danger">Are you sure you want to delete this post</span>
        {{ toDeletePost.title }}
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
import moment from "moment";
import {
  mdbInput,
  mdbBtn,
  mdbContainer,
  mdbIcon,
  mdbModalHeader,
  mdbModalTitle,
  mdbModalBody,
  mdbModalFooter,
  mdbModal,
  mdbRow,
  mdbCol
} from "mdbvue";
import { postsCollection, imageCollection } from "@/services/firebase";

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
    mdbRow,
   mdbCol
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
  props: {
    size: {
      type: Number,
      required: false,
      default: 10,
    },
  },
  data() {
    return {
      post: {
        title: "",
        excerpt: "",
        slug: "",
        date: "",
        content: "",
        year: "",
        imgId: "",
        url: "",
        quoteContent:'',
        gallery: [],
        published: "",
      },
      pageNumber: 0,
      msg: {
        type: '',
        message: '',
      },
      editMsg: "",
      editModal: false,
      deleteModal: false,
      toDeletePost: {
        id: "",
        title: "",
      },
      clickedPost: {
        title: "",
        excerpt: "",
        slug: "",
        date: "",
        content: "",
        year: "",
        imgId: "",
        url: "",
        quoteContent:'',
        gallery: [],
        published: ''
      },
      existsModal: false,
      uploadImage: false,
      updatedImage: null,
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
  computed: {
    posts() {
      return this.$store.getters["posts/getPosts"];
    },
    uploadMsg() {
      return this.$store.getters["images/getMsg"];
    },
     updatedImage() {
      return this.$store.getters["images/getImage"];
    },
    pageCount() {
      const l = this.posts.length;
        const s = this.size;
      return Math.ceil(l / s);
    },
    paginatedData() {
      const start = this.pageNumber * this.size;
        const end = start + this.size;
      return this.posts.slice(start, end);
    },
  },
  methods: {
    reset() {
      this.post = {
        title: "",
        excerpt: "",
        slug: "",
        date: "",
        content: "",
        year: "",
        imgId: "",
        url: "",
        quoteContent: '',
        gallery: [],
        published: ""
      }
      this.file = "";
      this.img = {
        id: "",
        content: "",
        alt: "",
      };
    },
    addPost() {
      let slugArry = [];
        const newSlug = [];
        let date = "";
      // create slug
      slugArry = this.post.title.split(" ");
      date = this.post.date;
      this.post.year = date.split("-")[0];

      slugArry.forEach((item) => {
        newSlug.push(item.toLowerCase());
      });

      this.post.slug = newSlug.join("-") + "-" + date;

      if (this.post.url === "") {
        this.post.url = this.defaultImage;
        this.post.alt = "Placeholder image";
      }

      postsCollection
        .add({
          title: this.post.title,
          excerpt: this.post.excerpt,
          slug: this.post.slug,
          date: this.post.date,
          content: this.post.content,
          year: this.post.year,
          createdOn: new Date(),
          imgId: this.post.imgId,
          url: this.post.url,
          quoteContent: this.post.quoteContent,
          published: this.post.published
        })
        .then(() => {
          this.reset();
          this.msg = {
            type: "success",
            message: "Post added",
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
    newImage() {
      this.uploadImage = true;
      this.type = "new";
    },
    checkFile(event) {
      this.file = event.target.files[0];
      imageCollection
        .where("name", "===", this.file.name)
        .get()
        .then((docs) => {
          docs.forEach((doc) => {
            if (doc.exists) {
              this.existsModal = true;
              this.uploadImage = false;
              this.img.content = doc.data();
              this.img.id = doc.id;

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
          this.post.imgId = this.img.content.id;
          this.post.url = this.img.content.url;
          this.uploadImage = false;
          this.type = "";
          this.file.name = "";
        }, 2000);
      } else if (this.type == "edit") {
        let payload = {};
        payload.file = this.file;
        payload.alt = this.img.alt;
        this.img.alt = "";
        this.$store.dispatch("images/uploadImage", payload);
        setTimeout(() => {
          this.img.content = this.updatedImage;
          this.clickedPost.imgId = this.img.content.id;
          this.clickedPost.url = this.img.content.url;
          this.uploadImage = false;
          this.type = "";
          this.file = "";
          this.img.alt = "";
        }, 2000);
      }
    },
    closeImageUpload() {
      this.uploadImage = false;
      this.type = "";
      this.file = "";
      this.img.alt = "";
    },
     removeImage(img, images){
      let index = images.indexOf(img)
      images.splice(index, 1)
    },
    confirmUse() {
      if (this.type == "new") {
        this.post.imgId = this.img.id;
        this.existsModal = false;
        this.post.url = this.img.content.url;
        this.img.alt = this.img.content.alt;
        this.type = "";
        this.file = "";
        this.img.alt = "";
      } else if (this.type == "edit") {
        this.clickedPost.imgId = this.img.id;
        this.existsModal = false;
        this.clickedPost.url = this.img.content.url;
        this.img.alt = this.img.content.alt;
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
    submitForm() {
      if (this.post.date === "" || this.post.title === "") {
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
        this.addPost();
      }
    },
    nextPage() {
      this.pageNumber++;
    },
    prevPage() {
      this.pageNumber--;
    },
    deletePost(post) {
      this.deleteModal = true;
      this.toDeletePost.title = post.title;
      this.toDeletePost.id = post.id;
    },
    cancelDelete() {
      this.toDeletePost = {
        id: "",
        title: "",
      };
      this.deleteModal = false;
    },
    confirmDelete() {
      postsCollection
        .doc(this.toDeletePost.id)
        .delete()
        .then(() => {
          this.deleteModal = false;
          this.msg = {
            type: "danger",
            message: "Post deleted",
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
    editPost(post) {
      this.editModal = true;
      this.clickedPost.id = post.id;
      this.clickedPost.title = post.title;
      this.clickedPost.content = post.content;
      this.clickedPost.excerpt = post.excerpt;
      this.clickedPost.slug = post.slug;
      this.clickedPost.date = post.date;
      this.clickedPost.content = post.content;
      this.clickedPost.year = post.year;
      this.clickedPost.url = post.url;
      this.clickedPost.imgId = post.imgId;
      this.clickedPost.quoteContent = post.quoteContent,
      this.clickedPost.gallery = post.gallery
      this.clickedPost.published = post.published
    },
    cancelEdit() {
      this.clickedPost = {
        id: "",
        title: "",
        excerpt: "",
        slug: "",
        date: "",
        content: "",
        year: "",
        url: "",
        imgId: "",
        quoteContent: '',
        gallery: [],
        published: ""
      };
      this.editModal = false;
    },
    changeImage() {
      this.uploadImage = true;
      this.type = "edit";
    },
    saveEdit() {
      let slugArry = [];
        const newSlug = [];
        let date = "";
      // create slug
      slugArry = this.clickedPost.title.split(" ");
      date = this.clickedPost.date;
      this.clickedPost.year = date.split("-")[0];

      slugArry.forEach((item) => {
        newSlug.push(item.toLowerCase());
      });

      this.clickedPost.slug = newSlug.join("-") + "-" + date;

      postsCollection
        .doc(this.clickedPost.id)
        .update({
          title: this.clickedPost.title,
          excerpt: this.clickedPost.excerpt,
          slug: this.clickedPost.slug,
          date: this.clickedPost.date,
          content: this.clickedPost.content,
          year: this.clickedPost.year,
          createdOn: new Date(),
          imgId: this.clickedPost.imgId,
          url: this.clickedPost.url,
          quoteContent: this.clickedPost.quoteContent,
          gallery: this.clickedPost.gallery,
          published: this.clickedPost.published
        })
        .then(() => {
          this.cancelEdit();
          this.msg = {
            type: "success",
            message: "Post updated",
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
  },
};
</script>
