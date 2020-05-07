<template>
  <div class='myProfile'>
    <el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item v-for="(v,i) in headlist" :to="{ path:v.path }" :key='i'>{{v.name}}</el-breadcrumb-item>
		</el-breadcrumb>
    <div class='textBox'>
      <h3>My Profile</h3>
      <p>More complete data, more secure account. Complete your profile information</p>
    </div>
    <div class='textBox'>
      <h4>Email*</h4>
      <el-input></el-input>
    </div>
    <div class="dob">
      <div class='textBox'>
        <h4>First Name*</h4>
        <el-input></el-input>
      </div>
      <div class='textBox'>
        <h4>Last Name*</h4>
        <el-input></el-input>
      </div>
    </div>
    <div class="dob">
      <div class='textBox'>
        <h4>Country*</h4>
        <el-select v-model="CountryValue">
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
        <el-select v-model="CountryValue">
          <el-option
            v-for="item in CountryOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <button>Submit</button>
  </div>
</template>

<script>
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
      CountryValue:'',
      CountryOptions:[
        {
          value: '1',
          label: '中国'
        },
        {
          value: '2',
          label: '美国'
        },
      ]
    }
  }
}
</script>

<style lang="less" scoped>
  .myProfile{
    position: relative;
    background: white;
    padding:97px 60px;
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