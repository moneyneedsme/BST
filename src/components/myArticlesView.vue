<template>
  <div class="myArticlesView" :class='$store.state.isPc?"pcAuto":"mdAuto"'>
    <div class="left">
      <div class="box">
        <img :src="imageUrl">
        <div class="content">
        <div class="head">
          <img :src="userInfo.avatar">
          <div>
            <div>
              <span>{{userInfo.user_name}}</span>
              <i>
                <i class='iconfont iconxin'></i>
                <span>0</span>
                <i class='iconfont iconfenxiang1'></i>
              </i>
            </div>
            <p>{{time}}</p>
          </div> 
        </div>
        <div class="describe">
          <h2>{{title}}</h2>
          <div v-html='content'></div>
        </div>
      </div>
      </div>
      <div class="btnBox">
        <button @click='toConfirm()'>Confirm</button>
        <button @click='toEdit()'>Edit</button>
      </div>
    </div>
    <div :class='$store.state.isPc?"right":"modTotActivities"'>
      <instructions ></instructions>
    </div>
  </div>
</template>

<script>
import instructions from '../components/Instructions'
import  {httpNetwork} from "../config/axios"
export default {
  name:'myArticlesView',
  components: { 
    instructions,
  },
  data(){
    return {
      topic_id:null,
      title:null,
      content:null,
      imageUrl:null,
      time:null,
      userInfo:{}
    }
  },
  mounted(){
    this.topic_id  = this.$route.query.id
    this.getArticle()
  },
  methods:{
    toConfirm(){
      this.$router.push({path:'/myCenter'})
    },
    toEdit(){
      this.$router.push({path:'/publishArticle',query:{id:this.topic_id}})
    },
    getArticle(){
      if(!this.topic_id) return false
      const data = {
        topic_id:this.topic_id
      }
      const url = `index.php?route=forum/forumtopiccreate/gettopic_bytopicid`
      return httpNetwork(url,data).then(res=>{
        this.title = res.data.title
        this.content = res.data.cooked
        this.imageUrl =  res.image.image_url
        this.userInfo = res.user
      })
    },
    hasImgPrefix(str){
      if(str.indexOf('https://www.bestekdirect.com')<0) return 'https://www.bestekdirect.com'+str
      return str
    }
  }
  
}
</script>

<style lang="less" scoped>
.pcAuto{
  width: 1200px;
  margin:0 auto;
}
.myArticlesView{
  margin-top: 53px;
  overflow: hidden;
  .left{
    width:895px;
    padding-bottom: 50px;
    .box{
      background: white;
      padding:70px 80px;
      /deep/ .el-carousel__container{
      height: 750px;
    }
    /deep/ .el-carousel__item{
      >img{
        width: 750px;
        height: 750px;
      }
    }
    /deep/.el-carousel__indicators--outside{
      display: none;
    }
    .index{
      font-size:30px;
      font-family:Whitney;
      font-weight:500;
      color:rgba(255,255,255,1);
      text-align: center;
      margin-top: -50px;
      position: relative;
      z-index: 9999;
    }
    .content{
      padding:60px 0px 0;
      .head{
        >img{
          width:61px;
          height:61px;
          border-radius: 50%;
          float: left;
          margin-right:19px;
        }
        >div{
          overflow: hidden;
          margin-top: 5px;
          >div{
            overflow: hidden;
            >span{
              font-size:20px;
              font-family:Whitney Book;
              font-weight:400;
              color:rgba(89,87,87,1);
            }
            >i{
              float: right;
              color:rgba(89,87,87,1);
              >span{
                font-size:18px;
                font-family:Whitney Book;
                font-weight:400;
                margin:0 27px 0 8px;
              }
              >i{
                font-size: 20px;
              }
            }
          }
          >p{
            font-size:18px;
            font-family:Whitney Book;
            font-weight:400;
            color:rgba(137,137,137,1);
            margin-top: 10px;
          }
        }
      }
      }
    }
  }
  
  .describe{
    margin-top: 0.54rem;
    >h2{
        font-size:26px;
        font-family:Whitney Semibold;
        font-weight:400;
        color:rgba(62,58,57,1);
      }
      >div{
        font-size:16px;
        font-family:Whitney Book;
        font-weight:400;
        color:rgba(62,58,57,1);
        margin-top:20px;
      }
    }
  .btnBox{
    text-align: center;
    margin-top: 30px;
    >button{
      cursor: pointer;
      width:194px;
      height:46px;
      border-radius:23px;
      border: none;
      padding:0;
      font-size:22px;
      font-family:Whitney Book;
      font-weight:400;
      color:rgba(255,255,255,1);
      background:rgba(209,209,210,1);
      margin-right: 18px;
      &:last-of-type{
        margin-right: 0px;
      }
      &:hover{
        background:rgba(228,0,0,1);
      }
    }
  }
  .right{
    width: 283px;
    margin-left: 17px;
    overflow: hidden;
    float: right;
  }

}
@media screen and (max-width:960px){
  .myArticlesView{
  margin-top: 0.53rem;
  .left{
    width:100%;
    padding-bottom:0rem;
    margin-bottom: 0.5rem;
    float:none;
    .box{
      padding:0.7rem 0.36rem;
    /deep/ .el-carousel__container{
      height:  7.14rem;
    }
    /deep/ .el-carousel__item{
      >img{
        width:  7.14rem;
        height:  7.14rem;
      }
    }
    >img{
      width:  7.14rem;
      height:  7.14rem;
    }
    .index{
      font-size:0.5rem;
      text-align: left;
      padding-left: 0.63rem;
      margin-top: -0.8rem;
    }
    .content{
      padding:0.8rem 0.36rem 0;
      overflow: hidden;
      .head{
        >img{
          width:0.61rem;
          height:0.61rem;
          margin-right:0.19rem;
        }
        >div{
          overflow: hidden;
          margin-top:0rem;
          >div{
            overflow: hidden;
            >span{
              font-size:0.24rem;
            }
            >i{
              margin-top: 0.18rem;
              >span{
                font-size:0.24rem;
                margin:0 0.27rem 0 0.08rem;
              }
              >i{
                font-size: 0.28rem;
              }
            }
          }
          >p{
            font-size:0.24rem;
            margin-top: -0.15rem;
          }
        }
      }
      }
    }
  }
  .describe{
    margin-top: 0.54rem;
    >h2{
      font-size:0.32rem;
    }
    >div{
      font-size:0.26rem;
      margin-top:0.3rem;
    }
  }
  .btnBox{
    text-align: center;
    margin-top: 0.6rem;
    >button{
      width:1.94rem;
      height:0.46rem;
      border-radius:23px;
      font-size:0.32rem;
      margin-right: 0.18rem;
      background:rgba(228,0,0,1);
    }
  }
    .right{
      width: 283px;
      margin-left: 17px;
      overflow: hidden;
      float: right;
    }

  }
  .modTotActivities{
    
  }
}
</style>