<template>
  <div class="magazine-inner">
    <div class="bg">
      <Fitimg
        :src="bg"
      />
      <div class="cover"></div>
    </div>
    <div class="panel">
      <Split type="line" />
      <h3 class="title"><span class="num">{{month}}</span>月刊</h3>
      <div class="links">
        <div
          v-for="(item, index) in links"
          :key="'link-'+index"
          class="link-item"
        >
          <span
            v-if="!item.Url"
            :data-id="item.ID"
            class="txt"
            @click="goDetail"
          >{{item.Title}}</span>
          <a v-else class="txt" :href="item.Url">{{item.Title}}</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  Split,
  Fitimg
} from 'components'
import api from 'common/api'
import {
  formatDate
} from 'common/utils/date'
export default {
  name: 'MagazineInner',
  components: {
    Split,
    Fitimg
  },
  data () {
    return {
      id: null,
      fetchedData: {}
    }
  },
  computed: {
    month () {
      if (this.fetchedData.Periodical) {
        return formatDate(new Date(this.fetchedData.Periodical.AddTime), 'MM')
      }
    },
    bg () {
      let bg = ''
      if (this.fetchedData.Periodical) {
        bg = 'http://jindi.1juke.cn' + this.fetchedData.Periodical.CoverImg
      }
      return bg
    },
    links () {
      if (this.fetchedData.ArticleList) {
        return this.fetchedData.ArticleList
      }
    }
  },
  watch: {
    '$route' (to, from) {
      this.id = to.params.id
      this.getMagazineInner()
    }
  },
  created () {
    this.id = this.$route.params.id
    this.getMagazineInner()
  },
  methods: {
    getMagazineInner () {
      api.magazine.inner(this.id)
      .then(({res, index}) => {
        if (res.data.IsSuccess) {
          let fetchedData = res.data.Data
          this.fetchedData = fetchedData
        } else {
          window.$alert(res.data.Message)
        }
      })
      .catch(err => {
        console.log(err)
      })
    },
    goDetail (e) {
      let id = e.currentTarget.dataset.id
      this.$router.push({
        name: 'magazinedetail',
        params: {
          id
        }
      })
    }
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
    position: relative;
    .fit-img{
      width:100%;
      height: 100%;
      filter: blur(10px);
    }
    .cover{
      position: absolute;
      top:0;
      left:0;
      width:100%;
      height:100%;
      background: rgba(0,0,0,.4);
      backdrop-filter: blur(10px);
    }
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
        .txt{
          color:$text-color;
          font-weight: 600;
        }
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
