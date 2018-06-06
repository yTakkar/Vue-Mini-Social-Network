<template>

  <div class='header_loggedin'>

    <div class='left'>
      <sidebar style="display: inline"/>
    </div>
    <div class='right'>
        <router-link :to="{ name: 'profile', params: { username: session.username } }" active-class='ha_active' >Profile</router-link>
      <a href='/logout'>Logout</a>
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
