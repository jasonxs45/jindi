<template>
  <div class="bind-owner">
    <div class="bind-owner-wrapper">
      <div class="part1">
        <div  class="step1" v-if="step===1">
          <x-select
            v-model="selectedItem"
            placeholder="请选择您所在的项目"
            class="roundbar"
          >
            <x-option
              v-for="(item, index) in items"
              :key="'item-'+index+Math.random().toString(36).substr(2)"
              :label="item.label"
              :value="item.value"
            ></x-option>
          </x-select>
          <XInput
            v-model="ownerName"
            placeholder="请输入您的真实姓名"
            class="roundbar"
          />
          <XInput
            v-model="idnum"
            placeholder="请输入您的身份证号码后四位"
            class="roundbar"
          />
        </div>
        <div class="step2" v-if="step===2">
          <h3 class="title">筛选用户结果</h3>
          <div class="houses">
            <nodata v-if="houseInfo.length<=0">暂无数据，<br/>请确认信息是否正确！</nodata>
            <label
              v-for="(item, index) in houseInfo"
              :key="'house-info-'+index"
              class="house-bar"
            >
              <input
                v-model="houseid"
                class="radio"
                type="radio"
                name="house"
                :disabled="item.Binded"
                :value="item.ID"
                :data-index="index"
                @change="radioHandler"
              />
              <div class="flexbox">
                <div class="house-name">
                  <p class="text">{{item.StageName}} {{item.Building}} - {{item.Unit}}单元{{item.HouseNo}}{{item.Binded?'【已绑定】':''}}</p>
                </div>
                <div class="owner-name">
                  {{item.Owner}}——{{item.ValidateTel|coverTel}}
                </div>
              </div>
            </label>
          </div>
          <p class="title">选择房源，获取验证码</p>
          <div class="code">
            <input placeholder="请输入验证码" v-model="code" class="code-num" type="number" />
            <Btn class='get-code' type="primary" :disabled="disabled" :text="codeInfo" @click="getCode"/>
          </div>
          <!-- <div class="idnum-controller">
            <div class="cells">
              <span
                v-for="n in 4"
                :key="'input-'+n"
                class="idnum-cell"
              >{{checkStr.split('')[n-1]}}</span>
            </div>
            <input
              type="text"
              maxlength="4"
              class="input"
              v-model="checkStr"
            />
          </div> -->
        </div>
      </div>
      <p class="caution">业主信息须与购房合同上的业主名称、<br/>身份证号信息一致，方可绑定</p>
      <div class="part2">
        <Btn v-if="step===1" type="primary" size="lar" text="下一步" @click="goStep2"/>
        <Btn v-if="step===2" type="primary" size="lar" text="确认绑定" @click="submitHandler"/>
      </div>
    </div>
    <p class="see-rights" style="display:none">
      <span @click="toggleRights">查看业主权益</span>
    </p>
    <p class="tip">从一手房市场购买金地开发的房产且已完成<br />网签手续的客户，可进行业主绑定注册！</p>
    <transition name="fade">
      <div v-if="showRights" class="rights" @click="toggleRights">
        <div class="rights-wrapper">
          <h3 class="title">业主权益</h3>
          <div class="details">
            <dl>
              <dd>1.及时获取金地的最新资讯；</dd>
              <dd>2.了解金地热销楼盘信息；</dd>
              <dd>3.可通过金地微信推荐其他人购房而获取丰厚奖励；</dd>
              <dd>4.可在微信上快速报修（保修期内的楼盘业主报修，须通过金地微信上的“在线报修”才可报修）；</dd>
              <dd>5.可在金地微信上提交自己的投诉和建议，并可发送图片；</dd>
              <dd>6.可查询金地商业、写字楼、产业园区的出租信息；</dd>
              <dd>7.可参加金地举办的各种线上线下精彩活动；</dd>
              <dd>8.可在金地微信上发布二手房租售信息；</dd>
              <dd>9.可通过“社区市场”发布二手物品信息。</dd>
            </dl>
          </div>
        </div>
        <Btn text="我知道了" type="base" size="lar"/>
      </div>
    </transition>
  </div>
