import axios from 'axios'
import NProgress from 'nprogress' // <--- Import the library

const apiClient = axios.create({
  baseURL: `http://localhost:3000`,
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 10000 // Throw error if API call takes longer than 10 seconds
})

apiClient.interceptors.request.use(config => { // Called on request
  NProgress.start()
  return config
})
apiClient.interceptors.response.use(response => { // Called on response
  NProgress.done()
  return response
})

// Each of our API Calls
export default {
  getEvents(perPage, page) {
    return apiClient.get('/events?_limit=' + perPage + '&_page=' + page)
  },
  getEvent(id) {
    return apiClient.get('/events/' + id)
  },
  postEvent(event) {
    return apiClient.post('/events', event)
  }
}
