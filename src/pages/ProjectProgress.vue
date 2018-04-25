<template>
  <div class="project-progress">
    <div
      v-for="(item, index) in list"
      :key="'project-'+index"
      :data-id="item.ID"
      class="item"
      @click="goMonthlyList"
    >
      <div class="img">
        <Fitimg :src="'http://jindi.1juke.cn'+item.Logo"/>
      </div>
      <div class="text">
        <h3 class="name">
          <span class="txt"> {{item.ProjectName}}【{{item.ShortName}}】</span>
        </h3>
        <p class="updatetime">更新时间<i>{{item.Ext}}</i></p>
      </div>
    </div>
  </div>
</template>
<script>
import {
  Flexbox,
  FlexboxItem,
  Fitimg
} from 'components'
import api from 'common/api'
import {
  formatDate
} from 'common/utils/date'
export default {
  name: 'ProjectProgress',
  components: {
    Flexbox,
    FlexboxItem,
    Fitimg
  },
  data () {
    return {
      fetchedList: []
    }
  },
  computed: {
    list () {
      return this.fetchedList
    }
  },
  created () {
    this.getProjectList()
  },
  methods: {
    getProjectList () {
      api.projectprogress.projectlist()
      .then(({res, index}) => {
        if (res.data.IsSuccess) {
          let list = res.data.Data
          list.forEach(item => {
            item.Ext = formatDate(new Date(item.Ext), 'yy/MM')
          })
          this.fetchedList = list
        } else {
          window.$alert(res.Message)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    goMonthlyList (e) {
      let id = e.currentTarget.dataset.id
      this.$router.push({
        name: 'monthlyprogress',
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
.project-progress{
  width:100vw;
  height: 100vh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: p2r($base-padding);
  background: $background-color;
  .item{
    width: 100%;
    height: p2r(300);
    margin:p2r(20) 0;
    border-radius: 4px;
    background: #fff;
    position: relative;
    &:first-child{
      margin-top: 0;
    }
    .img{
      width:100%;
      height: 100%;
      .fit-img{
        width:100%;
        height: 100%;
        border-radius: 4px;
      }
    }
    .text{
      position: absolute;
      width: 100%;
      height: 100%;
      top:0;
      left:0;
      background: rgba(0,0,0,.5);
      border-radius: 4px;
      text-align: center;
      padding-top: p2r(120);
      .name{
        font-size: p2r(38);
        color:#fff;
        display: flex;
        align-items: center;
        padding: 0 p2r(30);
        &:before,
        &:after{
          content: '';
          display: block;
          flex: 1;
          height: 1px;
          @include _1px(#fff);
        }
        .txt{
          display: block;
          margin: 0 p2r(20)
        }
      }
      .updatetime{
        position: absolute;
        top:0;
        right: p2r(30);
        width: p2r(140);
        font-size: p2r(20);
        color:$text-color;
        font-weight: 200;
        background: rgba(255,255,255, .8);
        padding-bottom: p2r(15);
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
        padding-top: p2r(10);
        i{
          display: block;
          font-style: normal;
          font-size: p2r(32);
          color:$primary-color;
          margin-top: p2r(10);
          font-weight: 600;
        }
      }
    }
  }
}
</style>
