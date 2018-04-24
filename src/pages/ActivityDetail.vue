<template>
  <div class="activity-detail">
    <div class="activity-detail-wrapper">
      <div class="banner">
        <img :src="usedActivity.Img" alt="" class="img" />
      </div>
      <div class="details">
        <flexbox class="oneline">
          <flexbox-item class="title">{{usedActivity.Name}}</flexbox-item>
          <flexbox-item class="state" :class="!usedActivity.IsOver?'':'timeout'">{{usedActivity.state === 1?'进行中':'已过期'}}</flexbox-item>
        </flexbox>
        <p class="desc">
          {{usedActivity.Desc}}
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
        @click="btnClick"
      />
    </div>
    <div class="mask">
      <transition name="fade">
        <div class="bg" v-show="showPanel" @click="toggleMask"></div>
      </transition>
        <transition name="slide-up">
          <div class="panel" v-show="showPanel">
              <div class="panel-wrapper">
                <dl class="choosing-item" v-if="usedActivity.Options" >
                  <dt class="title">{{usedActivity.Options.title}}</dt>
                  <dd class="content">
                    <label
                      v-for="(item, index) in usedActivity.Options.items"
                      :key="'choosingtag-'+index+Math.random().toString(36).substr(2)"
                      class="radio-wrapper"
                    >
                      <input
                        v-model="selectedItem"
                        type="radio"
                        name="item"
                        :value="item.name"
                        class="radio"
                      >
                      <span class="text">{{item.name}}</span>
                    </label>
                  </dd>
                </dl>
                <flexbox class="controller">
                  <flexbox-item class="title">参与人数</flexbox-item>
                  <flexbox-item class="cells">
                    <span class="cell">
                      <Icon name="minus" />
                    </span>
                    <span class="cell">
                      <input type="tel" class="input">
                    </span>
                    <span class="cell">
                      <Icon name="plus" />
                    </span>
                  </flexbox-item>
                </flexbox>
              </div>
            <Btn type="primary" size="lar" text="确定" @click="optionSignIn"/>
          </div>
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
import {
  formatDate
} from 'common/utils/date'
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
      showPanel: false,
      selectedItem: ''
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
      this.getActivityInfo()
    }
  },
  created () {
    this.activityId = this.$route.params.id
    this.getActivityInfo()
  },
  methods: {
    getActivityInfo () {
      let id = this.id
      api.activity.detail(id)
      .then(({res, index}) => {
        if (res.data.IsSuccess) {
          let activity = res.data.Data
          activity.Img = 'http://jindi.1juke.cn' + activity.Img
          activity.Content = activity.Content.replace(/src="\/UploadFiles\//g, 'src="http://jindi.1juke.cn/UploadFiles/')
          activity.PlayStart = formatDate(new Date(activity.PlayStart), 'yyyy/MM/dd')
          activity.PlayEnd = formatDate(new Date(activity.PlayEnd), 'yyyy/MM/dd')
          activity.state = activity.IsOver ? 0 : 1
          if (activity.Options) {
            activity.Options = JSON.parse(activity.Options)
          }
          this.activity = activity
        } else {
          window.$alert(res.data.Message)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    btnClick () {
      if (this.usedActivity.NeedMoreInfo) {
        this.toggleMask()
      } else {
        this.directSignIn()
      }
    },
    directSignIn () {
      api.activity.apply(this.activityId)
      .then(({res, index}) => {
        if (res.data.IsSuccess) {
          window.$alert({
            title: '恭喜您！',
            content: '报名成功！'
          })
        } else {
          window.$alert(res.data.Message)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    optionSignIn () {
      if (this.selectedOptions.length < 1) {
        window.$alert('请选择品类')
        return
      }
      let _self = this
      let a = new Set(this.usedActivity.Options.map(item => item.title))
      let b = new Set(this.selectedOptions.map(item => item.title))
      let differenceABSet = new Set([...a].filter(x => !b.has(x)))
      let differenceABArray = Array.from(differenceABSet)
      if (differenceABArray.length > 0) {
        window.$alert(`请选择品类'${differenceABArray[0]}'`)
        return
      }
      api.activity.apply(this.activityId, JSON.stringify(this.selectedOptions))
      .then(({res, index}) => {
        if (res.data.IsSuccess) {
          window.$alert({
            title: '恭喜您！',
            content: '报名成功！',
            yes () {
              window.$closeAll()
              _self.toggleMask()
            }
          })
        } else {
          window.$alert({
            content: res.data.Message,
            yes () {
              window.$closeAll()
              _self.toggleMask()
            }
          })
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
      padding:p2r($base-padding) p2r($base-padding) p2r(40);
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
      background: rgba(255,255,255,1);
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      bottom:0;
      z-index:$zindex-notification;
      padding:p2r(60) p2r(30) 0;
      .panel-wrapper{
        height: p2r(640);
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        .title{
          font-size: p2r(28);
          color:$text-sub-color;
          font-weight: 600;
        }
        .choosing-item{
          margin-top: p2r(40);
          margin-bottom: p2r(40);
          overflow: hidden;
          &:first-child{
            margin-top: 0;
          }
          .content{
            margin: {
              top:p2r(20);
              left: p2r(-30);
              right: p2r(-30);
            }
            .radio-wrapper{
              display: inline-block;
              position: relative;
              width:p2r(190);
              height:p2r(60);
              margin:p2r(20) p2r(30) 0;
              .radio{
                width:0;
                height:0;
                display: block;
                &:checked + .text{
                  background: $primary-color;
                  color:#fff;
                }
              }
              .text{
                color:lighten($primary-color, 15%);
                font-size: p2r(24);
                display: block;
                width:100%;
                height: 100%;
                border-radius: 4px;
                border:1px solid lighten($primary-color, 15%);
                line-height: p2r(58);
                text-align: center;
                font-weight: 200;
              }
            }
          }
        }
        .controller {
          .title{
            line-height: p2r(40);
          }
          .cells{
            text-align: right;
            font-size: 0;
            .cell{
              display: inline-block;
              vertical-align: middle;
              height: p2r(40);
              .input,
              .iconfont{
                display: block;
                height: 100%;
                text-align: center;
                line-height: p2r(40);
                font-size: p2r(24);
                border-radius: 4px;
              }
              .iconfont{
                width: p2r(40);
                color:#fff;
                background: $primary-color;
              }
              .input{
                margin:0 p2r(10);
                width:p2r(80);
                color:$primary-color;
                border:1px solid $primary-color;
                outline: none;
                -webkit-appearance: none;
              }
            }
          }
        }
      }
      .btn{
        margin-top: p2r(30);
      }
    }
  }
}
</style>
