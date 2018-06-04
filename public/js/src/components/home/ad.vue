<template>
  <div class='ad'>
    <img :src='imagePath' width="250px" height="250px"/>
    <p>Advertisement</p>
  </div>
</template>

<script>
export default {
  data(){
    // TODO: use firebase storage for storing ads
    return {
      imagePath: '/images/dutch.gif'
    }
  }
}
</script>

<style scoped>
  .ad {
    background-color: white;
    width: 250px
  }
</style>
