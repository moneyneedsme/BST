<template>
  <div class='Reviews'>
    <div v-for='(v,i) in 4' :key='i' @click ='infoDetail=true'>
      <div class="head">
        <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
        <span class="userName">ErikNL</span>
        <i>2 days ago</i>
      </div>
      <h2>Bestek electric toothbrush micro crowd test | confident smile, starting from "teeth"</h2>
      <p>Thanks to sun Shijun, the best @ from the moon, and bestek, the father of gold, for giving me the chance to make this public test, and giving me this m-care electric toothbrush of bestek. [standard configuration] charging toothbrush ped </p>
      <div class="imgBox">
        <img :src="require('../assets/imgs/free/11.jpg')">
        <img :src="require('../assets/imgs/free/11.jpg')">
        <img :src="require('../assets/imgs/free/11.jpg')">
        <img :src="require('../assets/imgs/free/11.jpg')">
      </div>
    </div>
    <el-pagination
      v-if='$store.state.isPc'
      background
      :pageSize='pageSize'
      :currentPage = 'currentPage'
      layout="prev, pager, next"
      :total="100">
    </el-pagination>
    <el-pagination
      v-else
      small
      :pageSize='pageSize'
      :currentPage = 'currentPage'
      layout="prev, pager, next"
      :total="100">
    </el-pagination>
    <el-dialog 
      class="infoDetail"
      :visible.sync="infoDetail"
      :show-close	= 'false'
    >
      <i class='iconfont iconchazishanchudaibiankuang' @click='infoDetail=false'></i>
      <el-carousel 
        indicator-position="outside"
        arrow = 'always'
        @change = 'carouselChange'
      >
        <el-carousel-item v-for="(item,i) in imgList" :key="i">
          <img :src="item">
        </el-carousel-item>
      </el-carousel>
      <div class="index" v-if='imgList.length'>{{imgIndex}}/{{imgList.length}}</div>
      <div class="content">
        <div class="head">
          <img :src="require('../assets/imgs/free/11.jpg')">
          <div>
            <div>
              <span>MonicaMiu</span>
              <i>
                <i class='iconfont iconxin'></i>
                <span>36</span>
                <i class='iconfont iconfenxiang1'></i>
              </i>
            </div>
            <p>20 days ago</p>
          </div> 
        </div>
        <div class="describe">
          <h2>Free Testing bestek m-care electric toothbrush with both beauty and function</h2>
          <p>First of all, thank you for Junjun's trust and the mass testing products provided by the brand side. It's a great honor to have the opportunity to participate in the mass testing again. Now everyone pays more and more attention to the health of teeth, so the demand for electric toothbrush is higher and higher, after all, it's much cleaner than manual toothbrush. Before speaking of electric toothbrush, I only knew about Philips and Oral-B, and I only bought Philips if I bought it myself. I didn't expect that now the domestic products are getting better and better, so I especially look forward to the toothbrush this time. I check the tracking every day. Today, the package will be taken apart and tested as soon as it arrives. Generally speaking, I'm very surprised and like it!</p>
        </div>
        <div class='comment'>
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows:5}"
            placeholder="write down your review......"
            v-model="textValue">
          </el-input>
          <div class='btnBox'>
            <span>All reviews(6)</span>
            <el-button round >Cancel</el-button>
            <el-button class='Release' round>Release</el-button>
          </div>
        </div>
        <div class='commentsItems'>
          <div v-for='(v,i) in list' :key='v.name+i'>
            <img :src="v.imgUrl">
            <div class='centent'>
              <div class="name">{{v.name}}</div>
              <p>{{v.content}}</p>
              <div class='time'>{{v.time}}</div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name:'Reviews',
  data(){
    let list = new Array(6);
    let item = {
      imgUrl:require("../assets/imgs/twritte.png"),
      name:'lavigne derek',
      time:'20 days ago',
      content:'This would be perfect for my new house, I will share my using experience in BESTEK community'
    }
    list.fill(item)
    return{
      pageSize:5,
      currentPage:1,
      imgList:[require('../assets/imgs/free/11.jpg'),require('../assets/imgs/free/11.jpg'),require('../assets/imgs/free/11.jpg')],
      infoDetail:false,
      imgIndex:1,
      textValue:'',
      list
    }
  },
  methods:{
    carouselChange(newIndex,oldIndex){
      this.imgIndex = newIndex+1
    }
  }
}
</script>

