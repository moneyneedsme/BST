<template>
  <div class='navTabs'>
    <div v-for='(value,index) in tabs' :key='value+index'>
      {{value}}
      <span v-if="!$store.state.isPc">{{index+1}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:'navTabs',
  data(){
    return{
      tabs:['Apply for Free','Winners List','Product Test','Review Submit','Activity Ends']
    }
  }
}
</script>

<style lang="less" scoped>
.navTabs{
  display:flex;
  justify-content:space-between;
  font-size: 0;
  overflow: hidden;
  margin-top: 97px;
  >div{
    display: inline-block;
    vertical-align: top;
    width: 200px;
    box-sizing: content-box;
    height: 62px;
    line-height: 62px;
    text-align: center;
    font-size:20px;
    font-weight:400;
    color:rgba(73,70,69,1);
    background:white;
    box-shadow:9px 8px 8px 0px rgba(168,168,169,0.1);
    border-radius: 5px;
    position: relative;
    &:not(:last-of-type):after{
      content: '';
      width: 0;
      height: 0;
      position: absolute;
      right: -50px;
      top: 50%;
      transform: translateY(-50%);
      border: solid;
      border-width: 10px 25px;
      border-color: transparent transparent transparent white;
    }
  }
}
@media screen and (max-width:960px){
.navTabs{
  display:block;
  font-size: 0;
  overflow: hidden;
  margin:1rem 0.36rem 0.5rem;
  >div{
    width: 100%;
    height: 0.65rem;
    line-height: 0.65rem;
    font-size:0.32rem;
    font-weight:500;
    color:rgba(89,87,87,1);
    background:white;
    box-shadow:0px 0px 0px 0px;
    border-radius: 5px;
    position: relative;
    margin-bottom: 0.36rem;
    &:not(:last-of-type):after{
      content: '';
      position: absolute;
      top:inherit;
      left: 50%;
      bottom: -0.44rem;
      transform: translateX(-50%);
      border: solid;
      border-width: 0.22rem;
      border-color:white transparent transparent  transparent ;
    }
    >span{
      position: absolute;
      left: 0.35rem;
      top:50%;
      transform: translateY(-50%);
      width:0.31rem;
      height:0.33rem;
      line-height:0.33rem;
      background:rgba(236,237,238,1);
      border-radius:0.05rem;
      font-size:0.24rem;
      font-weight:500;
      color:rgba(73,70,69,1);
    }
  }
}
}
</style>