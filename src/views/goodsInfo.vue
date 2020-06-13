<template>
  <div>
    <div class='goodsInfo'>
      <img :src="imgUrl+datas.image">
      <div>
        <h2>{{datas.name}}</h2>
        <div class='Applied'>
          <i class='iconfont iconrenwu-tuandui-copy'></i>
          <span> {{datas.applied}} Applied</span>
          <b></b>
          <i class='iconfont iconyanjing'></i>
          <span> {{datas.views}} Views</span>
        </div>
        <div class="Qty" >
            <span>Qty:</span>
            <i>{{datas.required}}</i>
            <span>Price:</span>
            <i>${{datas.retailprice}}</i>
        </div>
        
        <div class="activityEnds" >
          <template v-if='datas.zhuangtai==0'>
            Activity ends, {{datas.applysuccess}} applied successfully
            <a href="#">See Results</a>
          </template>
          <div class=time v-else-if='datas.zhuangtai==1'>
              <i class='iconfont icondaojishi'></i>
              Count Down: <span>{{datas.leftday}}</span> Days <span>{{datas.lefthour}}</span> Hours
          </div>
        </div>
        <div class="btnBox">
          <div v-if='datas.zhuangtai==0' class='showStatus' >
            <i class='iconfont iconjieshu'></i>
            <span>Completed</span>
          </div>
          <div v-else class='showStatus buyActive' @click='setShowBuyInfo' >
            <template v-if="$store.state.isPc">
              <i class='iconfont iconmianfei'  style="margin-right:6px"></i>
              <span >Apply for Free</span>
            </template  >
            <template v-else>
               <i class='iconfont iconmianfei'  ></i>
              <span>Apply</span>
            </template>
          </div>
          <el-button @click='toBuy' plain :class='{active:!datas.status==1  }' >
            <i class='iconfont icondaohanggouwuche'></i>
            <span>Buy Now</span>
          </el-button>
          <el-button plain @click="shareNow(product_activity_id)">
            <!-- <i class='iconfont iconfenxiang share'></i> -->
            <img :src="require('../assets/imgs/faceBook.png')" style='width:24px;height:24px;vertical-align: -5px;margin-right: 5px'>
            <span>Share</span>
          </el-button>
        </div>
      </div>
    </div>
    <el-dialog 
      class="showBuyInfo"
      :visible.sync="showBuyInfo"
      :show-close	= 'false'
    >
      <i class='iconfont iconchazishanchudaibiankuang' @click='showBuyInfo=false'></i>
      <h4>Submit Application</h4>
      <div class='contenet'>
        <div class="goods">
          <img :src="imgUrl+datas.image">
          <div>
            <h4 class='twoLine'>{{datas.name}}</h4>
            <div>
              <div>
                <span>Price:</span>
                <i>${{datas.retailprice}}</i>
              </div>
              <div>
                <span>Applied:</span>
                <i>{{datas.applied}}</i>
              </div>
            </div>
          </div>       
        </div>
        <div class='describe'>
          <h4>Fill out the public test questionnaire:</h4>
          <p>Filling in the questionnaire carefully will increase the chance of successful application</p>
        </div>
        <div class="textBox">
          <p>Leave your active platform social accounts (We only support Facebook platform)</p>
          <el-input placeholder="Reply" v-model="submitData.socialaccount"></el-input>  
        </div>
        <div class="textBox">
          <p>Please leave an email address for contact</p>
          <el-input placeholder="Reply" v-model="submitData.contactemail"></el-input>  
        </div>
        <div class="textBox">
          <p>Convince us why choose you</p>
          <el-input placeholder="Reply" v-model="submitData.whychooseyou"></el-input>  
        </div>
      </div>
      <button @click='onSubmitBtn' :class='{active:submitData.socialaccount&&submitData.contactemail&&submitData.whychooseyou}'>Submit</button>
    </el-dialog>
    <el-dialog 
      class="showSuccess"
      :visible.sync="showSuccess"
      :show-close	= 'false'
    >
      <i class='iconfont iconchazishanchudaibiankuang' @click='showSuccess=false'></i>
      <p>Public test application submitted </p>
      <p>successfully</p>
      <button @click='tolink'>Go To My Application</button>
    </el-dialog>
  </div>
