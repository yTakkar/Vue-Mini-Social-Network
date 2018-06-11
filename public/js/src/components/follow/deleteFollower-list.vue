<template>

  <div v-if='is_on' class='modal_items fer_items'>
    <div class='modal_it_img'>
      <img :src='imgSrc' />
    </div>
    <div class='modal_it_content'>
      <div class='modal_it_info'>
        <router-link :to='link' class='modal_it_username'>{{ follower.follow_by_username }}</router-link>
        <span class='modal_it_light'>{{ follower.follow_time | timeAgo }}</span>
      </div>
      <div class='modal_ff'>
        <a href='#' class='pri_btn follow' @click.prevent='delete_follower' >Remove friend</a>
      </div>
    </div>
    <hr />
  </div>

</template>

<script>
import moduleMixin from '../../mixins/module-mixin'
import { accept, decline } from '../../utils/functions.js'

export default {
  mixins: [moduleMixin],
  props: {
    follower: {
      type: Object,
      required: true
    }
  },
  data(){
    return {
      imgSrc: `/users/${this.follower.follow_by}/avatar.jpg`,
      link: {
        name: "profile",
        params: { username: this.follower.follow_by_username }
      },
      is_on: true
    }
  },
  methods: {
    delete_follower(){
      let {
        follower: { follow_by },
      } = this
      decline({
        user: follow_by,
        done: () => this.is_on = false
      })
    }
  }
}
</script>
