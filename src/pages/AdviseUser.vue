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
  <router-view></router-view>
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
    path: '/adviseuser/list/untreated',
    text: '未处理'
  },
  {
    path: '/adviseuser/list/treated',
    text: '处理中'
  },
  {
    path: '/adviseuser/list/finished',
    text: '已完成'
  }
]
export default {
  name: 'AdviseUser',
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
  methods: {
    tagClick () {
      console.log('tag click')
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
}
</style>
