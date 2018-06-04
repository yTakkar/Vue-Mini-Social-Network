import actions from '../actions/explore-a'

export default {
  state: {
    explores: []
  },
  mutations: {
    GET_EXPLORES: function (state, payload) {
      state.explores = payload
      return state.explores
    }
  },
  actions
}
