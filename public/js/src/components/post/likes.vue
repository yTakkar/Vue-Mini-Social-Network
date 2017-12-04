<template>

  <div class='followers modal modal_big'>
    <div class='fer_header modal_header'>
      <span class='title'>Likes</span>
      <Goto />
    </div>
    <div class='fer_middle modal_middle' :style='{ height: "450px" }' >
      <div class='modal_main' >
        <template v-if='likes.length > 0' >
          <template  v-for='l in likes' >
            <Like-list :key='l.follow_id' :like='l' />
          </template>
        </template>
        <Nothing v-if='likes.length == 0' :showMssg='false' />
      </div>
    </div>
    <div class='fer_bottom modal_bottom'>
      <a href='#' class='fer_cancel pri_btn' @click.prevent='Back' >Back</a>
    </div>
  </div>

</template>

<script>
import moduleMixin from '../../mixins/module-mixin'
import LikeList from './like-list.vue'
import { llr } from '../../utils/functions'

export default {
  mixins: [moduleMixin],
  components: {
    'Like-list': LikeList
  },
  computed: {
    likes(){
      return this.pi.likes
    }
  },
  methods: {
    Back() {
      history.back()
    }
  },
  updated(){
    llr()
  }
}
</script>
