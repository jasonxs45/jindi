<template>
  <div class="bind-relative">
    <div class="top">
      <h3 class="title">【{{typeid === 2 ? '家属' : typeid === 1 ? '租户' : ''}}】会员注册审核</h3>
      <div class="sub-title">绑定居住房源，获得物业专属服务权益</div>
    </div>
    <div class="content">
      <p class="tip title">xx要以【{{typeid === 2 ? '家属' : typeid === 1 ? '租户' : ''}}】身份注册会员，以下是注册信息，请确认是否属实。如果审核通过，用户将以业主等同身份享受您所在物业的服务！</p>
      <p class="tip">* 请选择房源</p>
      <x-select
        v-model="selectedItem"
        placeholder="请选择房源"
        class="roundbar"
      >
        <x-option
          v-for="(item, index) in houseList"
          :key="'myhouse-'+index+Math.random().toString(36).substr(2)"
          :label="item.label"
          :value="item.value"
        ></x-option>
      </x-select>
      <p class="tip">* 请输入姓名</p>
      <XInput v-model="form.name" readonly placeholder="请输入姓名"/>
      <p class="tip">* 请输入身份证</p>
      <XInput  v-model="form.id" readonly placeholder="请输入身份证"/>
      <p class="tip">* 请输入手机号码</p>
      <XInput v-model="form.tel" readonly placeholder="请输入手机号码" htmlType="tel"/>
      <Btn type="primary" size="lar" text="提交" @click="submitHandler"/>
      <Btn type="default" size="lar" text="返回" @click="$router.go(-1)"/>
    </div>
  </div>
</template>
<script>
import {
  Icon,
  XInput,
  XSelect,
  XOption,
  Btn
} from 'components'
import api from 'common/api'
export default {
  name: 'BindOwnerConfirm',
  components: {
    Icon,
    XInput,
    Btn,
    XSelect,
    XOption
  },
  data () {
    return {
      houseList: [],
      selectedItem: '',
      form: {
        name: '',
        tel: '',
        id: ''
      },
      member: null,
      typeid: null,
      memberid: null
    }
  },
  created () {
    this.typeid = parseInt(this.$route.params.typeid)
    this.memberid = parseInt(this.$route.params.memberid)
    this.getMyhouse()
    this.getApplier()
  },
  watch: {
    '$route' (to, from) {
      this.typeid = parseInt(to.params.typeid)
      this.memberid = parseInt(to.params.memberid)
      this.getMyhouse()
      this.getApplier()
    }
  },
  methods: {
    getMyhouse () {
      let index = window.$loading()
      let opt = {
        Act: 'HouseGetMyList'
      }
      api.query(opt).then(res => {
        window.$close(index)
        if (res.data.IsSuccess) {
          let houseList = res.data.Data
          this.houseList = houseList.map(item => {
            return {
              label: item.ProjectName + '--' + item.Building + '栋' + item.Unit + '单元' + item.HouseNo,
              value: item.ID
            }
          })
        } else {
          window.$alert(res.data.Message)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getApplier () {
      let index = window.$loading()
      let opt = {
        Act: 'MemberGetInfo',
        Data: JSON.stringify({
          ID: this.memberid
        })
      }
      api.query(opt).then(res => {
        window.$close(index)
        if (res.data.IsSuccess) {
          this.member = res.data.Data
          if (this.member) {
            this.form = {
              name: this.member.Name,
              tel: this.member.Tel,
              id: this.member.CertNumber
            }
          }
        } else {
          window.$alert(res.data.Message)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getPass () {
      let index = window.$loading()
      let opt = {
        Act: 'HouseRelationBind',
        Data: JSON.stringify({
          HouseID: this.selectedItem.value,
          MemberID: this.memberid,
          Type: this.typeid
        })
      }
      api.query(opt).then(res => {
        window.$close(index)
        if (res.data.IsSuccess) {
          window.$alert('已审核通过！')
        } else {
          window.$alert(res.data.Message)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    submitHandler () {
      if (!this.selectedItem.value) {
        window.$alert('请选择房源')
        return
      }
      this.getPass()
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
    .x-input,
    .x-select{
      display: block;
      width:100%;
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
