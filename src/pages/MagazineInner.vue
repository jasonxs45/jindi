<template>
  <div class="magazine-inner">
    <img
      :src="bg"
      class="bg"
    />
    <div class="panel">
      <Split type="line" />
      <h3 class="title"><span class="num">{{month}}</span>月刊</h3>
      <div class="links">
        <a
          v-for="(item, index) in links"
          :key="'link-'+index"
          :href="item.link"
          class="link-item"
        >
          {{item.text}}
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import {
  Split
} from 'components'
export default {
  name: 'MagazineInner',
  components: {
    Split
  },
  data () {
    return {
      id: null,
      month: '03',
      bg: 'static/images/coverbg.png',
      links: [
        {
          text: '走进社区  走进环保',
          link: ''
        },
        {
          text: '走进社区  走进环保走进社区  走进环保走进社区  走进环保走进社区  走进环保',
          link: ''
        },
        {
          text: '走进社区  走进环保',
          link: ''
        },
        {
          text: '走进社区  走进环保',
          link: ''
        },
        {
          text: '走进社区  走进环保',
          link: ''
        },
                {
          text: '走进社区  走进环保',
          link: ''
        },
        {
          text: '走进社区  走进环保',
          link: ''
        },
                {
          text: '走进社区  走进环保',
          link: ''
        },
        {
          text: '走进社区  走进环保',
          link: ''
        }
      ]
    }
  },
  watch: {
    '$route' (to, from) {
      this.id = to.params.id
    }
  },
  created () {
    this.id = this.$route.params.id
  }
}
</script>
<style lang="scss" scoped>
@import "~common/scss/variables.scss";
@import "~common/scss/mixins.scss";
.magazine-inner{
  width: 100vw;
  height: 100vh;
  .bg{
    width:100%;
    height: 100%;
  }
  .panel{
    position: absolute;
    top:8%;
    left:5%;
    width:90%;
    height: 82%;
    background: rgba(255,255,255,.9);
    padding:p2r($base-padding*2) p2r($base-padding);
    .title{
      font-size: p2r(40);
      color:$primary-color;
      line-height: 1.5;
      .num{
        font-size: p2r(96);
      }
    }
    .links{
      width:100%;
      height: calc(100% - 2.5rem);
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      .link-item{
        display: block;
        padding-left: p2r(55);
        position: relative;
        font-size: p2r(26);
        line-height: 1.5;
        color:$text-color;
        margin: p2r(50) p2r(40);
        font-weight: 600;
        &:before{
          content:'';
          display: block;
          background:url('../../static/images/i1.png') center/cover no-repeat;
          width:p2r(38);
          height:p2r(38);
          position: absolute;
          left:0;
        }
      }
    }
  }
}
</style>
