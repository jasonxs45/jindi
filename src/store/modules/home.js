import types from '../mutation-types'
import api from 'common/api'

const state = {
  all: {
    loading: false,
    query: {
      page: 1
    },
    data: []
  }
}
// getters
const getters = {
  all: state => state.all
}

// actions
const actions = {
  home ({commit, state}, query) {
    commit(types.HOME_LOADING, {
      query: query
    })
    api.cnode.list(query).then((json) => {
      commit(types.HOME, {
        query: query,
        data: json.data
      })
    })
  }
}
// mutations
const mutations = {
  [types.HOME] (state, {data, query}) {
    data.forEach((item) => {
      item.href = '/cnode/topic/' + item.id
      item.user_href = '/cnode/user/' + item.author.loginname
    })
    if (state.home[query.tab].query.page && state.home[query.tab].query.page < query.page) {
      state.home[query.tab].query = query
      state.home[query.tab].data = state.home[query.tab].data.concat(data)
    } else {
      state.home[query.tab].data = data.concat(state.home[query.tab].data)
    }
    state.home[query.tab].loading = false
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
