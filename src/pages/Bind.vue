<template>
  <div class="bind">
    <div class="logo">
      <img src="/static/images/logo.png" alt="" />
    </div>
    <flexbox class="entries" wrap="wrap" justify="justify">
      <flexbox-item class="entry middle">
        <router-link to="/bind/bindowner" tag="div" class="entry-wrapper">
          <Icon class="icon" name="user"/>
          <span class="text">我是业主</span>
        </router-link>
      </flexbox-item>
      <flexbox-item class="entry middle">
         <router-link to="/bind/bindrelative" tag="div" class="entry-wrapper">
            <Icon class="icon" name="group"/>
            <span class="text">我是家属</span>
          </router-link>
      </flexbox-item>
      <flexbox-item class="entry middle">
        <router-link to="/bind/bindrenter" tag="div" class="entry-wrapper">
          <Icon class="icon" name="rent"/>
          <span class="text">我是租户</span>
        </router-link>
      </flexbox-item>
      <flexbox-item class="entry middle">
        <router-link to="/bind/bindsecond" tag="div" class="entry-wrapper">
          <Icon class="icon" name="second-user"/>
          <span class="text">我是二手业主</span>
        </router-link>
      </flexbox-item>
    </flexbox>
    <p class="tip">
      请先选择您的身份进行绑定，绑定完成后方可<b>报修</b>、<b>查询进度</b>及参与<b>业主活动</b>
    </p>
  </div>
</template>
<script>
import {
  Flexbox,
  FlexboxItem,
  Icon
} from 'components'
export default {
  name: 'Bind',
  components: {
    Flexbox,
    FlexboxItem,
    Icon
  },
  created () {
    window.document.title = '业主绑定'
  }
}
</script>
<style lang="scss" scoped>
@import "~common/scss/variables.scss";
@import "~common/scss/mixins.scss";
.bind{
  width:100vw;
  height: 100vh;
  padding-top: p2r(30);
  background:$primary-color url('/static/images/bindtop.jpg') center top/100% auto no-repeat;
  .logo{
    width:p2r(208);
    height: p2r(56);
    margin-left: p2r(30);
  }
  .entries{
    margin-top: p2r(394);
    padding:p2r($base-padding);
    .entry{
      background: #fff;
      box-shadow: 0 0 2px 0 $primary-color;
      height:p2r(200);
      border-radius: 4px;
      margin-top: p2r(30);
      display: table;
      .entry-wrapper{
        display: table-cell;
        text-align: center;
        vertical-align: middle;
        font-size: 0;
        .icon{
          font-size: p2r(56);
          height:p2r(56);
          color:$primary-color;
          display: inline-block;
          vertical-align: top;
        }
        .text{
          color:$primary-color;
          font-size: p2r(36);
          height:p2r(56);
          display: inline-block;
          vertical-align: top;
        }
      }
      &.large{
        flex:0 0 100%;
        line-height: p2r(200);
        .icon{
          margin-right: p2r(10);
        }
      }
      &.middle{
        flex:0 0 p2r(330);
        .icon{
          margin-top: p2r(30);
        }
        .text{
          display: block;
          margin-top: p2r(10);
        }
      }
    }
  }
  .tip{
    margin-top: p2r(90);
    color:#fff;
    font-weight: 200;
    padding:0 p2r(140);
    line-height: 1.4;
    text-align: center;
  }
}
</style>
