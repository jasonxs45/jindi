const state = {
    selectedItem:'',
    ownerName:''
}
// getters
const getters = {
  bindOwner: state => state
}

// actions
const actions = {}
// mutations
const mutations = {
  storeOwner (state, payload) {
    state.selectedItem = payload.selectedItem
    state.ownerName = payload.ownerName
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
