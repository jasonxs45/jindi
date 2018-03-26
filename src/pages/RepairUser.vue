<template>
  <div class="repair-user">
    <userinfo @tagClick="submitOrder" tagText="我要报修"></userinfo>
      <flexbox class="links">
        <flexbox-item
          v-for="(item, index) in navs"
          :key="item.name+index"
        >
          <router-link
            :to="item.name"
            tag="div"
            class="link"
          >
            <p class="text">{{item.text}}</p>
          </router-link>
        </flexbox-item>
      </flexbox>
    <div class="card-wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import {
  Userinfo,
  Flexbox,
  FlexboxItem
} from 'components'
let navs = [
  {
      name: 'untreated',
      text: '未处理'
  },
  {
      name: 'treated',
      text: '已接单'
  },
  {
      name: 'finished',
      text: '已完成'
  },
  {
    name: 'failed',
      text: '未完成'
  }
]
export default {
  name: 'RepairUser',
  components: {
    Userinfo,
    Flexbox,
    FlexboxItem
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
      console.log(val)
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
   .links{
      height:p2r(80);
      box-shadow: $box-shadow;
      position: relative;
      z-index: 1;
     .link{
       width:100%;
       height: 100%;
       display: table;
       position: relative;
       &:after{
        content: '';
        display: block;
        position: absolute;
        bottom: -1px;
        left:0;
        width:100%;
        height:1px;
       }
       .text{
         font-size: p2r(26);
         white-space: nowrap;
         display: table-cell;
         vertical-align: middle;
         overflow: hidden;
         text-overflow: clip;
         text-align: center;
         color:$text-color;
         font-weight: 200;
       }
       &.router-link-active{
         &:after{
          background: $primary-color;
         }
         .text{
           color:$primary-color;
           font-weight: normal;
         }
       }
     }
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
