<template>
  <div class='page_end' @click='ToTop'>
    <span><ui-icon>arrow_upward</ui-icon>{{ mssg }}</span>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  props: {
    mssg: {
      default: "   There aren't any more posts in your feed!",
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
