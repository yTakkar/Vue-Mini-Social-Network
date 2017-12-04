<template>

  <router-link :to="{ name: 'view-post', params: { post: post.post_id } }" >
    <div class='note'>
      <div class='note_header common_header'>
        <img :src='imgSrc' alt='Your profile!!' />
        <div class='note_h_left'>
          <span class='note_username'>{{ post.username }}</span>
          <span class='note_time'>{{ post.post_created | timeAgo }}</span>
        </div>
      </div>
      <div class='note_title'>
        <span>{{ post.title | to-uppercase }}</span>
      </div>
      <div class='note_content'>
        <span>{{ post.content | slice }}</span>
      </div>
    </div>
  </router-link>

</template>

<script>
export default {
  data(){
    return {
      imgSrc: `/users/${this.post.user}/avatar.jpg`
    }
  },
  props: {
    post: {
      type: Object,
      required: true
    }
  }
}
</script>
