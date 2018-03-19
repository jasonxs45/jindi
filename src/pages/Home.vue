<template>
  <div class="index">
    <div class="swiper">
    </div>
    <flexbox
      class="entries"
      wrap="wrap"
      align="center"
      justify="center">
      <flexbox-item
        v-for="(item, index) in entries"
        :key="'entery'+index">
        <div class="entry">
          <icon :name="item.icon"></icon>
          <p class="name">{{item.name}}</p>
        </div>
      </flexbox-item>
    </flexbox>
    <split></split>
    <flexbox class="notice-board">
      <flexbox-item class="head">
        <img src="/static/images/notice-board.png" alt="" />
      </flexbox-item>
      <flexbox-item>
        <flexbox
          class="notice-wrapper"
          direction="column"
          justify="center"
        >
          <flexbox-item
            v-for="(item, index) in notices"
            :key="'notice'+index"
          >
            <p  class="notice">{{item.text}}</p>
          </flexbox-item>
        </flexbox>
      </flexbox-item>
    </flexbox>
    <split></split>
    <div class="activity-board">
      <statisctitle text="社区活动">
        <div slot="more">
          <span class="text">更多</span><icon name="arrow-right1"></icon>
        </div>
      </statisctitle>
      <activitycard
        src="/static/images/active1.png"
        title="武汉金地樱花季免费送武大门票"
        date="2018/03/23"
        read-num="13"
        :state="1"
      ></activitycard>
    </div>
  </div>
</template>
<script>
 import {
   Icon,
    Flexbox,
    FlexboxItem,
    Split,
    Statisctitle,
    Activitycard
} from 'components'
  export default {
    name: 'Home',
    components: {
      Icon,
      Flexbox,
      FlexboxItem,
      Split,
      Statisctitle,
      Activitycard
    },
    data () {
      return {
        entries: [
          {
            name: '购房进度',
            icon: 'graph'
          },
          {
            name: '业主报修',
            icon: 'repair'
          },
          {
            name: '我的活动',
            icon: 'activity'
          },
          {
            name: '社区期刊',
            icon: 'books'
          },
          {
            name: '在线客服',
            icon: 'msg'
          },
          {
            name: '投诉建议',
            icon: 'suggest'
          }
        ],
        notices: [
          {
            text: '01公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告',
            newsid: 0
          },
          {
            text: '12公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告',
            newsid: 1
          }
        ],
        activityList: []
      }
    }
  }
</script>
<style lang="scss" scoped>
@import "~common/scss/variables.scss";
@import "~common/scss/mixins.scss";
.swiper{
  width:100%;
  height:p2r(300);
  background: #fff;
}
.entries{
  background: #fff;
  height:p2r(320);
  .flexbox-item{
    flex: 0 0 33.3333333%;
    .entry{
      text-align: center;
      height:p2r(160);
      padding-top:p2r(40);
      .iconfont{
        font-size: p2r(40);
        color:$primary-color;
      }
      .name{
        margin-top: p2r(20);
        font-size: p2r(26);
        color:$text-color;
        font-weight: 200;
      }
    }
  }
}
.notice-board{
  width:100%;
  height: p2r(96);
  background:#fff;
  .head{
    flex:0 0 p2r(254);
  }
  .notice-wrapper{
    width:100%;
    height:100%;
    overflow: hidden;
    .notice{
      color:$text-color;
      font-size: p2r(20);
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      height:p2r(48);
      line-height: p2r(48);
      padding-left:p2r(30);
      position: relative;
      &:before{
        content: '';
        display: inline-block;
        width: p2r(10);
        height: p2r(10);
        background: $primary-color;
        position: absolute;
        left: p2r(10);
        top:50%;
        margin-top: p2r(-5);
      }
    }
  }
}
.activity-board{
  padding: p2r($base-padding);
  background:#fff;
  .title{
    .more{
      .text{
        font-weight: 200;
      }
      .iconfont{
        font-size: p2r(24);
        margin-left: p2r(10);
        margin-right: p2r(-10);
      }
    }
  }
}
</style>
