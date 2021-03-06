import types from '../mutation-types'
import api from 'common/api'
const state = {
  avatar: '',
  nickname: '',
  state: null,
  house: null,
  memberid: '',
  markMap: [
    '未注册',
    '租户',
    '家属',
    '业主',
    '二手业主'
  ]
}
// getters
const getters = {
}

// actions
const actions = {
  getInfoAsync ({ state, commit }) {
    if (!state.avatar) {
      api.getWeixinInfo()
      .then(({res, index}) => {
        if (res.data.IsSuccess) {
          commit(types.USER_INFO, res.data.Data)
        } else {
          window.$alert(res.data.Message)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
// mutations
const mutations = {
  [types.USER_INFO] (state, res) {
    state.avatar = res.HeadImgUrl
    state.nickname = res.NickName
    state.state = res.Identity
    state.house = res.Identity === 0 ? '尚未绑定房源信息' : `房源数量：${res.HouseCount}`
    state.memberid = res.MemberID
    state.isRepairEngineer = res.IsRepairEngineer
    state.isRepairEngineerManager = res.IsRepairEngineerManager
    state.isRepairManager = res.IsRepairManager
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
