<template>
  <div :class="$store.state.isPc?'pcAuto marginTop':'mdAuto'">
    <goods-info></goods-info>
    <nav-tabs></nav-tabs>
    <div :class="$store.state.isPc?'pc_content':'md_content'">
      <div class='leftContent'>
        <anchor-point :list='pointList'></anchor-point>
        <reviews class='reviews'></reviews>
      </div>
      <hot-activities class='hot-activities'></hot-activities>
    </div>
  </div>
</template>
<script>
import goodsInfo from './goodsInfo'
import navTabs from '../components/navTabs'
import anchorPoint from '../components/anchorPoint'
import hotActivities from '../components/hotActivities'
import reviews from '../components/Reviews'
export default {
  name:'home',
  components: { 
    goodsInfo,
    navTabs,
    anchorPoint,
    hotActivities,
    reviews
  },
  data(){
    return{
      pointList:true?[
        {value:"Reviews",id:"Reviews"},
        {value:"Activity Details",id:"ActivityDetails"},
        {value:"Application lists",id:"Applicationlists"},
        {value:"Comments",id:"Comments"},
      ]:
      [
        {value:"Activity Details",id:"ActivityDetails"},
        {value:"Application lists",id:"Applicationlists"},
        {value:"Comments",id:"Comments"},
      ]
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
  .md_content{
    background: white;
  }
</style>
