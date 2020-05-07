<template>
  <div class='myReviews'>
    <div v-for="(v,i) in 5" :key='i'>
      <img :src="require('../assets/imgs/free/11.jpg')">
      <div>
        <h2 class='oneLine'>Free Testing | BESTEK 8-outlet Charging Station</h2>
        <p class='oneLine'>Test with a good toothbrush, I began to look forward to ......</p>
        <div>
          <span>2020-03-20 03:02</span>
          <span :class='{active:i==1}'>Approved</span>
          <template v-if='$store.state.isPc'>
            <i>Edit</i>
            <i>View</i>
            <i>Delete</i>
          </template>
          <div v-else>
            <i>Edit</i>
            <i>View</i>
            <i>Delete</i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'myReviews'
}
</script>

<style lang="less" scoped>
  .myReviews{
    background: white;
    padding:57px 51px;
    >div{
      padding:23px 0;
      box-sizing: border-box;
      overflow: hidden;
      border-bottom: 1px solid rgba(210,210,210,.6);
      &:first-of-type{
        border-top: 1px solid rgba(210,210,210,.6);
      }
      >img{
        width: 181px;
        height: 93px;
        float: left;
        margin-right: 18px;
      }
      >div{
        overflow: hidden;
        >h2{
          font-size:18px;
          font-family:Whitney Semibold;
          font-weight:400;
          color:rgba(73,70,69,1);
          margin-top: 5px;
        }
        >p{
          font-size:16px;
          font-family:Whitney Book;
          font-weight:400;
          color:rgba(62,58,57,1);
          margin-top: 10px;
        }
        >div{
          overflow: hidden;
          margin-top: 20px;
          >span{
            font-size:14px;
            font-family:Whitney Book;
            font-weight:400;
            color:rgba(137,137,137,1);
            &:nth-of-type(2){
              margin-left: 14px;
            }
            &.active{
              color:rgba(227,22,25,1);
            }
          }
          >i{
            float: right;
            margin-left: 21px;
            font-size:16px;
            font-family:Whitney Book;
            font-weight:400;
            color:rgba(73,70,69,1);
            text-decoration: underline;
          }
        }
      }
    }
  }
  @media screen and (max-width:960px){
    .myReviews{
      padding:0.57rem 0.36rem;
      >div{
        padding:0.23rem 0;
        >img{
          width: 1.81rem;
          height: 0.93rem;
          margin-right: 0.18rem;
        }
        >div{
          overflow: hidden;
          >h2{
            font-size:0.26rem;
            margin-top: 0.05rem;
          }
          >p{
            font-size:0.24rem;
            margin-top: 0.10rem;
          }
          >div{
            margin-top: 0.2rem;
            >span{
              font-size:0.24rem;
              &:nth-of-type(2){
                margin-left:0.14rem;
              }
            }
            >div{
              >i{
                margin-right: 0.21rem;
                font-size:0.26rem;
                font-family:Whitney Book;
                font-weight:400;
                color:rgba(73,70,69,1);
                text-decoration: underline;
              }
            }
          }
        }
      }
    }
  }
</style>