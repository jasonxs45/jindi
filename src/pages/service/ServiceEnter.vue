<template>
  <div class="service-enter">
    <router-link v-for='item in list' :key='item.title' :to='item.path' tag='div' class='link'>
      <h5 class='title'>{{item.title}}</h5>
      <p class='desc'>{{item.desc}}</p>
    </router-link>
    <div class='caution'>
      <h5 class='title'>服务监督</h5>
      <p class='p'>金地集团投诉热线：<a href='tel:4000383535'>4000383535</a></p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ServiceEnter',
  data () {
    return {
      list: [
        {
          title: '全流程服务指南',
          desc: 'PROCESS SERVICE GUIDE',
          path: '/guide-info'
        },
        {
          title: '服务电话大全',
          desc: 'SERVICE CALL',
          path: '/guide'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~common/scss/variables.scss";
@import "~common/scss/mixins.scss";
.service-enter{
  padding: p2r(30);
}
.link{
  width: 100%;
  height: p2r(240);
  background: url('./cell.png') center/100% 100% no-repeat;
  box-shadow: 0 0 6px 0 rgba(0,0,0,.2);
  margin: p2r(30) 0;
  text-align: center;
  padding-top: p2r(78);
  .title{
    font-size:p2r(42);
    font-weight:600;
    color:#fff;
    line-height:p2r(58);
    letter-spacing:p2r(4);
  }
  .desc{
    font-size:p2r(24);
    font-weight:300;
    color:#fff;
    line-height:p2r(30);
    letter-spacing:p2r(2);
  }
}
.caution{
  margin-top: p2r(60);
  .title{
    font-size: 18px;
    font-weight: 500;
    text-align: center;
    color: #EA5532;
  }
  .p{
    font-size: 14px;
    margin-top: 15px;
    text-align: center;
    color: #666;
  }
}
</style>
