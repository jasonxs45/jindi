<template>
<div class="x-select">
  <XInput
    :placeholder="placeholder"
    :readonly="true"
    :class="showOptions?'half':''"
    :value="value"
    @click.native.stop="toggleSelect"
  />
  <Icon class="icon" name="caret-down"/>
  <div
    v-show="showOptions"
    class="options-wrapper"
  >
    <p
      v-for="(item, index) in options"
      :key="'item-'+index"
      class="option"
      :data-val="item"
      @click="selectHandler"
    >
    {{item}}
    </p>
  </div>
</div>
</template>
<script>
import Icon from 'components/icon'
import XInput from 'components/input'
export default {
  name: 'XSelect',
  components: {
    Icon,
    XInput
  },
  props: {
    options: {
      type: Array,
      required: true
    },
    placeholder: {
      type: String
    }
  },
  data () {
    return {
      showOptions: false,
      value: ''
    }
  },
  created () {
    let _self = this
    window.document.addEventListener('click', () => {
      _self.showOptions = false
    }, false)
  },
  methods: {
    toggleSelect () {
      this.showOptions = !this.showOptions
    },
    selectHandler (e) {
      this.value = e.currentTarget.dataset.val
      this.toggleSelect()
      this.$emit('on-change', this.value)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~common/scss/variables.scss";
@import "~common/scss/mixins.scss";
.x-select{
  display: inline-block;
  width:inherit;
  height: p2r(80);
  position: relative;
  .icon{
    position: absolute;
    top:50%;
    margin-top: p2r(-10);
    right:p2r(30);
    color:$primary-color;
    font-size: p2r(20);
    transform: rotate(90deg);
    transition: transform .2s;
    vertical-align: middle;
  }
  .x-input{
    &.half{
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
      border-bottom: none;
      & + .icon{
        transform: rotate(0deg)
      }
    }
  }
  .options-wrapper{
    position: absolute;
    z-index:99;
    top:100%;
    left:0;
    width:100%;
    min-height: p2r(300);
    max-height:p2r(500);
    padding-bottom:p2r(10);
    background: lighten($primary-color, 38%);
    border:1px solid lighten($primary-color, 18%);
    border-top:none;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    .option{
      font-size: p2r(24);
      padding:p2r(20) 0;
      margin:0 p2r(30);
      color:$thr-color;
      @include _1px(lighten($primary-color, 30%));
    }
  }
}
</style>
