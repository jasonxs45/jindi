<template>
  <div class="activity-list">
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
</template>
<script>
import {
  Activitycard
} from 'components'
import api from 'common/api'
export default {
  name: 'ActivityList',
  components: {
    Activitycard
  },
  data () {
    return {
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
          applyDateRange: item.ApplyStart + '-' + item.ApplyEnd,
          playDateRange: item.PlayStart + '-' + item.PlayEnd,
          readNum: item.ViewCount,
          state: item.IsOver ? 1 : 0
        }
      })
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      api.getActivityList().then(({res, index}) => {
        if (res.data.IsSuccess) {
          this.activityList = res.data.Data
        } else {
          window.$alert(res.data.Message)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~common/scss/variables.scss";
@import "~common/scss/mixins.scss";
.activity-list{
  padding: p2r($base-padding);
}
</style>
