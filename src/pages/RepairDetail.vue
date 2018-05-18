<template>
  <div class="repair-detail">
    <div class="repair-detail-wrapper" :class="role === 'user' ? 'user' : ''">
      <div class="detail">
        <flexbox>
          <flexbox-item class="house-name">
            {{repair.ProjectName+repair.StageName}} {{repair.Building}} - {{repair.Unit}}-{{repair.HouseNo}}
          </flexbox-item>
          <flexbox-item class="date">
            {{repair.AddTime|formatdate}}
          </flexbox-item>
        </flexbox>
        <div class="info">{{repair.Part}}</div>
        <div class="desc">{{repair.Content}}</div>
        <img-row
          v-if="imgs.length > 0"
          :group="imgs"
          :canUpload="false"
          class="imgs"
        >
          <img-cell
            v-for="(item, index) in imgs"
            :index="index"
            :canUpload="false"
            :group="imgs"
            :key="'upimg-'+index"
          >
            <Fitimg :src="item"/>
          </img-cell>
        </img-row>
        <Split type="line" v-if="repair.AdminName"/>
        <flexbox v-if="repair.AdminName">
          <flexbox-item class="engineer-name">
            工程师：{{repair.AdminName}}
          </flexbox-item>
          <flexbox-item class="tel">
            <a :href="`tel:${repair.AdminTel}`">{{repair.AdminTel}}</a>
          </flexbox-item>
        </flexbox>
        <div v-if="currentProgress && currentProgress.length > 0" class="progress">
          <flexbox
            v-for="(item, index) in currentProgress"
            :key="'item-'+index"
            class="progress-item"
          >
            <flexbox-item class="icon">
              <Icon :name="index===0?'radio-check':'radio'"/>
            </flexbox-item>
            <flexbox-item class="item-body">
              <div class="item-body-wrapper">
                <p class="time">{{item.AddTime}}</p>
                <h3 class="status">{{item.Title}}</h3>
                <p class="info" :class="item.Remark? '': 'opa'">{{item.Remark}}</p>
              </div>
            </flexbox-item>
          </flexbox>
        </div>
        <Split v-if="repair.EvaluateScore" type="line"/>
        <flexbox v-if="repair.EvaluateScore" class="order-score">
          <flexbox-item class="left">
            维修评价
          </flexbox-item>
          <flexbox-item class="right">
            <Star :size="24" readOnly :score="repair.EvaluateScore"/>
          </flexbox-item>
        </flexbox>
      </div>
    </div>
    <div class="btns">
      <Btn
        v-if="role === 'user'"
        type="primary"
        size="lar"
        text="我要评价"
        @click="toggleShowEvaluate"
      />
      <Btn
        type="default"
        size="lar"
        text="返回"
        @click="back"
      />
    </div>
    <transition name="slide-in-right">
      <div class="evaluate" v-show="showEvaluate">
        <div class="evaluate-wrapper">
          <flexbox class="evaluate-item">
            <flexbox-item class="head">响应速度</flexbox-item>
            <flexbox-item class="body">
              <span class="left">非常不满意</span>
              <Star :size="36"/>
              <span class="right">非常满意</span>
            </flexbox-item>
          </flexbox>
          <flexbox class="evaluate-item">
            <flexbox-item class="head">服务态度</flexbox-item>
            <flexbox-item class="body">
              <span class="left">非常不满意</span>
              <Star :size="36"/>
              <span class="right">非常满意</span>
            </flexbox-item>
          </flexbox>
          <flexbox class="evaluate-item">
            <flexbox-item class="head">解决问题</flexbox-item>
            <flexbox-item class="body">
              <span class="left">非常不满意</span>
              <Star :size="36"/>
              <span class="right">非常满意</span>
            </flexbox-item>
          </flexbox>
          <flexbox class="evaluate-item">
            <flexbox-item class="head">维修保护</flexbox-item>
            <flexbox-item class="body">
              <span class="left">非常不满意</span>
              <Star :size="36"/>
              <span class="right">非常满意</span>
            </flexbox-item>
          </flexbox>
          <Split type="line"/>
          <x-textarea placeholder="请输入您要补充的评价"></x-textarea>
          <img-row
            :group="uploadImages"
            :canUpload="true"
            class="imgs"
          >
            <img-cell
              v-for="(item, index) in uploadImages"
              :index="index"
              :canUpload="true"
              :group="uploadImages"
              :del="true"
              :key="'uploadImage-'+index"
            >
              <Fitimg :src="item"/>
            </img-cell>
          </img-row>
        </div>
        <Btn type="primary" text="提交" size="lar" class="submit"/>
        <Btn type="default" text="取消" size="lar" class="cancel" @click="toggleShowEvaluate"/>
      </div>
    </transition>
  </div>
