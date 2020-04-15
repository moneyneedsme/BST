<template>
  <div :class='$store.state.isPc?"pc_userList":"md_userList"'>
    <div v-for='(v,i) in list' :key='v.name+i'>
      <img :src="v.imgUrl">
      <p>{{v.name}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name:'userList',
  props:{
    list:{
      type: Array,
      default() {
        return []
      }
    }
  },
  data(){
    return{
      
    }
  }
}
</script>

<style lang="less" scoped>
.pc_userList{
  overflow: hidden;
  font-size: 0;
  margin-bottom: 80px;
  >div{
    display: inline-block;
    vertical-align: top;
    width:16.66%;
    text-align: center;
    height: 140px;
    >img{
      width:61px;
      height:61px;
      border-radius:50%;
      vertical-align: top;
    }
    >p{
      font-size:16px;
      font-family:Whitney Book;
      font-weight:400;
      color:rgba(137,137,137,1);
      margin-top: 11px;
      padding:0 5px;
      overflow: hidden;
    }
  }
}
.md_userList{
  overflow: hidden;
  font-size: 0;
  margin-bottom: 1rem;
  >div{
    display: inline-block;
    vertical-align: top;
    width:20%;
    text-align: center;
    height: 1.5rem;
    >img{
      width:0.61rem;
      height:0.61rem;
      border-radius:50%;
      vertical-align: top;
    }
    >p{
      font-size:0.24rem;
      font-family:Whitney Book;
      font-weight:400;
      color:rgba(137,137,137,1);
      margin-top: 0.11rem;
      padding:0 0.1rem;
      overflow: hidden;
    }
  }
}
</style>
