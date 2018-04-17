<template>
  <div class="investigate">
    <div class="panel">
      <h2 class="title">{{title}}</h2>
      <p class="desc">{{desc}}</p>
      <Split type="line" />
      <div class="questions">
        <dl
          v-for="(item, index1) in questions.List"
          :key="'question-'+index1+Math.random().toString(36).substr(2)"
          class="question"
        >
          <dt class="tit">{{item.Number}}、{{item.Question}}<span v-if="item.Type==='多选'" class="multiple-mark">【多选】</span></dt>
          <dd class="options">
            <XTextarea
              v-if="item.Type==='填空'"
              placeholder="说点什么吧。。。"
              :value="item.MyAnswer[0]"
              :disabled="readonly"
              :name="'q'+index1"
            />
            <template v-else>
              <div
                v-for="(opt, index) in item.Answer"
                :key="'opt-'+index"
                class="option-wrapper"
              >
                <label class="radio-wrapper">
                  <input
                    :type="item.Type==='多选'?'checkbox':'radio'"
                    :name="'q'+index1"
                    :value="opt"
                    :checked="opt === item.MyAnswer[index]"
                    :disabled="readonly"
                    class="radio"
                  >
                  <p class="option">{{opt}}</p>
                </label>
              </div>
            </template>
          </dd>
        </dl>
      </div>
    </div>
    <Btn size="lar" text="确定" @click="saveAnswer"/>
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
      readonly: null,
      questions: {},
      myAnswer:[]
    }
  },
  computed: {
    title () {
      if (this.questions.Info) {
        return this.questions.Info.Title
      }
    },
    desc () {
      if (this.questions.Info) {
        return this.questions.Info.Desc
      }
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
      api.investigate.list(this.id)
      .then(({res, index}) => {
        if (res.data.IsSuccess) {
          let questions = res.data.Data
          this.readonly = questions.Joined
          questions.List.forEach(item => {
            item.Answer = item.Answer.split('|')
            item.MyAnswer = item.MyAnswer.split('|')
          })
          this.questions = questions
        } else {
          window.$alert(res.data.Message)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    gatherAnswer () {
      let $ = str => {
        return document.querySelector(str)
      }
      let $$ = str => {
        return document.querySelectorAll(str)
      }
      this.myAnswer = []
      for (let i = 0; i < this.questions.List.length; i++) {
        let question = this.questions.List[i]
        let answer = {
          QuestionID: question.ID,
          Result: question.Type === '填空'
                  ? $('[name="q' + i + '"]').value
                  : question.Type === '单选'
                  ? (() => {
                    if ($('input[name="q' + i + '"]:checked')) {
                      return $('input[name="q' + i + '"]:checked').value
                    } else {
                      return null
                    }
                    })()
                  : (() => {
                    if ($$('input[name="q' + i + '"]:checked').length > 0) {
                      let str = []
                      $$('input[name="q' + i + '"]:checked').forEach(item => {
                        str.push(item.value)
                      })
                      return str.join('|')
                    } else {
                      return null
                    }
                    })()
        }
        this.myAnswer.push(answer)
      }
    },
    saveAnswer () {
      let _self = this
      this.gatherAnswer()
      for (let i = 0; i < this.myAnswer.length; i++) {
        if (!this.myAnswer[i].Result) {
          window.$alert('请填写第' + (i + 1) + '道题')
          return
        }
      }
      api.investigate.save(this.myAnswer)
      .then(({res, index}) => {
        if (res.data.IsSuccess) {
          let index = window.$alert({
            content: '提交成功',
            yes () {
              window.$close(index)
              _self.$router.push({
                name: 'usercenter'
              })
            }
          })
        } else {
          window.$alert(res.data.Message)
        }
      })
      .catch(err => {
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
          .option-wrapper{
            margin-top: p2r(30);
            .radio-wrapper{
              display: inline-block;
              .radio{
                display: block;
                width:100%;
                height: 100%;
                top:0;
                left:0;
                opacity: 0;
                &:checked + .option{
                  color: $text-sub-color !important;
                  &:before{
                    content: "\e60f";
                    color:$primary-color;
                  }
                }
                &:disabled + .option{
                  color:$btn-disable-color;
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
