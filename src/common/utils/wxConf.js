import axios from 'axios'
import qs from 'qs'
let wx = window.wx
// const comOpenId = 'gh_ba3ae28cdc9b'
const webRoot = 'http://jindi.1juke.cn'
let wxConf = {
  name: 'weixin-config',
  shareData: {
    title: '',
    desc: '',
    link: '',
    imgUrl: ''
  },
  init (cb) {
    let ua = navigator.userAgent.toLowerCase()
    if (!(/micromessenger/i).test(ua)) {
      alert('请使用微信浏览器访问，否则部分功能可能无法使用！')
    }
  },
  wxUpload (a) {
    /* 图片组 */
    let images = {
      localId: [],
      serverId: []
    }
    /* 选择文件 */
    wx.chooseImage({
      success (res) {
        images.localId = res.localIds
        uploadImage()
      }
    })

    /* 微信JSAPI 5.3 上传图片 */
    function uploadImage () {
      if (images.localId.length === 0) {
        alert('请选择图片')
        return
      }
      var i = 0
      var length = images.localId.length
      images.serverId = []
      /* 上载到微信服务器 */
      function upload () {
        wx.uploadImage({
          localId: images.localId[i],
          success (res) {
            i++
            if (i < length) {
              setTimeout(function () {
                upload()
              }, 100)
            }
            return downloadImage(i, res.serverId)
          },
          fail (res) {
            alert('上传失败' + JSON.stringify(res))
          }
        })
      }
      upload()
    }
    /* 从微信服务器下载图片 */
    function downloadImage (index, serverID) {
      return axios.post(
        webRoot + '/Mobile-wx_UploadImg', // 请求的url地址
        qs.stringify({
          serverID
        })
      )
      .then(res => {
        a(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    }
}
}
export default wxConf
