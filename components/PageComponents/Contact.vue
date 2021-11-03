<template>
  <div>
    <form class="needs-validation" novalidate @submit.prevent="submitForm">
      <mdb-card>
        <mdb-card-header class="text-center">
          <h3>Contact Us</h3>
        </mdb-card-header>
        <mdb-card-body class="container">
          <mdb-card-text class="pb-4 text-center" mr-4 ml-4>
            Do you have any questions? Please do not hesitate to contact us and one of the team will get back to you as soon as possible.
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
                    :rows="5"
                    label="Your message"
                    v-model="fields.message"
                    required
                  />
                </mdb-col>
              </mdb-row>
            </mdb-col>
          </mdb-row>
        </mdb-card-body>
        <div class="g-recaptcha" data-sitekey="6LfX76QZAAAAABce03WAFwtbZgnHU909_NDK8q7t"></div>
        <mdb-card-footer class="text-center">
          <mdb-btn color="secondary" type="submit">Send</mdb-btn>
        </mdb-card-footer>
      </mdb-card>
    </form>
  </div>
</template>

<script>
import emailjs from "emailjs-com";

import {
  mdbBtn,
  mdbCard,
  mdbCardBody,
  mdbCardHeader,
  mdbCardFooter,
  mdbRow,
  mdbCol,
  mdbInput,
  mdbCardText,
} from "mdbvue";
export default {
  components: {
    mdbCardHeader,
    mdbCardFooter,
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
