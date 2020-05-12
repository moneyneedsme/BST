<template>
  <div v-cloak>
    <template v-if="$store.state.isPc">
      <div class="pc_head">
        <div class="content">
          <img :src="require('../assets/imgs/logo.png')" class='logo'>
          <div class="list">
            <span @click='toHome'>Home</span>
            <span>Active Testings</span>
            <span>Test Club</span>
            <span>User’s Reviews</span>
          </div>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              <el-avatar :size="42" :src="avatarUrl"></el-avatar>
              <span class="userName">My Center</span>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a"><i class='iconfont iconwenben'></i><span class='pc_fontColor'>My Articles</span></el-dropdown-item>
              <el-dropdown-item command="b"><i class='iconfont iconshiyanshaobei2'></i><span class='pc_fontColor'>My Applications</span></el-dropdown-item>
              <el-dropdown-item command="c"><i class='iconfont iconshezhi2'></i><span class='pc_fontColor '>My Settings</span></el-dropdown-item>
              <el-dropdown-item command="e" divided class='align_center pc_fontColor'>Log Out</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="md_head">
        <span class="el-dropdown-link" @click='tabsValue=true'>
          <el-avatar :src="avatarUrl"></el-avatar>
          <span class="userName">My Center</span>
          <i class="iconfont iconbelow-s"></i>
        </span>
        <i class='iconfont iconliebiao' @click='dialogNav=true'>
        </i>
        <el-dialog 
          :visible.sync="tabsValue"
          :show-close = false
          custom-class='tabsNav'
          width='100%'
          >
          <div class='tabsBox'>
            <div class="left">
              <h4><i class='iconfont iconpingzi'></i> My Applications</h4>
              <p @click='toApplications(0)'>All({{allnumbers.applicationnum&&allnumbers.applicationnum.totalapplication||0}})</p>
              <p @click='toApplications(1)'>Succeed({{allnumbers.applicationnum&&allnumbers.applicationnum.totalchenggong||0}})</p>
              <p @click='toApplications(2)'>Applying({{allnumbers.applicationnum&&allnumbers.applicationnum.totalshenhezhong||0}})</p>
              <p @click='toApplications(3)'>Failed({{allnumbers.applicationnum&&allnumbers.applicationnum.totalshibai||0}})</p>
              <h4 @click='toMyCentent(9)'><i class='iconfont iconpingzi'></i> My Drafts({{allnumbers.totaldrafts||0}})</h4>
              <h4 style='margin-top:1.2rem' @click='toMyCentent(10)'><i class='iconfont iconpingzi'></i> My Reviews({{allnumbers.totalreviews||0}})</h4>
            </div>
            <div class="right">
              <h4><i class='iconfont iconpingzi'></i> My Articles</h4>
              <p @click='toMyCentent(1)'>All({{allnumbers.articlenum&&allnumbers.articlenum.totalarticle||0}})</p>
              <p @click='toMyCentent(2)'>Approved({{allnumbers.articlenum&&allnumbers.articlenum.approved||0}})</p>
              <p @click='toMyCentent(3)'>Not Approved({{allnumbers.articlenum&&allnumbers.articlenum.notapproved||0}})</p>
              <h4 style='margin-top:1.5rem'><i class='iconfont iconpingzi'></i> My Settings</h4>
              <p @click='toMyCentent(12)'>My Profile</p>
              <p @click='toMyCentent(13)'>Change Password </p>
            </div>
            <button>Log Out</button>
          </div>
        </el-dialog>
        <el-dialog 
          :visible.sync="dialogNav"
          :show-close = false
          custom-class='dialogNav'
          width='100%'
          >
          <div class='dialogNav_content'>
            <span @click='tolink("/")'>Home</span>
            <span>Test Club</span>
          </div>
          <el-divider></el-divider>
          <div class='dialogNav_content'>
            <span>Active Testing</span>
            <span @click="tolink('/myCenter')">User’s Reviews</span>
          </div>
        </el-dialog>
      </div>
    </template>
    
  </div>
</template>

