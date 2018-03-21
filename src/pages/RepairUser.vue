<template>
  <div class="repair-user">
    <userinfo @tagClick="submitOrder" tagText="我要报修"></userinfo>
  </div>
</template>
<script>
import {
  Userinfo
} from 'components'
export default {
  name: 'RepairUser',
  components: {
    Userinfo
  },
  data () {
    return {
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    }
  },
  methods: {
    submitOrder () {
      alert('我要报修')
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~common/scss/variables.scss";
@import "~common/scss/mixins.scss";
 .repair-user{
   .user-info{
     height:p2r(240);
     background-image: url('/static/images/uctop1.jpg')
   }
 }
</style>
