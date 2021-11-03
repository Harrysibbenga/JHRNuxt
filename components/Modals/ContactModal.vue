<template>
  <div>
    <!-- Side Modal Top Right -->
    <mdb-btn
      class="btn btn-grey text-white ml-auto mt-4"
      @click.native="modal = true"
    >Contact us for more information</mdb-btn>
    <mdb-modal
      side
      position="right"
      fullHeight
      direction="right"
      :show="modal"
      @close="modal = false"
      removeBackdrop
    >
      <form class="needs-validation" novalidate @submit.prevent="submitForm">
        <div class="g-recaptcha" data-sitekey="6LfX76QZAAAAABce03WAFwtbZgnHU909_NDK8q7t"></div>
        <mdb-modal-header>
          <mdb-modal-title>Contact Us</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body>
          <mdb-card>
            <mdb-card-body>
              <mdb-card-text class="pb-4 text-center" mr-4 ml-4>
                Do you have any questions? Please do not hesitate to contact us
                directly. Our team will get back to you within a matter of hours
                to help you.
              </mdb-card-text>
              <mdb-row>
                <mdb-col>
                  <mdb-row>
                    <mdb-col>
                      <mdb-input label="Your name" v-model="fields.name" required />
                    </mdb-col>
                    <mdb-col>
                      <mdb-input type="email" label="Your email" v-model="fields.email" required />
                    </mdb-col>
                  </mdb-row>
                  <mdb-row>
                    <mdb-col>
                      <mdb-input label="Subject" v-model="fields.subject" required />
                    </mdb-col>
                  </mdb-row>
                  <mdb-row>
                    <mdb-col>
                      <mdb-input
                        type="textarea"
                        label="Your message"
                        v-model="fields.message"
                        required
                      />
                    </mdb-col>
                  </mdb-row>
                </mdb-col>
              </mdb-row>
            </mdb-card-body>
          </mdb-card>
        </mdb-modal-body>
        <mdb-modal-footer>
          <mdb-btn color="danger" @click.native="modal = false">Close</mdb-btn>
          <mdb-btn color="secondary" type="submit">Send</mdb-btn>
        </mdb-modal-footer>
      </form>
    </mdb-modal>
  </div>
</template>

<script>
import emailjs from "emailjs-com";

import {
  mdbModal,
  mdbModalHeader,
  mdbModalTitle,
  mdbModalBody,
  mdbModalFooter,
  mdbBtn,
  mdbCard,
  mdbCardBody,
  mdbRow,
  mdbCol,
  mdbInput,
  mdbCardText,
} from "mdbvue";
export default {
  components: {
    mdbModal,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter,
    mdbCard,
    mdbBtn,
    mdbCardBody,
    mdbRow,
    mdbCol,
    mdbInput,
    mdbCardText,
  },
  data() {
    return {
      modal: false,
      fields: {
        name: "",
        email: "",
        subject: "",
        message: "",
      },
    };
  },
  methods: {
    validate() {
      const form = [...arguments];
      const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      for (let index in form) {
        let field = form[index];
        if (field === "email" && !emailRegexp.test(this.fields[field])) {
          return false;
        } else if (this.fields[field] === "") {
          return false;
        }
      }
      return true;
    },
    submitForm(event) {
      event.target.classList.add("was-validated");
      console.log("clicked");
      if (this.validate("email", "name", "message", "subject")) {
        emailjs
          .sendForm(
            "gmail_jhr",
            "jhr_template_CogtKdJO",
            event.target,
            "user_NneW5XuAU0JIqdI7Wr8RN"
          )
          .then(
            (result) => {
              console.log("SUCCESS!", result.status, result.text);
              event.target.classList.remove("was-validated");
              this.fields = {};
            },
            (error) => {
              console.log("FAILED...", error);
            }
          );
      }
    },
  },
};
</script>
