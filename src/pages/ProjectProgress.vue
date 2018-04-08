<template>
  <div class="project-progress">
    <flexbox
      v-for="(item, index) in list"
      :key="'project-'+index"
      class="item"
    >
      <flexbox-item class="img">
        <Fitimg :src="item.Img"/>
      </flexbox-item>
      <flexbox-item class="text">
        <h3 class="name">{{item.Name}}</h3>
        <p class="updatetime">更新时间：{{item.Ext}}</p>
      </flexbox-item>
    </flexbox>
  </div>
</template>
<script>
import {
  Flexbox,
  FlexboxItem,
  Fitimg
} from 'components'
import api from 'common/api'
export default {
  name: 'ProjectProgress',
  components: {
    Flexbox,
    FlexboxItem,
    Fitimg
  },
  data () {
    return {
      fetchedList: null
    }
  },
  computed: {
    list () {
      return this.fetchedList
    }
  },
  created () {
    this.getProjectList()
  },
  methods: {
    getProjectList () {
      let index = window.$loading()
      let opt = {
        Act: 'GetProjectList'
      }
      api.mock(opt).then(res => {
        window.$close(index)
        if (res.data.IsSuccess) {
          this.fetchedList = res.data.Data
        } else {
          window.$alert(res.Message)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~common/scss/variables.scss";
@import "~common/scss/mixins.scss";
.project-progress{
  padding: p2r($base-padding);
  .item{
    margin:p2r(30) 0;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.2);
    padding: p2r(20);
    border-radius: 4px;
    &:first-child{
      margin-top: 0;
    }
    .img{
      flex: 0 0 p2r(180);
      width:p2r(180);
      .fit-img{
        width:p2r(160);
        height: p2r(160);
        border-radius: 4px;
        border:1px solid #ddd;
      }
    }
    .text{
      position: relative;
      .name{
        font-size: p2r(30);
        line-height: 1.7;
        font-weight: 600;
      }
      .updatetime{
        font-size: p2r(24);
        color:$text-sub-color;
        font-weight: 200;
        line-height: 1.7;
        position: absolute;
        left:0;
        bottom:0;
      }
    }
  }
}
</style>
