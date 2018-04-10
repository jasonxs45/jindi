<template>
  <div class="index">
    <div class="swiper">
      <swiper :options="swiperOption" ref="mySwiper" @slideChange="swipeChangeHandler">
        <!-- slides -->
        <swiper-slide
          v-for="(item, index) in banners"
          :key="'banner-'+index"
        >
          <img :src="item.src" alt="" />
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination"  slot="pagination"></div>
      </swiper>
    </div>
    <flexbox
      class="entries"
      wrap="wrap"
      align="center"
      justify="center">
      <flexbox-item
        v-for="(item, index) in entries"
        :key="'entery'+index">
        <router-link :to="item.link" tag="div" class="entry">
          <Icon :name="item.icon"/>
          <p class="name">{{item.name}}</p>
        </router-link>
      </flexbox-item>
    </flexbox>
    <Split />
    <flexbox class="notice-board">
      <flexbox-item class="head">
        <img src="static/images/notice-board.png" alt="" />
      </flexbox-item>
      <flexbox-item>
        <flexbox
          class="notice-wrapper"
          direction="column"
          justify="center"
        >
          <flexbox-item
            v-for="(item, index) in newslist"
            :key="'news'+index"
          >
            <p class="notice" :data-id="item.ID" @click="goNewsDetail">{{item.Title}}</p>
          </flexbox-item>
        </flexbox>
      </flexbox-item>
    </flexbox>
    <Split />
    <div class="activity-board">
      <statisctitle text="社区活动">
        <router-link tag="div" to="/activitylist" slot="more">
          <span class="text">更多</span><Icon name="arrow-right1"/>
        </router-link>
      </statisctitle>
      <activitycard
        v-for="(item, index) in list"
        :data-id="item.id"
        :key="'activity-'+index"
        :img="'http://jindi.1juke.cn'+item.img"
        :title="item.title"
        :playDateRange="item.playDateRange"
        :read-num="item.readNum"
        :state="item.state"
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
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import api from 'common/api'
  import {
    formatDate
  } from 'common/utils/date'
  import {
    entries
  } from 'common/data'
  let fetchedBanners = [
    {
      src: 'static/images/banner1.png',
      link:''
    },
    {
      src: 'static/images/banner2.png',
      link:''
    }
  ]
  export default {
    name: 'Home',
    components: {
      Icon,
      Flexbox,
      FlexboxItem,
      Split,
      Statisctitle,
      Activitycard,
      swiper,
      swiperSlide
    },
    data () {
      return {
        banners: [],
        swiperOption: {
          pagination: {
            el: '.swiper-pagination'
          },
          freeModeMomentumBounce: false,
          effect: 'slide'
        },
        entries,
        newslist: [],
        activityList: []
      }
    },
    computed: {
      list () {
        return this.activityList.map(item => {
          return {
            id: item.ID,
            img: item.Img,
            title: item.Name,
            applyDateRange: item.ApplyStart + ' - ' + item.ApplyEnd,
            playDateRange: item.PlayStart + ' - ' + item.PlayEnd,
            readNum: item.ViewCount,
            state: item.IsOver ? 1 : 0
          }
        })
      },
      swiper () {
        return this.$refs.mySwiper.swiper
      }
    },
    created () {
      this.getActivityList()
      this.getNewsList()
    },
    mounted () {
      this.banners = this.banners.concat(fetchedBanners)
    },
    methods: {
      getActivityList () {
        api.getActivityList()
        .then(({res, index}) => {
          if (res.data.IsSuccess) {
            this.activityList = res.data.Data
            this.activityList = this.activityList.splice(0, 2)
            this.activityList.forEach(item => {
              item.PlayStart = formatDate(new Date(item.PlayStart), 'yyyy/MM/dd hh:mm')
              item.PlayEnd = formatDate(new Date(item.PlayEnd), 'yyyy/MM/dd hh:mm')
            })
          } else {
            window.$alert(res.data.Message)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      getNewsList () {
        api.getNewsList()
        .then(({res, index}) => {
          if (res.data.IsSuccess) {
            this.newslist = res.data.Data
            this.newslist = this.newslist.splice(0, 2)
          } else {
            window.$alert(res.data.Message)
          }
        })
        .catch(err => {
          console.log(err)
        })
      },
      swipeChangeHandler () {
        console.log(this.swiper.activeIndex)
      },
      goNewsDetail (e) {
        let id = e.currentTarget.dataset.id
        this.$router.push({
          name: 'newsdetail',
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
.swiper{
  width:100%;
  height:p2r(300);
  background: #fff;
  .swiper-container{
    width:100%;
    height:100%;
  }
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
      font-size: p2r(24);
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      height:p2r(48);
      line-height: p2r(48);
      padding-left:p2r(30);
      position: relative;
      font-weight: 200;
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
      }
    }
  }
}
</style>
