<template>
<div class="advise-submit">
  <div class="top">
    <img src="/static/images/rstop.jpg" alt="" />
  </div>
  <div class="logo">
    <Icon name="info"/>
  </div>
  <div class="panel-group">
    <div class="panel">
      <h3 class="title">选择类别及小区</h3>
      <x-select
        v-model="form.house"
        :options="houses"
        placeholder="请选择类别"
      ></x-select>
      <x-select
        v-model="form.house"
        :options="houses"
        placeholder="请选择小区"
      ></x-select>
    </div>
    <div class="panel">
      <h3 class="title">填写详情</h3>
      <XTextarea
        v-model="form.desc"
        placeholder="请输入您要填写的具体内容"
        class="desc"
      />
      <p class="tips">* 上传照片（最多四张）</p>
      <img-row
        :group="uploadedImgs"
        :canUpload="true"
        @on-upload="uploadImg"
      >
        <img-cell
          v-for="(item, index) in uploadedImgs"
          :index="index"
          :canUpload="true"
          :del="true"
          :group="uploadedImgs"
          :key="'upimg-'+index"
        >
          <Fitimg :src="item"/>
        </img-cell>
      </img-row>
    </div>
  </div>
  <Btn
    text="提交"
    size="lar"
    class="submit"
    @click="submitHandler"
  />
  <div class="bottom">
    <img src="/static/images/rsbot.jpg" alt="" srcset="">
  </div>
</div>
</template>
<script>
import {
  Icon,
  XInput,
  XSelect,
  Flexbox,
  FlexboxItem,
  Split,
  XTextarea,
  Fitimg,
  Btn,
  ImgRow,
  ImgCell
} from 'components'
import {
  suc,
  fail
} from 'common/data'
export default {
  name: 'AdviseSubmit',
  components: {
    Icon,
    XInput,
    XSelect,
    Flexbox,
    FlexboxItem,
    Split,
    XTextarea,
    Fitimg,
    Btn,
    ImgRow,
    ImgCell
  },
  data () {
    return {
      houses: [],
      uploadedImgs: [
        '/static/images/banner2.png',
        '/static/images/active1.png',
        '/static/images/banner2.png'
      ],
      form: {
        house: '',
        desc: ''
      }
    }
  },
  computed: {
  },
  methods: {
    uploadImg (e) {
      console.log('upload')
    },
    submitHandler () {
      // 提交
      window.$alert({
        className: 'rs-alertbox',
        content: fail || suc
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~common/scss/variables.scss";
@import "~common/scss/mixins.scss";
.advise-submit{
  padding:p2r(80) p2r($base-padding) p2r($base-padding);
  background: linear-gradient($primary-color, #f26262);
  .top{
    position: absolute;
    width:100%;
    z-index: 0;
    left:0;
    top:0;
  }
  .logo{
    width:p2r(200);
    height: p2r(200);
    margin:0 auto;
    border-radius: 50%;
    line-height: p2r(200);
    text-align: center;
    position: relative;
    border:1px solid transparent;
    background: linear-gradient(#fff, $primary-color);
    box-shadow: 0 1px 1px 0 rgba(0,0,0,.2);
    background-clip: padding-box;
    overflow: hidden;
    padding:1px;
    .iconfont{
      display:block;
      width:100%;
      height: 100%;
      font-size: p2r(120);
      color:#fff;
      background: $primary-color;
      border-radius: inherit;
    }
  }
  .panel{
    width:100%;
    height:auto;
    padding:p2r(40) p2r(45) p2r(60);
    background: #fff;
    border-radius: 4px;
    margin:p2r(40) 0;
    position: relative;
    &:before,
    &:after{
      content: '';
      display: block;
      width: p2r(20);
      height: p2r(120);
      background: url('/static/images/chain.png') center/100% 100% no-repeat;
      position: absolute;
      z-index: 2;
      bottom: p2r(-80);
      left: p2r(80);
    }
    &:after{
      left: auto;
      right: p2r(80);
    }
    &:last-child{
      &:before,
      &:after{
        display: none;
      }
    }
    .title{
      font-size: p2r(26);
      text-align: center;
      margin: p2r(20) auto;
      color: $primary-color;
    }
    .x-select{
      height: p2r(100);
      margin-top: p2r(20);
    }
    .desc{
      margin-top: p2r(30);
      font-size: p2r(26);
    }
    .tips{
      color:lighten($primary-color, 10%);
      font-size: p2r(24);
      margin-top: p2r(40);
    }
  }
  .submit{
    margin-top: p2r(100);
    font-size: p2r(36) !important;
  }
  .bottom{
    text-align: center;
    margin:p2r(60) p2r(-$base-padding) p2r(-$base-padding);
  }
}
</style>
