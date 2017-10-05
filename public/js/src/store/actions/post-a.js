import { post } from 'axios'

export default {

  getPosts: async ({ commit }, payload) => {
    let { data } = await post('/api/get-posts', { username: payload })
    commit('GET_POSTS', data)
  },

  getFeeds: async ({ commit }) => {
    let { data } = await post('/api/get-feeds')
    commit('GET_FEEDS', data)
  },

}
