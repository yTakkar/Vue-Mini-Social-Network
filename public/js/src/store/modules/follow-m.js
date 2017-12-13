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
    FOLLOWER: ({ followers }, payload) => followers.unshift(payload),
    UNFOLLOWER: ({ followers }, payload) => {
      let n = followers.filter(e => e.follow_by != parseInt(payload) )
      followers = n
    },
    FOLLOWING: ({ followings }, payload) => followings.unshift(payload),
    UNFOLLOWING: ({ followings }, payload) => {
      let n = followings.filter(e => e.follow_to != parseInt(payload) )
      followings = n
    },
  },
  actions
}
