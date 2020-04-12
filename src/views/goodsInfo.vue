<template>
  <div>
    <template v-if="$store.state.isPc">
      <div class='goodsInfo'>
        <img :src="require('../assets/imgs/free/11.jpg')">
        <div>
          <h2>Free Testing | Crowdfunding Is OngoingM-Care Toothbrush Set & UV Sanitizer...</h2>
          <div class='Applied'>
            <img :src="require('../assets/imgs/user.jpg')" class='user'>
            <span> 260 Applied</span>
            <i></i>
            <img :src="require('../assets/imgs/user.jpg')" class='eye'>
            <span> 260 Applied</span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {

}
</script>
<style lang="less" scoped>
.goodsInfo{
  overflow:hidden;
  background: white;
  >img{
    width:562px;
    height:562px;
    float: left;
  }
  >div{
    margin-left:562px;
    padding:57px 55px 0;
    >h2{
      font-size:32px;
      font-weight:400;
      color:rgba(73,70,69,1);
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2; 
      -webkit-box-orient: vertical
    }
    .Applied{
      margin-top: 26px;
      >img{
        margin-right: 10px;
        vertical-align: middle;
        &.user{
          width: 26px;
          height: 23px;
        }
        &.eye{
          width: 27px;
          height: 18px;
        }
      }
      >span{
        font-size:22px;
        font-weight:500;
        color:rgba(140,141,141,1);
        vertical-align: middle;
      }
      >i{
        width:1px;
        height:21px;
        border:1px solid rgba(140,141,141,1);
        opacity:0.7;
        vertical-align: middle;
        margin:0 30px;
      }
    }
  }
}
</style>