<template>
  <div class='myProfile'>
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
    background: white;
    padding:0px 97px 60px;
    overflow: hidden;
    >div.textBox{
      margin-top:45px;
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
</style>