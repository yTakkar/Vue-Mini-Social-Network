<template>
  <div>

    <div class='registered deactivate'>
      <span class='deactivate_title'>Deactivate your account?</span>
      <span>All of your posts, followers, likes & other info will be permanently deleted. And you won't be able to find it again.</span>
      <div class='deactivate_btn'>
        <a href='#' class='pri_btn d_btn' @click.prevent='_toggle' >Deactivate</a>
      </div>
    </div>

    <Overlay v-if='deactivated' type='black' />

    <Prompt
      v-if='deactivated'
      :blurredByChrome='true'
      title="Deactivate your account"
      content="Are you sure, you wanna permanently deactivate your account? There's no undo so you won't be able login with this account."
      actionText="Deactivate"
      @back='_toggle'
      @action='de'
    />

  </div>
</template>

<script>
import $ from 'jquery'
import Notify from 'handy-notification'

export default {
  data(){
    return {
      deactivated: false
    }
  },
  methods: {
    _toggle(){
      this.deactivated = !this.deactivated
    },
    de: async function(){
      let
        btn = $('.prompt-done'),
        o = $('.overlay')

      btn.addClass('a_disabled').text('Deactivating..')
      o.show()

      let { body: d } = await this.$http.post('/api/deactivate')

      btn.removeClass('a_disabled').text('Deactivated')
      Notify({
        value: "Deactivated",
        done: () => location.href = "/login"
      })
    }
  }
}
</script>
