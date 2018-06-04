// THIS FILE CONTAINS STORE OF POST INTERACTIONS SUCH AS LIKE
import actions from '../actions/post-int-a'
import $ from 'jquery'

export default {
  state: {
    likes: []
  },
  mutations: {
    GET_LIKES: function (state, payload) {
      state.likes = payload
      return state.likes
    },
    LIKED: ({ likes }, payload) => likes.unshift(payload),
    UNLIKED: ({ likes }, payload) => {
      let user = $('#data').data('session')
      let n = likes.filter(l => l.like_by !== user && l.post_id === payload)
      likes = n
    }
  },
  actions
}
