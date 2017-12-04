<template>
  <div class='notes'>

    <template v-if='posts.length > 0' >
      <template v-for='post in posts' >
        <Post :key='post.post_id' :post='post' />
      </template>
      <End />
    </template>

    <template v-else >
      <Nothing v-if='session.id == user.id' mssg='No posts. Go ahead and created one!!' />
      <Nothing v-else :mssg='noMssg' />
    </template>

  </div>
</template>

<script>
import userMixin from '../../mixins/user-mixin'
import moduleMixin from '../../mixins/module-mixin'

export default {
  mixins: [
    userMixin,
    moduleMixin
  ],
  computed: {
    posts(){
      return this.p.posts
    },
    noMssg(){
      return `${this.user.username} has no posts!!`
    }
  },
}
</script>
