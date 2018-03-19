<template>
  <div class="activity-card">
    <div class="img-wrapper">
      <img :src="src" alt="" />
    </div>
    <div class="card-content">
      <div class="inline-wrapper">
        <div class="title">{{title}}</div>
        <div class="state">{{state}}</div>
      </div>
      <div class="inline-wrapper">
        <div class="date">{{date}}</div>
        <div class="read-num">{{readNum}}人查看</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Activitycard',
  props: {
    src: {
      type: String,
      required: true
    },
    link: {
      type: String
    },
    title: {
      type: String,
      required: true
    },
    state: {
      type: [String, Number],
      required: true
    },
    date: {
      type: String,
      required: true
    },
    readNum: {
      type: [String, Number]
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~common/scss/variables.scss";
@import "~common/scss/mixins.scss";
.activity-card{
  border-radius: 4px;
  overflow: hidden;
  box-shadow: $box-shadow;
  .img-wrapper{
    width:100%;
    // height:p2r(240);
    // overflow: hidden;
    text-align: center;
    img{
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }
  }
  .card-content{
    padding:p2r(20);
    .inline-wrapper{
      font-size: 0;
      .title{
        font-size: p2r(28);
        color:$text-color;
        font-weight: 500;
      }
      .date{
        font-size: p2r(24);
        color:$text-sub-color;
        font-weight: 200;
      }
      .read-num{
        font-size: p2r(24);
        color:$sub-color;
        font-weight: 200;
      }
    }
  }
}
</style>
