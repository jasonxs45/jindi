import axios from 'axios'
import qs from 'qs'
import bind from './bind'
let openid = ''
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
  bind,
  // 模拟数据
  mock (opt) {
    return axios.post(
      MOCK_URL + opt.Act,
      qs.stringify(opt)
    )
  },
  // 授权
  getAuth () {
    return axios.post('/Admin-GetAuthorize', {
      redirectUrl: location.href
    })
  },
  // 真实查询
  query (opt) {
    Object.assign(opt, { openid })
    return axios.post(
      BASE_URL,
      qs.stringify(opt)
    )
  },
  // 全局查询方法
  globalQuery (opt) {
    Object.assign(opt, { openid })
    let index = window.$loading('加载中')
    return axios.post(
      BASE_URL,
      qs.stringify(opt)
    ).then(res => {
      return new Promise((resolve, reject) => {
        if (res.status === 200) {
          window.$close(index)
          resolve({res, index})
        }
      })
    })
  },
  // 公用请求
  // 获取微信昵称头像等
  getWeixinInfo () {
    let index = window.$loading()
    let opt = {
      Act: 'MemberCenterData'
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
  // 获取会员信息
  getMemberInfo () {
    let index = window.$loading()
    let opt = {
      Act: 'MemberGetMyInfo'
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
  // 获取购房进度
  getTradeProgress () {
    let index = window.$loading()
    let opt = {
      Act: 'ProcessData'
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
  // 获取工程进度项目列表
  getProjectProgress () {
    let index = window.$loading()
    let opt = {
      Act: 'ProgressGetProjectList'
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
  // 获取工程进度月份列表
  getMonthlyProgress (StageID) {
    let index = window.$loading()
    let opt = {
      Act: 'GetProjectProgress',
      Data: JSON.stringify({
        StageID
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
  // 获取工程进度月份详细
  getProgressDetail (ID) {
    let index = window.$loading()
    let opt = {
      Act: 'GetProgressDetail',
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
  },
  // 获取活动列表
  getActivityList (type = 1) {
    let index = window.$loading()
    let opt = {
      Act: 'ActivityGetList',
      Data: JSON.stringify({
        S_Class: type
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
  },
  // 电子期刊列表
  getMagazineList () {
    let index = window.$loading()
    let opt = {
      Act: 'PeriodicalGetList',
      Data: JSON.stringify({})
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
  // 电子期刊列表内页
  getMagazineInner (ID) {
    let index = window.$loading()
    let opt = {
      Act: 'PeriodicalGetArticle',
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
  },
  // 电子期刊详细
  getMagazineDetail (ID) {
    let index = window.$loading()
    let opt = {
      Act: 'PeriodicalGetArticleDetail',
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
  },
  // 获取问卷调查内容
  getInvestigate (ID) {
    let index = window.$loading()
    let opt = {
      Act: 'ResearchGetInfo',
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
  },
  // 获取问卷调查内容
  saveInvestigate (Answer) {
    let index = window.$loading()
    let opt = {
      Act: 'ResearchSaveAnswer',
      Data: JSON.stringify({
        Answer
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
  // 消息中心
  getMyMessage () {
    let index = window.$loading()
    let opt = {
      Act: 'GetMyMessage'
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
