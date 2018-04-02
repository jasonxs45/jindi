import axios from 'axios'
import qs from 'qs'
// let openid = store.global.state.openid
let openid = '131313'
const BASE_URL = '/Mobile-PostAPI'
let api = {
  query (opt) {
    Object.assign(opt, { openid })
    return axios.post(
      BASE_URL,
      qs.stringify(opt)
    )
  }
}
export default api
