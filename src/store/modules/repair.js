//  投诉建议模块 用户身份 管理员身份
import types from '../mutation-types'
import api from 'common/api'
const state = {
  parts: null,
  user: {
    untreated: {
      stateId: 0,
      orders: [],
      page: 0,
      lastPage: false
    },
    finished: {
      stateId: 1,
      orders: [],
      page: 0,
      lastPage: false
    }
  },
  manager: {
    untreated: {
      stateId: 0,
      orders: [],
      page: 0,
      lastPage: false
    },
    finished: {
      stateId: 1,
      orders: [],
      page: 0,
      lastPage: false
    }
  }
}
// getters
const getters = {
  user: state => state.user,
  manager: state => state.manager
}

// actions
const actions = {
  parts ({commit}) {
    api.repair.submit.parts()
    .then(({res, index}) => {
      if (res.data.IsSuccess) {
        commit(types.REPAIR_PARTS, res.data.Data)
      } else {
        window.$alert(res.data.Message)
      }
    })
    .catch(err => {
      console.log(err)
    })
  },
  list ({commit, state}, {role, stateType}) {
    commit(types.ADVISE_NEXT, {role, stateType})
    api.advise.list(role, state[role][stateType].stateId, state[role][stateType].page)
    .then(({res, index}) => {
      if (res.data.IsSuccess) {
        commit(types.ADVISE_LIST,
          {
            res: res.data.Data,
            role,
            stateType
          }
        )
      } else {
        window.$alert(res.data.Message)
      }
    })
    .catch(err => {
      console.log(err)
    })
  },
  destroyed ({commit}, role) {
    commit(types.ADVISE_DESTROY, role)
  }
}
// mutations
const mutations = {
  [types.REPAIR_PARTS] (state, res) {
    state.parts = res
  },
  [types.ADVISE_LIST] (state, {res, role, stateType}) {
    let arr = res.list
    // 有数据才进行操作
    if (arr.length > 0) {
      state[role][stateType].orders = state[role][stateType].orders.concat(arr)
      state[role][stateType].lastPage = res.lastpage
    }
  },
  [types.ADVISE_NEXT] (state, {role, stateType}) {
    state[role][stateType].page += 1
  },
  [types.ADVISE_DESTROY] (state, role) {
    for (let n in state[role]) {
      state[role][n].orders = []
      state[role][n].page = 0
      state[role][n].lastpage = false
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
