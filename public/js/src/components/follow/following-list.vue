<template>

  <div class='modal_items fer_items'>
    <div class='modal_it_img'>
      <img :src='imgSrc' />
    </div>
    <div class='modal_it_content'>
      <div class='modal_it_info'>
        <router-link :to='link' class='modal_it_username'>{{ following.follow_to_username }}</router-link>
        <span class='modal_it_light'>{{ following.follow_time | timeAgo }}</span>
      </div>
      <div class='modal_ff'>
        <router-link v-if='me' :to='link' class='pri_btn follow'>Profile</router-link>
        <template v-else >
          <a v-if='is_following' href='#' class='pri_btn unfollow' @click.prevent='unfollow' >Unfollow</a>
          <a v-if='!is_following' href='#' class='pri_btn follow' @click.prevent='follow' >Follow</a>
        </template>
      </div>
    </div>
    <hr />
  </div>

</template>

<script>
import moduleMixin from '../../mixins/module-mixin'
import { follow, unfollow, isFollowing } from '../../utils/functions.js'

export default {
  mixins: [moduleMixin],
  props: {
    following: {
      type: Object,
      required: true
    }
  },
  data(){
    return {
      imgSrc: `/users/${this.following.follow_to}/avatar.jpg`,
      link: {
        name: "profile",
        params: { username: this.following.follow_to_username }
      },
      is_following: false
    }
  },
  computed: {
    me(){
      return this.following.follow_to == this.u.session.id
    }
  },
  methods: {
    follow(){
      let {
        u: { userDetails, session },
        following: { follow_to, follow_to_username },
        $store: { commit },
      } = this
      follow({
        user: follow_to,
        username: follow_to_username,
        update_followings: userDetails.id == session.id,
        commit,
        done: () => this.is_following = true
      })
    },
    unfollow(){
      let {
        u: { userDetails, session },
        following: { follow_to },
        $store: { commit },
      } = this
      unfollow({
        user: follow_to,
        update_followings: userDetails.id == session.id,
        commit,
        done: () => this.is_following = false
      })
    }
  },
  created: async function(){
    let { u: { session }, following } = this
    if (session.id != following.follow_to){
      this.is_following = await isFollowing(following.follow_to_username)
    }
  }
}
</script>

