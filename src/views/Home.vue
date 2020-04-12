<template>
  <div :class="$store.state.isPc?'pcAuto marginTop':'mdAuto'">
    <goods-info></goods-info>
  </div>
</template>
<script>
import goodsInfo from './goodsInfo'
export default {
  name:'home',
  components: { goodsInfo },
}
</script>
<style lang="less" scoped>
  .marginTop{
    margin-top: 54px;
  }
</style>
