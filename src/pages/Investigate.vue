<template>
  <div class="investigate">
    <div class="panel">
      <h2 class="title">问卷调查的标题问卷调查的标题问卷调查的标题</h2>
      <p class="desc">对于问卷的一些描述信息对于问卷的一些描述信息对于问卷的一些描述信息对于问卷的一些描述信息对于问卷的一些描述信息对于问卷的一些描述信息</p>
      <Split type="line" />
      <div class="questions">
        <dl class="question">
          <dt class="tit">1、题目名字题目名字题目名字</dt>
          <dd class="options">
            <label class="radio-wrapper">
              <input type="radio" name="q1" class="radio">
              <p class="option">选项一</p>
            </label>
            <br/>
            <label class="radio-wrapper">
              <input type="radio" name="q1" class="radio">
              <p class="option">选项二</p>
            </label>
          </dd>
        </dl>
        <dl class="question">
          <dt class="tit">2、题目名字题目名字题目名字<span class="multiple-mark">【多选】</span></dt>
          <dd class="options">
            <label class="radio-wrapper">
              <input type="checkbox" name="q2" class="radio">
              <p class="option">选项一</p>
            </label>
            <br/>
            <label class="radio-wrapper">
              <input type="checkbox" name="q2" class="radio">
              <p class="option">选项二</p>
            </label>
            <br/>
            <label class="radio-wrapper">
              <input type="checkbox" name="q2" class="radio">
              <p class="option">选项三</p>
            </label>
            <br/>
            <label class="radio-wrapper">
              <input type="checkbox" name="q2" class="radio">
              <p class="option">选项四</p>
            </label>
          </dd>
        </dl>
        <dl class="question">
          <dt class="tit">3、填写你想说的</dt>
          <dd class="options">
            <XTextarea placeholder="说点什么吧。。。"/>
          </dd>
        </dl>
      </div>
    </div>
    <Btn size="lar" text="确定"/>
  </div>
</template>
<script>
import {
  Split,
  Btn,
  Flexbox,
  FlexboxItem,
  Icon,
  XTextarea
} from 'components'
import api from 'common/api'
export default {
  name: 'Investigate',
  components: {
    Split,
    Btn,
    Flexbox,
    FlexboxItem,
    Icon,
    XTextarea
  },
  data () {
    return {
      id: null,
      activity: {}
    }
  },
  watch: {
    '$route' (to, from) {
      this.id = to.params.id
      this.getInvestigate()
    }
  },
  created () {
    this.id = this.$route.params.id
    this.getInvestigate()
  },
  methods: {
    getInvestigate () {
      let index = window.$loading()
      let opt = {
        Act: 'GetActivityInfo',
        Data: JSON.stringify({
          ID: this.id
        })
      }
      api.mock(opt).then(res => {
        window.$close(index)
        if (res.data.IsSuccess) {
          let activity = res.data.Data
          activity.Content = activity.Content.replace(/src="\/UploadFiles\//g, 'src="http://dongyuan.1juke.cn/UploadFiles/')
          activity.PlayStart = activity.PlayStart
          activity.PlayEnd = activity.PlayEnd
          activity.state = activity.IsOver ? 0 : 1
          this.activity = activity
        } else {
          window.$alert(res.data.Message)
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
@import "~common/scss/iconfont.scss";
.investigate{
  width:100vw;
  height: 100vh;
  overflow: hidden;
  background:lighten($primary-color, 2%) url('../../static/images/rstop.jpg') top center/100% auto no-repeat;
  position: relative;
  padding:p2r($base-padding*2) p2r($base-padding) p2r($base-padding);
  .panel{
    width:100%;
    height:calc(100% - 2.5rem);
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    background: #fff;
    border-radius: 4px;
    padding:p2r($base-padding);
    .title{
      font-size: p2r(28);
      color:$primary-color;
      text-align: center;
      margin-top: p2r(50);
    }
    .desc{
      font-size: p2r(24);
      font-weight: 200;
      color:$text-color;
      margin-top: p2r(40);
      line-height: 1.4;
    }
    .split{
      margin-top: p2r(60);
    }
    .questions{
      padding: {
        top:p2r(20);
      };
      .question{
        margin: {
          top: p2r(60);
        }
        .tit{
          color:$text-color;
          font-size: p2r(28);
          .multiple-mark{
            color:$primary-color;
          }
        }
        .options{
          .radio-wrapper{
            display: inline-block;
            margin-top: p2r(30);
            .radio{
              display: block;
              width:100%;
              height: 100%;
              top:0;
              left:0;
              opacity: 0;
              &:checked + .option{
                &:before{
                  content: "\e60f";
                  color:$primary-color;
                }
              }
            }
            .option{
              position: relative;
              padding-left: p2r(40);
              font-size: p2r(28);
              color:$text-sub-color;
              line-height: 1.4;
              &:before{
                content: "\e612";
                display: block;
                width:p2r(30);
                height: p2r(30);
                position: absolute;
                font-size: p2r(28);
                top:0;
                left:0;
                @extend .iconfont;
              }
            }
          }
          .textarea-wrapper{
            margin-top: p2r(30);
          }
        }
      }
    }
  }
  .btn{
    margin-top: p2r(30);
  }
}
</style>
