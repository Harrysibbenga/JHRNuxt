<template>
  <div
    v-if="msg.message != ''"
    :class="`bg-${msg.type}`"
    class="pl-5 mt-2 text-white text-center"
  >
    <p>{{ msg.message }}</p>
  </div>
</template>

<script>
export default {
  props: {
    msg: {
      type: Object,
      default: () => ({
        type: '',
        message: '',
      })
    }
  },
};
</script>
