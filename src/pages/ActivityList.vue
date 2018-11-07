<template>
  <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10" class="activity-list">
    <div v-if="list.length<1" class="nodata-box">
      <nodata><p>对不起，<br/>您尚未参与任何活动</p></nodata>
      <Btn style="display:none" type="primary" text="社区活动" @click="goList"/>
    </div>
    <activitycard
      v-for="(item, index) in list"
      :data-id="item.id"
      :key="'activity-'+index"
      :img="'http://jindi.1juke.cn'+item.img"
      :title="item.title"
      :playDateRange="item.playDateRange"
      :read-num="item.readNum"
      :local="item.local"
      :condition="item.condition"
      :state="item.state"
    ></activitycard>
    <div class="loading">{{finished ? '---没有更多了---' : '加载中...'}}</div>
  </div>
</template>
<script>
import infiniteScroll from 'vue-infinite-scroll'
import {
  Activitycard,
  Nodata,
  Btn
} from 'components'
import api from 'common/api'
import {
  formatDate
} from 'common/utils/date'
const CLASS_MAP = {
  activity: {
    title: '关怀活动',
    S_Class: 1
  },
  signup: {
    title: '预约保养',
    S_Class: 2
  },
  accept: {
    title: '开放/交付',
    S_Class: 3
  },
  mine: {
    title: '我的活动',
    S_Class: -1
  }
}
export default {
  name: 'ActivityList',
  directives: {
    infiniteScroll
  },
  components: {
    Activitycard,
    Nodata,
    Btn
  },
  data () {
    return {
      activityList: [],
      currentView: '',
      loading: false,
      pageIndex: 1,
      finished: false
    }
  },
  computed: {
    list () {
      return this.activityList.map(item => {
        return {
          id: item.ID,
          img: item.Img,
          title: item.Name,
          applyDateRange: formatDate(new Date(item.ApplyStart), 'yyyy/MM/dd') + '-' + formatDate(new Date(item.ApplyEnd), 'yyyy/MM/dd'),
          playDateRange: formatDate(new Date(item.PlayStart), 'yyyy/MM/dd') + '-' + formatDate(new Date(item.PlayEnd), 'yyyy/MM/dd'),
          readNum: item.ViewCount,
          local: '',
          condition: item.Explain,
          state: item.state
        }
      })
    }
  },
  watch: {
    '$route' (to, from) {
      this.currentView = to.params.classtype
      if (CLASS_MAP[this.currentView]) {
        window.document.title = CLASS_MAP[this.currentView].title || '金地'
        this.getList()
      } else {
        this.$router.push({
          name: 'pagenotfound'
        })
      }
    }
  },
  created () {
    this.currentView = this.$route.params.classtype
    if (CLASS_MAP[this.currentView]) {
      window.document.title = CLASS_MAP[this.currentView].title || '金地'
      this.getList()
    } else {
      this.$router.push({
        name: 'pagenotfound'
      })
    }
  },
  methods: {
    getList () {
      api.activity.list(CLASS_MAP[this.currentView].S_Class, 10, this.pageIndex)
      .then(({res, index}) => {
        if (res.data.IsSuccess) {
          this.activityList = res.data.Data
        } else {
          window.$alert(res.data.Message)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    goList () {
      this.$router.replace({
        name: 'activitylist',
        params: {
          classtype: 'activity'
        }
      })
    },
    loadMore () {
      if (!this.finished) {
        this.loading = true
        this.pageIndex += 1
        api.activity.list1(CLASS_MAP[this.currentView].S_Class, 10, this.pageIndex)
        .then(res => {
          window.$closeAll()
          this.loading = false
          if (res.data.IsSuccess) {
            if (this.activityList.length < res.data.DataCount) {
              this.activityList = this.activityList.concat(res.data.Data)
            } else {
              this.finished = true
            }
          } else {
            window.$alert(res.data.Message)
          }
        }).catch(err => {
          this.loading = false
          console.log(err)
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~common/scss/variables.scss";
@import "~common/scss/mixins.scss";
.activity-list{
  padding: p2r($base-padding);
  .nodata-box{
    margin-top: p2r(260);
    text-align: center;
    .btn{
      margin-top: p2r(40);
    }
  }
}
.loading{
  text-align: center;
  font-size: p2r(24);
  color: #888;
  padding: p2r(30) 0 0;
  font-weight: 200;
}
</style>
