import api from './index'
let guide = {
  // 获取城市列表
  cityList () {
    let opt = {
      Act: 'GuideTypeGetList',
      Data: JSON.stringify({})
    }
    return api.globalQuery(opt)
  },
  // 获取项目列表
  allList () {
    let opt = {
      Act: 'GuideGetList',
      Data: JSON.stringify({})
    }
    return api.globalQuery(opt)
  },
  // 获取项目详细
  detail (ID) {
    let opt = {
      Act: 'GuideGetInfo',
      Data: JSON.stringify({
        ID
      })
    }
    return api.globalQuery(opt)
  }
}
export default guide
