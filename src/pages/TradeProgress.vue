<template>
  <div class="trade-progress">
    <div class="top">
      <tabnav class="tab" justify="justify" @on-change="tabChange">
        <tabnav-item>
          合同进度
        </tabnav-item>
        <tabnav-item>
          产证进度
        </tabnav-item>
      </tabnav>
    </div>
    <div class="trades" v-if="fetchedData">
      <div class="swiper">
        <swiper
          v-if="banners"
          :options="swiperOption"
          :activeIndex="activeSwipeIndex"
          ref="mySwiper"
          @slideChange="swipeChangeHandler"
        >
          <swiper-slide
            v-for="(item, index) in banners"
            :key="'house-'+index"
          >
            <span class="house-name">{{item}}</span>
          </swiper-slide>
        </swiper>
      </div>
      <div v-if="currentProgress.length" class="progress">
        <flexbox
          v-for="(item, index) in currentProgress"
          :key="'item-'+activeTabIndex+index"
          class="progress-item"
        >
          <flexbox-item class="icon">
            <Icon :name="index===0?'radio-check':'radio'"/>
          </flexbox-item>
          <flexbox-item class="item-body">
            <div class="item-body-wrapper">
              <p class="time">{{item.StatusTime}}</p>
              <h3 class="status">{{item.Status}}</h3>
              <p class="info">{{item.Info}}</p>
            </div>
          </flexbox-item>
        </flexbox>
      </div>
      <div v-else class="no-data-guide">
        <nodata>暂无信息</nodata>
      </div>
    </div>
    <div v-else class="no-data-guide">
      <nodata>暂无房源信息</nodata>
      <Btn type="primary" text="绑定房产" @click="goBind"/>
    </div>
  </div>
</template>
<script>
import {
  Tabnav,
  TabnavItem,
  Flexbox,
  FlexboxItem,
  Icon,
  Nodata,
  Btn
} from 'components'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import api from 'common/api'
export default {
  name: 'TradeProgress',
  components: {
    swiper,
    swiperSlide,
    Tabnav,
    TabnavItem,
    Flexbox,
    FlexboxItem,
    Icon,
    Nodata,
    Btn
  },
  data () {
    return {
      activeTabIndex: 0,
      tradeMap: ['DocumentSrch', 'Permit'],
      swiperOption: {
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 20,
        pagination: {
          el: '.swiper-pagination'
        },
        freeModeMomentumBounce: false,
        effect: 'slide'
      },
      activeSwipeIndex: 0,
      fetchedData: null
    }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.swiper
    },
    banners () {
      if (this.fetchedData) {
        return this.fetchedData[this.currentTab].map(item => {
          return item.House.StageName + item.House.Building + '栋' + item.House.Unit + '单元' + item.House.HouseNo
        })
      }
    },
    currentProgress () {
      if (this.fetchedData) {
        let progressArr = this.fetchedData[this.currentTab].map(item => {
          return item.Process
        })
        let currentArr = progressArr[this.activeSwipeIndex]
        return currentArr
      }
    },
    currentTab () {
      return this.tradeMap[this.activeTabIndex]
    }
  },
  created () {
    this.getProgress()
  },
  methods: {
    getProgress () {
      api.getTradeProgress()
      .then(({res, index}) => {
        if (res.data.IsSuccess) {
          this.fetchedData = res.data.Data
        } else {
          window.$alert(res.Message)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    tabChange (val) {
      this.activeTabIndex = val
    },
    swipeChangeHandler () {
      this.activeSwipeIndex = this.swiper.activeIndex
    },
    goBind () {
      this.$router.push('bind')
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~common/scss/variables.scss";
@import "~common/scss/mixins.scss";
  .trade-progress{
    width:100vw;
    height: 100vh;
    .top{
      width: 100%;
      height: p2r(300);
      background: url('../../static/images/uctop1.png') center/cover no-repeat;
      .tab{
        height: p2r(100);
        background: #fff;
        .tabnav-item{
          font-size: p2r(28);
          &.tabnav-item-active{
            color:$primary-color;
          }
          &:after{
            width:50%;
            left:25%;
            height:4px;
            border-radius: 25px;
          }
        }
      }
    }
    .trades{
      height:calc(100% - 6.4rem);
      padding-top: p2r(10);
      .swiper{
        margin-top: p2r(-70);
        height:p2r(180);
        .swiper-container{
          height:100%;
          .swiper-slide{
            width:p2r(560);
            text-align: center;
            .house-name{
              width:p2r(500);
              height:p2r(140);
              font-size: p2r(28);
              color:$primary-color;
              text-align: center;
              line-height: p2r(140);
              display: inline-block;
              box-shadow: 0 2px 20px 0 rgba(0,0,0,.3);
              border-radius: 4px;
              background: #fff;
            }
          }
        }
      }
      .progress{
        padding:p2r($base-padding);
        height:calc(100% - 2.3466666rem);
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        .progress-item{
          &:first-child{
            .icon{
              &:after{
                background:$primary-color;
              }
              .iconfont{
                font-size: p2r(42);
                color:$primary-color;
              }
            }
          }
          &:last-child{
            .icon{
              &:after{
                display: none;
              }
            }
          }
          .icon{
            flex:0 0 p2r(42);
            position: relative;
            text-align: center;
            .iconfont{
              font-size: p2r(30);
              background: #fff;
              color:$thr-color;
            }
            &:after{
              content: '';
              display: block;
              width: 1px;
              height:100%;
              background: $thr-color;
              position: absolute;
              top:0;
              left:p2r(19);
              z-index: -1;
            }
          }
          .item-body{
            padding-left: p2r(54);
            .time{
              font-size: p2r(24);
              color:$thr-color;
              font-weight: 200;
            }
            .status{
              font-size: p2r(28);
              color:$primary-color;
              margin-top: p2r(20);
            }
            .info{
              margin-top: p2r(20);
              margin-bottom: p2r(70);
              font-size: p2r(24);
              color:$text-color;
              background: $background-color;
              padding: p2r(20);
              font-weight: 200;
              line-height: 1.4;
            }
          }
        }
      }
    }
    .no-data-guide{
      padding:p2r(300) p2r($base-padding) 0;
      text-align: center;
    }
  }
</style>
