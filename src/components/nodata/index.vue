<template>
  <div class="nodata">
    <Icon name="suggest"/>
    <div class="info">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import Icon from 'components/icon'
export default {
  name: 'Nodata',
  components: {
    Icon
  }
}
</script>
<style lang="scss" scoped>
@import "~common/scss/variables.scss";
.nodata{
 text-align: center;
 color:$thr-color;
 .iconfont{
   font-size: p2r(56);
 }
 .info{
   padding:p2r($base-padding);
   font-size: p2r(28);
   font-weight: 200;
 }
}
</style>