</template>
<script>
import api from 'common/api'
import {
  Flexbox,
  FlexboxItem,
  Btn,
  Icon,
  XSelect,
  XOption,
  XInput,
  Nodata
} from 'components'
import {
  NAME_REG,
  LAST_FOUR_REG
} from 'common/data'
export default {
  name: 'BindOwner',
  components: {
    Flexbox,
    FlexboxItem,
    Btn,
    Icon,
    XSelect,
    XOption,
    XInput,
    Nodata
  },
  data () {
    return {
      step: 1,
      idnum: '',
      items: null,
      selectedItem:'',
      ownerName:'',
      houses: null,
      disabled: false,
      count: 60,
      houseid: null,
      tel: '',
      code: '',
      showRights: false
    }
  },
  computed: {
    houseInfo () {
      return this.houses || []
    },
    codeInfo () {
      return this.disabled ? `${this.count}s后重新获取` : '获取验证码'
    }
  },
  filters: {
    coverTel (tel) {
      return tel.replace(tel.slice(3, 7), '****')
    }
  },
  created () {
    this.getItem()
  },
  methods: {
    getItem () {
      api.bind.getProjectList()
      .then(({res, index}) => {
        if (res.data.IsSuccess) {
          let [...items] = res.data.Data
          this.items = items.map(item => {
            return {
              label: item.Name,
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
    getHouses () {
      api.bind.getOwnerHouseList(this.selectedItem.value, this.ownerName, this.idnum)
      .then(({res, index}) => {
        if (res.data.IsSuccess) {
          let [...houses] = res.data.Data
          this.houses = houses
          if (this.houses.length <= 0) {
            window.$alert('暂无数据，<br/>请确认信息是否正确！')
          } else {
            this.step = 2
          }
        } else {
          window.$alert(res.data.Message)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    radioHandler (e) {
      let index = e.target.dataset.index
      this.tel = this.houseInfo[index].ValidateTel
    },
    goStep2 () {
      if (!this.selectedItem.value) {
        window.$alert('项目不能为空')
        return
      }
      if (!this.ownerName) {
        window.$alert('姓名不能为空')
        return
      }
      if (!this.ownerName.match(NAME_REG)) {
        window.$alert('请填写正确格式的姓名')
        return
      }
      if (!this.idnum.match(LAST_FOUR_REG)) {
        window.$alert('请正确填写身份证后四位')
        return
      }
      this.getHouses()
    },
    fansHandler () {
      api.globalQuery(
        {
          Act: 'HasSubscribe'
        }
      ).then(({res}) => {
        if (res.data.IsSuccess) {
          // 已关注
        } else {
          window.$alert({
            content: '您还未关注公众号，点击前往关注！',
            yes () {
              localStorage.href = 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI4MTcxNDE3NQ==&scene=124#wechat_redirect'
            }
          })
        }
      })
    },
    getCode () {
      if (!this.tel) {
        window.$alert('请先选择一个房源！')
        return
      }
      api.bind.getCode(this.tel)
      .then(({res, index}) => {
        window.$close(index)
        if (res.data.IsSuccess) {
          let index1 = window.$alert({
            content: '验证码已发送，请查收',
            yes: () => {
              window.$close(index1)
              this.disabled = true
              let timer = setInterval(() => {
                if (this.count === 1) {
                  clearInterval(timer)
                  this.count = 60
                  this.disabled = false
                }
                this.count -= 1
              }, 1000)
            }
          })
        } else {
          window.$alert(res.data.Message)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    submitHandler () {
      if (!this.houseid) {
        window.$alert('请选择房源')
        return
      }
      if (!this.code.trim()) {
        window.$alert('请填写验证码')
        return
      }
      api.bind.houseOwerBind(this.houseid, this.ownerName, this.tel, this.code)
      .then(({res, index}) => {
        window.$close(index)
        if (res.data.IsSuccess) {
          /**
          State 0=正常 1=跳转到url 2=提示msg
          Url
          Msg
           */
          this.registHandler(res.data.Data)
        } else {
          window.$alert(res.data.Message)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    registHandler ({State, Url, Msg}) {
      let title = ''
      let content = ''
      if (State === 0) {
        title = '恭喜您！'
        content = '绑定成功'
      } else if (State === 1) {
        title = '绑定成功！'
        content = Msg
      } else if (State === 2) {
        title = '绑定成功！'
        content = Msg
      }
      let index = window.$alert({
        title,
        content,
        yes: () => {
          window.$close(index)
          if (State === 1) {
            location.href = Url
          } else {
            this.$router.push({
              name: 'usercenter'
            })
          }
        }
      })
    },
    toggleRights () {
      this.showRights = !this.showRights
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~common/scss/variables.scss";
@import "~common/scss/mixins.scss";
.bind-owner {
  width: 100vw;
  min-height: 100vh;
  background: url("../../../static/images/bg.png") center/cover no-repeat;
  padding: p2r(30);
  .bind-owner-wrapper {
    width: 100%;
    // height: 88vh;
    // min-height: p2r(900);
    border-radius: 4px;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.2);
    padding-top: p2r(5);
    padding-bottom: p2r(30);
    background: #fff;
    .caution{
      font-size: p2r(24);
      color:lighten($text-color, 22%);
      text-align: center;
      line-height: 1.5;
      padding:0 p2r($base-padding);
    }
    .part1 {
      // min-height: p2r(600);
      .title {
        font-size: p2r(28);
        color: $primary-color;
        text-align: center;
      }
      .houses {
        width: p2r(594);
        min-height: p2r(350);
        margin: p2r(30) auto;
        // overflow: auto;
        // -webkit-overflow-scrolling: touch;
        .house-bar {
          display: block;
          margin-top: p2r(20);
          &:first-child {
            margin-top: 0;
          }
          .radio {
            display: block;
            width: 0;
            height: 0;
            &:checked + .flexbox {
              color: #fff;
              background: $primary-color;
            }
          }
          .flexbox {
            border-radius: 4px;
            padding: p2r(10) p2r(20);
            color: #eda697;
            background: lighten($primary-color, 38%);
            transition: color, background 0.2s;
            text-align: center;
            .house-name{
              .text{
                line-height: 1.5;
              }
            }
            .owner-name {
              font-size: p2r(24);
              margin-top: p2r(10);
            }
          }
        }
      }
      .idnum-controller {
        width: p2r(490);
        margin: p2r(20) auto;
        text-align: center;
        font-size: 0;
        position: relative;
        .cells {
          .idnum-cell {
            position: relative;
            display: inline-block;
            vertical-align: top;
            width: p2r(100);
            height: p2r(100);
            background: lighten($primary-color, 38%);
            margin: 0 p2r(15);
            border-radius: 4px;
            border: 1px solid lighten($primary-color, 20%);
            font-size: p2r(28);
            line-height: p2r(100);
            text-align: center;
            color: $text-color;
            &:first-child {
              margin-left: 0;
            }
            &:last-child {
              margin-right: 0;
            }
          }
        }
        .input {
          position: absolute;
          display: block;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          opacity: 0;
          font-size: p2r(28);
          -webkit-appearance: none;
          outline: none;
          z-index: 1;
        }
      }
      .step1{
        padding-top: p2r(30);
        min-height: p2r(500);
        .roundbar{
          display: block;
          width:p2r(600);
          height: p2r(100);
          margin: p2r(40) auto;
          position: relative;
          &:first-child{
            margin-top: 0;
          }
        }
      }
      .step2{
        padding-top: p2r(30);
        padding-bottom: p2r(30);
      }
    }
    .part2 {
      padding-top: p2r(30);
    }
  }
  .tip{
    font-size: p2r(24);
    color:lighten($text-color, 22%);
    text-align: center;
    line-height: 1.5;
    padding: p2r($base-padding);
  }
  .see-rights{
    text-align: center;
    margin-top: p2r(60);
    span{
      font-size: p2r(26);
      color:lighten($primary-color, 10%);
      text-shadow: 1px 1px 2px lighten($primary-color, 15%);
    }
  }
  .rights{
    position: fixed;
    width: 100%;
    height: 100%;
    top:0;
    left:0;
    z-index:99;
    background: rgba(0,0,0,.7);
    padding: p2r(30);
    .rights-wrapper{
      background: #fff;
      width:100%;
      height: calc(100% - 4rem);
      border-radius: 4px;
      padding: p2r(30);
      .title{
        text-align: center;
        color:$primary-color;
        font-size: p2r(32);
        height: p2r(100);
        line-height: p2r(100);
      }
      .details{
        line-height: 2.2;
        font-size: p2r(28);
        color:$text-color;
        height: calc(100% - 3rem);
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
      }
    }
    .btn{
      margin-top: p2r(50);
    }
  }
}
.code{
  display: flex;
  width: p2r(594);
  margin: p2r(15) auto;
  background: lighten($primary-color, 38%);
  border-radius: 25px;
  justify-content: space-between;
  .code-num{
    background: none;
    display: block;
    flex: 1;
    padding: 0 p2r(30);
    outline: none;
    font-size: p2r(24);
  }
  .get-code{
    width: p2r(200);
    font-size: p2r(24) !important;
  }
}
</style>
