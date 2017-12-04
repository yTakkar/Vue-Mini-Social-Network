<template>
  <div>

    <span v-if='false' >{{ username }}</span>

    <div class='aligner'>
      <Banner />
      <Posts />
    </div>

    <router-view name='overlay' ></router-view>

    <transition-group name='fade' >
      <router-view name='create-post' key='create-post' ></router-view>
      <router-view name='followers' key='followers' ></router-view>
      <router-view name='followings' key='followings' ></router-view>
    </transition-group>

  </div>
</template>

<script>
import userMixin from '../../mixins/user-mixin'
import * as fn from '../../utils/functions'
import Banner from './banner.vue'
import Posts from './posts.vue'

export default {
  mixins: [userMixin],
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
    fn.forProfile(this)
  },
  updated(){
    fn.forProfile(this)
  },
  components: {
    'Banner': Banner,
    'Posts': Posts,
  }
}
</script>
