<template>
  <div class='comments'>
    <h3>Comments</h3>
    <el-input
      type="textarea"
      :autosize="{ minRows: 2, maxRows:5}"
      placeholder="Share your thoughts......"
      v-model="content">
    </el-input>
    <div class='btnBox'>
      <el-button round @click='content=""'>Cancel</el-button>
      <el-button class='Release' round @click='onRelease'>Release</el-button>
    </div>
    <commentsItems
      class='commentsItems'
      :list= 'list'
    ></commentsItems>
    <el-pagination
      v-if='$store.state.isPc'
      background
      v-show='list.length'
      @current-change = 'currentChange'
      :pageSize='pageSize'
      :currentPage = 'currentPage'
      layout="prev, pager, next"
      :total="total">
    </el-pagination>
    <el-pagination
      v-else
      small
      v-show='list.length'
      @current-change = 'currentChange'
      :pageSize='pageSize'
      :currentPage = 'currentPage'
      layout="prev, pager, next"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
import commentsItems from '../components/commentsItems'
import  {httpNetwork} from "../config/axios"
export default {
  name:'comments',
  components:{
    commentsItems
  },
  props:['product_activity_id','ceping_review_id'],
  data(){
    return{
      list:[],
      content:'',
      pageSize:10,
      currentPage:1,
      total:1
    }
  },
  mounted(){
    this.getList()
  },
  methods:{
    currentChange(num){
      this.currentPage = num
      this.getList()
    },
    getList(){
      const url = `index.php?route=forum/ceping/comment_getall&product_activity_id=${this.product_activity_id}&page=${this.currentPage}&limit=${this.pageSize}`
      return httpNetwork(url,null,'get').then(res=>{
        this.list = res.data
        this.currentPage = res.currentpage
        this.total = parseInt(res.totalnums)
      })
    },
    onRelease(){
      const url = `index.php?route=forum/ceping/comment_add`
      const data = {
        ceping_review_id:this.ceping_review_id,
        product_activity_id:this.product_activity_id,
        content:this.content
      }
      return httpNetwork(url,data).then(res=>{
        this.content = ''
        this.$message({
          showClose: true,
          message: res.text,
          type: 'success',
          duration:1500
        });
        this.getList()
      })
    },
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
      color:white;
      background: #E31619;
      border:1px solid #E31619;
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