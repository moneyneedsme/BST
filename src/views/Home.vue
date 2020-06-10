<template>
  <div>
    <div class='headAnchorPoint' :class='$store.state.isPc?"pc_head":""' v-show='showAnchorPointHead'>
      <div>
          <button v-if='$store.state.isPc' @click='toBuy' class='iconfont icondaohanggouwuche'>Buy Now</button>
          <anchor-point :list='pointList' @bindAction = 'bindAction' :active.sync = 'active'></anchor-point>
      </div>
    </div>
    <div :class="$store.state.isPc?'pcAuto marginTop':'mdAuto'" >
      <goods-info :datas = 'goodsInfodatas' :product_activity_id='product_activity_id'></goods-info>
      <nav-tabs ></nav-tabs>
      <div :class="$store.state.isPc?'pc_content':'md_content'">
        <div class='leftContent'>
          <anchor-point :list='pointList'  @bindAction = 'bindAction' :active.sync = 'active' v-show='!showAnchorPointHead' ref='anchorPoint' id='anchorPoint'></anchor-point>
          <reviews v-if='this.goodsInfodatas.zhuangtai==0' class='reviews' :product_activity_id='product_activity_id' id='Reviews' ref='Reviews'></reviews>
          <activity-details id='ActivityDetails' ref='ActivityDetails' :longtext = 'goodsInfodatas.longtext'></activity-details>
          <winner-lists :status='this.goodsInfodatas.zhuangtai'  id='Applicationlists' ref='Applicationlists'  :product_activity_id='product_activity_id'></winner-lists>
          <comments id='Comments' ref='Comments' :product_activity_id='product_activity_id'></comments>
        </div>
        <hot-activities class='hot-activities'></hot-activities>
      </div>
    </div>
  </div>
