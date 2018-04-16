import api from 'common/api'
const state = {
  avatar: '',
  nickname: '',
  state: null,
  house: null,
  markMap: [
    '未注册',
    '租户',
    '家属',
    '业主'
  ]
}
// getters
const getters = {
  userInfo: state => state
}

// actions
const actions = {
  getInfoAsync ({ commit }) {
    api.getWeixinInfo()
    .then(({res, index}) => {
      if (res.data.IsSuccess) {
        commit('getInfo', res.data.Data)
      } else {
        window.$alert(res.data.Message)
      }
    }).catch(err => {
      console.log(err)
    })
  }
}
// mutations
const mutations = {
  getInfo (state, res) {
    state.avatar = res.HeadImgUrl
    state.nickname = res.NickName
    state.state = res.Identity
    state.house = res.Identity === 0 ? '尚未绑定房源信息' : res.House.StageName + res.House.Building + '栋' + res.House.Unit + '单元' + res.House.HouseNo
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
