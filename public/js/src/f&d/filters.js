// FILTERS

import Vue from 'vue'
import TimeAgo from 'handy-timeago'

// TimeAgo filter
Vue.filter('timeAgo', value =>
  TimeAgo(value)
)

// To-Uppercase filter
Vue.filter('to-uppercase', value =>
  value.charAt(0).toUpperCase() + value.substr(1)
)

// Slice filter
Vue.filter('slice', value => {
  let
    len = value.length,
    max = 200
  return len > max ? `${value.substr(0, max - 2)}..` : len <= max ? value : null
})
