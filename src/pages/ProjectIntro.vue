<template>
  <div class="project-intro">
    <img
      v-for="(item, index) in items[cityName]"
      :key="'img-'+index+Math.random().toString(36).substr(2)"
      :src="item"
      alt="" />
  </div>
</template>
<script>
import {tochinese} from 'common/utils/unicode'
const items = {
  '武汉': [
    'static/images/wuhan1.jpg?v=1.1',
    'static/images/wuhan2.jpg?v=1.2'
  ],
  '郑州': [
    'static/images/zhengzhou1.jpg'
  ],
  '长沙': [
    'static/images/changsha1.png'
  ]
}
export default {
  name: 'ProjectIntro',
  data () {
    return {
      items,
      cityName: ''
    }
  },
  created () {
    this.cityName = tochinese(this.$route.params.name)
  }
}
</script>
<style lang="scss" scoped>
.project-intro{
  text-align:center;
}
</style>
