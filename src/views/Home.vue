<template>
  <div>
    <div class='headAnchorPoint' v-show='showAnchorPointHead'>
      <div>
          <anchor-point :list='pointList' @bindAction = 'bindAction' :active.sync = 'active'></anchor-point>
      </div>
    </div>
    <div :class="$store.state.isPc?'pcAuto marginTop':'mdAuto'" >
      <goods-info></goods-info>
      <nav-tabs ></nav-tabs>
      <div :class="$store.state.isPc?'pc_content':'md_content'">
        <div class='leftContent'>
          <anchor-point :list='pointList'  @bindAction = 'bindAction' :active.sync = 'active' v-show='!showAnchorPointHead' ref='anchorPoint'></anchor-point>
          <reviews class='reviews' id='Reviews' ref='Reviews'></reviews>
          <activity-details id='ActivityDetails' ref='ActivityDetails'></activity-details>
          <winner-lists id='Applicationlists' ref='Applicationlists'></winner-lists>
          <comments id='Comments' ref='Comments'></comments>
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
      pointList:true?[
        {value:"Reviews",id:"Reviews",index:0},
        {value:"Activity Details",id:"ActivityDetails",index:1},
        {value:"Application lists",id:"Applicationlists",index:2},
        {value:"Comments",id:"Comments",index:3},
      ]:
      [
        {value:"Activity Details",id:"ActivityDetails",index:1},
        {value:"Application lists",id:"Applicationlists",index:2},
        {value:"Comments",id:"Comments",index:3},
      ],
      active:-1,
      fdScroll:true,
      AnchorPointTop:null,
      showAnchorPointHead:false,
      ReviewsTop:null,
      ActivityDetailsTop:null,
      ApplicationlistsTop:null,
      CommentsTop:null,

    }
  },
  mounted(){
    document.addEventListener('scroll', this.handleScroll);
    this.AnchorPointTop = this.$refs.anchorPoint.$el.offsetTop;
    this.ReviewsTop = this.$refs.Reviews?this.$refs.Reviews.$el.offsetTop:undefined;
    this.ActivityDetailsTop = this.$refs.ActivityDetails.$el.offsetTop;
    this.ApplicationlistsTop = this.$refs.Applicationlists.$el.offsetTop;
    this.CommentsTop = this.$refs.Comments.$el.offsetTop;
  },
  methods:{
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
        setTimeout(()=>{
          this.fdScroll = true;
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
        },300)
      }
      this.fdScroll = false;
    }
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
    height: 70px!important;
    background: lightgoldenrodyellow;
    position: fixed;
    top:0;
    height: 0px;
    >div{
      width: 1200px;
      margin:0 auto;
    }
  }
  .md_content{
    background: white;
  }
</style>
