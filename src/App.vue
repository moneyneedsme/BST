<template>
  <div id="app" :class="{'minWidth':$store.state.isPc}">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link>
    </div> -->
    <head-box></head-box>
    <router-view />
  </div>
</template>
<script>
import headBox from './components/headBox'
export default {
  name:"App",
  components: { headBox },
}
</script>  
<style lang="less" scoped>
.minWidth {
  min-width: 1200px;
}
</style>