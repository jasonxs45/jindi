<template>
  <div class="trade-progress">
    <div class="top">
      <flexbox class="tab">
        <flexbox-item>
          <router-link
            to="contract"
            tag="div"
            class="link"
          >
            合同进度
          </router-link>
        </flexbox-item>
        <flexbox-item>
          <router-link
            to="licence"
            tag="div"
            class="link"
          >
            产证进度
          </router-link>
        </flexbox-item>
      </flexbox>
    </div>
    <router-view></router-view>
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
export default {
  name: 'TradeProgress',
  components: {
    swiper,
    swiperSlide,
    Flexbox,
    FlexboxItem,
    Icon
  },
  data () {
    return {
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
      background: url('/static/images/uctop1.png') center/cover no-repeat;
      .tab{
        height: p2r(100);
        background: #fff;
        .link{
          position: relative;
          height: p2r(100);
          text-align: center;
          line-height: p2r(100);
          color:$text-color;
          font-size: p2r(28);
          &:after{
            content: '';
            display: block;
            position: absolute;
            bottom: 0;
            width:50%;
            left:25%;
            height: 4px;
            border-radius: 4px;
            background: none;
          }
          &.router-link-active{
            &:after{
              background: $primary-color;
            }
          }
        }
      }
    }
  }
</style>
