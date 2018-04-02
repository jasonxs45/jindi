<template>
<div class="trades">
  <div class="swiper">
    <swiper
      :options="swiperOption"
      :activeIndex="activeIndex"
      ref="mySwiper"
      @slideChange="swipeChangeHandler"
    >
      <!-- slides -->
      <swiper-slide
        v-for="(item, index) in banners"
        :key="'house-'+index"
      >
        <span class="house-name">{{item}}</span>
      </swiper-slide>
    </swiper>
  </div>
  <div class="progress">
    <flexbox
      v-for="(item, index) in currentProgress"
      :key="'item-'+activeIndex+index"
      class="progress-item"
    >
      <flexbox-item class="icon">
        <Icon :name="index===0?'radio-check':'radio'"/>
      </flexbox-item>
      <flexbox-item class="item-body">
        <div class="item-body-wrapper">
          <p class="time">{{item.time}}</p>
          <h3 class="status">{{item.status}}</h3>
          <p class="info">{{item.info}}</p>
        </div>
      </flexbox-item>
    </flexbox>
  </div>
</div>
</template>
<script>
import {
  Flexbox,
  FlexboxItem,
  Icon
} from 'components'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
let tradeData = [
  {
    name: '武汉金地天悦E栋二单元1204',
    progresses:[
      {
        status: '收集资料1',
        info: '备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注1',
        time: '2017/03/23 12:00:00'
      },
      {
        status: '签署合同1',
        info: '备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注1',
        time: '2017/03/23 12:00:00'
      },
       {
        status: '收集资料1',
        info: '备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注1',
        time: '2017/03/23 12:00:00'
      },
      {
        status: '签署合同1',
        info: '备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注1',
        time: '2017/03/23 12:00:00'
      }
    ]
  },
  {
    name: '武汉金地天悦E栋二单元1304',
    progresses:[
      {
        status: '收集资料2',
        info: '备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注2',
        time: '2017/03/23 12:00:00'
      },
      {
        status: '签署合同2',
        info: '备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注2',
        time: '2017/03/23 12:00:00'
      }
    ]
  },
  {
    name: '武汉金地天悦E栋二单元1304',
    progresses:[
      {
        status: '收集资料3',
        info: '备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注3',
        time: '2017/03/23 12:00:00'
      },
      {
        status: '签署合同3',
        info: '备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注3',
        time: '2017/03/23 12:00:00'
      }
    ]
  }
]
export default {
  name: 'Licence',
  components: {
    swiper,
    swiperSlide,
    Flexbox,
    FlexboxItem,
    Icon
  },
  data () {
    return {
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
      activeIndex: 0
    }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.swiper
    },
    banners () {
      return tradeData.map(item => {
        return item.name
      })
    },
    progresses () {
      return tradeData.map(item => {
        return item.progresses
      })
    },
    currentProgress () {
      return this.progresses[this.activeIndex]
    }
  },
  methods: {
    swipeChangeHandler () {
      this.activeIndex = this.swiper.activeIndex
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~common/scss/variables.scss";
@import "~common/scss/mixins.scss";
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
</style>
