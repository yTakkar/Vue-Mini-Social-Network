import actions from '../actions/explore-a'

export default {
  state: {
    explores: [],
  },
  mutations: {
    GET_EXPLORES: (state, payload) => state.explores = payload
  },
  actions
}
