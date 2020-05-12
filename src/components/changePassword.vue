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
      <el-input v-model.trim="oldpassword" show-password></el-input>
    </div>
    <div  class='content'>
      <h4>New Password</h4>
      <el-input v-model.trim="password" show-password></el-input>
    </div>
    <div  class='content'>
      <h4>Confirm Password</h4>
      <el-input v-model.trim="confirm " show-password></el-input>
    </div>
    <button @click='onSubmit'>Submit</button>
  </div>
</template>

<script>
import  {httpNetwork} from "../config/axios"
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
      oldpassword:'',
      password:'',
      confirm:''
    }
  },
  methods:{
    onSubmit(){
      if(this.oldpassword.length<6||this.oldpassword.length>16){
        this.$message({
          showClose: true,
          message: 'Password length should be greater than 6 and less than 16!',
          type: 'error',
          duration:1500
        })
      }else if(this.password.length<6||this.password.length>16){
        this.$message({
          showClose: true,
          message: 'Password length should be greater than 6 and less than 16!',
          type: 'error',
          duration:1500
        })
      }else if(this.confirm.length<6||this.confirm.length>16){
        this.$message({
          showClose: true,
          message: 'Password length should be greater than 6 and less than 16!',
          type: 'error',
          duration:1500
        })
      }else if(this.confirm!==this.password){
        this.$message({
          showClose: true,
          message: 'Two passwords are inconsistent!',
          type: 'error',
          duration:1500
        })
      }else{
        const url = `index.php?route=account/password/changepass`
        const data = {
          oldpassword:this.oldpassword,
          password:this.password,
          confirm:this.confirm,
        }
        httpNetwork(url,data).then(res=>{
          this.$message({
            showClose: true,
            message: res.text,
            type: 'success',
            duration:1500
          });
          this.oldpassword = ''
          this.password = ''
          this.confirm = ''
        })
      }
    },
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
  @media screen and (max-width:960px){
    .changePassword{
      padding:0.5rem 0.36rem 0.36rem;
      /deep/.el-breadcrumb{
        position: inherit;
        top: 0;
        left: 0;
      }
      >div.content{
        padding-top: 0.55rem;
        >h3{
          font-size:0.32rem;
        }
        >p{
          font-size:0.26rem;
          margin-top: 0.10rem;
        }
        >h4{
          font-size:0.28rem;
          margin-bottom:0.08rem;
        }
        /deep/.el-input__inner{
          border-radius: 20px;
        }
      }
      >button{
        width:1.82rem;
        height:0.54rem;
        line-height:0.54rem;
        background:rgba(227,22,25,1);
        border-radius:17px;
        margin:0.55rem auto 0;
        font-size:0.26rem;
      }
    }
  }
</style>