<template>
  <order-list
    :dataArr="orders"
    :showGetMore="showGetMore"
    @get-more="getMoreHandler"
  >
      <div class="list">
        <div
          v-for="(item, index) in orders"
          :key="'untreatedorder-'+index"
          class="advise-card"
        >
          <div class="title">
            <div class="date">
              {{item.date}}
            </div>
            <div class="tag">
              {{item.state}}
            </div>
          </div>
          <div class="content"></div>
        </div>
      </div>
  </order-list>
</template>
<script>
import {
  Container,
  Row,
  OrderList,
  Repaircard
} from 'components'
let orders = []
for (let i = 0; i < 5; i++) {
  let obj = {
    state: 0,
    id: Math.round(Math.random() * 9999),
    title: '金地城二期E栋1303',
    date: '2018/02/28 12:00',
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
  name: 'AUUntreated',
  components: {
    Container,
    Row,
    Repaircard,
    OrderList
  },
  data () {
    return {
      orders,
      show: false
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
