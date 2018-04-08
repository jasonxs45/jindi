<template>
  <div class="magazine">
    <h2 class="title">社区期刊</h2>
    <p class="desc">这里是刊内容的说明这里是对于社区期刊内容的说明这里是对于社区期刊内容的说明这里是对于社区期刊内容的说明这里是对于社区期刊内容的说明这里是对于社区期刊内容的说明</p>
    <div class="swiper">
      <swiper :options="swiperOption" ref="mySwiper" @slideChange="swipeChangeHandler">
        <!-- slides -->
        <swiper-slide
          v-for="(item, index) in banners"
          :key="'banner-'+index"
          :data-index="index"
          @click.native="goInner"
        >
          <img :src="item.src" alt="" />
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'Magazine',
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      banners: [
        {
          src: 'static/images/magazine.png',
          link:''
        },
        {
          src: 'static/images/magazine.png',
          link:''
        }
      ],
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
    swiper () {
      return this.$refs.mySwiper.swiper
    }
  },
  methods: {
    swipeChangeHandler (val) {
      this.activeSwipeIndex = this.swiper.activeIndex
    },
    goInner (e) {
      console.log(e.currentTarget.dataset.index)
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
      padding-top: p2r(100);
      .swiper-slide{
        width:p2r(440) !important;
        height: p2r(600) !important;
        background: #fff;
        padding: p2r(20);
        box-shadow: 0 8px 20px 0 rgba(0,0,0,.2);
        transform: scale(.9);
        transition: transform .3s;
        &.swiper-slide-active{
          transform: scale(1);
        }
      }
    }
  }
}
</style>
