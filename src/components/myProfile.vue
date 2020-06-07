<template>
  <div class='myProfile'>
    <el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item v-for="(v,i) in headlist" :to="{ path:v.path }" :key='i'>{{v.name}}</el-breadcrumb-item>
		</el-breadcrumb>
    <div class='textBox'>
      <h3>My Profile</h3>
      <p>Complete your profile information</p>
    </div>
    <div class='textBox'>
      <h4>Email*</h4>
      <el-input v-model.trim="contactemail"></el-input>
    </div>
    <div class="dob">
      <div class='textBox'>
        <h4>First Name*</h4>
        <el-input v-model.trim="firstname"></el-input>
      </div>
      <div class='textBox'>
        <h4>Last Name*</h4>
        <el-input v-model.trim="lastname"></el-input>
      </div>
    </div>
    <div class="dob">
      <div class='textBox'>
        <h4>Country*</h4>
        <el-select v-model="country" filterable placeholder='Please select' >
          <el-option
            v-for="item in CountryOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class='textBox'>
        <h4>Mobile Number*</h4>
        <el-input v-model.trim="telephone"></el-input>
      </div>
    </div>
    <button @click='onSubmit'>Submit</button>
  </div>
</template>

<script>
import  {httpNetwork} from "../config/axios"
export default {
  name:'myProfile',
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
      contactemail: '',
      firstname: '',
      lastname: '',
      telephone: '',
      country: null,
      CountryOptions: []
    }
  },
  mounted(){
    this.getallcountries()
  },
  methods:{
    onSubmit(){
      if(!this.contactemail){
        this.$message({
          showClose: true,
          message: 'Please fill in the email first!',
          type: 'error',
          duration:1500
        })
      }else if(!this.firstname){
        this.$message({
          showClose: true,
          message: 'Please fill in the first name first!',
          type: 'error',
          duration:1500
        })
      }else if(!this.lastname){
        this.$message({
          showClose: true,
          message: 'Please fill in the last name first!',
          type: 'error',
          duration:1500
        })
      }else if(!this.telephone){
        this.$message({
          showClose: true,
          message: 'Please fill in the mobile phone first!',
          type: 'error',
          duration:1500
        })
      }else if(!this.country){
        this.$message({
          showClose: true,
          message: 'Please select a country first!',
          type: 'error',
          duration:1500
        })
      }else{
        const url = `index.php?route=forum/houtai/changeprofile`
        const data = {
          contactemail:this.contactemail,
          firstname:this.firstname,
          lastname:this.lastname,
          telephone:this.telephone,
          country:this.country
        }
        httpNetwork(url,data).then(res=>{
          this.$message({
            showClose: true,
            message: res.text,
            type: 'success',
            duration:1500
          });
          this.contactemail = ''
          this.firstname = ''
          this.lastname = ''
          this.telephone = ''
          this.country = null
        })
      }
    },
    getallcountries(){
      const url = `index.php?route=forum/houtai/getallcountries`
      httpNetwork(url,null,'get').then(res=>{
        this.CountryOptions = res.data.map(v=>{
          return {value:v.country_id,label:v.name}
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .myProfile{
    position: relative;
    background: white;
    padding:7px 60px 86px;
    /deep/.el-breadcrumb{
      position: absolute;
      top: -25px;
      left: -226px;
    }
    >div.textBox{
      padding-top:45px;
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
    >div.dob{
      overflow: hidden;
      >div{
        width: 48%;
        float: left;
        &:first-of-type{
          margin-right:4%;
        }
        margin-top:35px;
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
        /deep/.el-select{
          width: 100%;
        }
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
    .myProfile{
      padding:0.97rem 0.36rem;
      /deep/.el-breadcrumb{
        position: inherit;
        top: 0;
        left: 0;
      }
      >div.textBox{
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
      >div.dob{
        overflow: hidden;
        >div{
          width: 48%;
          float: left;
          &:first-of-type{
            margin-right:4%;
          }
          margin-top:0.35rem;
          >h4{
            font-size:0.28rem;
            margin-bottom:0.08rem;
          }
          /deep/.el-input__inner{
            border-radius: 20px;
          }
          /deep/.el-select{
            width: 100%;
          }
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