import axios from 'axios'
import qs from 'qs'
// let openid = store.global.state.openid
let openid = '131313'
const BASE_URL = '/Mobile-PostAPI'
const MOCK_URL = 'https://www.easy-mock.com/mock/5abd9851597f2f6d4d73ae18/mock/'
axios.defaults.retry = 4
axios.defaults.retryDelay = 1000
axios.interceptors.response.use(undefined, function axiosRetryInterceptor (err) {
  let config = err.config
  // If config does not exist or the retry option is not set, reject
  if (!config || !config.retry) return Promise.reject(err)
  // Set the variable for keeping track of the retry count
  config.__retryCount = config.__retryCount || 0
  // Check if we've maxed out the total number of retries
  if (config.__retryCount >= config.retry) {
      // Reject with the error
      return Promise.reject(err)
  }
  // Increase the retry count
  config.__retryCount += 1
  // Create new promise to handle exponential backoff
  let backoff = new Promise((resolve) => {
      setTimeout(() => {
          resolve()
      }, config.retryDelay || 1)
  })
  // Return the promise in which recalls axios to retry the request
  return backoff.then(() => {
      return axios(config)
  })
})
let api = {
  // 模拟数据
  mock (opt) {
    return axios.post(
      MOCK_URL + opt.Act,
      qs.stringify(opt)
    )
  },
  // 真实查询
  query (opt) {
    Object.assign(opt, { openid })
    return axios.post(
      BASE_URL,
      qs.stringify(opt)
    )
  },
  // 公用请求
  // 获取活动列表
  getActivityList () {
    let opt = {
      Act: 'ActivityGetList'
    }
    return this.query(opt)
  },
  // 获取活动详情
  getActivityDetail (ID) {
    let opt = {
      Act: 'ActivityGetInfo',
      Data: JSON.stringify({
        ID
      })
    }
    return this.query(opt)
  },
  // 获取新闻列表
  getNewsList () {
    let index = window.$loading()
    let opt = {
      Act: 'NewsGetList',
      Data: JSON.stringify({
        S_ClassID: 1,
        S_IsCheck: true
      })
    }
    return this.query(opt).then(res => {
      return new Promise((resolve, reject) => {
        if (res.status === 200) {
          window.$close(index)
          resolve({res, index})
        }
      })
    })
  },
    // 获取新闻详细
    getNewsDetail (ID) {
      let index = window.$loading()
      let opt = {
        Act: 'NewsGetInfo',
        Data: JSON.stringify({
          ID
        })
      }
      return this.query(opt).then(res => {
        return new Promise((resolve, reject) => {
          if (res.status === 200) {
            window.$close(index)
            resolve({res, index})
          }
        })
      })
    }
}
export default api
