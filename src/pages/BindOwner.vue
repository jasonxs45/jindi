<template>
  <div class="bind-owner">
    <div class="bind-owner-wrapper">
      <h3 class="title">筛选用户结果</h3>
      <div class="houses">
        <flexbox
          v-for="(item, index) in houseInfo"
          :key="'house-info-'+index"
          class="house-bar"
        >
          <flexbox-item class="house-name">
            {{item.houseName}}
          </flexbox-item>
          <flexbox-item class="owner-name">
            {{item.ownerName}}
          </flexbox-item>
        </flexbox>
      </div>
      <p class="title">输入身份证后四位进行验证</p>
      <div class="idnum-controller">
        <div
          v-for="n in 4"
          :key="'input-'+n"
          class="idnum-cell"
        >
          <input
            :type="n === 4?'text':'tel'"
            :data-index="n-1"
            maxlength="1"
            class="input"
            v-model="checkNums[n-1]"
            @input="inputHandler"
            @change="changeHandler"
          />
          <div class="text">{{checkNums[n-1][0]}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  Flexbox,
  FlexboxItem
} from 'components'
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
    FlexboxItem
  },
  data () {
    return {
      checkNums:['', '', '', ''],
      checkStr:'',
      houses
    }
  },
  computed: {
    houseInfo () {
      return this.houses
    }
  },
  methods: {
    inputHandler (e) {
      // let index = e.currentTarget.dataset.index
      // let arr = e.currentTarget.value.split('')
      // for (let i = 0; i < arr.length; i++) {
      //   this.checkNums[i] = arr[i]
      // }
      // this.checkNums[index] = e.currentTarget.value.split('')[index]
    },
    changeHandler (e) {
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~common/scss/variables.scss";
@import "~common/scss/mixins.scss";
 .bind-owner{
   width:100vw;
   height:100vh;
   background:url('/static/images/bg.png') center/cover no-repeat;
   padding: p2r(30);
   .bind-owner-wrapper{
     width:100%;
     border-radius: 4px;
     box-shadow: 0 5px 10px 0 rgba(0,0,0,.2);
     padding-top: p2r(40);
     padding-bottom: p2r(40);
     background: #fff;
     .title{
       font-size: p2r(28);
       color:$primary-color;
       text-align: center;
     }
     .houses{
       width:p2r(594);
       height:p2r(412);
       margin:p2r(40) auto;
       overflow: auto;
       -webkit-overflow-scrolling: touch;
       .house-bar{
         padding:0 p2r(40);
         color:#eda697;
         background: lighten($primary-color, 38%);
         height:p2r(88);
         line-height:p2r(88);
         border-radius: 4px;
         margin-top: p2r(20);
         &:first-child{
           margin-top: 0;
         }
         .owner-name{
           flex:0 0 p2r(110);
           font-size: p2r(24);
           text-align: right;
         }
       }
     }
     .idnum-controller{
       width:p2r(594);
       margin:p2r(40) auto;
       text-align: center;
       font-size: 0;
       .idnum-cell{
         position: relative;
         display: inline-block;
         vertical-align: top;
         width:p2r(100);
         height:p2r(100);
         background: lighten($primary-color, 38%);
         margin:0 p2r(15);
         border-radius: 4px;
         border:1px solid lighten($primary-color, 20%);
         .input{
           position: absolute;
           display: block;
           width:100%;
           height: 100%;
           top:0;
           left:0;
           opacity: 0;
           font-size: p2r(28);
          -webkit-appearance: none;
           outline: none;
           z-index:1;
         }
         .text{
           width:100%;
           height: 100%;
           font-size: p2r(28);
           line-height: p2r(100);
           text-align: center;
           color: $text-color;
         }
       }
     }
   }
 }
</style>
