<template>
  <div class='Instructions'>
    <h3>Instructions for Authors</h3>
    <p>To order to offer a clearer understanding of how to write a perfect article, we provide you a sample for your reference as below.</p>
    <div v-for="(v,i) in instructions" :key="i" @click='tolink(v.link)'>
      <img :src="imgUrl+v.image">
      <!-- <p class='oneLine '>Bestek Official l 8 Socket Charging Station</p> -->
      <p class='oneLine '>{{v.title}}</p>
    </div>
  </div>
</template>

<script>
import  {httpNetwork} from "../config/axios";
export default {
  name:'Instructions',
  data(){
    return{
      instructions:[]
    }
  },
  created(){
    this.getinstructions()
  },
  methods:{
    tolink(url){
      window.location.href = url
    },
    getinstructions(){
      const url = `index.php?route=forum/houtai/getinstructions`
      return httpNetwork(url,null,'get').then(res=>{
        this.instructions = res.data&&res.data.instructions
      })
    },
  }
}
</script>

<style lang="less" scoped>
.Instructions{
  width: 283px;
  margin-left: 17px;
  overflow: hidden;
  float: right;
  >h3{
    font-size:28px;
    font-family:Whitney Semibold;
    font-weight:400;
    color:rgba(34,24,21,1);
  }
  >p{
    font-size:18px;
    font-family:Whitney Book;
    font-weight:400;
    color:rgba(73,70,69,1);
    margin-top: 21px;
  }
  >div{
    margin-top: 16px;
    width: 100%;
    position: relative;
    >img{
      width: 100%;
      vertical-align: top;
      cursor: pointer;
    }
    >p{
      position: absolute;
      bottom: 0;
      left: 0;
      padding:7px 14px;
      font-size:14px;
      font-family:Whitney;
      font-weight:500;
      color:rgba(255,255,255,1);
      z-index: 999;
      background:rgba(0,0,0,.1);
      box-sizing: border-box;
      width: 100%;
      white-space: nowrap
    }
  }
}
@media screen and (max-width:960px){
  .Instructions{
    width:100%;
    margin-left:0;
    float: none;
    margin-top: 1.5rem;
    padding:0 0.36rem;
    box-sizing: border-box;
    >h3{
      font-size:0.4rem;
      text-align: center;
    }
    >p{
      font-size:0.24rem;
      margin-top: 0.25rem;
    }
    >div{
      margin-top:0.4rem;
      >img{
        height:3.89rem;
        width: 100%;
        vertical-align: top;
      }
      >p{
        position: absolute;
        bottom: 0;
        left: 0;
        padding:0.2rem 0.25rem;
        font-size:0.26rem;
      }
    }
  }
}
</style>