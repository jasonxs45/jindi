<template>
  <div class="activity-detail">
    <div class="activity-detail-wrapper">
      <div class="banner">
        <img :src="usedActivity.Img" alt="" class="img" />
      </div>
      <div class="details">
        <flexbox class="oneline">
          <flexbox-item class="title">{{usedActivity.Name}}</flexbox-item>
          <flexbox-item class="state" :class="!usedActivity.IsOver?'':'timeout'">{{usedActivity.state === 0?'进行中':'已过期'}}</flexbox-item>
        </flexbox>
        <p class="desc">
          {{usedActivity.Explain}}
        </p>
        <flexbox class="date">
          <flexbox-item class="icon">
            <Icon name="clock"/>
          </flexbox-item>
          <flexbox-item>
            <p class="text">
              {{usedActivity.PlayStart}} - {{usedActivity.PlayEnd}}
            </p>
          </flexbox-item>
        </flexbox>
        <flexbox class="location" v-if="usedActivity.Location">
          <flexbox-item class="icon">
            <Icon name="location"/>
          </flexbox-item>
          <flexbox-item>
            <p class="text">
              {{usedActivity.Location}}
            </p>
          </flexbox-item>
        </flexbox>
        <flexbox  align="center" class="content-title">
          <flexbox-item class="line"></flexbox-item>
          <div class="text">活动明细</div>
          <flexbox-item class="line"></flexbox-item>
        </flexbox>
        <div class="content-detail" v-html="usedActivity.Content"></div>
      </div>
    </div>
    <div class="btn-area">
      <Btn
        type="primary"
        :text="usedActivity.IsOver?'报名截至时间已过':'我要报名'"
        :disabled="usedActivity.IsOver?true:false"
        @click="toggleMask"
      />
    </div>
    <div class="mask">
      <transition name="fade">
        <div class="bg" v-show="showPanel" @click="toggleMask"></div>
      </transition>
      <transition name="slide-up">
        <div class="panel"  v-show="showPanel"></div>
      </transition>
    </div>
  </div>
</template>
<script>
import {
  Flexbox,
  FlexboxItem,
  Icon,
  Btn
} from 'components'
import api from 'common/api'
export default {
  name: 'ActivityDetail',
  components: {
    Flexbox,
    FlexboxItem,
    Icon,
    Btn
  },
  data () {
    return {
      activity: {},
      activityId: null,
      showPanel: false
    }
  },
  computed: {
    id () {
      return this.activityId
    },
    usedActivity () {
      return this.activity
    }
  },
  watch: {
    '$route' (to, from) {
      this.activityId = to.params.id
    }
  },
  created () {
    this.activityId = this.$route.params.id
    this.getActivityInfo()
  },
  methods: {
    getActivityInfo () {
      let index = window.$loading()
      let opt = {
        Act: 'GetActivityInfo',
        Data: JSON.stringify({
          ID: this.id
        })
      }
      api.mock(opt).then(res => {
        window.$close(index)
        if (res.data.IsSuccess) {
          let activity = res.data.Data
          activity.Content = activity.Content.replace(/src="\/UploadFiles\//g, 'src="http://dongyuan.1juke.cn/UploadFiles/')
          activity.PlayStart = activity.PlayStart
          activity.PlayEnd = activity.PlayEnd
          this.activity = activity
        } else {
          window.$alert(res.data.Message)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    toggleMask () {
      this.showPanel = !this.showPanel
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~common/scss/variables.scss";
@import "~common/scss/mixins.scss";
.activity-detail{
  width:100vw;
  height: 100vh;
  padding-bottom: p2r(140);
  overflow: hidden;
  .activity-detail-wrapper{
    width:100%;
    height: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    .banner{
      width:100%;
      .img{
        max-width: 100%;
      }
    }
    .details{
      padding:p2r(40) p2r($base-padding);
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
      .desc{
        color:$thr-color;
        font-size: p2r(24);
        line-height: 1.4;
        margin-top: p2r(28);
        font-weight: 200;
      }
      .date,.location{
        color:$text-color;
        margin-top: p2r(20);
        .icon{
          font-size: p2r(30);
          flex: 0 0 p2r(40);
          .iconfont{
            line-height:1.2;
          }
        }
        .text{
          font-weight: 200;
          font-size: p2r(26);
          line-height:1.4;
        }
      }
      .date{
        margin-top: p2r(40);
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
      .content-title{
        margin-top: p2r(80);
        font-size: p2r(28);
        color:$text-color;
        .line{
          height: 1px;
          @include _1px();
        }
        .text{
          margin:0 p2r(30)
        }
      }
      .content-detail{
        padding-top: p2r(40);
        font-size: p2r(24) !important;
        color:$text-color !important;
        font-weight: 200 !important;
        line-height: 1.4 !important;
        *{
          font-size: p2r(24) !important;
          color:$text-color !important;
          font-weight: 200 !important;
          line-height: 1.4 !important;
        }

      }
    }
  }
  .btn-area{
    position: fixed;
    bottom: 0;
    left:0;
    text-align: center;
    width:100%;
    padding-bottom: p2r(20);
    z-index:1
  }
  .mask{
    .bg{
      position: fixed;
      width:100%;
      height: 100%;
      background:rgba(0,0,0,.7);
      top:0;
      left:0;
      z-index:$zindex-modal;
    }
    .panel{
      position: fixed;
      width:100%;
      height: p2r(900);
      background: rgba(255,255,255,.95);
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      bottom:0;
      z-index:$zindex-notification;
      padding:p2r(80) p2r(30) 0;
    }
  }
}
</style>
