import { post } from 'axios'

export default {

  isFollowing: async ({ commit }, payload) => {
    let { data } = await post('/api/is-following', { username: payload })
    commit('IS_FOLLOWING', data)
  },

  getFollowers: async ({ commit }, payload) => {
    let { data } = await post('/api/get-followers', { username: payload })
    commit('GET_FOLLOWERS', data)
  },

  getFollowings: async ({ commit }, payload) => {
    let { data } = await post('/api/get-followings', { username: payload })
    commit('GET_FOLLOWINGS', data)
  },

  getViews: async ({ commit }, payload) => {
    let { data } = await post('/api/get-profile-views', { username: payload })
    commit('GET_VIEWS', data)
  }

}
