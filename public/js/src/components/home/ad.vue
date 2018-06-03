<template>
  <div class='ad'>
    <img :src='imagePath'/>
    <p>Advertisement</p>
  </div>
</template>

<script>
export default {
  data(){
    return {
      imagePath: '/images/dutch.gif'
    }
  }
}
</script>
