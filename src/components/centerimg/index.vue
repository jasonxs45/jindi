<template>
  <div
    class="center-img"
    :style="{'background-image':`url(${src})`}"
    @click="clickHandler"
  >
  </div>
</template>
<script>
export default {
  name: 'Centerimg',
  props: {
    src: {
      type: String,
      required: true
    }
  },
  methods: {
    clickHandler (e) {
      this.$emit('on-click', this.src)
    }
  }
}
</script>
<style lang="scss">
@import "~common/scss/variables.scss";
@import "~common/scss/mixins.scss";
 .center-img{
   background: center/cover no-repeat;
 }
</style>
