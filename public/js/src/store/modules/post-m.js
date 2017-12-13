import actions from '../actions/post-a'

export default {
  state: {
    posts: [],
    feeds: [],
  },
  mutations: {
    GET_POSTS: (state, payload) => state.posts = payload,
    ADD_POST: ({ posts}, payload) => posts.unshift(payload),
    DELETE_POST: ({ posts }, payload) => {
      let p = posts.filter(e => e.post_id != payload )
      posts = p
    },
    GET_FEEDS: (state, payload) => state.feeds = payload,
  },
  actions
}
