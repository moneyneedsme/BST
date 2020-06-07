<template>
  <div class='hotActivities'>
    <h2>Hot Activities</h2>
    <div class='content'>
      <div v-for='(v,i) in list' :key='i' @click='toLink(v)'>
        <img :src="v.adimage">
        <p>{{v.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import  {httpNetwork} from "../config/axios";
export default {
  name:'hotActivities',
  data(){
    return{
      list:[]
    }
  },
  created(){
    this.getTactivities()
  },
  methods:{
    toLink(item){
      console.log(item)
      window.location.href = `https://www.bestekdirect.com/reviews/index.html?product_activity_id=${item.product_id}`
      // this.$router.push({path:'/',query:{product_activity_id:item.product_id}})
    },
    getTactivities(){
      const url = `index.php?route=newhome/activity/getactivities`
      return httpNetwork(url,null,'get').then(res=>{
        this.list = res.activetesting
      })
    }
  }
}
</script>

<style lang="less" scoped>
.hotActivities{
  >h2{
    height: 71px;
    line-height: 71px;
    text-align: center;
    font-size:32px;
    font-family:Whitney Semibold;
    font-weight:400;
    color:rgba(73,70,69,1);
    background: white;
  }
  .content{
    overflow: hidden;
    >div{
      cursor: pointer;
      margin-top: 8px;
      padding-bottom: 17px;
      background: white;
      >img{
        width:278px;
        height:143px;
        vertical-align: top;
      }
      >p{
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2; 
        -webkit-box-orient: vertical;
        font-family:Whitney Semibold;
        padding:17px 14px 0;
        font-size:18px;
        font-family:Whitney Book;
        font-weight:400;
        color:rgba(73,70,69,1);
        line-height:24px;
      }
    }
  }
}
@media screen and (max-width:960px){
  .hotActivities{
    >h2{
      height:auto;
      line-height:normal;
      margin-top: 1.37rem;
      font-size:0.45rem;
    }
    .content{
      overflow: hidden;
      padding:0 0.36rem;
      >div{
        margin-top: 0.5rem;
        padding-bottom: 0.24rem;
        float: left;
        width:3.28rem;
        // border-bottom:1px solid rgba(210,210,210,.6);
        &:nth-of-type(2n){
          float: right;
        }
        >img{
          width:3.28rem;
          height:1.64rem;
          vertical-align: top;
        }
        >p{
          padding:0.24rem 0.17rem 0;
          font-size:0.24rem;
          font-family:Whitney Book;
          font-weight:400;
          color:rgba(73,70,69,1);
          line-height:0.32rem;
          min-height: 0.7rem;
        }
      }
    }
  }
}
</style>