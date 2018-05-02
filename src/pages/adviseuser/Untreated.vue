<template>
  <div class="content">
    <div v-if="(orders && orders.length < 1)|| !orders" class="no-data">
      <img src="static/images/advisenodata.png" alt="" />
    </div>
    <div
      v-for="(item, index) in orders"
      :key="'untreatedorder-'+index"
      class="advise-card"
      :class="item.Type === '表扬' ? 'praise' : item.Type === '投诉' ? 'complain' : 'suggest'"
      @click="goDetail"
    >
      <div class="title">
        {{item.AddTime}}
        <div class="tag">
          {{item.Type}}
        </div>
      </div>
      <div class="desc">
        {{item.Content}}
      </div>
    </div>
    <Getmore
      v-if="orders && orders.length > 0"
      :canClick="showGetMore"
      @click="getList"
    />
  </div>
</template>
<script>
import {
  Getmore
} from 'components'
import api from 'common/api'
export default {
  name: 'Untreated',
  components: {
    Getmore
  },
  data () {
    return {
      orders: [],
      state: 0,
      page: 1,
      pagesize: 2,
      lastPage: false
    }
  },
  computed: {
    showGetMore () {
      return !this.lastPage
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      api.advise.user.list(this.state, this.page, this.pagesize)
      .then(({res, index}) => {
        if (res.data.IsSuccess) {
          let arr = res.data.Data.list
          this.orders = this.orders.concat(arr)
          this.lastPage = res.data.Data.lastpage
          this.page += 1
        } else {
          window.$alert(res.data.Message)
        }
      })
      .catch(err => {
        console.log(err)
      })
    },
    getMoreHandler () {
      this.show = !this.show
    },
    goDetail () {
      this.$router.push({
        name: 'advisedetail',
        params: {
          id: 1
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~common/scss/variables.scss";
@import "~common/scss/mixins.scss";
.content {
  width: 100%;
  height: calc(100% - 6.8266666rem);
  padding: p2r($base-padding);
  background: $background-color;
  overflow: auto;
  .advise-card{
    background: #fff;
    border-radius: 4px;
    margin: p2r(30) 0;
    overflow: hidden;
    &:first-child{
      margin-top: 0;
    }
    &.praise{
      .title{
        background: $warning-color;
      }
    }
    &.complain{
      .title{
        background: $primary-color;
      }
    }
    &.suggest{
      .title{
        background: $link-color;
      }
    }
    .title{
      padding: p2r(20) p2r(30);
      color:#fff;
      font-weight: 200;
      .tag{
        float: right;
      }
    }
    .desc{
      min-height: p2r(100);
      padding: p2r(20) p2r(30);
      line-height: 1.5;
      font-size: p2r(24);
      color: $text-sub-color;
    }
  }
  .no-data{
    width: p2r(300);
    margin: p2r(50) auto 0;
  }
  .getmore{
    font-size: p2r(24);
    color: $thr-color;
    .iconfont{
      font-size: p2r(24);
    }
  }
}
</style>
