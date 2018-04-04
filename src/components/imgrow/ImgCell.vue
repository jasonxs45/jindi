<template>
  <div class="img-cell">
    <slot></slot>
    <div
      v-if="del"
      class="delete"
      :index="index"
      :group="group"
      @click="deleteImg"
    >
      <Icon
        name="close-fill"
      />
    </div>
  </div>
</template>
<script>
import Icon from 'components/icon'
export default {
  name: 'ImgCell',
  components: {
    Icon
  },
  props: {
    index: {
      type: Number
    },
    group: {
      type: Array
    },
    del: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    deleteImg (e) {
      this.group.splice(this.index, 1)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~common/scss/variables.scss";
@import "~common/scss/mixins.scss";
.img-cell{
  width:25%;
  border-radius: 4px;
  margin:p2r(20) 0 0;
  position: relative;
  display: inline-block;
  vertical-align: top;
  text-align: center;
  .fit-img{
    width: p2r(120);
    height: p2r(120);
  }
  .delete{
    position: absolute;
    width:p2r(40);
    height: p2r(40);
    line-height: p2r(40);
    text-align: center;
    color:$primary-color;
    top:p2r(-15);
    right:p2r(5);
    z-index:1;
  }
}
</style>
