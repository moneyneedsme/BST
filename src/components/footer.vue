<template>
  <div>
    <my-pc-footer v-if="$store.state.isPc"></my-pc-footer>
    <my-mobile-footer v-else></my-mobile-footer>
  </div>
</template>
<script>
import myPcFooter from '@/components/components/pcFooter'
import myMobileFooter from '@/components/components/mobileFooter'

export default {
  components: {
    myPcFooter,
    myMobileFooter
  },
}
</script>