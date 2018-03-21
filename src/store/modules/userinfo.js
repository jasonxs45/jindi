const state = {
  avatar: '/static/images/active1.png',
  nickname: '这是昵称',
  state: 0,
  mark:0,
  markMap: [
    '业主',
    '家属',
    '租户',
    '未注册'
  ]
}
// getters
const getters = {
  userInfo: state => state
}

// actions
const actions = {
}
// mutations
const mutations = {
}

export default {
  state,
  getters,
  actions,
  mutations
}
