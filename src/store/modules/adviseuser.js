import types from '../mutation-types'
import api from 'common/api'
const state = {
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
// getters
const getters = {
}

// actions
const actions = {
  list ({commit, state}, stateType) {
    commit(types.ADVISE_USER_NEXT, stateType)
    api.advise.user.list(state[stateType].stateId, state[stateType].page)
    .then(({res, index}) => {
      if (res.data.IsSuccess) {
        commit(types.ADVISE_USER_LIST,
          {
            res: res.data.Data,
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
  }
}
// mutations
const mutations = {
  [types.ADVISE_USER_LIST] (state, {res, stateType}) {
    let arr = res.list
    // 有数据才进行操作
    if (arr.length > 0) {
      state[stateType].orders = state[stateType].orders.concat(arr)
      state[stateType].lastPage = res.lastpage
    }
  },
  [types.ADVISE_USER_NEXT] (state, stateType) {
    state[stateType].page += 1
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
