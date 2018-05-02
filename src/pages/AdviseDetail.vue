<template>
  <div class="advise-detail">
    <div class="wrapper">
      <div
        class="title"
        :class="item.Type === '表扬' ? 'praise' : item.Type === '投诉' ? 'complain' : 'suggest'"
      >
        {{item.AddTime}}
        <div class="tag">
          {{item.Type}}
        </div>
      </div>
      <div class="desc">
        {{item.Content}}
      </div>
      <div class="imgs">
        <Fitimg
          v-for="(item, index) in imgs"
          :key="'item-'+index"
          :src="item"
          alt=""
          @on-click="previewImg(item)"
        />
      </div>
      <Split type="line"/>
      <div
        v-if="item.State === 1"
        class="manager"
      >
        <p class="name">受理人：{{item.AdminName}}</p>
        <p class="tel">联系方式：<a :href="'tel:'+item.AdminTel">{{item.AdminTel}}</a></p>
        <p class="clearfix"></p>
        <p class="time">受理时间：{{item.AcceptTime}}</p>
      </div>
    </div>
    <Btn class="back" size="lar" type="primary" text="返回" @click="back"/>
  </div>
</template>
<script>
import {
  Split,
  Btn,
  Fitimg
} from 'components'
import api from 'common/api'
import wxConf from 'common/utils/wxConf'
const webRoot = 'http://jindi.1juke.cn'
export default {
  name: 'AdviseDetail',
  components: {
    Split,
    Btn,
    Fitimg
  },
  data () {
    return {
      id: null,
      item: {}
    }
  },
  computed: {
    imgs () {
      let arr = []
      if (this.item.Images) {
        arr = this.item.Images.split(',')
        for (let i = 0; i < arr.length; i++) {
          arr[i] = webRoot + arr[i]
        }
      }
      return arr
    }
  },
  watch: {
    '$route' (to, from) {
      this.id = to.params.id
      this.detail()
    }
  },
  created () {
    this.id = this.$route.params.id
    this.detail()
  },
  methods: {
    detail () {
      api.advise.detail(this.id)
      .then(({res, index}) => {
        if (res.data.IsSuccess) {
          this.item = res.data.Data
        } else {
          window.$alert(res.data.Message)
        }
      })
    },
    previewImg (current) {
      let _self = this
      wxConf.previewImg({
        current,
        urls: _self.imgs
      })
    },
    back () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~common/scss/variables.scss";
@import "~common/scss/mixins.scss";
.advise-detail{
  width:100vw;
  height: 100vh;
  background: $background-color;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  .wrapper{
    width:100%;
    min-height: 100%;
    padding-bottom: p2r(180);
    .title{
      padding: p2r(20) p2r(30);
      color:#fff;
      font-weight: 200;
      &.praise{
        background: $warning-color;
      }
      &.complain{
        background: $primary-color;
      }
      &.suggest{
        background: $link-color;
      }
      .tag{
        float: right;
      }
    }
    .desc{
      padding:p2r($base-padding);
      line-height: 1.5;
      background: #fff;
    }
    .imgs{
      background: #fff;
      padding: p2r($base-padding);
      .fit-img{
        width: 100%;
        height: p2r(500);
        border-radius: 4px;
        margin: p2r(20) 0;
        &:first-child{
          margin-top: 0;
        }
      }
    }
    .manager{
      padding:p2r($base-padding);
      background: #fff;
      .name{
        float: left;
        color: $text-sub-color;
      }
      .tel{
        float: right;
        color: $text-sub-color;
      }
      .time{
        margin-top: p2r(20);
        color:$thr-color;
        font-size: p2r(22);
      }
    }
  }
  .back{
    position: relative;
    margin-top: p2r(-140);
  }
}
</style>
