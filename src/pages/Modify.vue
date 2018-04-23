<template>
  <div class="modify">
    <XInput
      placeholder="请输入新的姓名"
      class="input block"
    />
    <XInput
      htmlType="tel"
      placeholder="请输入新的手机号码"
      class="input block"
    />
    <!-- <div @click="toggleAreaPicker">地址</div> -->
    <area-picker @selected="getArea"></area-picker>
  </div>
</template>
<script>
import {
  XInput,
  AreaPicker
} from 'components'
export default {
  name: 'Modify',
  components: {
    XInput,
    AreaPicker
  },
  data () {
    return {
      area: ''
    }
  },
  created () {},
  methods: {
    getArea (val) {
      this.area = val
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~common/scss/variables.scss";
@import "~common/scss/mixins.scss";
.modify{
  padding: p2r($base-padding);
  .input{
    height: p2r(90);
    line-height: p2r(90);
    &.block{
      display: block;
    }
  }
}
</style>
