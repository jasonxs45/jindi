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
    let index = window.$loading()
    let opt = {
      Act: 'MemberCenterData'
    }
    api.query(opt).then(res => {
      window.$close(index)
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
    state.house = res.House.StageName + res.House.Building + '栋' + res.House.Unit + '单元' + res.House.HouseNo
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
