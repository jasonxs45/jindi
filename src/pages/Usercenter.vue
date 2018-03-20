<template>
 <div class="user-center">
   <div class="user-info">
     <flexbox>
       <flexbox-item class="avatar-wrapper">
         <Avatar :src="userInfo.avatar" />
       </flexbox-item>
       <flexbox-item>
         <div class="nickname">
           <span class="text">{{userInfo.nickname}}</span>
           <span class="mark">{{userMarkMap[userInfo.mark]}}</span>
         </div>
         <div class="state-info">{{userInfo.state === 0?'尚未绑定房源信息':'已绑定'}}</div>
       </flexbox-item>
     </flexbox>
    <div class="tap-area">
      <div class="tap-block">
        <span class="text">绑定房源</span>
        <Icon name="arrow-right1"/>
      </div>
    </div>
   </div>
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
  Icon
} from 'components'
let userMarkMap = [
  '业主',
  '家属',
  '租户',
  '未注册'
]
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
    Icon
  },
  data () {
    return {
      userInfo: {
        avatar: '/static/images/active1.png',
        nickname: '这是昵称',
        state: 0,
        mark:0
      },
      userMarkMap,
      entryList
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
  .user-info{
    width:100%;
    height:p2r(300);
    background:url('/static/images/uctop.png') center/100% 100% no-repeat;
    padding-top: p2r(50);
    padding-left: p2r(30);
    position: relative;
    .avatar-wrapper{
      flex:0 0 p2r(120)
    }
    .nickname{
      font-size: 0;
      margin-top: p2r(20);
      margin-left: p2r(40);
      .text{
        font-size: p2r(36);
        color:#fff;
        font-weight: 600;
        display: inline-block;
        vertical-align: top;
      }
      .mark{
        font-size: p2r(20);
        display: inline-block;
        vertical-align: top;
        background: $warning-color;
        color:#fff;
        width:p2r(60);
        height:p2r(26);
        line-height: p2r(26);
        text-align: center;
        border-radius: 20px;
        margin-left: p2r(20);
        margin-top: p2r(5);
        font-weight: 200;
      }
    }
    .state-info{
      font-size: p2r(24);
      color:#fff;
      opacity: .6;
      margin-top: p2r(36);
      margin-left: p2r(40);
    }
    .tap-area{
      .tap-block{
        border:1px solid #fff;
        border-right:none;
        border-top-left-radius: 25px;
        border-bottom-left-radius: 25px;
        color:#fff;
        min-width:p2r(180);
        position: absolute;
        right:0;
        top:p2r(70);
        padding:p2r(14) 0 p2r(12) p2r(20);
        .text,
        .iconfont{
          font-size: p2r(24);
        }
        .iconfont{
          font-size: p2r(20)
        }
      }
    }
  }
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
