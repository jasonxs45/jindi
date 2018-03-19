<template>
  <div class="split"></div>
</template>
<script>
export default {
  name: 'Split'
}
</script>
<style lang="scss" scoped>
@import "~common/scss/variables.scss";
@import "~common/scss/mixins.scss";
 .split{
   width:100%;
   height:p2r(10);
   background: $background-color;
 }
</style>
