<template>

  <div class='header_loggedin'>
    <div class='left'>
      <sidebar style="display: inline"/>
    </div>
    <div class='right'>
        <router-link :to="{ name: 'publish', params: { username: session.username }}" active-class="ha_active">SpeakEasy Ads</router-link>
        <router-link :to="{ name: 'profile', params: { username: session.username } }" active-class='ha_active'><ui-icon>person</ui-icon>Profile</router-link>
      <a href='/logout'><ui-icon>meeting_room</ui-icon>Logout</a>
    </div>
  </div>

</template>

<script>
import userMixin from '../../mixins/user-mixin'
import Sidebar from './sidebar.vue'

export default {
  components: {
    'sidebar': Sidebar
  },
  mixins: [userMixin]
}
</script>
