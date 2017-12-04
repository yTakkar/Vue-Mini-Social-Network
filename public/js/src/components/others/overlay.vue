<template>
  <div>
    <div :class='classObj'></div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      default: 'black',
      type: String
    }
  },
  data(){
    return {
      classObj: {
        overlay: this.type == 'black',
        hidden_overlay: this.type == 'white',
        colored_overlay: this.type == 'colored'
      }
    }
  }
}
</script>
