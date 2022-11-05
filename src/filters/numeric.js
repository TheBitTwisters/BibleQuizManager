import Vue from 'vue'

Vue.filter('numeric', function (i) {
  return i.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
})
