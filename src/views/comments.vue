<template>
  <div class='comments'>
    <h3>Comments</h3>
    <el-input
      type="textarea"
      :autosize="{ minRows: 2, maxRows:5}"
      placeholder="Share your thoughts......"
      v-model="textValue">
    </el-input>
    <div class='btnBox'>
      <el-button round >Cancel</el-button>
      <el-button class='Release' round>Release</el-button>
    </div>
    <commentsItems
      class='commentsItems'
      :list= 'list'
    ></commentsItems>
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
import commentsItems from '../components/commentsItems'
export default {
  name:'comments',
  components:{
    commentsItems
  },
  data(){
    let list = new Array(6);
    let item = {
      imgUrl:require("../assets/imgs/twritte.png"),
      name:'lavigne derek',
      isZan:false,
      zanNum:10,
      time:'Mar 2, 2020 8:23 pm',
      content:'This would be perfect for my new house, I will share my using experience in BESTEK community'
    }
    list.fill(item)
    return{
      list,
      textValue:'',
      pageSize:5,
      currentPage:1,
    }
  }
}
</script>

<style lang="less" scoped>
.comments{
  overflow: hidden;
  background: white;
  padding:0px 63px 74px;
  >h3{
    text-align: center;
    font-size:32px;
    font-family:Whitney Semibold;
    font-weight:400;
    color:rgba(73,70,69,1);
    margin-bottom: 63px;
  }
  .el-button.is-round{
    width:102px;
    height:30px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(208,208,208,1);
    border-radius:15px;
    padding:0px;
    box-sizing: border-box;
    &:hover{
      color: #E31619
    }
  }
  .el-button{
    font-size:18px;
    font-family:Whitney;
    font-weight:500;
    color:rgba(89,87,87,1);
  }
  .btnBox{
    margin-top: 21px;
    text-align: right;
    margin-bottom: 30px;
    button.Release {
      margin-left: 5px;
      background:#E31619;
      color: white;
      &:hover{
        color:white;
        background: #E31619;
        border:1px solid #E31619;
        
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
  .commentsItems{
    margin-bottom: 56px;
  }
}
@media screen and (max-width:960px){
  .comments{
    padding:0px 0.36rem 1.34rem;
    >h3{
      font-size:0.45rem;
      margin-bottom: 0.63rem;
    }
    .el-button.is-round{
      width:1.32rem;
      height:0.4rem;
      border-radius:0.2rem;
    }
    .el-button{
      font-size:0.24rem;
      font-family:Whitney;
      font-weight:500;
      color:rgba(89,87,87,1);
    }
    .btnBox{
      margin-top: 0.21rem;
      margin-bottom: 0.30rem;
      button.Release {
        margin-left: 0.15rem;
      }
    }
    /deep/.el-pager li.active{
      color:rgba(227,22,25,1);
    }
    .commentsItems{
      margin-bottom: 0.56rem;
    }
  }
}
</style>