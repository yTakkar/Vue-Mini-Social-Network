// STORE

import Vue from 'vue'
import Vuex from 'vuex'

import User from './modules/user-m'
import Post from './modules/post-m'
import Follow from './modules/follow-m'
import Explore from './modules/explore-m'
import PostInt from './modules/post-int-m'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,
  modules: {
    user:     User,
    post:     Post,
    follow:   Follow,
    explore:  Explore,
    post_int: PostInt,
  }
})

export default store
