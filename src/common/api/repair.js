import api from './index'
let repair = {
  submit: {
    parts () {
      let opt = {
        Act: 'RepairPartGetList'
      }
      return api.globalQuery(opt)
    }
  }
}
export default repair
