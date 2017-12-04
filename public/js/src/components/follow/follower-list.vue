<template>

  <div class='modal_items fer_items'>
    <div class='modal_it_img'>
      <img :src='imgSrc' />
    </div>
    <div class='modal_it_content'>
      <div class='modal_it_info'>
        <router-link :to='link' class='modal_it_username'>{{ follower.follow_by_username }}</router-link>
        <span class='modal_it_light'>{{ follower.follow_time | timeAgo }}</span>
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
      is_following: false
    }
  },
  computed: {
    me(){
      return this.follower.follow_by == this.u.session.id
    }
  },
  methods: {
    follow(){
      let {
        u: { userDetails, session },
        follower: { follow_by, follow_by_username },
        $store: { commit },
      } = this
      follow({
        user: follow_by,
        username: follow_by_username,
        update_followings: userDetails.id == session.id,
        commit,
        done: () => this.is_following = true
      })
    },
    unfollow(){
      let {
        u: { userDetails, session },
        follower: { follow_by },
        $store: { commit },
      } = this
      unfollow({
        user: follow_by,
        update_followings: userDetails.id == session.id,
        commit,
        done: () => this.is_following = false
      })
    }
  },
  created: async function(){
    let { u: { session }, follower } = this
    if (session.id != follower.follow_by){
      this.is_following = await isFollowing(follower.follow_by_username)
    }
  }
}
</script>
