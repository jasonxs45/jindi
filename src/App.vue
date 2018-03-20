<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
.swiper-pagination-bullets{
  .swiper-pagination-bullet{
    background: #ffffff;
    width:6px;
    height:6px;
    &.swiper-pagination-bullet-active{
      width: 12px;
      border-radius: 12px;
    }
  }
}
</style>
