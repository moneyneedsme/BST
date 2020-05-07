<template>
  <div class='myArticles'>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="(v,i) in headlist" :to="{ path:v.path }" :key='i'>{{v.name}}</el-breadcrumb-item>
		</el-breadcrumb>
    <h5><i class='iconfont iconcaogao'></i>Post Original</h5>
    <div v-for="(v,i) in list" :key='i' class='content'>
      <img :src="require('../assets/imgs/free/11.jpg')">
      <div>
        <div class="right">
          <i>Edit</i>
          <i>View</i>
          <i>Delete</i>
        </div>
        <h2>{{v.title}}</h2>
        <div class='times'>
          <span>{{v.updated_at}}</span>
          <span :class='{active:v.archived==="f"}'>Approved</span>
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
    },
    list:{
      type: Array,
      default() {
        return []
      }
    }
  },
  mounted(){
  },
  data(){
    return {
    }
  },
  methods:{
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
      >i{
        margin-right: 5px;
        cursor: pointer;
      }
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
  @media screen and (max-width:960px){
    .myArticles{
      padding:0.57rem 0.36rem;
      >h5{
        font-size:0.26rem;
        margin-bottom: 0.08rem;
      }
      >div.content{
        padding:0.2343m 0;
        >img{
          width: 1.81rem;
          height: 0.93rem;
          margin-right: 0.18rem;
        }
        >div{
          >h2{
            font-size:0.26rem;
            margin-top: 0.05rem;
            min-height:0.42rem;
          }
          .times{
            margin-top: 0.20rem;
            >span{
              font-size:0.24rem;
              &:nth-of-type(2){
                margin-left: 0.14rem;
              }
            }
          }
          .right{
            margin-left:0.5rem;
            >i{
              font-size:0.26rem;
              &:nth-of-type(2){
                margin:0.16rem 0 ;
              }
            }
          }
        }
      }
    }
  }
</style>