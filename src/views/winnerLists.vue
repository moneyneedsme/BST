<template>
  <div class='winnerLists'>
    <h3>Winner Lists</h3>
    <user-list
      :list='list'
    ></user-list>
    <h3>All Lists</h3>
    <user-list
      :list='list'
    ></user-list>
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
import userList from '../components/userList'
export default {
  name:'winnerLists',
  components:{
    userList
  },
  data(){
    let list = new Array(18);
    let item = {
      imgUrl:require("../assets/imgs/twritte.png"),
      name:'Trevor Goldsmith444'
    }
    list.fill(item)
    return{
      list,
      pageSize:5,
      currentPage:1,
    }
  }
}
</script>

<style lang="less" scoped>
.winnerLists{
  overflow: hidden;
  background: white;
  padding:0 63px 134px;
  >h3{
    font-size:32px;
    font-family:Whitney Semibold;
    font-weight:400;
    color:rgba(73,70,69,1);
    text-align: center;
    margin-bottom: 66px;
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
  .winnerLists{
    padding:0 0.36rem 1.34rem;
    >h3{
      font-size:0.45rem;
      margin-bottom: 0.66rem;
    }
    /deep/.el-pager li.active{
      color:rgba(227,22,25,1);
    }
  }
}
</style>