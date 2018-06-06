<template>

  <div class='followers modal modal_big'>
    <div class='fer_header modal_header'>
      <span class='title'>Confirm Pending Followers</span>
      <Goto />
    </div>
    <div class='fer_middle modal_middle' :style='{ height: "450px" }' >
      <div class='modal_main' >
        <template v-if='pendings.length > 0' >
          <template v-for='f in pendings' >
            <ConfirmFollower-list :key='f.follow_id' :follower='f' />
          </template>
        </template>
        <Nothing v-if='pendings.length == 0' :showMssg='false' />
      </div>
    </div>
    <div class='fer_bottom modal_bottom'>
      <a href='#' class='fer_cancel pri_btn' @click.prevent='Back' >Back</a>
    </div>
  </div>

</template>

<script>
import moduleMixin from '../../mixins/module-mixin'
import ConfirmFollowerList from './confirmFollower-list.vue'
import { llr } from '../../utils/functions'

export default {
  mixins: [moduleMixin],
  components: {
    'ConfirmFollower-list': ConfirmFollowerList
  },
  computed: {
    pendings(){
      return this.f.pendings
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
