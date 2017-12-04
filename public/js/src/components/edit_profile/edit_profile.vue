<template>
  <div class='edit edit_profile'>

    <div class='edit_info'>
      <img class='edit_img' :src='imgSrc' alt='Your avatar' />
      <span>@{{ user.username }}</span>
    </div>
    <div class='eu_div'>
      <span class='edit_span'>Username</span>
      <input type='text' class='e_username ep_username' placeholder='Username..' autoComplete='false' autoFocus spellCheck='false' :value='user.username' />
    </div>
    <div class='ee_div'>
      <span class='edit_span'>Email</span>
      <input type='email' class='e_email ep_email' placeholder='Email..' autoComplete='false' spellCheck='false' :value='user.email' />
    </div>
    <div class='eb_div'>
      <span class='edit_span'>Bio</span>
      <textarea class='e_bio ep_bio' placeholder='Bio..' spellCheck='false' :value='user.bio' ></textarea>
    </div>
    <div class='eb_btns'>
      <form class='avatar_form' method='post' enctype='multipart/formdata'>
        <input type='file' name='avatar' id='avatar_file' accept='image/*' @change='changeAvatar' />
        <label for='avatar_file' class='avatar_span sec_btn'>Change avatar</label>
      </form>
      <a href='#' class='pri_btn e_done ep_done' @click.prevent='editProfile' >Done editing</a>
    </div>
    <div class='e_joined'>
      <span>You joined Notes App {{ user.joined | timeAgo }}</span>
    </div>

  </div>
</template>

<script>
import $ from 'jquery'
import Notify from 'handy-notification'
import userMixin from '../../mixins/user-mixin'

export default {
  mixins: [userMixin],
  methods: {
    editProfile: async function(){
      let
        username = $('.ep_username').val(),
        email = $('.ep_email').val(),
        bio = $('.ep_bio').val(),
        button = $('.ep_done'),
        {
          user: { username: susername, email: semail },
          $http,
        } = this,
        { body: uCount} = await $http.post('/api/what-exists', { what: 'username', value: username }),
        { body: eCount} = await $http.post('/api/what-exists', { what: 'email', value: email })

      button
        .addClass('a_disabled')
        .text('Processing..')
        .blur()

      if (!username) {
        Notify({ value: 'Username must not be empty!!' })
      } else if (!email) {
        Notify({ value: 'Email must not be empty!!' })
      } else if (uCount == 1 && username != susername) {
        Notify({ value: 'Username already exists!' })
      } else if (eCount == 1 && email != semail) {
        Notify({ value: 'Email already exists!' })
      } else {
        let { body } = await $http.post('/api/edit-profile', { username, email, bio })
        Notify({
          value: body.mssg,
          done: () => location.reload()
        })
      }
      button
        .removeClass('a_disabled')
        .text('Done Editing')
        .blur()
    },
    changeAvatar: async function(e){
      let
        file = e.target.files[0],
        form = new FormData()

      $('.overlay-2').show()
      $('.avatar_span')
        .text('Changing avatar..')
        .addClass('sec_btn_disabled')

      form.append('avatar', file)

      $.ajax({
        url: '/api/change-avatar',
        method: 'POST',
        processData: false,
        contentType: false,
        data: form,
        dataType: 'JSON',
        success: data => {
          Notify({
            value: data.mssg,
            done: () => location.reload()
          })
        }
      })

    }
  },
  created(){
    let {
        session: { username },
        $store: { dispatch }
      } = this
    dispatch('userDetails', username)
  },
  mounted(){
    $('.ep_username').focus()
  }
}
</script>
