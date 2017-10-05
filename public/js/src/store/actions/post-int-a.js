import { post } from 'axios'

export default {

  getLikes: async ({commit}, payload) => {
    let { data } = await post('/api/likes', { post: payload })
    commit('GET_LIKES', data)
  }

}
