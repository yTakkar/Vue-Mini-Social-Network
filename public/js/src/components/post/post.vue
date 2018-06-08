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
      <div id='content' class='note_content'>
        <span>{{ post.content | slice }}</span>
        <img v-if="hasPhoto" class='note_photo' :src="photoSrc" />
      </div>
    </div>
  </router-link>

</template>

<script>
import db from '../firebaseInit'

export default {
  data () {
    return {
      imgSrc: `/users/${this.post.user}/avatar.jpg`,
      photoSrc: '',
    }
  },

  computed: {
    hasPhoto: function () {
      return this.post.img_id != ''
    }
  },

  created: function () {
    var vm = this;

    if(this.hasPhoto){
      db.ref().child('images/' + this.post.img_id)
      .getDownloadURL().then(function(url){
         vm.photoSrc = url;
      })
    }
  },

  props: {
    post: {
      type: Object,
      required: true
    },
  }
}

</script>
