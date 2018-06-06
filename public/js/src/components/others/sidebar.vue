<template>
  <div>
  <span style="cursor:pointer" @click="openNav()">&#9776;</span>
    <div id="mySidenav" class="sidenav">
      <a  class="closebtn" @click="closeNav()">&times;</a>
      <div class='profile_img_div'>
        <img :src='myImgSrc' alt='Your Profile!!' >
      </div>
      <router-link :to='{ name: "profile", params: { username: session.username } }' class='user_main_link'>{{ session.username }}</router-link>

      <router-link to='/' :exact='true' active-class='ha_active' >Home</router-link>
      <router-link to='/explore' active-class='ha_active' >Explore</router-link>
      <!--<router-link to='/404' :exact='true' active-class='ha_active' >Home</router-link>-->
      <router-link to='/deactivate' active-class='ha_active' >Deactivate</router-link>
    </div>
  </div>
</template>


<script>
  import userMixin from '../../mixins/user-mixin'

  export default {
    name: 'Sidebar',
    components: {
    },
    mixins: [userMixin],
    data () {
      return {
      }
    },

    computed: {
    },

    methods: {
      openNav() {
        document.getElementById("mySidenav").style.width = "250px";
      },
      closeNav() {
        document.getElementById("mySidenav").style.width = "0";
      }

    },
    created () {
    }
  }

</script>

<style>
  .sidenav {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #111;
    overflow-x: hidden;
    transition: 0.5s;
    padding-top: 60px;
  }

  .sidenav a {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 25px;
    color: #818181;
    display: block;
    transition: 0.3s;
  }

  .sidenav a:hover {
    color: #f1f1f1;
  }

  .sidenav .closebtn {
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 36px;
    margin-left: 50px;
  }

  @media screen and (max-height: 450px) {
    .sidenav {padding-top: 15px;}
    .sidenav a {font-size: 18px;}
  }
</style>
