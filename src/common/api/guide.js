import api from './index'
let guide = {
  cityList () {
    let opt = {
      Act: 'GuideTypeGetList',
      Data: JSON.stringify({})
    }
    return api.globalQuery(opt)
  },
  // 获取新闻列表
  allList () {
    let opt = {
      Act: 'GuideGetList',
      Data: JSON.stringify({})
    }
    return api.globalQuery(opt)
  },
  // 获取新闻详细
  detail (ID) {
    let opt = {
      Act: 'NewsGetInfo',
      Data: JSON.stringify({
        ID
      })
    }
    return api.globalQuery(opt)
  }
}
export default guide
