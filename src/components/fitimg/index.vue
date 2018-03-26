<template>
  <img
    :src="src"
    class="fit-img"
    @click="clickHandler"
  />
</template>
<script>
export default {
  name: 'FitImg',
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
 .fit-img{
   width:inherit;
   height: inherit;
   object-fit: cover;
   border-radius: inherit;
   background: inherit;
 }
</style>