</template>

<script>
import  {httpNetwork} from "../config/axios";
import qs from 'qs';
export default {
  name:'goodsInfo',
  props:{
    datas:{
      type:Object,
      default:()=>{
        return {}
      }
    },
    product_activity_id:{
      type:[Number,String],
      default:0
    }
  },
  data(){
    return{
      showBuyInfo:false,
      showSuccess:false,
      submitData:{
        contactemail:'',
        socialaccount:'',
        whychooseyou:''
      },
      url:''
    }
  },
  mounted(){
  },
  methods:{
    setShowBuyInfo(){
      if(!this.$store.state.islogin){
        this.getLogin()
        return
      }
      this.showBuyInfo = true
    },
    shareNow(product_activity_id){
      if(!this.$store.state.islogin){
        this.getLogin()
        return
      }
			const shareUrl = `https://www.bestekdirect.com/reviews/index.html#/?product_activity_id=${product_activity_id}&referids=${this.$store.state.userId}`
      console.log('分享',shareUrl,FB)
			let FBshareurl = shareUrl
			FB.init({
        appId: '607311862971192',
        version: 'v2.3'
      });
      FB.ui({
				method: 'share',
				title: 'Test Club-Bestek Charging Station ',
				description: '  I am participating in winning free sample at Bestek, join with me!  ',
				href: shareUrl
			},(response)=>{
				if (response && !response.error_code){
					const url = `index.php?route=forum/user/recordsharesuccess`
					const data = {
						shareurl:FBshareurl
					}
					httpNetwork(url,data).then(res=>{
						this.$message({
							showClose: true,
							message: 'Share success',
							type: 'success',
							duration:1500
						});
					})
				}else{
					this.$message({
            showClose: true,
            message: 'Share fail!',
            type: 'error',
            duration:1500
          });
				}
			})
		},
    toBuy(){
      if(!this.$store.state.islogin){
        this.getLogin()
        return
      }
      const url = `https://www.bestekdirect.com/index.php?route=checkout/cart/add`
      const data = {
        quantity:1,
        product_id:this.datas.product_id
      }
      this.$axios.post(url,qs.stringify(data)).then(res => {
        window.location.href = 'https://www.bestekdirect.com/groupbuy/ShoppingCart1.html'
      })
    },
    tolink(){
      // window.location.href = this.url
      this.$router.push({path:'/apply',query:{index:2}});
    },
    onSubmitBtn(){
      const url = `index.php?route=newhome/activity/applyp`
      const data = {
        product_activity_id:this.product_activity_id,
        contactemail:this.submitData.contactemail,
        socialaccount:this.submitData.socialaccount,
        whychooseyou:this.submitData.whychooseyou,
      }
      httpNetwork(url,data).then(res=>{
        this.showBuyInfo=false
        this.showSuccess=true
        console.log(res)
        this.url = res.redirecturl
        // this.$message({
        //   showClose: true,
        //   message: '恭喜你，这是一条成功消息',
        //   type: 'success',
        //   duration:1500
        // });
      })
    }
  }
}
</script>
<style lang="less" scoped>
.goodsInfo{
  overflow:hidden;
  background: white;
  >img{
    width:562px;
    height:562px;
    float: left;
  }
  >div{
    margin-left:562px;
    padding:57px 55px 0;
    >h2{
      font-size:32px;
      font-weight:400;
      color:rgba(73,70,69,1);
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2; 
      -webkit-box-orient: vertical;
      font-family:Whitney Semibold;
    }
    .Applied{
      margin-top: 26px;
      >i{
        margin-right: 10px;
        vertical-align: middle;
        font-size: 26px;
        color:#8C8D8D;
        &.user{
          font-size: 26px;
        }
        &.eye{
          font-size: 26px;
        }
      }
      >span{
        font-size:22px;
        font-weight:500;
        color:rgba(140,141,141,1);
        vertical-align: middle;
      }
      >b{
        width:1px;
        height:21px;
        border-left:1px solid rgba(140,141,141,1);
        opacity:0.7;
        vertical-align: middle;
        margin:0 30px;
      }
    }
    .Qty{
      margin-top: 40px;
      padding:17px 0;
      border: solid rgba(238,238,238,1);
      border-width: 1px 0;
      >span{
        font-size:18px;
        font-weight:400;
        color:rgba(140,141,141,1);
        margin-right: 12px;
        font-family:Whitney Book;
      }
      >i{
        font-size:26px;
        font-weight:500;
        color:rgba(73,70,69,1);
        &:first-of-type{
          margin-right: 62px;
        }
      }
    }
    .activityEnds{
      margin-top: 49px;
      height:58px;
      line-height: 58px;
      box-sizing: border-box;
      text-align: center;
      font-size:18px;
      font-weight:400;
      color:rgba(73,70,69,1);
      border:1px solid rgba(238,238,238,1);
      font-family:Whitney Book;
      >a{
        color:rgba(227,22,25,1);
        text-decoration: underline;
        margin-left: 12px;
      }
      >div{
        font-size:18px;
        font-weight:400;
        color:rgba(73,70,69,1);
        height: 100%;
        >span{
          font-weight:500;
          color:rgba(73,70,69,1);
          font-size:26px;
          font-family:Whitney;
        }
        >i{
          font-size: 23px;
          color:#6E6E6E;
          margin-right: 18px;
        }
      }
    }
    .btnBox{
      display: flex;
      justify-content: space-between;
      div.buyActive{
        cursor: pointer;
        background:rgba(227,22,25,1);
        color:white;
        border:none;
        span{
          color:white;
        }
      }
      .showStatus{
        line-height:47px;
        text-align: center;
        border: 1px solid #DCDFE6;
        .iconmianfei{
          font-size: 18px;
        }
      }
      >button{
        &:hover,&.active{
          color:white;
          border:none;
          background:rgba(227,22,25,1);
        }
      }
      >button,.showStatus{
        margin-top: 80px;
        box-sizing: border-box;
        width:167px;
        height:47px;
        background:rgba(244,246,248,1);
        border-radius:23px;
        font-size:18px;
        font-weight:500;
        color:rgba(73,70,69,1);
        margin-left: 0px;
        span{
          font-size:18px;
          font-family:Whitney Book;
          font-weight:400;
        }
        i{
          font-size: 21px;
          margin-right: 12px;
          vertical-align:1px;
          &.share{
            font-size: 24px;
            vertical-align: -2px;
          }
        }
      }
    }
  }
  
}

