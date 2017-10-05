import { post } from 'axios'

export default {

  getPosts: async (context, payload) => {
    let { data } = await post('/api/get-posts', { username: payload })
    context.commit('GET_POSTS', data)
  }

}
