<template>
  <div class='Reviews'>
    <div v-for='(v,i) in 4' :key='i'>
      <div class="head">
        <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></img>
        <span class="userName">ErikNL</span>
        <i>2 days ago</i>
      </div>
      <h2>Bestek electric toothbrush micro crowd test | confident smile, starting from "teeth"</h2>
      <p>Thanks to sun Shijun, the best @ from the moon, and bestek, the father of gold, for giving me the chance to make this public test, and giving me this m-care electric toothbrush of bestek. [standard configuration] charging toothbrush ped </p>
      <div class="imgBox">
        <img :src="require('../assets/imgs/free/11.jpg')">
        <img :src="require('../assets/imgs/free/11.jpg')">
        <img :src="require('../assets/imgs/free/11.jpg')">
        <img :src="require('../assets/imgs/free/11.jpg')">
      </div>
    </div>
    <el-pagination
      v-if='$store.state.isPc'
      background
      :pageSize='pageSize'
      :currentPage = 'currentPage'
      layout="prev, pager, next"
      :total="100">
    </el-pagination>
    <el-pagination
      v-else
      small
      :pageSize='pageSize'
      :currentPage = 'currentPage'
      layout="prev, pager, next"
      :total="100">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name:'Reviews',
  data(){
    return{
      pageSize:5,
      currentPage:1,
    }
  }
}
</script>

<style lang="less" scoped>
.Reviews{
  overflow: hidden;
  padding:0 63px;
  background: white;
  >div{
    margin-top: 72px;
    .head{
      overflow: hidden;
      font-size:18px;
      font-family:Whitney Book;
      font-weight:400;
      color:rgba(137,137,137,1);
      >img{
        width: 60px;
        height: 60px;
        border-radius: 50%;
        vertical-align: middle;
        margin-right: 21px;
      }
      >span{
        vertical-align: middle;
      }
      >i{
        float: right;
        margin-top: 30px;
        transform: translateY(-50%);
      }
    }
    >h2{
      margin-top: 23px;
      font-size:20px;
      font-family:Whitney;
      font-weight:500;
      color:rgba(34,24,21,1);
    }
    >p{
      font-size:16px;
      font-family:Whitney Light;
      font-weight:400;
      color:rgba(102,100,100,1);
      margin-top: 15px;
    }
    .imgBox{
      overflow: hidden;
      >img{
        width:180px;
        height:180px;
        margin-top: 17px;
        margin-right: 13px;
        &:nth-of-type(4n){
          margin-right: 0px;
        }
      }
    }
  }
  .el-pagination{
    text-align: center;
  }
  /deep/.el-pagination.is-background .el-pager li{
    background: transparent;
    font-family:Whitney;
    font-weight:500;
    color:rgba(137,137,137,1);
    width: 26px;
    height: 26px;
    line-height: 26px;
    font-size: 18px;
    border: 1px solid rgba(210,209,211,1);;
    box-sizing: border-box;
  }
  /deep/.el-pagination.is-background .el-pager li:not(.disabled).active{
    background:rgba(227,22,25,1);
    color:white
  }
  /deep/.el-pagination.is-background .btn-next,/deep/ .el-pagination.is-background .btn-prev{
    background: transparent;
    border: 1px solid rgba(210,209,211,1);
    width: 26px;
    height: 26px;
    line-height: 26px;
    min-width: auto;
  }
}
@media screen and (max-width:960px){
  .Reviews{
    padding:0 0.36rem;
    >div{
      margin-top: 0.82rem;
      .head{
        font-size:0.24rem;
        >img{
          width: 0.6rem;
          height: 0.6rem;
          margin-right:0.2rem
        }
        >i{
          margin-top: 0.3rem;
          transform: translateY(-50%);
        }
      }
      >h2{
        margin-top: 0.35rem;
        font-size:0.26rem;
      }
      >p{
        font-size:0.24rem;
        margin-top: 0.25rem;
      }
      .imgBox{
        >img{
          width:1.6rem;
          height:1.6rem;
          margin-top: 0.27rem;
          margin-right: 0.11rem;
          &:nth-of-type(4n){
            margin-right: 0px;
          }
        }
      }
    }
    // /deep/.el-pagination.is-background .el-pager li{
    //   width: 0.46rem;
    //   height: 0.46rem;
    //   line-height: 0.46rem;
    //   font-size: 0.26rem;
    //   border: 1px solid rgba(210,209,211,1);;
    //   box-sizing: border-box;
    // }
    // /deep/.el-pagination.is-background .el-pager li:not(.disabled).active{
    //   background:rgba(227,22,25,1);
    //   color:white
    // }
    // /deep/.el-pagination.is-background .btn-next,/deep/ .el-pagination.is-background .btn-prev{
    //   width: 0.46rem;
    //   height: 0.46rem;
    //   line-height: 0.46rem;
    // }
    /deep/.el-pager li.active{
      color:rgba(227,22,25,1);
    }
  }
}
</style>