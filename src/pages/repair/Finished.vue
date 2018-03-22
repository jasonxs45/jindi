<template>
  <div class="finished-list">
    <Repaircard
      v-for="(item, index) in orders"
      :order="item"
      :key="'finishedorder-'+index"
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
    state: 2,
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
    ],
    engineer: {
      name: '吴建军',
      tel: '15972228857'
    },
    progress: [
      {
        text: '已联系业主，准备上门检查',
        date: '02/28 12:00'
      },
      {
        text: '已联系业主，准备上门检查',
        date: '02/28 13:00'
      },
      {
        text: '已联系业主，准备上门检查',
        date: '02/28 12:00'
      }
    ],
    repairPhoto: [
      '/static/images/banner1.png',
      '/static/images/banner2.png',
      '/static/images/active1.png',
      '/static/images/active2.png'
    ],
    rate: 3.8
  }
  orders.push(obj)
}
export default {
  name: 'Finished',
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
 .finished-list{
   width:100%;
   background: $background-color;
 }
</style>
