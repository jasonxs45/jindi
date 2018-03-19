<template>
  <i :class="classes"></i>
</template>
<script>
export default {
  name: 'Icon',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    classes () {
      return ['iconfont', `icon-${this.name}`]
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~common/scss/iconfont.scss";
</style>
