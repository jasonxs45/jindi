import axios from 'axios'
import qs from 'qs'
// let openid = store.global.state.openid
let openid = '131313'
const BASE_URL = '/Mobile-PostAPI'
const MOCK_URL = 'https://www.easy-mock.com/mock/5abd9851597f2f6d4d73ae18/mock/'
let api = {
  mock (opt) {
    return axios.post(
      MOCK_URL + opt.Act,
      qs.stringify(opt)
    )
  },
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
      Act: 'GetActivityList'
    }
    return this.mock(opt)
  }
}
export default api
