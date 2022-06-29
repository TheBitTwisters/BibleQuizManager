import Vue from 'vue'
import moment from 'moment'

Vue.filter('formatDateTime', function (value) {
  return moment(value).format('MMMM DD, YYYY hh:mm A')
})

Vue.filter('formatDate', function (value) {
  return moment(value).format('MMMM DD, YYYY')
})
