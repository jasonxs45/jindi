<template>
<div class="x-select">
  <XInput
    :placeholder="placeholder"
    :readonly="true"
    :class="showOptions?'half':''"
    :value="value"
    @click.native.stop="toggleSelect"
    @on-focus="focus"
  />
  <Icon class="icon" name="caret-down"/>
  <transition name="show">
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
  </transition>
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
      this.$emit('change', this.value).$emit('input', this.value)
    },
    focus (e) {
      e.target.blur()
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
    color:lighten($primary-color, 12%);
    font-size: p2r(20);
    transform: rotate(-90deg);
    transition: transform .2s;
    vertical-align: middle;
  }
  .x-input{
    color:$text-color;
    transition: border-radius .1s;
    border-radius: p2r(50);
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
    height:p2r(500);
    padding-bottom:p2r(10);
    background: lighten($primary-color, 38%);
    border:1px solid lighten($primary-color, 18%);
    border-top:none;
    border-bottom-left-radius: p2r(50);
    border-bottom-right-radius: p2r(50);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    .option{
      font-size: p2r(24);
      padding:p2r(30) 0;
      margin:0 p2r(30);
      color:$thr-color;
      @include _1px(lighten($primary-color, 30%));
      &:last-child{
        background: none;
      }
    }
  }
  .show-enter-active, .show-leave-active {
    transition: all .2s;
  }
  .show-enter, .show-leave-to{
    height: 0;
    opacity: 0;
  }
}
</style>
