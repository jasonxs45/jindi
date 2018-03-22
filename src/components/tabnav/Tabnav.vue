<template>
  <div :class="classes">
    <TabnavItem
      v-for="(item, index) in navs"
      :key="'nav-'+index+ Math.random()*9999 "
      :item="item"
      :class="activeIndex === index ? 'active': ''"
      @on-click="updateActiveIndex(index)"
    />
  </div>
</template>
<script>
import TabnavItem from './TabnavItem'
let classMap = {
  justify: 'tabnav-justify',
  normal: ''
}
export default {
  name: 'Tabnav',
  components: {
    TabnavItem
  },
  props: {
    navs: {
      type: Array,
      default () {
        return [
          {
            text: '导航一',
            link: ''
          },
          {
            text: '导航二',
            link: ''
          }
        ]
      }
    },
    justify: {
      type: String,
      default: 'normal'
    }
  },
  data () {
    return {
      activeIndex: 0
    }
  },
  computed: {
    classes () {
      return ['tabnav', classMap[this.justify]]
    }
  },
  methods: {
    updateActiveIndex (val) {
      if (this.activeIndex === val) {
        return
      }
      this.activeIndex = val
      this.$emit('tab-switch', this.activeIndex)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~common/scss/variables.scss";
@import "~common/scss/mixins.scss";
.#{tabnav}{
  height:p2r(80);
  &-justify{
    width:100%;
    .tabnav-item{
      width:1%;
    }
  }
}
</style>
