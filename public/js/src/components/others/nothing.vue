<template>
  <div class='home_last_mssg' :style='style' >
    <img src='/images/large.jpg' />
    <span v-if='showMssg' >{{ mssg }}</span>
  </div>
</template>

<script>
export default {
  props: {
    mssg: {
      default: 'Hello, a message for you!!',
      type: String
    },
    showMssg: {
      default: true,
      type: Boolean
    }
  },
  data(){
    return {
      style: {
        border: !this.showMssg ? 'none': null
      }
    }
  }
}
</script>
