<template>
<container>
  <row
    :group="group"
    class="img-row"
  >
    <slot></slot>
      <img-cell>
          <div
            v-if="canUpload&&group.length<4"
            class="upload-btn"
            @click="clickHandler"
          >
            <Icon name="camera"/>
          </div>
      </img-cell>
  </row>
</container>
</template>
<script>
import Container from 'components/container'
import Row from 'components/row'
import Icon from 'components/icon'
import ImgCell from './ImgCell'
import wxConf from 'common/utils/wxConf'
export default {
  name: 'ImgRow',
  components: {
    Container,
    Row,
    Icon,
    ImgCell
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
      wxConf.wxUpload(4, (res) => {
        this.$emit('on-upload', res)
      })
      .catch(error => {
        alert(error)
      })
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
  font-size: 0;
  .upload-btn{
    width: p2r(120);
    height: p2r(120);
    border:1px dashed $primary-color;
    border-radius: 4px;
    position: relative;
    display: inline-block;
    vertical-align: top;
    line-height: p2r(120);
    text-align: center;
    color:lighten($primary-color, 15%);
    .iconfont{
      font-size: p2r(34);
    }
  }
}
</style>