.showBuyInfo{
  /deep/.el-dialog{
    background: transparent;
  }
  /deep/ .el-dialog{
    width: 695px;
    margin-top: 50px!important;
  }
  /deep/.el-dialog__header{
    display: none;
  }
  /deep/.el-dialog__body{
    background:rgba(255,255,255,1);
    border-radius:20px;
    position: relative;
    padding:45px;
    box-sizing: border-box;
    >i{
      font-size: 43px;
      color:#EBECED;
      position: absolute;
      top:-22px;
      right: -18px;
      cursor: pointer;
    }
    >h4{
      font-size:32px;
      font-family:Whitney Semibold;
      font-weight:400;
      color:rgba(73,70,69,1);
      line-height:28px;
      text-align: center;
    }
    .contenet{
      height: 420px;
      overflow-y:auto;
      margin-top: 34px;
      padding-bottom: 10px;
      .goods{
        padding:32px;
        border:1px solid rgba(238,238,238,1);
        box-shadow:0px 7px 6px 0px rgba(232,234,236,0.15);
        border-radius:10px;
        overflow: hidden;
        >img{
            width:117px;
            height:118px;
            float: left;
            margin-right: 34px;
        }
        >div{
          overflow: hidden;
          >h4{
            font-size:22px;
            font-family:Whitney Semibold;
            font-weight:400;
            color:rgba(73,70,69,1);
            line-height:28px;
            margin-top: 5px;
            min-height: 50px;
          }
          >div{
            margin-top: 25px;
            overflow: hidden;
            font-size: 0;
            >div{
              display: inline-block;
              vertical-align: top;
              width: 50%;
              >span{
                font-size:18px;
                font-family:Whitney Book;
                font-weight:400;
                color:rgba(140,141,141,1);
              }
              >i{
                font-size:22px;
                font-family:Whitney;
                font-weight:500;
                color:rgba(73,70,69,1);
              }
            }
          }
        }
      }
      .describe{
        margin-top: 45px;
        >h4{
          font-size:22px;
          font-family:Whitney Semibold;
          font-weight:400;
          color:rgba(73,70,69,1);
          line-height:28px;
        }
        >p{
          font-size:16px;
          font-family:Whitney Book;
          font-weight:400;
          color:rgba(73,70,69,1);
          line-height:28px;
          margin-top: 12px;
        }
      }
      .textBox{
        margin-top: 20px;
        >p{
          font-size:18px;
          font-family:Whitney;
          font-weight:500;
          color:rgba(73,70,69,1);
          line-height:26px;
          margin-bottom: 8px;
        }
      }
    }
    >button{
      width:123px;
      height:35px;
      line-height: 35px;
      background: #D1D1D2;
      border-radius:18px;
      outline: none;
      font-size:20px;
      font-family:Whitney Book;
      font-weight:400;
      color:rgba(255,255,255,1);
      display: block;
      margin: 50px auto 0;
      border:none;
      cursor: pointer;
      &:hover,&.active{
        background:rgba(227,22,25,1);
      }
    }
  }
  
}
.showSuccess{
  /deep/.el-dialog{
    background: transparent;
    position: static;
  }
  /deep/ .el-dialog{
    
    margin-top: 0px!important;
  }
  /deep/.el-dialog__header{
    display: none;
  }
  /deep/.el-dialog__body{
    width: 695px;
    background:rgba(255,255,255,1);
    border-radius:20px;
    position: absolute;
    padding: 127px 0px;
    box-sizing: border-box;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    text-align: center;
    >i{
      font-size: 43px;
      color:#EBECED;
      position: absolute;
      top:-22px;
      right: -18px;
      cursor: pointer;
    }
    >p{
      font-size:32px;
      font-family:Whitney Semibold;
      font-weight:400;
      color:rgba(73,70,69,1);
      line-height:38px;
    }
    >button{
      margin-top: 49px;
      width:300px;
      height:35px;
      line-height: 35px;
      background:#D1D1D2;
      border-radius:18px;
      outline: none;
      font-size:20px;
      font-family:Whitney Book;
      font-weight:400;
      color:rgba(255,255,255,1);
      border:none;
      cursor: pointer;
      &:hover{
        background:rgba(227,22,25,1);
      }
    }
  }
}
@media screen and (max-width:960px){
.goodsInfo{
  margin:0.36rem 0.36rem 0;
  >img{
    width:6.78rem;
    height:5.23rem;
    float: inherit;
  }
  >div{
    margin-left:0px;
    padding:0.65rem 0.33rem 0.74rem;
    >h2{
      font-size:0.32rem;
    }
    .Applied{
      margin-top:0.32rem;
      >i{
        margin-right: 0.1rem;
        font-size: 0.26rem;
        &.user{
          font-size: 0.26rem;
        }
        &.eye{
          font-size: 0.26rem;
        }
      }
      >span{
        font-size:0.24rem;
      }
      >b{
        width:0px;
        display: inline-block;
        height:0.21rem;
        margin:0 0.48rem;
      }
    }
    .Qty{
      margin-top: 0.55rem;
      padding: 0;
      border-width: 0;
      >span{
        font-size:0.24rem;
        margin-right: 0.09rem;
      }
      >i{
        font-size:0.32rem;
        &:first-of-type{
          margin-right: 0.63rem;
        }
      }
    }
    .activityEnds{
      margin-top: 0.54rem;
      height:0.77rem;
      line-height: 0.77rem;
      font-size:0.26rem;
      border:1px solid rgba(238,238,238,1);
      >a{
        margin-left:0.18rem;
      }
      >div{
        font-size:0.24rem;
        >span{
          font-size:0.32rem;
        }
        >i{
          font-size: 0.24rem;
          margin-right: 0.18rem;
        }
      }
    }
    .btnBox{
      .showStatus{
        line-height:0.4rem;
        text-align: center;
        i{
          font-size:0.28rem!important;
          margin-right: 0.08rem;
        }
        span{
          vertical-align: top;
        }
      }
      >button,.showStatus{
        margin-top: 0.7rem;
        width:1.9rem;
        height:0.47rem;
        font-size:0.24rem;
        color:rgba(73,70,69,1);
        padding:0.05rem 0.1rem;
        i{
          font-size:0.28rem;
          margin-right: 0.08rem;
          vertical-align:0px;
          &.share{
            font-size: 0.36rem;
            vertical-align: -2px;
          }
        }
        span{
          font-size:0.24rem;
          font-family:Whitney Book;
          font-weight:400;
        }
      }
    }
  }
}
.showBuyInfo{
  /deep/ .el-dialog{
    width: 6.79rem;
    margin-top: 1rem!important;
  }
  /deep/.el-dialog__body{
    padding:0.5rem;
    >i{
      font-size: 0.58rem;
      top:-0.25rem;
      right: -0.2rem;
    }
    >h4{
      font-size:0.36rem;
    }
    .contenet{
      height: 7.2rem;
      margin-top: 0.34rem;
      padding-bottom: 0.1rem;
      .goods{
        padding:0.32rem;
        border-radius:0.12rem;
        >img{
            width:1.16rem;
            height:1.16rem;
            margin-right:0.5rem;
        }
        >div{
          >h4{
            font-size:0.26rem;
            font-family:Whitney;
            font-weight:500;
            line-height:0.28rem;
            margin-top: 0.05rem;
            min-height: 0.50rem;
          }
          >div{
            margin-top: 0.15rem;
            >div{
              >span{
                font-size:0.24rem;
              }
              >i{
                font-size:0.26rem;
              }
            }
          }
        }
      }
      .describe{
        margin-top: 0.53rem;
        >h4{
          font-size:0.26rem;
          line-height:0.28rem;
        }
        >p{
          font-size:0.24rem;
          line-height:0.28rem;
          margin-top:0.12rem;
        }
      }
      .textBox{
        margin-top:0.31rem;
        >p{
          font-size:0.24rem;
          line-height:0.28rem;
          margin-bottom:0.1rem
        }
      }
    }
    /deep/.el-input__inner{
      height: 0.6rem;
      line-height: 0.6rem;
      font-size: 0.24rem;
    }
    >button{
      width:2.56rem;
      height:0.58rem;
      line-height: 0.58rem;
      border-radius:0.3rem;
      outline: none;
      font-size:0.32rem;
      margin: 0.44rem auto 0;
      border:none
    }
  }
}
.showSuccess{
  /deep/ .el-dialog{
    
    margin-top: 0px;
  }
  /deep/.el-dialog__body{
    background:rgba(255,255,255,1);
    border-radius:20px;
    padding: 1.27rem 0px;
    width: 6.79rem;
    >i{
      font-size: 0.58rem;
      top:-0.25rem;
      right: -0.2rem;
    }
    >p{
      font-size:0.36rem;
      line-height:0.45rem;
    }
    >button{
      margin-top:0.7rem;
      width:4rem;
      height:0.58rem;
      line-height: 0.58rem;
      border-radius:0.3rem;
      font-size:0.32rem;
    }
  }
}
}
</style>