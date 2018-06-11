<template>

  <div class='feeds_wrapper'>
    <ui-alert @dismiss="showAlert1 = false" v-show="showAlert1">
       Hi! Welcome to SpeakEasy, your private network!
    </ui-alert>
    <template v-if='feeds.length > 0'>
      <template v-for='feed in feeds'>
        <Post :key='feed.post_id' :post='feed' />
      </template>
      <End />
    </template>

    <Nothing v-if='feeds.length == 0' mssg="Welcome to Speakeasy. Your feed is currently empty. Follow someone to securely share information!" />

  </div>

</template>

<script>
import moduleMixin from '../../mixins/module-mixin'

export default {
  data() {
      return {
          showAlert1: true,
      };
  },
  methods: {
      resetAlerts() {
          this.showAlert1 = true;
      }
  },
  mixins: [
    moduleMixin
  ],
  computed: {
    feeds(){
      return this.p.feeds
    }
  }
}
</script>
