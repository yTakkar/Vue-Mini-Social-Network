<template>

  <div class='home'>
    <div class='home_info'>
      <span>{{ feeds_len }} Feeds</span>
      <router-link :to='{ name: "create-post", params: { username: session.username } }' class='pri_btn'>New Post</router-link>
    </div>
    <Feeds />
  </div>

</template>

<script>
import moduleMixin from '../../mixins/module-mixin'
import userMixin from '../../mixins/user-mixin'
import Feeds from './feeds.vue'

export default {
  mixins: [
    userMixin,
    moduleMixin
  ],
  components: {
    'Feeds': Feeds
  },
  computed: {
    feeds_len(){
      let len = this.p.feeds.length
      return len == 0 ? 'No' : len
    }
  },
  created() {
    this.$store.dispatch('getFeeds')
  }
}
</script>
