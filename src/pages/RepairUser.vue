<template>
  <div class="repair-user">
    <userinfo @tagClick="submitOrder" tagText="我要报修"></userinfo>
    <tabnav
      justify="justify"
      @on-change="tabSwitchHandler"
    >
      <tabnav-item>12</tabnav-item>
      <tabnav-item>34</tabnav-item>
      <tabnav-item>56</tabnav-item>
      <tabnav-item>78</tabnav-item>
    </tabnav>
    <div class="card-wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import {
  Userinfo,
  Tabnav,
  TabnavItem
} from 'components'
let navs = [
  {
    component: {
      name: 'routerlink',
      template: '<router-link to="/repairuser/untreated" class="text" tag="p" exact>未处理</router-link>'
    }
  },
  {
    component: {
      name: 'routerlink',
      template: '<router-link to="/repairuser/treated" class="text" tag="p" exact>已接单</router-link>'
    }
  },
  {
    component: {
      name: 'routerlink',
      template: '<router-link to="/repairuser/finished" class="text" tag="p" exact>已完成</router-link>'
    }
  },
  {
    component: {
      name: 'routerlink',
      template: '<router-link to="/repairuser/failed" class="text" tag="p" exact>未完成</router-link>'
    }
  }
]
export default {
  name: 'RepairUser',
  components: {
    Userinfo,
    Tabnav,
    TabnavItem
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
