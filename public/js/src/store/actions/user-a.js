import { post } from 'axios'

export default {

  userDetails: async (context, payload) => {
    let { data } = await post('/api/get-details', { username: payload })
    context.commit('USER_DETAILS', data)
  },

}
