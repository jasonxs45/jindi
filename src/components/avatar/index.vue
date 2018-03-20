<template>
  <div class="avatar">
    <div class="img-wrapper">
      <img class="img" :src="src" alt="" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'Avatar',
  props: {
    src: {
      type: String
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~common/scss/variables.scss";
@import "~common/scss/mixins.scss";
  .avatar{
    width:p2r(120);
    height: p2r(120);
    border:1px solid #fff;
    border-radius: 50%;
    display: table;
    background: $primary-color;
    overflow: hidden;
    .img-wrapper{
      display: table-cell;
      vertical-align: middle;
      .img{
        max-width: 100%;
        max-height: 100%;
        width:p2r(118);
        height: p2r(118);
      }
    }
  }
</style>
