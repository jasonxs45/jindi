<template>
  <div class="share">
    <img :src="src" alt="" />
  </div>
</template>
<script>
import api from 'common/api'
import wx from 'weixin-js-sdk'
export default {
  name: 'Share',
  data () {
    return {
      id: '',
      src: 'static/images/sample.png'
    }
  },
  computed: {
    wxReady () {
      return this.$store.state.global.wxReady
    }
  },
  watch: {
    '$route' (to, from) {
      this.id = to.params.id
    },
    'wxReady' (newVal, oldVal) {
      if (newVal) {
        this.changeShare()
      }
    }
  },
  methods: {
    getData () {
      let _self = this
      api.globalQuery(
        {
          Act: 'MemberGetMyShareImg',
          Data: JSON.stringify(
            {
              ID: this.id
            }
          )
        }
      ).then(({res}) => {
        if (res.data.IsSuccess) {
          this.src = res.data.Data
        } else {
          window.$alert({
            content: res.data.Message,
            yes () {
              _self.$router.push('/usercenter')
            }
          })
        }
      })
    },
    changeShare () {
      let shareData = {
        title: '推荐绑定得积分',
        desc: '绑定金地客服公众号，畅享服务与活动！',
        imgUrl: 'http://jindi.1juke.cn/jindiMicro/static/images/share1.png'
      }
      wx.onMenuShareAppMessage(shareData)
      wx.onMenuShareTimeline(shareData)
    }
  },
  created () {
    this.id = this.$route.params.id
    this.getData()
    if (this.$store.state.global.wxReady) {
      this.changeShare()
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
