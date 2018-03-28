<template>
  <div class="bind-owner">
    <div class="bind-owner-wrapper">
      <div class="part1">
        <div  class="step1" v-if="step===1">
          <XSelect
            placeholder="请选择您所在的项目"
            :options="items"
            class="roundbar"
            @on-change="changeHandler"
          />
          <XInput
            placeholder="请输入您的真实姓名"
            class="roundbar"
            @on-input="inputHandler"
          />
        </div>
        <div class="step2" v-if="step===2">
          <h3 class="title">筛选用户结果</h3>
          <div class="houses">
            <label
              v-for="(item, index) in houseInfo"
              :key="'house-info-'+index"
              class="house-bar"
            >
              <input
                class="radio"
                type="radio"
                name="house"
                @change="radioHandler"
                ref="radio"
              />
              <flexbox>
                <flexbox-item class="house-name">
                  {{item.houseName}}
                </flexbox-item>
                <flexbox-item class="owner-name">
                  {{item.ownerName}}
                </flexbox-item>
              </flexbox>
            </label>
          </div>
          <p class="title">输入身份证后四位进行验证</p>
          <div class="idnum-controller">
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
              @input="inputHandler"
              @change="changeHandler"
            />
          </div>
        </div>
      </div>
      <div class="part2">
        <Btn v-if="step===1" type="primary" size="lar" text="下一步" @click="goStep2"/>
        <Btn v-if="step===2" type="primary" size="lar" text="确认绑定"/>
      </div>
    </div>
  </div>
</template>
<script>
import {
  Flexbox,
  FlexboxItem,
  Btn,
  Icon,
  XSelect,
  XInput
} from 'components'
import {
  houseArray,
  NAME_REG
} from 'common/data'
let houses = [
  {
    houseName: '金地天悦二期E栋三单元505',
    ownerName: '王晓玲'
  },
  {
    houseName: '金地天悦二期E栋三单元505',
    ownerName: '王晓玲'
  },
  {
    houseName: '金地天悦二期E栋三单元505',
    ownerName: '王晓玲'
  },
  {
    houseName: '金地天悦二期E栋三单元505',
    ownerName: '王晓玲'
  },
  {
    houseName: '金地天悦二期E栋三单元505',
    ownerName: '王晓玲'
  }
]
export default {
  name: 'BindOwner',
  components: {
    Flexbox,
    FlexboxItem,
    Btn,
    Icon,
    XSelect,
    XInput
  },
  data () {
    return {
      step: 1,
      checkNums: ['', '', '', ''],
      checkStr: '',
      items: houseArray,
      selectedItem:'',
      ownerName:'',
      houses
    }
  },
  computed: {
    houseInfo () {
      return this.houses
    }
  },
  methods: {
    inputHandler (val) {
      this.ownerName = val
    },
    changeHandler (val) {
      this.selectedItem = val
    },
    radioHandler (e) {
      console.log(this.$refs.radio)
    },
    goStep2 () {
      if (!this.selectedItem) {
        window.$alert({
          content: '项目不能为空'
        })
        return
      }
      if (!this.ownerName) {
        window.$alert({
          content: '姓名不能为空'
        })
        return
      }
      if (!this.ownerName.match(NAME_REG)) {
        window.$alert({
          content: '请填写正确格式的姓名'
        })
        return
      }
      this.step = 2
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~common/scss/variables.scss";
@import "~common/scss/mixins.scss";
.bind-owner {
  width: 100vw;
  height: 100vh;
  background: url("/static/images/bg.png") center/cover no-repeat;
  padding: p2r(30);
  .bind-owner-wrapper {
    width: 100%;
    height: 90%;
    border-radius: 4px;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.2);
    padding-top: p2r(40);
    padding-bottom: p2r(40);
    background: #fff;
    .part1 {
      height: p2r(800);
      .title {
        font-size: p2r(28);
        color: $primary-color;
        text-align: center;
      }
      .houses {
        width: p2r(594);
        height: p2r(412);
        margin: p2r(40) auto;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
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
            height: p2r(88);
            line-height: p2r(88);
            border-radius: 4px;
            padding: 0 p2r(40);
            color: #eda697;
            background: lighten($primary-color, 38%);
            transition: color, background 0.2s;
            .owner-name {
              flex: 0 0 p2r(110);
              font-size: p2r(24);
              text-align: right;
            }
          }
        }
      }
      .idnum-controller {
        width: p2r(490);
        margin: p2r(40) auto;
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
        padding-top: p2r(50);
        .roundbar{
          display: block;
          width:p2r(600);
          height: p2r(100);
          margin: p2r(40) auto;
          position: relative;
        }
      }

    }
    .part2 {
      padding-top: p2r(40);
    }
  }
}
</style>
