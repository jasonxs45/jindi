<template>
  <div class="repair-user">
    <userinfo
      type-class="rectangle"
      tagText="我要报修"
      @tagClick="submitOrder"
    ></userinfo>
    <flexbox class="links">
      <flexbox-item
        v-for="(item, index) in navs"
        :key="item.path+index"
      >
        <router-link
          :to="item.path"
          tag="div"
          class="link"
        >
          <p class="text">{{item.text}}</p>
        </router-link>
      </flexbox-item>
    </flexbox>
    <div class="content">
      <div class="repair-card">
        <flexbox>
          <flexbox-item class="title">
            报修的房源信息
          </flexbox-item>
          <flexbox-item class="date">
            2018/05/12 13:12
          </flexbox-item>
        </flexbox>
        <div class="info">
          报修位置描述报修位置描述
        </div>
        <div class="desc">
          用户提交的具体描述信息用户提交的具体描述信息用户提交的具体描述信息用户提交的具体描述信息用户提交的具体描述信息用户提交的具体描述信息
        </div>
        <template>
          <Split type="line"/>
          <flexbox class="engineer">
            <flexbox-item class="name">
              工程师：周星星
            </flexbox-item>
            <flexbox-item class="tel">
              <a href="tel:12345678910">12345678910</a>
            </flexbox-item>
          </flexbox>
        </template>
        <template>
          <flexbox class="score">
            <flexbox-item class="text">
              维修评分
            </flexbox-item>
            <flexbox-item class="star">
              <Star :score="3.5" :size="24" readOnly/>
            </flexbox-item>
          </flexbox>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import {
  Userinfo,
  Flexbox,
  FlexboxItem,
  Split,
  Star
} from 'components'
let navs = [
  {
    path: 'untreated',
    text: '待受理'
  },
  {
    path: 'treated',
    text: '处理中'
  },
  {
    path: 'finished',
    text: '已完成'
  }
]
export default {
  name: 'RepairUser',
  components: {
    Userinfo,
    Flexbox,
    FlexboxItem,
    Split,
    Star
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
        width:70%;
        left:15%;
        height:3px;
        border-radius: 25px;
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
   .content{
     width: 100%;
     height: calc(100% - 6.82666rem);
     background: $background-color;
     overflow-y: auto;
     padding: p2r($base-padding);
     -webkit-overflow-scrolling: touch;
     .repair-card{
      background: #fff;
      border-radius: 4px;
      padding:p2r($base-padding);
      .title{
        color:$primary-color;
        font-size: p2r(26);
      }
      .date{
        font-size: p2r(24);
        color:$thr-color;
        flex: 0 0 p2r(210);
        width:p2r(210);
        text-align: right;
      }
      .info{
        background: $primary-color;
        color: #fff;
        border-radius: 4px;
        padding: 5px p2r($base-padding);
        line-height: 1.5;
        margin-top: p2r(20);
      }
      .desc{
        margin-top: p2r(20);
        font-size: p2r(24);
        color: $text-color;
        line-height: 1.5;
      }
      .line{
        margin-top: p2r(40);
      }
      .engineer{
        margin-top: p2r(20);
        color: $text-sub-color;
        font-size: p2r(26);
        .tel{
          text-align: right;
          flex: 0 0 p2r(200);
          width: p2r(200);
        }
      }
      .score{
        margin-top: p2r(30);
        .text{
          font-size: 12px;
          color: $thr-color;
        }
        .star{
          text-align: right;
        }
      }
     }
   }
 }
</style>
