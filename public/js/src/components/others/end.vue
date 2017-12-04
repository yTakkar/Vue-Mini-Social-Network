<template>
  <div class='page_end' @click='ToTop'>
    <span>{{ mssg }}</span>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  props: {
    mssg: {
      default: 'Looks like you\'ve reached the end',
      type: String
    }
  },
  methods: {
    ToTop() {
      $('html, body').animate({
        scrollTop: 0
      }, 450)
    }
  }
}
</script>
