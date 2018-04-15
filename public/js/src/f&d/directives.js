// DIRECTIVES

import Vue from 'vue'

// Another way to change page's title
Vue.directive('title', {
  inserted: (el, binding) => document.title = binding.value,
  update: (el, binding) => document.title = binding.value
})
