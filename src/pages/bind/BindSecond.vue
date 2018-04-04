<template>
<div class="bind-second">
  <div class="top">
    <Icon name="second-user" />
    <p>【二手业主】房产绑定</p>
  </div>
  <div class="content">
    <p class="tip">* 请选择所在项目</p>
    <x-select v-model="form.project" placeholder="请选择所在项目">
      <x-option
        v-for="(item, index) in items"
        :key="'item-'+index+Math.random().toString(36).substr(2)"
        :label="item.label"
        :value="item.value"
      ></x-option>
    </x-select>
    <p class="tip">* 请输入所在楼栋</p>
    <XInput v-model="form.building" placeholder="请输入楼栋"/>
    <p class="tip">* 请输入所在单元</p>
    <XInput v-model="form.unit" placeholder="请输入单元"/>
    <p class="tip">* 请输入房号</p>
    <XInput v-model="form.houseid" placeholder="请输入房号"/>
    <p class="tip">* 请输入申请人的姓名</p>
    <XInput v-model="form.name" placeholder="请输入2-6位中文"/>
    <p class="tip">* 请输入身份证</p>
    <XInput  v-model="form.id" placeholder="请输入身份证"/>
    <p class="tip">* 请输入手机号码</p>
    <XInput v-model="form.tel" placeholder="请输入手机号码" htmlType="tel"/>
    <p class="tip">家属绑定房源，必须业主审核，<br/>请将此页面转发给业主，提醒业主审核您的家属身份。</p>
  </div>
</div>
</template>
<script>
import {
  Icon,
  XSelect,
  XOption,
  XInput,
  Btn
} from 'components'
import api from 'common/api'
export default {
  name: 'BindSecond',
  components: {
    Icon,
    XSelect,
    XOption,
    XInput,
    Btn
  },
  data () {
    return {
      form: {
        project: '',
        building: '',
        unit: '',
        houseid: '',
        name: '',
        id: '',
        tel: ''
      },
      item: null
    }
  },
  created () {
    this.getItem()
  },
  methods: {
    getItem () {
      let index = window.$loading()
      let opt = {
        Act: 'ProjectGetList'
      }
      api.query(opt).then(res => {
        window.$close(index)
        if (res.data.IsSuccess) {
          let [...items] = res.data.Data
          this.items = items.map(item => {
            return {
              label: item.Name,
              value: item.ID
            }
          })
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
.bind-second {
  .top{
    padding-top: p2r(20);
    width:100%;
    height: p2r(240);
    background: lighten($primary-color,5%);
    color:#fff;
    font-size: p2r(40);
    text-align: center;
    line-height: 1.5;
    text-shadow: 1px 1px 2px rgba(0,0,0,.4);
    .iconfont{
      font-size: p2r(80);
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
    .x-select,
    .x-input{
      display: block;
      width:100%;
      height: p2r(90);
      margin-top: p2r(15);
    }
    .btn{
      width:100%;
      margin-top: p2r(30);
    }
  }
}
</style>
