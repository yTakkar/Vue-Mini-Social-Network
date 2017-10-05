// THIS FILE CONTAINS STORE OF POST INTERACTIONS SUCH AS LIKE
import actions from '../actions/post-int-a'
import $ from 'jquery'

export default {
  state: {
    likes: [],
  },
  mutations: {
    GET_LIKES: (state, payload) => state.likes = payload,
    LIKED: (state, payload) => state.likes.unshift(payload),
    UNLIKED: (state, payload) => {
      let
        user = $('#data').data('session'),
        n = state.likes.filter(l => l.like_by != user && l.post_id == payload )
      state.likes = n
    }
  },
  actions
}
