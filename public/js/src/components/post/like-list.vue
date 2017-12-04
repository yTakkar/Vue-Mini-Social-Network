<template>

  <div class='modal_items fer_items'>
    <div class='modal_it_img'>
      <img :src='imgSrc' />
    </div>
    <div class='modal_it_content'>
      <div class='modal_it_info'>
        <router-link :to='link' class='modal_it_username'>{{ like.like_by_username }}</router-link>
        <span class='modal_it_light'>{{ like.like_time | timeAgo }}</span>
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
    like: {
      type: Object,
      required: true
    }
  },
  data(){
    return {
      imgSrc: `/users/${this.like.like_by}/avatar.jpg`,
      link: {
        name: "profile",
        params: { username: this.like.like_by_username }
      },
      is_following: false
    }
  },
  computed: {
    me(){
      return this.like.like_by == this.u.session.id
    }
  },
  methods: {
    follow(){
      let {
        u: { userDetails, session },
        like: { like_by, like_by_username },
        $store: { commit },
      } = this
      follow({
        user: like_by,
        username: like_by_username,
        update_followings: userDetails.id == session.id,
        commit,
        done: () => this.is_following = true
      })
    },
    unfollow(){
      let {
        u: { userDetails, session },
        like: { like_by },
        $store: { commit },
      } = this
      unfollow({
        user: like_by,
        update_followings: userDetails.id == session.id,
        commit,
        done: () => this.is_following = false
      })
    }
  },
  created: async function(){
    let { u: { session }, like } = this
    if (session.id != like.like_by){
      this.is_following = await isFollowing(like.like_by_username)
    }
  }
}
</script>
