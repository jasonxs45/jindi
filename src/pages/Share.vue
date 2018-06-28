<template>
  <div class="share">
    <img :src="src" alt="" />
  </div>
</template>
<script>
import api from 'common/api'
export default {
  name: 'Share',
  data () {
    return {
      id: '',
      src: 'static/images/sample.png'
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
    }
  },
  created () {
    this.id = this.$route.params.id
    this.getData()
  }
}
</script>
<style lang="scss" scoped>
</style>
