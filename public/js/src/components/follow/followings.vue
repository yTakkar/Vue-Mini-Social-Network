<template>

  <div class='followers modal modal_big'>
    <div class='fer_header modal_header'>
      <span class='title'>Followings</span>
      <Goto />
    </div>
    <div class='fer_middle modal_middle' :style='{ height: "450px" }' >
      <div class='modal_main' >
        <template v-if='followings.length > 0' >
          <template v-for='f in followings' >
            <Following-list :key='f.follow_id' :following='f' />
          </template>
        </template>
        <Nothing v-if='followings.length == 0' :showMssg='false' />
      </div>
    </div>
    <div class='fer_bottom modal_bottom'>
      <a href='#' class='fer_cancel pri_btn' @click.prevent='Back' >Back</a>
    </div>
  </div>

</template>

<script>
import moduleMixin from '../../mixins/module-mixin'
import { llr } from '../../utils/functions'
import FollowingList from './following-list.vue'

export default {
  mixins: [moduleMixin],
  components: {
    'Following-list': FollowingList
  },
  computed: {
    followings(){
      return this.f.followings
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
