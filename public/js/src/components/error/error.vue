<template>

  <div class='error'>
    <div class='welcome_div error_div'>
      <div class='error_info'>
        <span>Oops, the </span>
        <span v-if="what == 'user' || what == 'post'" >{{ what }}</span>
        <span v-else >page</span>
        <span> you're looking for does not exist!!</span>
      </div>
      <img src='/images/error-3.svg' alt='' />
      <div class='error_bottom'>
        <router-link :to="{ name: 'profile', params: { username: session.username } }" class='sec_btn error_home'>View profile</router-link>
        <router-link to='/' class='pri_btn error_login'>Try going to homepage</router-link>
      </div>
    </div>
  </div>

</template>

<script>
import userModule from '../../mixins/user-mixin'

export default {
  mixins: [userModule],
  data(){
    return {
      what: this.$route.params.what
    }
  }
}
</script>
