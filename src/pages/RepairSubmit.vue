<template>
<div class="repair-submit">
  <div class="logo">
    <Icon name="repair"/>
  </div>
  <div class="panel">
    <h3 class="title">选择房源</h3>
    <x-select
      v-model="form.house"
      :options="houses"
      placeholder="请选择您要报修的房源"
      class="select-house"
    ></x-select>
  </div>
  <div class="panel">
    <h3 class="title">选择具体部位</h3>
    <flexbox class="selected-info">
      <flexbox-item class="head">报修部位：</flexbox-item>
      <flexbox-item class="body">
        <div
          v-for="(item, index) in selectedTags"
          :key="'st-'+index"
          class="selected-tag"
        >
          <span class="text">{{item}}</span>
          <span
            :data-index="index"
            class="icon"
            @click.stop="clearHandler"
          >
            <Icon name="close-fill"/>
          </span>
        </div>
      </flexbox-item>
    </flexbox>
    <Split type="line"/>
    <div class="tags">
      <flexbox
        wrap="wrap"
        class="tags-row"
      >
        <label
          v-for="(item, index) in tagsGroup"
          :key="'room-'+index+item.id+Math.round(Math.random()*9999)"
          class="radio-tag"
        >
          <input
            type="radio"
            :value="item.id"
            :data-label="item.title"
            data-name="room"
            name="tag"
            class="radio"
            @change="changeHandler"
          />
          <span class="text">{{item.title}}</span>
        </label>
      </flexbox>
    </div>
    <XTextarea
      v-model="form.desc"
      placeholder="请输入您要报修的具体内容"
      class="desc"
    />
    <p class="tips">* 上传照片（最多四张）</p>
    <div class="img-group-container">
      <div class="img-row">
        <div
          v-for="(item, index) in uploadedImgs"
          :key="'upimg-'+index"
          class="upload-box"
        >
          <Fitimg :src="item"/>
          <div
            class="delete"
            :data-index="index"
            @click="deleteImg"
          >
            <Icon
              name="close-fill"
            />
          </div>
        </div>
        <div
          v-if="uploadedImgs.length<4"
          class="upload-box upload-btn"
          @click="uploadImg"
        >
          <Icon name="camera"/>
        </div>
      </div>
    </div>
  </div>
  <div class="panel">
    <h3 class="title">联系人信息</h3>
    <XInput
      v-model="form.name"
      placeholder="联系人姓名"
      class="name"
    />
    <XInput
      v-model="form.tel"
      placeholder="联系人电话"
      htmlType="tel"
      class="tel"
    />
  </div>
  <Btn
    text="提交"
    size="lar"
    @click="submitHandler"
  />
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
  Btn
} from 'components'
import {
  houseArray,
  posRoom,
  posLocation,
  NAME_REG,
  TEL_REG
} from 'common/data'
export default {
  name: 'RepairSubmit',
  components: {
    Icon,
    XInput,
    XSelect,
    Flexbox,
    FlexboxItem,
    Split,
    XTextarea,
    Fitimg,
    Btn
  },
  data () {
    return {
      houses: houseArray,
      tagsState: 0,
      selectedTags: [],
      uploadedImgs: [
        '/static/images/banner2.png',
        '/static/images/active1.png',
        '/static/images/banner2.png'
      ],
      form: {
        house: '',
        desc: '',
        name: '',
        tel: ''
      }
    }
  },
  computed: {
    tagsGroup () {
      if (this.tagsState <= 0) return posRoom
      if (this.tagsState > 0 && this.tagsState <= 1) return posLocation
    }
  },
  methods: {
    changeHandler (e) {
      if (this.tagsState > 1) return
      this.tagsState += 1
      this.selectedTags.push(e.target.dataset.label)
    },
    clearHandler (e) {
      let length = this.selectedTags.length
      let index = e.currentTarget.dataset.index
      this.tagsState -= length - index
      this.selectedTags.splice(index, length - index)
    },
    uploadImg (e) {
      console.log('upload')
    },
    deleteImg (e) {
      let index = e.currentTarget.dataset.index
      this.uploadedImgs.splice(index, 1)
    },
    submitHandler () {
      if (!this.form.name) {
        window.$alert({
          content: '请填写联系人姓名'
        })
        return
      }
      if (!this.form.name.match(NAME_REG)) {
        window.$alert({
          content: '请填写正确格式的联系人姓名'
        })
        return
      }
      if (!this.form.tel) {
        window.$alert({
          content: '请填写联系人电话'
        })
        return
      }
      if (!this.form.tel.match(TEL_REG)) {
        window.$alert({
          content: '请填写正确格式的联系人电话'
        })
        return
      }
      console.log(1)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~common/scss/variables.scss";
@import "~common/scss/mixins.scss";
.repair-submit{
  padding:p2r(80) p2r($base-padding) p2r($base-padding);
  background: $primary-color;
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
    .title{
      font-size: p2r(26);
      text-align: center;
      color: $primary-color;
    }
    .selected-info{
      padding: p2r(20) 0;
      .head{
        flex:0 0 auto;
        font-size: p2r(26);
        color:$text-color;
        font-weight: 200;
        line-height: p2r(60);
        padding-top: p2r(10);
      }
      .body{
        margin-left: p2r(-10);
        margin-right: p2r(-10);
        font-size: 0;
        .selected-tag{
          display: inline-block;
          border:1px solid $primary-color;
          height: p2r(60);
          line-height: p2r(60);
          padding:0 p2r(20);
          min-width: p2r(120);
          border-radius: 4px;
          font-size: 0;
          text-align: center;
          color:lighten($primary-color, 8%);
          margin:p2r(10);
          .text{
            display: inline-block;
            font-size: p2r(24);
            vertical-align: top;
          }
          .icon{
            display: inline-block;
            vertical-align: top;
            width: p2r(50);
            height: p2r(60);
            margin-right: p2r(-20);
            .iconfont{
              font-size: p2r(24);
            }
          }
        }
      }
    }
    .select-house{
      height: p2r(100);
      margin-top: p2r(40);
    }
    .tags{
      margin-top: p2r(20);
      .tags-row{
        margin-left: p2r(-20);
        margin-right: p2r(-20);
        .radio-tag{
          display: inline-block;
          position: relative;
          margin:p2r(10) p2r(20);
          .radio{
            position: absolute;
            top:0;
            left:0;
            width:0;
            height:0;
            &:checked + .text{
              background: $primary-color;
              color:#fff;
            }
          }
          .text{
            display: block;
            border:1px solid $primary-color;
            height: p2r(60);
            line-height: p2r(60);
            padding:0 p2r(20);
            min-width: p2r(120);
            border-radius: 4px;
            font-size: p2r(24);
            text-align: center;
            color:lighten($primary-color, 18%);
          }
        }
      }

    }
    .desc{
      margin-top: p2r(20);
      font-size: p2r(26);
    }
    .tips{
      color:lighten($primary-color, 10%);
      font-size: p2r(24);
      margin-top: p2r(40);
    }
    .img-group-container{
      .img-row{
        margin-left: p2r(-20);
        margin-right: p2r(-20);
        font-size: 0;
        .upload-box{
          width:p2r(120);
          height: p2r(120);
          border-radius: 0;
          margin:p2r(20) p2r(20) 0;
          position: relative;
          display: inline-block;
          vertical-align: top;
          &:nth-child(4n){
            margin-right: 0;
          }
          .fit-img{
            border-radius: 4px;
          }
          .delete{
            position: absolute;
            width:p2r(40);
            height: p2r(40);
            line-height: p2r(40);
            text-align: center;
            color:$primary-color;
            top:p2r(-15);
            right:p2r(-15);
            z-index:1;
          }
        }
        .upload-btn{
          display: inline-block;
          width:p2r(120);
          height: p2r(120);
          border-radius: 4px;
          border:1px dashed lighten($primary-color, 15%);
          line-height: p2r(120);
          text-align: center;
          color:lighten($primary-color, 15%);
          .iconfont{
            font-size: p2r(34);
          }
        }
      }
    }
    .name,
    .tel{
      height: p2r(100);
      font-size: p2r(24);
      margin-top: p2r(20);
    }
    .name{
      margin-top: p2r(40);
    }
  }
}
</style>
