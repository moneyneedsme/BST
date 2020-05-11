<template>
  <div id="app" :class="{'minWidth':$store.state.isPc}">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link>
    </div> -->
    <!-- <my-header/> -->
    <head-box></head-box>
    <router-view />
    <my-footer/>
  </div>
</template>
<script>
import headBox from './components/headBox'
import myHeader from '@/components/header'
import myFooter from '@/components/footer'
export default {
  name:"App",
  components: { headBox,myHeader,myFooter},
  created(){
    //在页面加载时读取sessionStorage里的状态信息
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
      this.$store.commit("setPc", false);
    }else{
      this.$store.commit("setPc", true);
    }
    if (sessionStorage.getItem("store") ) {
        this.$store.replaceState(Object.assign({},JSON.parse(sessionStorage.getItem("store")), this.$store.state))
    } 
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload",()=>{
        alert(3333)
        sessionStorage.setItem("store",JSON.stringify(this.$store.state))
    })
    console.log(this.$store.state)
  },
}
</script>  
<style lang="less" scoped>
.minWidth {
  min-width: 1200px;
}
</style>