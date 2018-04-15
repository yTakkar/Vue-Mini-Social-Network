// FOR NOT-LOGGED-IN USERS
import './user-system/user-system'

// FOR LOGGED-IN USERS
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

// Import project files
import * as fn from './utils/functions'
import App from './components/App.vue'
import Routes from './router/router'
import Store from './store/store'

// Import global components
import Nothing from './components/others/nothing.vue'
import End from './components/others/end.vue'
import Overlay from './components/others/overlay.vue'
import Post from './components/post/post.vue'
import Prompt from './components/others/prompt.vue'
import Goto from './components/others/goto.vue'

// Import Filters & Directives
import './f&d/filters'
import './f&d/directives'

// Middlewares
Vue.use(VueResource)
Vue.use(VueRouter)

// Register components
Vue.component('Nothing', Nothing)
Vue.component('End', End)
Vue.component('Overlay', Overlay)
Vue.component('Post', Post)
Vue.component('Prompt', Prompt)
Vue.component('Goto', Goto)

// Router setup
const router = new VueRouter({
  routes: Routes,
  mode: 'history',
})

// To change Title
router.beforeEach((to, from, next) =>
  fn.changeTitle(to, from, next)
)

// Turn off vue's production tip
Vue.config.productionTip = false

// Render if #app is present
if (document.querySelector('#app')) {
  new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store: Store
  })
}
