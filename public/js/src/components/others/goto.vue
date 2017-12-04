<template>

  <div class='goto'>
    <div class='goto_link'>
      <span class='goto_label'>Go to</span>
      <span class='show_more' @click='toggle' >
        <i class='material-icons'>expand_more</i>
      </span>
    </div>
    <div class='options goto_options' :style='{ display: "none" }' >
      <ul class='o_ul'>
        <li class='o_li'>
          <router-link to='/' class='o_a'>Home</router-link>
        </li>
        <li class='o_li'>
          <router-link :to='{ name: "profile", params: { username: session.username } }' class='o_a'>Profile</router-link>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
import $ from 'jquery'
import userMixin from '../../mixins/user-mixin'

export default {
  mixins: [userMixin],
  methods: {
    toggle(){
      $('.goto_options').toggle()
    }
  }
}
</script>
