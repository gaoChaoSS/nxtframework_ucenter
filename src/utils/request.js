import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import { getToken, getUserId } from '@/utils/auth'
import { Loading } from 'element-ui';
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 100000, // request timeout
  headers: { 'Content-Type': 'application/json' }
})
// const Loadings = Loading;h
// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['token'] = getToken()
      config.headers['user_id'] = getUserId()
    }
    console.log(config)
    startLoading()
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
    endLoading()
    if (res.status !== 0) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      if (res.status === 50008 || res.status === 50012 || res.status === 50014) { 
        console.log('error')
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug    
    return Promise.reject(error)
  }
)

let loading;
function startLoading(){
  const options = {
    lock: true,
    text: '',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)',
    customClass:'customClass'
  }
	loading = Loading.service(options)
}
//结束
function endLoading(){
  
  setTimeout(() => {
    loading.close();
  }, 500);
}

export default service
