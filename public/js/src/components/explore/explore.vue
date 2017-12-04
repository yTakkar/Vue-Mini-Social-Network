<template>

  <div class='explore' >
    <div class='explores'>

      <template v-if='explores.length > 0' >
        <template v-for='e in explores' >
          <Explore-list :key='e.id' :exp='e' />
        </template>
        <End />
      </template>

      <Nothing v-if='explores.length == 0' mssg='No one to explore!!' />

    </div>
  </div>

</template>

<script>
import moduleMixin from '../../mixins/module-mixin'
import ExploreList from './explore-list.vue'

export default {
  mixins: [moduleMixin],
  components: {
    'Explore-list': ExploreList
  },
  computed: {
    explores(){
      return this.e.explores
    }
  },
  created(){
    this.$store.dispatch('getExplores')
  }
}
</script>
