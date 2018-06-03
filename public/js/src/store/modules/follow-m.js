import actions from '../actions/follow-a'

export default {
  state: {
    followers: [],
    followings: [],
    pendings: [],
    views: 0
  },
  mutations: {
    GET_FOLLOWERS: function (state, payload) {
      state.followers = payload
      return state.followers
    },
    GET_FOLLOWINGS: function (state, payload) {
      state.followings = payload
      return state.followings
    },
    GET_PENDINGS: function (state, payload) {
      state.pendings = payload
      return state.pendings
    },
    GET_VIEWS: function (state, payload) {
      state.views = payload
      return state.views
    },
    FOLLOWER: ({ followers }, payload) => followers.unshift(payload),
    UNFOLLOWER: ({ followers }, payload) => {
      let n = followers.filter(e => e.follow_by !== parseInt(payload))
      followers = n
    },
    FOLLOWING: ({ followings }, payload) => followings.unshift(payload),
    UNFOLLOWING: ({ followings }, payload) => {
      let n = followings.filter(e => e.follow_to !== parseInt(payload))
      followings = n
    },
    UNPENDING: ({ pendings }, payload) => {
      let n = pendings.filter(e => e.follow_by !== parseInt(payload))
      pendings = n
    }
  },
  actions
}
