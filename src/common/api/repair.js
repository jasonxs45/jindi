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
  user: {
    untreated: '待受理',
    treated: '处理中',
    finished: '已完成'
  },
  engineer: {
    untreated: '未处理',
    treated: '已接单',
    finished: '已完成',
    canceled: '已取消'
  }
}
let repair = {
  list (role, state, pageindex = 1, pagesize = 10) {
    let opt = {
      Act: 'RepairGetList',
      Data: JSON.stringify(
        {
          role: ROLE[role],
          state: STATE[role][state],
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
    // 获取部位
    parts () {
      let opt = {
        Act: 'RepairPartGetList'
      }
      return api.globalQuery(opt)
    },
    // 提交报修单
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
    },
    // 评分
    evaluate (opts) {
      let opt = {
        Act: 'RepairEvaluate',
        Data: JSON.stringify(opts)
      }
      return api.globalQuery(opt)
    }
  },
  engineer: {
    // 受理
    handleConfirm (ID) {
      let opt = {
        Act: 'RepairAccept',
        Data: JSON.stringify({
          ID
        })
      }
      return api.globalQuery(opt)
    },
    // 拒绝订单
    refuse (ID, RefuseReason) {
      let opt = {
        Act: 'RepairRefuse',
        Data: JSON.stringify({
          ID,
          RefuseReason
        })
      }
      return api.globalQuery(opt)
    },
    // 获取专业分类
    parts () {
      let opt = {
        Act: 'RepairGetType'
      }
      return api.globalQuery(opt)
    },
    // 获取施工单位
    servers () {
      let opt = {
        Act: 'RepairGetBuilder'
      }
      return api.globalQuery(opt)
    },
    // 提交一个子报修单
    submitAllot (RepairID, TypeID, TypeName, TypeTimeLength, BuilderID, Desc, Images) {
      let opt = {
        Act: 'RepairAddDetail',
        Data: JSON.stringify({
          RepairID,
          TypeID,
          TypeName,
          TypeTimeLength,
          BuilderID,
          Desc,
          Images
        })
      }
      return api.globalQuery(opt)
    },
    // 删除子报修单
    delSubOrder (ID) {
      let opt = {
        Act: 'RepairDelDetail',
        Data: JSON.stringify({
          ID
        })
      }
      return api.globalQuery(opt)
    },
    // 开始维修
    startRepair (ID) {
      let opt = {
        Act: 'RepairDeal',
        Data: JSON.stringify({
          ID
        })
      }
      return api.globalQuery(opt)
    },
    // 完成子报修单
    finishSubOrder (ID) {
      let opt = {
        Act: 'RepairFinishDetail',
        Data: JSON.stringify({
          ID
        })
      }
      return api.globalQuery(opt)
    },
    // 完成报修
    finishOrder (ID) {
      let opt = {
        Act: 'RepairFinish',
        Data: JSON.stringify({
          ID
        })
      }
      return api.globalQuery(opt)
    }
  }
}
export default repair
