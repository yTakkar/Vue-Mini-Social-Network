<template>

  <div class='create_note modal'>
    <form @submit.prevent='createPost' >

      <div class='c_n_header modal_header'>
        <span class='title'>Create Post</span>
        <Goto />
      </div>

      <div class='c_n_middle modal_middle'>
        <input type='text' placeholder='Title..' ref='title' required spellCheck='false' autoComplete='false' autoFocus class='cp_title' />
        <textarea placeholder='Your post..' ref='content' required spellCheck='false' autoComplete='false'></textarea>
        <input type='file' id='photo' ref='photo' />
      </div>

      <div class='c_n_bottom modal_bottom'>
        <a href='#' class='c_n_cancel sec_btn' @click.prevent='Back' >Back</a>
        <input type='submit' class='c_n_add pri_btn' value='Add Post' />
      </div>

    </form>
  </div>

</template>

<script>
import $ from 'jquery'
import Notify from 'handy-notification'
import UserMixin from '../../mixins/user-mixin'
import db from '../firebaseInit'
import uuid from 'uuid'

export default {
  mixins: [ UserMixin ],
  methods: {
    Back () {
      history.back()
    },
    createPost: async function() {

      let imgId = '', file = document.getElementById('photo').files[0];
      if (file !== undefined){
        imgId = uuid() + '.jpg';
        await db.ref().child('images/' + imgId).put(file).then(function (snapshot) {
          console.log('Uploaded a blob or file!')
        });
      }

      let {
        $refs: { title, content },
        $http,
        $store: { commit }
      } = this
      let { body } = await $http.post('/api/create-post', {
        title: title.value,
        content: content.value,
        img_id: imgId,
      })
      Notify({
        value: 'Post Created!!',
        done: () => this.Back()
      })
      commit('ADD_POST', body)
    }
  },
  created(){
    let {
      session: { username },
      $route: { params },
      $router,
    } = this
    username != params.username ? $router.push('/error')  : null
  },
  mounted(){
    $('.cp_title').focus()
  }
}
</script>
