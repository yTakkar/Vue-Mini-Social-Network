<template>
  <div class='ad'>
    <img :src='imagePath' width="250px" height="250px"/>
    <p><a style="color: black;" href="/publish">Advertise Here!</a></p>
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
    width: 250px;
    position: absolute;
    left: 780px;
    top: 30px;
  }
</style>
