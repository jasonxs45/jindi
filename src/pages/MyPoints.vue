<template>
  <div class="mypoints">
    <div class="top">
      <p class="points">
        <span class="text">当前积分：</span><br />
        <span class="count">{{myPoints}}</span>
      </p>
      <Icon class="gohelp" name="help" @on-click="toggleHelp"/>
    </div>
    <div class="content">
      <nodata v-if="record.length<1">暂无记录</nodata>
      <flexbox
        v-if="record.length>0"
        v-for="(item, index) in record"
        align="center"
        :key="'item-'+index+Math.random().toString(36).substr(2)"
        class="item"
      >
        <flexbox-item class="left">
          <p class="title">{{item.Title}}</p>
          <p class="date">{{item.AddTime}}</p>
        </flexbox-item>
        <flexbox-item class="right" :class="item.Value > 0 ? 'incre' : 'decre'">{{item.Value > 0 ? '+' + item.Value : item.Value }}</flexbox-item>
      </flexbox>
    </div>
    <transition name="fade">
      <div v-if="showHelp" class="help">
        <div class="help-wrapper">
          <h3 class="title">积分规则</h3>
          <div class="details">
            <dl>
              <dd>1.及时获取金地的最新资讯；</dd>
              <dd>2.了解金地热销楼盘信息；</dd>
              <dd>3.可通过金地微信推荐其他人购房而获取丰厚奖励；</dd>
              <dd>4.可在微信上快速报修（保修期内的楼盘业主报修，须通过金地微信上的“在线报修”才可报修）；</dd>
              <dd>5.可在金地微信上提交自己的投诉和建议，并可发送图片；</dd>
              <dd>6.可查询金地商业、写字楼、产业园区的出租信息；</dd>
              <dd>7.可参加金地举办的各种线上线下精彩活动；</dd>
              <dd>8.可在金地微信上发布二手房租售信息；</dd>
              <dd>9.可通过“社区市场”发布二手物品信息。</dd>
            </dl>
          </div>
        </div>
        <Icon class="close" name="close-fill" @on-click="toggleHelp"/>
      </div>
    </transition>
  </div>
</template>
<script>
import {
  Nodata,
  Flexbox,
  FlexboxItem,
  Icon
} from 'components'
import api from 'common/api'
export default {
  name: 'MyPoints',
  components: {
    Nodata,
    Flexbox,
    FlexboxItem,
    Icon
  },
  data () {
    return {
      myPoints: 0,
      record: [],
      showHelp: false
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      api.mypoints.list()
      .then(({res, index}) => {
        if (res.data.IsSuccess) {
          this.myPoints = res.data.Data.Count
          this.record = res.data.Data.List
        } else {
          window.$alert(res.data.Message)
        }
      })
      .catch(err => {
        console.log(err)
      })
    },
    toggleHelp () {
      this.showHelp = !this.showHelp
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~common/scss/variables.scss";
@import "~common/scss/mixins.scss";
.mypoints{
  width:100vw;
  height: 100vh;
  .top{
    width: 100%;
    height: p2r(240);
    background: url('../../static/images/uctop1.png') center/cover no-repeat;
    padding-top: p2r(70);
    position: relative;
    .points{
      color:#fff;
      font-size: 0;
      text-align: center;
      .text{
        font-size: p2r(24);
        display:inline-block;
        font-weight: 200;
      }
      .count{
        font-size: p2r(60);
        font-weight: 600;
        margin-top: p2r(10);
        display:inline-block;
      }
    }
    .gohelp{
      position: absolute;
      top:p2r(30);
      right:p2r(30);
      font-size: p2r(50);
      color:#fff;
    }
  }
  .content{
    width:100%;
    height: calc(100% - 5.12rem);
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    padding:0 p2r($base-padding);
    .item{
      padding-top: p2r(46);
      padding-bottom: p2r(20);
      @include _1px(#eee);
      &:last-child{
        background: none;
      }
      .left{
        .title{
          margin-top: p2r(10);
          font-size: p2r(28);
        }
        .date {
          color: $thr-color;
          margin-top: p2r(15);
        }
      }
      .right{
        flex: 0 0 p2r(100);
        width: p2r(100);
        text-align: right;
        font-size: p2r(40);
        &.incre{
          color: $success-color;
        }
        &.decre{
          color: $error-color;
        }
      }
    }
  }
  .help{
    width: 100%;
    height: 100%;
    position: fixed;
    z-index:100;
    top:0;
    left:0;
    background: rgba(0,0,0,.7);
    padding:p2r($base-padding*2) p2r($base-padding) p2r($base-padding);
    .help-wrapper{
      background: #fff;
      width:100%;
      height: calc(100% - 3rem);
      border-radius: 4px;
      padding: p2r(30);
      .title{
        text-align: center;
        color:$primary-color;
        font-size: p2r(32);
        height: p2r(100);
        line-height: p2r(100);
      }
      .details{
        line-height: 2.2;
        font-size: p2r(28);
        color:$text-color;
        height: calc(100% - 3rem);
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
      }
    }
    .close{
      color:#fff;
      width: p2r(60);
      font-size: p2r(60);
      display:block;
      margin: p2r(30) auto 0;
    }
  }
}
</style>
