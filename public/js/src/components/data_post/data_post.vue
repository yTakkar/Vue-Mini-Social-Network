<template>

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
        <img v-if="hasPhoto" class='note_photo' :src="photoSrc" />
      </div>
        <Prompt
          v-if='deleting'
          title='Delete post'
          content="This post will be deleted. There's no undo so you won't be able to find it."
          actionText='Delete'
          @back='_toggle("deleting")'
          @action='deletePost'
        />
    </div>

</template>

<script>
import db from '../firebaseInit'
export default {
  data(){
    console.log("Hello!");
    return {
      imgSrc: `/users/${this.post.user}/avatar.jpg`,
      photoSrc: ''
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
    }
  },
  Back(){
    history.back()
  },
  _toggle(what) {
    this[what] = !this[what]
    what == 'editing' ? $('.v_n_edit').blur() : null
  },
  deletePost: async function() {
    let
      {
        $route: { params: { post } },
        $http,
        $store: { commit }
      } = this,
      { body: { mssg } } = await $http.post('/api/delete-post', { post })

    Notify({
      value: mssg,
      done: () => this.Back()
    })
    commit('DELETE_POST', post)
  }
}
</script>
