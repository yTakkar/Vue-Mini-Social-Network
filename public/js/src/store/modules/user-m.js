import actions from '../actions/user-a'
import $ from 'jquery'

let d = $('.data')

export default {
  state: {
    session: {
      id: d.data('session'),
      username: d.data('username')
    },
    userDetails: {},
  },
  mutations: {
    USER_DETAILS: (state, payload) => state.userDetails = payload,
  },
  actions,
}
