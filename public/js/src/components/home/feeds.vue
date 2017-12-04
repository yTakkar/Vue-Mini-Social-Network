<template>

  <div class='feeds_wrapper'>

    <template v-if='feeds.length > 0'>
      <template v-for='feed in feeds'>
        <Post :key='feed.post_id' :post='feed' />
      </template>
      <End />
    </template>

    <Nothing v-if='feeds.length == 0' mssg="Looks like you're new, Follow some to fill up your feed!!" />

  </div>

</template>

<script>
import moduleMixin from '../../mixins/module-mixin'

export default {
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
