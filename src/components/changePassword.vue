<template>
  <div class='changePassword'>
    <el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item v-for="(v,i) in headlist" :to="{ path:v.path }" :key='i'>{{v.name}}</el-breadcrumb-item>
		</el-breadcrumb>
    <div class='content'>
      <h3>Change Password</h3>
      <p>If you forget your password, you can retrieve it by email.</p>
    </div>
    <div  class='content'>
      <h4>Original Password</h4>
      <el-input v-model="oldPassword" show-password></el-input>
    </div>
    <div  class='content'>
      <h4>New Password</h4>
      <el-input v-model="newPassword" show-password></el-input>
    </div>
    <div  class='content'>
      <h4>Confirm Password</h4>
      <el-input v-model="confrimPassword" show-password></el-input>
    </div>
    <button>Submit</button>
  </div>
</template>

<script>
export default {
  name:'changePassword',
  props:{
    headlist:{
      type: Array,
      default() {
        return []
      }
    }
  },
  data(){
    return{
      oldPassword:'',
      newPassword:'',
      confrimPassword:''
    }
  }
}
</script>

<style lang="less" scoped>
  .changePassword{
    position: relative;
    background: white;
    padding:0px 97px 60px;
    /deep/.el-breadcrumb{
      position: absolute;
      top: -25px;
      left: -226px;
    }
    >div.content{
      overflow: hidden;
      padding-top: 55px;
      >h3{
        font-size:26px;
        font-family:Whitney;
        font-weight:500;
        color:rgba(73,70,69,1);
      }
      >p{
        font-size:16px;
        font-family:Whitney Book;
        font-weight:400;
        color:rgba(114,113,113,1);
        margin-top: 10px;
      }
      >h4{
        font-size:20px;
        font-family:Whitney;
        font-weight:500;
        color:rgba(62,58,57,1);
        margin-bottom: 8px;
      }
      /deep/.el-input__inner{
        border-radius: 20px;
      }
     
    }
    >button{
      display: block;
      width:152px;
      height:34px;
      line-height:34px;
      background:rgba(227,22,25,1);
      border-radius:17px;
      outline: none;
      border: none;
      margin:55px auto 0;
      font-size:20px;
      font-family:Whitney;
      font-weight:500;
      color:rgba(255,255,255,1);
      cursor: pointer;
    }
  }
</style>