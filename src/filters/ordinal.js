import Vue from 'vue'

Vue.filter('formatOrdinal', function (i) {
  var j = i % 10,
      k = i % 100
  if (j == 1 && k != 11) {
      return i + "st"
  }
  if (j == 2 && k != 12) {
      return i + "nd"
  }
  if (j == 3 && k != 13) {
      return i + "rd"
  }
  return i + "th"
})

Vue.filter('formatOrdinalOnly', function (i) {
  var j = i % 10,
      k = i % 100
  if (j == 1 && k != 11) {
      return "st"
  }
  if (j == 2 && k != 12) {
      return "nd"
  }
  if (j == 3 && k != 13) {
      return "rd"
  }
  return "th"
})
