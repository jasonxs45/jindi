import api from './index'
const ROLE = {
  // 用户
  user: '用户',
  // 工程师
  engineer: '工程师',
  // 管理员
  engineerManager: '工程师主管',
  // 客服
  manager: '客服'
}
const STATE = {
  // 用户
  untreated: '待受理',
  // 工程师
  treated: '处理中',
  // 管理员
  finished: '已完成'
}
let repair = {
  list (role, state, pageindex = 1, pagesize = 10) {
    let opt = {
      Act: 'RepairGetList',
      Data: JSON.stringify(
        {
          role: ROLE[role],
          state: STATE[state],
          pagesize,
          pageindex
        }
      )
    }
    return api.globalQuery(opt)
  },
  detail (ID) {
    let opt = {
      Act: 'RepairGetInfo',
      Data: JSON.stringify(
        {
          ID
        }
      )
    }
    return api.globalQuery(opt)
  },
  user: {
    parts () {
      let opt = {
        Act: 'RepairPartGetList'
      }
      return api.globalQuery(opt)
    },
    submit ({HouseID, Name, Tel, Part, Content, Images}) {
      let opt = {
        Act: 'RepairSave',
        Data: JSON.stringify(
          {
            HouseID,
            Name,
            Tel,
            Part,
            Content,
            Images
          }
        )
      }
      return api.globalQuery(opt)
    }
  }
}
export default repair
