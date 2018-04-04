<template>
  <div class="bind-relative">
    <div class="top">
      <h3 class="title">【家属】会员注册审核</h3>
      <div class="sub-title">绑定居住房源，获得物业专属服务权益</div>
    </div>
    <div class="content">
      <p class="tip title">要以【】身份注册会员，以下是注册信息，请确认是否属实。如果审核通过，用户将以业主等同身份享受您所在物业的服务！</p>
      <p class="tip">* 请输入姓名</p>
      <XInput v-model="form.name" placeholder="请输入姓名"/>
      <p class="tip">* 请输入身份证</p>
      <XInput  v-model="form.id" placeholder="请输入身份证"/>
      <p class="tip">* 请输入手机号码</p>
      <XInput v-model="form.tel" placeholder="请输入手机号码" htmlType="tel"/>
      <Btn type="primary" size="lar" text="提交" @click="submitHandler"/>
      <Btn type="default" size="lar" text="返回" @click="$router.go(-1)"/>
    </div>
  </div>
</template>
<script>
import {
  Icon,
  XInput,
  Btn
} from 'components'
import {
  NAME_REG,
  TEL_REG,
  ID_REG
} from 'common/data'
export default {
  name: 'BindOwnerConfirm',
  components: {
    Icon,
    XInput,
    Btn
  },
  data () {
    return {
      form: {
        name: '',
        tel: '',
        id: ''
      }
    }
  },
  created () {
  },
  methods: {
    submitHandler () {
      if (!this.form.name) {
        window.$alert('姓名不能为空')
        return
      }
      if (!this.form.name.match(NAME_REG)) {
        window.$alert('请填写正确格式的姓名')
        return
      }
      if (!this.form.id) {
        window.$alert('身份证号码不能为空')
        return
      }
      if (!this.form.id.match(ID_REG)) {
        window.$alert('请填写正确格式的身份证号码')
        return
      }
      if (!this.form.tel) {
        window.$alert('手机号码不能为空')
        return
      }
      if (!this.form.tel.match(TEL_REG)) {
        window.$alert('请填写正确格式的手机号码')
        return
      }
      let _self = this
      let index = window.$alert({
        title: '申请已提交！',
        content: '请将本页面转发给已绑定的业主审核，<br/>待通过后才能完成家属注册流程！',
        yes () {
          window.$close(index)
          _self.toggleShare()
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~common/scss/variables.scss";
@import "~common/scss/mixins.scss";
.bind-relative{
  .top{
    padding-top: p2r(20);
    width:100%;
    height: p2r(200);
    background: lighten($primary-color,5%);
    color:#fff;
    text-align: center;
    line-height: 1.5;
    text-shadow: 1px 1px 2px rgba(0,0,0,.4);
    .title{
      padding-top: p2r(30);
      font-size: p2r(50);
    }
    .sub-title{
      font-size: p2r(24);
      font-weight: 200;
    }
  }
  .content{
    padding:p2r($base-padding) p2r(45);
    .tip{
      color:$primary-color;
      font-size: p2r(26);
      margin-top: p2r(30);
      font-weight: 200;
      line-height: 1.4;
      &:first-child{
        margin-top: 0;
      }
    }
    .x-input{
      display: block;
      height: p2r(90);
      margin-top: p2r(20);
    }
    .btn{
      width:100%;
      margin-top: p2r(40);
    }
  }
  .share{
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.7);
    top:0;
    left:0;
    z-index: 99999999;
  }
}
</style>
