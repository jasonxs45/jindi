import api from './index'
let advise = {
  user: {
    // 获取活动列表
    list (state, page = 1, pagesize = 2) {
      let opt = {
        Act: 'SuggestGetMyHistory',
        Data: JSON.stringify({
          state,
          pagesize,
          page
        })
      }
      return api.globalQuery(opt)
    }
  },
  // 提交
  submit (Type, HouseID, Content, Images) {
    let opt = {
      Act: 'SuggestSave',
      Data: JSON.stringify({
        Type,
        HouseID,
        Content,
        Images
      })
    }
    return api.globalQuery(opt)
  },
  // 获取详情
  detail (ID) {
    let opt = {
      Act: 'SuggestGetInfo',
      Data: JSON.stringify({
        ID
      })
    }
    return api.globalQuery(opt)
  }
}
export default advise
