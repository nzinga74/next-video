import axios from 'axios'

const api = axios.create({
  baseURL: 'https://video-api-cloud.herokuapp.com'
})

export default api