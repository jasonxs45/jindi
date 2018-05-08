<template>
 <div class="user-center">
   <userinfo tagText="绑定房源" @tagClick="goBind"></userinfo>
   <div class="entry-list">
    <div class="entry-list-wrapper">
      <router-link
        tag="div"
        v-for="(item, index) in entries"
        :key="'entry--'+index"
        :to="item.link"
      >
        <flexbox
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
      </router-link>
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
import {
  entries
} from 'common/data'
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
      entries: entries.filter(item => {
        return item.name !== '个人中心' &&
               item.name !== '社区活动' &&
               item.name !== '金地家书' &&
               item.name !== '服务指南' &&
               item.name !== '新闻中心' &&
               item.name !== '预约保养' &&
               item.name !== '开放交付' &&
               item.name !== '工程进度'
      })
    }
  },
  methods: {
    goBind () {
      this.$router.push({
        name: 'bind'
      })
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
      background: url('../../static/images/ucbot.png') bottom right/auto 100% no-repeat;
      margin-top: p2r(-76);
    }
  }
}
</style>
