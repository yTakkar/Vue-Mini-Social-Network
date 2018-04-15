// MIXINS TO RETURN STORE MODULES

export default {
  computed: {

    // returns the state of post module
    p() {
      return this.$store.state.post
    },

    // returns the state of follow module
    f() {
      return this.$store.state.follow
    },

    // returns the state of user module
    u() {
      return this.$store.state.user
    },

    // returns the state of explore module
    e() {
      return this.$store.state.explore
    },

    // returns the state of post interaction (post_int) module
    pi() {
      return this.$store.state.post_int
    }

  }
}
