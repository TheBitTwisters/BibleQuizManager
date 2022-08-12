import axios from '@/plugins/axios'

const getTotalScores = () => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: '/scores'
    }).then(response => {
      resolve(response.data)
    }).catch(err => {
      if (err.response.data) {
        reject(err.response.data)
      }
      reject(err)
    })
  })
}

export default {
  getTotalScores
}
