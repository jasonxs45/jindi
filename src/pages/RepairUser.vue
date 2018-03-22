<template>
  <div class="repair-user">
    <userinfo @tagClick="submitOrder" tagText="我要报修"></userinfo>
    <Tabnav
      :navs="navs"
      justify="justify"
      @tab-switch="tabSwitchHandler"
    />
    <div class="card-wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import {
  Userinfo,
  Tabnav
} from 'components'
let navs = [
  {
    text: '未处理',
    link: 'untreated'
  },
  {
    text: '已接单',
    link: 'treated'
  },
  {
    text: '已完成',
    link: 'finished'
  },
  {
    text: '未完成',
    link: 'failed'
  }
]
export default {
  name: 'RepairUser',
  components: {
    Userinfo,
    Tabnav
  },
  data () {
    return {
      navs
    }
  },
  computed: {
  },
  methods: {
    submitOrder () {
      alert('我要报修')
    },
    tabSwitchHandler (val) {
      this.$router.push({
        name: `repairuser${this.navs[val].link}`
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~common/scss/variables.scss";
@import "~common/scss/mixins.scss";
 .repair-user{
   width: 100vw;
   height: 100vh;
   .user-info{
     height:p2r(240);
     background-image: url('/static/images/uctop1.png')
   }
   .card-wrapper{
     width:100%;
     height: calc(100% - 6.8266666rem);
     padding:p2r($base-padding);
     background: $background-color;
     overflow: auto;
   }
 }
</style>
