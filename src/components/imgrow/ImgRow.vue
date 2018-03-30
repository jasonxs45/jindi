<template>
<container>
  <row
    :group="group"
    class="img-row"
  >
    <slot></slot>
    <div
      v-if="canUpload&&group.length<4"
      class="upload-btn img-cell"
      @click="clickHandler"
    >
      <Icon name="camera"/>
    </div>
  </row>
</container>
</template>
<script>
import Container from 'components/container'
import Row from 'components/row'
import Icon from 'components/icon'
export default {
  name: 'ImgRow',
  components: {
    Container,
    Row,
    Icon
  },
  props: {
    group: {
      type: Array
    },
    canUpload: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    clickHandler (e) {
      this.$emit('on-upload', e)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~common/scss/variables.scss";
.img-row{
  margin: {
    left: p2r(-50) !important;
    right: p2r(-50) !important;
  }
  .img-cell{
    width:p2r(120);
    height: p2r(120);
    border-radius: 4px;
    margin:p2r(20) p2r(20) 0;
    position: relative;
    display: inline-block;
    vertical-align: top;
    border:1px dashed lighten($primary-color, 15%);
    line-height: p2r(120);
    text-align: center;
    color:lighten($primary-color, 15%);
    .iconfont{
      font-size: p2r(34);
    }
    &:nth-child(4n){
      margin-right: 0;
    }
  }
}
</style>
