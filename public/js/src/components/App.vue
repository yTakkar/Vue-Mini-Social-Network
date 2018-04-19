<template>
  <div>
    <app-header />
    <div class='notes_wrapper'>
      <transition name='fade' >
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import Header from './others/header.vue'

export default {
  components: {
    'app-header': Header
  }
}
</script>
