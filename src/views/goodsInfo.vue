<template>
  <div>
    <div class='goodsInfo'>
      <img :src="require('../assets/imgs/free/11.jpg')">
      <div>
        <h2>Free Testing | Crowdfunding Is OngoingM-Care Toothbrush Set & UV Sanitizer...</h2>
        <div class='Applied'>
          <i class='iconfont iconrenwu-tuandui-copy'></i>
          <span> 260 Applied</span>
          <b></b>
          <i class='iconfont iconyanjing'></i>
          <span> 260 Applied</span>
        </div>
        <div class="Qty" >
            <span>Qty:</span>
            <i>6</i>
            <span>Price:</span>
            <i>$25.99</i>
        </div>
        
        <div class="activityEnds" >
          <template v-if='!showTime'>
            Activity ends, 20 applied successfully
            <a href="#">See Results</a>
          </template>
          <div class=time v-else>
              <i class='iconfont icondaojishi'></i>
              Count Down: <span>10</span> Days <span>6</span> Hours
          </div>
        </div>
        <div class="btnBox">
          <el-button plain :class='{active:showTime}'>
            <i class='iconfont iconjieshu'></i>
            <span>Completed</span>
          </el-button>
          <el-button plain :class='{active:!showTime}'>
            <i class='iconfont icondaohanggouwuche'></i>
            <span>Buy Now</span>
          </el-button>
          <el-button plain>
            <i class='iconfont iconfenxiang share'></i>
            <span>Share(30)</span>
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'goodsInfo',
  data(){
    return{
      showTime:true
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
        border:1px solid rgba(140,141,141,1);
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
      >button{
        margin-top: 80px;
        box-sizing: border-box;
        width:167px;
        height:47px;
        background:rgba(244,246,248,1);
        border-radius:23px;
        font-size:18px;
        font-weight:500;
        color:rgba(73,70,69,1);
        &:hover,&.active{
          color:white;
          border:none;
          background:rgba(227,22,25,1);
        }
        i{
          font-size: 21px;
          margin-right: 12px;
          vertical-align: -1px;
          &.share{
            font-size: 24px;
            vertical-align: -4px;
          }
        }
      }
    }
  }
}
@media screen and (max-width:960px){
.goodsInfo{
  margin:0 0.36rem;
  >img{
    width:100%;
    height:100%;
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
      >button{
        margin-top: 0.92rem;
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
      }
    }
  }
}
}
</style>