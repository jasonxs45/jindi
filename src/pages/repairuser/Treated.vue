<template>
  <order-list
    :dataArr="orders"
    :showGetMore="showGetMore"
    @get-more="getMoreHandler"
  >
  <div class="list">
    <Repaircard
      v-for="(item, index) in orders"
      :order="item"
      :key="'treatedorder-'+index"
    />
  </div>
  </order-list>
</template>
<script>
import {
  OrderList,
  Repaircard
} from 'components'
let orders = []
for (let i = 0; i < 5; i++) {
  let obj = {
    state: 1,
    id: Math.round(Math.random() * 9999),
    title: '金地城二期E - 1303',
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
      }
    ]
  }
  orders.push(obj)
}
export default {
  name: 'RUTreated',
  components: {
    OrderList,
    Repaircard
  },
  data () {
    return {
      orders
    }
  },
  computed: {
    showGetMore () {
      return this.show
    }
  },
  methods: {
    getMoreHandler () {
      console.log('get more')
      this.show = !this.show
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
