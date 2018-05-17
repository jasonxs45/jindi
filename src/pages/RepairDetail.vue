<template>
  <div class="repair-detail">
    <div class="repair-detail-wrapper">
      <div class="detail">
        <flexbox>
          <flexbox-item class="house-name">
            金地天悦E - 三单元1201
          </flexbox-item>
          <flexbox-item class="date">
            2018/05/14 12:00
          </flexbox-item>
        </flexbox>
        <div class="info">主卧-墙面；餐厅-天花板</div>
        <div class="desc">这里是描述描述这里是描述描述这里是描述描述这里是描述描述这里是描述描述这里是描述描述这里是描述描述</div>
        <img-row
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
        <Split type="line"/>
        <flexbox>
          <flexbox-item class="engineer-name">
            工程师：周星星
          </flexbox-item>
          <flexbox-item class="tel">
            <a href="tel:12345678910">12345678910</a>
          </flexbox-item>
        </flexbox>
        <div class="progress">
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
                <p class="time">{{item.StatusTime}}</p>
                <h3 class="status">{{item.Status}}</h3>
                <p class="info">{{item.Info}}</p>
              </div>
            </flexbox-item>
          </flexbox>
        </div>

      </div>
    </div>
    <Btn type="primary" size="lar" text="我要评价"/>
    <transition name="slide-in-right">
      <div class="evaluate">
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
      imgs: [
        'static/images/active1.png',
        'static/images/active2.png',
        'static/images/active1.png',
        'static/images/active2.png'
      ],
      currentProgress: [
        {
          Status: '',
          StatusTime: '123123123',
          Info: 'asdasdasdad'
        },
        {
          Status: '',
          StatusTime: '123123123',
          Info: 'asdasdasdad'
        },
        {
          Status: '',
          StatusTime: '123123123',
          Info: 'asdasdasdad'
        }
      ],
      uploadImages: [
        'static/images/active1.png',
        'static/images/active2.png'
      ]
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
    min-height: 100vh;
    padding-bottom: p2r(230);
    background: $background-color;
    .detail{
      background: #fff;
      padding: p2r(50) p2r($base-padding) p2r($base-padding);
      .house-name{
        color:$primary-color;
        font-size: p2r(28);
      }
      .date{
        flex: 0 0 p2r(200);
        width: p2r(200);
        text-align: right;
        font-weight: 200;
        font-size: p2r(24);
        line-height: p2r(28);
        color: $thr-color;
      }
      .info{
        background: $primary-color;
        color: #fff;
        padding: p2r($base-padding / 2) p2r($base-padding);
        border-radius: 4px;
        margin-top: p2r(20);
      }
      .desc{
        margin-top: p2r(20);
        line-height: 1.5;
        color:$text-sub-color;
      }
      .imgs{
        margin-top: p2r($base-padding / 3);
        & + .split{
          margin-top: p2r($base-padding / 3);
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
            }
          }
        }
      }
    }
  }
  .btn{
    position: relative;
    margin-top: p2r(-140);
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
    }
  }
}
</style>
