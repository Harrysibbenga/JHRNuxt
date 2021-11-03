<template>
  <div>
    <mdb-modal
      removeBackdrop
      frame
      position="bottom"
      direction="bottom"
      :show="modal"
      @close="close()"
    >
      <form
        action="https://torquetogether.us16.list-manage.com/subscribe/post?u=1e04e4b66dd0582c8dfc304e8&amp;id=836c8ab5aa"
        method="post"
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
        class="validate"
        target="_blank"
        novalidate
      >
        <mdb-modal-body class="text-center">
          <mdb-row>
            <mdb-col class="my-auto">
              <h4>Join our mailing list</h4>
            </mdb-col>
          </mdb-row>
          <mdb-row>
            <mdb-col class="d-flex" xl="8">
              <mdb-input label="First name" class="w-50 pr-2" id="mce-FNAME" name="FNAME" />
              <mdb-input label="Last name" class="w-50 pr-2" id="mce-LNAME" name="LNAME" />
              <mdb-input label="Email" type="email" class="w-50 pl-2" name="EMAIL" id="mce-EMAIL" />
            </mdb-col>
            <mdb-col class="my-auto">
              <a class="btn btn-danger" @click="close()">Close</a>
              <mdb-btn color="secondary" type="submit" @click.native="close()">Subscribe</mdb-btn>
            </mdb-col>
          </mdb-row>
        </mdb-modal-body>
      </form>
    </mdb-modal>
  </div>
</template>

<script>
import {
  mdbBtn,
  mdbModal,
  mdbModalBody,
  mdbInput,
  mdbCol,
  mdbRow,
} from "mdbvue";
export default {
  name: "MalingListModal",
  components: {
    mdbBtn,
    mdbModal,
    mdbModalBody,
    mdbInput,
    mdbCol,
    mdbRow,
  },
  computed: {
    modal() {
      return this.$store.getters["global/getModal"];
    },
  },
  methods: {
    close() {
      this.$store.dispatch("global/setModal", false);
    },
  },
};
</script>