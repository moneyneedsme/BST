<template>
  <div class='myArticles'>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="(v,i) in headlist" :to="{ path:v.path }" :key='i'>{{v.name}}</el-breadcrumb-item>
		</el-breadcrumb>
    <h5><i></i>Post Original</h5>
    <div v-for="(v,i) in 5" :key='i' class='content'>
      <img :src="require('../assets/imgs/free/11.jpg')">
      <div>
        <div class="right">
          <i>Edit</i>
          <i>View</i>
          <i>Delete</i>
        </div>
        <h2>Free Testing | BESTEK 8-outlet Charging Station</h2>
        <div class='times'>
          <span>2020-03-20 03:02</span>
          <span :class='{active:i==1}'>Approved</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'myArticles',
  props:{
    headlist:{
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style lang="less" scoped>

  .myArticles{
    background: white;
    padding:57px 51px;
    position: relative;
    >h5{
      font-size:16px;
      font-family:Whitney Book;
      font-weight:400;
      color:rgba(73,70,69,1);
      margin-bottom: 8px;
      text-align: right;
    }
    >div.content{
      padding:23px 0;
      box-sizing: border-box;
      overflow: hidden;
      border-bottom: 1px solid rgba(210,210,210,.6);
      &:first-of-type{
        border-top: 1px solid rgba(210,210,210,.6);
      }
      >img{
        width: 181px;
        height: 93px;
        float: left;
        margin-right: 18px;
      }
      >div{
        overflow: hidden;
        >h2{
          font-size:18px;
          font-family:Whitney Semibold;
          font-weight:400;
          color:rgba(73,70,69,1);
          margin-top: 5px;
          min-height:42px;
        }
        .times{
          overflow: hidden;
          margin-top: 20px;
          >span{
            font-size:14px;
            font-family:Whitney Book;
            font-weight:400;
            color:rgba(137,137,137,1);
            &:nth-of-type(2){
              margin-left: 14px;
            }
            &.active{
              color:rgba(227,22,25,1);
            }
          }
          
        }
        .right{
          float: right;
          margin-left:50px;
          >i{
            font-size:16px;
            font-family:Whitney Book;
            font-weight:400;
            color:rgba(73,70,69,1);
            display:block;
            cursor: pointer;
            &:nth-of-type(2){
              margin:16px 0 ;
            }
          }
        }
      }
    }
  }
</style>