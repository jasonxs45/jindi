let bind = {
  HouseOwerBind ({HouseID, Name, IDCardLast4}) {
    let index = window.$loading()
    let opt = {
      Act: 'MemberGetMyInfo',
      Data: JSON.stringify({
        HouseID,
        Name,
        IDCardLast4
      })
    }
    return this.query(opt).then(res => {
      return new Promise((resolve, reject) => {
        if (res.status === 200) {
          window.$close(index)
          resolve({res, index})
        }
      })
    })
  }
}
export default bind
