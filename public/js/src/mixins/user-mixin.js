// MIXINS TO RETURN MOST USED DATA

export default {
  computed: {

    user() {
      return this.$store.state.user.userDetails
    },

    session() {
      return this.$store.state.user.session
    },

    // returns user's avatar
    imgSrc(){
      return `/users/${this.user.id}/avatar.jpg`
    },

    // returns boolean if it's me
    me(){
      return this.session.id == this.user.id
    }

  }
}
