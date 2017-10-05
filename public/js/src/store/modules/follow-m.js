import actions from '../actions/follow-a'

export default {
  state: {
    followers: [],
    followings: [],
    views: 0,
  },
  mutations: {
    GET_FOLLOWERS: (state, payload) => state.followers = payload,
    GET_FOLLOWINGS: (state, payload) => state.followings = payload,
    GET_VIEWS: (state, payload) => state.views = payload,
    FOLLOWER: (state, payload) => state.followers.unshift(payload),
    UNFOLLOWER: (state, payload) => {
      let n = state.followers.filter(e => e.follow_by != parseInt(payload) )
      state.followers = n
    },
    FOLLOWING: (state, payload) => state.followings.unshift(payload),
    UNFOLLOWING: (state, payload) => {
      let n = state.followings.filter(e => e.follow_to != parseInt(payload) )
      state.followings = n
    },
  },
  actions
}
