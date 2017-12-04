<template>

  <div class='header_loggedin'>
    <div class='left'>
      <router-link to='/' :exact='true' active-class='ha_active' >Home</router-link>
      <router-link to='/explore' active-class='ha_active' >Explore</router-link>
      <router-link to='/deactivate' active-class='ha_active' >Deactivate</router-link>
    </div>
    <div class='right'>
      <router-link :to='{ name: "edit-profile" }' active-class='ha_active' >Edit Profile</router-link>
      <router-link :to="{ name: 'profile', params: { username: session.username } }" active-class='ha_active' >Profile</router-link>
      <a href='/logout'>Logout</a>
    </div>
  </div>

</template>

<script>
import userMixin from '../../mixins/user-mixin'

export default {
  mixins: [userMixin]
}
</script>
