<template>
 <div class="user-center">
   <userinfo tagText="绑定房源" @tagClick="goBind"></userinfo>
   <div class="entry-list">
    <div class="entry-list-wrapper">
      <flexbox
        v-for="(item, index) in entryList"
        :key="'entry--'+index"
        class="list-item"
        align="center"
      >
        <flexbox-item class="start-icon">
          <Icon :name="item.icon"/>
        </flexbox-item>
        <flexbox-item class="item-body">
          <span class="name">{{item.name}}</span>
          <Icon class="end-icon" name="arrow-right"/>
        </flexbox-item>
      </flexbox>
    </div>
    <div class="user-footer"></div>
   </div>
 </div>
</template>
<script>
import {
  Avatar,
  Flexbox,
  FlexboxItem,
  Icon,
  Userinfo
} from 'components'
let entryList = [
  {
    icon:'graph',
    name:'购房进度',
    link:''
  },
  {
    icon:'repair',
    name:'业主报修',
    link:''
  },
  {
    icon:'activity',
    name:'我的活动',
    link:''
  },
  {
    icon:'books',
    name:'社区周刊',
    link:''
  },
  {
    icon:'msg',
    name:'在线客服',
    link:''
  },
  {
    icon:'suggest',
    name:'投诉建议',
    link:''
  }
]
export default {
  name: 'Usercenter',
  components: {
    Avatar,
    Flexbox,
    FlexboxItem,
    Icon,
    Userinfo
  },
  data () {
    return {
      entryList
    }
  },
  methods: {
    goBind () {
      alert('绑定房源')
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~common/scss/variables.scss";
@import "~common/scss/mixins.scss";
.user-center{
  width: 100vw;
  height: 100vh;
  position: relative;
  .entry-list{
    height:calc(100% - 6.4rem);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    .entry-list-wrapper{
      width: 100%;
      min-height:100%;
      padding-bottom: p2r(100);
      .list-item{
        padding-right: p2r($base-padding);
        .start-icon{
          flex:0 0 p2r(102);
          .iconfont{
            margin:0 p2r($base-padding);
            color:$primary-color;
            vertical-align: middle;
            font-size: p2r(40);
          }
        }
        .item-body{
          position: relative;
          padding:p2r(40) 0 p2r(40) 0;
          @include _1px();
          .end-icon{
            color:#ccc;
            font-size: p2r(24);
            position: absolute;
            right:0;
            top:50%;
            margin-top: p2r(-10);
          }
        }
        .name{
          font-size: p2r(30);
          color:$text-color;
          font-weight: 200;
        }
      }
    }
    .user-footer{
      width:100%;
      height: p2r(76);
      background: url('/static/images/ucbot.png') bottom right/auto 100% no-repeat;
      margin-top: p2r(-76);
    }
  }
}
</style>
