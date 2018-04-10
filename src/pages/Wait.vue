<template>
  <div class="wait">
    <h3 class="title">
      功能建设中...
    </h3>
    <img src="static/images/logo1.png" alt="" class="logo1" />
    <img src="static/images/logo2.png" alt="" class="logo2" />
  </div>
</template>
<script>
export default {
  name: 'Wait'
}
</script>
<style lang="scss" scoped>
@import "~common/scss/variables.scss";
@import "~common/scss/mixins.scss";
.wait{
  width:100vw;
  height: 100vh;
  background: $background-color;
  .title{
    padding-top: p2r(300);
    text-align: center;
    font-size: p2r(26);
    color:$thr-color;
    font-weight: 200;
  }
  .logo1,
  .logo2{
    width: p2r(280);
    display: block;
    margin:p2r(50) auto;
  }
  .logo1{
    width: p2r(320);
    margin-top: p2r(100);
  }
}
</style>
