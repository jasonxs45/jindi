<template>
  <div class="guide">
    <flexbox class="top-bar">
      <label class="flexbox-item select-wrapper">
        <span class="head">城市:</span>
        <div class="select">
          <select v-model="city">
            <option
              v-for="(item, index) in cityList"
              :key="'city-'+index"
              :value="item"
            >{{item.Value}}</option>
          </select>
          <span class="text">{{city.Value}}</span>
          <Icon name="caret-down"/>
        </div>
      </label>
      <flexbox-item class="input-wrapper">
        <XInput />
        <Icon name="search"/>
      </flexbox-item>
    </flexbox>
    <div class="content">
      <nodata v-if="list.length < 1">暂无数据</nodata>
      <div
        v-for="(item, index) in list"
        :key="'item-'+index"
        class="item"
      >
        <span class="text">{{item.Name}}</span>
        <Icon name="arrow-right1" />
      </div>
    </div>
  </div>
</template>
<script>
import {
  Flexbox,
  FlexboxItem,
  XInput,
  Icon,
  Nodata
} from 'components'
import api from 'common/api'
export default {
  name: 'Guide',
  components: {
    Flexbox,
    FlexboxItem,
    XInput,
    Icon,
    Nodata
  },
  data () {
    return {
      city: {
        ID: '',
        Value: '全部'
      },
      cityList: [
        {
          ID: '',
          Value: '全部'
        }
      ],
      allList: []
    }
  },
  computed: {
    list () {
      return this.allList.filter(item => this.city.ID ? item.TypeID === this.city.ID : true)
    }
  },
  created () {
    this.getCityList()
    this.getAllList()
  },
  methods: {
    getCityList () {
      api.guide.cityList()
      .then(({res, index}) => {
        if (res.data.IsSuccess) {
          this.cityList = this.cityList.concat(res.data.Data)
        } else {
          window.$alert(res.data.Message)
        }
      })
      .catch(err => {
        console.log(err)
      })
    },
    getAllList () {
      api.guide.allList()
      .then(({res, index}) => {
        if (res.data.IsSuccess) {
          this.allList = res.data.Data
        } else {
          window.$alert(res.data.Message)
        }
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~common/scss/variables.scss";
@import "~common/scss/mixins.scss";
.guide{
  .top-bar{
    width:100%;
    height:56px;
    box-shadow: 0 0 4px 0 rgba(0,0,0,.2);
    position: fixed;
    background: #fff;
    z-index: 1;
    .select-wrapper{
      padding: 8px 0 8px p2r(20);
      font-size: 0;
      background: #fff;
      .head{
        height: 40px;
        text-align: center;
        line-height: 40px;
        font-size: p2r(28);
        display: inline-block;
        vertical-align: top;
        font-weight: 200;
      }
      .select{
        max-width: p2r(180);
        height: 100%;
        padding:0 p2r(10);
        font-size: p2r(28);
        display: inline-block;
        vertical-align: top;
        position: relative;
        select{
          -webkit-appearance: none;
          border:none;
          outline: none;
          width: 100%;
          height: 100%;
          position: absolute;
          opacity: 0;
          option{
            text-align: center;
          }
        }
        .text{
          display: inline-block;
          height: 100%;
          line-height: 40px;
          font-size: p2r(28);
        }
        .iconfont{
          width: 16px;
          height: 40px;
          display:inline-block;
          text-align: center;
          line-height: 40px;
          font-size: p2r(16);
          color:$thr-color;
          vertical-align: top;
          color:$primary-color;
        }
      }
    }
    .input-wrapper{
      position: relative;
      height: 100%;
      padding: 8px p2r(20);
      .x-input{
        height: 40px;
        line-height: 40px;
        width: 100%;
        border:none;
        background: rgba(0,0,0,.05);
        font-size: p2r(26);
      }
      .iconfont{
        width:40px;
        height: 40px;
        display:block;
        text-align: center;
        line-height: 40px;
        position: absolute;
        top: 8px;
        right: p2r(20);
        color:$thr-color;
      }
    }
  }
  .content{
    padding:56px p2r(20) 0;
    .item{
      position: relative;
      height: p2r(100);
      line-height: p2r(100);
      font-size: p2r(28);
      @include _1px(#eee);
      .text{
        display: inline-block;
      }
      .iconfont{
        font-size: p2r(24);
        color:$thr-color;
        width: p2r(30);
        display: inline-block;
        position: absolute;
        right: 0;
      }
    }
  }
}
</style>
