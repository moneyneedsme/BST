<template>
  <div class='winnerLists'>
    <template v-if='status=="0"'>
      <h3>Winner Lists</h3>
      <user-list
        :list='winList'
      ></user-list>
    </template>
    <h3>All Lists</h3>
    <user-list
      :list='allList'
    ></user-list>
    <el-pagination
      v-if='$store.state.isPc'
      v-show='allList.length'
      background
      @current-change = 'currentChange'
      :pageSize='pageSize'
      :currentPage = 'currentPage'
      layout="prev, pager, next"
      :total="total">
    </el-pagination>
    <el-pagination
      v-else
      v-show='allList.length'
      small
      @current-change = 'currentChange'
      :pageSize='pageSize'
      :currentPage = 'currentPage'
      layout="prev, pager, next"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
import userList from '../components/userList'
import  {httpNetwork} from "../config/axios"
export default {
  name:'winnerLists',
  components:{
    userList
  },
  props:['product_activity_id','status'],
  data(){
    return{
      allList:[],
      winList:[],
      pageSize:25,
      currentPage:1,
      total:1
    }
  },
  created(){
    this.getsuccessApplylist()
    this.getapplylist()
  },
  methods:{
    currentChange(num){
      this.currentPage = num
      this.getapplylist()
    },
    getsuccessApplylist(){
      const url = `index.php?route=newhome/activity/getsuccess_applylist&
      product_activity_id=${this.product_activity_id}`
      return httpNetwork(url,null,'get').then(res=>{
        this.currentPage = res.currentpage
        this.total = parseInt(res.totalnums)
        this.winList = [...res.data]
      })
    },
    getapplylist(){
      const url = `index.php?route=newhome/activity/getapplylist&
      product_activity_id=${this.product_activity_id}&
      page=${this.currentPage}&
      limit=${this.pageSize}`
      return httpNetwork(url,null,'get').then(res=>{
        this.currentPage = res.currentpage
        this.total = parseInt(res.totalnums)
        this.allList = [...res.data]
      })
    },
  }
}
</script>

<style lang="less" scoped>
.winnerLists{
  overflow: hidden;
  background: white;
  padding:0 63px 105px;
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