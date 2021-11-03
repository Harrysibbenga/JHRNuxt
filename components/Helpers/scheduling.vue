<template>
  <div>
    <div class="md-form col-md-6 d-flex flex-row justify-content-between">
        <mdb-input v-model="date" type="date" />
        <mdb-input v-model="time" type="time" />
        <mdb-btn color="info" @click.native="updatePublishDate">Update</mdb-btn>
    </div>
  </div>
</template>

<script>
import {mdbInput, mdbBtn} from 'mdbvue'
import moment from 'moment'

export default {
  components: {
    mdbInput,
    mdbBtn,
  },
  props: {
    publishDate: {
      type: String,
      default: '',
    }
  },
  data () {
    return {
      newDate: '',
      newTime: ''
    }
  },
  computed: {
    date: {
      get() {
        return this.newDate
      },
      set(newVal, oldVal) {
        this.newDate = newVal
      }
    },
    time: {
      get() {
        return this.newTime
      },
      set(newVal, oldVal) {
        this.newTime = newVal
      }
    }
  },
  created() {
    if (this.publishDate === "") {
      setTimeout(() => {
        this.loadPublishDate()
      }, 500)
    } else {
      this.newDate = moment(this.publishDate).format("YYYY-MM-DD")
      this.newTime = moment(this.publishDate).format("h:mm")
    }
  },
  methods: {
    updatePublishDate() {
      const dateArr = this.newDate.split('-')
      const timeArr = this.newTime.split(':')
      const publishDate = moment({ year :dateArr[0], month :dateArr[1]-1, day :dateArr[2], hour :timeArr[0], minute :timeArr[1]}).format()
      this.$emit('update:publishDate', publishDate)
    },
    loadPublishDate() {
      this.newDate = moment().format("YYYY-MM-DD")
      this.newTime = moment().format("h:mm")
      const dateArr = this.newDate.split('-')
      const timeArr = this.newTime.split(':')
      const publishDate = moment({ year :dateArr[0], month :dateArr[1]-1, day :dateArr[2], hour :timeArr[0], minute :timeArr[1]}).format()
      this.$emit('update:publishDate', publishDate)
    }
  }
}
</script>
