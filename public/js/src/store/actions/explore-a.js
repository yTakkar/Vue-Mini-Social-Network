import { post } from 'axios'

export default {

  getExplores: async ({ commit }) => {
    let { data: exp } = await post('/api/get-explores')
    commit('GET_EXPLORES', exp)
  }

}
