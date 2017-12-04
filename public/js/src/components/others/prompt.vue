<template>
  <transition name='fade' >

    <div class='prompt'>

      <div class='prompt-top'>
        <span class='prompt-title'>{{ title }}</span>
        <span @click='back' >
          <i class='material-icons'>clear</i>
        </span>
      </div>

      <div class='prompt-middle' :style='removedBlur' >
        <span class='prompt-content'>{{ content }}</span>
      </div>

      <div class='prompt-bottom'>
        <a href='#' class='sec_btn prompt-cancel' @click.prevent='back' >Cancel</a>
        <a href='#' class='pri_btn prompt-done' @click.prevent='action' >{{ actionText }}</a>
      </div>

    </div>

  </transition>
</template>

<script>
import $ from 'jquery'

export default {
  props: {
    title: {
      default: 'Title',
      type: String
    },
    content: {
      default: 'Main content goes here. Content should be of 2 lines to avoid the blur that Chrome creates!!',
      type: String
    },
    actionText: {
      default: 'Action',
      type: String
    },
    blurredByChrome: {
      default: false,
      type: Boolean
    }
  },
  data(){
    return {
      removedBlur: {
        marginTop: this.blurredByChrome ? '9px' : null
      }
    }
  },
  methods: {
    back(){
      this.$emit('back')
    },
    action() {
      this.$emit('action')
    }
  },
  mounted() {
    $('.v_n_delete').blur()
    $('.prompt-done').focus()
  }
}
</script>
