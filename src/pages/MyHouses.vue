<template>
  <div class="myhouses">
    <userinfo type-class="rectangle" :tagText="(list.length<1?'绑定':'添加')+'房源'" @tagClick="goBind"></userinfo>
    <div class="content">
      <nodata v-if="list.length<1">暂无房源</nodata>
      <template
        v-for="(item, index) in list"
      >
        <Split :key="'split-'+index+Math.random().toString(36).substr(2)"/>
        <div
          :key="'house-'+index+Math.random().toString(36).substr(2)"
          :class="item.classType"
          :data-id="item.ID"
          class="house-item"
        >
          <div class="top">
            <div class="project">
              <span class="name">{{item.ProjectName}}</span>
              <span class="tag" :class="item.classType">{{item.OwnerType}}</span>
            </div>
            <p class="stage">{{item.StageName}}{{item.Building}}栋{{item.Unit}}单元{{item.HouseNo}}</p>
          </div>
          <div class="bottom">
            <span class="sign-time">签约时间：{{item.SignTime}}</span>
            <span class="repair-time">报修期止：{{item.Warranty}}</span>
          </div>
          <Btn type="base" text="成员列表" @click.stop="goMembers(item.ID)"/>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import {
  Userinfo,
  Split,
  Nodata,
  Btn
} from 'components'
import api from 'common/api'
import {
  formatDate
} from 'common/utils/date'
const OWNER_TYPE = 3
const RELA_TYPE = 2
const RENT_TYPE = 1
export default {
  name: 'MyHouses',
  components: {
    Userinfo,
    Split,
    Nodata,
    Btn
  },
  data () {
    return {
      houseList: []
    }
  },
  computed: {
    list () {
      this.houseList.forEach((item) => {
        item.classType = item.BindType === OWNER_TYPE
                         ? 'owner'
                         : item.BindType === RELA_TYPE
                         ? 'rela'
                         : item.BindType === RENT_TYPE
                         ? 'rent'
                         : ''
        item.SignTime = formatDate(new Date(item.SignTime), 'yyyy/MM/dd')
        item.Warranty = formatDate(new Date(item.Warranty), 'yyyy/MM/dd')
      })
      return this.houseList
    }
  },
  created () {
    this.getMyHouses()
  },
  methods: {
    getMyHouses () {
      api.myHouse.list()
      .then(({res, index}) => {
        if (res.data.IsSuccess) {
          this.houseList = res.data.Data
        } else {
          window.$alert(res.data.Message)
        }
      })
      .catch(err => {
        console.log(err)
      })
    },
    goMembers (id) {
      this.$router.push({
        name: 'housemember',
        params: {
          id
        }
      })
    },
    goBind () {
      this.$router.push({
        name: 'bind'
      })
    },
    unBindMe (houseid) {
      api.myHouse.unBindMe(houseid)
      .then(({res, index}) => {
        if (res.data.IsSuccess) {
          window.$alert('解绑成功')
          this.houseList.splice(
            this.houseList.findIndex(item => item.ID === houseid),
            1
          )
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
.myhouses{
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  .content{
    width:100%;
    height:calc(100% - 5.12rem);
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    .nodata{
      margin-top: p2r(100);
    }
    .house-item{
      position: relative;
      min-height: p2r(30);
      padding: p2r($base-padding);
      @include _1px();
      &:before{
        content: '';
        display: block;
        width:4px;
        height: 100%;
        position: absolute;
        left:0;
        top:0;
        background: #ccc;
      }
      &.owner{
        &:before{
          background: $warning-color
        }
      }
      &.rela{
        &:before{
          background: $success-color
        }
      }
      &.rent{
        &:before{
          background: $link-color
        }
      }
      .top{
        @include _1px();
        padding:0 0 p2r(20);
        .project{
          font-size: 0;
          .name{
            font-size: p2r(30);
            font-weight: 600;
            display: inline-block;
            vertical-align: middle;
          }
          .tag{
            font-size: p2r(20);
            padding:.1rem .3rem;
            background: #333;
            border-radius:25px;
            color:#fff;
            font-weight: 200;
            display: inline-block;
            vertical-align: middle;
            margin-left: p2r(10);
            &.owner{
              background: $warning-color
            }
            &.rela{
              background: $success-color
            }
            &.rent{
              background: $link-color
            }
          }
        }
        .stage{
          font-size: p2r(24);
          color: $text-sub-color;
          margin-top: p2r(20);
        }
      }
      .bottom{
        color:$thr-color;
        font-weight: 200;
        margin-top: p2r(20);
        font-size: 0;
        .sign-time,
        .repair-time{
          display: inline-block;
          vertical-align: top;
          font-size: p2r(24);
          width:50%;
        }
        .repair-time{
          text-align: right;
        }
      }
      .btn{
        position: absolute;
        width: p2r(140);
        font-size: p2r(24);
        top:p2r($base-padding);
        right:p2r($base-padding);
        border:1px solid #ddd;
        height: p2r(60);
        line-height: p2r(60);
        padding:0;
        border-radius: 4px;
        color:$thr-color;
      }
    }
  }
}
</style>
