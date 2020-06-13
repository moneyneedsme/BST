<template>
  <div class='activityDetails'>
    <div class=details v-html='longtext'></div>
    <div class="share">
      <!-- <a target="_blank" href="https://www.facebook.com/BestekGlobal/" ><img :src="require('../assets/imgs/faceBook.png')"></a> -->
      <!-- <a target="_blank" href="https://twitter.com/bestekglobal" ><img :src="require('../assets/imgs/twritte.png')"></a> -->
    </div>
  </div>
</template>

<script>
export default {
  name:'activityDetails',
  props:['longtext'],
  data(){
    return{
    }  
  }
}
</script>

<style lang="less" scoped>
.activityDetails{
  overflow: hidden;
  padding:63px 63px ;
  background: white;
  // margin-top: 8px;
  .details{
    position: relative;
    overflow: hidden;
    /deep/ img{
      width: 100%!important;
    }
    /deep/h2,/deep/span,/deep/p,/deep/div{
      line-height: 1.5!important;
      font-size: 16px!important;
      font-family: "Whitney Book", "Microsoft YaHei"!important;
    }
  }
  .share{
    text-align: center;
    margin-top: 26px;
    img{
      width: 45px;
      height:45px;
      &:first-of-type{
        margin-right: 60px;
      }
    }
  }
}
@media screen and (max-width:960px){
  .activityDetails{
    padding: 0.36rem 0.36rem 1.4rem;
    .details{
      img{
        width: 100%!important;
      }
    }
    .share{
      margin-top: 0.35rem;
      img{
        width:0.75rem;
        height:0.75rem;
        // &:first-of-type{
        //   margin-right:0.5rem;
        // }
      }
    }
  }
}
</style>