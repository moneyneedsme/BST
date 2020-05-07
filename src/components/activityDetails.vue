<template>
  <div class='activityDetails'>
    <div class=details v-html='longtext'></div>
    <div class="share">
      <img :src="require('../assets/imgs/faceBook.png')">
      <img :src="require('../assets/imgs/twritte.png')">
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
  padding:0 63px 105px;
  .details{
    position: relative;
  }
  .share{
    text-align: center;
    margin-top: 26px;
    >img{
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
    padding:0 0.36rem 1.4rem;
    .details{
    }
    .share{
      margin-top: 0.35rem;
      >img{
        width:0.75rem;
        height:0.75rem;
        &:first-of-type{
          margin-right:0.5rem;
        }
      }
    }
  }
}
</style>