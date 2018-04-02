<template>
  <div class="news-center">
    <div class="swiper">
      <swiper :options="swiperOption" ref="mySwiper" @slideChange="swipeChangeHandler">
        <!-- slides -->
        <swiper-slide
          v-for="(item, index) in banners"
          :key="'banner-'+index"
        >
          <Fitimg :src="item.img" alt="" />
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination"  slot="pagination"></div>
      </swiper>
    </div>
    <div class="news-list">
      <template v-for="(item, index) in newslist">
        <Split :key="'news-item'+index+Math.random().toString(36).substr(2)"/>
        <flexbox
          :key="'news-item'+index+Math.random().toString(36).substr(2)"
          class="item">
          <flexbox-item class="thumb">
            <Fitimg
              :src="item.img"
            />
          </flexbox-item>
          <flexbox-item class="text">
            <p class="title">
              {{item.title}}
            </p>
            <p class="date">{{item.date}}</p>
          </flexbox-item>
        </flexbox>
      </template>
    </div>
  </div>
</template>
<script>
import {
  Icon,
  Split,
  Flexbox,
  FlexboxItem,
  Fitimg
} from 'components'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import api from 'common/api'
export default {
  name: 'NewsCenter',
  components: {
    Icon,
    Split,
    Flexbox,
    FlexboxItem,
    swiper,
    swiperSlide,
    Fitimg
  },
  data () {
    return {
      newslist: [],
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        },
        freeModeMomentumBounce: false,
        effect: 'slide'
      }
    }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.swiper
    },
    banners () {
      return this.newslist.slice(0, 5)
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      api.query({
        v: 'newslist'
      }).then(res => {
        console.log(res)
        this.newslist = res.data.data
      }).catch(err => {
        console.log(err)
      })
    },
    swipeChangeHandler () {
      console.log(this.swiper.activeIndex)
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
  .swiper-container{
    width:100%;
    height:100%;
  }
}
.news-center{
  .news-list{
    .item{
      .thumb{
        flex: 0 0 p2r(300);
        height: p2r(200);
        .fit-img{
          width: 100%;
          height: 100%;
        }
      }
      .text{
        padding:p2r(20) p2r(60) p2r(22) p2r(30);
        position: relative;
        .title{
          font-size: p2r(28);
          color:$text-color;
          line-height: p2r(40);
          font-weight: 600;
        }
        .date{
          font-size: p2r(24);
          color:$thr-color;
          font-weight: 200;
          position: absolute;
          bottom: p2r(22);
          left: p2r(30);
        }
      }
    }
  }
}
</style>
