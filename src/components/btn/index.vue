<template>
  <div :class="classes" @click="clickHandler">{{text}}</div>
</template>
<script>
export default {
  name: 'Btn',
  props: {
    type: {
      type: String,
      default: 'base'
    },
    size: {
      type: String,
      default: 'mid'
    },
    text: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      classes: ['btn', this.type, this.size]
    }
  },
  methods: {
    clickHandler (e) {
      this.$emit('click', e)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~common/scss/variables.scss";
@import "~common/scss/mixins.scss";
.btn{
  border-radius: 25px;
  text-align: center;
  width:p2r(500);
  display: inline-block;
  padding:p2r(30) 0;
  &.base{
    background:#fff;
    color:$primary-color;
    font-size: p2r(30);
  }
  &.primary{
    background:$primary-color;
    color:#fff;
    font-size: p2r(36);
    box-shadow: 0 1px 8px 1px lighten($primary-color, 25%)
  }
  &.lar{
    width:p2r(590);
    display: block;
    margin-left:auto;
    margin-right: auto;
  }
}
</style>
