<template>
<div class="advise-user">
  <userinfo
    type-class="rectangle"
    tagText="新建留言"
    @tagClick="tagClick"
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
    <div
      v-for="(item, index) in orders"
      :key="'untreatedorder-'+index"
      class="advise-card"
      :class="item.state === 0 ? 'praise' : item.state === 1 ? 'complain' : 'suggest'"
    >
      <div class="title">
        {{item.date}}
        <div class="tag">
          {{item.state === 0 ? '表扬' : item.state === 1 ? '投诉' : '建议'}}
        </div>
      </div>
      <div class="desc">
        {{item.descDetail}}
      </div>
    </div>
  </div>
</div>
</template>
<script>
import {
  Userinfo,
  Flexbox,
  FlexboxItem,
  OrderList
} from 'components'
const navs = [
  {
    path: 'untreated',
    text: '待处理'
  },
  {
    path: 'finished',
    text: '已完成'
  }
]
let orders = []
for (let i = 0; i < 5; i++) {
  let obj = {
    state: Math.floor(Math.random() * 3),
    id: Math.round(Math.random() * 9999),
    title: '金地城二期E栋1303',
    date: '2018/02/28 12:00',
    desc: '主卧墙面-破裂；天花-漏水',
    descDetail: '问题描述问题描述问题描述问题描述问题描述问题描述问题描述问题描述问题描述问题描述问题描述问题描述问题描述',
    ownerPhoto: [
      '/static/images/banner1.png',
      '/static/images/banner2.png',
      '/static/images/active1.png',
      '/static/images/active1.png'
    ]
  }
  orders.push(obj)
}
export default {
  name: 'AdviseUser',
  components: {
    Userinfo,
    Flexbox,
    FlexboxItem,
    OrderList
  },
  data () {
    return {
      navs,
      stateType: '',
      orders
    }
  },
  watch: {
    '$route' (to, from) {
      this.stateType = to.params.state
      this.stateChangeHandler()
    }
  },
  created () {
    this.stateType = this.$route.params.state
    this.stateChangeHandler()
  },
  methods: {
    tagClick () {
      console.log('tag click')
    },
    stateChangeHandler () {
      if (this.navs.every(item => item.path !== this.stateType)) {
        this.$router.push({
          name: 'pagenotfound'
        })
      }
    },
    getMoreHandler () {
      this.show = !this.show
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~common/scss/variables.scss";
@import "~common/scss/mixins.scss";
.advise-user{
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
        left:20%;
        width:60%;
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
  .content {
    width: 100%;
    height: calc(100% - 6.8266666rem);
    padding: p2r($base-padding);
    background: $background-color;
    overflow: auto;
    .advise-card{
      background: #fff;
      border-radius: 4px;
      margin: p2r(30) 0;
      overflow: hidden;
      &:first-child{
        margin-top: 0;
      }
      &.praise{
        .title{
          background: $warning-color;
        }
      }
      &.complain{
        .title{
          background: $primary-color;
        }
      }
      &.suggest{
        .title{
          background: $link-color;
        }
      }
      .title{
        padding: p2r(20) p2r(30);
        color:#fff;
        font-weight: 200;
        .tag{
          float: right;
        }
      }
      .desc{
        padding: p2r(20) p2r(30);
        line-height: 1.5;
        font-size: p2r(24);
        color: $text-sub-color;
      }
    }
  }
}
</style>
