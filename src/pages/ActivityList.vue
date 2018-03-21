<template>
  <div class="activity-list">
      <activitycard
        v-for="(item, index) in activityList"
        :key="'activity-'+index"
        :src="item.src"
        :title="item.title"
        :date="item.date"
        :read-num="item.readNum"
        :state="item.state"
        @click.native="clickHandler"
      ></activitycard>
  </div>
</template>
<script>
import {
  Activitycard
} from 'components'
let activityList = [
  {
    src: '/static/images/active1.png',
    title: '武汉金地樱花季免费送武大门票',
    date: '2018/03/23',
    readNum: '13',
    state: 0,
    link: ''
  },
  {
    src: '/static/images/active2.png',
    title: '武汉金地樱花季免费送武大门票',
    date: '2018/03/23',
    readNum: '13',
    state: 1,
    link: ''
  },
  {
    src: '/static/images/active2.png',
    title: '武汉金地樱花季免费送武大门票',
    date: '2018/03/23',
    readNum: '13',
    state: 1,
    link: ''
  },
  {
    src: '/static/images/active2.png',
    title: '武汉金地樱花季免费送武大门票',
    date: '2018/03/23',
    readNum: '13',
    state: 1,
    link: ''
  }
]
export default {
  name: 'ActivityList',
  components: {
    Activitycard
  },
  data () {
    return {
      activityList
    }
  },
  methods: {
    clickHandler () {
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