</template>
<script>
import goodsInfo from './goodsInfo'
import navTabs from '../components/navTabs'
import anchorPoint from '../components/anchorPoint'
import hotActivities from '../components/hotActivities'
import reviews from '../components/Reviews'
import activityDetails from '../components/activityDetails'
import winnerLists from './winnerLists'
import comments from './comments'
import  {httpNetwork} from "../config/axios";
import qs from 'qs';
export default {
  name:'home',
  components: { 
    goodsInfo,
    navTabs,
    anchorPoint,
    hotActivities,
    reviews,
    activityDetails,
    winnerLists,
    comments
  },
  data(){
    return{
      pointList:[],
      product_activity_id:this.$store.state.product_activity_id, //767活动中 766已结束 765已结束
      goodsInfodatas:{},
      active:-1,
      fdScroll:true,
      AnchorPointTop:null,
      showAnchorPointHead:false,
      ReviewsTop:null,
      ActivityDetailsTop:null,
      ApplicationlistsTop:null,
      CommentsTop:null,
      setTime:this.$store.state.isPc?300:0,
    }
  },
  created(){
    const url = 'index.php?route=forum/forum2/checklogin'
    const data = {
      currenturl: window.location.href 
    }
    return httpNetwork(url,data).then(res=>{
      if(res.code===1){
        this.$store.commit('setLogin',1)
        this.$store.commit('setuserId',res.customer_id)
        this.$store.commit('setPoints',res.points)
        console.log(state)
      }
    })
  },
  mounted(){
    console.log(this.$store.state)
    this.vueLoading.show()
    let p2 = this.getactivitydetail()
    Promise.all([p2]).finally(()=>{
      this.vueLoading.hide()
      setTimeout(() => {
        this.initScroll()
      }, 6000);
    })
  },
  methods:{
    toBuy(){
      if(!this.$store.state.islogin){
        this.getLogin()
        return
      }
      // window.location.href = 'https://www.bestekdirect.com/groupbuy/ShoppingCart1.html'
      const url = `/index.php?route=checkout/cart/add`
      const data = {
        quantity:1,
        product_id:this.goodsInfodatas.product_id
      }
      debugger
      this.$axios.post(url,qs.stringify(data)).then(res => {
        window.location.href = 'https://www.bestekdirect.com/groupbuy/ShoppingCart1.html'
      })
    },
    initScroll(){
      if(!this.$store.state.isPc){
        setTimeout(() => {
          document.addEventListener('scroll', this.handleScroll);
          this.AnchorPointTop = this.$refs.anchorPoint.$el.offsetTop;
          this.ReviewsTop = this.$refs.Reviews?this.$refs.Reviews.$el.offsetTop:undefined;
          this.ActivityDetailsTop = this.$refs.ActivityDetails.$el.offsetTop;
          this.ApplicationlistsTop = this.$refs.Applicationlists.$el.offsetTop;
          this.CommentsTop = this.$refs.Comments.$el.offsetTop;
        }, 500);
      }else{
        document.addEventListener('scroll', this.handleScroll);
        this.AnchorPointTop = this.$refs.anchorPoint.$el.offsetTop;
        this.ReviewsTop = this.$refs.Reviews?this.$refs.Reviews.$el.offsetTop:undefined;
        this.ActivityDetailsTop = this.$refs.ActivityDetails.$el.offsetTop;
        this.ApplicationlistsTop = this.$refs.Applicationlists.$el.offsetTop;
        this.CommentsTop = this.$refs.Comments.$el.offsetTop;
      }
    },
    bindAction(i){
      this.handleScroll(null,true,i)
    },
    handleScroll(event,isClick=false,index){
      if(isClick){
        this.active = index;
        this.fdScroll = false;
        setTimeout(()=>{
          document.documentElement.scrollTop -=100;
        },100)
        setTimeout(()=>{
          this.fdScroll = true;
        },400)
      }
      if(this.fdScroll){
        this.fdScroll = false;
        if(window.scrollY>this.AnchorPointTop){
          this.showAnchorPointHead = true
        }else{
          this.showAnchorPointHead = false
        }
        if(window.scrollY>this.ReviewsTop&&window.scrollY<this.ActivityDetailsTop){
          this.active = 0;
        }else if(window.scrollY>this.ActivityDetailsTop&&window.scrollY<this.ApplicationlistsTop){
          this.active = 1;
        }else if(window.scrollY>this.ApplicationlistsTop&&window.scrollY<this.CommentsTop){
          this.active = 2;
        }else if(window.scrollY>this.CommentsTop){
          this.active = 3;
        }else{
          this.active = -1;
        }
      }else{
        setTimeout(() => {
          this.fdScroll = true;
        },this.setTime);
      }
    },
    getactivitydetail(){
      const url = `index.php?route=newhome/activity/getactivitydetail&product_activity_id=${this.product_activity_id}`
      return httpNetwork(url,null,'get').then(res=>{
        this.goodsInfodatas = res.data;
        this.pointList = res.data.zhuangtai==0?[
          {value:"Reviews",id:"Reviews",index:0},
          {value:"Activity Details",id:"ActivityDetails",index:1},
          {value:"Application Lists",id:"Applicationlists",index:2},
          {value:"Comments",id:"Comments",index:3},
        ]:
        [
          {value:"Activity Details",id:"ActivityDetails",index:1},
          {value:"Application Lists",id:"Applicationlists",index:2},
          {value:"Comments",id:"Comments",index:3},
        ];
      })
    },
    // isLogin(){
    //   const url = 'index.php?route=forum/forum2/checklogin'
    //   httpNetwork(url,null,'get').then(res=>{
    //     console.log(res)
    //   }).catch(err=>{
    //     console.log(err)
    //     if(err.code===0){
    //     //  window.location.href="https://www.bestekdirect.com/login"
    //     }
    //   })
    // }
  }
}
</script>
<style lang="less" scoped>
  .marginTop{
    margin-top: 54px;
  }
  
  .pc_content{
    width: 1200px;
    margin:97px auto 0;
    overflow: hidden;
    .leftContent{
      float: left;
      width: 887px;
      .reviews{
        margin-top: 8px;
      }
    }
    .hot-activities{
      float: right;
      width: 278px;
    }
    
  }
  .headAnchorPoint{
    z-index: 999;
    width: 100%;
    position: fixed;
    top:0;
    height: 0px;
    >div{
      margin:0 auto;
      border-bottom: 1px solid #c3c3c3;
    }
  }
  .pc_head{
    background: white;
    height: 65px;
    border-bottom: 1px solid #c3c3c3;
    >div{
      border:none;
      width: 1200px;
      margin:0 auto;
      .anchorPoint{
        height: 65px;
        line-height: 68px;
        padding:0
      }
      >button{
        float: right;
        box-sizing: border-box;
        width:150px;
        height:42px;
        background:rgba(244,246,248,1);
        border-radius:23px;
        font-size:18px;
        font-weight:500;
        color:rgba(73,70,69,1);
        border: none;
        margin-top: 12px;
        margin-left: 250px;
        cursor: pointer;
        &:hover{
          color:white;
          background:rgba(227,22,25,1);
        }
        &.icondaohanggouwuche::before{
          font-size: 20px;
          vertical-align: 1px;
          margin-right: 12px;
        }
      }
    }
  }
  @media screen and (max-width:960px){
    .headAnchorPoint{
    z-index: 999;
    width: 100%;
    position: fixed;
    top:0;
    height: 0px;
    >div{
      width:100%; 
      margin:0 auto;
      border-bottom: 0px;
    }
  }
  }
  .md_content{
    background: white;
  }
</style>