</template>
<script>
import {
  Flexbox,
  FlexboxItem,
  ImgRow,
  ImgCell,
  Fitimg,
  Split,
  Btn,
  Icon,
  Star,
  XTextarea
} from 'components'
import {
  formatDate
} from 'common/utils/date'
import {
  webRoot
} from 'common/data'
import api from 'common/api'
export default {
  name: 'RepairDetail',
  components: {
    Flexbox,
    FlexboxItem,
    ImgRow,
    ImgCell,
    Fitimg,
    Split,
    Btn,
    Icon,
    Star,
    XTextarea
  },
  data () {
    return {
      showEvaluate: false,
      role: '',
      id: '',
      content: null,
      uploadImages: [
        'static/images/active1.png',
        'static/images/active2.png'
      ]
    }
  },
  computed: {
    repair () {
      return this.content ? this.content.repair : {}
    },
    imgs () {
      let arr
      if (this.content) {
        arr = this.content.repair.Images.split(',')
        if (arr.length === 1 && arr[0] === '') {
          arr = []
        } else {
          arr = arr.map(item => webRoot + item)
        }
      } else {
        arr = []
      }
      return arr
    },
    currentProgress () {
      return this.content
             ? this.content.logList
             : []
    }
  },
  watch: {
    '$route' (to, from) {
      this.role = to.params.role
      this.id = to.params.id
      this.getDetail()
    }
  },
  filters: {
    formatdate (val) {
      return formatDate(new Date(val), 'yyyy/MM/dd hh:mm')
    }
  },
  created () {
    this.role = this.$route.params.role
    this.id = this.$route.params.id
    this.getDetail()
  },
  methods: {
    roleHandler () {},
    toggleShowEvaluate () {
      this.showEvaluate = !this.showEvaluate
    },
    getDetail () {
      api.repair.detail(this.id)
      .then(({res, index}) => {
        if (res.data.IsSuccess) {
          let content = res.data.Data
          this.content = content
        } else {
          window.$alert(res.data.Message)
        }
      })
      .catch(err => {
        console.log(err)
      })
    },
    back () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~common/scss/variables.scss";
@import "~common/scss/mixins.scss";
.repair-detail{
  width: 100vw;
  .repair-detail-wrapper{
    &.user{
      min-height: 100vh;
      padding-bottom: p2r(340);
      background: $background-color;
    }
    .detail{
      background: #fff;
      padding: p2r(40) p2r($base-padding) p2r($base-padding);
      .house-name{
        color:$primary-color;
        font-size: p2r(28);
        line-height: 1.5;
      }
      .date{
        flex: 0 0 p2r(200);
        width: p2r(200);
        text-align: right;
        font-weight: 200;
        font-size: p2r(24);
        line-height: p2r(28 * 1.7);
        color: $thr-color;
      }
      .info{
        background: $primary-color;
        color: #fff;
        padding: p2r($base-padding / 2) p2r($base-padding);
        border-radius: 4px;
        margin-top: p2r(20);
        line-height: 1.5;
      }
      .desc{
        margin-top: p2r(20);
        line-height: 1.5;
        color:$text-sub-color;
      }
      .imgs{
        margin-top: p2r($base-padding / 3);
        & + .split{
          margin-top: p2r($base-padding);
        }
      }
      .engineer-name,
      .tel{
        font-size: p2r(26);
        margin-top: p2r(40);
      }
      .tel{
        text-align: right;
      }
      .progress{
        margin-top: p2r(20);
        padding:p2r($base-padding);
        .progress-item{
          &:first-child{
            .icon{
              &:after{
                background:$primary-color;
              }
              .iconfont{
                font-size: p2r(42);
                color:$primary-color;
              }
            }
          }
          &:last-child{
            .icon{
              &:after{
                display: none;
              }
            }
          }
          .icon{
            flex:0 0 p2r(42);
            position: relative;
            text-align: center;
            .iconfont{
              font-size: p2r(30);
              background: #fff;
              color:$thr-color;
              position: relative;
              z-index: 1;
            }
            &:after{
              content: '';
              display: block;
              width: 1px;
              height:100%;
              background: $thr-color;
              position: absolute;
              top:0;
              left:p2r(19);
              z-index: 0;
            }
          }
          .item-body{
            padding-left: p2r(54);
            .time{
              font-size: p2r(24);
              color:$thr-color;
              font-weight: 200;
            }
            .status{
              font-size: p2r(28);
              color:$primary-color;
              margin-top: p2r(20);
            }
            .info{
              margin-top: p2r(20);
              margin-bottom: p2r(70);
              font-size: p2r(24);
              color:$text-color;
              background: $background-color;
              padding: p2r(20);
              font-weight: 200;
              line-height: 1.4;
              &.opa{
                opacity: 0;
                padding:0 p2r(20);
              }
            }
          }
        }
      }
      .order-score{
        margin-top: p2r(30);
        .left,.right{
          color: $thr-color;
          font-size: 12px;
        }
        .right{
          text-align: right;
        }
      }
    }
  }
  &>.btns{
    position: relative;
    margin-top: p2r(-250);
    .btn{
      margin: p2r(20) auto;
      &:first-child{
        margin-top: 0;
      }
    }
  }
  .evaluate{
    position: fixed;
    width:100%;
    height: 100%;
    top: 0;
    left:0;
    z-index: 1200;
    background: $background-color;
    .evaluate-wrapper{
      background: #fff;
      padding: p2r($base-padding);
      .evaluate-item{
        margin: p2r(30) 0 0;
        &:first-child{
          margin-top: 0;
        }
        .head{
          flex: 0 0 p2r(150);
          width:p2r(150);
          line-height: p2r(36);
          font-size: p2r(26);
        }
        .body{
          .left,
          .star,
          .right{
            display: inline-block;
            vertical-align: top;
            color: $text-sub-color;
          }
          .left,
          .right{
            line-height: p2r(36);
            font-size: p2r(24);
          }
          .star{
            margin: 0 p2r(30);
          }
        }
      }
      .split{
        margin-top: p2r($base-padding * 2);
      }
      .textarea-wrapper{
        width:100%;
        margin-top: p2r($base-padding * 1.5);
        background: #f2f2f2;
        border: none;
      }
      .imgs{
        margin-top: p2r($base-padding);
      }
    }
    &>.btn{
      position: absolute;
      left: 50%;
      bottom: p2r(80);
      margin-left: p2r(-295);
      &.submit{
        bottom: p2r(200);
      }
    }
  }
}
</style>