<script>
import  {httpNetwork} from "../config/axios"
import Utils from '../config/util'
export default {
  name:'headBox',
  data(){
    return{
      avatarUrl:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      dialogNav:false,
      tabsValue:false,
      allnumbers:{}
    }
  },
  mounted(){
    this.getAllnumbers()
  },
  methods:{
    getAllnumbers(){
			const url = `index.php?route=forum/houtai/getallnumbers`
			httpNetwork(url,null,'get').then(res=>{
				this.allnumbers = res
			})
		},
    handleCommand(command) {
      switch(command){
        case 'a':
          this.toUserReviews();
          break;
        case 'b':
          this.toApplications();
          break;
        case 'c':
          this.toSettings();
          break;
      }
    },
    toHome(){
      this.$router.push({path:'/'})
    },
    toMyCentent(leftIndex){
      Utils.$emit('init',leftIndex);
      this.tabsValue = false
    },
    toUserReviews(leftIndex=1){
      this.$router.push({path:'/myCenter',query:{ArticlesID:0,leftIndex}})
      this.tabsValue = false
    },
    toApplications(index=0){
      this.$router.push({path:'/apply',query:{ArticlesID:0,index}})
      this.tabsValue = false
    },
    toSettings(){
      this.$router.push({path:'/myCenter',query:{leftIndex:12}})
    },
    tolink(path){
      this.$router.push({path})
      this.dialogNav = false;
    }
  }
}
</script>
<style lang="less" scoped>
.pc_head{
  background: white;
  width: 100%;
  
  .content{
    line-height:65px;
    height:65px;
    width: 1200px;
    margin:0 auto;
    overflow: hidden;
    .logo{
      width: 133px;
      vertical-align: middle;
    }
    .list{
      display: inline-block;
      vertical-align: middle;
      font-size:20px;
      font-weight:500;
      color:rgba(73,70,69,1);
      >span{
        margin-left: 80px;
        cursor: pointer;
      }
    }
    .el-dropdown{
      float: right;
      padding-right:50px;
      cursor: pointer;
      height: 65px;
      .el-avatar{
        vertical-align: middle;
      }
    }
    .userName{
      font-size:16px;
      font-weight:500;
      color:rgba(73,70,69,1);
      margin-left: 12px;
      vertical-align: middle;
      
    }
  }
}
.md_head{
  height: 1rem;
  line-height: 1rem;
  overflow: hidden;
  background: white;
  margin:0 0.36rem;
  padding:0 0.26rem;
  .el-avatar{
    width: 0.5rem;
    height:0.5rem;
    vertical-align: middle;
    margin-right: 0.15rem;
  }
  .userName{
    font-size:0.36rem;
    font-weight:400;
    color:rgba(73,70,69,1);
    vertical-align: middle;
    font-family:Whitney Semibold;
    &+i{
      font-size:0.36rem;
      color:rgba(73,70,69,1);
      vertical-align: -5px;
      margin-left: 0.15rem;
    }
  }
  >i{
    float: right;
    font-size: 0.48rem;
    color:#808080;
    margin-top:.06rem;
  }
  /deep/.dialogNav{
    margin-top: 0px!important;
    .el-dialog__header{
      padding:0
    }
    .el-dialog__body {
      padding:0.92rem 1.07rem 0.94rem 0.64rem;
      .dialogNav_content{
        overflow: hidden;
        padding-left: 0.08rem;
        font-size: 0px;
        height: auto;
        line-height: normal;
        >span{
          float: left;
          width: 50%;
          font-size:0.36rem;
          font-weight:500;
          color:rgba(62,58,57,1);
        }
      }
    }
  }
  /deep/.tabsNav{
    margin-top: 0px!important;
    .el-dialog__header{
      padding:0
    }
    .el-dialog__body {
      // margin-top: 2.25rem;
      padding:0 1.07rem 0.94rem 0.64rem;
      .tabsBox{
        overflow: hidden;
        >div{
          width: 47%;
          >h4{
            margin-top: 0.63rem;
            font-size:0.32rem;
            font-family:Whitney;
            font-weight:500;
            color:rgba(73,70,69,1);
            height: 0.39rem;
            line-height: 0.39rem;
            >i{
              font-size: 0.26rem;
              margin-right: 0.06rem;
            }
          }
          >p{
            height:0.56rem;
            line-height: .56rem;
            box-sizing: border-box;
            border:1px solid rgba(210,210,210,1);
            border-radius:0.28rem;
            text-align: center;
            margin-top: 0.28rem;
            font-size:0.26rem;
            font-family:Whitney Book;
            font-weight:400;
            color:rgba(73,70,69,1);
          }
        }
        >button{
          margin-top: 0.78rem;
          height:0.56rem;
          line-height: 0.56rem;
          padding:0px;
          background:rgba(244,246,248,1);
          border:1px solid rgba(229,230,231,1);
          border-radius:0.285rem;
          width: 100%;
          font-size:0.32rem;
          font-family:Whitney;
          font-weight:500;
          color:rgba(73,70,69,1);
        }
      }
    }
  }
}
.fontColor{
  font-size:0.26rem;
  font-weight:500;
  color:rgba(73,70,69,1);
  margin-left: .04rem;
}
.pc_fontColor{
  font-size:18px;
  font-weight:400;
  color:rgba(73,70,69,1);
  font-family:Whitney Book;
  margin-left: 12px;
}



</style>