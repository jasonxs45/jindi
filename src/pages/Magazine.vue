<template>
  <div class="magazine">
    <h2 class="title">社区期刊</h2>
    <p class="desc">{{desc}}</p>
    <div class="swiper">
      <swiper :options="swiperOption" ref="mySwiper" @slideChange="swipeChangeHandler">
        <!-- slides -->
        <swiper-slide
          v-for="(item, index) in banners"
          :key="'banner-'+index"
          :data-id="item.id"
          @click.native="goInner"
        >
          <p class="tit">{{item.title}}</p>
          <Fitimg :src="item.img" alt="" />
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import {
  Fitimg
} from 'components'
import api from 'common/api'
export default {
  name: 'Magazine',
  components: {
    swiper,
    swiperSlide,
    Fitimg
  },
  data () {
    return {
      fetchedList: [],
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
      activeSwipeIndex: 0
    }
  },
  computed: {
    banners () {
      return this.fetchedList.map(item => {
        return {
          title: item.Title,
          img: item.CoverImg,
          id: item.ID,
          desc: item.Description
        }
      })
    },
    desc () {
      if (this.banners.length > 0) {
        return this.banners[this.activeSwipeIndex].desc
      }
    },
    swiper () {
      return this.$refs.mySwiper.swiper
    }
  },
  created () {
    this.getMagazineList()
  },
  methods: {
    getMagazineList () {
      api.getMagazineList()
      .then(({res, index}) => {
        if (res.data.IsSuccess) {
          let fetchedList = res.data.Data
          fetchedList.forEach(item => {
            item.CoverImg = 'http://jindi.1juke.cn' + item.CoverImg
          })
          this.fetchedList = fetchedList
        } else {
          window.$alert(res.data.Message)
        }
      })
      .catch(err => {
        console.log(err)
      })
    },
    swipeChangeHandler (val) {
      this.activeSwipeIndex = this.swiper.activeIndex
    },
    goInner (e) {
      let id = e.currentTarget.dataset.id
      this.$router.push({
        name: 'magazineinner',
        params: {
          id
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~common/scss/variables.scss";
@import "~common/scss/mixins.scss";
.magazine{
  width: 100vw;
  height: 100vh;
  background: url('../../static/images/magabg.png') center bottom/contain no-repeat;
  .title{
    padding-top: p2r(100);
    padding-left: p2r(156);
    font-size: p2r(72);
    color:$primary-color;
  }
  .desc{
    width:p2r(440);
    font-size: p2r(24);
    color:$primary-color;
    line-height: 1.7;
    padding-top: p2r(20);
    margin-left: p2r(156);
  }
  .swiper{
    width:100%;
    height: p2r(800);
    position: absolute;
    bottom: 0;
    .swiper-container{
      width:100%;
      height: 100%;
      padding-top: p2r(40);
      .swiper-slide{
        width:p2r(440) !important;
        height:p2r(700) !important;
        transform: scale(.9);
        transition: transform .3s;
        &.swiper-slide-active{
          transform: scale(1);
        }
        .tit{
          font-size: p2r(30);
          color: $primary-color;
          margin: p2r(30) 0;
          text-shadow: 1px 1px 1px lighten($primary-color, 20%);
        }
        .fit-img{
          display: block;
          width:100%;
          height: p2r(600);
          background: #fff;
          padding: p2r(20);
          box-shadow: 0 8px 20px 0 rgba(0,0,0,.2);
        }
      }
    }
  }
}
</style>
