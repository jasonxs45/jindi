import api from './index'
let bind = {
  houseOwerBind ({HouseID, Name, IDCardLast4}) {
    let opt = {
      Act: 'MemberGetMyInfo',
      Data: JSON.stringify({
        HouseID,
        Name,
        IDCardLast4
      })
    }
    return api.globalQuery(opt)
  }
}
export default bind
