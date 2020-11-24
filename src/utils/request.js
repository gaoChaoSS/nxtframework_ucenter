import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import { getToken, getUserId } from '@/utils/auth'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 100000, // request timeout
  headers: { 'Content-Type': 'application/json' }
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['token'] = getToken()
      config.headers['user_id'] = getUserId()
    }
    console.log(config)
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 0) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) { 
        console.log('error')
      }
      // return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug    
    return Promise.reject(error)
  }
)

export default service
