<template>
  <div>
  <span v-if='false' >{{ username }}</span>
    <div class='aligner'>
      <div class='user_banner' padding='10px'>
        <h2> Your Data Page </h2>
        <div class='user_bio'>
          This is all the information you have posted throughout SpeakEasy in one simple place. <br/> Here you can edit or delete your information as you see fit.
        </div>
        <div class='profile_img_div'>
          <img :src='imgSrc' alt='Your Data Page' >
        </div>
        <div class='user_info'>
          <router-link :to='{ name: "profile", params: { username: user.username } }' class='user_main_link'>{{ user.username }}</router-link>
          <span class='user_no_notes'>{{ user.email }}</span>
        </div>
      </div>
      <div class='notes'>
        <template v-if='posts.length > 0' >
          <template v-for='dataPost in posts' >
            <dataPost :key='dataPost.post_id' :post='dataPost' />
          </template>
          <End mssg="Back to Top"></End>
        </template>

        <template v-else >
          <Nothing mssg="You don't have any data in SpeakEasy."> </Nothing>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import userMixin from '../../mixins/user-mixin'
import moduleMixin from '../../mixins/module-mixin'
import dataPost from '../data_post/data_post.vue'
import * as fn from '../../utils/functions'

export default {
  mixins: [
    userMixin,
    moduleMixin
  ],
  data(){
    return {
      username: this.$route.params.username
    }
  },
  watch: {
    '$route' (to, from) {
      this.username = to.params.username
    }
  },
  created(){
    fn.forDataPage(this)
  },
  computed: {
    posts_len(){
      return this.p.posts.length
    },
    posts(){
        return this.p.posts
    }
  },
  components: {
    'dataPost': dataPost,
  }
}
</script>
