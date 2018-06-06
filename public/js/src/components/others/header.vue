<template>

  <div class='header_loggedin'>
    <div class='left'>
      <router-link to='/' :exact='true' active-class='ha_active'><ui-icon>home</ui-icon>Home</router-link>
      <router-link to='/explore' active-class='ha_active' ><ui-icon>public</ui-icon>Explore</router-link>
      <router-link to='/deactivate' active-class='ha_active' ><ui-icon>delete_forever</ui-icon>Deactivate</router-link>
    </div>
    <div class='right'>
        <router-link :to="{ name: 'profile', params: { username: session.username } }" active-class='ha_active'><ui-icon>person</ui-icon>Profile</router-link>
      <a href='/logout'><ui-icon>meeting_room</ui-icon>Logout</a>
    </div>
  </div>

</template>

<script>
import userMixin from '../../mixins/user-mixin'

export default {
  mixins: [userMixin]
}
</script>
