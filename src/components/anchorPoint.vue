<template>
  <div class='anchorPoint'>
    <!-- <a  v-for='(v,i) in list' :key='v+i' :href="'#'+v.id" @click='bindAction(i)'><span :class='{active:i==active}'>{{v.value}}</span></a> -->
    <a @click='bindAction(v.index)'  v-for='(v,i) in list' :key='v+i' :href="'#'+v.id" ><span :class='{active:v.index==active}'>{{v.value}}</span></a>
  </div>
</template>

<script>
export default {
  name:'anchorPoint',
  props:{
    list:{
      type: Array,
      default() {
        return []
      }
    },
    active:{
      type: Number,
      default:-1
    }
  },
  data(){
    return{
      
    }
  },
  methods:{
    bindAction(index){
      this.$emit('bindAction',index)
    }
  }
}
</script>

<style lang="less" scoped>
.anchorPoint{
  height: 71px;
  line-height: 74px;
  background: white;
  padding:0 34px;
  display: flex;
  justify-content: space-between;
  >a{
    font-size:22px;
    font-weight:500;
    color:rgba(73,70,69,1);
    vertical-align: middle;
    text-decoration:inherit;
    height: atuo;
    box-sizing: border-box;
    >span{
      &:hover,&.active{
        color:rgba(227,22,25,1);
        border-bottom: 1px solid;
        padding-bottom: 2px;
      }
    }
  }
}
@media screen and (max-width:960px){
  .anchorPoint{
    height: 0.53rem;
    line-height: 0.53rem;
    padding:0 0.36rem;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    border:solid rgba(222,222,222,1);
    border-width:1px 0; 
    font-family:Whitney Semibold;
    >a{
      font-size:0.24rem;
      font-weight:400;
      color:rgba(62,58,57,1);
      >span{
        &:hover,&.active{
          color:rgba(227,22,25,1);
          border-bottom: 0px solid;
          padding-bottom: 0px;
        }
      }
    }
  }
}
</style>