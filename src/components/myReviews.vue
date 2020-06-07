<template>
  <div class='myReviews'>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="(v,i) in headlist" :to="{ path:v.path }" :key='i'>{{v.name}}</el-breadcrumb-item>
		</el-breadcrumb>
    <div v-for="(v,i) in getList" :key='i' class='content'>
      <img @click="toReviews(v)" :src="v.review_image_ids&&v.review_image_ids[0]?imgUrl+v.review_image_ids[0].photopath:require('../assets/imgs/free/11.jpg')">
      <div>
        <h2 @click="toReviews(v)" class='oneLine'>{{v.result&&v.result.review_title}}</h2>
        <div  class='oneLine reviewContent' v-html='v.result&&v.result.review_content'></div>
        <div>
          <span>{{v.result&&v.result.date_added}}</span>
          <span class='active' v-if='v.result&&v.result.isprove==1'>Approved</span>
          <span class='active' v-else-if='v.result&&v.result.isprove==-1'>Under review</span>
          <template v-if='$store.state.isPc'>
            <i @click='editItem(v,i)' v-if='v.result&&v.result.isprove!=1'>Edit</i>
            <i v-show="showView" @click='toView(v,i)'>View</i>
            <i @click='deleteItem(v,i)' >Delete</i>
          </template>
          <div v-else>
            <i @click='editItem(v,i)' v-if='v.result&&v.result.isprove!=1'>Edit</i>
            <i v-show="showView" @click='toView(v,i)'>View</i>
            <i @click='deleteItem(v,i)'>Delete</i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import  {httpNetwork} from "../config/axios"
export default {
  name:'myReviews',
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
    },
    showView:{
      default:false
    }
  },
  computed:{
    getList(){
      return this.list
    }
  },
  methods:{
    toReviews(item){
      console.log(item)
      this.$router.push({path:'/',query:{product_activity_id:item.result.product_activity_id}})
    },
    toView(item,index){
      this.$router.push({path:'/myDarftsView',query:{cid:item.result.ceping_review_id}})
    },
    editItem(item,index){
      this.$router.push({path:'/postComments',query:{cid:item.result.ceping_review_id}})
    },
    deleteItem(item,index){
      this.$confirm('This operation will be permanently deleted. Do you want to continue?', 'Tips', {
        confirmButtonText: 'Determine',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        const url = `index.php?route=forum/ceping/review_delete`
        const data = {
          ceping_review_id:item.result.ceping_review_id,
        }
        httpNetwork(url,data).then(res=>{
          this.getList.splice(index,1)
          this.$message({
            showClose: true,
            message: res.text,
            type: 'success',
            duration:1500
          });
        })
      })
    },
  },
}
</script>

<style lang="less" scoped>
  .myReviews{
    background: white;
    padding:57px 51px;
    position: relative;
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
        cursor: pointer;
      }
      >div{
        overflow: hidden;
        >h2{
          font-size:18px;
          font-family:Whitney Semibold;
          font-weight:400;
          color:rgba(73,70,69,1);
          margin-top: 5px;
          cursor: pointer;
        }
        >div.reviewContent{
          font-size:16px;
          font-family:Whitney Book;
          font-weight:400;
          color:rgba(62,58,57,1);
          margin-top: 10px;
          height: 20px;
        }
        >div{
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
          >i{
            float: right;
            margin-left: 21px;
            font-size:16px;
            font-family:Whitney Book;
            font-weight:400;
            color:rgba(73,70,69,1);
            text-decoration: underline;
            cursor: pointer;
          }
        }
      }
    }
  }
  @media screen and (max-width:960px){
    .myReviews{
      padding:0.57rem 0.36rem;
      >div.content{
        padding:0.23rem 0;
        >img{
          width: 1.81rem;
          height: 0.93rem;
          margin-right: 0.18rem;
        }
        >div{
          overflow: hidden;
          >h2{
            font-size:0.26rem;
            margin-top: 0.05rem;
          }
          >div.reviewContent{
            font-size:0.24rem;
            margin-top: 0.10rem;
            height: 0.32rem;
          }
          >div{
            margin-top: 0.2rem;
            >span{
              font-size:0.24rem;
              &:nth-of-type(2){
                margin-left:0.14rem;
              }
            }
            >div{
              >i{
                margin-right: 0.21rem;
                font-size:0.26rem;
                font-family:Whitney Book;
                font-weight:400;
                color:rgba(73,70,69,1);
                text-decoration: underline;
              }
            }
          }
        }
      }
    }
  }
</style>