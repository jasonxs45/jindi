<template>
  <div class="activity-list">
    <activitycard
      v-for="(item, index) in list"
      :data-id="item.id"
      :key="'activity-'+index"
      :img="item.img"
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
import {
  formatDate
} from 'common/utils/date'
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
          applyDateRange: formatDate(new Date(item.ApplyStart), 'yyyy/MM/dd') + ' - ' + formatDate(new Date(item.ApplyEnd), 'yyyy/MM/dd'),
          playDateRange: formatDate(new Date(item.PlayStart), 'yyyy/MM/dd') + ' - ' + formatDate(new Date(item.PlayEnd), 'yyyy/MM/dd'),
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
      let index = window.$loading()
      api.getActivityList().then(res => {
        window.$close(index)
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
  width:100vw;
  height:100vh;
  padding: p2r($base-padding);
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
</style>
