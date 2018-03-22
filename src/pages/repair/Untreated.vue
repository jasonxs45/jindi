<template>
  <div class="untreated-list">
    <Repaircard
      v-for="(item, index) in orders"
      :order="item"
      :key="'untreatedorder-'+index"
    />
  </div>
</template>
<script>
import {
  Repaircard
} from 'components'
let orders = []
for (let i = 0; i < 5; i++) {
  let obj = {
    state: 0,
    id: Math.round(Math.random() * 9999),
    title: '金地城二期E栋1303',
    date: '2018/02/28',
    desc: '主卧墙面-破裂；天花-漏水',
    descDetail: '问题描述问题描述问题描述问题描述问题描述问题描述问题描述问题描述问题描述问题描述问题描述问题描述问题描述',
    ownerPhoto: [
      '/static/images/banner1.png',
      '/static/images/banner2.png',
      '/static/images/active1.png',
      '/static/images/active1.png'
    ]
  }
  orders.push(obj)
}
export default {
  name: 'Untreated',
  components: {
    Repaircard
  },
  data () {
    return {
      orders
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~common/scss/variables.scss";
@import "~common/scss/mixins.scss";
 .untreated-list{
   width:100%;
   background: $background-color;
 }
</style>
