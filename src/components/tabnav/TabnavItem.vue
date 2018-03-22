<template>
  <div class="tabnav-item" @click="clickHandler">
    <p class="text">
      {{item.text}}
    </p>
  </div>
</template>
<script>
export default {
  name: 'TabnavItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    clickHandler (e) {
      this.$emit('on-click', e)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~common/scss/variables.scss";
@import "~common/scss/mixins.scss";
 .tabnav-item{
   height:inherit;
   display: table-cell;
   vertical-align: middle;
   position: relative;
   padding:0 p2r(20);
   &:after{
     content: '';
     display: block;
     position: absolute;
     bottom: 0;
     left:0;
     width:100%;
     height:2px;
   }
   &.active{
     &:after{
       background: $primary-color;
     }
     .text{
       color:$primary-color;
       font-weight: normal;
     }
   }
   .text{
     font-size: p2r(26);
     white-space: nowrap;
     overflow: hidden;
     text-overflow: clip;
     text-align: center;
     color:$text-color;
     font-weight: 200;
   }
 }
</style>
