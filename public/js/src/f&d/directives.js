// DIRECTIVES

import Vue from 'vue'

// Another way to change page's title
Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = binding.value
    return document.title
  },
  update: function (el, binding) {
    document.title = binding.value
    return document.title
  }
})