<style lang="less" scoped>
.Reviews{
  overflow: hidden;
  padding:0 63px 136px;
  background: white;
  >div{
    margin-top: 72px;
    .head{
      overflow: hidden;
      font-size:18px;
      font-family:Whitney Book;
      font-weight:400;
      color:rgba(137,137,137,1);
      >img{
        width: 60px;
        height: 60px;
        border-radius: 50%;
        vertical-align: middle;
        margin-right: 21px;
      }
      >span{
        vertical-align: middle;
      }
      >i{
        float: right;
        margin-top: 30px;
        transform: translateY(-50%);
      }
    }
    >h2{
      margin-top: 23px;
      font-size:20px;
      font-family:Whitney;
      font-weight:500;
      color:rgba(34,24,21,1);
    }
    >p{
      font-size:16px;
      font-family:Whitney Light;
      font-weight:400;
      color:rgba(102,100,100,1);
      margin-top: 15px;
    }
    .imgBox{
      overflow: hidden;
      >img{
        width:180px;
        height:180px;
        margin-top: 17px;
        margin-right: 13px;
        &:nth-of-type(4n){
          margin-right: 0px;
        }
      }
    }
  }
  .el-pagination{
    text-align: center;
  }
  /deep/.el-pagination.is-background .el-pager li{
    background: transparent;
    font-family:Whitney;
    font-weight:500;
    color:rgba(137,137,137,1);
    width: 26px;
    height: 26px;
    line-height: 26px;
    font-size: 18px;
    border: 1px solid rgba(210,209,211,1);;
    box-sizing: border-box;
  }
  /deep/.el-pagination.is-background .el-pager li:not(.disabled).active{
    background:rgba(227,22,25,1);
    color:white
  }
  /deep/.el-pagination.is-background .btn-next,/deep/ .el-pagination.is-background .btn-prev{
    background: transparent;
    border: 1px solid rgba(210,209,211,1);
    width: 26px;
    height: 26px;
    line-height: 26px;
    min-width: auto;
  }
}
.infoDetail{
  margin-top: 0px!important;
  /deep/.el-dialog{
    background: transparent;
  }
  /deep/ .el-dialog{
    width: 750px;
    margin-top: 50px!important;
  }
  /deep/.el-dialog__header{
    display: none;
  }
  /deep/.el-dialog__body{
    background:rgba(255,255,255,1);
    border-radius:20px;
    position: relative;
    padding:0 0 100px;
    box-sizing: border-box;
    >i{
      font-size: 43px;
      color:#EBECED;
      position: absolute;
      top:-22px;
      right: -18px;
      cursor: pointer;
    }
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
      padding:60px 45px 0;
      .head{
        >img{
          width:61px;
          height:61px;
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
      .describe{
        margin-top: 57px;
        >h2{
          font-size:26px;
          font-family:Whitney Semibold;
          font-weight:400;
          color:rgba(62,58,57,1);
        }
        >p{
          font-size:16px;
          font-family:Whitney Book;
          font-weight:400;
          color:rgba(62,58,57,1);
          margin-top:20px;
        }
      }
      .comment{
        margin-top: 58px;
        overflow: hidden;
        .btnBox{
          margin-top: 21px;
          text-align: right;
          margin-bottom: 30px;
          >span{
            float: left;
            font-size:22px;
            font-family:Whitney;
            font-weight:500;
            color:rgba(62,58,57,1);
            margin-top:9px;
          }
          button.Release {
            margin-left: 5px;
            background:#E31619;
            color: white;
            &:hover{
              color:white;
              background: #E31619;
              border:1px solid #E31619;
              
            }
          }
        }
      }
      .commentsItems{
        overflow: hidden;
        margin-top: 40px;
        >div{
          font-size: 0;
          overflow: hidden;
          margin-top: 10px;
          >img{
            float: left;
            width:55px;
            height: 55px;
            vertical-align: top;
            margin-right: 16px;
          }
          .centent{
            border-bottom:1px solid rgba(244,244,244,1);
            overflow: hidden;
            padding-bottom:15px;
            .name{
              overflow: hidden;
              margin-top: 16px;
              font-size:16px;
              font-family:Whitney Book;
              font-weight:400;
              color:rgba(114,113,113,1);
            }
            >p{
              margin-top: 22px;
              font-size:18px;
              font-family:Whitney Book;
              font-weight:400;
              color:rgba(89,87,87,1);
            }
            .time{
              font-size:0.24rem;
            }
          }
        }
      }
    }
  }
}
@media screen and (max-width:960px){
  .Reviews{
    padding:0 0.36rem 1.38rem;
    >div{
      margin-top: 0.82rem;
      .head{
        font-size:0.24rem;
        >img{
          width: 0.6rem;
          height: 0.6rem;
          margin-right:0.2rem
        }
        >i{
          margin-top: 0.3rem;
          transform: translateY(-50%);
        }
      }
      >h2{
        margin-top: 0.35rem;
        font-size:0.26rem;
      }
      >p{
        font-size:0.24rem;
        margin-top: 0.25rem;
      }
      .imgBox{
        >img{
          width:1.6rem;
          height:1.6rem;
          margin-top: 0.27rem;
          margin-right: 0.11rem;
          &:nth-of-type(4n){
            margin-right: 0px;
          }
        }
      }
    }
    // /deep/.el-pagination.is-background .el-pager li{
    //   width: 0.46rem;
    //   height: 0.46rem;
    //   line-height: 0.46rem;
    //   font-size: 0.26rem;
    //   border: 1px solid rgba(210,209,211,1);;
    //   box-sizing: border-box;
    // }
    // /deep/.el-pagination.is-background .el-pager li:not(.disabled).active{
    //   background:rgba(227,22,25,1);
    //   color:white
    // }
    // /deep/.el-pagination.is-background .btn-next,/deep/ .el-pagination.is-background .btn-prev{
    //   width: 0.46rem;
    //   height: 0.46rem;
    //   line-height: 0.46rem;
    // }
    /deep/.el-pager li.active{
      color:rgba(227,22,25,1);
    }
  }
  .infoDetail{
    /deep/ .el-dialog{
      width: 7.14rem;
      margin-top:0.8rem!important;
      margin: 0;
    }
    /deep/.el-dialog__body{
      border-radius:0 20px 20px 0 ;
      padding:0 0 1rem;
      >i{
        font-size: 0.58rem;
        top:-0.25rem;
        right: -0.2rem;
      }
      /deep/ .el-carousel__container{
        height:  7.14rem;
      }
      /deep/ .el-carousel__item{
        >img{
          width:  7.14rem;
          height:  7.14rem;
        }
      }
      .index{
        font-size:0.5rem;
        text-align: left;
        padding-left: 0.63rem;
        margin-top: -0.8rem;
      }
      .content{
        padding:0.8rem 0.36rem 0;
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
        .describe{
          margin-top: 0.54rem;
          >h2{
            font-size:0.32rem;
          }
          >p{
            font-size:0.24rem;
            margin-top:0.25rem;
          }
        }
        .comment{
          margin-top:0.67rem;
          .el-button.is-round{
            width:1.32rem;
            height:0.4rem;
            border-radius:0.2rem;
          }
          .el-button{
            font-size:0.24rem;
            font-family:Whitney;
            font-weight:500;
            color:rgba(89,87,87,1);
            padding:0
          }
          .btnBox{
            margin-top: 0.21rem;
            margin-bottom: 0.30rem;
            >span{
              font-size:0.32rem;
              margin-top:0.7rem;
            }
            button.Release {
              margin-left: 0.15rem;
            }
          }
        }
        .commentsItems{
          margin-top: 0.4rem;
          >div{
            margin-top: 0.1rem;
            >img{
              width:0.53rem;
              height:0.53rem;
              margin-right: 0.16rem;
            }
            .centent{
              padding-bottom:0.15rem;
              .name{
                overflow: hidden;
                margin-top:0.14rem;
                font-size:0.24rem;
              }
              >p{
                margin-top: 0.15rem;
                font-size:0.26rem;
              }
              .time{
                text-align: right;
                line-height:24px;
              }
            }
          }
        }
      }
    }
  }
}
</style>