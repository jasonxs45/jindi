<template>
  <div class="activity-card">
    <div class="img-wrapper">
      <img :src="src" alt="" />
    </div>
    <div class="card-content">
      <flexbox class="oneline">
        <flexbox-item class="title">{{title}}</flexbox-item>
        <flexbox-item class="state" :class="state === 0?'':'timeout'">{{state === 0?'进行中':'已过期'}}</flexbox-item>
      </flexbox>
      <flexbox class="oneline">
        <flexbox-item class="date">{{date}}</flexbox-item>
        <flexbox-item class="read-num">{{readNum}}人查看</flexbox-item>
      </flexbox>
    </div>
  </div>
</template>
<script>
import {
  Flexbox,
  FlexboxItem
} from 'components/flexbox'
export default {
  name: 'Activitycard',
  components: {
    Flexbox,
    FlexboxItem
  },
  props: {
    src: {
      type: String,
      required: true
    },
    link: {
      type: String
    },
    title: {
      type: String,
      required: true
    },
    state: {
      type: [String, Number],
      required: true
    },
    date: {
      type: String,
      required: true
    },
    readNum: {
      type: [String, Number]
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~common/scss/variables.scss";
@import "~common/scss/mixins.scss";
.activity-card{
  border-radius: 4px;
  overflow: hidden;
  box-shadow: $box-shadow;
  margin-top: p2r(30);
  &:first-child{
    margin-top:0;
  }
  .img-wrapper{
    width:100%;
    // height:p2r(240);
    // overflow: hidden;
    text-align: center;
    img{
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }
  }
  .card-content{
    padding:p2r(20);
    .oneline{
      margin: p2r(15) 0;
    }
    .title{
      font-size: p2r(28);
      color:$text-color;
      font-weight: 500;
      line-height: p2r(32);
      display: inline-block;
    }
    .date{
      font-size: p2r(24);
      color:$text-sub-color;
      font-weight: 200;
    }
    .read-num{
      font-size: p2r(24);
      color:$thr-color;
      font-weight: 200;
      flex:0 0 p2r(180);
      text-align: right;
    }
    .state{
      font-size: p2r(20);
      font-weight: 200;
      height:p2r(32);
      line-height: p2r(32);
      border-radius: 25px;
      background:$primary-color;
      color:#fff;
      width:p2r(100);
      text-align: center;
      flex:0 0 p2r(100);
      &.timeout{
        background:$text-sub-color;
        color:$thr-color;
      }
    }
  }
}
</style>
